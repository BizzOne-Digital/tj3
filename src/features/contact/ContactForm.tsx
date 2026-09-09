"use client";

import { api } from "@/lib/api";
import { trackContactSubmit } from "@/lib/analytics";
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
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: (data: FormData) => api.submitContact(data),
    onSuccess: () => {
      trackContactSubmit();
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to send message. Please try again.");
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
      <Input label="Phone (optional)" type="tel" {...register("phone")} />
      <Input label="Subject" {...register("subject")} error={errors.subject?.message} />
      <Textarea label="Message" rows={5} {...register("message")} error={errors.message?.message} />
      <Button type="submit" disabled={mutation.isPending} className="w-full sm:w-auto">
        {mutation.isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
