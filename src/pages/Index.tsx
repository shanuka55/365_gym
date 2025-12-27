import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CountryCards from "@/components/CountryCards";
import GalleryCarousel from "@/components/GalleryCarousel";
import Locations from "@/components/Locations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Reviews from "@/components/Reviews";
import Trainers from "@/components/Trainers";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CountryCards />
        <GalleryCarousel />
        <Locations />
        <WhyChooseUs />
        <Reviews />
        <Trainers />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
