import { query } from "../db/index.js";

export async function limitAdminUploads(req, res, next) {
  try {
    const { rows } = await query(
      `insert into admin_upload_limits (admin_id, requests, window_started_at)
       values ($1, 1, now())
       on conflict (admin_id) do update set
         requests = case when admin_upload_limits.window_started_at <= now() - interval '1 hour'
           then 1 else admin_upload_limits.requests + 1 end,
         window_started_at = case when admin_upload_limits.window_started_at <= now() - interval '1 hour'
           then now() else admin_upload_limits.window_started_at end
       where admin_upload_limits.window_started_at <= now() - interval '1 hour'
          or admin_upload_limits.requests < 60
       returning requests`,
      [req.admin.id]
    );
    if (!rows.length) {
      res.set("Retry-After", "3600");
      return res.status(429).json({ message: "تم تجاوز حد عمليات رفع المنتجات. حاول لاحقًا" });
    }
    next();
  } catch (error) {
    next(error);
  }
}
