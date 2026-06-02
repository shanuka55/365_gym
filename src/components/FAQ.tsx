import { Link } from "react-router-dom";
import { HelpCircle, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Is 365 Fitness Gym open 24/7?",
    answer:
      "Yes. 365 Fitness Gym gives members 24/7 access, so you can train early morning, late night, or whenever your schedule works.",
  },
  {
    question: "Where are your gym branches located?",
    answer:
      "We currently have branches in Deira Muraqqabat and Muhaisnah First, with easy access for members across Dubai.",
  },
  {
    question: "Do you offer personal training?",
    answer:
      "Yes. Our certified trainers can help with fat loss, muscle building, strength training, boxing, functional fitness, and beginner-friendly workout plans.",
  },
  {
    question: "Can beginners join the gym?",
    answer:
      "Absolutely. Beginners are welcome, and our team can guide you through equipment use, workout structure, and the right membership option.",
  },
  {
    question: "Are group classes included?",
    answer:
      "365 Fitness offers a wide range of group classes. Availability may vary by branch and schedule, so our team can confirm the latest class timing for you.",
  },
  {
    question: "Do you have monthly and annual membership plans?",
    answer:
      "Yes. We offer monthly, annual, and corporate membership plans, with options for different fitness goals and budgets.",
  },
  {
    question: "Can I get a free trial before joining?",
    answer:
      "Yes. You can request a free trial and visit the gym before choosing your membership plan.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const FAQ = () => {
  return (
    <section className="py-20 bg-secondary/10">
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-start max-w-7xl mx-auto">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary font-bold text-sm uppercase tracking-wider mb-5">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-5 uppercase leading-tight">
              Frequently Asked
              <span className="block text-primary">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Quick answers about 365 Fitness Gym memberships, locations, trainers, classes, and free trial access.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="hero" size="lg" className="rounded-full">
                <Link to="/plans/monthly-plans">View Plans</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/contact">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="bg-card border border-border rounded-lg overflow-hidden animate-fade-in"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="border-border px-5 md:px-7 last:border-b-0"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-bold text-foreground hover:text-primary hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
