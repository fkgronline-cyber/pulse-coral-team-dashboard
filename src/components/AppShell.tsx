import { Link } from "@tanstack/react-router";
import { Bell, Search, Truck, LayoutGrid, Boxes, BarChart3, Settings } from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "الرئيسية", Icon: LayoutGrid },
  { to: "/reports", label: "تقارير", Icon: BarChart3 },
  { to: "/", label: "المستخلصات", Icon: Boxes },
  { to: "/", label: "الناقلون", Icon: Truck },
  { to: "/", label: "الإعدادات", Icon: Settings },
] as const;

export function AppShell({ title, active, children }: { title: string; active: string; children: ReactNode }) {
  return (
    <div className="min-h-screen pb-32">
      <header className="sticky top-0 z-20 overflow-hidden rounded-b-[2rem] bg-banner text-primary-foreground shadow-pop">
        <div className="pointer-events-none absolute -left-10 top-2 size-32 rounded-full border-[14px] border-primary-foreground/10 animate-float" />
        <div className="relative mx-auto flex max-w-3xl items-center justify-between px-5 pb-5 pt-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-11 place-items-center rounded-2xl bg-primary-foreground/20 ring-1 ring-primary-foreground/30 backdrop-blur">
              <Truck className="size-5" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-xl font-bold">ناقل</p>
              <p className="text-xs opacity-80">{title}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button aria-label="بحث" className="grid size-10 place-items-center rounded-full hover:bg-primary-foreground/15"><Search className="size-5" /></button>
            <button aria-label="التنبيهات" className="relative grid size-10 place-items-center rounded-full hover:bg-primary-foreground/15">
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2.5 rounded-full bg-destructive ring-2 ring-primary-foreground/60" />
            </button>
            <span className="mr-1 grid size-10 place-items-center rounded-full bg-primary-foreground font-display text-sm text-accent-foreground">أ</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5">{children}</main>
      <nav className="fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-md justify-between rounded-3xl bg-ink p-2 text-ink-foreground shadow-pop">
        {nav.map(({ to, label, Icon }) => {
          const on = label === active;
          return (
            <Link key={label} to={to} className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[11px] transition ${on ? "bg-sunrise text-primary-foreground font-semibold" : "opacity-70 hover:opacity-100"}`}>
              <Icon className="size-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function SectionTitle({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="mb-3 mt-8 flex items-end justify-between">
      <div>
        <h2 className="font-display text-xl font-bold">{title}</h2>
        {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      </div>
      {action}
    </div>
  );
}
