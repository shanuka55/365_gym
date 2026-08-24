import {
  CalendarX2,
  CreditCard,
  Dumbbell,
  FileCheck2,
  HeartPulse,
  LockKeyhole,
  RefreshCw,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageSeo from "@/components/PageSeo";
import WhatsAppButton from "@/components/WhatsAppButton";

type TermSection = {
  id: string;
  title: string;
  icon: LucideIcon;
  note?: string;
  items: Array<{ label: string; text: string }>;
};

const TERM_SECTIONS: TermSection[] = [
  {
    id: "membership-access",
    title: "Membership and Access",
    icon: FileCheck2,
    items: [
      { label: "1.1 Membership", text: "Access to 365 Fitness facilities and services requires a valid membership. Membership options, fees, and terms are outlined in separate membership agreements." },
      { label: "1.2 Age Requirement", text: "Users must be at least 18 years old to sign up for membership or use the Services. Minors must be accompanied by a legal guardian or have written consent to use the Services." },
      { label: "1.3 Access Control", text: "365 Fitness reserves the right to deny or revoke access to the facilities or Services for any reason, including but not limited to violation of these Terms, inappropriate behavior, or failure to comply with club rules." },
    ],
  },
  {
    id: "facilities-equipment",
    title: "Use of Facilities and Equipment",
    icon: Dumbbell,
    note: "Gym membership, fitness classes, personal training, mixed martial arts classes, gym equipment, and accessories.",
    items: [
      { label: "2.1 Facility Rules", text: "Members must adhere to all posted club rules and regulations while using 365 Fitness facilities. This includes but is not limited to proper attire, equipment usage, and hygiene standards." },
      { label: "2.2 Equipment Usage", text: "Members are responsible for using gym equipment safely and appropriately. Failure to do so may result in injury or damage to property, for which 365 Fitness is not liable." },
      { label: "2.3 Personal Belongings", text: "365 Fitness is not responsible for lost or stolen personal belongings. Members are encouraged to secure their valuables in provided lockers." },
    ],
  },
  {
    id: "health-safety",
    title: "Health and Safety",
    icon: HeartPulse,
    items: [
      { label: "3.1 Physical Condition", text: "Members should consult with a medical professional before beginning any exercise program. 365 Fitness staff are not medical professionals and cannot provide medical advice." },
      { label: "3.2 Personal Safety", text: "Members are responsible for their own safety while using 365 Fitness facilities. In case of injury or medical emergency, members should seek assistance immediately." },
      { label: "3.3 Cleanliness", text: "Members are expected to maintain personal hygiene and cleanliness while using 365 Fitness facilities. Towels and sanitation stations are provided for this purpose." },
    ],
  },
  {
    id: "payments-fees",
    title: "Payments and Fees",
    icon: CreditCard,
    items: [
      { label: "4.1 Membership Fees", text: "Membership fees are outlined in the membership agreement and are subject to change with notice." },
      { label: "4.2 Payment Methods", text: "Members must provide valid payment information and authorize recurring payments for membership dues. Failure to pay may result in suspension or termination of membership." },
      { label: "4.3 All Sales Are Final", text: "Except where otherwise required by applicable law, all fees and payments for memberships, classes, personal training, coaching, promotions, and any other packages are final and strictly non-refundable. No refund or credit will be provided for any used, partially used, unused, frozen, or expired portion of a package." },
      { label: "4.4 No Exchanges or Package Changes", text: "Once a package or membership has been purchased or activated, it cannot be exchanged for, converted to, upgraded to, downgraded to, or replaced with another package or membership plan." },
      { label: "4.5 Non-Transferable", text: "All memberships and packages are personal to the registered member and may not be transferred, assigned, shared, resold, or changed into another person’s name." },
    ],
  },
  {
    id: "conduct-discipline",
    title: "Conduct and Discipline",
    icon: Users,
    items: [
      { label: "5.1 Respectful Behavior", text: "Members must treat staff and fellow members with respect and courtesy. Discriminatory, harassing, or otherwise inappropriate behavior will not be tolerated." },
      { label: "5.2 Disciplinary Action", text: "365 Fitness reserves the right to suspend or terminate membership for violations of these Terms or club rules, at its sole discretion." },
    ],
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    icon: LockKeyhole,
    items: [
      { label: "6.1 Personal Information", text: "365 Fitness collects and processes personal information in accordance with its Privacy Policy, available on the club's website." },
      { label: "6.2 Communication", text: "By signing up for membership, you agree to receive communications from 365 Fitness, including promotional offers and updates related to the Services." },
    ],
  },
  {
    id: "amendments",
    title: "Amendments and Modifications",
    icon: RefreshCw,
    items: [
      { label: "7.1 Changes to Terms", text: "365 Fitness reserves the right to modify or update these Terms at any time. Notice of such changes will be provided through the club's website or via email to members." },
      { label: "7.2 Continued Use", text: "Your continued use of the Services after any modifications to these Terms constitutes acceptance of the updated Terms." },
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law and Jurisdiction",
    icon: Scale,
    items: [
      { label: "8.1 Governing Law", text: "These Terms are governed by the laws of the UAE, without regard to its conflict of laws principles." },
      { label: "8.2 Jurisdiction", text: "Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Jurisdiction." },
    ],
  },
  {
    id: "membership-cancellation",
    title: "Membership Cancellation",
    icon: CalendarX2,
    items: [
      { label: "9.1 Eligibility", text: "Early membership cancellation is available only to members who have entered into a twelve (12) month annual membership commitment. An annual membership paid by monthly instalments remains a twelve-month subscription and is subject to the same cancellation requirements." },
      { label: "9.2 Notice Period and Continuing Payments", text: "An eligible member must provide three (3) full months’ written notice. The notice period begins when 365 Fitness receives a valid cancellation request. All membership fees and monthly instalments remain payable throughout the notice period, and the membership will end only after that period has been completed and the cancellation has been approved." },
      { label: "9.3 Other Packages", text: "Monthly, short-term, promotional, class, personal training, coaching, and all other packages that are not a twelve-month annual membership commitment are not eligible for cancellation." },
      { label: "9.4 No Refund, Exchange, Credit, or Transfer", text: "Cancellation does not entitle a member to a refund, exchange, credit, package change, or transfer of any amount already paid or any unused portion of a membership or package, except where otherwise required by applicable law." },
      { label: "9.5 Automatic Deductions", text: "After the approved cancellation effective date, any payment collected solely because of an automatic deduction or system error will be reviewed and, once verified, refunded by 365 Fitness." },
      { label: "9.6 Authorized Request", text: "The cancellation request must be made by the registered member or membership account holder. A cardholder or payee who is not the registered member may not submit the request on the member’s behalf." },
      { label: "9.7 Process", text: "All cancellation requests must be submitted in writing or by email to the club’s administration. A request is not effective until it has been reviewed and approved, and written confirmation has been issued by 365 Fitness." },
    ],
  },
];

const TermsAndConditions = () => (
  <div className="min-h-screen bg-background">
    <PageSeo
      title="Terms & Conditions | 365 Fitness Dubai"
      description="Read the terms and conditions governing memberships, gym access, payments, safety, conduct, cancellations, and services at 365 Fitness Dubai."
      canonical="https://www.365fitness.ae/terms"
    />
    <Header />

    <main>
      <section className="relative overflow-hidden border-b border-primary/20 bg-[#07111f] pb-16 pt-36 md:pb-20 md:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,204,0,0.18),transparent_30%),radial-gradient(circle_at_85%_90%,rgba(255,204,0,0.08),transparent_25%)]" />
        <div className="absolute -right-28 top-12 h-80 w-80 rounded-full border border-primary/10" />
        <div className="absolute -right-16 top-24 h-56 w-56 rounded-full border border-primary/10" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.16em] text-primary">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Legal information
            </div>
            <h1 className="mb-5 text-4xl font-black leading-tight text-foreground sm:text-5xl md:text-6xl">
              Terms <span className="text-primary">&amp; Conditions</span>
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              These Terms govern your access to and use of the services provided by 365 Fitness Body Building Club Co. Please read them carefully before using our facilities or services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 rounded-2xl border border-primary/25 bg-primary/[0.06] p-5 md:p-7">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="mb-2 text-lg font-bold text-foreground">Your agreement with 365 Fitness</h2>
                <p className="leading-relaxed text-muted-foreground">
                  By accessing or using our gym facilities, fitness classes, personal training, or any other services offered by 365 Fitness (collectively, the “Services”), you agree to be bound by these Terms.
                </p>
              </div>
            </div>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-12">
            <aside className="lg:sticky lg:top-28">
              <nav aria-label="Terms and conditions sections" className="rounded-2xl border border-border bg-card p-4 shadow-lg shadow-black/10 md:p-5">
                <p className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">On this page</p>
                <ol className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
                  {TERM_SECTIONS.map((section, index) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="group flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">{index + 1}</span>
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="space-y-6">
              {TERM_SECTIONS.map((section, index) => {
                const Icon = section.icon;
                return (
                  <article key={section.id} id={section.id} className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-lg shadow-black/10 transition-colors hover:border-primary/30 md:p-8">
                    <div className="mb-6 flex items-start gap-4 border-b border-border pb-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">Section {index + 1}</p>
                        <h2 className="text-xl font-bold text-foreground md:text-2xl">{section.title}</h2>
                      </div>
                    </div>
                    {section.note ? <p className="mb-5 rounded-lg border-l-2 border-primary bg-secondary/60 px-4 py-3 text-sm italic leading-relaxed text-muted-foreground">{section.note}</p> : null}
                    <div className="space-y-5">
                      {section.items.map((item) => (
                        <div key={item.label}>
                          <h3 className="mb-1.5 text-base font-bold text-foreground">{item.label}</h3>
                          <p className="leading-7 text-muted-foreground">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}

              <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6 md:p-8">
                <h2 className="mb-3 text-xl font-bold text-foreground">Acceptance of these Terms</h2>
                <p className="leading-7 text-muted-foreground">
                  By accessing or using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services provided by 365 Fitness Body Building Club Co.
                </p>
                <a href="mailto:info@365fitness.ae" className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  Questions? Contact us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
    <WhatsAppButton />
  </div>
);

export default TermsAndConditions;
