import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUp, BadgeCheck, CalendarDays, ChevronRight, Clock3, Dumbbell, MapPin, MessageCircle, Minus, RotateCcw, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { enquiryBranches, freeTrialUrl, generalEnquiryUrl } from "@/lib/whatsapp";
import "./GymChatbot.css";

type Topic = "plans" | "hours" | "locations" | "trial" | "training" | "classes" | "fallback";
type Message = { role: "user"; text: string } | { role: "assistant"; topic: Topic };
const answers: Record<Topic, { en: string; ar: string; path?: string }> = {
  plans: { en: "We offer monthly, annual and corporate memberships. Explore our plans below, or ask your branch to confirm the current price and available offers.", ar: "نوفر اشتراكات شهرية وسنوية وللشركات. اكتشف الباقات أدناه أو تواصل مع فرعك لتأكيد الأسعار والعروض المتاحة.", path: "/plans/monthly-plans" },
  hours: { en: "Both our Deira Muraqqabat and Muhaisnah First gyms offer 24/7 member access. For staffed hours and class timings, please check with your branch.", ar: "يوفر فرعا ديرة المرقبات ومحيصنة الأولى دخولاً للأعضاء على مدار الساعة. تواصل مع الفرع لمعرفة أوقات الموظفين والحصص." },
  locations: { en: "Find us in Deira Muraqqabat: MZ 08, Dubai Municipality Building, near Muraqqabat Police Station on Salah Al Din Road. Our Muhaisnah First branch is at Shop 32, Madinat Badr. Choose a branch below to speak to the team.", ar: "فرع ديرة المرقبات: ميزانين 08، مبنى بلدية دبي، قرب مركز شرطة المرقبات، شارع صلاح الدين. فرع محيصنة الأولى: محل 32، مدينة بدر. اختر فرعاً أدناه للتواصل مع الفريق." },
  trial: { en: "You can request a free trial before choosing your membership. Use the link below to arrange your visit with our central team. Your visit is confirmed once the team replies.", ar: "يمكنك طلب تجربة مجانية قبل اختيار اشتراكك. استخدم الرابط أدناه لترتيب الزيارة مع فريقنا المركزي. يتم تأكيد الزيارة بعد رد الفريق." },
  training: { en: "Our certified trainers support beginners, strength training, muscle building, fat loss, boxing and functional fitness. Explore personal training or contact your branch to discuss your goals.", ar: "يساعد مدربونا المعتمدون المبتدئين في تمارين القوة وبناء العضلات وخسارة الدهون والملاكمة واللياقة الوظيفية. اكتشف التدريب الشخصي أو تواصل مع فرعك لمناقشة أهدافك.", path: "/services/personal-training" },
  classes: { en: "We offer group classes, including boxing and functional fitness. Timetables and availability vary by branch. Our team can confirm the current schedule and what your membership includes.", ar: "نوفر حصصاً جماعية تشمل الملاكمة واللياقة الوظيفية. تختلف المواعيد والتوفر حسب الفرع. يمكن لفريقنا تأكيد الجدول الحالي وما يشمله اشتراكك.", path: "/services/group-classes" },
  fallback: { en: "I can help with memberships, opening hours, locations, trainers, classes and free trials. For anything else, choose your branch below and our team will help on WhatsApp.", ar: "يمكنني مساعدتك بخصوص الاشتراكات وأوقات العمل والفروع والمدربين والحصص والتجربة المجانية. لأي استفسار آخر، اختر فرعك أدناه للتواصل مع فريقنا عبر واتساب." },
};

function findTopic(text: string): Topic {
  const value = text.toLowerCase();
  if (/trial|free|visit|تجرب|مجاني/.test(value)) return "trial";
  if (/hour|open|close|timing|24|وقت|ساع|مواعيد/.test(value)) return "hours";
  if (/price|cost|plan|member|package|offer|fee|سعر|أسعار|اشتراك|باق/.test(value)) return "plans";
  if (/location|where|branch|address|deira|muhaisnah|موقع|أين|فرع|عنوان|ديرة|محيصنة/.test(value)) return "locations";
  if (/class|group|yoga|zumba|حصص|جماعي/.test(value)) return "classes";
  if (/train|coach|beginner|box|muscle|weight|مدرب|تدريب|مبتدئ|عضلات/.test(value)) return "training";
  return "fallback";
}

export default function GymChatbot() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<"en" | "ar">(() => i18n.language.startsWith("ar") ? "ar" : "en");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const ar = language === "ar";
  const close = () => { setOpen(false); launcherRef.current?.focus(); };

  useEffect(() => {
    if (!open) return;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) inputRef.current?.focus();
    const viewport = window.visualViewport;
    const updateViewport = () => {
      chatRef.current?.style.setProperty("--chat-viewport-height", `${viewport?.height ?? window.innerHeight}px`);
      chatRef.current?.style.setProperty("--chat-viewport-top", `${viewport?.offsetTop ?? 0}px`);
    };
    updateViewport();
    viewport?.addEventListener("resize", updateViewport);
    viewport?.addEventListener("scroll", updateViewport);
    window.addEventListener("resize", updateViewport);
    return () => {
      viewport?.removeEventListener("resize", updateViewport);
      viewport?.removeEventListener("scroll", updateViewport);
      window.removeEventListener("resize", updateViewport);
    };
  }, [open]);
  useEffect(() => {
    const area = scrollRef.current;
    if (area) area.scrollTop = area.scrollHeight;
  }, [messages, open]);

  const ask = (text: string, topic = findTopic(text)) => {
    if (!text.trim()) return;
    setMessages(previous => [...previous, { role: "user", text: text.trim() }, { role: "assistant", topic }]);
    setInput("");
  };
  const submit = (event: FormEvent) => { event.preventDefault(); ask(input); };
  const questions = [
    { topic: "plans" as const, icon: CalendarDays, text: ar ? "ما هي باقات الاشتراك؟" : "What do your memberships cost?" },
    { topic: "hours" as const, icon: Clock3, text: ar ? "ما هي أوقات عمل النادي؟" : "What are your opening hours?" },
    { topic: "locations" as const, icon: MapPin, text: ar ? "أين تقع فروعكم؟" : "Where can I find your gyms?" },
    { topic: "trial" as const, icon: Dumbbell, text: ar ? "هل يمكنني حجز تجربة مجانية؟" : "Can I book a free trial?" },
  ];

  return <div ref={chatRef} className="gym-chat" dir={ar ? "rtl" : "ltr"}>
    {open && <section id="gym-chat-panel" className="gym-chat-panel" role="dialog" aria-labelledby="gym-chat-title" onKeyDown={event => { if (event.key === "Escape") { event.stopPropagation(); close(); } }}>
      <header className="gym-chat-header">
        <div className="gym-chat-avatar"><Dumbbell size={25} /></div>
        <div className="gym-chat-heading"><h2 id="gym-chat-title">365 Coach <BadgeCheck size={15} /></h2><span><i />{ar ? "مساعد النادي" : "Your gym guide"}</span></div>
        <div className="gym-chat-languages" aria-label="Chat language">
          <button type="button" lang="en" aria-pressed={!ar} onClick={() => setLanguage("en")}>EN</button>
          <button type="button" lang="ar" aria-pressed={ar} onClick={() => setLanguage("ar")}>عربي</button>
        </div>
        <button type="button" className="gym-chat-icon" onClick={close} aria-label={ar ? "تصغير" : "Minimize chat"}><Minus size={18} /></button>
        <button type="button" className="gym-chat-icon" onClick={close} aria-label={ar ? "إغلاق" : "Close chat"}><X size={18} /></button>
      </header>
      <div className="gym-chat-content" ref={scrollRef}>
        <div className="gym-chat-welcome">
          <div className="gym-chat-coach" aria-hidden="true"><Dumbbell size={47} strokeWidth={1.6} /><span>365</span></div>
          <div><p className="gym-chat-eyebrow">LET’S GET STRONGER</p><h3>{ar ? "مرحباً، أنا" : "Hi, I’m"} <span>365 Coach</span></h3><p>{ar ? "أنا هنا لمساعدتك في العثور على الاشتراك المناسب وبدء رحلتك نحو اللياقة." : <>Here to help you find your <strong>perfect membership</strong> and start your fitness journey.</>}</p></div>
        </div>
        <div className="gym-chat-questions">{questions.map(({ topic, icon: Icon, text }) => <button type="button" key={topic} onClick={() => ask(text, topic)}><span className="gym-chat-question-icon"><Icon size={19} /></span><span>{text}</span><ChevronRight size={18} className="gym-chat-chevron" /></button>)}</div>
        <div className="gym-chat-messages" role="log" aria-live="polite" aria-label={ar ? "المحادثة" : "Chat messages"}>
          {messages.map((message, index) => <div key={index} className={`gym-chat-message gym-chat-message-${message.role}`}>
            {message.role === "user" ? message.text : <>
              <span className="gym-chat-message-name"><Dumbbell size={13} />365 Coach</span>
              <p>{answers[message.topic][language]}</p>
              {answers[message.topic].path && <Link className="gym-chat-action" to={answers[message.topic].path!} onClick={close}>{ar ? "عرض التفاصيل" : "Explore options"}<ChevronRight size={14} /></Link>}
              {message.topic === "trial" ? <a className="gym-chat-action" href={freeTrialUrl("Hi 365 Fitness! I'd like to arrange a free trial.")} target="_blank" rel="noopener noreferrer">{ar ? "طلب تجربة مجانية" : "Request a free trial"}<ChevronRight size={14} /></a> : message.topic !== "hours" && Object.entries(enquiryBranches).map(([branch, details]) => <a className="gym-chat-action" key={branch} href={generalEnquiryUrl(branch as keyof typeof enquiryBranches, `Hi 365 Fitness! ${messages[index - 1]?.role === "user" ? (messages[index - 1] as { text: string }).text : "I'd like more information."}`)} target="_blank" rel="noopener noreferrer"><MessageCircle size={14} />{branch === "deira" ? (ar ? "ديرة المرقبات" : "Deira Muraqqabat") : (ar ? "محيصنة الأولى" : "Muhaisnah First")}</a>)}
            </>}
          </div>)}
        </div>
      </div>
      <footer className="gym-chat-footer">
        {messages.length > 0 && <button className="gym-chat-reset" type="button" onClick={() => { setMessages([]); inputRef.current?.focus(); }}><RotateCcw size={12} />{ar ? "محادثة جديدة" : "Start over"}</button>}
        <form onSubmit={submit}><input ref={inputRef} aria-label={ar ? "رسالتك" : "Your message"} placeholder={ar ? "اسأل عن النادي..." : "Ask me about the gym…"} value={input} onChange={event => setInput(event.target.value)} maxLength={500} /><button type="submit" disabled={!input.trim()} aria-label={ar ? "إرسال" : "Send message"}><ArrowUp size={20} /></button></form>
        <p>{ar ? "مساعد الأسئلة الشائعة · " : "FAQ assistant · "}<span>365 FITNESS</span></p>
      </footer>
    </section>}
    <button ref={launcherRef} className="gym-chat-launcher" type="button" aria-label={open ? "Close gym assistant" : "Open gym assistant"} aria-expanded={open} aria-controls="gym-chat-panel" onClick={() => open ? close() : setOpen(true)}>{open ? <X size={25} /> : <><MessageCircle size={25} /><span>{ar ? "اسأل 365" : "Ask 365"}</span><i /></>}</button>
  </div>;
}
