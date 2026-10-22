import multer from "multer";
import { randomUUID } from "node:crypto";

export class HttpError extends Error {
  constructor(status, message, { expose = status < 500 } = {}) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.publicMessage = expose ? message : null;
  }
}

export function publicError(error) {
  if (error instanceof HttpError && Number.isInteger(error.status) && error.status >= 400 && error.status <= 599) {
    return {
      status: error.status,
      message: error.publicMessage || (error.status >= 500
        ? "حدث خطأ داخلي في الخادم. حاول مرة أخرى لاحقًا"
        : "تعذر معالجة الطلب")
    };
  }
  if (error instanceof multer.MulterError) {
    return error.code === "LIMIT_FILE_SIZE"
      ? { status: 413, message: "الملف أكبر من الحجم المسموح" }
      : { status: 400, message: "الملفات المرفوعة غير صحيحة" };
  }
  if (error?.type === "entity.too.large") return { status: 413, message: "حجم الطلب أكبر من المسموح" };
  if (error?.type === "entity.parse.failed") return { status: 400, message: "تنسيق بيانات الطلب غير صحيح" };
  if (error?.code === "23505") return { status: 409, message: "يوجد سجل بهذه البيانات بالفعل" };
  if (["TURNSTILE_UNAVAILABLE", "ECONNREFUSED", "ETIMEDOUT", "08000", "08003", "08006", "53300", "57P01", "57P03"].includes(error?.code)) {
    return { status: 503, message: "الخدمة غير متاحة مؤقتًا. حاول مرة أخرى لاحقًا" };
  }
  return { status: 500, message: "حدث خطأ داخلي في الخادم. حاول مرة أخرى لاحقًا" };
}

export function errorHandler(error, req, res, next) {
  const response = publicError(error);
  const errorId = req.requestId || randomUUID();
  if (response.status >= 500) {
    console.error(JSON.stringify({
      event: "http.internal_error",
      errorId,
      method: req.method,
      status: response.status,
      errorName: error?.name,
      errorCode: error?.code,
      message: String(error?.message || error).slice(0, 2000),
      stack: String(error?.stack || "").slice(0, 6000)
    }));
  }
  if (res.headersSent) return next(error);
  res.set("Cache-Control", "no-store");
  if (response.status >= 500) res.set("X-Error-ID", errorId);
  res.status(response.status).json(response.status >= 500
    ? { message: response.message, errorId }
    : { message: response.message });
}
