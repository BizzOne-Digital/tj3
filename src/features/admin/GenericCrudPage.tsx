"use client";

import { adminApi } from "@/lib/api";
import type { UploadFolder } from "@/lib/upload-helpers";
import type { CrudResource } from "@/types/cms";
import { LocalImageField } from "./LocalImageField";
import { AdminPageHeader, CrudTable } from "./CrudTable";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
};

export type CrudField = {
  name: string;
  label: string;
  /** `lines` edits a string[] field, one entry per line. */
  type?: "text" | "textarea" | "number" | "checkbox" | "select" | "image" | "lines" | "date";
  folder?: UploadFolder;
  options?: { value: string; label: string }[];
  placeholder?: string;
  help?: string;
};

export function GenericCrudPage<T extends { _id: string }>({
  resource,
  title,
  itemLabel,
  columns,
  fields,
  defaultValues = {},
}: {
  resource: CrudResource;
  title: string;
  /** Singular name used in the form heading, e.g. "Coach". Defaults to the title. */
  itemLabel?: string;
  columns: Column<T>[];
  fields: CrudField[];
  defaultValues?: Record<string, unknown>;
}) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<T | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>(defaultValues);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", resource],
    queryFn: () => adminApi.list<T>(resource),
  });

  const closeForm = () => {
    setCreating(false);
    setEditing(null);
    setForm(defaultValues);
  };

  const onSaved = (message: string) => {
    queryClient.invalidateQueries({ queryKey: ["admin", resource] });
    queryClient.invalidateQueries({ queryKey: ["admin-count", resource] });
    toast.success(message);
    closeForm();
  };

  const createMutation = useMutation({
    mutationFn: (payload: Partial<T>) => adminApi.create<T>(resource, payload),
    onSuccess: () => onSaved("Created successfully"),
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<T> }) =>
      adminApi.update<T>(resource, id, payload),
    onSuccess: () => onSaved("Updated successfully"),
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.delete(resource, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", resource] });
      queryClient.invalidateQueries({ queryKey: ["admin-count", resource] });
      toast.success("Deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const openCreate = () => {
    setCreating(true);
    setEditing(null);
    setForm(defaultValues);
  };

  const openEdit = (item: T) => {
    setEditing(item);
    setCreating(false);
    setForm({ ...defaultValues, ...item } as Record<string, unknown>);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buildPayload = () => {
    const payload: Record<string, unknown> = { ...form };
    for (const field of fields) {
      if (field.type === "lines") {
        const raw = payload[field.name];
        payload[field.name] = (Array.isArray(raw) ? raw : [])
          .map((line) => String(line).trim())
          .filter(Boolean);
      }
    }
    return payload as Partial<T>;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = buildPayload();
    if (editing) {
      updateMutation.mutate({ id: editing._id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const setField = (name: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this item permanently? This cannot be undone.")) {
      deleteMutation.mutate(id);
    }
  };

  const showForm = creating || editing;
  const singular = itemLabel ?? title;

  return (
    <div>
      <AdminPageHeader title={title} onCreate={openCreate} />

      {showForm && (
        <form
          key={editing?._id ?? "new"}
          onSubmit={handleSubmit}
          className="glass-panel mb-8 space-y-4 rounded-xl p-6"
        >
          <h2 className="font-display text-xl text-white">
            {editing ? "Edit" : "Create"} {singular}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const help = field.help ? (
                <p className="mt-1 text-xs text-cool-grey/70">{field.help}</p>
              ) : null;

              if (field.type === "image") {
                return (
                  <div key={field.name} className="sm:col-span-2">
                    <LocalImageField
                      label={field.label}
                      folder={field.folder ?? "misc"}
                      value={String(form[field.name] ?? "")}
                      onChange={(url) => setField(field.name, url)}
                    />
                    {help}
                  </div>
                );
              }
              if (field.type === "textarea") {
                return (
                  <div key={field.name} className="sm:col-span-2">
                    <Textarea
                      label={field.label}
                      placeholder={field.placeholder}
                      rows={6}
                      value={String(form[field.name] ?? "")}
                      onChange={(e) => setField(field.name, e.target.value)}
                    />
                    {help}
                  </div>
                );
              }
              if (field.type === "lines") {
                const lines = Array.isArray(form[field.name]) ? (form[field.name] as unknown[]) : [];
                return (
                  <div key={field.name} className="sm:col-span-2">
                    <Textarea
                      label={`${field.label} (one per line)`}
                      placeholder={field.placeholder}
                      rows={5}
                      value={lines.map(String).join("\n")}
                      onChange={(e) => setField(field.name, e.target.value.split("\n"))}
                    />
                    {help}
                  </div>
                );
              }
              if (field.type === "checkbox") {
                return (
                  <label key={field.name} className="flex items-center gap-2 text-sm text-cool-grey">
                    <input
                      type="checkbox"
                      checked={Boolean(form[field.name])}
                      onChange={(e) => setField(field.name, e.target.checked)}
                      className="rounded"
                    />
                    {field.label}
                  </label>
                );
              }
              if (field.type === "select" && field.options) {
                return (
                  <div key={field.name} className="space-y-1.5">
                    <label className="block text-sm font-medium text-cool-grey">{field.label}</label>
                    <select
                      value={String(form[field.name] ?? "")}
                      onChange={(e) => setField(field.name, e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-white"
                    >
                      {field.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                    {help}
                  </div>
                );
              }
              if (field.type === "date") {
                return (
                  <div key={field.name}>
                    <Input
                      label={field.label}
                      type="date"
                      value={String(form[field.name] ?? "").slice(0, 10)}
                      onChange={(e) => setField(field.name, e.target.value)}
                    />
                    {help}
                  </div>
                );
              }
              return (
                <div key={field.name}>
                  <Input
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type === "number" ? "number" : "text"}
                    value={String(form[field.name] ?? "")}
                    onChange={(e) =>
                      setField(
                        field.name,
                        field.type === "number" ? Number(e.target.value) : e.target.value,
                      )
                    }
                  />
                  {help}
                </div>
              );
            })}
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : editing
                  ? "Update"
                  : "Create"}
            </Button>
            <Button type="button" variant="ghost" onClick={closeForm}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="text-cool-grey">Loading...</p>
      ) : isError ? (
        <p className="rounded-xl border border-red-400/40 bg-red-400/10 p-4 text-red-300">
          {error instanceof Error ? error.message : "Failed to load items."}
        </p>
      ) : (
        <CrudTable
          items={data?.data ?? []}
          columns={columns}
          onEdit={openEdit}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending ? deleteMutation.variables : undefined}
        />
      )}
    </div>
  );
}
