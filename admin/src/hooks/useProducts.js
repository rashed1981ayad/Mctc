import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api.js";

export function useAdminProducts(params) {
  return useQuery({
    queryKey: ["products", "admin", params],
    queryFn: () => api.listProducts({ status: "all", ...params }),
    staleTime: 5 * 60_000
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProduct(id),
    enabled: Boolean(id),
    staleTime: 10 * 60_000
  });
}
