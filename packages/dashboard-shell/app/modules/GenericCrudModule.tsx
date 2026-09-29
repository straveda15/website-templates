"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { apiClient } from "../lib/apiClient";

export interface CrudColumn {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

export interface CrudField {
  key: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "date" | "time" | "select" | "textarea";
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface CrudModuleConfig {
  title: string;
  eyebrow: string;
  description: string;
  apiPath: string;
  columns: CrudColumn[];
  fields: CrudField[];
  searchKeys: string[];
  addLabel?: string;
  emptyDefaults?: Record<string, string>;
  imageUploadPath?: (row: any) => string;
  imageField?: string;
}

export default function GenericCrudModule({ config }: { config: CrudModuleConfig }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  const defaultForm = useMemo(() => {
    const base: Record<string, string> = {};
    config.fields.forEach((f) => {
      base[f.key] = config.emptyDefaults?.[f.key] ?? (f.type === "select" ? f.options?.[0] || "" : "");
    });
    return base;
  }, [config]);

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await apiClient.list(config.apiPath);
      setRows(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Unable to load ${config.title.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.apiPath]);

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return rows;
    return rows.filter((row) =>
      config.searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(query))
    );
  }, [rows, search, config.searchKeys]);

  const openAdd = () => {
    setEditingRow(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  const openEdit = (row: any) => {
    setEditingRow(row);
    const next: Record<string, string> = {};
    config.fields.forEach((f) => {
      const value = row[f.key];
      next[f.key] = value === null || value === undefined ? "" : String(value).slice(0, f.type === "date" ? 10 : undefined);
    });
    setForm(next);
    setModalOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setError("");
      const body: Record<string, unknown> = {};
      config.fields.forEach((f) => {
        const raw = form[f.key];
        body[f.key] = raw === "" ? null : f.type === "number" ? Number(raw) : raw;
      });

      if (editingRow) {
        await apiClient.update(`${config.apiPath}/${editingRow.id}`, body);
      } else {
        await apiClient.create(config.apiPath, body);
      }

      setModalOpen(false);
      setEditingRow(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(`Delete this ${config.title.toLowerCase().slice(0, -1) || "record"}?`)) return;
    try {
      await apiClient.remove(`${config.apiPath}/${id}`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete.");
    }
  };

  const handleImageUpload = async (row: any, file: File) => {
    if (!config.imageUploadPath) return;
    try {
      const formData = new FormData();
      formData.append("image", file);
      const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api`;
      const response = await fetch(`${API_URL}${config.imageUploadPath(row)}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || "Upload failed");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image.");
    }
  };

  return (
    <section>
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8754e]">
            {config.eyebrow}
          </p>
          <h1 className="mt-1 font-serif text-[36px] font-semibold leading-tight tracking-[-0.02em] text-[#332720]">
            {config.title}
          </h1>
          <p className="mt-1 text-[14px] text-[#857466]">{config.description}</p>
        </div>

        <button
          onClick={openAdd}
          className="flex w-fit items-center gap-2 rounded-lg bg-[#9b5e2f] px-4 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#7e4825]"
        >
          {config.addLabel || `Add ${config.title.slice(0, -1) || config.title}`}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-[#e5c9bf] bg-[#fff5f1] px-4 py-3 text-[11px] text-[#8b5548]">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-[#eaded3] bg-[#fffaf5]">
        <div className="flex flex-col gap-3 border-b border-[#eee2d8] p-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[16px] font-semibold text-[#332720]">All {config.title}</h2>

          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8879]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${config.title.toLowerCase()}...`}
              className="h-10 w-full rounded-lg border border-[#eaded3] bg-white pl-9 pr-3 text-[12px] outline-none placeholder:text-[#a39488] focus:border-[#c88a51] sm:w-[240px]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-[#eee2d8] text-left">
                {config.columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-2.5 text-[9px] font-semibold uppercase tracking-wider text-[#9a8879]"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-2.5 text-[9px] font-semibold uppercase tracking-wider text-[#9a8879]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={config.columns.length + 1} className="p-10 text-center text-[13px] text-[#8d7c70]">
                    Loading...
                  </td>
                </tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={config.columns.length + 1} className="p-10 text-center text-[13px] text-[#9a8879]">
                    No records found.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.id} className="border-b border-[#f1e9e2] last:border-0 hover:bg-[#fff7f0]">
                    {config.columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-[12px] text-[#5f5148]">
                        {col.render ? col.render(row) : String(row[col.key] ?? "—")}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {config.imageUploadPath && (
                          <label className="cursor-pointer rounded-lg border border-[#eaded3] px-3 py-2 text-[11px] font-semibold text-[#5f5148] hover:bg-[#f0e5da]">
                            Upload
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(row, file);
                              }}
                            />
                          </label>
                        )}
                        <button
                          type="button"
                          onClick={() => openEdit(row)}
                          className="rounded-lg bg-[#3A2A20] px-3.5 py-2 text-[11px] font-semibold text-white transition hover:bg-[#514139]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="rounded-lg bg-[#3A2A20] px-3.5 py-2 text-[11px] font-semibold text-white transition hover:bg-[#514139]"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#eaded3] bg-[#fffaf5] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eee2d8] px-5 py-4">
              <h2 className="font-serif text-[22px] font-semibold">
                {editingRow ? `Edit ${config.title.slice(0, -1)}` : `Add ${config.title.slice(0, -1)}`}
              </h2>
              <button onClick={() => setModalOpen(false)} className="rounded-lg p-2 hover:bg-[#f0e5da]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {config.fields.map((field) => (
                  <label key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                    <span className="mb-1.5 block text-[10px] font-semibold text-[#6f6258]">{field.label}</span>

                    {field.type === "select" ? (
                      <select
                        value={form[field.key] ?? ""}
                        onChange={(e) => setForm((cur) => ({ ...cur, [field.key]: e.target.value }))}
                        className="h-10 w-full rounded-lg border border-[#eaded3] bg-white px-3 text-[11px]"
                      >
                        {(field.options || []).map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        required={field.required}
                        value={form[field.key] ?? ""}
                        onChange={(e) => setForm((cur) => ({ ...cur, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full rounded-lg border border-[#eaded3] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#c88a51]"
                      />
                    ) : (
                      <input
                        required={field.required}
                        type={field.type}
                        value={form[field.key] ?? ""}
                        onChange={(e) => setForm((cur) => ({ ...cur, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="h-10 w-full rounded-lg border border-[#eaded3] bg-white px-3 text-[11px] outline-none focus:border-[#c88a51]"
                      />
                    )}
                  </label>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg border border-[#eaded3] px-4 py-2.5 text-[11px] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#9b5e2f] px-5 py-2.5 text-[11px] font-semibold text-white"
                >
                  {editingRow ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
