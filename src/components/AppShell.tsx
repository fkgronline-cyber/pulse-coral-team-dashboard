import { Link } from "@tanstack/react-router";
import { Bell, Search, Truck, LayoutGrid, Boxes, BarChart3, Settings, AlertTriangle, Menu, X, LogOut } from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "الرئيسية", Icon: LayoutGrid },
  { to: "/extracts", label: "المستخلصات", Icon: Boxes },
  { to: "/", label: "الناقلون", Icon: Truck },
  { to: "/reports", label: "تقارير", Icon: BarChart3 },
  { to: "/", label: "الإعدادات", Icon: Settings },
] as const;
const side = [nav[0], nav[1], nav[2], nav[3], { to: "/", label: "المخالفات", Icon: AlertTriangle }, nav[4]] as const;

function SideMenu({ active, onClose }: { active: string; onClose?: () => void }) {
  return (
    <>
      <div className="flex items-center gap-3 px-2">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sunrise shadow-pop"><Truck className="size-5" /></span>
        <div className="min-w-0 flex-1"><p className="font-display text-xl font-bold">ناقل</p><p className="text-xs opacity-70">دفتر الحسابات</p></div>
        {onClose && <button aria-label="إغلاق" onClick={onClose} className="grid size-10 place-items-center rounded-full bg-ink-foreground/10"><X className="size-5" /></button>}
      </div>
      <p className="mt-8 px-3 text-xs opacity-60">مساحة العمل</p>
      <div className="mt-2 space-y-1">
        {side.map(({ to, label, Icon }) => (
          <Link key={label} to={to} onClick={onClose} className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition ${label === active ? "bg-sunrise font-semibold shadow-pop" : "opacity-75 hover:bg-ink-foreground/10 hover:opacity-100"}`}>
            <Icon className="size-5" />{label}
          </Link>
        ))}
      </div>
      <div className="mt-auto space-y-2">
        <div className="flex items-center gap-3 rounded-2xl bg-ink-foreground/10 p-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sunrise font-display">أ</span>
          <div className="min-w-0"><p className="truncate text-sm font-semibold">أبو ضياء</p><p className="truncate text-xs opacity-70">abu.diaa@naql.sa</p></div>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/40 py-3 text-sm font-semibold text-destructive transition hover:bg-destructive/10"><LogOut className="size-4" />تسجيل الخروج</button>
      </div>
    </>
  );
}

export function AppShell({ title, active, children }: { title: string; active: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen pb-32 lg:pb-10 lg:pr-72">
      <aside className="fixed inset-y-3 right-3 z-30 hidden w-64 flex-col rounded-[2rem] bg-road p-5 text-ink-foreground lg:flex">
        <SideMenu active={active} />
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="إغلاق القائمة" onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-in fade-in" />
          <aside className="absolute inset-y-2 right-2 flex w-[82%] max-w-80 flex-col rounded-[2rem] bg-road p-5 text-ink-foreground shadow-pop animate-in slide-in-from-right duration-300">
            <SideMenu active={active} onClose={() => setOpen(false)} />
          </aside>
        </div>
      )}
      <header className="sticky top-0 z-20 overflow-hidden rounded-b-[2rem] bg-banner text-primary-foreground shadow-pop">
        <div className="pointer-events-none absolute -left-10 top-2 size-32 rounded-full border-[14px] border-primary-foreground/10 animate-float" />
        <div className="relative mx-auto flex max-w-5xl items-center justify-between px-5 pb-5 pt-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <button aria-label="القائمة" onClick={() => setOpen(true)} className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-foreground/20 ring-1 ring-primary-foreground/30 backdrop-blur lg:hidden">
              <Menu className="size-5" />
            </button>
            <div className="min-w-0 leading-tight">
              <p className="font-display text-xl font-bold">ناقل</p>
              <p className="truncate text-xs opacity-80">{title}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <div className="ml-2 hidden items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-2.5 text-sm opacity-90 ring-1 ring-primary-foreground/20 md:flex md:w-72"><Search className="size-4" />ابحث عن ناقل، شاحنة أو رحلة…</div>
            <button aria-label="بحث" className="md:hidden grid size-10 place-items-center rounded-full hover:bg-primary-foreground/15"><Search className="size-5" /></button>
            <button aria-label="التنبيهات" className="relative grid size-10 place-items-center rounded-full hover:bg-primary-foreground/15">
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2.5 rounded-full bg-destructive ring-2 ring-primary-foreground/60" />
            </button>
            <span className="mr-1 grid size-10 place-items-center rounded-full bg-primary-foreground font-display text-sm text-accent-foreground">أ</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5">{children}</main>
      <nav className="fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-md justify-between rounded-3xl bg-ink p-2 text-ink-foreground shadow-pop lg:hidden">
        {nav.map(({ to, label, Icon }) => (
          <Link key={label} to={to} className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[11px] transition ${label === active ? "bg-sunrise text-primary-foreground font-semibold" : "opacity-70 hover:opacity-100"}`}>
            <Icon className="size-5" />{label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function SectionTitle({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="mb-3 mt-8 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      </div>
      {action}
    </div>
  );
}
