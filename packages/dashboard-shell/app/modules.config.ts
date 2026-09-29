import {
  BarChart3,
  Banknote,
  Boxes,
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileText,
  Package,
  RotateCcw,
  Settings,
  ShoppingBag,
  Truck,
  UserPlus,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface ModuleDef {
  id: string;
  label: string;
  icon: LucideIcon;
  implemented: boolean;
  section: "main" | "admin";
}

// Keep ids in sync with packages/scaffold-cli/lib/moduleCatalog.js and
// packages/backend-core/src/createApp.js's ALL_MODULE_IDS.
export const MODULE_CATALOG: ModuleDef[] = [
  { id: "leads", label: "Leads & CRM", icon: UserPlus, implemented: true, section: "main" },
  { id: "followups", label: "Follow-ups", icon: CalendarDays, implemented: true, section: "main" },
  { id: "quotations", label: "Quotations", icon: FileText, implemented: false, section: "main" },
  { id: "customers", label: "Customers", icon: Users, implemented: true, section: "main" },
  { id: "products", label: "Products", icon: Boxes, implemented: true, section: "main" },
  { id: "categories", label: "Categories", icon: ShoppingBag, implemented: false, section: "main" },
  { id: "orders", label: "Orders", icon: ClipboardList, implemented: true, section: "main" },
  { id: "payments", label: "Payments", icon: CreditCard, implemented: true, section: "main" },
  { id: "shipments", label: "Shipments", icon: Truck, implemented: true, section: "main" },
  { id: "returns", label: "Returns", icon: RotateCcw, implemented: true, section: "main" },
  { id: "refunds", label: "Refunds", icon: Banknote, implemented: true, section: "main" },
  { id: "inventory", label: "Inventory", icon: Package, implemented: false, section: "main" },
  { id: "reviews", label: "Reviews", icon: FileText, implemented: false, section: "main" },
  { id: "analytics", label: "Analytics", icon: BarChart3, implemented: true, section: "main" },
  { id: "users", label: "Users & Roles", icon: UserRound, implemented: false, section: "admin" },
  { id: "settings", label: "Settings", icon: Settings, implemented: false, section: "admin" },
];

function resolveEnabledModuleIds(): string[] {
  const fromEnv = process.env.NEXT_PUBLIC_ENABLED_MODULES;
  if (fromEnv) return fromEnv.split(",").map((id) => id.trim());
  return MODULE_CATALOG.filter((m) => m.implemented).map((m) => m.id);
}

export const ENABLED_MODULE_IDS = resolveEnabledModuleIds();

export const ENABLED_MODULES = MODULE_CATALOG.filter((m) => ENABLED_MODULE_IDS.includes(m.id));

export function moduleById(id: string) {
  return MODULE_CATALOG.find((m) => m.id === id);
}
