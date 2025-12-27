import { useState } from "react";
import { Check, TrendingDown, Gift, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinNowModal from "@/components/JoinNowModal";
import annualPlanImage from "@/assets/annual-plan.jpg";

const AnnualPlans = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const plans = [
    {
      name: "BASIC ANNUAL",
      price: "2,999",
      monthlyEquivalent: "250",
      savings: "588",
      features: [
        "24/7 Gym Access",
        "All Cardio & Weight Equipment",
        "Locker Facilities",
        "Free Wi-Fi",
        "2 Guest Passes Per Year",
        "1 Month Free (12 for price of 11)",
      ],
    },
    {
      name: "STANDARD ANNUAL",
      price: "4,499",
      monthlyEquivalent: "375",
      savings: "888",
      popular: true,
      features: [
        "All Basic Features",
        "Unlimited Group Classes",
        "Sauna & Steam Room",
        "Private Lockers",
        "Monthly Nutrition Consultation",
        "4 Guest Passes Per Year",
        "Free Gym Bag",
        "2 Months Free",
      ],
    },
    {
      name: "PREMIUM ANNUAL",
      price: "6,999",
      monthlyEquivalent: "583",
      savings: "1,389",
      features: [
        "All Standard Features",
        "Personal Training (24 Sessions/Year)",
        "Priority Class Booking",
        "Towel Service",
        "Unlimited Guest Passes",
        "Quarterly Body Composition Analysis",
        "Free Branded Apparel",
        "3 Months Free",
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
            style={{ backgroundImage: `url(${annualPlanImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Annual <span className="text-primary">Plans</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Maximize savings with our best-value yearly memberships
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                Annual Plan <span className="text-primary">Benefits</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-6 text-center">
                  <TrendingDown className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Huge Savings</h3>
                  <p className="text-muted-foreground">
                    Save up to AED 1,389 compared to monthly payments. Best value guaranteed!
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Gift className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Bonus Months</h3>
                  <p className="text-muted-foreground">
                    Get up to 3 months FREE when you commit to a full year. More value, more results!
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Premium Perks</h3>
                  <p className="text-muted-foreground">
                    Exclusive benefits like free gear, guest passes, and priority access included.
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
              Choose Your <span className="text-primary">Annual Plan</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">One payment, 12 months of unlimited fitness</p>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`p-8 relative ${plan.popular ? "border-primary border-2 scale-105" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background px-6 py-1 rounded-full text-sm font-bold">
                      BEST VALUE
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-6 text-center">{plan.name}</h3>
                  <div className="text-center mb-4">
                    <span className="text-sm text-muted-foreground">AED</span>
                    <div className="text-6xl font-bold text-primary">{plan.price}</div>
                    <span className="text-sm text-muted-foreground">/year</span>
                  </div>
                  <div className="text-center mb-6 p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Only AED {plan.monthlyEquivalent}/month</p>
                    <p className="text-primary font-bold">Save AED {plan.savings}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
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
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Commit to Your <span className="text-primary">Transformation</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Save big and stay committed with our annual plans. The best investment in your health!
            </p>
            <Button size="lg" onClick={() => setIsJoinModalOpen(true)} className="text-lg px-8 py-6">
              Lock In Your Annual Rate
            </Button>
          </div>
        </section>
      </div>
      <Footer />
      <JoinNowModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </>
  );
};

export default AnnualPlans;
