import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type BranchReviewsProps = {
  branch: "deira" | "muhaisnah";
};

export const branchReviewData = {
  deira: {
    heading: "Members Reviews",
    highlight: "Deira",
    intro: "Real feedback from members training at 365 Fitness Deira Muraqqabat.",
    reviews: [
      {
        name: "Ahmed Al-Mansoori",
        initials: "AM",
        date: "1 week ago",
        text: "One of the best gyms in Deira for serious training. The equipment is strong, the gym is open 24 hours, and the location near Al Muraqqabat is very convenient.",
      },
      {
        name: "Priya Sharma",
        initials: "PS",
        date: "2 weeks ago",
        text: "I joined for personal training and the coaches helped me improve my form, lose weight, and stay consistent. Very professional team in Deira.",
      },
      {
        name: "Mohammed Khan",
        initials: "MK",
        date: "3 weeks ago",
        text: "Great gym near Rigga and Salah Al Din. Clean facilities, good machines, and a motivating atmosphere for strength training and fitness.",
      },
      {
        name: "Nadia Fernandes",
        initials: "NF",
        date: "1 month ago",
        text: "365 Fitness Deira has a friendly team, organized workout zones, and flexible membership options. It is easy to train before or after work because the gym is open 24/7.",
      },
      {
        name: "Rizwan Ali",
        initials: "RA",
        date: "1 month ago",
        text: "The trainers are knowledgeable and the gym has excellent free weights, cardio machines, and functional training equipment. Perfect fitness center in Deira for daily training.",
      },
      {
        name: "Elena Petrova",
        initials: "EP",
        date: "2 months ago",
        text: "I like the clean environment and professional service. The Deira branch is close to Union and Muraqqabat, so it is very convenient for my routine.",
      },
      {
        name: "Hassan Yousuf",
        initials: "HY",
        date: "2 months ago",
        text: "If you want a reliable 24-hour gym in Deira, this is a great choice. The atmosphere keeps you motivated and the staff are always ready to help.",
      },
      {
        name: "Anjali Nair",
        initials: "AN",
        date: "3 months ago",
        text: "The group classes and personal training support helped me stay consistent. 365 Fitness Deira feels welcoming, clean, and focused on real results.",
      },
    ],
  },
  muhaisnah: {
    heading: "Members Reviews",
    highlight: "Muhaisnah",
    intro: "What members say about training at 365 Fitness Muhaisnah First.",
    reviews: [
      {
        name: "Ayesha Khan",
        initials: "AK",
        date: "1 week ago",
        text: "The ladies separate area in Muhaisnah is comfortable and private. The trainers are supportive and the gym has everything I need for my fitness goals.",
      },
      {
        name: "Omar Hassan",
        initials: "OH",
        date: "2 weeks ago",
        text: "Best gym in Muhaisnah for 24/7 access, personal training, and clean equipment. The location near Madinat Badr is perfect for me.",
      },
      {
        name: "Sarah Johnson",
        initials: "SJ",
        date: "3 weeks ago",
        text: "I enjoy the group classes, especially Zumba and yoga. The environment is friendly, energetic, and suitable for all fitness levels.",
      },
      {
        name: "Ahmed Al-Mansoori",
        initials: "AM",
        date: "1 month ago",
        text: "I joined 365 Fitness Gym in Muhaisnah Dubai and it is one of the best gym memberships I have had. The gym is clean, well-equipped, and never too crowded.",
      },
      {
        name: "Fatima Rahman",
        initials: "FR",
        date: "1 month ago",
        text: "The ladies gym area gives me privacy and confidence while training. The female-friendly environment and helpful coaches make every session better.",
      },
      {
        name: "Daniel Fernandes",
        initials: "DF",
        date: "2 months ago",
        text: "365 Fitness Muhaisnah has strong equipment for bodybuilding, cardio, and functional training. The staff maintain the gym well and the vibe is motivating.",
      },
      {
        name: "Mohammed Hassan",
        initials: "MH",
        date: "2 months ago",
        text: "Best gym membership in Muhaisnah for anyone who wants professional trainers, flexible access, and a positive training environment. I have seen real progress since joining.",
      },
      {
        name: "Priya Nair",
        initials: "PN",
        date: "3 months ago",
        text: "The personal trainers explain each exercise clearly and track progress properly. It is a clean, modern gym near Al Qusais and Madinat Badr.",
      },
    ],
  },
};

const BranchReviews = ({ branch }: BranchReviewsProps) => {
  const content = branchReviewData[branch];
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 uppercase">
            {content.heading.split(" ")[0]}
            <br />
            <span className="text-primary">{content.heading.split(" ")[1]} {content.highlight}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{content.intro}</p>
        </div>

        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className="max-w-7xl mx-auto px-0 sm:px-10">
          <CarouselContent className="-ml-6">
            {content.reviews.map((review, index) => (
              <CarouselItem key={review.name} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <div
                  className="h-full min-h-[380px] bg-card border border-border rounded-lg p-6 hover:border-primary transition-all duration-300 hover:shadow-glow relative"
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
                    {Array.from({ length: 5 }).map((_, i) => (
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
          {content.reviews.map((review, index) => (
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

export default BranchReviews;
