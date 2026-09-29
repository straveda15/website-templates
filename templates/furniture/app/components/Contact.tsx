"use client";

import { ContactSection } from "@platform/ui-kit";
import { siteConfig } from "../site.config";

export default function Contact() {
  return (
    <ContactSection
      heading="Let's Create"
      headingAccent="Something Beautiful"
      description="Have a question about our furniture, need help choosing the perfect piece, or want to discuss something custom? We'd love to hear from you."
      address={siteConfig.contact.address}
      phone={siteConfig.contact.phone}
      email={siteConfig.contact.email}
      interestOptions={siteConfig.contact.interestOptions}
    />
  );
}
