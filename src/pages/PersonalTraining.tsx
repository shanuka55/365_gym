import { useState } from "react";
import { Check, User, Target, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinNowModal from "@/components/JoinNowModal";
import personalTrainingImage from "@/assets/personal-training.jpg";

const PersonalTraining = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const packages = [
    {
      name: "STARTER PACK",
      sessions: "1",
      price: "150",
      duration: "1 day",
      features: [
        "One Session",
        "Personalized Workout Plan",
        "Basic Nutrition Guidance",
        "Progress Tracking",
        "Flexible Scheduling",
      ],
    },
    {
      name: "TRANSFORMATION",
      sessions: "24",
      price: "1,700",
      duration: "1 Month",
      popular: true,
      features: [
        "24 One-on-One Sessions",
        "Custom Workout & Meal Plans",
        "Weekly Progress Assessments",
        "Supplement Recommendations",
        "Priority Booking",
        "Motivational Support",
        "Body Composition Analysis",
      ],
    },
    {
      name: "ELITE COACHING",
      sessions: "30",
      price: "2,500",
      duration: "5 months",
      features: [
        "48 One-on-One Sessions",
        "Complete Lifestyle Coaching",
        "Daily Check-ins & Support",
        "Advanced Nutrition Planning",
        "Home Workout Programs",
        "Injury Prevention Strategies",
        "Monthly Body Scans",
        "Lifetime Training Plan",
      ],
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Goal-Focused Training",
      description: "Whether it's weight loss, muscle gain, or athletic performance - we create a plan specifically for your goals.",
    },
    {
      icon: User,
      title: "Certified Trainers",
      description: "Work with experienced, certified professionals who understand biomechanics, nutrition, and motivation.",
    },
    {
      icon: TrendingUp,
      title: "Faster Results",
      description: "Achieve your fitness goals 3x faster with personalized attention and expert guidance at every session.",
    },
    {
      icon: Award,
      title: "Safe & Effective",
      description: "Learn proper form, prevent injuries, and maximize every rep with professional technique coaching.",
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
            style={{ backgroundImage: `url(${personalTrainingImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Personal <span className="text-primary">Training</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              One-on-one coaching tailored to your unique goals and fitness level
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                Why Choose <span className="text-primary">Personal Training?</span>
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

        {/* What to Expect */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                What to <span className="text-primary">Expect</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center font-bold text-xl">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Initial Assessment</h3>
                    <p className="text-muted-foreground">
                      We start with a comprehensive fitness evaluation - measuring your current fitness level, discussing your goals,
                      medical history, and any limitations. This helps us create the perfect program for you.
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
                    <h3 className="text-2xl font-bold mb-2">Personalized Plan</h3>
                    <p className="text-muted-foreground">
                      Your trainer designs a custom workout plan tailored to your goals, schedule, and preferences. Every exercise,
                      set, and rep is chosen specifically for your success.
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
                    <h3 className="text-2xl font-bold mb-2">Expert Guidance</h3>
                    <p className="text-muted-foreground">
                      During each session, your trainer provides hands-on coaching - demonstrating exercises, correcting form,
                      pushing you safely beyond your comfort zone, and keeping you motivated.
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
                    <h3 className="text-2xl font-bold mb-2">Track Progress</h3>
                    <p className="text-muted-foreground">
                      We continuously monitor your progress through measurements, photos, and performance metrics. Your program
                      evolves as you get stronger, ensuring you never plateau.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Training <span className="text-primary">Packages</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">Choose the package that fits your goals</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg) => (
                <Card
                  key={pkg.name}
                  className={`p-8 relative ${pkg.popular ? "border-primary border-2 scale-105" : ""}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background px-6 py-1 rounded-full text-sm font-bold">
                      BEST VALUE
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-center">{pkg.name}</h3>
                  <p className="text-center text-primary font-bold mb-6">{pkg.sessions} Sessions</p>
                  <div className="text-center mb-6">
                    <span className="text-sm text-muted-foreground">AED</span>
                    <div className="text-5xl font-bold text-primary">{pkg.price}</div>
                    <span className="text-sm text-muted-foreground">{pkg.duration}</span>
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
              Ready to Transform <span className="text-primary">Your Body?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book your first personal training session today and experience the difference expert coaching makes.
            </p>
            <Button size="lg" onClick={() => setIsJoinModalOpen(true)} className="text-lg px-8 py-6">
              Book Your First Session
            </Button>
          </div>
        </section>
      </div>
      <Footer />
      <JoinNowModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </>
  );
};

export default PersonalTraining;
