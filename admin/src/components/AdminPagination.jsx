import React from "react";

export default function AdminPagination({ page, pages, total, onPageChange, disabled = false }) {
  if (pages <= 1) return null;

  const start = Math.max(1, Math.min(page - 2, pages - 4));
  const end = Math.min(pages, start + 4);
  const pageNumbers = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <nav className="admin-pagination" aria-label="صفحات النتائج">
      <span>صفحة {page} من {pages} · {total} نتيجة</span>
      <div>
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={disabled || page <= 1}>السابق</button>
        {start > 1 && <button type="button" onClick={() => onPageChange(1)} disabled={disabled}>1</button>}
        {start > 2 && <span aria-hidden="true">…</span>}
        {pageNumbers.map((number) => (
          <button
            key={number}
            type="button"
            className={number === page ? "active" : ""}
            aria-current={number === page ? "page" : undefined}
            onClick={() => onPageChange(number)}
            disabled={disabled || number === page}
          >{number}</button>
        ))}
        {end < pages - 1 && <span aria-hidden="true">…</span>}
        {end < pages && <button type="button" onClick={() => onPageChange(pages)} disabled={disabled}>{pages}</button>}
        <button type="button" onClick={() => onPageChange(page + 1)} disabled={disabled || page >= pages}>التالي</button>
      </div>
    </nav>
  );
}
