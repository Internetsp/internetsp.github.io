import Header from "@/components/header";
import Hero from "@/components/hero";
import FeaturedServices from "@/components/featured-services";
import FiberPlans from "@/components/fiber-plans";
import WirelessPlans from "@/components/wireless-plans";
import CoverageArea from "@/components/coverage-area";
import Testimonials from "@/components/testimonials";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedServices />
        <FiberPlans />
        <WirelessPlans />
        <CoverageArea />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
