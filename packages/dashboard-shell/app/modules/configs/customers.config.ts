import type { CrudModuleConfig } from "../GenericCrudModule";
import { formatDate } from "../../lib/format";

export const customersConfig: CrudModuleConfig = {
  title: "Customers",
  eyebrow: "Customer Operations",
  description: "Everyone who has bought from you, in one place.",
  apiPath: "/customers",
  addLabel: "Add Customer",
  columns: [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
    { key: "created_at", label: "Since", render: (row) => formatDate(row.created_at) },
  ],
  fields: [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "phone", label: "Phone", type: "tel", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "address", label: "Address", type: "textarea" },
  ],
  searchKeys: ["name", "email", "phone", "address"],
};
