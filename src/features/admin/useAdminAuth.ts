"use client";

import { authApi } from "@/lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useAdminAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-me"],
    queryFn: () => authApi.me(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const logout = async () => {
    try {
      await authApi.logout();
      queryClient.clear();
      router.push("/admin/login");
      toast.success("Logged out");
    } catch {
      toast.error("Logout failed");
    }
  };

  return {
    user: data?.data,
    isLoading,
    isAuthenticated: !!data?.data && !isError,
  };
}
