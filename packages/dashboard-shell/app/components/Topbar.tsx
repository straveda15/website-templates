"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { dashboardConfig } from "../dashboard.config";

export default function Topbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-[66px] items-center justify-between border-b border-[#e8dbcf] bg-[#fffaf5]/95 px-4 backdrop-blur-md sm:px-6 lg:px-7">
      <div className="flex items-center gap-3">
        <button onClick={onOpenSidebar} className="rounded-lg p-2 text-[#67564a] hover:bg-[#f0e5da] lg:hidden">
          <Menu size={20} />
        </button>

        <div className="relative hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a18d7d]" />
          <input
            type="text"
            placeholder="Search leads, orders, customers, products..."
            className="h-10 w-[300px] rounded-lg border border-[#eadfd5] bg-[#f8eee4] pl-9 pr-4 text-[11px] outline-none placeholder:text-[#9b8777] focus:border-[#c88a51]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative rounded-lg p-2 text-[#5e4c40] hover:bg-[#f0e5da]">
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#a95c32] text-[7px] text-white">
            3
          </span>
        </button>

        <div className="hidden h-7 w-px bg-[#e5d8cc] sm:block" />

        <button className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d6bca5] text-[11px] font-semibold text-[#533d2e]">
            {dashboardConfig.adminUser.initials}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-[11px] font-semibold text-[#3e3028]">{dashboardConfig.adminUser.name}</p>
            <p className="text-[9px] text-[#9b897b]">{dashboardConfig.adminUser.role}</p>
          </div>
          <ChevronDown size={13} className="text-[#7d695b]" />
        </button>
      </div>
    </header>
  );
}
