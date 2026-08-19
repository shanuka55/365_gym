import Stripe from "stripe";

export class StripeConfigurationError extends Error {
  constructor(message = "Stripe payments are not configured.") {
    super(message);
    this.name = "StripeConfigurationError";
  }
}

export const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new StripeConfigurationError();
  }

  return new Stripe(secretKey);
};

export const getConfiguredStripeMode = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new StripeConfigurationError();
  }

  const match = /^(?:sk|rk)_(test|live)_/.exec(secretKey);
  if (!match) {
    throw new StripeConfigurationError("Stripe API key mode could not be determined.");
  }

  return match[1] === "live";
};
