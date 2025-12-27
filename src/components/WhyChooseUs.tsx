import { MapPin, Users, DollarSign, Clock, Dumbbell, Zap } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    number: "2",
    label: "LOCATIONS",
  },
  {
    icon: Users,
    number: "95,000+",
    label: "MEMBERS",
  },
  {
    icon: DollarSign,
    number: "99",
    label: "AED MONTHLY",
  },
  {
    icon: Clock,
    number: "24/7",
    label: "OPEN 24/7",
  },
  {
    icon: Dumbbell,
    number: "400+",
    label: "FREE CLASSES",
  },
  {
    icon: Zap,
    number: "500+",
    label: "MACHINES",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 uppercase">
            WHY 365 FITNESS?
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 p-6 rounded-full bg-card border-2 border-primary/30 group-hover:border-primary transition-all duration-300 group-hover:shadow-glow">
                <stat.icon className="h-10 w-10 md:h-12 md:w-12 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-foreground mb-2">{stat.number}</h3>
              <p className="text-xs md:text-sm text-muted-foreground font-bold tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
