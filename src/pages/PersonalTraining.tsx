import { ArrowRight, Dumbbell, Target, TrendingUp, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSeo from "@/components/PageSeo";
import { deiraPackages, muhaisnahPackages } from "@/components/TrainingRates";
import { generalEnquiryUrl, type EnquiryBranch } from "@/lib/whatsapp";
import personalTrainingImage from "@/assets/personal-training.webp";

const benefits = [
  { icon: Target, title: "Training for Your Goals", description: "Work towards fat loss, muscle gain, strength or improved fitness with a plan tailored to you." },
  { icon: User, title: "One-on-One Coaching", description: "Get individual attention, exercise guidance and support from a personal trainer." },
  { icon: Dumbbell, title: "Build Your Technique", description: "Learn and practise exercise technique with guidance suited to your experience level." },
  { icon: TrendingUp, title: "Stay Motivated", description: "Build a consistent routine and review your progress as your fitness develops." },
];

const branches = [
  { key: "deira" as EnquiryBranch, name: "Deira Muraqqabat", path: "/locations/deira-muraqqabat", packages: deiraPackages.filter((item) => item.title.includes("Personal Training")) },
  { key: "muhaisnah" as EnquiryBranch, name: "Muhaisnah First", path: "/locations/muhaisnah-first", packages: muhaisnahPackages.filter((item) => item.title.includes("Personal Training")) },
];

const PersonalTraining = () => (
  <>
    <PageSeo
      title="Personal Training in Dubai | 365 Fitness Gym"
      description="Find personal training in Dubai at 365 Fitness Deira and Muhaisnah. Explore branch-specific coaching packages and contact our trainers."
      canonical="https://www.365fitness.ae/services/personal-training"
      image={personalTrainingImage}
    />
    <Header />
    <main className="min-h-screen bg-background pt-24">
      <section className="relative min-h-[400px] h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${personalTrainingImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">Personal Training <span className="text-primary">in Dubai</span></h1>
          <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto">Train with purpose at 365 Fitness in Deira Muraqqabat and Muhaisnah First.</p>
          <Button asChild size="lg" className="mt-8"><a href="#training-packages">Explore Packages <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
        </div>
      </section>
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-5">Personal Training <span className="text-primary">Built Around You</span></h2>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">Whether you are new to the gym or working towards a new goal, our personal trainers can help you build a focused training routine. Choose individual or partner coaching at your preferred Dubai branch.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item) => <Card key={item.title} className="p-6 text-center"><item.icon className="h-10 w-10 text-primary mx-auto mb-4" /><h3 className="text-xl font-bold mb-3">{item.title}</h3><p className="text-sm text-muted-foreground">{item.description}</p></Card>)}
          </div>
        </div>
      </section>
      <section id="training-packages" className="py-16 md:py-24 scroll-mt-28">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12"><p className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-3">Choose your branch</p><h2 className="text-3xl md:text-4xl font-bold">Personal Training <span className="text-primary">Packages & Prices</span></h2><p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Prices and packages differ by branch. Select your preferred location below and contact the team to confirm availability and package details.</p></div>
          <div className="space-y-16">
            {branches.map((branch) => (
              <section key={branch.key} aria-labelledby={`${branch.key}-training`}>
                <div className="flex flex-wrap items-end justify-between gap-3 mb-6"><div><p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">365 Fitness Dubai</p><h3 id={`${branch.key}-training`} className="text-3xl font-bold">{branch.name}</h3></div><Link className="text-primary underline underline-offset-4" to={branch.path}>Explore {branch.name} branch</Link></div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {branch.packages.map((item) => (
                    <Card key={item.title} className="p-6 border-primary/20 flex flex-col">
                      <item.icon className="h-9 w-9 text-primary mb-4" /><h4 className="text-xl font-bold mb-1">{item.title}</h4><p className="text-sm text-muted-foreground mb-6">{item.duration}</p>
                      <ul className="space-y-3 flex-1">{item.features.map((feature) => <li key={feature.label} className="text-sm border-b border-border pb-3"><div className="flex justify-between gap-3"><span>{feature.label}</span><span className="font-bold whitespace-nowrap">{feature.price}</span></div>{feature.offer && <span className="block mt-1 text-xs font-bold text-primary">{feature.offer}</span>}</li>)}</ul>
                      <Button asChild className="mt-6 w-full"><a href={generalEnquiryUrl(branch.key, `Hi 365 Fitness ${branch.name}! I'd like to enquire about ${item.title} packages.`)} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a></Button>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-secondary/20"><div className="container mx-auto px-4 max-w-4xl text-center"><h2 className="text-3xl md:text-4xl font-bold mb-6">Find a Personal Trainer <span className="text-primary">Near You</span></h2><p className="text-muted-foreground leading-relaxed">Our Dubai gyms offer personal training in Deira Muraqqabat and Muhaisnah First for goals including weight loss, strength and muscle building. Ask your branch about trainer availability, session schedules and the package that suits you. You can also explore our <Link className="text-primary underline underline-offset-4" to="/services/group-classes">group fitness classes</Link>.</p></div></section>
    </main>
    <Footer />
  </>
);

export default PersonalTraining;
