export async function confirmLogout(api, clearSession, navigate) {
  await api.logout();
  clearSession();
  navigate("/login");
}
