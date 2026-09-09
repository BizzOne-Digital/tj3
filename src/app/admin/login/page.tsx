"use client";

import { authApi } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password required"),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: (data: FormData) => authApi.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-me"] });
      toast.success("Welcome back!");
      router.push("/admin");
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Invalid credentials");
    },
  });

  return (
    <div className="w-full max-w-md px-4">
      <div className="glass-panel rounded-2xl p-8">
        <div className="mb-8 flex flex-col items-center">
          <Logo size="lg" priority />
          <h1 className="mt-4 font-display text-2xl text-white">Admin Portal</h1>
          <p className="mt-1 text-sm text-cool-grey">Sign in to manage content</p>
        </div>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-5">
          <Input label="Email" type="email" {...register("email")} error={errors.email?.message} />
          <Input label="Password" type="password" {...register("password")} error={errors.password?.message} />
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
