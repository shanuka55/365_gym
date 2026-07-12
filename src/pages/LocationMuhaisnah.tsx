import { useState } from "react";
import { MapPin, Phone, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinNowModal from "@/components/JoinNowModal";
import TrainingRates from "@/components/TrainingRates";
import PageSeo from "@/components/PageSeo";
import main_image2 from "@/assets/muhasniah-branch.jpg";
import m_image1 from "@/assets/IMG_Muhasnah_01.jpg";
import m_image2 from "@/assets/IMG_Muhasnah_02.jpg";
import m_image3 from "@/assets/IMG_Muhasnah_03.jpg";
import m_image4 from "@/assets/IMG_Muhasnah_04.jpg";
import m_image5 from "@/assets/IMG_Muhasnah_05.jpg";
import m_image6 from "@/assets/IMG_Muhasnah_06.jpg";
import m_image7 from "@/assets/IMG_Muhasnah_07.jpg";
import m_image8 from "@/assets/IMG_Muhasnah_08.jpg";
import m_image9 from "@/assets/IMG_Muhasnah_09.jpg";
import m_image10 from "@/assets/IMG_Muhasnah_10.jpg";
import m_image11 from "@/assets/IMG_Muhasnah_11.jpg";
import m_image12 from "@/assets/IMG_Muhasnah_12.jpg";

import img_01 from "@/assets/365 FITNESS GYM MUHASNAH 01.jpg";
import img_02 from "@/assets/365 FITNESS GYM MUHASNAH 02.jpg";
import img_03 from "@/assets/365 FITNESS GYM MUHASNAH 03.jpg";
import img_04 from "@/assets/365 FITNESS GYM MUHASNAH 04.jpg";
import img_05 from "@/assets/365 FITNESS GYM MUHASNAH 05.jpg";
import img_06 from "@/assets/365 FITNESS GYM MUHASNAH 06.jpg";
import img_07 from "@/assets/365 FITNESS GYM MUHASNAH 07.jpg";
import img_08 from "@/assets/365 FITNESS GYM MUHASNAH 08.jpg";
import img_09 from "@/assets/365 FITNESS GYM MUHASNAH 09.jpg";
import img_10 from "@/assets/365 FITNESS GYM MUHASNAH 10.jpg";
import img_11 from "@/assets/365 FITNESS GYM MUHASNAH 11.jpg";
import img_12 from "@/assets/365 FITNESS GYM MUHASNAH 12.jpg";

const muhaisnahFaqs = [
  {
    question: "Is your gym open 24 hours?",
    answer: "Yes, 365 Fitness Muhaisnah First is open 24/7, giving members flexible access day and night.",
  },
  {
    question: "Do you have a ladies-only section?",
    answer: "Yes, our Muhaisnah gym includes a ladies separate area for comfortable and focused training.",
  },
  {
    question: "Do you offer personal training?",
    answer: "Yes, certified personal trainers are available for weight loss, strength training, body shaping, MMA, and fitness transformation programs.",
  },
  {
    question: "Is parking available?",
    answer: "Parking is available around the Muhaisnah First, Madinat Badr location for members and visitors.",
  },
  {
    question: "How much is membership?",
    answer: "Muhaisnah membership packages start from AED 449 monthly, with 3-month, 6-month, and annual options available.",
  },
];

const muhaisnahFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: muhaisnahFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};


const LocationMuhaisnah = () => {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const pricingPlans = [
    {
      name: "MONTHLY",
      price: "449",
      duration: "Month",
      features: [
        { name: "Free Consultation", included: true },
        { name: "Fitness Assessment", included: true },
        { name: "24 Hour Gym", included: true },
        { name: "Nutritional Plan", included: false },
        { name: "Group Classes", included: false },
        { name: "Personal Training", included: false },
        { name: "Private Lockers", included: true },
        { name: "Sauna/Steam", included: true },
      ],
    },
    {
      name: "3 MONTHS",
      price: "1499",
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
        { name: "Offer : 1200AED", included: true },
      ],

    },
    {
      name: "6 MONTHS",
      price: "2199",
      duration: "6 Months",
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
      offer: [
        { name: "Offer : 1800AED", included: true },
      ],

    },
    {
      name: "12 MONTHS",
      price: "3499",
      duration: "1 Year",
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
      offer: [
        { name: "Offer : 2499AED", included: true },
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
      <PageSeo
        title="Best Gym in Muhaisnah | 24/7 Fitness Center | 365 Fitness"
        description="Join the best 24/7 gym in Muhaisnah, Dubai. Personal training, ladies section, group classes, CrossFit, MMA, boxing and affordable membership packages."
        canonical="https://www.365fitness.ae/locations/muhaisnah-first"
        schema={muhaisnahFaqSchema}
      />
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${m_image6})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Best Gym in Muhaisnah, Dubai
              <span className="block text-primary mt-2">Ladies Separate Area</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              24/7 fitness center in Muhaisnah First with personal training, ladies gym facilities, group classes, CrossFit, MMA, boxing, and affordable membership packages.
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
                  6CP7+R99 - Muhaisnah First - Muhaisnah - Dubai
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Contact</h3>
                <a href="tel:+971547120927" className="text-sm text-primary hover:underline">
                  +971 54 712 0927
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
                  src={img_01}
                  alt="Muhaisnah Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={img_02}
                  alt="Muhaisnah Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={img_03}
                  alt="Muhaisnah Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={img_04}
                  alt="Muhaisnah Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={img_05}
                  alt="Muhaisnah Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={img_06}
                  alt="Muhaisnah Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={img_07}
                  alt="Muhaisnah Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={img_08}
                  alt="Muhaisnah Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={img_09}
                  alt="Muhaisnah Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={img_10}
                  alt="Muhaisnah Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image1}
                  alt="Muhaisnah Branch Interior"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image2}
                  alt="Muhaisnah Branch Equipment"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image3}
                  alt="Muhaisnah Branch Facilities"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image4}
                  alt="Muhaisnah Branch Facilities"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image5}
                  alt="Muhaisnah Branch Facilities"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image6}
                  alt="Muhaisnah Branch Facilities"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image7}
                  alt="Muhaisnah Branch Facilities"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image8}
                  alt="Muhaisnah Branch Facilities"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image9}
                  alt="Muhaisnah Branch Facilities"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image10}
                  alt="Muhaisnah Branch Facilities"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image11}
                  alt="Muhaisnah Branch Facilities"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={m_image12}
                  alt="Muhaisnah Branch Facilities"
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
              <h2 className="text-4xl font-bold text-center mb-8">
                Why Choose <span className="text-primary">365 Fitness Muhaisnah</span>
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                Looking for the best gym in Muhaisnah? 365 Fitness Muhaisnah is a premium 24-hour fitness center in Muhaisnah 1, conveniently located near Madinat Badr, Al Khawaneej, Al Qusais, Mizhar, and Muhaisnah 4. We offer state-of-the-art gym equipment, certified personal trainers, ladies-only workout facilities, group fitness classes, and affordable membership plans designed to help you achieve your fitness goals.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">About</h3>
                  <p className="text-muted-foreground">
                    At 365 Fitness Muhaisnah, we believe fitness should be accessible to everyone. Our spacious gym features modern strength machines, free weights, cardio equipment, functional training zones, stretching areas, and recovery facilities. Whether your goal is weight loss, bodybuilding, muscle gain, or improving your overall health, our experienced team provides the support and motivation you need every step of the way.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Personal Training</h3>
                  <p className="text-muted-foreground">
                    Achieve better results with our professional personal trainers in Muhaisnah. We develop personalized workout programs tailored to your body type, fitness level, and objectives. From fat loss and strength training to muscle building and athletic performance, our trainers monitor your progress, improve your technique, and keep you motivated throughout your fitness journey.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Ladies Gym</h3>
                  <p className="text-muted-foreground">
                    Our dedicated ladies gym in Muhaisnah offers a safe, comfortable, and private workout environment exclusively for women. With customized body transformation programs, strength training, weight management plans, and experienced female trainers, we help women build confidence while reaching their health and fitness goals.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Group Classes</h3>
                  <p className="text-muted-foreground">
                    Join our energetic fitness classes in Muhaisnah, including Yoga, Zumba, HIIT, Functional Training, Aerobics, and strength-based group workouts. Our classes are designed to improve flexibility, burn calories, boost endurance, and keep you motivated through fun and engaging sessions suitable for all fitness levels.
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


                  {/* Display offer only if exists AND has items */}
                  {Array.isArray(plan.offer) && plan.offer.length > 0 && (
                    <div className="mt-6 text-center text-2xl font-bold font-medium">
                      {plan.offer.map((offer) => (
                        <div
                          key={offer.name}
                          className={offer.included ? "text-xl font-bold text-primary" : "text-muted-foreground line-through opacity-50"}
                        >
                          {offer.name}
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
            <TrainingRates branchName="Muhaisnah First Branch" branch="muhaisnah" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your <span className="text-primary">Fitness Journey?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our premium Muhaisnah facility today and experience expert trainers, top-tier equipment, and 24/7 access.
            </p>
            <Button size="lg" onClick={() => setIsJoinModalOpen(true)} className="text-lg px-8 py-6">
              Join Muhaisnah Branch Now
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                Muhaisnah Gym <span className="text-primary">FAQ</span>
              </h2>
              <Accordion
                type="single"
                collapsible
                defaultValue="item-0"
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                {muhaisnahFaqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`item-${index}`}
                    className="border-border px-5 md:px-7 last:border-b-0"
                  >
                    <AccordionTrigger className="text-left text-base md:text-lg font-bold text-foreground hover:text-primary hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <JoinNowModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </>
  );
};

export default LocationMuhaisnah;

