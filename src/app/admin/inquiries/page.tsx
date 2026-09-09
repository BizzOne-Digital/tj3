"use client";

import { adminApi } from "@/lib/api";
import { CrudTable, AdminPageHeader } from "@/features/admin/CrudTable";
import { useQuery } from "@tanstack/react-query";

export default function AdminInquiriesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "inquiries"],
    queryFn: () => adminApi.list("inquiries"),
  });

  return (
    <div>
      <AdminPageHeader title="Form Inquiries" />
      {isLoading ? (
        <p className="text-cool-grey">Loading...</p>
      ) : (
        <CrudTable
          readOnly
          items={data?.data ?? []}
          columns={[
            { key: "type", label: "Type" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "organization", label: "Organization" },
            { key: "status", label: "Status" },
          ]}
        />
      )}
    </div>
  );
}
