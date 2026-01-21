import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronRight, Search, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import FreePassModal from "./FreePassModal";
import JoinNowModal from "./JoinNowModal";
import deiraBranch from "@/assets/deira-branch.jpg";
import muhansniahBranch from "@/assets/muhasniah-branch.jpg";
// import monthlyPlan from "@/assets/monthly-plan.jpg";
// import annualPlan from "@/assets/annual-plan.jpg";
// import corporatePlan from "@/assets/corporate-plan.jpg";
import personalTraining from "@/assets/personal-training.jpg";
import groupClasses from "@/assets/group-classes.jpg";
import onlineCoaching from "@/assets/online-coaching.jpg";
import { useLanguage } from "@/hooks/useLanguage";

const Header = () => {
  const { t, changeLanguage, currentLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isFreePassOpen, setIsFreePassOpen] = useState(false);
  const [isJoinNowOpen, setIsJoinNowOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const megaMenuItems = {
    membership: [
      { title: t('membership.monthlyPlans'), desc: t('membership.monthlyDesc'), image: monthlyPlan, link: "/plans/monthly-plans" },
      { title: t('membership.annualPlans'), desc: t('membership.annualDesc'), image: annualPlan, link: "/plans/annual-plans" },
      { title: t('membership.corporatePlans'), desc: t('membership.corporateDesc'), image: corporatePlan, link: "/plans/corporate-plans" },
    ],
    trainers: [
      { title: t('services.personalTraining'), desc: t('services.personalDesc'), image: personalTraining, link: "/services/personal-training" },
      { title: t('services.groupClasses'), desc: t('services.groupDesc'), image: groupClasses, link: "/services/group-classes" },
      { title: t('services.onlineCoaching'), desc: t('services.onlineDesc'), image: onlineCoaching, link: "/services/online-coaching" },
    ],
    locations: [
      { title: t('locations.deira'), desc: t('locations.deiraDesc'), link: "/locations/deira-muraqqabat", image: deiraBranch },
      { title: t('locations.muhaisnah'), desc: t('locations.muhaisnahDesc'), link: "/locations/muhaisnah-first", image: muhansniahBranch },
    ],
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-[#0a1628]/98 backdrop-blur-lg"
          : "bg-[#0a1628]/95 backdrop-blur-md"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center hover:opacity-90 transition-opacity z-10">
              <img src={logo} alt="365 Fitness Gym Dubai - 24 Hour Fitness Center" className="h-12 w-auto" />
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Membership Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("membership")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center text-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider px-4 py-2">
                  {t('header.membership')} <ChevronRight className="ml-1 h-4 w-4" />
                </button>
                {openDropdown === "membership" && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-[#0a1628]/98 backdrop-blur-lg border-2 border-primary/30 rounded-xl shadow-glow overflow-hidden animate-fade-in z-50">
                    {megaMenuItems.membership.map((item) => (
                      <Link
                        key={item.title}
                        to={item.link}
                        className="flex items-center gap-4 p-4 hover:bg-secondary transition-colors group"
                      >
                        <img
                          src={item.image}
                          alt={`${item.title} - Gym membership plan at 365 Fitness Dubai`}
                          className="w-20 h-20 object-cover rounded-lg border border-primary/20 group-hover:border-primary transition-colors"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Trainers Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("trainers")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center text-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider px-4 py-2">
                  {t('header.classes')} <ChevronRight className="ml-1 h-4 w-4" />
                </button>
                {openDropdown === "trainers" && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-[#0a1628]/98 backdrop-blur-lg border-2 border-primary/30 rounded-xl shadow-glow overflow-hidden animate-fade-in z-50">
                    {megaMenuItems.trainers.map((item) => (
                      <Link
                        key={item.title}
                        to={item.link}
                        className="flex items-center gap-4 p-4 hover:bg-secondary transition-colors group"
                      >
                        <img
                          src={item.image}
                          alt={`${item.title} - Personal training and fitness classes at 365 Fitness Dubai`}
                          className="w-20 h-20 object-cover rounded-lg border border-primary/20 group-hover:border-primary transition-colors"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Locations Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("locations")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center text-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider px-4 py-2">
                  {t('header.locations')} <ChevronRight className="ml-1 h-4 w-4" />
                </button>
                {openDropdown === "locations" && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-[#0a1628]/98 backdrop-blur-lg border-2 border-primary/30 rounded-xl shadow-glow overflow-hidden animate-fade-in z-50">
                    {megaMenuItems.locations.map((item) => (
                      <Link
                        key={item.title}
                        to={item.link}
                        className="flex items-center gap-4 p-4 hover:bg-secondary transition-colors group"
                      >
                        <img
                          src={item.image}
                          alt={`${item.title} - 365 Fitness Gym location in Dubai with 24-hour access`}
                          className="w-24 h-24 object-cover rounded-lg border border-primary/20 group-hover:border-primary transition-colors"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-border p-4">
                      <p className="text-sm text-muted-foreground">{t('locations.comingSoon')}</p>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/gallery"
                className="text-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider px-4 py-2"
              >
                {t('header.facilities')}
              </Link>
              <Link
                to="/blog"
                className="text-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider px-4 py-2"
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider px-4 py-2"
              >
                {t('header.aboutUs')}
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-wider px-4 py-2"
              >
                {t('header.contact')}
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Search Icon */}
              <button className="text-foreground hover:text-primary transition-colors p-2">
                <Search className="h-5 w-5" />
              </button>

              {/* Language Selector */}
              <button
                onClick={() => changeLanguage(currentLanguage === 'en' ? 'ar' : 'en')}
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors border border-foreground/30 rounded-full px-4 py-2"
              >
                <span className="text-sm font-bold">{currentLanguage === 'en' ? 'عربي' : 'English'}</span>
                <Globe className="h-4 w-4" />
              </button>

              {/* Free Trial Button */}
              <Button
                variant="outline"
                size="default"
                onClick={() => setIsFreePassOpen(true)}
                className="border-2 border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background font-black text-sm uppercase tracking-wider rounded-full px-6 h-11"
              >
                {t('header.freeTrial')} →
              </Button>

              {/* Join Now Button */}
              <Button
                variant="default"
                size="default"
                onClick={() => setIsJoinNowOpen(true)}
                className="bg-primary text-background hover:bg-primary/90 font-black text-sm uppercase tracking-wider rounded-full px-6 h-11 shadow-glow"
              >
                {t('header.joinNow')} →
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-foreground p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Curved Yellow Border - Gymnation Style */}
        <svg
          className="absolute bottom-0 left-0 w-full h-auto"
          viewBox="0 0 1440 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ transform: 'translateY(100%)' }}
        >
          <path
            d="M0 0C240 0 240 24 480 24C720 24 720 0 960 0C1200 0 1200 24 1440 24V0H0Z"
            fill="#FFCC00"
          />
        </svg>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a1628]/98 backdrop-blur-lg lg:hidden pt-20 animate-fade-in">
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            <Link to="/" className="text-foreground hover:text-primary transition-colors py-3 border-b border-border">
              {t('header.home')}
            </Link>

            {/* Mobile Membership Dropdown */}
            <div className="border-b border-border">
              <button
                className="w-full text-left text-foreground hover:text-primary transition-colors py-3 flex items-center justify-between"
                onClick={() => setOpenDropdown(openDropdown === "membership-mobile" ? null : "membership-mobile")}
              >
                {t('header.membership')}
                <ChevronRight className={`h-4 w-4 transition-transform ${openDropdown === "membership-mobile" ? "rotate-90" : ""}`} />
              </button>
              {openDropdown === "membership-mobile" && (
                <div className="pb-3 space-y-2">
                  {megaMenuItems.membership.map((item) => (
                    <Link
                      key={item.title}
                      to={item.link}
                      className="flex items-center gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <img src={item.image} alt={`${item.title} - Affordable gym membership in Dubai`} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Classes Dropdown */}
            <div className="border-b border-border">
              <button
                className="w-full text-left text-foreground hover:text-primary transition-colors py-3 flex items-center justify-between"
                onClick={() => setOpenDropdown(openDropdown === "classes-mobile" ? null : "classes-mobile")}
              >
                {t('header.classes')}
                <ChevronRight className={`h-4 w-4 transition-transform ${openDropdown === "classes-mobile" ? "rotate-90" : ""}`} />
              </button>
              {openDropdown === "classes-mobile" && (
                <div className="pb-3 space-y-2">
                  {megaMenuItems.trainers.map((item) => (
                    <Link
                      key={item.title}
                      to={item.link}
                      className="flex items-center gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <img src={item.image} alt={`${item.title} - Fitness classes and personal training in Dubai`} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Locations Dropdown */}
            <div className="border-b border-border">
              <button
                className="w-full text-left text-foreground hover:text-primary transition-colors py-3 flex items-center justify-between"
                onClick={() => setOpenDropdown(openDropdown === "locations-mobile" ? null : "locations-mobile")}
              >
                {t('header.locations')}
                <ChevronRight className={`h-4 w-4 transition-transform ${openDropdown === "locations-mobile" ? "rotate-90" : ""}`} />
              </button>
              {openDropdown === "locations-mobile" && (
                <div className="pb-3 space-y-2">
                  {megaMenuItems.locations.map((item) => (
                    <Link
                      key={item.title}
                      to={item.link}
                      className="flex items-center gap-3 p-3 hover:bg-secondary/50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <img src={item.image} alt={`${item.title} - 24-hour gym in Dubai`} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <h4 className="font-bold text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/gallery" className="text-foreground hover:text-primary transition-colors py-3 border-b border-border">
              {t('header.facilities')}
            </Link>
            <Link to="/blog" className="text-foreground hover:text-primary transition-colors py-3 border-b border-border">
              Blog
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors py-3 border-b border-border">
              {t('header.about')}
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors py-3 border-b border-border">
              {t('header.contact')}
            </Link>

            {/* Language Selector Mobile */}
            <button
              onClick={() => changeLanguage(currentLanguage === 'en' ? 'ar' : 'en')}
              className="flex items-center justify-center gap-2 text-foreground hover:text-primary transition-colors border border-foreground/30 rounded-full px-6 py-3 mt-2"
            >
              <Globe className="h-5 w-5" />
              <span className="font-bold">{currentLanguage === 'en' ? 'عربي' : 'English'}</span>
            </button>

            <div className="flex flex-col space-y-3 pt-4">
              <Button variant="outline" size="lg" className="w-full" onClick={() => setIsFreePassOpen(true)}>
                {t('header.freeTrial')}
              </Button>
              <Button variant="hero" size="lg" className="w-full" onClick={() => setIsJoinNowOpen(true)}>
                {t('header.joinNow')}
              </Button>
            </div>
          </nav>
        </div>
      )}

      <FreePassModal isOpen={isFreePassOpen} onClose={() => setIsFreePassOpen(false)} />
      <JoinNowModal isOpen={isJoinNowOpen} onClose={() => setIsJoinNowOpen(false)} />
    </>
  );
};

export default Header;
