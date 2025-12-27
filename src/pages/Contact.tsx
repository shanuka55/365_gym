import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import contactHero from "@/assets/contact-hero.jpg";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const waMessage = `Contact Form Submission
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Message: ${formData.message}`;

    const waUrl = `https://wa.me/97143375022?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, "_blank");

    toast({
      title: "Message Sent!",
      description: "We'll get back to you shortly via WhatsApp.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <img
            src={contactHero}
            alt="Contact 365 Fitness"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We're here to help you start your fitness journey
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-foreground mb-6">
                    Contact <span className="text-primary">Information</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Have questions? Reach out to us through any of these channels.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary transition-all hover:shadow-glow">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Main Branch - Deira</h3>
                      <p className="text-muted-foreground">
                        MZ 08, Dubai Municipality Building, Near Muraqqbat Police Station, 
                        Salah Al Din Road, Dubai
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary transition-all hover:shadow-glow">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Muhaisnah Branch</h3>
                      <p className="text-muted-foreground">Muhaisnah First, Dubai</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary transition-all hover:shadow-glow">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Phone</h3>
                      <a href="tel:+97143375022" className="text-muted-foreground hover:text-primary transition-colors">
                        +971 4 337 5022
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary transition-all hover:shadow-glow">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Email</h3>
                      <a href="mailto:info@365fitness.ae" className="text-muted-foreground hover:text-primary transition-colors">
                        info@365fitness.ae
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary transition-all hover:shadow-glow">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Opening Hours</h3>
                      <p className="text-muted-foreground">24/7 Access - Open Every Day</p>
                    </div>
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => window.open("https://wa.me/97143375022", "_blank")}
                  >
                    <MessageCircle className="mr-2" />
                    Chat on WhatsApp
                  </Button>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card border border-border rounded-lg p-8 shadow-glow-lg">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Send Us a <span className="text-primary">Message</span>
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
