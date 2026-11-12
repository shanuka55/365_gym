import { useEffect, useRef, useState, type FormEvent } from "react";
import PageSeo from "@/components/PageSeo";
import { ArrowLeft, Gift, MapPin, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { partnerCompanies, type PartnerCompany } from "@/data/partnerOffers";
import type { EnquiryBranch } from "@/lib/whatsapp";
import { formatPartnerPrice, hasReferralCodeFormat, normalizeReferralCode, partnerOfferWhatsAppUrl, referralCodePattern } from "@/lib/partnerOffers";
import partnerOffersHero from "@/assets/partner-offers-hero.webp";

function PartnerDetails({ partner, onBack }: { partner: PartnerCompany; onBack: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, []);
  const [offerId, setOfferId] = useState(partner.offers[0].id);
  const offer = partner.offers.find((item) => item.id === offerId)!;
  const [planCode, setPlanCode] = useState(offer.plans?.[0].code || "");
  const [branchId, setBranchId] = useState<EnquiryBranch>(offer.eligibleBranches[0].id);
  const branch = offer.eligibleBranches.find((item) => item.id === branchId)!;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);
  const selectOffer = (id: string) => {
    setOfferId(id);
    const nextOffer = partner.offers.find((item) => item.id === id)!;
    setPlanCode(nextOffer.plans?.[0].code || "");
    setBranchId(nextOffer.eligibleBranches[0].id);
    setReferralCode("");
    setHandoffUrl(null);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    if (offer.verification === "referral-code" && !hasReferralCodeFormat(referralCode)) return;
    const url = partnerOfferWhatsAppUrl(partner, offer, branchId, planCode, name, phone, referralCode);
    setHandoffUrl(url);
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // The manual link remains available when the browser blocks a new tab.
    }
  };
  const selectClass = "mt-2 w-full min-h-12 rounded-md border border-input bg-background px-3 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <>
        <Button variant="outline" onClick={onBack} className="mb-6 gap-2"><ArrowLeft className="h-4 w-4" />Back to all partners</Button>
        <section className="mb-8" aria-labelledby="partner-company-name">
          <h2 id="partner-company-name" ref={headingRef} tabIndex={-1} className="text-3xl font-bold mb-2">{partner.name}</h2>
          <p className="text-muted-foreground mb-3">{partner.location}</p>
          <p className="font-bold">Participating gym branches</p>
          <ul className="text-muted-foreground">{Array.from(new Map(partner.offers.flatMap((item) => item.eligibleBranches).map((item) => [item.id, item])).values()).map((item) => <li key={item.id}>{item.label}</li>)}</ul>
        </section>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <section aria-label="Available partner offers" className="space-y-6">
            {partner.offers.map((item) => (
              <article key={item.id} className="rounded-xl border border-primary/30 bg-card p-6 md:p-8">
                <p className="text-sm text-primary font-bold mb-3">{partner.name}, {partner.location}</p>
                <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
                <p className="text-muted-foreground mb-5">{item.description}</p>
                <p className="text-sm text-muted-foreground mb-5"><strong className="text-foreground">Eligibility: </strong>{item.eligibility}</p>
                {item.plans && <dl className="grid grid-cols-2 gap-3 mb-6">{item.plans.map((plan) => <div key={plan.code} className="rounded-lg bg-secondary p-4"><dt className="text-sm text-muted-foreground">{plan.duration}</dt><dd className="text-xl font-bold text-primary">{formatPartnerPrice(plan.price)}</dd></div>)}</dl>}
                {item.discount && <p className="text-4xl font-black text-primary mb-6">{item.discount}</p>}
                <p className="flex items-start gap-2 text-sm text-muted-foreground mb-5"><MapPin className="h-4 w-4 shrink-0 mt-0.5" />{item.eligibleBranches.map((eligibleBranch) => eligibleBranch.label).join(", ")}</p>
                <Button variant="outline" asChild><a href="#offer-enquiry" onClick={() => selectOffer(item.id)}>Enquire about this offer</a></Button>
              </article>
            ))}
          </section>
          <section id="offer-enquiry" className="scroll-mt-28 rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-2">Enquire about an offer</h2>
            <p className="text-muted-foreground mb-6">Choose your offer and continue with the selected gym branch on WhatsApp.</p>
            <form onSubmit={submit} className="space-y-5">
              <div><Label htmlFor="partner-offer">Offer *</Label><select id="partner-offer" value={offerId} onChange={(event) => selectOffer(event.target.value)} className={selectClass}>{partner.offers.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></div>
              {offer.plans && <div><Label htmlFor="partner-duration">Membership duration *</Label><select id="partner-duration" required value={planCode} onChange={(event) => { setPlanCode(event.target.value); setHandoffUrl(null); }} className={selectClass}>{offer.plans.map((plan) => <option key={plan.code} value={plan.code}>{plan.duration} — {formatPartnerPrice(plan.price)}</option>)}</select></div>}
              {offer.eligibleBranches.length > 1 && <div><Label htmlFor="partner-branch">Gym branch *</Label><select id="partner-branch" required value={branchId} onChange={(event) => { setBranchId(event.target.value as EnquiryBranch); setHandoffUrl(null); }} className={selectClass}>{offer.eligibleBranches.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></div>}
              <div className="rounded-lg bg-secondary p-4 text-sm" aria-live="polite"><p className="font-bold">Participating gym branch</p><p>{branch.label}</p><p className="mt-2"><strong>Eligibility: </strong>{offer.eligibility}</p>{offer.discount && <p className="text-primary mt-2 font-bold">{offer.discount} at {partner.name}, {partner.location}</p>}</div>
              <div><Label htmlFor="partner-name">Full name *</Label><Input id="partner-name" autoComplete="name" required maxLength={120} pattern=".*\S.*" value={name} onChange={(event) => { setName(event.target.value); setHandoffUrl(null); }} className="mt-2 h-12 text-base" /></div>
              <div><Label htmlFor="partner-phone">Phone number *</Label><Input id="partner-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+971 50 123 4567" required maxLength={25} pattern={"\\+?[0-9][0-9\\s\\(\\)\\-]{6,23}"} title="Enter a phone number with 7–25 characters using digits, spaces, +, parentheses or hyphens." value={phone} onChange={(event) => { setPhone(event.target.value); setHandoffUrl(null); }} className="mt-2 h-12 text-base" /></div>
              {offer.verification === "referral-code" ? (
                <div>
                  <Label htmlFor="partner-referral-code">Partner referral code *</Label>
                  <Input id="partner-referral-code" required pattern={referralCodePattern} autoCapitalize="characters" autoComplete="off" spellCheck={false} title="Use NAT- followed by exactly 8 uppercase letters or digits." aria-describedby="partner-referral-help partner-verification-note" value={referralCode} onChange={(event) => { setReferralCode(normalizeReferralCode(event.target.value)); setHandoffUrl(null); }} className="mt-2 h-12 text-base" />
                  <p id="partner-referral-help" className="mt-2 text-sm text-muted-foreground">Enter the code given to you by Naturals Salon reception.</p>
                  <p id="partner-verification-note" className="mt-2 text-sm text-muted-foreground">Deira reception will verify your referral code before confirming the discount.</p>
                </div>
              ) : offer.verification === "active-membership" ? (
                <p className="text-sm text-muted-foreground">Show your active 365 Fitness Deira membership at Naturals Salon reception to claim this offer.</p>
              ) : null}
              <Button type="submit" className="w-full h-auto min-h-12 whitespace-normal gap-2"><MessageCircle className="h-5 w-5 shrink-0" />Continue in WhatsApp</Button>
              <p className="text-sm text-muted-foreground">Your details will be included in a prefilled message. Tap <strong>Send</strong> in WhatsApp to complete your enquiry.</p>
              {handoffUrl && <div role="status" className="rounded-lg border border-primary/40 p-4"><p>Your message is ready. Tap Send in WhatsApp.</p><a href={handoffUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-primary underline">Open WhatsApp manually</a></div>}
            </form>
          </section>
        </div>
    </>
  );
}

export default function PartnerOffers() {
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const partner = partnerCompanies.find((item) => item.id === partnerId);
  const directoryRef = useRef<HTMLHeadingElement>(null);
  const backToPartners = () => {
    setPartnerId(null);
    requestAnimationFrame(() => directoryRef.current?.focus());
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSeo title="Partner Offers | 365 Fitness" description="Explore partner benefits from Naturals Salon, Reef Mall and 365 Fitness Deira Muraqqabat." canonical="https://www.365fitness.ae/partner-offers" />
      <Header />
      <main className="container mx-auto px-4 pb-20 pt-36">
        <section aria-label="Partner offers introduction" className="relative mb-12 overflow-hidden lg:flex lg:min-h-[420px] lg:items-center">
          <div className="relative z-10 lg:w-5/12 lg:py-12">
          <p className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider mb-4"><Gift className="h-5 w-5" /> Better together</p>
          <h1 className="text-4xl md:text-6xl font-black mb-6">Partner <span className="text-primary">Offers</span></h1>
          <p className="text-lg text-muted-foreground">More benefits for our fitness community. Choose a partner company to discover its offers and participating gym branches.</p>
          </div>
          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[70%] lg:rounded-none">
            <img src={partnerOffersHero} alt="Two gym partners sharing a fist bump" width={1440} height={810} fetchPriority="high" decoding="async" className="h-full w-full object-cover object-right" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background via-background/10 to-transparent lg:block" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent" />
          </div>
        </section>
        {partner ? <PartnerDetails key={partner.id} partner={partner} onBack={backToPartners} /> : (
          <section aria-labelledby="partner-directory-heading">
            <h2 id="partner-directory-heading" ref={directoryRef} tabIndex={-1} className="text-2xl md:text-3xl font-bold mb-6 scroll-mt-28">Choose a partner company</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerCompanies.map((company) => (
                <article key={company.id} className="rounded-xl border border-primary/30 bg-card p-6 md:p-8">
                  {company.cover && <img src={company.cover.src} alt={company.cover.alt} width={400} height={500} className="mx-auto mb-5 aspect-[4/5] w-full max-w-[200px] rounded-lg object-contain" loading="lazy" decoding="async" />}
                  {company.logo && <img src={company.logo} alt={`${company.name} logo`} className="h-20 w-20 object-contain mb-5" loading="lazy" />}
                  <h3 className="text-2xl font-bold mb-3">{company.name}</h3>
                  <p className="flex items-center gap-2 text-muted-foreground mb-6"><MapPin className="h-4 w-4 shrink-0" />{company.location}</p>
                  <Button onClick={() => setPartnerId(company.id)} aria-label={`View Offers for ${company.name}`} className="w-full">View Offers</Button>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
