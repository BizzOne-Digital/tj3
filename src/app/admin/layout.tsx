"use client";

import { AdminSidebar } from "@/features/admin/AdminSidebar";
import { useAdminAuth } from "@/features/admin/useAdminAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAdminAuth();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    }
    if (!isLoading && isAuthenticated && isLoginPage) {
      router.replace("/admin");
    }
  }, [isLoading, isAuthenticated, isLoginPage, router]);

  if (isLoginPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-midnight">
        {children}
      </div>
    );
  }

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-midnight">
        <p className="text-cool-grey">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-midnight lg:flex-row">
      <AdminSidebar onLogout={logout} />
      <div className="min-w-0 flex-1 overflow-x-auto p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}
