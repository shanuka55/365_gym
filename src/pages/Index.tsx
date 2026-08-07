import { lazy, Suspense, useEffect, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PageSeo from "@/components/PageSeo";

const CountryCards = lazy(() => import("@/components/CountryCards"));
const GalleryCarousel = lazy(() => import("@/components/GalleryCarousel"));
const Locations = lazy(() => import("@/components/Locations"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Reviews = lazy(() => import("@/components/Reviews"));
const Trainers = lazy(() => import("@/components/Trainers"));
const FAQ = lazy(() => import("@/components/FAQ"));
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));

const useRenderAfterIdle = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const scheduleIdle = window.requestIdleCallback || ((callback: IdleRequestCallback) => window.setTimeout(callback, 1200));
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
    const handle = scheduleIdle(() => setCanRender(true), { timeout: 1800 });

    return () => cancelIdle(handle);
  }, []);

  return canRender;
};

const Index = () => {
  const renderDeferredContent = useRenderAfterIdle();

  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="365 Fitness | 24/7 Gyms in Dubai"
        description="Train 24/7 at 365 Fitness gyms in Deira and Muhaisnah, Dubai, with strength and cardio equipment, personal training and group classes."
        canonical="https://www.365fitness.ae/"
      />
      <Header />
      <main>
        <HeroSection />
        {renderDeferredContent && (
          <Suspense fallback={null}>
            <CountryCards />
            <GalleryCarousel />
            <Locations />
            <WhyChooseUs />
            <Reviews />
            <FAQ />
            <Trainers />
          </Suspense>
        )}
      </main>
      {renderDeferredContent && (
        <Suspense fallback={null}>
          <Footer />
          <WhatsAppButton />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
