import {
  Baby,
  ChartNoAxesCombined,
  Cookie,
  Database,
  FileClock,
  Handshake,
  LockKeyhole,
  Mail,
  RefreshCw,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageSeo from "@/components/PageSeo";
import WhatsAppButton from "@/components/WhatsAppButton";

type PolicySection = {
  id: string;
  title: string;
  icon: LucideIcon;
  paragraphs?: string[];
  items?: string[];
};

const POLICY_SECTIONS: PolicySection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    icon: Database,
    paragraphs: [
      "We collect information you provide directly when you contact us, request a free pass, enquire about a membership, or complete an agreement.",
    ],
    items: [
      "Contact details, including your name, email address, phone number, and WhatsApp number.",
      "Membership details, including your selected branch, membership type, start date, and digital signature.",
      "Identity and profile details, which may include your date of birth, Emirates ID or other ID number, address, and emergency contact information.",
      "Health information you choose to provide, such as medical notes, injuries, or fitness-related limitations.",
      "Messages, enquiries, feedback, and other information you send to us.",
      "Technical information such as your browser, device information, IP address, pages visited, referral source, and website interaction data.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    icon: UserRoundCheck,
    items: [
      "To respond to enquiries and provide membership, fitness, training, and customer support services.",
      "To create, administer, and maintain membership and trainer agreements.",
      "To contact you by phone, email, or WhatsApp about a request you submitted, service updates, and offers where permitted.",
      "To process payments, manage cancellations, maintain business records, and meet our legal obligations.",
      "To protect members, staff, facilities, and our services from misuse, fraud, or security incidents.",
      "To understand website performance, improve our services, and measure marketing effectiveness.",
    ],
  },
  {
    id: "legal-basis",
    title: "How We Process Information",
    icon: ShieldCheck,
    paragraphs: [
      "We process personal information where it is needed to provide requested services or perform an agreement, where you have given consent, where we have a legitimate business need that does not override your rights, or where processing is required by applicable law.",
      "Where we rely on consent, you may withdraw it at any time. This does not affect processing that took place before withdrawal.",
    ],
  },
  {
    id: "sharing-information",
    title: "How We Share Information",
    icon: Handshake,
    paragraphs: [
      "We do not sell your personal information. We may share only the information needed with trusted service providers that support our website, database hosting, email delivery, analytics, communications, payment processing, and professional services.",
      "We may also disclose information when required by law, to respond to lawful requests, to protect the safety and rights of 365 Fitness or others, or as part of a business restructuring. Service providers are expected to handle information securely and only for the agreed purpose.",
    ],
  },
  {
    id: "cookies-analytics",
    title: "Cookies, Analytics and Advertising",
    icon: Cookie,
    paragraphs: [
      "Our website uses local storage and similar technologies to remember preferences such as your selected language and to support essential site functions. Analytics and advertising tools, including Google services, may use cookies or similar identifiers to measure visits, interactions, and campaign performance.",
      "You can limit cookies using your browser settings or available provider controls. Blocking some technologies may affect website functionality. Embedded services such as Google Maps and links to WhatsApp are governed by the privacy practices of those providers when you use them.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    icon: FileClock,
    paragraphs: [
      "We retain personal information only for as long as reasonably necessary for the purpose it was collected, including providing services, maintaining membership and financial records, resolving disputes, enforcing agreements, and meeting legal or regulatory requirements.",
      "Retention periods vary depending on the type of information and our obligations. When information is no longer required, we take reasonable steps to delete it or make it anonymous.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    icon: LockKeyhole,
    paragraphs: [
      "We use reasonable administrative, technical, and organisational safeguards designed to protect personal information from unauthorised access, loss, misuse, alteration, or disclosure. No internet transmission or storage system can be guaranteed to be completely secure.",
      "Please contact us promptly if you believe information you shared with 365 Fitness has been compromised.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    icon: ChartNoAxesCombined,
    paragraphs: [
      "Subject to applicable law, you may ask us to:",
    ],
    items: [
      "Confirm whether we process your personal information and provide access to it.",
      "Correct information that is inaccurate or incomplete.",
      "Delete information or restrict certain processing where legally available.",
      "Object to certain uses, including direct marketing, or withdraw your consent.",
      "Provide a portable copy of information where the right applies.",
    ],
  },
  {
    id: "children",
    title: "Children’s Privacy",
    icon: Baby,
    paragraphs: [
      "Our memberships and Services are intended for adults unless a minor participates with a legal guardian or with appropriate written consent. A parent or guardian should contact us if they believe a child has provided personal information without proper authorisation.",
    ],
  },
  {
    id: "policy-updates",
    title: "Changes to This Policy",
    icon: RefreshCw,
    paragraphs: [
      "We may update this Privacy Policy to reflect changes to our services, practices, or legal obligations. The latest version will be posted on this page with an updated effective date. We encourage you to review it periodically.",
    ],
  },
];

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <PageSeo
      title="Privacy Policy | 365 Fitness Dubai"
      description="Learn how 365 Fitness Dubai collects, uses, protects, and manages personal information when you use our website, memberships, and fitness services."
      canonical="https://www.365fitness.ae/privacy"
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
              <LockKeyhole className="h-4 w-4" aria-hidden="true" /> Your privacy matters
            </div>
            <h1 className="mb-5 text-4xl font-black leading-tight text-foreground sm:text-5xl md:text-6xl">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              This policy explains how 365 Fitness Body Building Club Co collects, uses, shares, and protects personal information when you use our website and Services.
            </p>
            <p className="mt-5 text-sm font-medium text-foreground/80">Effective date: 24 August 2026</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 rounded-2xl border border-primary/25 bg-primary/[0.06] p-5 md:p-7">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h2 className="mb-2 text-lg font-bold text-foreground">Our commitment</h2>
                <p className="leading-relaxed text-muted-foreground">
                  We aim to collect only the information needed to serve our members and visitors, use it responsibly, and protect it with appropriate safeguards.
                </p>
              </div>
            </div>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-12">
            <aside className="lg:sticky lg:top-28">
              <nav aria-label="Privacy policy sections" className="rounded-2xl border border-border bg-card p-4 shadow-lg shadow-black/10 md:p-5">
                <p className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">On this page</p>
                <ol className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
                  {POLICY_SECTIONS.map((section, index) => (
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
              {POLICY_SECTIONS.map((section, index) => {
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
                    {section.paragraphs ? (
                      <div className="space-y-4">
                        {section.paragraphs.map((paragraph) => <p key={paragraph} className="leading-7 text-muted-foreground">{paragraph}</p>)}
                      </div>
                    ) : null}
                    {section.items ? (
                      <ul className={`${section.paragraphs ? "mt-5" : ""} space-y-3`}>
                        {section.items.map((item) => (
                          <li key={item} className="flex gap-3 leading-7 text-muted-foreground">
                            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                );
              })}

              <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent p-6 md:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Mail className="h-6 w-6" aria-hidden="true" />
                </div>
                <h2 className="mb-3 text-xl font-bold text-foreground">Contact Us About Privacy</h2>
                <p className="leading-7 text-muted-foreground">
                  To ask a question or make a privacy request, contact 365 Fitness at the email below. We may need to verify your identity before completing a request.
                </p>
                <a href="mailto:info@365fitness.ae?subject=Privacy%20Request" className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  info@365fitness.ae
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

export default PrivacyPolicy;
