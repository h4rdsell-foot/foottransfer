import { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  CreditCard,
  Coins,
  ExternalLink,
  Gem,
  HeartHandshake,
  Home,
  Info,
  LineChart,
  MapPin,
  Menu,
  MoreHorizontal,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserRound,
  UsersRound,
  WalletCards,
  X,
} from "lucide-react";

type ViewMode = "overview" | "earnings";
type BookingStatus = "Confirmed" | "Awaiting arrival" | "Completed";

type Booking = {
  id: number;
  name: string;
  initials: string;
  service: string;
  time: string;
  location: string;
  amount: string;
  status: BookingStatus;
  tone: string;
};

const bookings: Booking[] = [
  {
    id: 1,
    name: "Avery Collins",
    initials: "AC",
    service: "Restorative foot soak",
    time: "9:30–10:45 AM",
    location: "Hyde Park · 2.4 mi",
    amount: "$92.00",
    status: "Confirmed",
    tone: "bg-[#e7eef1] text-[#45646d]",
  },
  {
    id: 2,
    name: "Jordan Lee",
    initials: "JL",
    service: "Gel pedicure + massage",
    time: "1:00–2:30 PM",
    location: "Tarrytown · 4.1 mi",
    amount: "$118.00",
    status: "Awaiting arrival",
    tone: "bg-[#f5e4dc] text-[#9e5f4f]",
  },
  {
    id: 3,
    name: "Sofia Ramirez",
    initials: "SR",
    service: "Quiet-care foot ritual",
    time: "5:30–6:45 PM",
    location: "Zilker · 3.8 mi",
    amount: "$86.00",
    status: "Confirmed",
    tone: "bg-[#e8e8d9] text-[#63745d]",
  },
];

const monthlyBars = [
  { month: "Jan", value: 49 },
  { month: "Feb", value: 63 },
  { month: "Mar", value: 56 },
  { month: "Apr", value: 77 },
  { month: "May", value: 71 },
  { month: "Jun", value: 89 },
  { month: "Jul", value: 76 },
];

function Pill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.11em] ${className}`}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#817c85]">
      {children}
    </div>
  );
}

function StatCard({
  eyebrow,
  value,
  detail,
  icon: Icon,
  accent,
  trend,
}: {
  eyebrow: string;
  value: string;
  detail: string;
  icon: typeof WalletCards;
  accent: string;
  trend?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[20px] border border-[#e8e3dc] bg-[#fffdfa] p-4 shadow-[0_7px_24px_rgba(75,54,67,0.045)] transition-transform duration-300 hover:-translate-y-0.5">
      <div className={`mb-6 flex h-9 w-9 items-center justify-center rounded-[11px] ${accent}`}>
        <Icon size={17} strokeWidth={1.8} />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b858d]">{eyebrow}</p>
      <p className="mt-1 font-['DM_Sans'] text-[26px] font-bold tracking-[-0.055em] text-[#30263d]">{value}</p>
      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#7a747e]">
        {trend && <span className="font-semibold text-[#67806f]">{trend}</span>}
        <span>{detail}</span>
      </div>
      <div className="absolute -bottom-7 -right-7 h-20 w-20 rounded-full bg-[#f8efe9] opacity-70 transition-transform duration-500 group-hover:scale-125" />
    </div>
  );
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    Confirmed: "bg-[#edf2e9] text-[#5a795e]",
    "Awaiting arrival": "bg-[#fff0e8] text-[#a9604b]",
    Completed: "bg-[#e9eef1] text-[#58727a]",
  };
  return (
    <Pill className={styles[status]}>
      {status === "Confirmed" ? <Check size={11} /> : status === "Completed" ? <BadgeCheck size={11} /> : <Clock3 size={11} />}
      {status}
    </Pill>
  );
}

function BookingRow({
  booking,
  onAcknowledge,
}: {
  booking: Booking;
  onAcknowledge: (id: number) => void;
}) {
  const [acknowledged, setAcknowledged] = useState(false);
  const isAwaiting = booking.status === "Awaiting arrival" && !acknowledged;
  return (
    <div className="flex flex-col gap-3 border-b border-[#eee9e3] py-4 last:border-0 sm:flex-row sm:items-center sm:gap-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${booking.tone}`}>
        {booking.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[13px] font-bold text-[#30263d]">{booking.name}</p>
          <StatusBadge status={acknowledged ? "Completed" : booking.status} />
        </div>
        <p className="mt-0.5 truncate text-[11px] text-[#77717b]">{booking.service}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#928b91]">
          <span className="inline-flex items-center gap-1"><Clock3 size={11} />{booking.time}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={11} />{booking.location}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 pl-14 sm:block sm:pl-0 sm:text-right">
        <div>
          <p className="text-[13px] font-bold text-[#30263d]">{booking.amount}</p>
          <p className="text-[10px] text-[#9a9298]">net after fees</p>
        </div>
        {isAwaiting ? (
          <button
            onClick={() => {
              setAcknowledged(true);
              onAcknowledge(booking.id);
            }}
            className="rounded-lg border border-[#ddc3b8] bg-[#fff8f3] px-2.5 py-1.5 text-[10px] font-bold text-[#a15d4d] transition-colors hover:bg-[#f6e5dc]"
          >
            Acknowledge
          </button>
        ) : acknowledged ? (
          <span className="text-[10px] font-semibold text-[#6a806f]">Update saved</span>
        ) : null}
      </div>
    </div>
  );
}

function ComparisonPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#30263d]/25 p-0 backdrop-blur-[2px] sm:items-center sm:p-6">
      <div className="max-h-[90dvh] w-full max-w-[690px] overflow-y-auto rounded-t-[28px] border border-[#eee7df] bg-[#fffdfa] shadow-[0_24px_80px_rgba(48,38,61,0.2)] sm:rounded-[28px]">
        <div className="flex items-start justify-between border-b border-[#eee8e0] p-5 sm:p-7">
          <div>
            <Pill className="bg-[#e7e5f0] text-[#665b7a]"><Gem size={11} /> FootTransfer plans</Pill>
            <h2 className="mt-3 font-['Instrument_Serif'] text-[34px] leading-none text-[#30263d]">Keep more of your work.</h2>
            <p className="mt-2 max-w-[430px] text-[12px] leading-relaxed text-[#77717b]">A simple plan for a steadier practice. Compare what Pro unlocks before you decide.</p>
          </div>
          <button aria-label="Close plan comparison" onClick={onClose} className="rounded-full p-2 text-[#847d86] transition-colors hover:bg-[#f1ece7]"><X size={18} /></button>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7">
          <div className="rounded-[20px] border border-[#eae3dc] bg-[#fbf9f5] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#89828c]">Essentials</p>
            <p className="mt-2 text-[25px] font-bold tracking-[-0.05em] text-[#30263d]">$0<span className="text-[12px] font-medium text-[#89828c]"> / month</span></p>
            <p className="mt-2 text-[11px] leading-relaxed text-[#77717b]">A thoughtful starting point for building your profile.</p>
            <div className="my-5 h-px bg-[#e8e0d8]" />
            {["Marketplace profile", "Booking calendar", "14% booking commission"].map((item) => (
              <div key={item} className="mb-3 flex items-center gap-2 text-[11px] text-[#68616c]"><Check size={13} className="text-[#8a9b87]" />{item}</div>
            ))}
            <button onClick={onClose} className="mt-3 w-full rounded-xl border border-[#d9d0c8] py-2.5 text-[11px] font-bold text-[#504758]">Keep Essentials</button>
          </div>
          <div className="relative overflow-hidden rounded-[20px] border border-[#786b86] bg-[#392f49] p-5 text-[#fffaf5] shadow-[0_12px_30px_rgba(57,47,73,0.16)]">
            <div className="absolute right-4 top-4"><Pill className="bg-[#d5e1d4] text-[#58705c]">Current plan</Pill></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#c9c0ce]">Pro</p>
            <p className="mt-2 text-[25px] font-bold tracking-[-0.05em]">$29<span className="text-[12px] font-medium text-[#c9c0ce]"> / month</span></p>
            <p className="mt-2 text-[11px] leading-relaxed text-[#ded6dc]">For providers ready to make their practice more discoverable.</p>
            <div className="my-5 h-px bg-[#63586e]" />
            {["Everything in Essentials", "12% booking commission", "Featured listing eligibility", "Repeat-client rebook prompts"].map((item) => (
              <div key={item} className="mb-3 flex items-center gap-2 text-[11px] text-[#f2ebee]"><Check size={13} className="text-[#b9d0bc]" />{item}</div>
            ))}
            <button onClick={onClose} className="mt-3 w-full rounded-xl bg-[#f1c9b8] py-2.5 text-[11px] font-bold text-[#4b3541] transition-colors hover:bg-[#f7d5c8]">Stay on Pro</button>
          </div>
        </div>
        <div className="mx-5 mb-5 rounded-xl bg-[#f5efe9] px-4 py-3 text-[10px] leading-relaxed text-[#766f77] sm:mx-7 sm:mb-7">
          <Info size={13} className="mr-1 inline-block align-[-2px] text-[#9b6f62]" /> Both plans include transparent payment processing: 2.9% + $0.30 per booking, shown before you accept.
        </div>
      </div>
    </div>
  );
}

export function ProviderDashboard() {
  const [view, setView] = useState<ViewMode>("overview");
  const [showPlans, setShowPlans] = useState(false);
  const [featured, setFeatured] = useState(true);
  const [acknowledged, setAcknowledged] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-[#f7f5f0] font-['DM_Sans'] text-[#30263d]">
      <style>{`
        @keyframes fade-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .ft-enter { animation: fade-up .5s ease-out both; }
        .ft-delay-1 { animation-delay: .06s; } .ft-delay-2 { animation-delay: .12s; } .ft-delay-3 { animation-delay: .18s; }
        .ft-scroll::-webkit-scrollbar { width: 6px; } .ft-scroll::-webkit-scrollbar-thumb { background: #ddd3cd; border-radius: 20px; }
      `}</style>
      <div className="flex min-h-[100dvh]">
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-[#e9e2dc] bg-[#fcfaf7] px-5 py-6 transition-transform duration-300 lg:static lg:translate-x-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#e5ddea] text-[#615273]"><HeartHandshake size={19} strokeWidth={1.8} /></div>
            <div><p className="text-[15px] font-extrabold tracking-[-0.04em] text-[#30263d]">FootTransfer</p><p className="text-[9px] uppercase tracking-[0.15em] text-[#9a9197]">Provider studio</p></div>
          </div>
          <div className="mt-10 space-y-1">
            {[
              { icon: Home, label: "Overview", active: true },
              { icon: CalendarDays, label: "Bookings", count: "3" },
              { icon: WalletCards, label: "Earnings" },
              { icon: UserRound, label: "My profile" },
            ].map(({ icon: Icon, label, active, count }) => (
              <button key={label} onClick={() => { if (label === "Earnings") setView("earnings"); else if (label === "Overview") setView("overview"); setMobileNav(false); }} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[12px] font-semibold transition-colors ${active && view === "overview" || label === "Earnings" && view === "earnings" ? "bg-[#ede8f1] text-[#554666]" : "text-[#837b83] hover:bg-[#f3eee9] hover:text-[#4e4654]"}`}>
                <span className="flex items-center gap-3"><Icon size={16} strokeWidth={1.8} />{label}</span>
                {count && <span className="rounded-full bg-[#f3d5c7] px-1.5 py-0.5 text-[9px] text-[#9e5b4d]">{count}</span>}
              </button>
            ))}
          </div>
          <div className="mt-auto rounded-[18px] bg-[#f0ebe6] p-4">
            <div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[#867d83]">Your reach</p><TrendingUp size={14} className="text-[#69806d]" /></div>
            <p className="mt-2 text-[21px] font-bold tracking-[-0.05em] text-[#4c4354]">+18.4%</p>
            <p className="mt-1 text-[10px] leading-relaxed text-[#847b82]">More profile views than last month.</p>
            <button onClick={() => setView("earnings")} className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-[#6a596f]">View insights <ArrowUpRight size={12} /></button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex h-[72px] items-center justify-between border-b border-[#e9e3dc] bg-[#f9f7f3]/90 px-4 backdrop-blur sm:px-7 lg:px-10">
            <div className="flex items-center gap-3">
              <button aria-label="Open navigation" onClick={() => setMobileNav(true)} className="rounded-lg p-2 text-[#655c68] hover:bg-[#eee8e3] lg:hidden"><Menu size={20} /></button>
              <div className="lg:hidden"><p className="text-[14px] font-extrabold tracking-[-0.04em]">FootTransfer</p></div>
              <div className="hidden lg:block"><p className="text-[11px] uppercase tracking-[0.14em] text-[#958d92]">Tuesday, June 18, 2024</p><p className="mt-0.5 text-[15px] font-bold">Good morning, Maya</p></div>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-4">
              <button aria-label="Help" className="hidden rounded-full p-2 text-[#898189] transition-colors hover:bg-[#eee8e3] sm:block"><CircleHelp size={18} /></button>
              <button aria-label="Notifications" className="relative rounded-full p-2 text-[#898189] transition-colors hover:bg-[#eee8e3]"><Bell size={18} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#c67963]" /></button>
              <div className="h-7 w-px bg-[#e4ddd7]" />
              <button className="flex items-center gap-2 rounded-full transition-colors hover:bg-[#eee8e3] sm:pr-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d9e2dd] text-[11px] font-bold text-[#526b5d]">MT</div>
                <span className="hidden text-[11px] font-bold sm:block">Maya Thompson</span><ChevronDown size={13} className="hidden text-[#8d858b] sm:block" />
              </button>
            </div>
          </header>

          <div className="ft-scroll max-h-[calc(100dvh-72px)] overflow-y-auto px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
            <div className="mx-auto max-w-[1260px]">
              <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div className="ft-enter">
                  <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a6d61]"><span className="h-1.5 w-1.5 rounded-full bg-[#c77862]" /> Tuesday rhythm</p>
                  <h1 className="font-['Instrument_Serif'] text-[39px] leading-[0.95] tracking-[-0.035em] text-[#30263d] sm:text-[46px]">Your studio, <em className="text-[#aa6d64]">in motion.</em></h1>
                  <p className="mt-3 max-w-[470px] text-[12px] leading-relaxed text-[#7d767e]">A calm view of what is booked, what is earning, and where your next regular is coming from.</p>
                </div>
                <div className="flex items-center gap-1 rounded-xl border border-[#e5ded7] bg-[#fdfbf8] p-1 shadow-sm">
                  <button onClick={() => setView("overview")} className={`rounded-lg px-3.5 py-2 text-[11px] font-bold transition-all ${view === "overview" ? "bg-[#3c3049] text-[#fffaf5] shadow-[0_3px_10px_rgba(60,48,73,0.16)]" : "text-[#877e86] hover:text-[#51465a]"}`}>Overview</button>
                  <button onClick={() => setView("earnings")} className={`rounded-lg px-3.5 py-2 text-[11px] font-bold transition-all ${view === "earnings" ? "bg-[#3c3049] text-[#fffaf5] shadow-[0_3px_10px_rgba(60,48,73,0.16)]" : "text-[#877e86] hover:text-[#51465a]"}`}>Earnings</button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="ft-enter ft-delay-1"><StatCard eyebrow="June net earnings" value="$1,842.60" detail="after platform + payout fees" trend="+12.8%" icon={WalletCards} accent="bg-[#e4eee8] text-[#5b7866]" /></div>
                <div className="ft-enter ft-delay-1"><StatCard eyebrow="Upcoming bookings" value="08" detail="3 happening today" icon={CalendarDays} accent="bg-[#eee8f2] text-[#6d5c7e]" /></div>
                <div className="ft-enter ft-delay-2"><StatCard eyebrow="Repeat clients" value="64%" detail="of your bookings this month" trend="+6.1%" icon={Repeat2} accent="bg-[#f5e4db] text-[#a26454]" /></div>
                <div className="ft-enter ft-delay-2"><StatCard eyebrow="Provider rating" value="4.96" detail="from 47 reviews" icon={Star} accent="bg-[#f1eddc] text-[#9a7b40]" /></div>
              </div>

              {view === "earnings" ? (
                <div className="ft-enter mt-6 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
                  <section className="rounded-[22px] border border-[#e8e1da] bg-[#fffdfa] p-5 shadow-[0_7px_24px_rgba(75,54,67,0.045)] sm:p-6">
                    <div className="flex items-start justify-between">
                      <div><SectionLabel><LineChart size={13} className="text-[#a56b61]" /> Earnings overview</SectionLabel><h2 className="text-[18px] font-bold tracking-[-0.035em]">Net earnings by month</h2><p className="mt-1 text-[11px] text-[#888089]">Your take-home after a 12% booking commission and payout fees.</p></div>
                      <button className="flex items-center gap-1 rounded-lg border border-[#e7dfd8] px-2.5 py-1.5 text-[10px] font-bold text-[#766d78]">2024 <ChevronDown size={12} /></button>
                    </div>
                    <div className="mt-8 flex h-[220px] items-end gap-2 border-b border-l border-[#eee8e2] px-3 pb-0 pt-5 sm:gap-5">
                      {monthlyBars.map((bar, index) => <div key={bar.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="relative flex w-full flex-1 items-end"><div className={`w-full rounded-t-[7px] transition-all duration-500 ${index === 6 ? "bg-[#ab7066]" : "bg-[#d9e5dd] hover:bg-[#c8d9ce]"}`} style={{ height: `${bar.value}%` }}><span className="sr-only">{bar.value}</span></div></div><span className="pb-2 text-[10px] text-[#8d858b]">{bar.month}</span></div>)}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-[11px] text-[#766f77]"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#ab7066]" />Current month <strong className="text-[#3e3448]">$1,842.60</strong></span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-[#d9e5dd]" />Average <strong className="text-[#3e3448]">$1,328.40</strong></span></div>
                  </section>
                  <section className="rounded-[22px] bg-[#3e334c] p-5 text-[#fffaf6] shadow-[0_8px_24px_rgba(65,51,77,0.13)] sm:p-6">
                    <SectionLabel><CreditCard size={13} className="text-[#dec4b7]" /> Transparent payout math</SectionLabel>
                    <p className="mt-5 font-['Instrument_Serif'] text-[31px] leading-none">Every dollar, accounted for.</p>
                    <div className="mt-6 space-y-4 text-[11px]">
                      <div className="flex justify-between text-[#cec5cf]"><span>Gross booking value</span><strong className="text-[#fffaf6]">$2,064.00</strong></div>
                      <div className="flex justify-between text-[#cec5cf]"><span>Pro commission <span className="text-[#afa2b1]">(12%)</span></span><strong className="text-[#f2c2b1]">− $247.68</strong></div>
                      <div className="flex justify-between text-[#cec5cf]"><span>Payout processing <span className="text-[#afa2b1]">(2.9% + $0.30)</span></span><strong className="text-[#f2c2b1]">− $61.72</strong></div>
                      <div className="h-px bg-[#685b70]" />
                      <div className="flex justify-between text-[13px] font-bold"><span>Estimated net</span><span className="text-[#d8e4d6]">$1,754.60</span></div>
                    </div>
                    <button onClick={() => setShowPlans(true)} className="mt-7 flex items-center gap-1 text-[10px] font-bold text-[#efc7b8] hover:text-[#fffaf6]">Compare plan fees <ChevronRight size={13} /></button>
                  </section>
                </div>
              ) : (
                <div className="mt-6 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
                  <section className="ft-enter ft-delay-2 rounded-[22px] border border-[#e8e1da] bg-[#fffdfa] p-5 shadow-[0_7px_24px_rgba(75,54,67,0.045)] sm:p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div><SectionLabel><CalendarDays size={13} className="text-[#a56b61]" /> Today’s route</SectionLabel><h2 className="text-[18px] font-bold tracking-[-0.035em]">Three good appointments ahead.</h2><p className="mt-1 text-[11px] text-[#888089]">Tuesday, June 18 · Austin, TX</p></div>
                      <button className="flex w-fit items-center gap-1 rounded-lg border border-[#e7dfd8] px-2.5 py-1.5 text-[10px] font-bold text-[#766d78]">Open calendar <ExternalLink size={11} /></button>
                    </div>
                    <div className="mt-3">{bookings.map((booking) => <BookingRow key={booking.id} booking={booking} onAcknowledge={() => setAcknowledged(true)} />)}</div>
                    {acknowledged && <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#edf4ed] px-3 py-2.5 text-[10px] font-semibold text-[#5c775f]"><Check size={14} /> Arrival update saved. Jordan will see your studio is ready.</div>}
                  </section>
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
                    <section className="ft-enter ft-delay-2 rounded-[22px] border border-[#e8e1da] bg-[#fffdfa] p-5 shadow-[0_7px_24px_rgba(75,54,67,0.045)] sm:p-6">
                      <div className="flex items-start justify-between"><div><SectionLabel><ShieldCheck size={13} className="text-[#65806b]" /> Trust & visibility</SectionLabel><h2 className="text-[16px] font-bold tracking-[-0.035em]">You’re ready to be found.</h2></div><Pill className="bg-[#e5eee6] text-[#5d7963]"><BadgeCheck size={11} /> Verified</Pill></div>
                      <div className="mt-4 space-y-3">
                        <div className="flex items-center justify-between rounded-xl bg-[#f6f2ed] p-3"><div className="flex items-center gap-2.5"><div className="rounded-lg bg-[#e5eee6] p-2 text-[#618069]"><BadgeCheck size={15} /></div><div><p className="text-[11px] font-bold">Identity verified</p><p className="text-[10px] text-[#8c848b]">Austin provider · approved</p></div></div><Check size={15} className="text-[#66816b]" /></div>
                        <div className="flex items-center justify-between rounded-xl bg-[#f6f2ed] p-3"><div className="flex items-center gap-2.5"><div className="rounded-lg bg-[#f1e8df] p-2 text-[#a7735d]"><Star size={15} /></div><div><p className="text-[11px] font-bold">Top-rated provider</p><p className="text-[10px] text-[#8c848b]">4.96 rating · 47 reviews</p></div></div><ChevronRight size={15} className="text-[#958b91]" /></div>
                        <div className="flex items-center justify-between rounded-xl bg-[#f6f2ed] p-3"><div className="flex items-center gap-2.5"><div className="rounded-lg bg-[#eee8f2] p-2 text-[#705d7e]"><Coins size={15} /></div><div><p className="text-[11px] font-bold">Lead credits</p><p className="text-[10px] text-[#8c848b]">Coming soon · earn credits from referrals</p></div></div><Pill className="bg-[#e9e2ed] text-[#75667e]">Soon</Pill></div>
                      </div>
                    </section>
                    <section className="ft-enter ft-delay-3 relative overflow-hidden rounded-[22px] border border-[#e8e1da] bg-[#ede9f1] p-5 shadow-[0_7px_24px_rgba(75,54,67,0.04)] sm:p-6">
                      <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-[#e1d7e9]" />
                      <div className="relative flex items-start justify-between"><div><SectionLabel><Sparkles size={13} className="text-[#9e6a61]" /> Featured listing</SectionLabel><h2 className="text-[16px] font-bold tracking-[-0.035em]">Be the first hello.</h2><p className="mt-1 max-w-[260px] text-[10px] leading-relaxed text-[#776e7c]">Eligible Pro providers appear higher when a client searches your Austin neighborhoods.</p></div><button aria-label="Toggle featured listing" onClick={() => setFeatured(!featured)} className={`relative mt-1 h-6 w-11 shrink-0 rounded-full p-1 transition-colors ${featured ? "bg-[#6b5a78]" : "bg-[#c4bcc5]"}`}><span className={`block h-4 w-4 rounded-full bg-[#fffaf6] shadow-sm transition-transform ${featured ? "translate-x-5" : "translate-x-0"}`} /></button></div>
                      <div className="relative mt-5 flex items-center justify-between border-t border-[#d8cedd] pt-3"><span className="text-[10px] font-semibold text-[#766d7c]">{featured ? "Featured is on" : "Featured is off"}</span><span className="text-[10px] text-[#9a8fa0]">Pro benefit</span></div>
                    </section>
                  </div>
                </div>
              )}

              <div className="mt-5 grid gap-5 lg:grid-cols-[.95fr_1.05fr]">
                <section className="rounded-[22px] border border-[#e8e1da] bg-[#fffdfa] p-5 shadow-[0_7px_24px_rgba(75,54,67,0.045)] sm:p-6">
                  <div className="flex items-start justify-between"><div><SectionLabel><UsersRound size={13} className="text-[#a56b61]" /> Your next regular</SectionLabel><h2 className="text-[17px] font-bold tracking-[-0.035em]">A small nudge can bring Sofia back.</h2></div><MoreHorizontal size={17} className="text-[#a49ba0]" /></div>
                  <div className="mt-4 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8e8d9] text-[11px] font-bold text-[#65735e]">SR</div><div className="flex-1"><p className="text-[12px] font-bold">Sofia Ramirez</p><p className="text-[10px] text-[#888089]">Last visit 4 weeks ago · $86 average</p></div><div className="text-right"><p className="text-[13px] font-bold text-[#4d4354]">92%</p><p className="text-[9px] uppercase tracking-[0.1em] text-[#8d858b]">likely to rebook</p></div></div>
                  <div className="mt-4 rounded-xl bg-[#f7f0eb] p-3 text-[10px] leading-relaxed text-[#786e75]"><Repeat2 size={14} className="mr-1 inline-block align-[-3px] text-[#a26859]" /> Her usual four-week window opens this week. A personal note feels right.</div>
                  <button onClick={() => window.alert("Rebook note prepared for Sofia Ramirez.")} className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[#8f5f55] hover:text-[#69434a]">Prepare rebook note <ChevronRight size={13} /></button>
                </section>
                <section className="flex flex-col justify-between rounded-[22px] bg-[#3e334c] p-5 text-[#fffaf6] shadow-[0_8px_24px_rgba(65,51,77,0.13)] sm:p-6">
                  <div className="flex items-start justify-between"><div><SectionLabel><CreditCard size={13} className="text-[#e0c2b4]" /> Your Pro plan</SectionLabel><h2 className="font-['Instrument_Serif'] text-[28px] leading-none">A steadier way to grow.</h2></div><Pill className="bg-[#d8e6d8] text-[#5a745f]"><Check size={11} /> Active</Pill></div>
                  <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[#65586d] py-4 text-[11px]"><div><p className="text-[#b9afbc]">Commission</p><p className="mt-1 font-bold text-[#fffaf6]">12% <span className="font-normal text-[#b9afbc]">per booking</span></p></div><div><p className="text-[#b9afbc]">Renews</p><p className="mt-1 font-bold text-[#fffaf6]">July 08, 2024</p></div></div>
                  <div className="mt-4 flex items-center justify-between"><p className="text-[10px] text-[#bdb3bf]">$29 / month · payment method ending 4242</p><button onClick={() => setShowPlans(true)} className="flex items-center gap-1 text-[10px] font-bold text-[#efc7b8] hover:text-[#fffaf6]">View plans <ChevronRight size={13} /></button></div>
                </section>
              </div>

              <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-[#e7e0d9] py-5 text-[10px] text-[#948b91] sm:flex-row sm:items-center"><p className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-[#6c846f]" /> Payments are held securely until each appointment is complete.</p><p>FootTransfer provider studio · Austin, TX</p></div>
            </div>
          </div>
        </main>
      </div>
      {mobileNav && <button aria-label="Close navigation" onClick={() => setMobileNav(false)} className="fixed inset-0 z-30 bg-[#30263d]/15 lg:hidden" />}
      {showPlans && <ComparisonPanel onClose={() => setShowPlans(false)} />}
    </div>
  );
}

export default ProviderDashboard;