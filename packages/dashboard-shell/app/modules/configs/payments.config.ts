import type { CrudModuleConfig } from "../GenericCrudModule";
import { formatCurrency, formatDate } from "../../lib/format";

export const paymentsConfig: CrudModuleConfig = {
  title: "Payments",
  eyebrow: "Financial Operations",
  description: "Every payment transaction against an order.",
  apiPath: "/payments",
  addLabel: "Record Payment",
  columns: [
    { key: "order_id", label: "Order", render: (row) => `#ORD${String(row.order_id).padStart(4, "0")}` },
    { key: "amount", label: "Amount", render: (row) => formatCurrency(row.amount) },
    { key: "method", label: "Method" },
    { key: "status", label: "Status" },
    { key: "provider_ref", label: "Reference" },
    { key: "created_at", label: "Date", render: (row) => formatDate(row.created_at) },
  ],
  fields: [
    { key: "order_id", label: "Order ID", type: "number", required: true },
    { key: "amount", label: "Amount", type: "number", required: true },
    { key: "method", label: "Method", type: "select", options: ["Card", "UPI", "Cash", "Bank Transfer"] },
    { key: "status", label: "Status", type: "select", options: ["Pending", "Success", "Failed", "Refunded"] },
    { key: "provider_ref", label: "Reference", type: "text" },
  ],
  searchKeys: ["method", "status", "provider_ref"],
};
