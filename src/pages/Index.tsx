import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const CountryCards = lazy(() => import("@/components/CountryCards"));
const GalleryCarousel = lazy(() => import("@/components/GalleryCarousel"));
const Locations = lazy(() => import("@/components/Locations"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Reviews = lazy(() => import("@/components/Reviews"));
const Trainers = lazy(() => import("@/components/Trainers"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <CountryCards />
          <GalleryCarousel />
          <Locations />
          <WhyChooseUs />
          <Reviews />
          <Trainers />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
