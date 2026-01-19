import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Video, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-primary/20">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <img src={logo} alt="365 Fitness" className="h-16 w-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Dubai's premier fitness destination. Transform your body, elevate your mind.
            </p>
            <Button variant="hero" size="lg" className="w-full">
              Join Now
            </Button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-muted-foreground hover:text-primary transition-colors">
                  Membership Plans
                </Link>
              </li>
              <li>
                <Link to="/trainers" className="text-muted-foreground hover:text-primary transition-colors">
                  Personal Trainers
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-1 mr-2 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  MZ 08, Dubai Municipality Building, Near Muraqqbat Police Station, Salah Al Din Road, Dubai
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <a href="tel:+971547120925" className="text-muted-foreground hover:text-primary transition-colors">
                  +971 54 712 0925
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <a href="mailto:info@365fitness.ae" className="text-muted-foreground hover:text-primary transition-colors">
                  info@365fitness.ae
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Follow Us</h3>
            <p className="text-muted-foreground mb-4">
              Stay connected for fitness tips, updates, and inspiration
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/365fitnessgymllc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-primary p-3 rounded-full transition-all duration-300 hover:shadow-glow"
              >
                <Facebook className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="https://www.instagram.com/365fitnessgymllc/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-primary p-3 rounded-full transition-all duration-300 hover:shadow-glow"
              >
                <Instagram className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="https://www.youtube.com/@365fitnessgymllc"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-primary p-3 rounded-full transition-all duration-300 hover:shadow-glow"
              >
                <Youtube className="h-5 w-5 text-foreground" />
              </a>
              <a
                href="https://www.tiktok.com/@365fitnessgym"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-primary p-3 rounded-full transition-all duration-300 hover:shadow-glow"
              >
                <Video className="h-5 w-5 text-foreground" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © {currentYear} 365 Fitness Body Building Club. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </footer>
  );
};

export default Footer;
