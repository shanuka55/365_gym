import { lazy, Suspense, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroGymMobile from "@/assets/hero-gym-mobile.webp";
import heroGymTablet from "@/assets/hero-gym-tablet.webp";
import heroGym from "@/assets/hero-gym-optimized.webp";

const FreePassModal = lazy(() => import("./FreePassModal"));
const JoinNowModal = lazy(() => import("./JoinNowModal"));

const HeroSection = () => {
  const [isFreePassOpen, setIsFreePassOpen] = useState(false);
  const [isJoinNowOpen, setIsJoinNowOpen] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 640px)" srcSet={heroGymMobile} />
          <source media="(max-width: 1024px)" srcSet={heroGymTablet} />
          <img
            src={heroGym}
            alt="24-hour gym in Dubai with modern fitness equipment and ladies-only zones at 365 Fitness Gym Al Muraqqabat"
            className="w-full h-full object-cover"
            width="1920"
            height="1088"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl animate-fade-in">
            <p className="text-primary text-sm md:text-base font-bold mb-3 uppercase tracking-wider">
              Welcome to 365 Fitness
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-4 leading-tight uppercase">
              24-HOUR GYM IN DUBAI
            </h1>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              LADIES SEPARATE GYM
            </h2>
            
            {/* Reviews */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-lg px-4 py-2">
                <span className="text-foreground font-bold text-lg">93,000+</span>
                <Star className="h-5 w-5 text-primary fill-primary" />
                <span className="text-muted-foreground">REVIEWS</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" onClick={() => setIsFreePassOpen(true)} className="text-lg font-bold">
                GET FREE
              </Button>
              <Button variant="hero" size="lg" onClick={() => setIsJoinNowOpen(true)} className="text-lg font-bold">
                JOIN NOW
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={null}>
        {isFreePassOpen && <FreePassModal isOpen={isFreePassOpen} onClose={() => setIsFreePassOpen(false)} />}
        {isJoinNowOpen && <JoinNowModal isOpen={isJoinNowOpen} onClose={() => setIsJoinNowOpen(false)} />}
      </Suspense>
    </section>
  );
};

export default HeroSection;
