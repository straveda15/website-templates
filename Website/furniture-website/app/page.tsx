import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomePage from "./HomePage";
import Collections from "./components/Collections";
import Categories from "./components/Categories";


export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HomePage />
      <Collections />
      <Categories />
      
    </main>
  );
}