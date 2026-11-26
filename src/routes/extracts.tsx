import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, FilePlus2, Boxes, ChevronLeft, MoveHorizontal } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/extracts")({
  head: () => ({
    meta: [
      { title: "المستخلصات — ناقل" },
      { name: "description", content: "دفاتر المستخلصات: أنشئ مستخلصاً وأضف إليه سطور الرحلات مباشرة." },
      { property: "og:title", content: "المستخلصات — ناقل" },
      { property: "og:description", content: "دفاتر المستخلصات وسطور الرحلات في مكان واحد." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Extracts,
});

const rows = [
  { n: "مستخلص رقم 6", d: "09/11/2026", lines: 43, w: "2,109.24", pre: "421,848.00", status: "قيد المراجعة" },
  { n: "مستخلص رقم 5", d: "09/11/2026", lines: 48, w: "2,525.88", pre: "505,176.00", status: "معتمد" },
  { n: "مستخلص رقم 4", d: "09/11/2026", lines: 34, w: "1,744.68", pre: "348,936.00", status: "معتمد" },
  { n: "مستخلص ناقل", d: "09/11/2026", lines: 96, w: "4,977.36", pre: "995,472.00", status: "معتمد" },
];

function Status({ s }: { s: string }) {
  return <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${s === "معتمد" ? "bg-secondary/15 text-secondary" : "bg-accent text-accent-foreground"}`}>{s}</span>;
}

function Extracts() {
  const [q, setQ] = useState("");
  const list = rows.filter((r) => r.n.includes(q));
  return (
    <AppShell title="المستخلصات" active="المستخلصات">
      <section className="flex items-end justify-between gap-3 pt-4">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">دفاتر المستخلصات</p>
          <h1 className="font-display text-2xl font-bold">المستخلصات</h1>
        </div>
        <Button variant="ghost" className="flex shrink-0 items-center gap-2 rounded-lg bg-sunrise px-3 py-2 text-sm font-semibold text-ink-foreground shadow-sm transition active:scale-95"><FilePlus2 className="size-4" />مستخلص جديد</Button>
      </section>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[["المستخلصات", "4"], ["السطور", "221"], ["الوزن (طن)", "11,357"]].map(([k, v]) => (
          <div key={k} className="rounded-lg border border-border bg-card p-3 text-center">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="font-display tabular text-lg font-bold">{v}</p>
          </div>
        ))}
      </div>

      <label className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 focus-within:ring-2 focus-within:ring-ring">
        <Search className="size-5 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث باسم المستخلص أو الشركة" className="w-full bg-transparent outline-none placeholder:text-muted-foreground" />
      </label>

      {/* جدول واحد لكل المقاسات: يُسحب أفقياً على الجوال */}
      <div className="mt-4 overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-center gap-2 border-b border-border bg-muted/60 py-2 text-xs text-muted-foreground md:hidden">
          <MoveHorizontal className="size-4" />اسحب الجدول أفقياً لعرض كل الأعمدة
        </div>
        <div className="relative isolate overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="bg-banner-solid text-ink-foreground">
              <tr className="text-right">
                <th className="sticky right-0 z-20 whitespace-nowrap border-l border-ink-foreground/20 bg-banner-solid px-4 py-3 font-semibold">اسم المستخلص</th>
                {["تاريخ الإقفال", "السطور", "الوزن (طن)", "قبل الضريبة", "الحالة", ""].map((h) => <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.n} className="border-t border-border transition hover:bg-muted">
                  <td className="sticky right-0 z-10 whitespace-nowrap border-l border-border bg-card px-3 py-2.5 font-semibold"><Link to="/extracts/$id" params={{ id: r.n }} className="text-primary underline-offset-4 hover:underline">{r.n}</Link></td>
                  <td className="tabular whitespace-nowrap px-4 text-muted-foreground">{r.d}</td>
                  <td className="tabular px-4">{r.lines}</td>
                  <td className="tabular whitespace-nowrap px-4">{r.w}</td>
                  <td className="tabular whitespace-nowrap px-4 font-semibold">{r.pre} <span className="text-xs text-muted-foreground">ر.س</span></td>
                  <td className="px-4"><Status s={r.status} /></td>
                  <td className="px-4 text-muted-foreground"><Link to="/extracts/$id" params={{ id: r.n }} aria-label={`عرض ${r.n}`}><ChevronLeft className="size-4" /></Link></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border bg-accent font-bold text-accent-foreground">
                <td className="sticky right-0 z-10 whitespace-nowrap border-l border-accent-foreground/15 bg-accent px-4 py-3">الإجمالي</td>
                <td className="px-4" />
                <td className="tabular px-4">221</td>
                <td className="tabular whitespace-nowrap px-4">11,357.16</td>
                <td className="tabular whitespace-nowrap sticky left-0 z-10 border-r border-accent-foreground/15 bg-accent px-4">2,271,432.00 <span className="text-xs font-normal">ر.س</span></td>
                <td className="px-4" colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {list.length === 0 && <p className="mt-5 text-center text-muted-foreground">لا توجد نتائج مطابقة</p>}
    </AppShell>
  );
}
