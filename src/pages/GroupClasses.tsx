import { useState } from "react";
import { Link } from "react-router-dom";
import PageSeo from "@/components/PageSeo";
import { Users, Calendar, Heart, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinNowModal from "@/components/JoinNowModal";
import groupClassesImage from "@/assets/group-classes.webp";
import hiitImage from "@/assets/class-hiit.webp";
import yogaImage from "@/assets/class-yoga.webp";
import zumbaImage from "@/assets/class-zumba.webp";
import spinningImage from "@/assets/class-spinning.webp";
import boxingImage from "@/assets/class-boxing.webp";
import pilatesImage from "@/assets/class-pilates.webp";

const GroupClasses = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const classes = [
    {
      name: "HIIT",
      description: "HIIT classes combine short bursts of high-intensity exercise with recovery periods. Train your strength and cardiovascular endurance in an energetic group workout that keeps you moving.",
      image: hiitImage,
      alt: "High intensity training in the gym",
    },
    {
      name: "Yoga & Stretching",
      description: "Yoga and stretching classes bring together mindful movement, breathing and flexibility work. Make space in your routine to improve balance, ease tension and unwind.",
      image: yogaImage,
      alt: "Yoga and stretching workout",
    },
    {
      name: "Zumba",
      description: "Zumba classes bring dance-inspired moves and cardio together in an upbeat group workout. Move to the music, build endurance and enjoy a fun way to stay active.",
      image: zumbaImage,
      alt: "A group enjoying a dance fitness class",
    },
    {
      name: "Spinning",
      description: "Spinning classes bring the energy of indoor cycling to a group setting. Ride to motivating music while working on cardiovascular fitness and endurance.",
      image: spinningImage,
      alt: "A group riding stationary bikes in a cycling class",
    },
    {
      name: "Boxing",
      description: "Boxing classes combine punches and boxing-inspired movements for an engaging workout. Develop coordination, strength and cardiovascular fitness alongside others.",
      image: boxingImage,
      alt: "Boxing training in the gym",
    },
    {
      name: "Pilates",
      description: "Pilates classes use controlled movements to work on core strength, posture and balance. Add mindful movement to your fitness routine and build a stronger foundation.",
      image: pilatesImage,
      alt: "A group practicing Pilates on mats",
    },
  ];

  return (
    <>
      <PageSeo
        title="Group Fitness Classes in Dubai | 365 Fitness"
        description="Explore group fitness classes at 365 Fitness Dubai, including HIIT, yoga, Zumba, spinning, boxing and Pilates. Enquire about classes and schedules."
        canonical="https://www.365fitness.ae/services/group-classes"
        image={groupClassesImage}
      />
      <Header />
      <div className="min-h-screen bg-background pt-24">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${groupClassesImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Group Fitness <span className="text-primary">Classes in Dubai</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Move, train and stay motivated together at 365 Fitness
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                Why Join <span className="text-primary">Group Classes?</span>
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                <Card className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Community</h3>
                  <p className="text-muted-foreground text-sm">
                    Train with like-minded people and build lasting friendships.
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Motivation</h3>
                  <p className="text-muted-foreground text-sm">
                    Group energy pushes you harder than solo workouts.
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Flame className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Fun Workouts</h3>
                  <p className="text-muted-foreground text-sm">
                    Exercise feels less like work with music and group spirit.
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Structured Schedule</h3>
                  <p className="text-muted-foreground text-sm">
                    Set class times help you stay consistent and accountable.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Class Types */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-3">Find your workout</p>
                <h2 className="text-4xl font-bold">Our <span className="text-primary">Classes</span></h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">Explore group workouts at 365 Fitness, from high-energy HIIT and indoor cycling to yoga, Pilates and dance fitness. Contact our team to check class availability and schedules at your preferred Dubai branch.</p>
              </div>
              <div className="space-y-8">
                {classes.map((classItem, index) => (
                  <article key={classItem.name} className="grid md:grid-cols-2 overflow-hidden rounded-xl border border-border bg-card">
                    <div className={`min-h-[240px] md:min-h-[320px] ${index % 2 === 1 ? "md:order-2" : ""}`}>
                      <img src={classItem.image} alt={classItem.alt} loading="lazy" className="w-full h-full min-h-[240px] md:min-h-[320px] object-cover" />
                    </div>
                    <div className="flex flex-col items-start justify-center p-7 sm:p-10 lg:p-12">
                      <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Group classes</p>
                      <h3 className="text-3xl font-bold mb-4">{classItem.name}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-7">{classItem.description}</p>
                      <Button onClick={() => setIsJoinModalOpen(true)} aria-label={`Enquire about ${classItem.name}`}>Enquire Now</Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Schedule and locations */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-4xl font-bold mb-6">Group Class <span className="text-primary">Schedules</span></h2>
            <p className="text-lg text-muted-foreground mb-6">
              Class types and times may vary by location. Contact our team for the latest schedule, availability and booking details at your preferred branch.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Explore our gyms in <Link className="text-primary underline underline-offset-4" to="/locations/deira-muraqqabat">Deira Muraqqabat</Link> and <Link className="text-primary underline underline-offset-4" to="/locations/muhaisnah-first">Muhaisnah First</Link>, or discover <Link className="text-primary underline underline-offset-4" to="/services/personal-training">personal training</Link> for individual support.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Join the <span className="text-primary">Community</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ask our team about group fitness classes and find a workout that fits your goals.
            </p>
            <Button size="lg" onClick={() => setIsJoinModalOpen(true)} className="text-lg px-8 py-6">
              Enquire About Classes
            </Button>
          </div>
        </section>
      </div>
      <Footer />
      <JoinNowModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </>
  );
};

export default GroupClasses;
