import type { CrudModuleConfig } from "../GenericCrudModule";
import { formatDate } from "../../lib/format";

export const leadsConfig: CrudModuleConfig = {
  title: "Leads & CRM",
  eyebrow: "Contact Operations",
  description: "Manage website enquiries and sales opportunities.",
  apiPath: "/leads",
  addLabel: "Add Lead",
  columns: [
    { key: "name", label: "Lead" },
    { key: "phone", label: "Contact" },
    { key: "interested_in", label: "Interested In" },
    { key: "status", label: "Status" },
    { key: "next_follow_up", label: "Next Follow-up", render: (row) => formatDate(row.next_follow_up) },
    { key: "created_at", label: "Date", render: (row) => formatDate(row.created_at) },
  ],
  fields: [
    { key: "name", label: "Name", type: "text", required: true, placeholder: "Enter lead name" },
    { key: "phone", label: "Phone", type: "tel", required: true, placeholder: "Enter phone number" },
    { key: "email", label: "Email", type: "email", required: true, placeholder: "Enter email address" },
    { key: "interested_in", label: "Interested In", type: "text", placeholder: "e.g. Dining Table" },
    { key: "status", label: "Status", type: "select", options: ["New", "Contacted", "Follow-up", "Quotation", "Converted"] },
    { key: "next_follow_up", label: "Next Follow-up", type: "date" },
  ],
  searchKeys: ["name", "email", "phone", "interested_in", "status"],
};
