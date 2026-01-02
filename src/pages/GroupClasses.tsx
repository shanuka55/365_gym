import { useState } from "react";
import { Check, Users, Calendar, Heart, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinNowModal from "@/components/JoinNowModal";
import groupClassesImage from "@/assets/group-classes.jpg";

const GroupClasses = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const classes = [
    {
      name: "HIIT",
      icon: "🔥",
      description: "High-intensity interval training for maximum calorie burn",
      duration: "45 min",
      intensity: "High",
    },
    {
      name: "Yoga & Stretching",
      icon: "🧘",
      description: "Improve flexibility, balance, and inner peace",
      duration: "60 min",
      intensity: "Low-Medium",
    },
    {
      name: "Zumba",
      icon: "💃",
      description: "Dance-based cardio party workout",
      duration: "60 min",
      intensity: "Medium",
    },
    {
      name: "Spinning",
      icon: "🚴",
      description: "High-energy cycling classes with motivating music",
      duration: "45 min",
      intensity: "Medium-High",
    },
    {
      name: "Boxing",
      icon: "🥊",
      description: "Combat-inspired cardio and strength training",
      duration: "50 min",
      intensity: "High",
    },
    {
      name: "Pilates",
      icon: "💪",
      description: "Core-strengthening and body-toning exercises",
      duration: "50 min",
      intensity: "Medium",
    },
  ];

  const packages = [
    {
      name: "CLASS PASS",
      classes: "10",
      price: "450",
      validity: "1 Month",
      features: [
        "10 Group Classes",
        "Any Class Type",
        "Flexible Scheduling",
        "1 Month Validity",
        "Online Booking",
      ],
    },
    {
      name: "UNLIMITED",
      classes: "Unlimited",
      price: "699",
      validity: "1 Month",
      popular: true,
      features: [
        "Unlimited Classes",
        "All Class Types Included",
        "Priority Booking",
        "Bring a Friend (2x/month)",
        "Online Booking",
        "Towel Service",
      ],
    },
    {
      name: "ANNUAL UNLIMITED",
      classes: "Unlimited",
      price: "6,999",
      validity: "12 Months",
      features: [
        "Unlimited Classes for 1 Year",
        "All Class Types",
        "Priority Booking",
        "Bring a Friend Anytime",
        "Free Gym Access",
        "Exclusive Workshops",
        "Save AED 1,389",
      ],
    },
  ];

  return (
    <>
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
              Group <span className="text-primary">Classes</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Train with friends and stay motivated together
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Our <span className="text-primary">Classes</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {classes.map((classItem) => (
                <Card key={classItem.name} className="p-6 hover:border-primary transition-colors">
                  <div className="flex items-start gap-4">
                    <span className="text-5xl">{classItem.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{classItem.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{classItem.description}</p>
                      <div className="flex gap-4 text-xs">
                        <span className="text-primary font-bold">⏱ {classItem.duration}</span>
                        <span className="text-muted-foreground">• {classItem.intensity}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Info */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">
                Weekly <span className="text-primary">Schedule</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We offer 50+ classes per week across all our locations. Classes run from 6:00 AM to 9:00 PM daily,
                making it easy to find a time that fits your schedule.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">Morning</h3>
                  <p className="text-muted-foreground">6:00 AM - 11:00 AM</p>
                  <p className="text-sm text-muted-foreground mt-2">Start your day energized</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">Afternoon</h3>
                  <p className="text-muted-foreground">12:00 PM - 5:00 PM</p>
                  <p className="text-sm text-muted-foreground mt-2">Midday fitness boost</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-primary mb-2">Evening</h3>
                  <p className="text-muted-foreground">5:30 PM - 9:00 PM</p>
                  <p className="text-sm text-muted-foreground mt-2">After-work stress relief</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        {/* <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Class <span className="text-primary">Packages</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">Choose the package that fits your lifestyle</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg) => (
                <Card
                  key={pkg.name}
                  className={`p-8 relative ${pkg.popular ? "border-primary border-2 scale-105" : ""}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background px-6 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-center">{pkg.name}</h3>
                  <p className="text-center text-primary font-bold mb-6">{pkg.classes} Classes</p>
                  <div className="text-center mb-6">
                    <span className="text-sm text-muted-foreground">AED</span>
                    <div className="text-5xl font-bold text-primary">{pkg.price}</div>
                    <span className="text-sm text-muted-foreground">{pkg.validity}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => setIsJoinModalOpen(true)}
                  >
                    Get Started
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Join the <span className="text-primary">Community</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book your first class today and experience the power of working out together!
            </p>
            <Button size="lg" onClick={() => setIsJoinModalOpen(true)} className="text-lg px-8 py-6">
              Book Your First Class
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
