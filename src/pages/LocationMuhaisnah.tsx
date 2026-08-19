import {
  MapPin,
  Phone,
  Clock,
  Check,
  MessageCircle,
  Navigation,
  ArrowUpRight,
  Wifi,
  Flame,
  CloudFog,
  LockKeyhole,
  UserRound,
  UsersRound,
  CircleDotDashed,
  Goal,
  Crown,
  ScanLine,
  CircleParking,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrainingRates from "@/components/TrainingRates";
import PageSeo from "@/components/PageSeo";
import BranchReviews from "@/components/BranchReviews";
import useBranchCtaTracking from "@/hooks/useBranchCtaTracking";
import { useMembershipPrices } from "@/hooks/useMembershipPrices";
import { formatMembershipPrice, type MuhaisnahPlanSlug } from "@/lib/muhaisnahPlans";
import m_image1 from "@/assets/IMG_Muhasnah_01.webp";
import m_image2 from "@/assets/IMG_Muhasnah_02.webp";
import m_image3 from "@/assets/IMG_Muhasnah_03.webp";
import m_image4 from "@/assets/IMG_Muhasnah_04.webp";
import m_image5 from "@/assets/IMG_Muhasnah_05.webp";
import m_image6 from "@/assets/IMG_Muhasnah_06.webp";
import m_image7 from "@/assets/IMG_Muhasnah_07.webp";
import m_image8 from "@/assets/IMG_Muhasnah_08.webp";
import m_image9 from "@/assets/IMG_Muhasnah_09.webp";
import m_image10 from "@/assets/IMG_Muhasnah_10.webp";
import m_image11 from "@/assets/IMG_Muhasnah_11.webp";
import m_image12 from "@/assets/IMG_Muhasnah_12.webp";

import img_01 from "@/assets/365 FITNESS GYM MUHASNAH 01.webp";
import img_02 from "@/assets/365 FITNESS GYM MUHASNAH 02.webp";
import img_03 from "@/assets/365 FITNESS GYM MUHASNAH 03.webp";
import img_04 from "@/assets/365 FITNESS GYM MUHASNAH 04.webp";
import img_05 from "@/assets/365 FITNESS GYM MUHASNAH 05.webp";
import img_06 from "@/assets/365 FITNESS GYM MUHASNAH 06.webp";
import img_07 from "@/assets/365 FITNESS GYM MUHASNAH 07.webp";
import img_08 from "@/assets/365 FITNESS GYM MUHASNAH 08.webp";
import img_09 from "@/assets/365 FITNESS GYM MUHASNAH 09.webp";
import img_10 from "@/assets/365 FITNESS GYM MUHASNAH 10.webp";
import img_11 from "@/assets/365 FITNESS GYM MUHASNAH 11.webp";
import img_12 from "@/assets/365 FITNESS GYM MUHASNAH 12.webp";

const muhaisnahGoogleProfileUrl = "https://share.google/p80UREIg1DLHQRqO7";
const muhaisnahWhatsAppNumber = "971547120927";
const muhaisnahCanonical = "https://www.365fitness.ae/locations/muhaisnah-first";
const muhaisnahTitle = "24/7 Gym in Muhaisnah First, Dubai | 365 Fitness";
const muhaisnahDescription = "Train 24/7 at 365 Fitness Muhaisnah First, Madinat Badr. Ladies separate area, personal training, group classes, MMA, boxing and flexible memberships.";

const getMuhaisnahWhatsAppUrl = (message: string) =>
  `https://wa.me/${muhaisnahWhatsAppNumber}?text=${encodeURIComponent(message)}`;

const muhaisnahFaqs = [
  {
    question: "Is 365 Fitness Muhaisnah First open 24 hours?",
    answer: "Yes, 365 Fitness Muhaisnah First is open 24/7, giving members flexible access day and night.",
  },
  {
    question: "Does the Muhaisnah gym have a ladies separate area?",
    answer: "Yes, our Muhaisnah gym includes a ladies separate area for comfortable and focused training.",
  },
  {
    question: "Do you offer personal training in Muhaisnah?",
    answer: "Yes, certified personal trainers are available for weight loss, strength training, body shaping, MMA, and fitness transformation programs.",
  },
  {
    question: "Is parking available?",
    answer: "Parking is available around the Muhaisnah First, Madinat Badr location for members and visitors.",
  },
  {
    question: "What membership offers are currently available?",
    answer: "The confirmed annual promotion is 12 months plus 1 month free for AED 2499. Terms and conditions apply. See the membership section or WhatsApp the Muhaisnah team for current rates on other packages.",
  },
];

const muhaisnahSeoSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: muhaisnahFaqs.map((faq) => ({
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
      "@id": `${muhaisnahCanonical}#gym`,
      name: "365 Fitness Muhaisnah First",
      url: muhaisnahCanonical,
      hasMap: muhaisnahGoogleProfileUrl,
      telephone: "+971547120927",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shop Number 32, Madinat Badr, Muhaisnah First",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      openingHours: "Mo-Su 00:00-23:59",
      priceRange: "AED",
    },
  ],
};

const muhaisnahGalleryImages = [
  { src: img_01, alt: "Muhaisnah Branch Interior" },
  { src: img_02, alt: "Muhaisnah Branch Interior" },
  { src: img_03, alt: "Muhaisnah Branch Interior" },
  { src: img_04, alt: "Muhaisnah Branch Interior" },
  { src: img_05, alt: "Muhaisnah Branch Interior" },
  { src: img_06, alt: "Muhaisnah Branch Interior" },
  { src: img_07, alt: "Muhaisnah Branch Interior" },
  { src: img_08, alt: "Muhaisnah Branch Interior" },
  { src: img_09, alt: "Muhaisnah Branch Interior" },
  { src: img_10, alt: "Muhaisnah Branch Interior" },
  { src: m_image1, alt: "Muhaisnah Branch Interior" },
  { src: m_image2, alt: "Muhaisnah Branch Equipment" },
  { src: m_image3, alt: "Muhaisnah Branch Facilities" },
  { src: m_image4, alt: "Muhaisnah Branch Facilities" },
  { src: m_image5, alt: "Muhaisnah Branch Facilities" },
  { src: m_image6, alt: "Muhaisnah Branch Facilities" },
  { src: m_image7, alt: "Muhaisnah Branch Facilities" },
  { src: m_image8, alt: "Muhaisnah Branch Facilities" },
  { src: m_image9, alt: "Muhaisnah Branch Facilities" },
  { src: m_image10, alt: "Muhaisnah Branch Facilities" },
  { src: m_image11, alt: "Muhaisnah Branch Facilities" },
  { src: m_image12, alt: "Muhaisnah Branch Facilities" },
];

const muhaisnahFacilities = [
  { name: "Free High-Speed Wi-Fi", icon: Wifi },
  { name: "Sauna", icon: Flame },
  { name: "Steam Room", icon: CloudFog },
  { name: "Lockers & Showers", icon: LockKeyhole },
  { name: "Ladies-Only Section", icon: UserRound },
  { name: "Separate Male & Female Washrooms", icon: UsersRound },
  { name: "Pool Table", icon: CircleDotDashed },
  { name: "Foosball", icon: Goal },
  { name: "Chess & More", icon: Crown },
  { name: "Body Composition Analyzer", icon: ScanLine },
  { name: "Free Parking", icon: CircleParking },
];


const LocationMuhaisnah = () => {
  useBranchCtaTracking({
    branch: "muhaisnah",
    phone: muhaisnahWhatsAppNumber,
    mapUrl: muhaisnahGoogleProfileUrl,
  });
  const { prices: stripePrices, loading: pricesLoading, error: pricesError } = useMembershipPrices();
  const embeddedCheckoutEnabled = import.meta.env.NEXT_PUBLIC_EMBEDDED_CHECKOUT_ENABLED === "true";

  const pricingPlans = [
    {
      name: "MONTHLY",
      slug: "monthly" as MuhaisnahPlanSlug,
      regularPrice: "449",
      duration: "Month",
      paymentUrl: "https://buy.stripe.com/cNi4gz4iXfBeeO36XJaR21c",
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
      slug: "3-months" as MuhaisnahPlanSlug,
      regularPrice: "1499",
      duration: "3 Months",
      paymentUrl: "https://buy.stripe.com/bJebJ18zd4WAbBRa9VaR21d",
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
    },
    {
      name: "6 MONTHS",
      slug: "6-months" as MuhaisnahPlanSlug,
      regularPrice: "2199",
      duration: "6 Months",
      paymentUrl: "https://buy.stripe.com/9B6fZhaHlcp249pci3aR21e",
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
      slug: "12-months" as MuhaisnahPlanSlug,
      regularPrice: "3499",
      duration: "1 Year",
      paymentUrl: "https://buy.stripe.com/6oUaEX5n19cQ0Xd2HtaR21f",
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
  ];

  const familyFriendsPlans = [
    { name: "MONTHLY", price: "399", duration: "Month" },
    { name: "3 MONTHS", price: "1099", duration: "3 Months", popular: true },
    { name: "6 MONTHS", price: "1599", duration: "6 Months" },
    { name: "12 MONTHS", price: "2299", duration: "1 Year" },
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
        title={muhaisnahTitle}
        description={muhaisnahDescription}
        canonical={muhaisnahCanonical}
        schema={muhaisnahSeoSchema}
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
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6">
              24/7 Gym in Muhaisnah First, Dubai
              <span className="block text-primary mt-2">Ladies Separate Area</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              24/7 fitness center in Muhaisnah First with personal training, ladies gym facilities, group classes, CrossFit, MMA, boxing, and affordable membership packages.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 max-w-sm sm:max-w-none mx-auto">
              <Button size="lg" asChild className="w-full sm:w-auto text-base sm:text-lg px-6 py-6">
                <a
                  href={getMuhaisnahWhatsAppUrl("Hi 365 Fitness Muhaisnah! I'd like to join this branch.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Now
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base sm:text-lg px-6 py-6">
                <a href="tel:+971547120927"><Phone className="mr-2 h-5 w-5" />Call Now</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base sm:text-lg px-6 py-6">
                <a href={muhaisnahGoogleProfileUrl} target="_blank" rel="noopener noreferrer"><Navigation className="mr-2 h-5 w-5" />Get Directions</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Location Info */}
        <section className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 text-center">
                <a href={muhaisnahGoogleProfileUrl} target="_blank" rel="noopener noreferrer" className="block group/location">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-bold mb-2">Address</h3>
                  <p className="text-sm text-muted-foreground group-hover/location:text-primary transition-colors">
                    Shop Number 32, Madinat Badr, Muhaisnah First, Dubai
                  </p>
                </a>
              </Card>
              <Card className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Contact</h3>
                <a
                  href={getMuhaisnahWhatsAppUrl("Hi 365 Fitness Muhaisnah! I'd like to know more about your memberships.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  WhatsApp: +971 54 712 0927
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
              {muhaisnahGalleryImages.map((image) => (
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
                Why Choose <span className="text-primary">365 Fitness Gym in Muhaisnah?</span>
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
                  <h3 className="text-2xl font-bold mb-4 text-primary">Personal Training in Muhaisnah</h3>
                  <p className="text-muted-foreground">
                    Achieve better results with our professional personal trainers in Muhaisnah. We develop personalized workout programs tailored to your body type, fitness level, and objectives. From fat loss and strength training to muscle building and athletic performance, our trainers monitor your progress, improve your technique, and keep you motivated throughout your fitness journey.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Ladies Gym in Muhaisnah</h3>
                  <p className="text-muted-foreground">
                    Our dedicated ladies gym in Muhaisnah offers a safe, comfortable, and private workout environment exclusively for women. With customized body transformation programs, strength training, weight management plans, and experienced female trainers, we help women build confidence while reaching their health and fitness goals.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Group Fitness Classes in Muhaisnah</h3>
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
              Gym Memberships <span className="text-primary">in Muhaisnah</span>
            </h2>
            <p className="text-center text-muted-foreground mb-5">Choose the perfect plan for your fitness journey</p>
            <div className="mx-auto mb-4 flex max-w-4xl items-center gap-4 rounded-2xl border-2 border-primary bg-primary/10 px-5 py-5 text-center shadow-lg shadow-primary/10 sm:px-8">
              <Clock className="h-6 w-6 flex-shrink-0 text-primary" />
              <p className="w-full text-base font-black uppercase leading-snug tracking-wide text-foreground sm:text-xl">
                Limited-time Offer valid until September 2026
              </p>
            </div>
            <p className="mx-auto mb-12 max-w-4xl px-2 text-center text-sm font-semibold text-foreground sm:text-base">
              Prices shown exclude 5% VAT. VAT is added at checkout.
            </p>
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
                    {plan.regularPrice && (
                      <div className="mb-1 text-lg font-semibold text-muted-foreground line-through">
                        AED {plan.regularPrice}
                      </div>
                    )}
                    <div className="text-xs font-bold uppercase tracking-wide text-primary">Actual Payable Amount</div>
                    <div className="flex items-baseline justify-center gap-1 text-primary">
                      <span className="text-4xl font-bold">
                        {pricesLoading
                          ? "Loading…"
                          : (() => {
                              const currentPrice = stripePrices.find((price) => price.slug === plan.slug);
                              return currentPrice ? formatMembershipPrice(currentPrice.unitAmount, currentPrice.currency) : "Unavailable";
                            })()}
                      </span>
                    </div>
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
                        href={getMuhaisnahWhatsAppUrl(`Hi 365 Fitness Muhaisnah! I'm interested in the ${plan.name} membership plan.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp Inquiry
                      </a>
                    </Button>
                    <Button className="payment-button w-full" asChild>
                      <a
                        href={embeddedCheckoutEnabled ? `/checkout?plan=${plan.slug}` : plan.paymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Pay Online</span>
                        <ArrowUpRight className="payment-button__icon" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            {pricesError && (
              <p className="mx-auto mt-5 max-w-2xl text-center text-sm text-destructive">
                Current online prices are temporarily unavailable. You can still use WhatsApp to inquire about a membership.
              </p>
            )}

            <div className="mt-16">
              <h2 className="text-4xl font-bold text-center mb-4">
                Family &amp; Friends <span className="text-primary">Special</span>
              </h2>
              <p className="text-center text-muted-foreground mb-5">
                Join with a friend and enjoy these exclusive rates. Prices are per person.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {familyFriendsPlans.map((plan) => (
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
                      <span className="text-sm text-muted-foreground">/{plan.duration} each</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                        <span>Exclusive rate for two or more people joining together</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <Check className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                        <span>Available at Muhaisnah First branch</span>
                      </li>
                    </ul>
                    <div className="space-y-3">
                      <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                        <a
                          href={getMuhaisnahWhatsAppUrl(`Hi 365 Fitness Muhaisnah! I'm interested in the Family & Friends ${plan.name} special at AED ${plan.price} each.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          WhatsApp Inquiry
                        </a>
                      </Button>
                      <Button className="w-full" variant="secondary" disabled title="Online payment coming soon">
                        Pay Online
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <TrainingRates
              branchName="Muhaisnah First Branch"
              branch="muhaisnah"
              whatsappNumber={muhaisnahWhatsAppNumber}
            />
          </div>
        </section>

        {/* Facilities & Perks */}
        <section className="bg-secondary/20 py-10 md:py-12" aria-labelledby="muhaisnah-facilities-heading">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-6 max-w-3xl text-center">
              <h2 id="muhaisnah-facilities-heading" className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
                Free Facilities &amp; <span className="text-primary">Perks</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Included with your Muhaisnah membership.
              </p>
            </div>

            <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center lg:gap-3">
              {muhaisnahFacilities.map(({ name, icon: Icon }) => (
                <li key={name} className="h-full lg:flex-none lg:basis-[calc((100%_-_3.75rem)/6)]">
                  <Card className="flex min-h-[68px] h-full items-center gap-2.5 rounded-lg border-border/80 bg-card px-3 py-2.5 transition-all duration-200 motion-reduce:transform-none motion-reduce:transition-none md:hover:-translate-y-0.5 md:hover:border-primary">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold leading-snug text-foreground sm:text-sm lg:text-xs xl:text-sm">{name}</span>
                  </Card>
                </li>
              ))}
            </ul>
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
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <a
                href={getMuhaisnahWhatsAppUrl("Hi 365 Fitness Muhaisnah! I'd like to join the Muhaisnah branch.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Muhaisnah Branch Now
              </a>
            </Button>
          </div>
        </section>

        <BranchReviews branch="muhaisnah" />

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
      <Footer branch="muhaisnah" />
      <a
        href={getMuhaisnahWhatsAppUrl("Hi 365 Fitness Muhaisnah! I'd like to know more about membership options.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-glow-lg hover:shadow-glow animate-pulse-glow transition-all duration-300 hover:scale-110 group"
        aria-label="Contact 365 Fitness Muhaisnah on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
      </a>
    </>
  );
};

export default LocationMuhaisnah;
