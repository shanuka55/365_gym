import { MapPin } from "lucide-react";
import deiraBranch from "@/assets/deira-branch.jpg";
import muhasniah from "@/assets/muhasniah-branch.jpg";

const locations = [
  {
    name: "UAE",
    image: deiraBranch,
    label: "Dubai & Northern Emirates",
  },
  {
    name: "KSA",
    image: muhasniah,
    label: "Coming Soon",
    comingSoon: true,
  },
  {
    name: "PAKISTAN",
    image: deiraBranch,
    label: "Coming Soon",
    comingSoon: true,
  },
];

const CountryCards = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {locations.map((location, index) => (
            <div
              key={location.name}
              className="relative group overflow-hidden rounded-2xl aspect-[4/3] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-4xl md:text-5xl font-black text-foreground mb-2 uppercase">
                  {location.name}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {location.label}
                </p>
                {location.comingSoon && (
                  <div className="mt-4 flex items-center gap-2 text-primary">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Coming Soon</span>
                  </div>
                )}
              </div>

              {!location.comingSoon && (
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase">
            THIS IS <span className="text-primary">365 FITNESS</span>!
          </h2>
        </div>
      </div>
    </section>
  );
};

export default CountryCards;
