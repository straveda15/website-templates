import type { CrudModuleConfig } from "../GenericCrudModule";
import { formatDate } from "../../lib/format";

export const followupsConfig: CrudModuleConfig = {
  title: "Follow-ups",
  eyebrow: "Contact Operations",
  description: "Track scheduled follow-ups with leads.",
  apiPath: "/follow-ups",
  addLabel: "Add Follow-up",
  columns: [
    { key: "lead_name", label: "Lead", render: (row) => row.lead_name || `Lead #${row.lead_id}` },
    { key: "purpose", label: "Purpose" },
    { key: "follow_up_date", label: "Date", render: (row) => formatDate(row.follow_up_date) },
    { key: "follow_up_time", label: "Time" },
    { key: "status", label: "Status" },
  ],
  fields: [
    { key: "lead_id", label: "Lead ID", type: "number", required: true, placeholder: "e.g. 1" },
    { key: "purpose", label: "Purpose", type: "text", placeholder: "e.g. Product Discussion" },
    { key: "follow_up_date", label: "Follow-up Date", type: "date", required: true },
    { key: "follow_up_time", label: "Follow-up Time", type: "time" },
    { key: "status", label: "Status", type: "select", options: ["Pending", "Completed", "Cancelled"] },
  ],
  searchKeys: ["lead_name", "purpose", "status"],
};
