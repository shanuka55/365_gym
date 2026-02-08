import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "page_view",
            page_location: window.location.href, // full URL
            page_path: location.pathname,        // / , /about , /contact
            page_title: document.title,           // browser title
        });
    }, [location.pathname]);
};

export default usePageTracking;
