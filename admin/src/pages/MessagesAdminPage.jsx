import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "../../../client/src/hooks/useDebouncedValue.js";
import AdminPagination from "../components/AdminPagination.jsx";
import { api, expireSession } from "../services/api.js";

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("ar-LY", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function isAuthError(error) {
  return error?.status === 401 || String(error?.message || "").includes("تسجيل الدخول") || String(error?.message || "").includes("الجلسة");
}

export default function MessagesAdminPage() {
  const [message, setMessage] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const search = useDebouncedValue(searchText.trim(), 350);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, error, isError, isLoading, isFetching } = useQuery({
    queryKey: ["contact-messages", { q: search, status: showArchived ? "archived" : "active", page }],
    queryFn: () => api.listContactMessages({ q: search, status: showArchived ? "archived" : "active", page, limit: 20 })
  });
  const visibleMessages = data?.items || [];
  const total = data?.total || 0;
  const pages = data?.pages || 0;
  const visibleIds = visibleMessages.map((item) => item.id);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  useEffect(() => {
    if (data && page > Math.max(1, pages)) setPage(Math.max(1, pages));
  }, [data, page, pages]);

  function handleAuthError(error) {
    if (isAuthError(error)) {
      expireSession();
      navigate("/login", { replace: true });
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (!isError) return;
    if (handleAuthError(error)) return;
    setMessage(error?.message || "تعذر تحميل رسائل التواصل، تأكد أن خادم API يعمل ثم حدّث الصفحة");
  }, [isError, error]);

  function afterAction(successMessage) {
    setMessage(successMessage);
    setSelectedIds([]);
    queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
  }

  const bulkStatusMutation = useMutation({
    mutationFn: ({ ids, status }) => api.updateContactMessagesStatus(ids, status),
    onSuccess: () => afterAction("تم تحديث حالة الرسائل بنجاح"),
    onError: (error) => {
      setMessage(error.message || "تعذر تحديث حالة الرسائل");
      handleAuthError(error);
    }
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: api.deleteContactMessages,
    onSuccess: () => afterAction("تم حذف الرسائل المحددة بنجاح"),
    onError: (error) => {
      setMessage(error.message || "تعذر حذف الرسائل");
      handleAuthError(error);
    }
  });

  const singleDeleteMutation = useMutation({
    mutationFn: api.deleteContactMessage,
    onSuccess: () => afterAction("تم حذف الرسالة بنجاح"),
    onError: (error) => {
      setMessage(error.message || "تعذر حذف الرسالة");
      handleAuthError(error);
    }
  });

  function toggleOne(id) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function toggleAllVisible() {
    setSelectedIds((current) => {
      if (allVisibleSelected) return current.filter((id) => !visibleIds.includes(id));
      return [...new Set([...current, ...visibleIds])];
    });
  }

  function updateSelectedStatus(status) {
    if (!selectedIds.length) {
      setMessage("حدد رسالة واحدة على الأقل أولًا");
      return;
    }
    setMessage("");
    bulkStatusMutation.mutate({ ids: selectedIds, status });
  }

  function deleteSelected() {
    if (!selectedIds.length) {
      setMessage("حدد رسالة واحدة على الأقل أولًا");
      return;
    }
    if (!confirm("هل تريد حذف الرسائل المحددة؟")) return;
    setMessage("");
    bulkDeleteMutation.mutate(selectedIds);
  }

  function deleteOne(id) {
    if (!confirm("هل تريد حذف هذه الرسالة؟")) return;
    setMessage("");
    singleDeleteMutation.mutate(id);
  }

  return (
    <section className="admin-page">
      {message && <p className={message.includes("نجاح") ? "success" : "error"}>{message}</p>}
      <div className="admin-table messages-admin">
        <div className="admin-section-heading">
          <div>
            <h2>رسائل التواصل</h2>
            <p>إدارة رسائل العملاء بأسلوب قريب من البريد الإلكتروني.</p>
          </div>
          <span className="status">النتائج: {total}</span>
        </div>

        <div className="admin-list-filters">
          <input
            type="search"
            aria-label="البحث عن رسالة بالاسم أو رقم الهاتف أو البريد الإلكتروني"
            placeholder="ابحث بالاسم أو بجزء من رقم الهاتف أو البريد الإلكتروني"
            value={searchText}
            onChange={(event) => { setSearchText(event.target.value); setPage(1); setSelectedIds([]); }}
          />
        </div>

        <div className="messages-toolbar">
          <label className="select-all-control">
            <input type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} />
            تحديد الصفحة
          </label>
          <button type="button" onClick={deleteSelected}>حذف المحدد</button>
          <button type="button" onClick={() => updateSelectedStatus("read")}>تعيين كمقروءة</button>
          <button type="button" onClick={() => updateSelectedStatus(showArchived ? "read" : "archived")}>
            {showArchived ? "إخراج من الأرشيف" : "أرشفة المحدد"}
          </button>
          <button type="button" className={showArchived ? "active" : ""} onClick={() => {
            setShowArchived((current) => !current);
            setPage(1);
            setSelectedIds([]);
          }}>
            {showArchived ? "عرض الرسائل الحالية" : "عرض الرسائل المؤرشفة"}
          </button>
        </div>

        <div className="messages-table">
          <div className="messages-table-head">
            <span>تحديد</span>
            <span>المرسل ورقم الهاتف</span>
            <span>عنوان الرسالة</span>
            <span>الحالة</span>
          </div>

          {isLoading ? <p className="notice">جاري تحميل الرسائل...</p> : isError ? (
            <p className="notice">تعذر تحميل الرسائل. {error?.message || "حاول تحديث الصفحة."}</p>
          ) : (
            visibleMessages.length ? visibleMessages.map((item) => (
              <div className={`message-row ${item.status === "new" ? "unread" : ""}`} key={item.id}>
                <label className="message-row-check">
                  <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleOne(item.id)} />
                </label>

                <button type="button" className="message-row-main sender" onClick={() => navigate(`/messages/${item.id}`)}>
                  <strong>{item.name}</strong>
                  <small>{item.phone}</small>
                </button>

                <button type="button" className="message-row-main subject" onClick={() => navigate(`/messages/${item.id}`)}>
                  <strong>{item.subject || "بدون عنوان"}</strong>
                  <small>{formatDate(item.created_at)}</small>
                </button>

                <div className="message-row-status">
                  <span className={`message-status ${item.status}`}>{item.statusLabel}</span>
                  <button type="button" className="danger small-button" onClick={() => deleteOne(item.id)}>حذف</button>
                </div>
              </div>
            )) : (
              <p className="notice">{showArchived ? "لا توجد رسائل مؤرشفة." : "لا توجد رسائل تواصل حتى الآن."}</p>
            )
          )}
        </div>
        <AdminPagination page={page} pages={pages} total={total} disabled={isFetching} onPageChange={(nextPage) => {
          setPage(nextPage);
          setSelectedIds([]);
        }} />
      </div>
    </section>
  );
}
