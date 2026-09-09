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

type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "select" | "image";
  folder?: UploadFolder;
  options?: { value: string; label: string }[];
};

export function GenericCrudPage<T extends { _id: string }>({
  resource,
  title,
  columns,
  fields,
  defaultValues = {},
}: {
  resource: CrudResource;
  title: string;
  columns: Column<T>[];
  fields: Field[];
  defaultValues?: Record<string, unknown>;
}) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<T | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, unknown>>(defaultValues);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", resource],
    queryFn: () => adminApi.list<T>(resource),
  });

  const createMutation = useMutation({
    mutationFn: (payload: Partial<T>) => adminApi.create<T>(resource, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", resource] });
      toast.success("Created successfully");
      setCreating(false);
      setForm(defaultValues);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<T> }) =>
      adminApi.update<T>(resource, id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", resource] });
      toast.success("Updated successfully");
      setEditing(null);
      setForm(defaultValues);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.delete(resource, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", resource] });
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateMutation.mutate({ id: editing._id, payload: form as Partial<T> });
    } else {
      createMutation.mutate(form as Partial<T>);
    }
  };

  const setField = (name: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const showForm = creating || editing;

  return (
    <div>
      <AdminPageHeader title={title} onCreate={openCreate} />

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-panel mb-8 space-y-4 rounded-xl p-6">
          <h2 className="font-display text-xl text-white">
            {editing ? "Edit" : "Create"} {title.slice(0, -1)}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              if (field.type === "image") {
                return (
                  <div key={field.name} className="sm:col-span-2">
                    <LocalImageField
                      label={field.label}
                      folder={field.folder ?? "misc"}
                      value={String(form[field.name] ?? "")}
                      onChange={(url) => setField(field.name, url)}
                    />
                  </div>
                );
              }
              if (field.type === "textarea") {
                return (
                  <div key={field.name} className="sm:col-span-2">
                    <Textarea
                      label={field.label}
                      value={String(form[field.name] ?? "")}
                      onChange={(e) => setField(field.name, e.target.value)}
                    />
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
                  </div>
                );
              }
              return (
                <Input
                  key={field.name}
                  label={field.label}
                  type={field.type === "number" ? "number" : "text"}
                  value={String(form[field.name] ?? "")}
                  onChange={(e) =>
                    setField(
                      field.name,
                      field.type === "number" ? Number(e.target.value) : e.target.value,
                    )
                  }
                />
              );
            })}
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
              {editing ? "Update" : "Create"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setCreating(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="text-cool-grey">Loading...</p>
      ) : (
        <CrudTable
          items={data?.data ?? []}
          columns={columns}
          onEdit={openEdit}
          onDelete={(id) => deleteMutation.mutate(id)}
          isDeleting={deleteMutation.isPending ? deleteMutation.variables : undefined}
        />
      )}
    </div>
  );
}
