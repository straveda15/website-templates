"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard } from "lucide-react";
import { dashboardConfig } from "./dashboard.config";
import { ENABLED_MODULE_IDS, moduleById } from "./modules.config";
import { apiClient } from "./lib/apiClient";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import DashboardOverview from "./modules/DashboardOverview";
import GenericCrudModule from "./modules/GenericCrudModule";
import AnalyticsModule from "./modules/AnalyticsModule";
import ModulePlaceholder from "./modules/ModulePlaceholder";
import { leadsConfig } from "./modules/configs/leads.config";
import { followupsConfig } from "./modules/configs/followups.config";
import { customersConfig } from "./modules/configs/customers.config";
import { productsConfig } from "./modules/configs/products.config";
import { ordersConfig } from "./modules/configs/orders.config";
import { shipmentsConfig } from "./modules/configs/shipments.config";
import { returnsConfig } from "./modules/configs/returns.config";
import { refundsConfig } from "./modules/configs/refunds.config";
import { paymentsConfig } from "./modules/configs/payments.config";

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

const CRUD_CONFIGS: Record<string, any> = {
  leads: leadsConfig,
  followups: followupsConfig,
  customers: customersConfig,
  products: productsConfig,
  orders: ordersConfig,
  shipments: shipmentsConfig,
  returns: returnsConfig,
  refunds: refundsConfig,
  payments: paymentsConfig,
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(false);

  useEffect(() => {
    if (!ENABLED_MODULE_IDS.includes("leads")) return;
    setLeadsLoading(true);
    apiClient
      .list("/leads")
      .then((result) => setLeads(result.data || []))
      .catch(() => setLeads([]))
      .finally(() => setLeadsLoading(false));
  }, []);

  const handleNavigation = (label: string) => {
    setActiveNav(label);
    setSidebarOpen(false);
  };

  const initials = (name: string) =>
    name.split(" ").filter(Boolean).map((word) => word[0]).join("").slice(0, 2).toUpperCase();

  const activeModule = ENABLED_MODULE_IDS.map(moduleById)
    .filter(Boolean)
    .find((m) => m!.label === activeNav);

  return (
    <div className="min-h-screen bg-[#f6eee5] text-[#30251f]">
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <Sidebar open={sidebarOpen} activeNav={activeNav} onNavigate={handleNavigation} />

      <div className="lg:pl-[238px]">
        <Topbar onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="px-4 py-5 sm:px-6 lg:px-7">
          {activeNav === "Dashboard" ? (
            <DashboardOverview leads={leads} leadsLoading={leadsLoading} goTo={handleNavigation} initials={initials} />
          ) : activeModule && CRUD_CONFIGS[activeModule.id] ? (
            <GenericCrudModule key={activeModule.id} config={CRUD_CONFIGS[activeModule.id]} />
          ) : activeModule?.id === "analytics" ? (
            <AnalyticsModule />
          ) : (
            <ModulePlaceholder title={activeModule?.label || activeNav} icon={activeModule?.icon || LayoutDashboard} />
          )}

          <footer className="mt-7 border-t border-[#e7dacf] pt-4 text-[9px] text-[#a08c7c]">
            {dashboardConfig.footerText}
          </footer>
        </main>
      </div>
    </div>
  );
}
