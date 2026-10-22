import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productBrands, productCategories } from "../../../client/src/constants/products.js";
import { useDebouncedValue } from "../../../client/src/hooks/useDebouncedValue.js";
import AdminPagination from "../components/AdminPagination.jsx";
import { useAdminProducts } from "../hooks/useProducts.js";
import { api, expireSession } from "../services/api.js";

export default function ProductsAdminPage() {
  const [message, setMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [page, setPage] = useState(1);
  const search = useDebouncedValue(searchText.trim(), 350);
  const { data, error, isLoading, isFetching, refetch } = useAdminProducts({ q: search, category, brand, page, limit: 20 });
  const { data: options } = useQuery({
    queryKey: ["products", "admin", "options"],
    queryFn: () => api.getOptions({ status: "all" })
  });
  const products = data?.items || [];
  const total = data?.total || 0;
  const pages = data?.pages || 0;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && page > Math.max(1, pages)) setPage(Math.max(1, pages));
  }, [data, page, pages]);

  const deleteMutation = useMutation({
    mutationFn: api.deleteProduct,
    onSuccess: () => {
      setMessage("تم حذف المنتج بنجاح");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      setMessage(error.message || "تعذر حذف المنتج");
      if (String(error.message || "").includes("تسجيل الدخول") || String(error.message || "").includes("الجلسة")) {
        expireSession();
        navigate("/login", { replace: true });
      }
    }
  });

  function remove(id) {
    if (!confirm("هل تريد حذف هذا المنتج؟")) return;
    setMessage("");
    deleteMutation.mutate(id);
  }

  return (
    <section className="admin-page">
      {message && <p className={message.includes("نجاح") ? "success" : "error"}>{message}</p>}
      <div className="admin-table">
        <div className="admin-section-heading">
          <h2>قائمة المنتجات</h2>
          {data && <span className="status">النتائج: {total}</span>}
        </div>
        <Link className="primary add-product-link" to="/product-form">إضافة منتج جديد</Link>
        <div className="admin-list-filters">
          <input
            type="search"
            aria-label="البحث باسم المنتج أو رقم الموديل"
            placeholder="ابحث باسم المنتج أو رقم الموديل"
            value={searchText}
            onChange={(event) => { setSearchText(event.target.value); setPage(1); }}
          />
          <select aria-label="تصفية حسب القسم" value={category} onChange={(event) => { setCategory(event.target.value); setPage(1); }}>
            <option value="">كل الأقسام</option>
            {[...new Set([...productCategories, ...(options?.categories || [])])].map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
          <select aria-label="تصفية حسب العلامة التجارية" value={brand} onChange={(event) => { setBrand(event.target.value); setPage(1); }}>
            <option value="">كل العلامات التجارية</option>
            {[...new Set([...productBrands, ...(options?.brands || [])])].map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
        {isLoading ? <p className="notice">جاري تحميل المنتجات...</p> : null}
        {!isLoading && error && (
          <div className="error" role="alert">
            <p>{error.status ? "تعذر جلب المنتجات من الخادم. حاول مرة أخرى بعد قليل." : "تعذر الاتصال بالخادم. تحقق من الاتصال وحاول مرة أخرى."}</p>
            <button type="button" className="primary" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "جاري إعادة المحاولة..." : "إعادة المحاولة"}
            </button>
          </div>
        )}
        {!isLoading && products.length ? (
          <div className="table">
            {products.map((product) => (
              <div className="table-row" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <small>{product.model} — {product.brand}</small>
                </div>
                <span className="status">{product.status}</span>
                <button type="button" onClick={() => navigate(`/product-form/${product.id}`)}>تعديل</button>
                <button type="button" className="danger" onClick={() => remove(product.id)}>حذف</button>
              </div>
            ))}
          </div>
        ) : !isLoading && data && !error ? <p className="notice">لا توجد منتجات تطابق البحث أو الفلاتر.</p> : null}
        {data && <AdminPagination page={page} pages={pages} total={total} onPageChange={setPage} disabled={isFetching} />}
      </div>
    </section>
  );
}
