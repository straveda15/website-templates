import type { CrudModuleConfig } from "../GenericCrudModule";
import { formatDate } from "../../lib/format";

export const shipmentsConfig: CrudModuleConfig = {
  title: "Shipments",
  eyebrow: "Fulfillment",
  description: "Track packages from dispatch to delivery.",
  apiPath: "/shipments",
  addLabel: "Add Shipment",
  columns: [
    { key: "order_id", label: "Order", render: (row) => `#ORD${String(row.order_id).padStart(4, "0")}` },
    { key: "carrier", label: "Carrier" },
    { key: "tracking_number", label: "Tracking No." },
    { key: "status", label: "Status" },
    { key: "shipped_at", label: "Shipped", render: (row) => formatDate(row.shipped_at) },
    { key: "delivered_at", label: "Delivered", render: (row) => formatDate(row.delivered_at) },
  ],
  fields: [
    { key: "order_id", label: "Order ID", type: "number", required: true },
    { key: "carrier", label: "Carrier", type: "text", placeholder: "e.g. Delhivery" },
    { key: "tracking_number", label: "Tracking Number", type: "text" },
    { key: "status", label: "Status", type: "select", options: ["Processing", "Shipped", "In Transit", "Delivered"] },
    { key: "shipped_at", label: "Shipped Date", type: "date" },
    { key: "delivered_at", label: "Delivered Date", type: "date" },
  ],
  searchKeys: ["carrier", "tracking_number", "status"],
};
