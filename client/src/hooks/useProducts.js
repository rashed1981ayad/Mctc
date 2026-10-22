import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api.js";

export function useProducts(params = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => api.listProducts(params),
    staleTime: 5 * 60 * 1000
  });
}

export function useAdminProducts() {
  return useProducts({ status: "all", limit: 100 });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => api.listProducts({ featured: "true", random: "true", summary: "true", limit: 4 }),
    select: (data) => data.items || [],
    staleTime: 5 * 60 * 1000
  });
}

export function useProduct(id, options = {}) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => api.getProduct(id),
    enabled: Boolean(id) && (options.enabled ?? true),
    staleTime: 10 * 60 * 1000
  });
}

export function useProductOptions() {
  return useQuery({
    queryKey: ["products", "options"],
    queryFn: api.getOptions,
    staleTime: 10 * 60 * 1000
  });
}
