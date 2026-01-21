import { MapPin, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const locations = [
  {
    name: "Deira Muraqqabat Branch",
    address: "MZ 08, Dubai Municipality Building, Near Muraqqbat Police Station, Salah Al Din Road, Dubai",
    phone: "+971 54 712 0925",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.5859999999997!2d55.32659!3d25.2692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ce94f3aaaab%3A0x6b033809b2e0d877!2s365%20Fitness%20Gym!5e0!3m2!1sen!2sae!4v1234567890",
    directionsUrl: "https://maps.app.goo.gl/3vzBPS0w19nqjh8Pe",
  },
  {
    name: "Muhaisnah First Branch",
    address: "6CP7+R99 - Muhaisnah First - Muhaisnah - Dubai",
    phone: "+971 54 712 0927",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.845!2d55.43933!3d25.31388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5e59b6f0e8ed%3A0x8e9f0b5c3d2a1b4c!2s365%20Fitness%20Muhaisnah!5e0!3m2!1sen!2sae!4v1234567890",
    directionsUrl: "https://maps.app.goo.gl/c3eLmRiOdG4SNRRiR",
  },
];

const Locations = () => {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4 uppercase">
            <span className="text-primary">365 FITNESS</span> LOCATIONS
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your nearest branch and start your transformation today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {locations.map((location, index) => (
            <div
              key={location.name}
              className="bg-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-2xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-glow animate-fade-in group"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Map Embed */}
              <div className="relative h-64 bg-secondary">
                <iframe
                  src={location.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${location.name}`}
                  className="w-full h-full"
                />
              </div>

              {/* Location Info */}
              <div className="p-6 bg-card/80 backdrop-blur-sm">
                <h3 className="text-2xl font-black text-foreground mb-4 uppercase group-hover:text-primary transition-colors">{location.name}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <p className="text-muted-foreground">{location.address}</p>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                    <a
                      href={`tel:${location.phone}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="default"
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase rounded-full"
                    onClick={() => window.open(location.directionsUrl, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Directions
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold uppercase rounded-full"
                    asChild
                  >
                    <Link to={location.name.includes('Deira') ? '/locations/deira-muraqqabat' : '/locations/muhaisnah-first'}>
                      Gym Info
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
