import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import Index from "./pages/Index";
import usePageTracking from "./hooks/usePageTracking";

const Toaster = lazy(() => import("@/components/ui/toaster").then((module) => ({ default: module.Toaster })));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const LocationDeira = lazy(() => import("./pages/LocationDeira"));
const LocationMuhaisnah = lazy(() => import("./pages/LocationMuhaisnah"));
const MonthlyPlans = lazy(() => import("./pages/MonthlyPlans"));
const AnnualPlans = lazy(() => import("./pages/AnnualPlans"));
const CorporatePlans = lazy(() => import("./pages/CorporatePlans"));
const PersonalTraining = lazy(() => import("./pages/PersonalTraining"));
const GroupClasses = lazy(() => import("./pages/GroupClasses"));
const OnlineCoaching = lazy(() => import("./pages/OnlineCoaching"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Connection = lazy(() => import("./pages/Connection"));
const MembershipAgreement = lazy(() => import("./pages/MembershipAgreement"));
const FreelanceTrainerAgreement = lazy(() => import("./pages/FreelanceTrainerAgreement"));
const NotFound = lazy(() => import("./pages/NotFound"));

const Tracker = () => {
  usePageTracking();
  return null;
};

const useRenderAfterIdle = () => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const scheduleIdle = window.requestIdleCallback || ((callback: IdleRequestCallback) => window.setTimeout(callback, 1500));
    const cancelIdle = window.cancelIdleCallback || window.clearTimeout;
    const handle = scheduleIdle(() => setCanRender(true), { timeout: 2200 });

    return () => cancelIdle(handle);
  }, []);

  return canRender;
};

const App = () => {
  const renderDeferredUi = useRenderAfterIdle();

  useEffect(() => {
    const handlePreloadError = () => {
      const reloadKey = "vite-preload-reloaded";

      if (sessionStorage.getItem(reloadKey) === "true") {
        return;
      }

      sessionStorage.setItem(reloadKey, "true");
      window.location.reload();
    };

    window.addEventListener("vite:preloadError", handlePreloadError);

    return () => window.removeEventListener("vite:preloadError", handlePreloadError);
  }, []);

  return (
    <BrowserRouter>
      <Tracker />
      <ScrollToTop />
      {renderDeferredUi && (
        <Suspense fallback={null}>
          <Toaster />
        </Suspense>
      )}
      <RouteErrorBoundary>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/connection" element={<Connection />} />
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
            <Route path="/membership-agreement" element={<MembershipAgreement />} />
            <Route path="/freelance-trainer-agreement" element={<FreelanceTrainerAgreement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
