import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  {
    name: "Ahmed Al-Mansoori",
    rating: 5,
    date: "1 day ago",
    text: "I joined 365 Fitness Gym in Muhaisnah Dubai and it's one of the best gym memberships I've had. The gym is clean, well-equipped, and never too crowded. The trainers are very professional and always ready to help. If you're looking for an affordable gym membership in Dubai with quality service, this is the place.",
    initials: "AM",
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    date: "1 month ago",
    text: "Highly recommend 365 Fitness Gym for anyone searching for a premium fitness gym in Dubai. The membership plans are flexible and worth the price. Great atmosphere, modern equipment, and expert coaches who guide you properly. Perfect gym in Muhaisnah for beginners and advanced training.",
    initials: "SJ",
  },
  {
    name: "Mohammed Hassan",
    rating: 5,
    date: "3 weeks ago",
    text: "Best gym membership! 365 Fitness Gym offers everything: 24/7 access, professional trainers, and a motivating environment. I've seen real results since joining. If you want a reliable and results-driven fitness center in Dubai, this gym is highly recommended.",
    initials: "MH",
  },
  {
    name: "Priya Nair",
    rating: 5,
    date: "2 weeks ago",
    text: "The ladies' training support is excellent and the staff make everyone feel comfortable. I like the clean changing rooms, updated machines, and how the trainers correct form without making you feel rushed.",
    initials: "PN",
  },
  {
    name: "Omar Khalid",
    rating: 5,
    date: "4 weeks ago",
    text: "Great gym near Muhaisnah with a serious training vibe. The equipment selection is strong, the free weights area is well managed, and the team keeps the place tidy even during busy hours.",
    initials: "OK",
  },
  {
    name: "Ayesha Khan",
    rating: 5,
    date: "2 months ago",
    text: "I started as a beginner and the coaches helped me build confidence step by step. The classes are energetic, the membership is affordable, and the environment feels positive every time I walk in.",
    initials: "AK",
  },
  {
    name: "Daniel Fernandes",
    rating: 5,
    date: "2 months ago",
    text: "365 Fitness Gym has everything I need for strength training and cardio. The trainers are approachable, the machines are maintained well, and the location is convenient after work.",
    initials: "DF",
  },
  {
    name: "Fatima Rahman",
    rating: 5,
    date: "3 months ago",
    text: "Very professional team and a welcoming gym atmosphere. I appreciate the flexible plans and the way staff members remember members by name. It makes training feel personal.",
    initials: "FR",
  },
];

const Reviews = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => setCurrent(api.selectedScrollSnap());

    updateCurrent();
    api.on("select", updateCurrent);
    api.on("reInit", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
      api.off("reInit", updateCurrent);
    };
  }, [api]);

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 uppercase">
            MEMBERS
            <br />
            <span className="text-primary">REVIEWS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're The Best Gym In The Dubai And It Don't Just Take Our Word So, It's Just Take One Word!
          </p>
        </div>

        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="max-w-7xl mx-auto px-0 sm:px-10">
          <CarouselContent className="-ml-6">
            {reviews.map((review, index) => (
              <CarouselItem key={review.name} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div
                  className="h-full min-h-[360px] bg-card border border-border rounded-lg p-6 hover:border-primary transition-all duration-300 hover:shadow-glow animate-fade-in relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />

                  <div className="flex items-center gap-4 mb-4 pr-8">
                    <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold">{review.initials}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-primary fill-primary" />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex left-0 border-primary/30 bg-background/90 hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="hidden sm:flex right-0 border-primary/30 bg-background/90 hover:bg-primary hover:text-primary-foreground" />
        </Carousel>

        <div className="mt-8 flex justify-center gap-2">
          {reviews.map((review, index) => (
            <button
              key={`${review.name}-dot`}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index ? "w-10 bg-primary shadow-glow" : "w-2 bg-foreground/40 hover:bg-primary/70"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
