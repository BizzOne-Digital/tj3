"use client";

import { adminApi } from "@/lib/api";
import { CrudTable, AdminPageHeader } from "@/features/admin/CrudTable";
import { useQuery } from "@tanstack/react-query";

interface ContactRecord {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export default function AdminContactsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "contacts"],
    queryFn: () => adminApi.list<ContactRecord>("contacts"),
  });

  return (
    <div>
      <AdminPageHeader title="Contact Submissions" />
      {isLoading ? (
        <p className="text-cool-grey">Loading...</p>
      ) : (
        <CrudTable
          readOnly
          items={data?.data ?? []}
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "subject", label: "Subject" },
            {
              key: "message",
              label: "Message",
              render: (item) => (
                <span className="line-clamp-2 max-w-xs">{item.message}</span>
              ),
            },
          ]}
        />
      )}
    </div>
  );
}
