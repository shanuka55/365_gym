import type { VercelRequest } from "@vercel/node";
import { StripeConfigurationError } from "./stripe.js";

type RuntimeEnvironment = NodeJS.ProcessEnv;

const firstHeaderValue = (value: string | string[] | undefined) => {
  const header = Array.isArray(value) ? value[0] : value;
  return header?.split(",", 1)[0].trim();
};

const parseSafeOrigin = (value: string, source: string) => {
  let url: URL;

  try {
    url = new URL(value);
  } catch {
    throw new StripeConfigurationError(`${source} is not a valid absolute URL.`);
  }

  const isLocalHttp = url.protocol === "http:"
    && (url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]");

  if ((url.protocol !== "https:" && !isLocalHttp) || url.username || url.password) {
    throw new StripeConfigurationError(`${source} is not a safe site URL.`);
  }

  if (url.pathname !== "/" || url.search || url.hash) {
    throw new StripeConfigurationError(`${source} must contain only a site origin.`);
  }

  return url.origin;
};

const getForwardedOrigin = (request: VercelRequest, environment: RuntimeEnvironment) => {
  const isTrustedVercelRequest = environment.VERCEL === "1"
    || Boolean(environment.VERCEL_ENV)
    || Boolean(environment.VERCEL_URL);

  if (!isTrustedVercelRequest) return null;

  const protocol = firstHeaderValue(request.headers["x-forwarded-proto"]);
  const host = firstHeaderValue(request.headers["x-forwarded-host"]);
  if (!protocol || !host || !/^[a-z0-9.-]+(?::\d+)?$/i.test(host)) return null;
  if (protocol !== "https" && protocol !== "http") return null;

  try {
    return parseSafeOrigin(`${protocol}://${host}`, "Forwarded request origin");
  } catch {
    return null;
  }
};

const getVercelOrigin = (environment: RuntimeEnvironment) => {
  const vercelUrl = environment.VERCEL_URL?.trim();
  if (!vercelUrl) return null;

  const absoluteUrl = vercelUrl.includes("://") ? vercelUrl : `https://${vercelUrl}`;
  return parseSafeOrigin(absoluteUrl, "VERCEL_URL");
};

export const resolveSiteOrigin = (
  request: VercelRequest,
  environment: RuntimeEnvironment = process.env,
) => {
  const configuredSiteUrl = environment.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredSiteUrl) {
    return parseSafeOrigin(configuredSiteUrl, "NEXT_PUBLIC_SITE_URL");
  }

  return getForwardedOrigin(request, environment)
    ?? getVercelOrigin(environment)
    ?? "http://localhost:3000";
};

