import { useState } from "react";
import { Check, Calendar, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinNowModal from "@/components/JoinNowModal";
import monthlyPlanImage from "@/assets/monthly-plan.jpg";

const MonthlyPlans = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const plans = [
    {
      name: "BASIC MONTHLY",
      price: "299",
      features: [
        "24/7 Gym Access",
        "Cardio Equipment",
        "Weight Training Area",
        "Locker Facilities",
        "Free Wi-Fi",
      ],
      status: "Offer Closed",
    },
    {
      name: "STANDARD MONTHLY",
      price: "449",
      popular: true,
      features: [
        "All Basic Features",
        "Group Classes Access",
        "Sauna & Steam Room",
        "Private Lockers",
        "Nutritional Guidance",
        "Free Consultation",
      ],
    },
    {
      name: "PREMIUM MONTHLY",
      price: "699",
      features: [
        "All Standard Features",
        "Personal Training (2 Sessions)",
        "Priority Class Booking",
        "Towel Service",
        "Guest Pass (1/month)",
        "Body Composition Analysis",
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
            style={{ backgroundImage: `url(${monthlyPlanImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Monthly <span className="text-primary">Plans</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Flexible month-to-month membership with no long-term commitment
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                Why Choose <span className="text-primary">Monthly Plans?</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">No Commitment</h3>
                  <p className="text-muted-foreground">
                    Cancel anytime with no penalties. Perfect for trying out our facilities.
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Instant Access</h3>
                  <p className="text-muted-foreground">
                    Start your fitness journey immediately with full facility access.
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Check className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">All Inclusive</h3>
                  <p className="text-muted-foreground">
                    Access to all equipment, classes, and facilities included.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Choose Your <span className="text-primary">Monthly Plan</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">All prices in AED per month</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`p-8 relative ${plan.popular ? "border-primary border-2 scale-105" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background px-6 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-6 text-center">{plan.name}</h3>
                  <div className="text-center mb-8">
                    <span className="text-sm text-muted-foreground">AED</span>
                    <div className="text-6xl font-bold text-primary">{plan.price}</div>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => setIsJoinModalOpen(true)}
                  >
                    Join Now
                  </Button>
                  <h3 className="text-center text-red-500 font-bold mb-8">{plan.status}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get <span className="text-primary">Started?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join 365 Fitness today with our flexible monthly plans. No commitment required!
            </p>
            <Button size="lg" onClick={() => setIsJoinModalOpen(true)} className="text-lg px-8 py-6">
              Start Your Month Now
            </Button>
          </div>
        </section>
      </div>
      <Footer />
      <JoinNowModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </>
  );
};

export default MonthlyPlans;
