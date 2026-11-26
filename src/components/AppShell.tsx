import { Button } from "@/components/ui/button";
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
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-sunrise shadow-sm"><Truck className="size-5" /></span>
        <div className="min-w-0 flex-1"><p className="font-display text-lg font-bold">ناقل</p><p className="text-xs opacity-70">دفتر الحسابات</p></div>
        {onClose && <Button variant="ghost" aria-label="إغلاق" onClick={onClose} className="grid size-10 place-items-center rounded-full bg-ink-foreground/10"><X className="size-5" /></Button>}
      </div>
      <p className="mt-5 px-3 text-xs opacity-60">مساحة العمل</p>
      <div className="mt-2 space-y-1">
        {side.map(({ to, label, Icon }) => (
          <Link key={label} to={to} onClick={onClose} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${label === active ? "bg-primary text-primary-foreground font-semibold" : "opacity-75 hover:bg-ink-foreground/10 hover:opacity-100"}`}>
            <Icon className="size-5" />{label}
          </Link>
        ))}
      </div>
      <div className="mt-auto space-y-2">
        <div className="flex items-center gap-3 rounded-lg bg-ink-foreground/10 p-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sunrise font-display">أ</span>
          <div className="min-w-0"><p className="truncate text-sm font-semibold">أبو ضياء</p><p className="truncate text-xs opacity-70">abu.diaa@naql.sa</p></div>
        </div>
        <Button variant="ghost" className="flex w-full items-center justify-center gap-2 rounded-lg border border-ink-foreground/25 py-2.5 text-sm font-semibold text-ink-foreground transition hover:bg-destructive/10"><LogOut className="size-4" />تسجيل الخروج</Button>
      </div>
    </>
  );
}

export function AppShell({ title, active, children }: { title: string; active: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen pb-28 lg:pb-8 lg:pr-64">
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-60 flex-col border-l border-ink-foreground/10 bg-road p-4 text-ink-foreground lg:flex">
        <SideMenu active={active} />
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <Button variant="ghost" aria-label="إغلاق القائمة" onClick={() => setOpen(false)} className="absolute inset-0 h-full w-full rounded-none bg-ink/50 backdrop-blur-sm animate-in fade-in" />
          <aside className="absolute inset-y-2 right-2 flex w-[82%] max-w-80 flex-col rounded-lg bg-road p-4 text-ink-foreground shadow-sm animate-in slide-in-from-right duration-300">
            <SideMenu active={active} onClose={() => setOpen(false)} />
          </aside>
        </div>
      )}
      <header className="sticky top-0 z-40 bg-banner text-ink-foreground shadow-sm">
        <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <Button variant="ghost" aria-label="القائمة" onClick={() => setOpen(true)} className="grid size-10 shrink-0 place-items-center rounded-lg bg-ink-foreground/20 ring-1 ring-ink-foreground/30 backdrop-blur lg:hidden">
              <Menu className="size-5" />
            </Button>
            <div className="min-w-0 leading-tight">
              <p className="font-display text-lg font-bold">ناقل</p>
              <p className="truncate text-xs opacity-80">{title}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <div className="ml-2 hidden items-center gap-2 rounded-full bg-ink-foreground/15 px-4 py-2.5 text-sm opacity-90 ring-1 ring-ink-foreground/20 md:flex md:w-72"><Search className="size-4" />ابحث عن ناقل، شاحنة أو رحلة…</div>
            <Button variant="ghost" aria-label="بحث" className="md:hidden grid size-10 place-items-center rounded-full hover:bg-ink-foreground/15"><Search className="size-5" /></Button>
            <Button variant="ghost" aria-label="التنبيهات" className="relative grid size-10 place-items-center rounded-full hover:bg-ink-foreground/15">
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2.5 rounded-full bg-destructive ring-2 ring-ink-foreground/60" />
            </Button>
            <span className="mr-1 grid size-10 place-items-center rounded-full bg-ink-foreground font-display text-sm text-accent-foreground">أ</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4">{children}</main>
      <nav className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-md justify-between rounded-lg bg-ink p-2 text-ink-foreground shadow-sm lg:hidden">
        {nav.map(({ to, label, Icon }) => (
          <Link key={label} to={to} className={`flex flex-1 flex-col items-center gap-1 rounded-md py-2 text-[11px] transition ${label === active ? "bg-primary text-primary-foreground font-semibold" : "opacity-70 hover:opacity-100"}`}>
            <Icon className="size-5" />{label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function SectionTitle({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="mb-2.5 mt-5 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      </div>
      {action}
    </div>
  );
}
