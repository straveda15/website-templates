import type { CrudModuleConfig } from "../GenericCrudModule";
import { formatCurrency, formatDate } from "../../lib/format";

export const ordersConfig: CrudModuleConfig = {
  title: "Orders",
  eyebrow: "Sales Operations",
  description: "Track every order from placement to delivery.",
  apiPath: "/orders",
  addLabel: "Add Order",
  columns: [
    { key: "id", label: "Order ID", render: (row) => `#ORD${String(row.id).padStart(4, "0")}` },
    { key: "customer_name", label: "Customer", render: (row) => row.customer_name || `Customer #${row.customer_id}` },
    { key: "amount", label: "Amount", render: (row) => formatCurrency(row.amount) },
    { key: "payment_status", label: "Payment" },
    { key: "order_status", label: "Status" },
    { key: "created_at", label: "Date", render: (row) => formatDate(row.created_at) },
  ],
  fields: [
    { key: "customer_id", label: "Customer ID", type: "number", required: true, placeholder: "e.g. 1" },
    { key: "amount", label: "Amount", type: "number", required: true },
    { key: "payment_status", label: "Payment Status", type: "select", options: ["Pending", "Partially Paid", "Paid"] },
    { key: "order_status", label: "Order Status", type: "select", options: ["Processing", "Shipped", "Delivered", "Cancelled"] },
  ],
  searchKeys: ["customer_name", "payment_status", "order_status"],
};
