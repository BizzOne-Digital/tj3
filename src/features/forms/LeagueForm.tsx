"use client";

import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { LEAGUE_SPORTS } from "@/lib/home-content";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LeagueFormData = {
  organization: string;
  name: string;
  email: string;
  sport: string;
  contactType: string;
  teamCount: string;
  ageGroups: string;
  spaceNeeds: string;
  practiceNeeds: string;
  tournaments: string;
  seasonal: string;
  permanentSpace: string;
};

export function LeagueForm() {
  const { register, handleSubmit, reset } = useForm<LeagueFormData>();

  const mutation = useMutation({
    mutationFn: (data: LeagueFormData) =>
      api.submitInquiry({
        type: "league",
        name: data.name,
        email: data.email,
        organization: data.organization,
        payload: data,
      }),
    onSuccess: () => {
      toast.success("Thank you! We received your league information.");
      reset();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="glass-panel space-y-5 rounded-2xl p-8">
      <Input label="Organization / League Name" {...register("organization", { required: true })} />
      <Input label="Full Name" {...register("name", { required: true })} />
      <Input label="Email" type="email" {...register("email", { required: true })} />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-cool-grey">What sport?</label>
        <select {...register("sport")} className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-white">
          <option value="">Select sport</option>
          {LEAGUE_SPORTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-cool-grey">Contact type</label>
        <select {...register("contactType")} className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-white">
          <option value="League Representative">League Representative</option>
          <option value="Coach">Coach</option>
        </select>
      </div>

      <Input label="How many teams in the league?" {...register("teamCount")} />
      <Input label="Which age groups are in the league?" {...register("ageGroups")} />
      <Textarea label="What kind of space and programming do you need?" rows={3} {...register("spaceNeeds")} />
      <Textarea label="What are your current practice/game issues or needs?" rows={3} {...register("practiceNeeds")} />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className="block text-sm text-cool-grey">Interested in tournaments?</label>
          <select {...register("tournaments")} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-white">
            <option>Yes</option><option>No</option><option>Unsure</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm text-cool-grey">Seasonal or year-round?</label>
          <select {...register("seasonal")} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-white">
            <option>Seasonal</option><option>Year-Round</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm text-cool-grey">Permanent training space?</label>
          <select {...register("permanentSpace")} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-white">
            <option>Yes</option><option>No</option><option>Maybe</option>
          </select>
        </div>
      </div>

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
