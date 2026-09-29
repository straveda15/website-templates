import type { CrudModuleConfig } from "../GenericCrudModule";
import { formatDate } from "../../lib/format";

export const returnsConfig: CrudModuleConfig = {
  title: "Returns",
  eyebrow: "Post-Sale Operations",
  description: "Review and process customer return requests.",
  apiPath: "/returns",
  addLabel: "Add Return",
  columns: [
    { key: "order_id", label: "Order", render: (row) => `#ORD${String(row.order_id).padStart(4, "0")}` },
    { key: "reason", label: "Reason" },
    { key: "status", label: "Status" },
    { key: "created_at", label: "Requested", render: (row) => formatDate(row.created_at) },
  ],
  fields: [
    { key: "order_id", label: "Order ID", type: "number", required: true },
    { key: "reason", label: "Reason", type: "textarea", placeholder: "Why is this being returned?" },
    { key: "status", label: "Status", type: "select", options: ["Requested", "Approved", "Rejected", "Completed"] },
  ],
  searchKeys: ["reason", "status"],
};
