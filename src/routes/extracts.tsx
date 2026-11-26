import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, FilePlus2, Boxes, ChevronLeft } from "lucide-react";
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
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${s === "معتمد" ? "bg-secondary/15 text-secondary" : "bg-accent text-accent-foreground"}`}>{s}</span>;
}

function Extracts() {
  const [q, setQ] = useState("");
  const list = rows.filter((r) => r.n.includes(q));
  return (
    <AppShell title="المستخلصات" active="المستخلصات">
      <section className="flex items-end justify-between gap-3 pt-6">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">دفاتر المستخلصات</p>
          <h1 className="font-display text-3xl font-bold">المستخلصات</h1>
        </div>
        <button className="flex shrink-0 items-center gap-2 rounded-2xl bg-sunrise px-4 py-3 text-sm font-semibold text-primary-foreground shadow-pop transition active:scale-95"><FilePlus2 className="size-4" />مستخلص جديد</button>
      </section>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[["المستخلصات", "4"], ["السطور", "221"], ["الوزن (طن)", "11,357"]].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-border bg-card p-3 text-center">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="font-display tabular text-lg font-bold">{v}</p>
          </div>
        ))}
      </div>

      <label className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 focus-within:ring-2 focus-within:ring-ring">
        <Search className="size-5 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث باسم المستخلص أو الشركة" className="w-full bg-transparent outline-none placeholder:text-muted-foreground" />
      </label>

      {/* الجوال: بطاقات بدل الجدول */}
      <ul className="mt-4 space-y-3 md:hidden">
        {list.map((r) => (
          <li key={r.n} className="rounded-3xl border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sunrise text-primary-foreground"><Boxes className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{r.n}</p>
                <p className="text-xs text-muted-foreground">إقفال حتى {r.d}</p>
              </div>
              <Status s={r.status} />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[["السطور", r.lines], ["الوزن", r.w], ["قبل الضريبة", r.pre]].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-muted py-2">
                  <p className="text-[11px] text-muted-foreground">{k}</p>
                  <p className="tabular text-sm font-semibold">{v}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* الكمبيوتر: جدول كامل */}
      <div className="mt-4 hidden overflow-hidden rounded-3xl border border-border bg-card md:block">
        <table className="w-full text-sm">
          <thead className="bg-banner text-primary-foreground">
            <tr className="text-right">
              {["اسم المستخلص", "تاريخ الإقفال", "السطور", "الوزن (طن)", "قبل الضريبة", "الحالة", ""].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.n} className="border-t border-border transition hover:bg-muted">
                <td className="px-4 py-4 font-semibold">{r.n}</td>
                <td className="tabular px-4 text-muted-foreground">{r.d}</td>
                <td className="tabular px-4">{r.lines}</td>
                <td className="tabular px-4">{r.w}</td>
                <td className="tabular px-4 font-semibold">{r.pre} <span className="text-xs text-muted-foreground">ر.س</span></td>
                <td className="px-4"><Status s={r.status} /></td>
                <td className="px-4 text-muted-foreground"><ChevronLeft className="size-4" /></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-border bg-accent font-bold text-accent-foreground">
              <td className="px-4 py-3" colSpan={2}>الإجمالي</td>
              <td className="tabular px-4">221</td><td className="tabular px-4">11,357.16</td><td className="tabular px-4" colSpan={3}>2,271,432.00 ر.س</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {list.length === 0 && <p className="mt-8 text-center text-muted-foreground">لا توجد نتائج مطابقة</p>}
    </AppShell>
  );
}
