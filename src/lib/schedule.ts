import type { ScheduleItem } from "@/types/cms";

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

/** "5:30 PM" | "17:30" | "5pm" -> minutes since midnight (unparseable -> Infinity so it sorts last). */
export function timeToMinutes(time?: string): number {
  if (!time) return Number.POSITIVE_INFINITY;
  const m = time.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*([ap]\.?m?\.?)?$/i);
  if (!m) return Number.POSITIVE_INFINITY;
  let hours = Number(m[1]);
  const minutes = Number(m[2] ?? 0);
  const meridiem = m[3]?.toLowerCase();
  if (minutes > 59) return Number.POSITIVE_INFINITY;
  if (meridiem) {
    if (hours < 1 || hours > 12) return Number.POSITIVE_INFINITY;
    if (meridiem.startsWith("p") && hours !== 12) hours += 12;
    if (meridiem.startsWith("a") && hours === 12) hours = 0;
  } else if (hours > 23) {
    return Number.POSITIVE_INFINITY;
  }
  return hours * 60 + minutes;
}

export function formatTimeRange(item: Pick<ScheduleItem, "startTime" | "endTime">): string {
  if (item.startTime && item.endTime) return `${item.startTime} – ${item.endTime}`;
  return item.startTime || item.endTime || "";
}

export interface ScheduleGroups {
  weekly: { day: string; items: ScheduleItem[] }[];
  events: ScheduleItem[];
}

/**
 * Split published schedule entries into a Monday-first weekly timetable and a
 * date-sorted list of upcoming one-time events (past events are hidden).
 * `today` is a YYYY-MM-DD string so the result is deterministic and testable.
 */
export function groupSchedule(items: ScheduleItem[], today: string): ScheduleGroups {
  const published = items.filter((i) => i.published !== false);

  const weekly = DAYS_OF_WEEK.map((day) => ({
    day: day as string,
    items: published
      .filter((i) => i.scheduleType !== "event" && i.dayOfWeek === day)
      .sort(
        (a, b) =>
          timeToMinutes(a.startTime) - timeToMinutes(b.startTime) || (a.order ?? 0) - (b.order ?? 0),
      ),
  })).filter((g) => g.items.length > 0);

  const events = published
    .filter((i) => i.scheduleType === "event" && i.eventDate && i.eventDate >= today)
    .sort(
      (a, b) =>
        String(a.eventDate).localeCompare(String(b.eventDate)) ||
        timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
    );

  return { weekly, events };
}

export function formatEventDate(date?: string): string {
  if (!date) return "";
  const d = new Date(`${date}T12:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}
