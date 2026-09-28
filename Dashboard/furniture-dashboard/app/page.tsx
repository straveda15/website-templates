"use client";

import {
  BarChart3,
  Bell,
  BedDouble,
  Boxes,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Truck,
  UserPlus,
  UserRound,
  Users,
  X,
  Sofa,
  Armchair,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://localhost:5000/api";

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

type LeadForm = {
  name: string;
  phone: string;
  email: string;
  interested_in: string;
  status: string;
  next_follow_up: string;
};

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Leads & CRM", icon: UserPlus },
  { label: "Follow-ups", icon: CalendarDays },
  { label: "Quotations", icon: FileText },
  { label: "Customers", icon: Users },
  { label: "Products", icon: Boxes },
  { label: "Categories", icon: ShoppingBag },
  { label: "Orders", icon: ClipboardList },
  { label: "Payments", icon: CreditCard },
  { label: "Shipments", icon: Truck },
  { label: "Inventory", icon: Package },
  { label: "Reviews", icon: FileText },
  { label: "Analytics", icon: BarChart3 },
];

const bottomNavigation = [
  { label: "Users & Roles", icon: UserRound },
  { label: "Settings", icon: Settings },
];

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
  "Partially Paid": "bg-[#3A2A20] text-white",
  Paid: "bg-[#3A2A20] text-white",
  "Low Stock": "bg-[#3A2A20] text-white",
  "Out of Stock": "bg-[#3A2A20] text-white",
  Upcoming: "bg-[#3A2A20] text-white",
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
  { name: "Sofas", orders: 42, percentage: 32, icon: Sofa },
  { name: "Dining Tables", orders: 28, percentage: 21, icon: Armchair },
  { name: "Beds", orders: 24, percentage: 18, icon: BedDouble },
  { name: "Chairs", orders: 18, percentage: 14, icon: Armchair },
  { name: "Decor", orders: 12, percentage: 9, icon: Package },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [leadError, setLeadError] = useState("");

  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatus, setLeadStatus] = useState("All");

  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: "",
    phone: "",
    email: "",
    interested_in: "",
    status: "New",
    next_follow_up: "",
  });

  const loadLeads = async () => {
    try {
      setLeadsLoading(true);
      setLeadError("");

      const response = await fetch(`${API_URL}/leads`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch leads");
      }

      setLeads(result.data || []);
    } catch (error) {
      console.error("Load Leads Error:", error);
      setLeadError(
        "Unable to load leads. Please check that the backend is running."
      );
    } finally {
      setLeadsLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    const query = leadSearch.trim().toLowerCase();

    return leads.filter((lead) => {
      const statusMatch =
        leadStatus === "All" || lead.status === leadStatus;

      const searchMatch =
        !query ||
        [
          lead.name,
          lead.email,
          lead.phone,
          lead.interested_in,
          lead.status,
          String(lead.id),
        ].some((value) =>
          String(value || "").toLowerCase().includes(query)
        );

      return statusMatch && searchMatch;
    });
  }, [leads, leadSearch, leadStatus]);

  const openAddLead = () => {
    setEditingLead(null);

    setLeadForm({
      name: "",
      phone: "",
      email: "",
      interested_in: "",
      status: "New",
      next_follow_up: "",
    });

    setLeadModalOpen(true);
  };

  const openEditLead = (lead: Lead) => {
    setEditingLead(lead);

    setLeadForm({
      name: lead.name || "",
      phone: lead.phone || "",
      email: lead.email || "",
      interested_in: lead.interested_in || "",
      status: lead.status || "New",
      next_follow_up: lead.next_follow_up
        ? String(lead.next_follow_up).slice(0, 10)
        : "",
    });

    setLeadModalOpen(true);
  };

  const handleLeadSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!leadForm.name.trim()) {
      setLeadError("Lead name is required.");
      return;
    }

    try {
      setLeadError("");

      const url = editingLead
        ? `${API_URL}/leads/${editingLead.id}`
        : `${API_URL}/leads`;

      const response = await fetch(url, {
        method: editingLead ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...leadForm,
          name: leadForm.name.trim(),
          phone: leadForm.phone.trim(),
          email: leadForm.email.trim(),
          interested_in: leadForm.interested_in.trim(),
          next_follow_up: leadForm.next_follow_up || null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to save lead");
      }

      setLeadModalOpen(false);
      setEditingLead(null);

      await loadLeads();
    } catch (error) {
      setLeadError(
        error instanceof Error
          ? error.message
          : "Failed to save lead."
      );
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) {
      return;
    }

    try {
      setLeadError("");

      const response = await fetch(`${API_URL}/leads/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete lead");
      }

      await loadLeads();
    } catch (error) {
      setLeadError(
        error instanceof Error
          ? error.message
          : "Failed to delete lead."
      );
    }
  };

  const handleNavigation = (label: string) => {
    setActiveNav(label);
    setSidebarOpen(false);
  };

  const initials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="min-h-screen bg-[#f6eee5] text-[#30251f]">
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[238px] flex-col bg-[#2f2119] text-[#f9f0e7] shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c88b52]/70 text-[#dca56e]">
              ✦
            </div>

            <div>
              <p className="font-serif text-[18px] tracking-wide">
                FURNITURE
              </p>
              <p className="text-[7px] uppercase tracking-[0.28em] text-[#c7a98d]">
                Timeless Living
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b99e89]">
            Main Menu
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = activeNav === item.label;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavigation(item.label)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                    active
                      ? "bg-[#c88a51] text-white shadow-sm"
                      : "text-[#e8d8ca]/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.8} />

                  <span className="text-[11px] font-medium">
                    {item.label}
                  </span>

                  {(item.label === "Products" ||
                    item.label === "Orders") && (
                    <ChevronDown
                      size={12}
                      className="ml-auto opacity-70"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="my-5 border-t border-white/10" />

          <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b99e89]">
            Administration
          </p>

          <div className="space-y-1">
            {bottomNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavigation(item.label)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                    activeNav === item.label
                      ? "bg-[#c88a51] text-white"
                      : "text-[#e8d8ca]/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={17} />

                  <span className="text-[11px] font-medium">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="m-4 rounded-xl bg-[#4a3325] p-3">
          <p className="font-serif text-[14px] text-white">
            Create Beautiful
          </p>
          <p className="text-[9px] text-[#d9c1ad]">
            Spaces that feel like home.
          </p>
        </div>
      </aside>

      <div className="lg:pl-[238px]">
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 flex h-[66px] items-center justify-between border-b border-[#e8dbcf] bg-[#fffaf5]/95 px-4 backdrop-blur-md sm:px-6 lg:px-7">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-[#67564a] hover:bg-[#f0e5da] lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="relative hidden sm:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a18d7d]"
              />

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
                AS
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-[11px] font-semibold text-[#3e3028]">
                  Akanksha
                </p>

                <p className="text-[9px] text-[#9b897b]">
                  Admin
                </p>
              </div>

              <ChevronDown
                size={13}
                className="text-[#7d695b]"
              />
            </button>
          </div>
        </header>

        <main className="px-4 py-5 sm:px-6 lg:px-7">
          {activeNav === "Dashboard" ? (
            <DashboardOverview
              leads={leads}
              leadsLoading={leadsLoading}
              goTo={handleNavigation}
              initials={initials}
            />
          ) : activeNav === "Leads & CRM" ? (
            <LeadsSection
              leads={leads}
              leadsLoading={leadsLoading}
              filteredLeads={filteredLeads}
              leadSearch={leadSearch}
              setLeadSearch={setLeadSearch}
              leadStatus={leadStatus}
              setLeadStatus={setLeadStatus}
              leadError={leadError}
              openAddLead={openAddLead}
              openEditLead={openEditLead}
              handleDeleteLead={handleDeleteLead}
            />
          ) : (
            <ModulePlaceholder title={activeNav} />
          )}

          <footer className="mt-7 border-t border-[#e7dacf] pt-4 text-[9px] text-[#a08c7c]">
            © 2026 Furniture Studio · Commerce Dashboard
          </footer>
        </main>
      </div>

      {leadModalOpen && (
        <LeadModal
          editingLead={editingLead}
          leadForm={leadForm}
          setLeadForm={setLeadForm}
          onClose={() => {
            setLeadModalOpen(false);
            setEditingLead(null);
          }}
          onSubmit={handleLeadSubmit}
        />
      )}
    </div>
  );
}

function DashboardOverview({
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
  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const recent = leads.slice(0, 5);

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

      {/* KPI CARDS */}
      <section className="grid grid-cols-2 gap-3 xl:grid-cols-6">
        {[
          {
            title: "Total Leads",
            value: leadsLoading ? "..." : String(totalLeads),
            note: `${newLeads} New Leads`,
            icon: UserPlus,
          },
          {
            title: "Total Orders",
            value: "86",
            note: "12 Pending",
            icon: ShoppingBag,
          },
          {
            title: "Total Revenue",
            value: "₹4,28,900",
            note: "This Month",
            icon: CircleDollarSign,
          },
          {
            title: "Pending Payments",
            value: "₹72,450",
            note: "18 Orders",
            icon: CreditCard,
          },
          {
            title: "Shipped Orders",
            value: "34",
            note: "In Transit",
            icon: Truck,
          },
          {
            title: "Delivered Orders",
            value: "48",
            note: "Completed",
            icon: Package,
          },
        ].map((card) => {
          const StatIcon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-3 shadow-[0_4px_18px_rgba(74,49,30,0.035)] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[9px] font-medium text-[#8e7969]">
                    {card.title}
                  </p>

                  <p className="mt-1.5 font-sans text-[24px] font-semibold leading-none text-[#332720]">
                    {card.value}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f2e5d8] text-[#9b5e2f]">
                  <StatIcon size={17} />
                </div>
              </div>

              <p className="mt-2 text-[9px] text-[#8d7a6c]">
                {card.note}
              </p>
            </div>
          );
        })}
      </section>

      {/* ANALYTICS */}
      <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.65fr_1fr_1.05fr]">
        <div className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-[#30251f]">
                Sales Overview
              </h2>

              <div className="mt-2 flex gap-4 text-[9px] text-[#766558]">
                <span>● Revenue</span>
                <span className="text-[#b8a18e]">
                  ● Orders
                </span>
              </div>
            </div>

            <button className="rounded-md border border-[#eaded3] px-2 py-1 text-[9px] text-[#69584c]">
              This Month⌄
            </button>
          </div>

          <div className="mt-3 h-[205px]">
            <svg
              viewBox="0 0 700 210"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <defs>
                <linearGradient
                  id="salesFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#b56d3c"
                    stopOpacity=".24"
                  />
                  <stop
                    offset="100%"
                    stopColor="#b56d3c"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {[25, 65, 105, 145, 185].map((y) => (
                <line
                  key={y}
                  x1="0"
                  x2="700"
                  y1={y}
                  y2={y}
                  stroke="#eadfd5"
                  strokeDasharray="3 5"
                />
              ))}

              <path
                d="M0 165 C55 154 70 132 120 146 C175 160 185 112 235 122 C285 133 310 91 350 106 C400 121 420 73 470 84 C515 96 535 58 580 69 C625 80 650 35 700 48 L700 205 L0 205 Z"
                fill="url(#salesFill)"
              />

              <path
                d="M0 165 C55 154 70 132 120 146 C175 160 185 112 235 122 C285 133 310 91 350 106 C400 121 420 73 470 84 C515 96 535 58 580 69 C625 80 650 35 700 48"
                fill="none"
                stroke="#9b5e2f"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="mt-1 flex justify-between px-1 text-[8px] text-[#a08e80]">
            <span>1 Sep</span>
            <span>5 Sep</span>
            <span>10 Sep</span>
            <span>15 Sep</span>
            <span>20 Sep</span>
            <span>25 Sep</span>
            <span>30 Sep</span>
          </div>
        </div>

        <div className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-4">
          <h2 className="text-[14px] font-semibold text-[#30251f]">
            Order Status
          </h2>

          <div className="mt-2 text-[24px] font-serif font-semibold text-[#332720]">
            86{" "}
            <span className="text-[10px] font-sans font-normal text-[#8b7869]">
              Total Orders
            </span>
          </div>

          <div className="mt-4 flex items-center justify-center">
            <div
              className="relative flex h-[140px] w-[140px] items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#9b5e2f 0deg 120deg,#d5b394 120deg 200deg,#6e9b70 200deg 320deg,#c74d4d 320deg 340deg,#e8d8ca 340deg 360deg)",
              }}
            >
              <div className="flex h-[92px] w-[92px] flex-col items-center justify-center rounded-full bg-[#fffaf5]">
                <span className="font-serif text-[25px] font-semibold">
                  86
                </span>

                <span className="text-[8px] uppercase tracking-wider text-[#958276]">
                  Total Orders
                </span>
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
            <h2 className="text-[14px] font-semibold text-[#30251f]">
              Top Selling Categories
            </h2>

            <button className="text-[9px] font-semibold text-[#9b5e2f]">
              View All
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <div
                  key={category.name}
                  className="flex items-center gap-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#eee1d5] text-[#7d5a42]">
                    <Icon size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-2">
                      <p className="truncate text-[9px] font-semibold">
                        {category.name}
                      </p>

                      <span className="text-[9px] text-[#79685c]">
                        {category.percentage}%
                      </span>
                    </div>

                    <p className="text-[8px] text-[#9a8778]">
                      {category.orders} orders
                    </p>

                    <div className="mt-1 h-1.5 rounded-full bg-[#eee3d9]">
                      <div
                        className="h-full rounded-full bg-[#9b5e2f]"
                        style={{
                          width: `${category.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TABLES */}
      <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_1fr]">
        <div className="overflow-hidden rounded-xl border border-[#eaded3] bg-[#fffaf5]">
          <div className="flex items-center justify-between border-b border-[#eee2d8] px-4 py-3">
            <h2 className="text-[14px] font-semibold">
              Recent Leads
            </h2>

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
                  {[
                    "Name",
                    "Contact",
                    "Interested In",
                    "Status",
                    "Next Follow-up",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-[8px] font-semibold uppercase tracking-wider text-[#9a8879]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {recent.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-[10px] text-[#9a8879]"
                    >
                      {leadsLoading
                        ? "Loading leads..."
                        : "No leads yet."}
                    </td>
                  </tr>
                ) : (
                  recent.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-[#f1e9e2] last:border-0"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e7d6c7] text-[8px] font-semibold text-[#76513a]">
                            {initials(lead.name)}
                          </div>

                          <span className="text-[9px] font-semibold">
                            {lead.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3 text-[8px] text-[#74655a]">
                        {lead.phone}
                      </td>

                      <td className="px-4 py-3 text-[8px] text-[#74655a]">
                        {lead.interested_in || "—"}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`rounded-md px-2 py-1 text-[8px] font-semibold ${
                            statusStyles[lead.status] ||
                            statusStyles.New
                          }`}
                        >
                          {lead.status || "New"}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-[8px] text-[#74655a]">
                        {lead.next_follow_up
                          ? new Date(
                              lead.next_follow_up
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                            })
                          : "—"}
                      </td>

                      <td className="px-4 py-3 text-right">
                        <MoreHorizontal
                          size={14}
                          className="ml-auto text-[#88766a]"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#eaded3] bg-[#fffaf5]">
          <div className="flex items-center justify-between border-b border-[#eee2d8] px-4 py-3">
            <h2 className="text-[14px] font-semibold">
              Recent Orders
            </h2>

            <button
              onClick={() => goTo("Orders")}
              className="text-[9px] font-semibold text-[#9b5e2f]"
            >
              View All →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-[#eee2d8] text-left">
                  {[
                    "Order ID",
                    "Customer",
                    "Amount",
                    "Payment",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-[8px] font-semibold uppercase tracking-wider text-[#9a8879]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {staticOrders.map((order) => (
                  <tr
                    key={order[0]}
                    className="border-b border-[#f1e9e2] last:border-0"
                  >
                    <td className="px-4 py-3 text-[8px] font-semibold">
                      {order[0]}
                    </td>

                    <td className="px-4 py-3 text-[8px]">
                      {order[1]}
                    </td>

                    <td className="px-4 py-3 text-[8px] font-semibold">
                      {order[2]}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`rounded-md px-2 py-1 text-[8px] ${
                          order[3] === "Paid"
                            ? "bg-[#dfeee3] text-[#3e704d]"
                            : "bg-[#f4e2dc] text-[#985847]"
                        }`}
                      >
                        {order[3]}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`rounded-md px-2 py-1 text-[8px] ${
                          statusStyles[order[4]]
                        }`}
                      >
                        {order[4]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_1fr]">
        <div className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-semibold">
              Upcoming Follow-ups
            </h2>

            <button
              onClick={() => goTo("Follow-ups")}
              className="text-[9px] font-semibold text-[#9b5e2f]"
            >
              View All →
            </button>
          </div>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[580px]">
              <thead>
                <tr className="border-b border-[#eee2d8] text-left">
                  {[
                    "Customer",
                    "Contact",
                    "Purpose",
                    "Date & Time",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-[8px] font-semibold uppercase tracking-wider text-[#9a8879]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {followUps.map((item) => (
                  <tr
                    key={item[0]}
                    className="border-b border-[#f1e9e2] last:border-0"
                  >
                    <td className="px-3 py-2.5 text-[9px] font-semibold">
                      {item[0]}
                    </td>

                    <td className="px-3 py-2.5 text-[8px]">
                      {item[1]}
                    </td>

                    <td className="px-3 py-2.5 text-[8px]">
                      {item[2]}
                    </td>

                    <td className="px-3 py-2.5 text-[8px]">
                      {item[3]}
                    </td>

                    <td className="px-3 py-2.5">
                      <span className="rounded-md bg-[#e3edf2] px-2 py-1 text-[8px] font-semibold text-[#4f6f80]">
                        Upcoming
                      </span>
                    </td>

                    <td className="px-3 py-2.5">
                      <MoreHorizontal size={14} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-semibold">
              Low Stock Products
            </h2>

            <button
              onClick={() => goTo("Inventory")}
              className="text-[9px] font-semibold text-[#9b5e2f]"
            >
              View All →
            </button>
          </div>

          <div className="mt-3 space-y-2.5">
            {[
              ["Modern Dining Chair", "Chairs", "5"],
              ["Wooden Bed Frame", "Beds", "3"],
              ["Study Table", "Tables", "4"],
              ["Sofa Set (3 Seater)", "Sofas", "2"],
            ].map((item) => (
              <div
                key={item[0]}
                className="flex items-center gap-2 rounded-lg border border-[#eee2d8] p-2"
              >
                <div className="h-9 w-9 rounded-md bg-[#eee1d5]" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[9px] font-semibold">
                    {item[0]}
                  </p>

                  <p className="text-[8px] text-[#998678]">
                    {item[1]}
                  </p>
                </div>

                <span className="text-[8px] font-semibold text-[#9b5e2f]">
                  {item[2]} left
                </span>

                <span className="rounded-md bg-[#f5e4d2] px-2 py-1 text-[8px] text-[#8b552f]">
                  Low Stock
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function LeadsSection({
  leads,
  leadsLoading,
  filteredLeads,
  leadSearch,
  setLeadSearch,
  leadStatus,
  setLeadStatus,
  leadError,
  openAddLead,
  openEditLead,
  handleDeleteLead,
}: any) {
  return (
    <section>
      {/* HEADER */}
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8754e]">
            Contact Operations
          </p>

          <h1 className="mt-1 font-serif text-[40px] font-semibold leading-tight tracking-[-0.02em] text-[#332720] sm:text-[36px]">
            Leads & CRM
          </h1>

          <p className="mt-1 text-[14px] text-[#857466]">
            Manage website enquiries and sales opportunities.
          </p>
        </div>

        <button
          onClick={openAddLead}
          className="flex w-fit items-center gap-2 rounded-lg bg-[#9b5e2f] px-4 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#7e4825]"
        >
          <UserPlus size={15} />
          Add Lead
        </button>
      </div>

      {/* ERROR */}
      {leadError && (
        <div className="mb-4 rounded-lg border border-[#e5c9bf] bg-[#fff5f1] px-4 py-3 text-[11px] text-[#8b5548]">
          {leadError}
        </div>
      )}

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          ["Total Leads", leads.length],
          [
            "New Leads",
            leads.filter(
              (l: Lead) => l.status === "New"
            ).length,
          ],
          [
            "Contacted",
            leads.filter(
              (l: Lead) => l.status === "Contacted"
            ).length,
          ],
          [
            "Follow-ups",
            leads.filter(
              (l: Lead) => l.status === "Follow-up"
            ).length,
          ],
        ].map(([title, value]) => (
          <div
            key={String(title)}
            className="rounded-xl border border-[#eaded3] bg-[#fffaf5] p-4"
          >
            <p className="text-[11px] font-medium text-[#8e796a]">
              {title}
            </p>

            <p className="mt-1 font-serif text-[28px] font-semibold leading-none text-[#332720]">
              {leadsLoading ? "..." : value}
            </p>
          </div>
        ))}
      </div>

      {/* ALL LEADS */}
      <div className="mt-4 overflow-hidden rounded-xl border border-[#eaded3] bg-[#fffaf5]">
        <div className="flex flex-col gap-3 border-b border-[#eee2d8] p-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-[18px] font-semibold text-[#332720]">
            All Leads
          </h2>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8879]"
              />

              <input
                value={leadSearch}
                onChange={(e) =>
                  setLeadSearch(e.target.value)
                }
                placeholder="Search leads..."
                className="h-10 w-full rounded-lg border border-[#eaded3] bg-white pl-9 pr-3 text-[12px] outline-none placeholder:text-[#a39488] focus:border-[#c88a51] sm:w-[240px]"
              />
            </div>

            <select
              value={leadStatus}
              onChange={(e) =>
                setLeadStatus(e.target.value)
              }
              className="h-10 rounded-lg border border-[#eaded3] bg-white px-3 text-[12px] outline-none focus:border-[#c88a51]"
            >
              <option>All</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Follow-up</option>
              <option>Quotation</option>
              <option>Converted</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#eee2d8] text-left">
                {[
                  "Lead",
                  "Contact",
                  "Interested In",
                  "Source",
                  "Status",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8f7d70]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {leadsLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-10 text-center text-[14px] text-[#8d7c70]"
                  >
                    Loading leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-10 text-center text-[14px] text-[#9a8879]"
                  >
                    No leads found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead: Lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-[#f1e9e2] last:border-0 hover:bg-[#fff7f0]"
                  >
                    {/* LEAD */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e7d6c7] text-[11px] font-semibold text-[#76513a]">
                          {lead.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="text-[14px] font-semibold text-[#3c3028]">
                            {lead.name}
                          </p>

                          <p className="mt-0.5 text-[11px] text-[#9a8879]">
                            LD-
                            {String(lead.id).padStart(4, "0")}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CONTACT */}
                    <td className="px-5 py-4">
                      <p className="text-[14px] font-medium text-[#5f5148]">
                        {lead.phone}
                      </p>

                      <p className="mt-1 text-[11px] text-[#9a8879]">
                        {lead.email}
                      </p>
                    </td>

                    {/* INTERESTED */}
                    <td className="px-5 py-4 text-[14px] font-medium text-[#5f5148]">
                      {lead.interested_in || "—"}
                    </td>

                    {/* SOURCE */}
                    <td className="px-5 py-4 text-[14px] text-[#5f5148]">
                      Website
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-[11px] font-semibold ${
                          statusStyles[lead.status] ||
                          statusStyles.New
                        }`}
                      >
                        {lead.status || "New"}
                      </span>
                    </td>

                    {/* DATE */}
                    <td className="px-5 py-4 text-[12px] font-medium text-[#6f6259]">
                      {new Date(
                        lead.created_at
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEditLead(lead)
                          }
                          className="rounded-lg bg-[#3A2A20] px-3.5 py-2 text-[11px] font-semibold text-white transition hover:bg-[#514139]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteLead(lead.id)
                          }
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
    </section>
  );
}

function ModulePlaceholder({
  title,
}: {
  title: string;
}) {
  const icons: Record<
    string,
    typeof LayoutDashboard
  > = {
    "Follow-ups": CalendarDays,
    Quotations: FileText,
    Customers: Users,
    Products: Boxes,
    Categories: ShoppingBag,
    Orders: ClipboardList,
    Payments: CreditCard,
    Shipments: Truck,
    Inventory: Package,
    Reviews: FileText,
    Analytics: BarChart3,
    "Users & Roles": UserRound,
    Settings,
  };

  const Icon = icons[title] || LayoutDashboard;

  return (
    <section className="flex min-h-[65vh] items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-[#eaded3] bg-[#fffaf5] p-10 text-center shadow-[0_8px_30px_rgba(74,49,30,.04)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0e1d4] text-[#9b5e2f]">
          <Icon size={25} />
        </div>

        <p className="mt-5 text-[9px] font-semibold uppercase tracking-[.2em] text-[#a8754e]">
          Furniture Commerce
        </p>

        <h1 className="mt-2 font-serif text-[30px] font-semibold">
          {title}
        </h1>

        <p className="mt-2 text-[11px] leading-6 text-[#877568]">
          This section is now connected to the sidebar. We can build
          its real PostgreSQL-backed module next without changing the
          dashboard shell.
        </p>
      </div>
    </section>
  );
}

function LeadModal({
  editingLead,
  leadForm,
  setLeadForm,
  onClose,
  onSubmit,
}: {
  editingLead: Lead | null;
  leadForm: LeadForm;
  setLeadForm: React.Dispatch<
    React.SetStateAction<LeadForm>
  >;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-4 py-6">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#eaded3] bg-[#fffaf5] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#eee2d8] px-5 py-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-[#a8754e]">
              CRM
            </p>

            <h2 className="mt-1 font-serif text-[22px] font-semibold">
              {editingLead ? "Edit Lead" : "Add Lead"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-[#f0e5da]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(
              [
                [
                  "Name",
                  "name",
                  "text",
                  "Enter lead name",
                ],
                [
                  "Phone",
                  "phone",
                  "tel",
                  "Enter phone number",
                ],
                [
                  "Email",
                  "email",
                  "email",
                  "Enter email address",
                ],
                [
                  "Interested In",
                  "interested_in",
                  "text",
                  "e.g. Dining Table",
                ],
              ] as const
            ).map(
              ([label, key, type, placeholder]) => (
                <label key={key}>
                  <span className="mb-1.5 block text-[10px] font-semibold text-[#6f6258]">
                    {label}
                  </span>

                  <input
                    required={key !== "interested_in"}
                    type={type}
                    value={leadForm[key]}
                    onChange={(e) =>
                      setLeadForm((current) => ({
                        ...current,
                        [key]: e.target.value,
                      }))
                    }
                    placeholder={placeholder}
                    className="h-10 w-full rounded-lg border border-[#eaded3] bg-white px-3 text-[11px] outline-none focus:border-[#c88a51]"
                  />
                </label>
              )
            )}

            <label>
              <span className="mb-1.5 block text-[10px] font-semibold text-[#6f6258]">
                Status
              </span>

              <select
                value={leadForm.status}
                onChange={(e) =>
                  setLeadForm((current) => ({
                    ...current,
                    status: e.target.value,
                  }))
                }
                className="h-10 w-full rounded-lg border border-[#eaded3] bg-white px-3 text-[11px]"
              >
                <option>New</option>
                <option>Contacted</option>
                <option>Follow-up</option>
                <option>Quotation</option>
                <option>Converted</option>
              </select>
            </label>

            <label>
              <span className="mb-1.5 block text-[10px] font-semibold text-[#6f6258]">
                Next Follow-up
              </span>

              <input
                type="date"
                value={leadForm.next_follow_up}
                onChange={(e) =>
                  setLeadForm((current) => ({
                    ...current,
                    next_follow_up: e.target.value,
                  }))
                }
                className="h-10 w-full rounded-lg border border-[#eaded3] bg-white px-3 text-[11px]"
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#eaded3] px-4 py-2.5 text-[11px] font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-[#9b5e2f] px-5 py-2.5 text-[11px] font-semibold text-white"
            >
              {editingLead ? "Update Lead" : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}