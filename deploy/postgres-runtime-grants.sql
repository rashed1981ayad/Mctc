-- Run with psql as the database owner AFTER db:prepare.
-- Create a fresh LOGIN role first; do not make it the database or table owner.
-- Example: psql "$MIGRATION_DATABASE_URL" -v ON_ERROR_STOP=1 -v runtime_role=mctc_app -f deploy/postgres-runtime-grants.sql
-- The runtime_role variable is required; with ON_ERROR_STOP, omitting it fails without committing any grants.

begin;
-- This project uses a dedicated database; remove the legacy public CREATE grant.
revoke create on schema public from public;
select format('grant connect on database %I to %I', current_database(), :'runtime_role') \gexec
grant usage on schema public to :"runtime_role";

grant select on
  admins, admin_sessions, auth_login_limits, admin_upload_limits,
  admin_audit_events, products, contact_messages, orders, order_items
to :"runtime_role";

grant insert on
  admin_sessions, auth_login_limits, admin_upload_limits, admin_audit_events,
  products, contact_messages, orders, order_items
to :"runtime_role";

grant update on
  admin_sessions, auth_login_limits, admin_upload_limits,
  products, contact_messages, orders
to :"runtime_role";

grant delete on
  admin_sessions, auth_login_limits, products, contact_messages
to :"runtime_role";

grant usage on sequence
  admin_audit_events_id_seq, products_id_seq, contact_messages_id_seq,
  orders_id_seq, order_items_id_seq
to :"runtime_role";
commit;
