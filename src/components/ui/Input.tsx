import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }
>(({ className, label, error, id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-cool-grey">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "w-full rounded-xl border border-border bg-surface px-4 py-3 text-white placeholder:text-cool-grey/50 focus:border-ice focus:outline-none focus:ring-1 focus:ring-ice/30",
          error && "border-red-400",
          className,
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }
>(({ className, label, error, id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-cool-grey">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        className={cn(
          "w-full rounded-xl border border-border bg-surface px-4 py-3 text-white placeholder:text-cool-grey/50 focus:border-ice focus:outline-none focus:ring-1 focus:ring-ice/30",
          error && "border-red-400",
          className,
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
});
Textarea.displayName = "Textarea";
