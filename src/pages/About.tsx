import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import aboutHero from "@/assets/team-hero.jpg";
import missionVision from "@/assets/mission-vision.jpg";
import { Award, Users, TrendingUp, Target } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "95,000+", label: "Active Members" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: TrendingUp, value: "400+", label: "Free Classes Monthly" },
    { icon: Target, value: "2", label: "Premium Locations" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <img
            src={aboutHero}
            alt="365 Fitness Team"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
              About <span className="text-primary">365 Fitness</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dubai's Premier Body Building & Fitness Destination
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-foreground mb-6 text-center">
                Our <span className="text-primary">Story</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  365 Fitness Body Building Club has been Dubai's leading fitness destination for over 15 years. 
                  Founded with a vision to create a world-class training environment, we've grown to become the 
                  home of 95,000+ fitness enthusiasts across the UAE.
                </p>
                <p>
                  Our commitment goes beyond just providing equipment and space. We've built a community where 
                  members push each other to achieve their best, where expert trainers guide you every step of 
                  the way, and where your fitness goals become our mission.
                </p>
                <p>
                  With two premium locations in Deira Muraqqabat and Muhaisnah First, we offer 24/7 access to 
                  state-of-the-art facilities, 400+ free classes monthly, and a team of certified professionals 
                  dedicated to your transformation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="text-center animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    Our <span className="text-primary">Mission</span>
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    To empower individuals to achieve their fitness goals through world-class facilities, 
                    expert guidance, and a supportive community that inspires transformation every single day.
                  </p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    Our <span className="text-primary">Vision</span>
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    To be the Middle East's most trusted fitness partner, setting the standard for excellence 
                    in bodybuilding, strength training, and overall wellness.
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-glow-lg">
                <img
                  src={missionVision}
                  alt="Mission and Vision"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
              Our <span className="text-primary">Values</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all hover:shadow-glow">
                <h3 className="text-2xl font-bold text-primary mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in equipment, facilities, and training programs.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all hover:shadow-glow">
                <h3 className="text-2xl font-bold text-primary mb-3">Community</h3>
                <p className="text-muted-foreground">
                  We build a supportive environment where everyone motivates each other to succeed.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition-all hover:shadow-glow">
                <h3 className="text-2xl font-bold text-primary mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We constantly evolve with the latest fitness trends and technology.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
