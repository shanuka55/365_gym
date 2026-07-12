import { MessageCircle, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import trainerIsha from "@/assets/ISHA.webp";
import trainerMashid from "@/assets/MAHSHID.webp";
import trainerAzeem from "@/assets/AZEEM.webp";
import trainerShan from "@/assets/SHAN.webp";
import trainerFarzana from "@/assets/FARZANA.webp";
import trainerAhmed from "@/assets/AHMED.webp";

const trainers = [
  {
    name: "Coach Isha",
    specialty: "Personal Training & Weight Loss",
    image: trainerIsha,
    bio: "Certified Personal Trainer and Group Fitness Instructor with expertise in aerobics, Zumba, step cardio, boxing, HIIT, and Tabata. I also specialize in strength training, exercise recovery, and kids’ Zumba classes",
  },
  {
    name: "Coach Mashid",
    specialty: "Women's Fitness & Dance",
    image: trainerMashid,
    bio: "Certified Personal Trainer Level III with 20 years experience. Women's Aerobics Champion specializing in corrective movements and functional training.",
  },
  {
    name: "Coach Azeem",
    specialty: "Body Building & Nutrition",
    image: trainerAzeem,
    bio: "Certified Personal Trainer Level 3 from UAE. Expert in muscle building, Les Mills programs, and nutrition planning.",
  },
  {
    name: "Coach Shan",
    specialty: "CrossFit & Personal Training",
    image: trainerShan,
    bio: "Certified GPT HIIT Train Fitness by Reps UK. Physical Fitness Trainer NVQ Level 4 and member of Asia Fitness Conference.",
  },
  {
    name: "Coach Farzana",
    specialty: "Personal Training & Zumba",
    image: trainerFarzana,
    bio: "certified Personal Trainer and Group Fitness Instructor with expertise in aerobics, Zumba, step cardio, boxing, HIIT, and Tabata. I also specialize in strength training, exercise recovery, and kids’ Zumba classes",
  },
  {
    name: "Coach Ahmed",
    specialty: "MMA, Boxing, kickbboxing, karate & self defense",
    image: trainerAhmed,
    bio: "Certified Combat Sports Coach specializing in Boxing, Kickboxing, Karate, and Self-Defense. Experienced in building strength, endurance, and fight skills through structured training programs. Focused on discipline, technique, and helping clients achieve real fitness and combat performance results.",
  },
];

const Trainers = () => {
  const handleBookTrainer = (name: string) => {
    const message = `Hi 365 Fitness! I'd like to book a session with ${name}.`;
    window.open(`https://wa.me/97143375022?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet Your <span className="text-primary">Expert Trainers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our certified professionals are here to guide you every step of the way
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={trainer.name}
              className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-glow animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Trainer Image */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width="480"
                  height="640"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Social Icons Overlay */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-primary/90 hover:bg-primary p-2 rounded-full transition-colors">
                    <Instagram className="h-5 w-5 text-primary-foreground" />
                  </button>
                  <button className="bg-primary/90 hover:bg-primary p-2 rounded-full transition-colors">
                    <Facebook className="h-5 w-5 text-primary-foreground" />
                  </button>
                </div>
              </div>

              {/* Trainer Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">{trainer.name}</h3>
                <p className="text-primary font-semibold mb-3">{trainer.specialty}</p>
                <p className="text-muted-foreground mb-6">{trainer.bio}</p>

                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => handleBookTrainer(trainer.name)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Book Now
                </Button>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
