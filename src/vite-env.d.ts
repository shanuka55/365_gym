/// <reference types="vite/client" />
export { };

interface ImportMetaEnv {
    readonly NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
    readonly NEXT_PUBLIC_EMBEDDED_CHECKOUT_ENABLED?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare global {
    interface Window {
        dataLayer: unknown[];
    }
}
