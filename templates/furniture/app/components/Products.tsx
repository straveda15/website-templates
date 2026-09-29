"use client";

import { ProductGrid } from "@platform/ui-kit";
import { products } from "../data/products";

export default function Products() {
  return (
    <ProductGrid
      items={products.map((product) => ({ ...product, reviews: `${product.reviews}` }))}
      eyebrow="Featured Collection"
      heading="Shop Our Best Sellers"
    />
  );
}
