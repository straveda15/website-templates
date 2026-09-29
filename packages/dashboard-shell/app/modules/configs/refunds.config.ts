import type { CrudModuleConfig } from "../GenericCrudModule";
import { formatCurrency, formatDate } from "../../lib/format";

export const refundsConfig: CrudModuleConfig = {
  title: "Refunds",
  eyebrow: "Post-Sale Operations",
  description: "Track money returned to customers.",
  apiPath: "/refunds",
  addLabel: "Add Refund",
  columns: [
    { key: "order_id", label: "Order", render: (row) => `#ORD${String(row.order_id).padStart(4, "0")}` },
    { key: "amount", label: "Amount", render: (row) => formatCurrency(row.amount) },
    { key: "reason", label: "Reason" },
    { key: "status", label: "Status" },
    { key: "created_at", label: "Date", render: (row) => formatDate(row.created_at) },
  ],
  fields: [
    { key: "order_id", label: "Order ID", type: "number", required: true },
    { key: "amount", label: "Amount", type: "number", required: true },
    { key: "reason", label: "Reason", type: "textarea" },
    { key: "status", label: "Status", type: "select", options: ["Pending", "Processed", "Rejected"] },
  ],
  searchKeys: ["reason", "status"],
};
