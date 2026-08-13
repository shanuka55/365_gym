import { MapPin, Phone, Clock, Check, MessageCircle, Navigation, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrainingRates from "@/components/TrainingRates";
import PageSeo from "@/components/PageSeo";
import useBranchCtaTracking from "@/hooks/useBranchCtaTracking";
import BranchReviews from "@/components/BranchReviews";
import deiraImage from "@/assets/365_fitness_gym_cover_image.webp";
import img_1 from "@/assets/IMG_Deira_01.webp";
import img_2 from "@/assets/IMG_Deira_02.webp";
import img_3 from "@/assets/IMG_Deira_03.webp";
import img_4 from "@/assets/IMG_Deira_04.webp";
import img_5 from "@/assets/IMG_Deira_05.webp";
import img_6 from "@/assets/IMG_Deira_06.webp";
import img_7 from "@/assets/deira-branch.webp";

const deiraGoogleProfileUrl = "https://share.google/8ArVq05n3QaSpmVIc";
const deiraWhatsAppNumber = "971547120925";
const deiraCanonical = "https://www.365fitness.ae/locations/deira-muraqqabat";
const deiraTitle = "24/7 Gym in Deira, Al Muraqqabat | 365 Fitness";
const deiraDescription = "Train 24/7 at 365 Fitness in Al Muraqqabat, Deira. Premium equipment, personal training, group classes, MMA, boxing and flexible memberships. Contact us today.";

const getDeiraWhatsAppUrl = (message: string) =>
  `https://wa.me/${deiraWhatsAppNumber}?text=${encodeURIComponent(message)}`;

const deiraFaqs = [
  {
    question: "Is 365 Fitness Deira open 24 hours?",
    answer: "Yes, 365 Fitness Deira Muraqqabat is open 24/7 for flexible training at any time.",
  },
  {
    question: "Where is 365 Fitness Deira located?",
    answer: "The gym is at MZ 08, Dubai Municipality Building, near Muraqqabat Police Station on Salah Al Din Road, Al Muraqqabat, Dubai.",
  },
  {
    question: "Do you offer personal training in Deira?",
    answer: "Yes, our Deira branch offers personal training for weight loss, muscle building, boxing, MMA, strength, and body transformation.",
  },
  {
    question: "What group classes are available?",
    answer: "The Deira branch offers guided classes including Yoga, Zumba, HIIT, functional training and aerobics. Contact the branch for the current timetable.",
  },
  {
    question: "Is parking available?",
    answer: "Parking options are available around the Deira Muraqqabat branch near Salah Al Din Road and Muraqqabat Police Station.",
  },
  {
    question: "What membership offers are currently available?",
    answer: "The confirmed Deira offer is 6 months plus 2 months free for AED 770. Tabby and Tamara are accepted, and FAZAA Card holders can receive 30% off. Terms and conditions apply.",
  },
];

const deiraSeoSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: deiraFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "ExerciseGym",
      "@id": `${deiraCanonical}#gym`,
      name: "365 Fitness Deira Muraqqabat",
      url: deiraCanonical,
      hasMap: deiraGoogleProfileUrl,
      telephone: "+971547120925",
      address: {
        "@type": "PostalAddress",
        streetAddress: "MZ 08, Dubai Municipality Building, Near Muraqqabat Police Station, Salah Al Din Road, Al Muraqqabat",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      openingHours: "Mo-Su 00:00-23:59",
      priceRange: "AED",
    },
  ],
};

const deiraGalleryImages = [
  { src: deiraImage, alt: "Deira Branch Interior" },
  { src: img_7, alt: "Deira Branch Interior" },
  { src: img_1, alt: "Deira Branch Equipment" },
  { src: img_2, alt: "Deira Branch Facilities" },
  { src: img_3, alt: "Deira Branch Facilities" },
  { src: img_4, alt: "Deira Branch Facilities" },
  { src: img_5, alt: "Deira Branch Facilities" },
  { src: img_6, alt: "Deira Branch Facilities" },
];

const LocationDeira = () => {
  useBranchCtaTracking({
    branch: "deira",
    phone: deiraWhatsAppNumber,
    mapUrl: deiraGoogleProfileUrl,
  });

  const pricingPlans = [
    {
      name: "MONTHLY",
      price: "180",
      duration: "Month",
      paymentUrl: "https://buy.stripe.com/4gM8wP16Lcp2axN0zlaR21g",
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
      duration: "3 Months + 1 Free",
      paymentUrl: "https://buy.stripe.com/3cI9ATdTxbkYdJZ95RaR21h",
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
        { name: "Get 1 month free!", included: true },
      ],
    },
    {
      name: "6 MONTHS",
      price: "770",
      duration: "6 Months + 2 Free",
      paymentUrl: "https://buy.stripe.com/aFa28reXBcp2dJZ5TFaR21i",
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
        { name: "+2 Months FREE", included: true },
      ],
    },
    {
      name: "12 MONTHS",
      price: "1250",
      duration: "12 Months + 3 Free",
      paymentUrl: "https://buy.stripe.com/9B66oH8zdagUbBRbdZaR21j",
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
        { name: "Get 3 months free!", included: true },
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
        title={deiraTitle}
        description={deiraDescription}
        canonical={deiraCanonical}
        schema={deiraSeoSchema}
      />
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[90vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${deiraImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6">
              24/7 Gym in Deira
              <span className="block text-primary mt-2">– Al Muraqqabat</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Train at 365 Fitness, a 24/7 gym in Deira located in Al Muraqqabat near Muraqqabat Police Station and Salah Al Din Road. Enjoy premium strength and cardio equipment, personal training, group classes, MMA, boxing and more.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
            <Button size="lg" asChild className="w-full sm:w-auto text-base sm:text-lg px-6 py-6">
              <a
                href={getDeiraWhatsAppUrl("Hi 365 Fitness Deira! I'd like to join this branch.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Now
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base sm:text-lg px-6 py-6">
              <a href="tel:+971547120925"><Phone className="mr-2 h-5 w-5" />Call Now</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base sm:text-lg px-6 py-6">
              <a href={deiraGoogleProfileUrl} target="_blank" rel="noopener noreferrer"><Navigation className="mr-2 h-5 w-5" />Get Directions</a>
            </Button>
            </div>
          </div>
        </section>

        {/* Location Info */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 text-center">
                <a href={deiraGoogleProfileUrl} target="_blank" rel="noopener noreferrer" className="block group/location">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Address</h3>
                <p className="text-sm text-muted-foreground group-hover/location:text-primary transition-colors">
                  MZ 08, Dubai Municipality Building, Near Muraqqabat Police Station, Salah Al Din Road, Al Muraqqabat, Dubai
                </p>
                </a>
              </Card>
              <Card className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Contact</h3>
                <a
                  href={getDeiraWhatsAppUrl("Hi 365 Fitness Deira! I'd like to know more about your memberships.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  WhatsApp: +971 54 712 0925
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
              {deiraGalleryImages.map((image) => (
                <div key={image.src} className="aspect-video rounded-xl overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="640"
                    height="360"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-8">
                Why Choose <span className="text-primary">365 Fitness Gym in Deira?</span>
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                Located in Al Muraqqabat, 365 Fitness offers 24/7 access, premium equipment, certified trainers and spacious workout zones. The branch is convenient for members travelling from Rigga, Salah Al Din, Port Saeed and Union.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">About</h3>
                  <p className="text-muted-foreground">
                    Welcome to 365 Fitness Deira, your destination for professional fitness training in the heart of Dubai. Our EXTREME FITNESS zone is built for serious athletes, bodybuilders, and fitness enthusiasts who want to push beyond their limits. Train with commercial-grade strength equipment, Olympic free weights, functional training stations, and dedicated cardio areas in a clean, modern, and motivating environment. Whether you're a beginner or an experienced lifter, you'll find the perfect space to reach your fitness goals.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Personal Training in Deira</h3>
                  <p className="text-muted-foreground">
                    Transform your body with our certified personal trainers in Deira. Every member receives a customized workout program based on their fitness level, body composition, and goals. Our trainers focus on proper exercise techniques, progressive training methods, fat loss strategies, muscle building, nutrition guidance, and continuous progress tracking to help you achieve faster and safer results.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Ladies Gym</h3>
                  <p className="text-muted-foreground">
                    Our team supports women with goal-focused fitness programs, strength training, weight management, and body transformation guidance in a professional and respectful gym environment.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Group Fitness Classes in Al Muraqqabat</h3>
                  <p className="text-muted-foreground">
                    Stay motivated with exciting group fitness classes in Deira, including Yoga, Zumba, HIIT, Functional Training, Aerobics, and more. Our professionally guided classes improve cardiovascular health, flexibility, endurance, and overall fitness while creating an energetic and supportive community atmosphere.
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
              Gym Memberships <span className="text-primary">in Deira</span>
            </h2>
            <p className="text-center text-muted-foreground mb-5">Choose the perfect plan for your fitness journey</p>
            <div className="relative mx-auto mb-12 flex min-h-[90px] max-w-6xl items-center rounded-2xl border-2 border-primary bg-primary/10 px-16 py-6 text-center shadow-lg shadow-primary/10">
              <Clock className="absolute left-10 h-7 w-7 text-primary" />
              <p className="w-full text-xl font-black uppercase tracking-wide text-foreground md:text-2xl">
                Limited-time Offer valid until September 2026
              </p>
            </div>
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
                  {Array.isArray(plan.offer) && plan.offer.length > 0 && (
                    <div className="mb-4 min-h-14 text-center">
                      {plan.offer.map((offer) => (
                        <div
                          key={offer.name}
                          className={offer.included ? "text-xl font-bold text-primary" : "text-muted-foreground line-through opacity-80"}
                        >
                          {offer.name}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <span className="text-sm text-muted-foreground">AED</span>
                    <div className="text-5xl font-bold text-primary">{plan.price}</div>
                    <div className="text-xs font-semibold text-foreground">+ 5% VAT at checkout</div>
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
                  <div className="space-y-3">
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                      <a
                        href={getDeiraWhatsAppUrl(`Hi 365 Fitness Deira! I'm interested in the ${plan.name} membership plan.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp Inquiry
                      </a>
                    </Button>
                    <Button className="payment-button w-full" asChild>
                      <a href={plan.paymentUrl} target="_blank" rel="noopener noreferrer">
                        <span>Pay Online</span>
                        <ArrowUpRight className="payment-button__icon" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <TrainingRates
              branchName="Deira Muraqqabat Branch"
              branch="deira"
              whatsappNumber={deiraWhatsAppNumber}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your <span className="text-primary">Fitness Journey?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Train on your schedule with 24/7 access, premium equipment, group classes and experienced trainers in Al Muraqqabat.
            </p>
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <a
                href={getDeiraWhatsAppUrl("Hi 365 Fitness Deira! I'd like to join the Deira branch.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Deira Branch Now
              </a>
            </Button>
          </div>
        </section>

        <BranchReviews branch="deira" />

        {/* FAQ */}
        <section className="py-16 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12">
                Deira Gym <span className="text-primary">FAQ</span>
              </h2>
              <Accordion
                type="single"
                collapsible
                defaultValue="item-0"
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                {deiraFaqs.map((faq, index) => (
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
      <Footer branch="deira" />
      <a
        href={getDeiraWhatsAppUrl("Hi 365 Fitness Deira! I'd like to know more about membership options.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-glow-lg hover:shadow-glow animate-pulse-glow transition-all duration-300 hover:scale-110 group"
        aria-label="Contact 365 Fitness Deira on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
      </a>
    </>
  );
};

export default LocationDeira;


