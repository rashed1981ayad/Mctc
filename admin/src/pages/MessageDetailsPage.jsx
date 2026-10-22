import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api, expireSession } from "../services/api.js";
import MessageMetaIcon from "../components/MessageMetaIcon.jsx";

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("ar-LY", {
    dateStyle: "full",
    timeStyle: "short"
  }).format(new Date(value));
}

function isAuthError(error) {
  return String(error?.message || "").includes("تسجيل الدخول") || String(error?.message || "").includes("الجلسة");
}

export default function MessageDetailsPage() {
  const { id } = useParams();
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: item, isLoading, error } = useQuery({
    queryKey: ["contact-message", id],
    queryFn: () => api.getContactMessage(id),
    enabled: Boolean(id)
  });

  function handleAuthError(actionError) {
    if (isAuthError(actionError)) {
      expireSession();
      navigate("/login", { replace: true });
    }
  }

  const statusMutation = useMutation({
    mutationFn: (status) => api.updateContactMessageStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-message", id] });
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
    },
    onError: handleAuthError
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.deleteContactMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      navigate("/messages", { replace: true });
    },
    onError: (actionError) => {
      setNotice(actionError.message || "تعذر حذف الرسالة");
      handleAuthError(actionError);
    }
  });

  useEffect(() => {
    if (item?.status === "new" && !statusMutation.isPending) {
      statusMutation.mutate("read");
    }
  }, [item?.status]);

  useEffect(() => {
    if (error) handleAuthError(error);
  }, [error]);

  function archiveMessage() {
    setNotice("");
    statusMutation.mutate(item?.status === "archived" ? "read" : "archived");
  }

  function remove() {
    if (!confirm("هل تريد حذف هذه الرسالة؟")) return;
    setNotice("");
    deleteMutation.mutate();
  }

  return (
    <section className="admin-page">
      {notice && <p className="error">{notice}</p>}
      <div className="admin-table message-details">
        <div className="message-details-toolbar">
          <Link className="small-button" to="/messages">الرجوع إلى الرسائل</Link>
          {item && (
            <div>
              <button type="button" onClick={archiveMessage}>{item.status === "archived" ? "إخراج من الأرشيف" : "أرشفة"}</button>
              <button type="button" className="danger" onClick={remove}>حذف الرسالة</button>
            </div>
          )}
        </div>

        {isLoading ? <p className="notice">جاري تحميل الرسالة...</p> : item ? (
          <article className="message-read-card">
            <header>
              <span className={`message-status ${item.status}`}>{item.statusLabel}</span>
              <h2>{item.subject || "بدون عنوان"}</h2>
              <p>{formatDate(item.created_at)}</p>
            </header>

            <div className="message-read-meta">
              <span><MessageMetaIcon kind="user" /> {item.name}</span>
              <span><MessageMetaIcon kind="phone" /> {item.phone}</span>
              {item.email && <span><MessageMetaIcon kind="email" /> {item.email}</span>}
              {item.whatsapp_number && <span><MessageMetaIcon kind="message" /> {item.whatsapp_number}</span>}
            </div>

            <div className="message-read-body">
              {item.message}
            </div>
          </article>
        ) : (
          <p className="notice">الرسالة غير موجودة.</p>
        )}
      </div>
    </section>
  );
}
