import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import RouteErrorBoundary from "./components/RouteErrorBoundary";
import Index from "./pages/Index";
import siteRoutes from "./data/siteRoutes.json";
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
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
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
            <Route path={siteRoutes.Index.path} element={<Index />} />
            <Route path={siteRoutes.About.path} element={<About />} />
            <Route path={siteRoutes.Gallery.path} element={<Gallery />} />
            <Route path={siteRoutes.Contact.path} element={<Contact />} />
            <Route path={siteRoutes.Connection.path} element={<Connection />} />
            <Route path={siteRoutes.LocationDeira.path} element={<LocationDeira />} />
            <Route path={siteRoutes.LocationMuhaisnah.path} element={<LocationMuhaisnah />} />
            <Route path={siteRoutes.MonthlyPlans.path} element={<MonthlyPlans />} />
            <Route path={siteRoutes.AnnualPlans.path} element={<AnnualPlans />} />
            <Route path={siteRoutes.CorporatePlans.path} element={<CorporatePlans />} />
            <Route path={siteRoutes.PersonalTraining.path} element={<PersonalTraining />} />
            <Route path={siteRoutes.GroupClasses.path} element={<GroupClasses />} />
            <Route path={siteRoutes.OnlineCoaching.path} element={<OnlineCoaching />} />
            <Route path={siteRoutes.Blog.path} element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path={siteRoutes.MembershipAgreement.path} element={<MembershipAgreement />} />
            <Route path={siteRoutes.FreelanceTrainerAgreement.path} element={<FreelanceTrainerAgreement />} />
            <Route path={siteRoutes.TermsAndConditions.path} element={<TermsAndConditions />} />
            <Route path={siteRoutes.PrivacyPolicy.path} element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
