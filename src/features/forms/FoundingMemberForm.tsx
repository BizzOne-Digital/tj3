"use client";

import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FOUNDING_INTERESTS, FOUNDING_SPORTS } from "@/lib/home-content";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FoundingFormData = {
  name: string;
  email: string;
  message: string;
  zipCode: string;
  childAges: string;
};

export function FoundingMemberForm() {
  const { register, handleSubmit, reset } = useForm<FoundingFormData>();
  const [interests, setInterests] = useState<string[]>([]);
  const [sports, setSports] = useState<string[]>([]);

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((i) => i !== value) : [...list, value]);
  };

  const mutation = useMutation({
    mutationFn: (data: FoundingFormData) =>
      api.submitInquiry({
        type: "founding_member",
        name: data.name,
        email: data.email,
        payload: { ...data, interests, sports },
      }),
    onSuccess: () => {
      toast.success("Thank you! You're on our founding members interest list.");
      reset();
      setInterests([]);
      setSports([]);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="glass-panel space-y-5 rounded-2xl p-8">
      <Input label="Full Name" {...register("name", { required: true })} />
      <Input label="Email" type="email" {...register("email", { required: true })} />
      <Textarea label="Message" rows={3} {...register("message")} />
      <Input label="Zip Code" {...register("zipCode")} />
      <Input label="What age(s) are your children?" {...register("childAges")} />

      <div>
        <p className="mb-3 text-sm font-medium text-cool-grey">Which are your interests?</p>
        <div className="flex flex-wrap gap-2">
          {FOUNDING_INTERESTS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggle(interests, setInterests, item)}
              className={`rounded-full border px-3 py-1.5 text-xs ${interests.includes(item) ? "border-ice bg-ice/20 text-white" : "border-border text-cool-grey"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-cool-grey">Which sports are you interested in?</p>
        <div className="flex flex-wrap gap-2">
          {FOUNDING_SPORTS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => toggle(sports, setSports, item)}
              className={`rounded-full border px-3 py-1.5 text-xs ${sports.includes(item) ? "border-ice bg-ice/20 text-white" : "border-border text-cool-grey"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
