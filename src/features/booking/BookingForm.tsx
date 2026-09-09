"use client";

import { api } from "@/lib/api";
import { trackBookingSubmit } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone is required"),
  facility: z.string().min(1, "Select a facility"),
  date: z.string().min(1, "Date is required"),
  timeSlot: z.string().min(1, "Time slot is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function BookingForm({ facilities }: { facilities: string[] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: (data: FormData) => api.submitBooking(data),
    onSuccess: () => {
      trackBookingSubmit();
      toast.success("Booking request submitted! We'll confirm shortly.");
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to submit booking. Please try again.");
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="glass-panel space-y-5 rounded-2xl p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Name" {...register("name")} error={errors.name?.message} />
        <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
      </div>
      <Input label="Phone" type="tel" {...register("phone")} error={errors.phone?.message} />

      <div className="space-y-1.5">
        <label htmlFor="facility" className="block text-sm font-medium text-cool-grey">
          Facility
        </label>
        <select
          id="facility"
          {...register("facility")}
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-white focus:border-ice focus:outline-none"
        >
          <option value="">Select facility</option>
          {facilities.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        {errors.facility && <p className="text-sm text-red-400">{errors.facility.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Date" type="date" {...register("date")} error={errors.date?.message} />
        <Input label="Time Slot" placeholder="e.g. 6:00 PM - 8:00 PM" {...register("timeSlot")} error={errors.timeSlot?.message} />
      </div>

      <Textarea label="Notes (optional)" rows={3} {...register("notes")} />
      <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto">
        {mutation.isPending ? "Submitting..." : "Request Booking"}
      </Button>
    </form>
  );
}
