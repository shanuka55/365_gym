import { useState } from "react";
import { Check, Smartphone, Video, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinNowModal from "@/components/JoinNowModal";
import onlineCoachingImage from "@/assets/online-coaching.jpg";

const OnlineCoaching = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const packages = [
    {
      name: "BASIC ONLINE",
      price: "399",
      duration: "1 Month",
      features: [
        "Custom Workout Program",
        "Weekly Check-ins",
        "Email Support",
        "Exercise Video Library",
        "Progress Tracking App",
      ],
    },
    {
      name: "STANDARD ONLINE",
      price: "699",
      duration: "1 Month",
      popular: true,
      features: [
        "Custom Workout & Nutrition Plan",
        "2x Weekly Video Calls",
        "Daily Chat Support",
        "Form Check Videos",
        "Progress Tracking App",
        "Monthly Body Assessments",
        "Supplement Guidance",
      ],
    },
    {
      name: "PREMIUM ONLINE",
      price: "1,199",
      duration: "1 Month",
      features: [
        "Fully Personalized Coaching",
        "3x Weekly Video Calls",
        "24/7 Chat Support",
        "Custom Meal Plans",
        "Form Check Videos",
        "Progress Tracking App",
        "Weekly Body Assessments",
        "Lifestyle & Mindset Coaching",
      ],
    },
  ];

  const benefits = [
    {
      icon: Smartphone,
      title: "Train Anywhere",
      description: "Work out from home, hotel, or any gym. Your coach and program travel with you.",
    },
    {
      icon: Video,
      title: "Video Coaching",
      description: "Regular video calls ensure proper form and technique, just like in-person training.",
    },
    {
      icon: MessageSquare,
      title: "24/7 Support",
      description: "Message your coach anytime with questions. Get expert advice when you need it most.",
    },
    {
      icon: Calendar,
      title: "Flexible Schedule",
      description: "No fixed appointment times. Work out when it fits your schedule, not ours.",
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
            style={{ backgroundImage: `url(${onlineCoachingImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Online <span className="text-primary">Coaching</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Expert personal training from anywhere in the world
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                Why Choose <span className="text-primary">Online Coaching?</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit) => (
                  <Card key={benefit.title} className="p-6 text-center">
                    <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                How It <span className="text-primary">Works</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center font-bold text-xl">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Sign Up & Onboard</h3>
                    <p className="text-muted-foreground">
                      Fill out a detailed questionnaire about your goals, experience, schedule, and available equipment. 
                      This helps us match you with the perfect coach and create your custom program.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center font-bold text-xl">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Get Your Custom Plan</h3>
                    <p className="text-muted-foreground">
                      Within 48 hours, receive your personalized workout and nutrition plan via our mobile app. 
                      Watch demo videos, track your workouts, and log your meals all in one place.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center font-bold text-xl">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Train & Connect</h3>
                    <p className="text-muted-foreground">
                      Follow your program and stay connected with your coach through regular video calls and daily messaging. 
                      Send form-check videos to ensure you're performing exercises correctly.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center font-bold text-xl">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Track & Adjust</h3>
                    <p className="text-muted-foreground">
                      Your coach monitors your progress and adjusts your program as needed. We continuously optimize your 
                      plan based on your results, feedback, and changing goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                What's <span className="text-primary">Included</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <Check className="h-6 w-6 text-primary" />
                    Custom Training Program
                  </h3>
                  <p className="text-muted-foreground">
                    Workouts designed specifically for your goals, experience level, and available equipment - whether that's a full gym or just bodyweight.
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <Check className="h-6 w-6 text-primary" />
                    Nutrition Guidance
                  </h3>
                  <p className="text-muted-foreground">
                    Personalized meal plans and macros tailored to your goals. No cookie-cutter diets - everything is customized for you.
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <Check className="h-6 w-6 text-primary" />
                    Exercise Video Library
                  </h3>
                  <p className="text-muted-foreground">
                    Access hundreds of exercise demonstrations showing proper form and technique. Never wonder how to do an exercise again.
                  </p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <Check className="h-6 w-6 text-primary" />
                    Progress Tracking App
                  </h3>
                  <p className="text-muted-foreground">
                    Track workouts, meals, weight, photos, and measurements. See your transformation unfold with detailed analytics and graphs.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Coaching <span className="text-primary">Packages</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">Choose your level of support</p>
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
                  <h3 className="text-2xl font-bold mb-6 text-center">{pkg.name}</h3>
                  <div className="text-center mb-6">
                    <span className="text-sm text-muted-foreground">AED</span>
                    <div className="text-5xl font-bold text-primary">{pkg.price}</div>
                    <span className="text-sm text-muted-foreground">/{pkg.duration}</span>
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
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Start Your Journey <span className="text-primary">Today</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get expert coaching from anywhere. Train on your schedule with a dedicated coach guiding you every step.
            </p>
            <Button size="lg" onClick={() => setIsJoinModalOpen(true)} className="text-lg px-8 py-6">
              Sign Up for Online Coaching
            </Button>
          </div>
        </section>
      </div>
      <Footer />
      <JoinNowModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </>
  );
};

export default OnlineCoaching;
