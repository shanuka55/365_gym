import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SocialShareButtons from "@/components/SocialShareButtons";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import heroGym from "@/assets/hero-gym.jpg";
import heroWorkout from "@/assets/hero-workout.jpg";
import deiraBranch from "@/assets/deira-branch.jpg";
import muhansniahBranch from "@/assets/muhasniah-branch.jpg";
import { useState } from "react";
import { X } from "lucide-react";

const galleryImages = [
  { src: gallery1, title: "Cardio Zone", category: "Equipment" },
  { src: gallery2, title: "Weight Training Area", category: "Equipment" },
  { src: gallery3, title: "Functional Training", category: "Training" },
  { src: gallery4, title: "Locker Rooms", category: "Facilities" },
  { src: heroGym, title: "Main Gym Floor", category: "Equipment" },
  { src: heroWorkout, title: "Training Session", category: "Training" },
  { src: deiraBranch, title: "Deira Branch", category: "Branches" },
  { src: muhansniahBranch, title: "Muhaisnah Branch", category: "Branches" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Equipment", "Training", "Facilities", "Branches"];

  const filteredImages = filter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
          <img
            src={gallery1}
            alt="365 Fitness Gallery"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
              Our <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Take a tour of our world-class facilities
            </p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-8 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    filter === category
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-card text-foreground hover:bg-primary/20 border border-border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:shadow-glow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-foreground mb-1">{image.title}</h3>
                      <span className="inline-block px-3 py-1 bg-primary/20 border border-primary text-primary text-sm rounded-full">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-foreground hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-glow-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center bg-background/95 backdrop-blur-sm p-6 rounded-2xl border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {filteredImages[selectedImage].title}
              </h3>
              <span className="inline-block px-4 py-2 bg-primary/20 border border-primary text-primary rounded-full mb-4">
                {filteredImages[selectedImage].category}
              </span>
              <div className="flex justify-center">
                <SocialShareButtons title={`${filteredImages[selectedImage].title} - 365 Fitness Dubai`} />
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Gallery;
