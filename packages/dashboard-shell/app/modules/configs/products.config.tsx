import type { CrudModuleConfig } from "../GenericCrudModule";
import { formatCurrency } from "../../lib/format";

export const productsConfig: CrudModuleConfig = {
  title: "Products",
  eyebrow: "Catalog",
  description: "Manage what you sell.",
  apiPath: "/products",
  addLabel: "Add Product",
  imageUploadPath: (row) => `/products/${row.id}/image`,
  imageField: "image_url",
  columns: [
    {
      key: "image_url",
      label: "Image",
      render: (row) =>
        row.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}${row.image_url}`} alt={row.name} className="h-10 w-10 rounded-md object-cover" />
        ) : (
          <div className="h-10 w-10 rounded-md bg-[#eee1d5]" />
        ),
    },
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price", render: (row) => formatCurrency(row.price) },
    { key: "stock", label: "Stock" },
    { key: "status", label: "Status" },
  ],
  fields: [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "category", label: "Category", type: "text" },
    { key: "price", label: "Price", type: "number", required: true },
    { key: "stock", label: "Stock", type: "number" },
    { key: "status", label: "Status", type: "select", options: ["Active", "Inactive", "Draft"] },
  ],
  searchKeys: ["name", "category", "status"],
};
