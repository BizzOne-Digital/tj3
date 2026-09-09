"use client";

import { adminApi } from "@/lib/api";
import { CrudTable, AdminPageHeader } from "@/features/admin/CrudTable";
import { useQuery } from "@tanstack/react-query";

interface BookingRecord {
  _id: string;
  name: string;
  email: string;
  facility: string;
  date: string;
  timeSlot: string;
  createdAt?: string;
}

export default function AdminBookingsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "bookings"],
    queryFn: () => adminApi.list<BookingRecord>("bookings"),
  });

  return (
    <div>
      <AdminPageHeader title="Bookings" />
      {isLoading ? (
        <p className="text-cool-grey">Loading...</p>
      ) : (
        <CrudTable
          readOnly
          items={data?.data ?? []}
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "facility", label: "Facility" },
            { key: "date", label: "Date" },
            { key: "timeSlot", label: "Time" },
          ]}
        />
      )}
    </div>
  );
}
