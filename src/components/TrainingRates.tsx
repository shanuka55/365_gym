import { useState } from "react";
import { ChevronDown, Dumbbell, MessageCircle, Music, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type TrainingRatesProps = {
  branchName: string;
  branch: "deira" | "muhaisnah";
  whatsappNumber?: string;
};

type PackageFeature = {
  label: string;
  price: string;
  offer?: string;
};

type TrainingPackage = {
  title: string;
  icon: typeof Dumbbell;
  duration: string;
  features: PackageFeature[];
};

const deiraPackages: TrainingPackage[] = [
  {
    title: "Personal Training",
    icon: Dumbbell,
    duration: "Individual Coaching",
    features: [
      { label: "1 Session", price: "AED 150" },
      { label: "1 Month", price: "AED 1,700", offer: "Offer AED 1,500" },
      { label: "30 Sessions", price: "AED 2,500", offer: "Offer AED 2,200" },
    ],
  },
  {
    title: "Partner Personal Training",
    icon: Users,
    duration: "Partner Coaching",
    features: [
      { label: "1 Session", price: "AED 300" },
      { label: "1 Month", price: "AED 2,400", offer: "Offer Closed" },
      { label: "30 Sessions", price: "AED 3,500", offer: "Offer Closed" },
    ],
  },
  {
    title: "Group Personal Training",
    icon: Users,
    duration: "Group Coaching",
    features: [
      { label: "1 Session", price: "AED 960" },
      { label: "1 Month", price: "AED 1,500", offer: "Offer Closed" },
      { label: "30 Sessions", price: "AED 2,100", offer: "Offer Closed" },
    ],
  },
  {
    title: "MMA",
    icon: Shield,
    duration: "Combat Training",
    features: [
      { label: "12 Classes", price: "AED 1,250" },
      { label: "36 Classes", price: "AED 3,200" },
      { label: "72 Classes", price: "AED 6,000" },
    ],
  },
  {
    title: "MMA Group Training",
    icon: Shield,
    duration: "Group Combat Training",
    features: [
      { label: "12 Classes", price: "AED 900" },
      { label: "36 Classes", price: "AED 2,500" },
      { label: "72 Classes", price: "AED 4,000" },
    ],
  },
];

const muhaisnahPackages: TrainingPackage[] = [
  {
    title: "Personal Training",
    icon: Dumbbell,
    duration: "Individual Coaching",
    features: [
      { label: "1 Session", price: "AED 250" },
      { label: "6 Sessions", price: "AED 1,350", offer: "Offer AED 1,200" },
      { label: "12 Sessions", price: "AED 2,400", offer: "Offer AED 2,000" },
      { label: "20 Sessions", price: "AED 3,400", offer: "Offer AED 2,500" },
      { label: "Monthly", price: "AED 4,200" },
    ],
  },
  {
    title: "Partner Personal Training",
    icon: Users,
    duration: "Partner Coaching",
    features: [
      { label: "1 Session", price: "AED 300" },
      { label: "6 Sessions", price: "AED 2,100" },
      { label: "12 Sessions", price: "AED 3,100" },
      { label: "20 Sessions", price: "AED 4,200" },
      { label: "Monthly", price: "AED 4,999" },
    ],
  },
  {
    title: "Group Personal Training",
    icon: Users,
    duration: "Group Coaching",
    features: [
      { label: "12 Sessions", price: "AED 1,200" },
      { label: "20 Sessions", price: "AED 1,600" },
    ],
  },
  {
    title: "MMA",
    icon: Shield,
    duration: "Combat Training",
    features: [
      { label: "Single Session", price: "AED 150" },
      { label: "12 Classes", price: "AED 1,560" },
      { label: "36 Classes", price: "AED 3,600" },
    ],
  },
  {
    title: "MMA Group Training",
    icon: Shield,
    duration: "Group Combat Training",
    features: [
      { label: "Single Session", price: "AED 99" },
      { label: "12 Classes", price: "AED 990" },
      { label: "36 Classes", price: "AED 3,500" },
    ],
  },
  {
    title: "Zumba / Belly Dance / Yoga",
    icon: Music,
    duration: "Dance & flexibility classes",
    features: [
      { label: "Single Session", price: "AED 99" },
      { label: "12 Classes", price: "AED 990" },
    ],
  },
];

const TrainingRates = ({ branchName, branch, whatsappNumber: whatsappNumberOverride }: TrainingRatesProps) => {
  const [showPackages, setShowPackages] = useState(false);
  const packages = branch === "muhaisnah" ? muhaisnahPackages : deiraPackages;
  const whatsappNumber = whatsappNumberOverride ?? (branch === "muhaisnah" ? "97154712097" : "971547120925");

  const getWhatsAppUrl = (packageName: string) => {
    const message = `Hi 365 Fitness! I want to get the ${packageName} package at ${branchName}.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="mt-12">
      <div className="text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Training Rates - {branchName}
        </p>
        <Button
          size="lg"
          onClick={() => setShowPackages((current) => !current)}
          className="rounded-full px-8 font-black uppercase"
        >
          {showPackages ? "Hide Packages" : "View All"}
          <ChevronDown className={`ml-2 h-5 w-5 transition-transform ${showPackages ? "rotate-180" : ""}`} />
        </Button>
      </div>

      {showPackages && (
        <div className="mt-10">
          <p className="mb-8 text-center text-muted-foreground">
            We are currently providing the following training packages.
          </p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((item) => (
              <Card key={item.title} className="p-6 relative border-2 border-primary/20 flex flex-col">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="mb-6 text-sm text-muted-foreground">{item.duration}</p>
                <ul className="space-y-3 flex-1">
                  {item.features.map((feature) => (
                    <li key={feature.label} className="flex items-start gap-3 text-sm">
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      <span className="flex-1">
                        <span className="flex items-center justify-between gap-3">
                          <span>{feature.label}</span>
                          <span className="font-bold text-foreground">{feature.price}</span>
                        </span>
                        {feature.offer && (
                          <span className="mt-1 block text-xs font-bold text-primary">
                            {feature.offer}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full">
                  <a href={getWhatsAppUrl(item.title)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Get Now
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingRates;
