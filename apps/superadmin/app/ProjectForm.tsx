"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface Template {
  id: string;
  label: string;
}

interface ModuleEntry {
  id: string;
  label: string;
  implemented: boolean;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProjectForm({ templates, modules }: { templates: Template[]; modules: ModuleEntry[] }) {
  const router = useRouter();

  const [clientName, setClientName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [templateId, setTemplateId] = useState(templates[0]?.id || "");
  const [selectedModules, setSelectedModules] = useState<Set<string>>(
    new Set(modules.filter((m) => m.implemented).map((m) => m.id))
  );
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [lastDownload, setLastDownload] = useState("");

  const implementedCount = useMemo(() => modules.filter((m) => m.implemented).length, [modules]);

  const handleClientNameChange = (value: string) => {
    setClientName(value);
    if (!slugTouched) setSlug(slugify(value));
  };

  const toggleModule = (id: string) => {
    setSelectedModules((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const handleGenerate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLastDownload("");

    if (!clientName.trim() || !slug.trim() || !templateId) {
      setError("Client name, slug and template are all required.");
      return;
    }

    try {
      setGenerating(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName.trim(),
          slug: slug.trim(),
          template: templateId,
          enabledModules: Array.from(selectedModules),
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || "Failed to generate project.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setLastDownload(`${slug}.zip`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate project.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6eee5] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8754e]">Superadmin</p>
            <h1 className="mt-1 font-serif text-[32px] font-semibold text-[#332720]">New Project</h1>
            <p className="mt-1 text-[13px] text-[#857466]">
              Pick a template and dashboard modules, then download a standalone project zip.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="h-10 rounded-lg border border-[#eaded3] bg-white px-4 text-[12px] font-semibold text-[#5f5148] hover:bg-[#f0e5da]"
          >
            Sign out
          </button>
        </div>

        <form onSubmit={handleGenerate} className="rounded-2xl border border-[#eaded3] bg-[#fffaf5] p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-1.5 block text-[11px] font-semibold text-[#6f6258]">Client Name</span>
              <input
                required
                value={clientName}
                onChange={(e) => handleClientNameChange(e.target.value)}
                placeholder="e.g. Maison Furniture Co."
                className="h-11 w-full rounded-lg border border-[#eaded3] bg-white px-3 text-[13px] outline-none focus:border-[#c88a51]"
              />
            </label>

            <label>
              <span className="mb-1.5 block text-[11px] font-semibold text-[#6f6258]">Slug</span>
              <input
                required
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
                placeholder="e.g. maison-furniture"
                className="h-11 w-full rounded-lg border border-[#eaded3] bg-white px-3 text-[13px] outline-none focus:border-[#c88a51]"
              />
            </label>
          </div>

          <div className="mt-5">
            <span className="mb-2 block text-[11px] font-semibold text-[#6f6258]">Template</span>
            <div className="flex flex-wrap gap-2">
              {templates.length === 0 && <p className="text-[12px] text-[#9a8879]">No templates found.</p>}
              {templates.map((t) => (
                <label
                  key={t.id}
                  className={`cursor-pointer rounded-lg border px-4 py-2 text-[12px] font-semibold transition ${
                    templateId === t.id
                      ? "border-[#9b5e2f] bg-[#9b5e2f] text-white"
                      : "border-[#eaded3] bg-white text-[#5f5148] hover:bg-[#f0e5da]"
                  }`}
                >
                  <input
                    type="radio"
                    name="template"
                    value={t.id}
                    checked={templateId === t.id}
                    onChange={() => setTemplateId(t.id)}
                    className="hidden"
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <span className="mb-2 block text-[11px] font-semibold text-[#6f6258]">
              Dashboard Modules ({selectedModules.size} of {implementedCount} selected)
            </span>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {modules.map((mod) => (
                <label
                  key={mod.id}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] ${
                    mod.implemented ? "border-[#eaded3] bg-white" : "border-[#eee2d8] bg-[#f6f0e8] text-[#a89a8c]"
                  }`}
                >
                  <input
                    type="checkbox"
                    disabled={!mod.implemented}
                    checked={selectedModules.has(mod.id)}
                    onChange={() => toggleModule(mod.id)}
                  />
                  {mod.label}
                  {!mod.implemented && <span className="ml-auto text-[9px] uppercase tracking-wide">Soon</span>}
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-lg border border-[#e5c9bf] bg-[#fff5f1] px-4 py-3 text-[12px] text-[#8b5548]">
              {error}
            </div>
          )}

          {lastDownload && !error && (
            <div className="mt-5 rounded-lg border border-[#c9d9c9] bg-[#f2f7f2] px-4 py-3 text-[12px] text-[#3e704d]">
              Downloaded {lastDownload}. Unzip it, fill in the .env files, and follow the generated README.
            </div>
          )}

          <button
            type="submit"
            disabled={generating}
            className="mt-6 h-11 w-full rounded-lg bg-[#9b5e2f] text-[13px] font-semibold text-white transition hover:bg-[#7e4825] disabled:opacity-60"
          >
            {generating ? "Generating..." : "Generate & Download Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
