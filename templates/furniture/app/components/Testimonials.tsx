"use client";

import { Testimonials as TestimonialsSection } from "@platform/ui-kit";

const testimonials = [
  {
    quote: "The quality is unmatched and it arrived faster than expected. Our living room finally feels complete.",
    author: "Ananya R.",
    role: "Pune",
  },
  {
    quote: "Beautifully crafted furniture that actually looks better in person. Customer support was excellent too.",
    author: "Rohan K.",
    role: "Mumbai",
  },
  {
    quote: "We furnished our entire bedroom from Maison. Timeless design, solid build, no regrets.",
    author: "Meera S.",
    role: "Bengaluru",
  },
];

export default function Testimonials() {
  return (
    <TestimonialsSection items={testimonials} eyebrow="What Our Customers Say" heading="Loved By Homes Everywhere" />
  );
}
