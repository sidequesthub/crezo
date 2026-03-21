import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import Problems from "@/components/Problems";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import IndiaFirst from "@/components/IndiaFirst";
import Pricing from "@/components/Pricing";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Problems />
      <ProductShowcase />
      <Features />
      <HowItWorks />
      <IndiaFirst />
      <Pricing />
      <Waitlist />
      <Footer />
    </main>
  );
}
