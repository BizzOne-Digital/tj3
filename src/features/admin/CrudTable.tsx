"use client";

import { Button } from "@/components/ui/Button";
import { Pencil, Trash2 } from "lucide-react";

export function CrudTable<T extends { _id: string }>({
  items,
  columns,
  onEdit,
  onDelete,
  isDeleting,
  readOnly = false,
}: {
  items: T[];
  columns: { key: keyof T | string; label: string; render?: (item: T) => React.ReactNode }[];
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  isDeleting?: string;
  readOnly?: boolean;
}) {
  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-surface p-8 text-center text-cool-grey">
        No items yet. Create your first entry.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-surface-elevated">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 font-medium text-cool-grey">
                {col.label}
              </th>
            ))}
            {!readOnly && <th className="px-4 py-3 font-medium text-cool-grey">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-b border-border/50 hover:bg-white/[0.02]">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-white">
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key as string] ?? "")}
                </td>
              ))}
              {!readOnly && (
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit?.(item)}
                      className="rounded p-1.5 text-ice hover:bg-white/10"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(item._id)}
                      disabled={isDeleting === item._id}
                      className="rounded p-1.5 text-red-400 hover:bg-red-400/10 disabled:opacity-50"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminPageHeader({
  title,
  onCreate,
}: {
  title: string;
  onCreate?: () => void;
}) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="font-display text-3xl text-white">{title}</h1>
      {onCreate && (
        <Button onClick={onCreate} size="sm">
          Add New
        </Button>
      )}
    </div>
  );
}
