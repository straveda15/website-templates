"use client";

import { useEffect, useState } from "react";
import { BarChart3, CircleDollarSign, ClipboardList, Package, UserPlus, Users } from "lucide-react";
import { apiClient } from "../lib/apiClient";
import { formatCurrency } from "../lib/format";

interface Summary {
  totalLeads: number;
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
  leadsByStatus: { status: string; count: number }[];
  ordersByStatus: { status: string; count: number }[];
}

export default function AnalyticsModule() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get("/analytics/summary")
      .then((result) => setSummary(result.data))
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load analytics."));
  }, []);

  const cards = summary
    ? [
        { title: "Total Leads", value: String(summary.totalLeads), icon: UserPlus },
        { title: "Total Customers", value: String(summary.totalCustomers), icon: Users },
        { title: "Total Orders", value: String(summary.totalOrders), icon: ClipboardList },
        { title: "Total Revenue", value: formatCurrency(summary.totalRevenue), icon: CircleDollarSign },
        { title: "Low Stock Products", value: String(summary.lowStockProducts), icon: Package },
      ]
    : [];

  return (
    <section>
      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8754e]">Insights</p>
        <h1 className="mt-1 font-serif text-[36px] font-semibold leading-tight tracking-[-0.02em] text-[#332720]">
          Analytics
        </h1>
        <p className="mt-1 text-[14px] text-[#857466]">A quick read on how the business is doing.</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-[#e5c9bf] bg-[#fff5f1] px-4 py-3 text-[11px] text-[#8b5548]">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        {(summary ? cards : Array.from({ length: 5 })).map((card: any, i) => (
          <div key={card?.title || i} className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[9px] font-medium text-[#8e7969]">{card?.title || "Loading..."}</p>
                <p className="mt-1.5 font-sans text-[22px] font-semibold leading-none text-[#332720]">
                  {card?.value ?? "…"}
                </p>
              </div>
              {card && (
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f2e5d8] text-[#9b5e2f]">
                  <card.icon size={17} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {summary && (
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-4">
            <h2 className="flex items-center gap-2 text-[14px] font-semibold text-[#30251f]">
              <BarChart3 size={15} /> Leads by Status
            </h2>
            <div className="mt-4 space-y-2.5">
              {summary.leadsByStatus.length === 0 ? (
                <p className="text-[11px] text-[#9a8879]">No leads yet.</p>
              ) : (
                summary.leadsByStatus.map((row) => (
                  <StatusBar key={row.status} label={row.status} count={row.count} total={summary.totalLeads} />
                ))
              )}
            </div>
          </div>

          <div className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-4">
            <h2 className="flex items-center gap-2 text-[14px] font-semibold text-[#30251f]">
              <BarChart3 size={15} /> Orders by Status
            </h2>
            <div className="mt-4 space-y-2.5">
              {summary.ordersByStatus.length === 0 ? (
                <p className="text-[11px] text-[#9a8879]">No orders yet.</p>
              ) : (
                summary.ordersByStatus.map((row) => (
                  <StatusBar key={row.status} label={row.status} count={row.count} total={summary.totalOrders} />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function StatusBar({ label, count, total }: { label: string; count: number; total: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-[10px] text-[#6e5d50]">
        <span>{label}</span>
        <span>
          {count} · {pct}%
        </span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-[#eee3d9]">
        <div className="h-full rounded-full bg-[#9b5e2f]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
