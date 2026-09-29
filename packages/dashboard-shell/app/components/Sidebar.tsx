"use client";

import { dashboardConfig } from "../dashboard.config";
import { ENABLED_MODULES } from "../modules.config";

export default function Sidebar({
  open,
  activeNav,
  onNavigate,
}: {
  open: boolean;
  activeNav: string;
  onNavigate: (label: string) => void;
}) {
  const mainModules = ENABLED_MODULES.filter((m) => m.section === "main");
  const adminModules = ENABLED_MODULES.filter((m) => m.section === "admin");

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-[238px] flex-col bg-[#2f2119] text-[#f9f0e7] shadow-xl transition-transform duration-300 lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c88b52]/70 text-[#dca56e]">
            ✦
          </div>
          <div>
            <p className="font-serif text-[18px] tracking-wide">{dashboardConfig.brandName}</p>
            <p className="text-[7px] uppercase tracking-[0.28em] text-[#c7a98d]">{dashboardConfig.brandTagline}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5">
        <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b99e89]">Main Menu</p>

        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onNavigate("Dashboard")}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
              activeNav === "Dashboard" ? "bg-[#c88a51] text-white shadow-sm" : "text-[#e8d8ca]/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="text-[11px] font-medium">Dashboard</span>
          </button>

          {mainModules.map((mod) => {
            const Icon = mod.icon;
            const active = activeNav === mod.label;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => onNavigate(mod.label)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                  active ? "bg-[#c88a51] text-white shadow-sm" : "text-[#e8d8ca]/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span className="text-[11px] font-medium">{mod.label}</span>
              </button>
            );
          })}
        </div>

        {adminModules.length > 0 && (
          <>
            <div className="my-5 border-t border-white/10" />
            <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b99e89]">
              Administration
            </p>
            <div className="space-y-1">
              {adminModules.map((mod) => {
                const Icon = mod.icon;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => onNavigate(mod.label)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                      activeNav === mod.label ? "bg-[#c88a51] text-white" : "text-[#e8d8ca]/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={17} />
                    <span className="text-[11px] font-medium">{mod.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </nav>

      <div className="m-4 rounded-xl bg-[#4a3325] p-3">
        <p className="font-serif text-[14px] text-white">Create Beautiful</p>
        <p className="text-[9px] text-[#d9c1ad]">Spaces that feel like home.</p>
      </div>
    </aside>
  );
}
