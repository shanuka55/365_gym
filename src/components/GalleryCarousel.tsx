import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gallery1 from "@/assets/IMG_Deira_01.webp";
import gallery2 from "@/assets/IMG_Deira_02.webp";
import gallery3 from "@/assets/IMG_Muhasnah_01.webp";
import gallery4 from "@/assets/IMG_Muhasnah_02.webp";
import gallery5 from "@/assets/IMG_Muhasnah_04.webp";
import gallery6 from "@/assets/IMG_Muhasnah_08.webp";
import gallery7 from "@/assets/365 FITNESS GYM MUHASNAH 01.webp";
import gallery8 from "@/assets/365 FITNESS GYM MUHASNAH 02.webp";
import gallery9 from "@/assets/365 FITNESS GYM MUHASNAH 03.webp";
import gallery10 from "@/assets/365 FITNESS GYM MUHASNAH 04.webp";
import gallery11 from "@/assets/365 FITNESS GYM MUHASNAH 05.webp";
import gallery12 from "@/assets/365 FITNESS GYM MUHASNAH 06.webp";
import gallery13 from "@/assets/365 FITNESS GYM MUHASNAH 07.webp";
import gallery14 from "@/assets/365 FITNESS GYM MUHASNAH 08.webp";

const galleryImages = [
  { src: gallery7, alt: "Modern amenities and facilities" },
  { src: gallery8, alt: "State-of-the-art cardio equipment area" },
  { src: gallery9, alt: "Premium weight training zone" },
  { src: gallery10, alt: "Functional training area with TRX and battle ropes" },
  { src: gallery11, alt: "Modern locker room facilities" },
  { src: gallery12, alt: "Spacious group fitness studio" },
  { src: gallery13, alt: "Modern amenities and facilities" },
  { src: gallery14, alt: "State-of-the-art cardio equipment area" },
  { src: gallery1, alt: "State-of-the-art cardio equipment area" },
  { src: gallery2, alt: "Premium weight training zone" },
  { src: gallery3, alt: "Functional training area with TRX and battle ropes" },
  { src: gallery4, alt: "Modern locker room facilities" },
  { src: gallery5, alt: "Spacious group fitness studio" },
  { src: gallery6, alt: "Premium amenities and facilities" },

];

const GalleryCarousel = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || document.hidden) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isVisible]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 uppercase">
            THIS IS <span className="text-primary">365 FITNESS</span>!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience world-class equipment and premium amenities
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Image */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-glow-lg border-2 border-primary/20">
            <img
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              loading="lazy"
              decoding="async"
              width="1200"
              height="675"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-primary/80 text-foreground p-3 rounded-full transition-all duration-300 hover:shadow-glow"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-primary/80 text-foreground p-3 rounded-full transition-all duration-300 hover:shadow-glow"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "w-12 bg-primary shadow-glow" : "w-2 bg-foreground/50"
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;
