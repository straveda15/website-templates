// Per-client branding/content config. scaffold-cli overwrites this file
// (or the values it exports) when generating a new client from this template.
export const siteConfig = {
  brandName: "Maison",
  description: "Premium furniture for modern homes.\nDesigned for comfort, crafted for life.",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: "Categories", href: "/categories" },
    { label: "Shop", href: "/products" },
    { label: "Our Story", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Collections", href: "/collections" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    customerCareLinks: [
      { label: "Track Order", href: "#" },
      { label: "Shipping Policy", href: "#" },
      { label: "Returns & Refunds", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Support", href: "#" },
    ],
    socialLinks: {
      instagram: "#",
      whatsapp: "#",
      facebook: "#",
      email: "hello@maison.com",
    },
    copyrightText: "© 2026 Maison. All Rights Reserved.",
  },
  contact: {
    address: ["24 Design Street", "Pune, Maharashtra", "India"],
    phone: "+91 98765 43210",
    email: "hello@maison.com",
    interestOptions: [
      { value: "sofas", label: "Sofas" },
      { value: "dining", label: "Dining" },
      { value: "bedroom", label: "Bedroom" },
      { value: "chairs", label: "Chairs" },
      { value: "custom", label: "Custom Furniture" },
      { value: "other", label: "Other" },
    ],
  },
  metadata: {
    title: "Furniture | Timeless Living",
    description:
      "Discover beautifully crafted furniture designed to bring warmth, comfort and timeless style to your home.",
  },
};
