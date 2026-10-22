import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "../../../client/src/hooks/useDebouncedValue.js";
import AdminPagination from "../components/AdminPagination.jsx";
import { api, expireSession } from "../services/api.js";

const statusLabels = {
  pending_whatsapp: "بانتظار الإرسال عبر واتساب",
  confirmed: "مؤكد",
  archived: "مؤرشف"
};

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("ar-LY", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export default function OrdersAdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [draftStatuses, setDraftStatuses] = useState({});
  const [message, setMessage] = useState(null);
  const search = useDebouncedValue(searchText.trim(), 350);
  const { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ["orders", "admin", { q: search, status: statusFilter, page }],
    queryFn: () => api.listOrders({ q: search, status: statusFilter, page, limit: 20 })
  });
  const orders = data?.items || [];
  const total = data?.total || 0;
  const pages = data?.pages || 0;
  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => api.updateOrderStatus(id, status),
    onSuccess: (updated) => {
      queryClient.setQueriesData({ queryKey: ["orders", "admin"] }, (current) => current?.items ? ({
        ...current,
        items: current.items.map((order) => String(order.id) === String(updated.id) ? { ...order, status: updated.status } : order)
      }) : current);
      queryClient.invalidateQueries({ queryKey: ["orders", "admin"] });
      setDraftStatuses((current) => {
        const next = { ...current };
        delete next[updated.id];
        return next;
      });
      setMessage({ type: "success", text: `تم تحديث حالة الطلب رقم ${updated.id}.` });
    },
    onError: (mutationError) => {
      setMessage({
        type: "error",
        text: mutationError?.status === 404 ? "الطلب غير موجود. حدّث القائمة وحاول مجددًا." : "تعذر حفظ حالة الطلب. حاول مجددًا."
      });
    }
  });

  useEffect(() => {
    if (data && page > Math.max(1, pages)) setPage(Math.max(1, pages));
  }, [data, page, pages]);

  useEffect(() => {
    if (error?.status === 401) {
      expireSession();
      navigate("/login", { replace: true });
    }
  }, [error, navigate]);

  return (
    <section className="admin-page">
      <div className="admin-table orders-admin">
        <div className="admin-section-heading">
          <div>
            <h2>طلبات عروض الأسعار</h2>
            <p>عرض بيانات العملاء والمنتجات والكميات، وتأكيد الطلبات أو أرشفتها بعد متابعتها.</p>
          </div>
          {data && <span className="status">النتائج: {total}</span>}
        </div>
        <p className="form-note">فتح واتساب من الموقع لا يثبت إرسال الرسالة. حدّد «مؤكد» بعد التحقق من استلام الطلب.</p>
        {message && <p className={message.type} role="status">{message.text}</p>}

        <div className="admin-list-filters">
          <input
            type="search"
            aria-label="البحث برقم الطلب أو رقم الهاتف أو اسم المنتج أو رقم الموديل"
            placeholder="ابحث برقم الطلب أو جزء من الهاتف أو اسم المنتج أو الموديل"
            value={searchText}
            onChange={(event) => { setSearchText(event.target.value); setPage(1); }}
          />
          <select
            aria-label="تصفية الطلبات حسب الحالة"
            value={statusFilter}
            onChange={(event) => { setStatusFilter(event.target.value); setPage(1); setMessage(null); }}
          >
            <option value="all">كل الطلبات</option>
            {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>

        {isLoading ? <p className="notice">جاري تحميل الطلبات...</p> : isError ? (
          <p className="notice">تعذر تحميل الطلبات. {error?.message || "حاول تحديث الصفحة."}</p>
        ) : orders.length ? (
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-card" key={order.id}>
                <header className="order-card-header">
                  <div>
                    <h3>الطلب رقم {order.id}</h3>
                    <time dateTime={order.created_at}>{formatDate(order.created_at)}</time>
                  </div>
                  <span className={`order-status ${order.status}`}>{statusLabels[order.status] || order.status}</span>
                </header>

                <div className="order-status-controls">
                  <label htmlFor={`order-status-${order.id}`}>حالة الطلب</label>
                  <select
                    id={`order-status-${order.id}`}
                    value={draftStatuses[order.id] ?? order.status}
                    onChange={(event) => {
                      setDraftStatuses((current) => ({ ...current, [order.id]: event.target.value }));
                      setMessage(null);
                    }}
                    disabled={updateStatus.isPending}
                  >
                    {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                  <button
                    type="button"
                    className="primary"
                    onClick={() => updateStatus.mutate({ id: order.id, status: draftStatuses[order.id] ?? order.status })}
                    disabled={updateStatus.isPending || (draftStatuses[order.id] ?? order.status) === order.status}
                  >
                    {updateStatus.isPending && String(updateStatus.variables?.id) === String(order.id) ? "جاري الحفظ..." : "حفظ الحالة"}
                  </button>
                </div>

                <div className="order-customer">
                  <span><strong>الاسم:</strong> {order.customer_name}</span>
                  <span><strong>الهاتف:</strong> <a href={`tel:${order.phone}`}>{order.phone}</a></span>
                  {order.email && <span><strong>البريد الإلكتروني:</strong> <a href={`mailto:${order.email}`}>{order.email}</a></span>}
                  <span><strong>لغة الطلب:</strong> {order.language.toUpperCase()}</span>
                </div>

                {order.notes && <div className="order-notes"><strong>ملاحظات:</strong> {order.notes}</div>}

                <div className="order-items-table">
                  <div className="order-items-head">
                    <span>المنتج</span><span>رقم الموديل</span><span>العلامة</span><span>العدد</span>
                  </div>
                  {order.items.map((item) => (
                    <div className="order-item-row" key={item.id}>
                      <span>{item.product_name}</span>
                      <span dir="ltr">{item.model}</span>
                      <span>{item.brand}</span>
                      <strong>{item.quantity}</strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : <p className="notice">لا توجد طلبات تطابق البحث أو حالة الفلتر.</p>}
        {data && <AdminPagination page={page} pages={pages} total={total} onPageChange={setPage} disabled={isFetching} />}
      </div>
    </section>
  );
}
