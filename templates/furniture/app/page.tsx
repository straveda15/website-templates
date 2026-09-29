import { Hero } from "@platform/ui-kit";
import HomePage from "./HomePage";
import Collections from "./components/Collections";
import Categories from "./components/Categories";
import { heroSlides } from "./data/heroSlides";

export default function Home() {
  return (
    <main>
      <Hero
        slides={heroSlides}
        primaryCta={{ label: "Shop Now", href: "#products" }}
        secondaryCta={{ label: "Explore Collection", href: "#collections" }}
        collectionLabel="Maison Collection"
      />
      <HomePage />
      <Collections />
      <Categories />
    </main>
  );
}
