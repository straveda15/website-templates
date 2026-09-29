"use client";

import {
  Armchair,
  BedDouble,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  MoreHorizontal,
  Package,
  ShoppingBag,
  Truck,
  UserPlus,
} from "lucide-react";
import { ENABLED_MODULE_IDS } from "../modules.config";

type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  interested_in: string;
  status: string;
  next_follow_up: string | null;
  created_at: string;
};

const statusStyles: Record<string, string> = {
  New: "bg-[#3A2A20] text-white",
  Contacted: "bg-[#3A2A20] text-white",
  "Follow-up": "bg-[#3A2A20] text-white",
  Quotation: "bg-[#3A2A20] text-white",
  Converted: "bg-[#3A2A20] text-white",
  Delivered: "bg-[#3A2A20] text-white",
  Shipped: "bg-[#3A2A20] text-white",
  Processing: "bg-[#3A2A20] text-white",
  Pending: "bg-[#3A2A20] text-white",
};

const staticOrders = [
  ["#ORD001", "Rahul Mehta", "₹48,999", "Paid", "Processing"],
  ["#ORD002", "Sneha Kulkarni", "₹32,499", "Pending", "Shipped"],
  ["#ORD003", "Amit Patil", "₹28,999", "Paid", "Delivered"],
  ["#ORD004", "Riya Sharma", "₹56,999", "Partially Paid", "Processing"],
];

const followUps = [
  ["Amit Patil", "87654 32109", "Product Discussion", "24 Sep, 11:00 AM"],
  ["Pooja Deshmukh", "91234 56789", "Quotation Follow-up", "24 Sep, 02:00 PM"],
  ["Riya Sharma", "98765 43210", "Final Confirmation", "25 Sep, 10:30 AM"],
  ["Neha Gupta", "99887 66554", "Payment Discussion", "25 Sep, 04:00 PM"],
];

const categories = [
  { name: "Sofas", orders: 42, percentage: 32, icon: Armchair },
  { name: "Dining Tables", orders: 28, percentage: 21, icon: Armchair },
  { name: "Beds", orders: 24, percentage: 18, icon: BedDouble },
  { name: "Chairs", orders: 18, percentage: 14, icon: Armchair },
  { name: "Decor", orders: 12, percentage: 9, icon: Package },
];

const enabled = (id: string) => ENABLED_MODULE_IDS.includes(id);

export default function DashboardOverview({
  leads,
  leadsLoading,
  goTo,
  initials,
}: {
  leads: Lead[];
  leadsLoading: boolean;
  goTo: (label: string) => void;
  initials: (name: string) => string;
}) {
  const totalLeads = leads.length;
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const recent = leads.slice(0, 5);

  const kpiCards = [
    enabled("leads") && {
      title: "Total Leads",
      value: leadsLoading ? "..." : String(totalLeads),
      note: `${newLeads} New Leads`,
      icon: UserPlus,
    },
    enabled("orders") && { title: "Total Orders", value: "86", note: "12 Pending", icon: ShoppingBag },
    enabled("orders") && { title: "Total Revenue", value: "₹4,28,900", note: "This Month", icon: CircleDollarSign },
    enabled("payments") && { title: "Pending Payments", value: "₹72,450", note: "18 Orders", icon: CreditCard },
    enabled("shipments") && { title: "Shipped Orders", value: "34", note: "In Transit", icon: Truck },
    enabled("shipments") && { title: "Delivered Orders", value: "48", note: "Completed", icon: Package },
  ].filter(Boolean) as { title: string; value: string; note: string; icon: typeof UserPlus }[];

  return (
    <>
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#a8754e]">
            Business Overview
          </p>
          <h1 className="font-serif text-[32px] font-semibold tracking-[-0.025em] text-[#332720] sm:text-[38px]">
            Dashboard
          </h1>
          <p className="mt-1 text-[11px] text-[#857466]">
            Welcome back! Here&apos;s what&apos;s happening with your store.
          </p>
        </div>

        <button className="flex w-fit items-center gap-2 rounded-lg border border-[#eaded3] bg-white px-3 py-2 text-[10px] text-[#645247]">
          <CalendarDays size={14} />
          01 Sep 2026 - 30 Sep 2026
          <ChevronDown size={12} />
        </button>
      </div>

      {kpiCards.length > 0 && (
        <section className="grid grid-cols-2 gap-3 xl:grid-cols-6">
          {kpiCards.map((card) => {
            const StatIcon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-3 shadow-[0_4px_18px_rgba(74,49,30,0.035)] transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[9px] font-medium text-[#8e7969]">{card.title}</p>
                    <p className="mt-1.5 font-sans text-[24px] font-semibold leading-none text-[#332720]">
                      {card.value}
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f2e5d8] text-[#9b5e2f]">
                    <StatIcon size={17} />
                  </div>
                </div>
                <p className="mt-2 text-[9px] text-[#8d7a6c]">{card.note}</p>
              </div>
            );
          })}
        </section>
      )}

      {enabled("orders") && (
        <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.65fr_1fr_1.05fr]">
          <div className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-4">
            <h2 className="text-[14px] font-semibold text-[#30251f]">Order Status</h2>
            <div className="mt-4 flex items-center justify-center">
              <div
                className="relative flex h-[140px] w-[140px] items-center justify-center rounded-full"
                style={{
                  background:
                    "conic-gradient(#9b5e2f 0deg 120deg,#d5b394 120deg 200deg,#6e9b70 200deg 320deg,#c74d4d 320deg 340deg,#e8d8ca 340deg 360deg)",
                }}
              >
                <div className="flex h-[92px] w-[92px] flex-col items-center justify-center rounded-full bg-[#fffaf5]">
                  <span className="font-serif text-[25px] font-semibold">86</span>
                  <span className="text-[8px] uppercase tracking-wider text-[#958276]">Total Orders</span>
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[9px] text-[#6e5d50]">
              <span>● Pending 12</span>
              <span>● Processing 18</span>
              <span>● Shipped 24</span>
              <span>● Delivered 28</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-[#30251f]">Top Selling Categories</h2>
            </div>
            <div className="mt-4 space-y-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.name} className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#eee1d5] text-[#7d5a42]">
                      <Icon size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <p className="truncate text-[9px] font-semibold">{category.name}</p>
                        <span className="text-[9px] text-[#79685c]">{category.percentage}%</span>
                      </div>
                      <p className="text-[8px] text-[#9a8778]">{category.orders} orders</p>
                      <div className="mt-1 h-1.5 rounded-full bg-[#eee3d9]">
                        <div className="h-full rounded-full bg-[#9b5e2f]" style={{ width: `${category.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#eaded3] bg-[#fffaf5]">
            <div className="flex items-center justify-between border-b border-[#eee2d8] px-4 py-3">
              <h2 className="text-[14px] font-semibold">Recent Orders</h2>
              <button onClick={() => goTo("Orders")} className="text-[9px] font-semibold text-[#9b5e2f]">
                View All →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[380px]">
                <tbody>
                  {staticOrders.map((order) => (
                    <tr key={order[0]} className="border-b border-[#f1e9e2] text-[8px] last:border-0">
                      <td className="px-4 py-3 font-semibold">{order[0]}</td>
                      <td className="px-4 py-3">{order[1]}</td>
                      <td className="px-4 py-3 font-semibold">{order[2]}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-md px-2 py-1 ${statusStyles[order[4]]}`}>{order[4]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_1fr]">
        {enabled("leads") && (
          <div className="overflow-hidden rounded-xl border border-[#eaded3] bg-[#fffaf5]">
            <div className="flex items-center justify-between border-b border-[#eee2d8] px-4 py-3">
              <h2 className="text-[14px] font-semibold">Recent Leads</h2>
              <button
                onClick={() => goTo("Leads & CRM")}
                className="flex items-center gap-1 text-[9px] font-semibold text-[#9b5e2f]"
              >
                View All
                <ChevronRight size={12} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#eee2d8] text-left">
                    {["Name", "Contact", "Interested In", "Status", "Next Follow-up", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-[8px] font-semibold uppercase tracking-wider text-[#9a8879]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recent.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-[10px] text-[#9a8879]">
                        {leadsLoading ? "Loading leads..." : "No leads yet."}
                      </td>
                    </tr>
                  ) : (
                    recent.map((lead) => (
                      <tr key={lead.id} className="border-b border-[#f1e9e2] last:border-0">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e7d6c7] text-[8px] font-semibold text-[#76513a]">
                              {initials(lead.name)}
                            </div>
                            <span className="text-[9px] font-semibold">{lead.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[8px] text-[#74655a]">{lead.phone}</td>
                        <td className="px-4 py-3 text-[8px] text-[#74655a]">{lead.interested_in || "—"}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-md px-2 py-1 text-[8px] font-semibold ${statusStyles[lead.status] || statusStyles.New}`}>
                            {lead.status || "New"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[8px] text-[#74655a]">
                          {lead.next_follow_up
                            ? new Date(lead.next_follow_up).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
                            : "—"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <MoreHorizontal size={14} className="ml-auto text-[#88766a]" />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {enabled("followups") && (
          <div className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold">Upcoming Follow-ups</h2>
              <button onClick={() => goTo("Follow-ups")} className="text-[9px] font-semibold text-[#9b5e2f]">
                View All →
              </button>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <tbody>
                  {followUps.map((item) => (
                    <tr key={item[0]} className="border-b border-[#f1e9e2] text-[9px] last:border-0">
                      <td className="px-3 py-2.5 font-semibold">{item[0]}</td>
                      <td className="px-3 py-2.5">{item[2]}</td>
                      <td className="px-3 py-2.5">{item[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
