"use client";

import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PARTNER_CATEGORIES, PARTNER_CONTENT, PARTNERSHIP_OPPORTUNITIES } from "@/lib/home-content";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";
import { toast } from "sonner";

type PartnerFormData = {
  organization: string;
  name: string;
  email: string;
  services: string;
  customerBase: string;
  sponsorInterest: string;
  eventInterest: string;
  message: string;
};

export function PartnerForm() {
  const { register, handleSubmit, reset } = useForm<PartnerFormData>();

  const mutation = useMutation({
    mutationFn: (data: PartnerFormData) =>
      api.submitInquiry({
        type: "partner",
        name: data.name,
        email: data.email,
        organization: data.organization,
        payload: data,
      }),
    onSuccess: () => {
      toast.success("Thank you! We received your partnership inquiry.");
      reset();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-10">
      <div className="glass-panel rounded-2xl p-8 space-y-6">
        <p className="text-cool-grey">{PARTNER_CONTENT.ecosystemIntro}</p>
        <div>
          <h3 className="font-display text-xl text-white">Who We&apos;re Looking For</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {PARTNER_CATEGORIES.map((cat) => (
              <div key={cat.title}>
                <h4 className="font-display text-lg text-ice">{cat.title}</h4>
                <ul className="mt-2 list-inside list-disc text-sm text-cool-grey">
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-xl text-white">Partnership Opportunities May Include</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {PARTNERSHIP_OPPORTUNITIES.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-cool-grey">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ice" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-xl text-white">{PARTNER_CONTENT.whyTitle}</h3>
          <div className="mt-4 space-y-3">
            {PARTNER_CONTENT.whyBody.map((p) => (
              <p key={p.slice(0, 40)} className="text-cool-grey">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-4 font-medium text-ice">{PARTNER_CONTENT.letsTalk}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="glass-panel space-y-5 rounded-2xl p-8">
        <h2 className="font-display text-2xl text-white">{PARTNER_CONTENT.formTitle}</h2>
        <p className="text-cool-grey">{PARTNER_CONTENT.formSubtitle}</p>
        <Input label="Business / Organization Name" {...register("organization", { required: true })} />
        <Input label="Full Name" {...register("name", { required: true })} />
        <Input label="Email" type="email" {...register("email", { required: true })} />
        <Textarea label="Services Offered" rows={3} {...register("services")} />
        <Textarea label="What does your existing customer base look like?" rows={3} {...register("customerBase")} />
        <Input label="Interested in becoming a sponsor?" {...register("sponsorInterest")} />
        <Input label="Interested in hosting events with us?" {...register("eventInterest")} />
        <Textarea label="Anything else you want us to know?" rows={4} {...register("message")} />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
