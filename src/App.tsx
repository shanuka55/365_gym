import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import LocationDeira from "./pages/LocationDeira";
import LocationMuhaisnah from "./pages/LocationMuhaisnah";
import MonthlyPlans from "./pages/MonthlyPlans";
import AnnualPlans from "./pages/AnnualPlans";
import CorporatePlans from "./pages/CorporatePlans";
import PersonalTraining from "./pages/PersonalTraining";
import GroupClasses from "./pages/GroupClasses";
import OnlineCoaching from "./pages/OnlineCoaching";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Snow from "./components/Snow";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isLoading && <LoadingScreen />}
        <BrowserRouter>
          <ScrollToTop />
          {/* <Snow /> */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/locations/deira-muraqqabat" element={<LocationDeira />} />
            <Route path="/locations/muhaisnah-first" element={<LocationMuhaisnah />} />
            <Route path="/plans/monthly-plans" element={<MonthlyPlans />} />
            <Route path="/plans/annual-plans" element={<AnnualPlans />} />
            <Route path="/plans/corporate-plans" element={<CorporatePlans />} />
            <Route path="/services/personal-training" element={<PersonalTraining />} />
            <Route path="/services/group-classes" element={<GroupClasses />} />
            <Route path="/services/online-coaching" element={<OnlineCoaching />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
