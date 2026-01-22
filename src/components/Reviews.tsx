import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Ahmed Al-Mansoori",
    rating: 5,
    date: "2 weeks ago",
    text: "We're The Best Gym In The GCC And It Don't Just Take Our Word So, It's Just Take One Word!",
    initials: "AM",
  },
  {
    name: "Sarah Johnson",
    rating: 5,
    date: "1 month ago",
    text: "Best gym in Dubai! The trainers are incredibly supportive and the facilities are world-class. I've achieved results I never thought possible.",
    initials: "SJ",
  },
  {
    name: "Mohammed Hassan",
    rating: 5,
    date: "3 weeks ago",
    text: "365 Fitness has completely transformed my lifestyle. The 24/7 access is perfect for my schedule and the community is amazing!",
    initials: "MH",
  },
];

const Reviews = () => {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 uppercase">
            MEMBERS<br />
            <span className="text-primary">REVIEWS</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're The Best Gym In The Dubai And It Don't Just Take Our Word So, It's Just Take One Word!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all duration-300 hover:shadow-glow animate-fade-in relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
