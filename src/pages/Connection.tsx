import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import contactHero from "@/assets/contact-hero.jpg";
import contactHero2 from "@/assets/contact-img-01.jpg";
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

            <main>
                {/* Hero Section */}
                <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                    <img
                        src={contactHero2}
                        alt="Contact 365 Fitness"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in">
                            Free WIFI <span className="text-primary">365 Fitness</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            We're here to help you start your fitness journey
                        </p>
                    </div>
                </section>

                {/* Contact Info & Form */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className=" ">
                            {/* Contact Information */}

                            {/* Contact Form */}
                            <div className="bg-card border border-border rounded-lg p-8 shadow-glow-lg">
                                <h3 className="text-3xl font-bold text-foreground mb-6">
                                    Sign In <span className="text-primary">365 fitness guest</span>
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



                                    <Button type="submit" variant="hero" size="lg" className="w-full">
                                        Conform
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <WhatsAppButton />
        </div>
    );
};

export default Contact;
