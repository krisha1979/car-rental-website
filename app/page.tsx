import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import Features from "@/components/Features";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Hero />
      <Collection />
      <Features />
      <Process />
      <Testimonials />
      <Faq />
      <Footer />
    </main>
  );
}

