import { useState } from "react";
import { Check, Users, Building2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinNowModal from "@/components/JoinNowModal";
import corporatePlanImage from "@/assets/corporate-plan.jpg";

const CorporatePlans = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const plans = [
    {
      name: "SMALL TEAM",
      employees: "5-10",
      price: "Contact",
      discount: "15%",
      features: [
        "5-10 Employee Memberships",
        "15% Discount Per Member",
        "Flexible Access Hours",
        "Monthly Progress Reports",
        "Dedicated Account Manager",
        "Free Orientation Session",
      ],
    },
    {
      name: "MEDIUM BUSINESS",
      employees: "11-25",
      price: "Contact",
      discount: "20%",
      popular: true,
      features: [
        "11-25 Employee Memberships",
        "20% Discount Per Member",
        "24/7 Access for All Members",
        "Bi-Weekly Progress Reports",
        "Priority Support",
        "Quarterly Team Challenges",
        "Free Nutritional Workshops",
        "Company Branding Options",
      ],
    },
    {
      name: "LARGE ENTERPRISE",
      employees: "26+",
      price: "Contact",
      discount: "25%+",
      features: [
        "26+ Employee Memberships",
        "25%+ Discount Per Member",
        "Full 24/7 Access",
        "Weekly Progress Reports",
        "Dedicated Corporate Liaison",
        "Monthly Team Events",
        "On-Site Health Assessments",
        "Custom Wellness Programs",
        "Guest Pass Allowance",
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
            style={{ backgroundImage: `url(${corporatePlanImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Corporate <span className="text-primary">Wellness</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Group rates and customized wellness programs for your company
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                Corporate Wellness <span className="text-primary">Benefits</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-6 text-center">
                  <Building2 className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Boost Productivity</h3>
                  <p className="text-muted-foreground">
                    Healthier employees are more productive. Reduce sick days and increase workplace morale.
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Team Building</h3>
                  <p className="text-muted-foreground">
                    Strengthen team bonds with group challenges, classes, and wellness events.
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">Attract Talent</h3>
                  <p className="text-muted-foreground">
                    Wellness benefits help attract and retain top talent in competitive markets.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                Why Companies Choose <span className="text-primary">365 Fitness</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Flexible Packages</h3>
                    <p className="text-muted-foreground">
                      Customizable plans that fit your company size, budget, and employee needs.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Premium Facilities</h3>
                    <p className="text-muted-foreground">
                      State-of-the-art equipment, multiple locations, and 24/7 access for busy professionals.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
                    <p className="text-muted-foreground">
                      A personal account manager to handle enrollment, questions, and special requests.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                    <p className="text-muted-foreground">
                      Regular reports on employee engagement and wellness metrics for your HR team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Corporate <span className="text-primary">Packages</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">Tailored solutions for every company size</p>
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
                  <h3 className="text-2xl font-bold mb-2 text-center">{plan.name}</h3>
                  <p className="text-center text-muted-foreground mb-6">{plan.employees} Employees</p>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-primary mb-2">{plan.discount}</div>
                    <span className="text-sm text-muted-foreground">Group Discount</span>
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
                    Contact Sales
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
              Invest in Your <span className="text-primary">Team's Health</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today to discuss a customized corporate wellness plan for your organization.
            </p>
            <Button size="lg" onClick={() => setIsJoinModalOpen(true)} className="text-lg px-8 py-6">
              Request Corporate Quote
            </Button>
          </div>
        </section>
      </div>
      <Footer />
      <JoinNowModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </>
  );
};

export default CorporatePlans;
