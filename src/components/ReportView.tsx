import { Link } from "@tanstack/react-router";
import { ArrowRight, Search, CalendarDays } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export type ReportRecord = { name: string; date: string; values: [string, string][]; extractId?: string };

export function ReportView({ title, section, metrics, records }: {
  title: string;
  section: string;
  metrics: [string, string][];
  records: ReportRecord[];
}) {
  const [query, setQuery] = useState("");
  const visible = records.filter((record) => `${record.name} ${record.values.flat().join(" ")}`.includes(query.trim()));
  return (
    <AppShell title={title} active="تقارير">
      <div className="pt-5">
        <Button asChild variant="ghost" className="-mr-3 text-accent-foreground"><Link to="/reports"><ArrowRight />التقارير</Link></Button>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">بيانات تجريبية</span>
        </div>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><CalendarDays className="size-4" /><span>1 – 26 نوفمبر 2026</span></p>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-x-5 border-y border-border py-2 md:grid-cols-3">
        {metrics.map(([label, value], index) => <div key={label} className={`min-w-0 py-4 ${index === metrics.length - 1 && metrics.length % 2 ? "col-span-2 md:col-span-1" : ""}`}><dt className="text-sm text-muted-foreground">{label}</dt><dd dir="ltr" className="mt-2 text-right font-display text-xl font-bold tabular">{value}</dd></div>)}
      </dl>
      <div className="mb-4 mt-7 flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-xl font-semibold">{section}</h2><span className="text-sm text-muted-foreground">{visible.length} سجلات معروضة</span></div>
      <label className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-3"><Search className="size-4 shrink-0 text-muted-foreground" /><input aria-label="بحث في التقرير" placeholder="بحث في التقرير" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent outline-none" /></label>
      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((record) => <article key={record.name} className="min-w-0 rounded-lg border border-border bg-card p-4">
          <h3 className="font-display text-lg font-semibold">{record.name}</h3><p className="mt-1 text-xs text-muted-foreground">{record.date}</p>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 border-t border-border pt-2">{record.values.map(([label, value]) => <div key={label} className="min-w-0 border-b border-border py-3"><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 break-words text-sm font-semibold tabular">{value}</dd></div>)}</dl>
          {record.extractId && <Button asChild variant="outline" className="mt-4"><Link to="/extracts/$id" params={{ id: record.extractId }}>فتح المستخلص</Link></Button>}
        </article>)}
      </div>
      {visible.length === 0 && <p className="py-10 text-center text-muted-foreground">لا توجد نتائج مطابقة</p>}
    </AppShell>
  );
}