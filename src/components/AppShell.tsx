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
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-2xl bg-sunrise shadow-pop">
              <Truck className="size-5 text-primary-foreground" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-lg font-bold">ناقل</p>
              <p className="text-xs text-muted-foreground">{title}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button aria-label="بحث" className="grid size-10 place-items-center rounded-full hover:bg-muted"><Search className="size-5" /></button>
            <button aria-label="التنبيهات" className="relative grid size-10 place-items-center rounded-full hover:bg-muted">
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2.5 rounded-full bg-destructive ring-2 ring-background" />
            </button>
            <span className="mr-1 grid size-10 place-items-center rounded-full bg-ink font-display text-sm text-ink-foreground">أ</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5">{children}</main>
      <nav className="fixed inset-x-3 bottom-3 z-30 mx-auto flex max-w-md justify-between rounded-3xl bg-ink p-2 text-ink-foreground shadow-pop">
        {nav.map(({ to, label, Icon }) => {
          const on = label === active;
          return (
            <Link key={label} to={to} className={`flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[11px] transition ${on ? "bg-primary text-primary-foreground font-semibold" : "opacity-70 hover:opacity-100"}`}>
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
