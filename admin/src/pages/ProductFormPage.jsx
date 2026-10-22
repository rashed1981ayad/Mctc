import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createEmptyProduct, productBrands, productCategories } from "../../../client/src/constants/products.js";
import { useProduct } from "../hooks/useProducts.js";
import { api } from "../services/api.js";
import { productDatasheets, productImages } from "../../../client/src/services/productHelpers.js";
import AdminTurnstile from "../components/AdminTurnstile.jsx";

function RequiredLabel({ children }) {
  return (
    <span className="required-label">
      {children}
      <span className="required-star">*</span>
    </span>
  );
}

export default function ProductFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(createEmptyProduct);
  const [imageLinkFields, setImageLinkFields] = useState([""]);
  const [linkFields, setLinkFields] = useState([""]);
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const dirtyRef = useRef(false);
  const loadedRevisionRef = useRef(null);
  const { data: product, isLoading: productLoading, isError: productError, refetch: retryProduct } = useProduct(id);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const formTitle = useMemo(() => isEditing ? "تعديل منتج" : "إضافة منتج جديد", [isEditing]);

  useEffect(() => {
    dirtyRef.current = false;
    loadedRevisionRef.current = null;
    setForm(createEmptyProduct());
    setImageLinkFields([""]);
    setLinkFields([""]);
    setMessage("");
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const loadedRevision = `${id}:${product.revision}`;
    if (loadedRevisionRef.current === loadedRevision) return;
    if (dirtyRef.current) {
      setMessage("وصل تعديل أحدث من الخادم. لن تُمحى كتابتك؛ انسخ تغييراتك ثم حدّث الصفحة قبل الحفظ.");
      return;
    }
    setForm({
      ...product,
      images: productImages(product),
      features: (product.features || []).join("\n"),
      specifications: (product.specifications || []).join("\n"),
      datasheetUrl: product.datasheetUrl || "",
      datasheetUrls: productDatasheets(product)
    });
    setImageLinkFields(productImages(product).length ? productImages(product) : [""]);
    setLinkFields(productDatasheets(product).length ? productDatasheets(product) : [""]);
    loadedRevisionRef.current = loadedRevision;
  }, [product, id]);

  function updateForm(field, value) {
    dirtyRef.current = true;
    setForm((current) => ({ ...current, [field]: value }));
  }

  const saveMutation = useMutation({
    mutationFn: ({ formData, token }) => isEditing ? api.updateProduct(id, formData, token) : api.createProduct(formData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      navigate("/products");
    },
    onError: (error) => setMessage(error.message),
    onSettled: () => setTurnstileReset((value) => value + 1)
  });

  function submit(event) {
    event.preventDefault();
    setMessage("");
    if (!turnstileToken) {
      setMessage("أكمل التحقق الأمني قبل حفظ المنتج.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    if (isEditing && !form.revision) {
      setMessage("انتظر تحميل المنتج قبل الحفظ، أو حدّث الصفحة إذا تأخر التحميل.");
      return;
    }
    if (isEditing) formData.set("revision", String(form.revision || 0));
    formData.set("featured", form.featured ? "true" : "false");
    const datasheetFile = formData.get("datasheetFile");
    const cleanImageLinks = imageLinkFields.map((item) => item.trim()).filter(Boolean);
    const cleanLinks = linkFields.map((item) => item.trim()).filter(Boolean);
    formData.delete("images");
    if (cleanImageLinks.length) cleanImageLinks.forEach((item) => formData.append("images", item));
    else formData.set("images", "");
    formData.delete("datasheetUrls");
    cleanLinks.forEach((item) => formData.append("datasheetUrls", item));

    if (!form.model.trim()) {
      setMessage("رقم الموديل مطلوب قبل إضافة المنتج");
      return;
    }

    if (!form.category) {
      setMessage("القسم مطلوب قبل إضافة المنتج");
      return;
    }

    if (!form.brand) {
      setMessage("العلامة التجارية مطلوبة قبل إضافة المنتج");
      return;
    }

    if (!isEditing && (!datasheetFile || !datasheetFile.name)) {
      setMessage("ملف PDF الخاص بالداتا شيت مطلوب قبل إضافة المنتج");
      return;
    }

    if (isEditing && cleanLinks.length === 0 && (!datasheetFile || !datasheetFile.name)) {
      setMessage("ملف PDF الخاص بالداتا شيت مطلوب قبل حفظ المنتج");
      return;
    }

    saveMutation.mutate({ formData, token: turnstileToken });
  }

  if (isEditing && productLoading && !product) return <section className="admin-page"><p className="notice">جاري تحميل بيانات المنتج...</p></section>;
  if (isEditing && productError && !product) return <section className="admin-page"><p className="error">تعذر تحميل المنتج. لن تُعرض استمارة فارغة حتى لا تضيع بياناته.</p><button type="button" className="primary" onClick={() => retryProduct()}>إعادة المحاولة</button></section>;

  return (
    <section className="admin-page">
      <form className="admin-form" onSubmit={submit}>
        <h2>{formTitle}</h2>
        {message && <p className={message.includes("نجاح") ? "success" : "error"}>{message}</p>}
        <div className="two">
          <label><RequiredLabel>اسم المنتج</RequiredLabel><input name="name" value={form.name} onChange={(e) => updateForm("name", e.target.value)} required /></label>
          <label><RequiredLabel>رقم الموديل</RequiredLabel><input name="model" value={form.model} onChange={(e) => updateForm("model", e.target.value)} required /></label>
        </div>
        <div className="two">
          <label><RequiredLabel>القسم</RequiredLabel>
            <select name="category" value={form.category} onChange={(e) => updateForm("category", e.target.value)} required>
              <option value="">اختر القسم</option>
              {[...new Set([...productCategories, ...(form.category ? [form.category] : [])])].map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label><RequiredLabel>العلامة التجارية</RequiredLabel>
            <select name="brand" value={form.brand} onChange={(e) => updateForm("brand", e.target.value)} required>
              <option value="">اختر العلامة التجارية</option>
              {[...new Set([...productBrands, ...(form.brand ? [form.brand] : [])])].map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <label>الوصف<textarea name="description" value={form.description} onChange={(e) => updateForm("description", e.target.value)} /></label>
        <div className="two">
          <label>المميزات، كل سطر ميزة<textarea name="features" value={form.features} onChange={(e) => updateForm("features", e.target.value)} /></label>
          <label>المواصفات، كل سطر مواصفة<textarea name="specifications" value={form.specifications} onChange={(e) => updateForm("specifications", e.target.value)} /></label>
        </div>
        <div className="two">
          <label>رفع صور المنتج<input name="imageFiles" type="file" accept="image/png,image/jpeg,image/webp" onChange={() => { dirtyRef.current = true; }} multiple /></label>
          <label>الحالة
            <select name="status" value={form.status} onChange={(e) => updateForm("status", e.target.value)}>
              <option value="available">متاح</option>
              <option value="unavailable">غير متاح</option>
              <option value="draft">مسودة</option>
            </select>
          </label>
        </div>
        <div className="link-fields">
          <label>روابط الصور
            {imageLinkFields.map((item, index) => (
              <div className="link-field" key={index}>
                <input
                  name="images"
                  value={item}
                  placeholder={`رابط صورة ${index + 1}`}
                  onChange={(event) => {
                    const next = [...imageLinkFields];
                    next[index] = event.target.value;
                    dirtyRef.current = true;
                    setImageLinkFields(next);
                  }}
                />
                {(imageLinkFields.length > 1 || item) && (
                  <button type="button" className="secondary small-button" onClick={() => {
                    const remaining = imageLinkFields.filter((_, itemIndex) => itemIndex !== index);
                    dirtyRef.current = true;
                    setImageLinkFields(remaining.length ? remaining : [""]);
                  }}>
                    حذف
                  </button>
                )}
              </div>
            ))}
          </label>
          <button type="button" className="secondary add-link-button" onClick={() => { dirtyRef.current = true; setImageLinkFields([...imageLinkFields, ""]); }}>
            إضافة رابط صورة آخر
          </button>
        </div>
        <div className="link-fields">
          <label>روابط الداتا شيت
            {linkFields.map((item, index) => (
              <div className="link-field" key={index}>
                <input
                  name="datasheetUrls"
                  value={item}
                  placeholder={`رابط ${index + 1}`}
                  onChange={(event) => {
                    const next = [...linkFields];
                    next[index] = event.target.value;
                    dirtyRef.current = true;
                    setLinkFields(next);
                  }}
                />
                {linkFields.length > 1 && (
                  <button type="button" className="secondary small-button" onClick={() => { dirtyRef.current = true; setLinkFields(linkFields.filter((_, itemIndex) => itemIndex !== index)); }}>
                    حذف
                  </button>
                )}
              </div>
            ))}
          </label>
          <button type="button" className="secondary add-link-button" onClick={() => { dirtyRef.current = true; setLinkFields([...linkFields, ""]); }}>
            إضافة رابط آخر
          </button>
        </div>
        <div className="two">
          <label><RequiredLabel>رفع ملف الداتا شيت PDF</RequiredLabel><input name="datasheetFile" type="file" accept="application/pdf,.pdf" onChange={() => { dirtyRef.current = true; }} required={!isEditing && !form.datasheetUrl} /></label>
        </div>
        <p className="form-note">ملاحظة: ملف PDF الخاص بالداتا شيت مطلوب لحفظ المنتج. عند رفع ملف PDF جديد، سيحل محل جميع روابط الداتا شيت الحالية لهذا المنتج.</p>
        <label className="check"><input type="checkbox" checked={form.featured} onChange={(e) => updateForm("featured", e.target.checked)} /> منتج مميز</label>
        <AdminTurnstile action={isEditing ? "product_edit" : "product_create"} onToken={setTurnstileToken} resetSignal={turnstileReset} />
        <div className="actions">
          <button className="primary" disabled={saveMutation.isPending || !turnstileToken}>{saveMutation.isPending ? "جاري الحفظ وفحص الملفات..." : isEditing ? "حفظ التعديل" : "إضافة المنتج"}</button>
          {isEditing && <button className="secondary" type="button" onClick={() => navigate("/products")}>إلغاء</button>}
        </div>
      </form>
    </section>
  );
}
