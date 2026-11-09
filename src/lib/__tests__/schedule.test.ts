import { describe, expect, it } from "vitest";
import { formatTimeRange, groupSchedule, timeToMinutes } from "../schedule";
import type { ScheduleItem } from "@/types/cms";

function item(partial: Partial<ScheduleItem>): ScheduleItem {
  return {
    _id: Math.random().toString(36).slice(2),
    title: "Class",
    scheduleType: "weekly",
    published: true,
    order: 0,
    ...partial,
  };
}

describe("timeToMinutes", () => {
  it("parses 12 and 24 hour times", () => {
    expect(timeToMinutes("5:00 PM")).toBe(17 * 60);
    expect(timeToMinutes("5pm")).toBe(17 * 60);
    expect(timeToMinutes("12:00 AM")).toBe(0);
    expect(timeToMinutes("12:30 PM")).toBe(12 * 60 + 30);
    expect(timeToMinutes("17:45")).toBe(17 * 60 + 45);
    expect(timeToMinutes("9:05 am")).toBe(9 * 60 + 5);
  });

  it("sorts unparseable or missing times last", () => {
    expect(timeToMinutes("")).toBe(Infinity);
    expect(timeToMinutes(undefined)).toBe(Infinity);
    expect(timeToMinutes("soon")).toBe(Infinity);
    expect(timeToMinutes("13:00 PM")).toBe(Infinity);
    expect(timeToMinutes("10:75")).toBe(Infinity);
  });
});

describe("groupSchedule", () => {
  it("orders weekly entries Monday-first and by start time, dropping empty days", () => {
    const { weekly } = groupSchedule(
      [
        item({ title: "Late", dayOfWeek: "Wednesday", startTime: "7:00 PM" }),
        item({ title: "Early", dayOfWeek: "Wednesday", startTime: "9:00 AM" }),
        item({ title: "Mon", dayOfWeek: "Monday", startTime: "4:00 PM" }),
        item({ title: "Sun", dayOfWeek: "Sunday", startTime: "1:00 PM" }),
      ],
      "2026-01-01",
    );
    expect(weekly.map((g) => g.day)).toEqual(["Monday", "Wednesday", "Sunday"]);
    expect(weekly[1].items.map((i) => i.title)).toEqual(["Early", "Late"]);
  });

  it("hides unpublished entries", () => {
    const { weekly } = groupSchedule([item({ dayOfWeek: "Monday", published: false })], "2026-01-01");
    expect(weekly).toEqual([]);
  });

  it("keeps only upcoming events (today included), sorted by date then time", () => {
    const { events } = groupSchedule(
      [
        item({ title: "past", scheduleType: "event", eventDate: "2025-12-31" }),
        item({ title: "later", scheduleType: "event", eventDate: "2026-03-01", startTime: "10:00 AM" }),
        item({ title: "today pm", scheduleType: "event", eventDate: "2026-01-01", startTime: "6:00 PM" }),
        item({ title: "today am", scheduleType: "event", eventDate: "2026-01-01", startTime: "8:00 AM" }),
        item({ title: "no date", scheduleType: "event" }),
      ],
      "2026-01-01",
    );
    expect(events.map((e) => e.title)).toEqual(["today am", "today pm", "later"]);
  });

  it("does not show events in the weekly timetable", () => {
    const { weekly } = groupSchedule(
      [item({ scheduleType: "event", dayOfWeek: "Monday", eventDate: "2026-02-02" })],
      "2026-01-01",
    );
    expect(weekly).toEqual([]);
  });
});

describe("formatTimeRange", () => {
  it("formats ranges and single times", () => {
    expect(formatTimeRange({ startTime: "5 PM", endTime: "6 PM" })).toBe("5 PM – 6 PM");
    expect(formatTimeRange({ startTime: "5 PM" })).toBe("5 PM");
    expect(formatTimeRange({})).toBe("");
  });
});
