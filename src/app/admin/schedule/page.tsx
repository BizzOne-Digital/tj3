"use client";

import { GenericCrudPage } from "@/features/admin/GenericCrudPage";
import { DAYS_OF_WEEK, formatTimeRange } from "@/lib/schedule";
import type { ScheduleItem } from "@/types/cms";

export default function AdminSchedulePage() {
  return (
    <GenericCrudPage<ScheduleItem>
      resource="schedule"
      title="Schedule"
      itemLabel="Schedule Entry"
      defaultValues={{ published: true, order: 0, scheduleType: "weekly", dayOfWeek: "Monday" }}
      columns={[
        { key: "title", label: "Program" },
        {
          key: "when",
          label: "When",
          render: (i) =>
            `${i.scheduleType === "event" ? i.eventDate ?? "" : i.dayOfWeek ?? ""} ${formatTimeRange(i)}`.trim(),
        },
        { key: "coach", label: "Coach" },
        { key: "location", label: "Location" },
        { key: "published", label: "Status", render: (i) => (i.published ? "Published" : "Hidden") },
      ]}
      fields={[
        { name: "title", label: "Program / class name", placeholder: "Youth Baseball Clinic" },
        { name: "category", label: "Category / sport", placeholder: "Baseball" },
        {
          name: "scheduleType",
          label: "Type",
          type: "select",
          options: [
            { value: "weekly", label: "Weekly (repeats every week)" },
            { value: "event", label: "One-time event (specific date)" },
          ],
        },
        {
          name: "dayOfWeek",
          label: "Day of week (weekly entries)",
          type: "select",
          options: DAYS_OF_WEEK.map((d) => ({ value: d, label: d })),
        },
        {
          name: "eventDate",
          label: "Event date (one-time events)",
          type: "date",
          help: "Past events are hidden from the website automatically.",
        },
        { name: "startTime", label: "Start time", placeholder: "5:00 PM" },
        { name: "endTime", label: "End time", placeholder: "6:30 PM" },
        { name: "coach", label: "Coach / instructor", placeholder: "Coach name" },
        { name: "location", label: "Location / court", placeholder: "Court 1" },
        { name: "ageGroup", label: "Age group", placeholder: "Ages 8-12" },
        { name: "price", label: "Price", placeholder: "$15 per session" },
        { name: "registrationUrl", label: "Registration link (optional)" },
        { name: "description", label: "Details", type: "textarea" },
        { name: "order", label: "Order (tie-breaker for same start time)", type: "number" },
        { name: "published", label: "Published", type: "checkbox" },
      ]}
    />
  );
}
