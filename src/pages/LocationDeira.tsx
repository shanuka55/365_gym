import { useState } from "react";
import { MapPin, Phone, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinNowModal from "@/components/JoinNowModal";
import deiraImage from "@/assets/deira-branch.jpg";

const LocationDeira = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const pricingPlans = [
    {
      name: "MONTHLY",
      price: "199",
      duration: "Month",
      features: [
        { name: "Free Consultation", included: true },
        { name: "Fitness Assessment", included: true },
        { name: "24 Hour Gym", included: true },
        { name: "Nutritional Plan", included: false },
        { name: "Group Classes", included: false },
        { name: "Personal Training", included: false },
        { name: "Private Lockers", included: false },
        { name: "Sauna/Steam", included: true },
      ],
      offer: [
        { name: "Get 10% off on your first month!", included: true },
      ],
    },
    {
      name: "3 MONTHS",
      price: "504",
      duration: "3 Months",
      popular: true,
      features: [
        { name: "Free Consultation", included: true },
        { name: "Fitness Assessment", included: true },
        { name: "24 Hour Gym", included: true },
        { name: "Nutritional Plan", included: true },
        { name: "Group Classes", included: false },
        { name: "Personal Training", included: false },
        { name: "Private Lockers", included: true },
        { name: "Sauna/Steam", included: true },
      ],
      offer: [
        { name: "Get one month free!", included: true },
      ],
    },
    {
      name: "6 MONTHS",
      price: "770",
      duration: "7 Months",
      features: [
        { name: "Free Consultation", included: true },
        { name: "Fitness Assessment", included: true },
        { name: "24 Hour Gym", included: true },
        { name: "Nutritional Plan", included: true },
        { name: "Group Classes", included: true },
        { name: "Personal Training", included: false },
        { name: "Private Lockers", included: true },
        { name: "Sauna/Steam", included: true },
      ],
    },
    {
      name: "12 MONTHS",
      price: "1250",
      duration: "12 Months",
      features: [
        { name: "Free Consultation", included: true },
        { name: "Fitness Assessment", included: true },
        { name: "24 Hour Gym", included: true },
        { name: "Nutritional Plan", included: true },
        { name: "Group Classes", included: true },
        { name: "Personal Training", included: true },
        { name: "Private Lockers", included: true },
        { name: "Sauna/Steam", included: true },
      ],
    },
  ];

  const services = [
    { name: "Weight Training", icon: "🏋️" },
    { name: "Personal Training", icon: "👤" },
    { name: "Group Classes", icon: "👥" },
    { name: "High Tech Gym", icon: "⚡" },
    { name: "HIIT", icon: "🔥" },
    { name: "Body Shaping", icon: "💪" },
    { name: "MMA", icon: "🥊" },
    { name: "Zumba and Yoga", icon: "🧘" },
    { name: "Karate", icon: "🥋" },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${deiraImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Deira Muraqqabat
              <span className="block text-primary mt-2">(Main Branch)</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              24/7 Access • Dubai's Largest Facility • Premium Equipment
            </p>
            <Button
              size="lg"
              onClick={() => setIsJoinModalOpen(true)}
              className="text-lg px-8 py-6"
            >
              Join This Branch
            </Button>
          </div>
        </section>

        {/* Location Info */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Address</h3>
                <p className="text-sm text-muted-foreground">
                  MZ 08, Dubai Municipality Building, Near Muraqqbat Police Station, Salah Al Din Road, Dubai
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Contact</h3>
                <a href="tel:+97143375022" className="text-sm text-primary hover:underline">
                  +971 4 337 5022
                </a>
              </Card>
              <Card className="p-6 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Hours</h3>
                <p className="text-sm text-muted-foreground">Open 24/7</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Our <span className="text-primary">Services</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {services.map((service) => (
                <Card key={service.name} className="p-4 text-center hover:border-primary transition-colors">
                  <span className="text-4xl mb-2 block">{service.icon}</span>
                  <p className="text-sm font-medium">{service.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Branch Gallery */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              Branch <span className="text-primary">Gallery</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={deiraImage}
                  alt="Deira Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={deiraImage}
                  alt="Deira Branch Equipment"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={deiraImage}
                  alt="Deira Branch Facilities"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                Why Choose <span className="text-primary">Deira Branch</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Extreme Fitness</h3>
                  <p className="text-muted-foreground">
                    Push beyond your limits at our EXTREME FITNESS zone – built for serious lifters and high-intensity training enthusiasts.
                    From heavy-duty strength equipment to HIIT setups, this area is designed for those who train hard and never settle.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Personal Training</h3>
                  <p className="text-muted-foreground">
                    Achieve faster, smarter, and safer results with our Personal Training programs. Our certified personal trainers work closely
                    with you to create custom workout plans, track your progress, and keep you motivated every step of the way.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Body Shaping</h3>
                  <p className="text-muted-foreground">
                    Sculpt your dream physique with our Body Shaping programs. Whether you're aiming to tone muscles, lose fat, or build definition –
                    our certified trainers and custom workout plans are here to guide your transformation.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Weight Loss Classes</h3>
                  <p className="text-muted-foreground">
                    Balance your body and mind with our Yoga sessions, designed to improve flexibility, reduce stress, and promote inner peace.
                    Want something more energetic? Join our Zumba classes for a fun, high-energy cardio workout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Pricing Plans & <span className="text-primary">Memberships</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12">Choose the perfect plan for your fitness journey</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`p-6 relative ${plan.popular ? "border-primary border-2" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                      POPULAR
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-4 text-center">{plan.name}</h3>
                  <div className="text-center mb-6">
                    <span className="text-sm text-muted-foreground">AED</span>
                    <div className="text-5xl font-bold text-primary">{plan.price}</div>
                    <span className="text-sm text-muted-foreground">/{plan.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-start gap-2 text-sm">
                        <Check
                          className={`h-5 w-5 flex-shrink-0 mt-0.5 ${feature.included ? "text-primary" : "text-muted-foreground opacity-30"
                            }`}
                        />
                        <span className={feature.included ? "" : "text-muted-foreground line-through"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => setIsJoinModalOpen(true)}
                  >
                    Join Now
                  </Button>
                  {/* // Display offer if available */}
                  {plan.offer && plan.offer.length > 0 && (
                    <div className="mt-4 text-center text-sm text-green-600 font-medium">
                      {plan.offer.map((offer) => (
                        <div key={offer.name}>{offer.name}</div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your <span className="text-primary">Fitness Journey?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join Dubai's largest fitness facility today and experience world-class equipment, expert trainers, and 24/7 access.
            </p>
            <Button size="lg" onClick={() => setIsJoinModalOpen(true)} className="text-lg px-8 py-6">
              Join Deira Branch Now
            </Button>
          </div>
        </section>
      </div>
      <Footer />
      <JoinNowModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </>
  );
};

export default LocationDeira;
