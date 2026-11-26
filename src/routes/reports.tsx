import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TrendingUp, TrendingDown, Download, ShieldCheck, Plus, Pencil, Trash2, RotateCcw, CheckCircle2, MoveHorizontal } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/AppShell";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "تقارير ناقل — الأداء التشغيلي" },
      { name: "description", content: "تقرير الأداء التشغيلي الشامل: المستخلصات والناقلون والرحلات والمخالفات." },
      { property: "og:title", content: "تقارير ناقل — الأداء التشغيلي" },
      { property: "og:description", content: "تقرير الأداء التشغيلي الشامل للمستخلصات والناقلين والرحلات." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Reports,
});

const periods = ["أسبوع", "شهر", "ربع", "سنة"];
const insights = [
  { label: "قيمة الرحلات", value: "2,559,099", up: true, delta: "+9,648%" },
  { label: "إجمالي المستخلصات", value: "2,612,146", up: true, delta: "جديد" },
  { label: "المخالفات", value: "527", up: false, delta: "−43.8%" },
  { label: "الضريبة المحفوظة", value: "340,714", up: true, delta: "+12%" },
];
const carriers = [
  { n: "الدرع الغربي", v: 164275, t: 12 },
  { n: "راشد المرشد", v: 98400, t: 8 },
  { n: "حمود الهاجري", v: 76120, t: 6 },
  { n: "ثواب السبيعي", v: 52300, t: 5 },
  { n: "رايد الحيسوني", v: 41800, t: 4 },
];
const extracts = [
  { n: "مستخلص ناقل", d: "09/11", lines: 96, qty: "1,338", w: "4,617", v: "1,144,792" },
  { n: "مستخلص رقم 5", d: "09/11", lines: 48, qty: "679", w: "2,345", v: "583,210" },
  { n: "مستخلص رقم 4", d: "09/11", lines: 34, qty: "469", w: "1,614", v: "412,880" },
  { n: "مستخلص رقم 6", d: "09/11", lines: 43, qty: "567", w: "2,780", v: "471,264" },
];

const log = [
  { a: "تعديل", t: "ملف مخالفات", d: "23/11 · 19:28", I: Pencil, c: "bg-accent text-accent-foreground" },
  { a: "تعديل", t: "مخالفة", d: "23/11 · 19:27", I: Pencil, c: "bg-accent text-accent-foreground" },
  { a: "إضافة", t: "مخالفة", d: "23/11 · 19:22", I: Plus, c: "bg-secondary/15 text-secondary" },
  { a: "استعادة", t: "ملف مخالفات", d: "23/11 · 13:00", I: RotateCcw, c: "bg-primary/15 text-accent-foreground" },
  { a: "حذف", t: "ملف مخالفات", d: "23/11 · 13:00", I: Trash2, c: "bg-destructive/10 text-destructive" },
];

function Reports() {
  const [period, setPeriod] = useState(1);
  const max = carriers[0]!.v;
  return (
    <AppShell title="التقارير" active="تقارير">
      <section className="animate-rise pt-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary"><ShieldCheck className="size-3.5" />تقرير إداري موثّق</span>
        <h1 className="font-display mt-2 text-3xl font-bold">الأداء التشغيلي</h1>
        <p className="text-sm text-muted-foreground">1 – 26 نوفمبر 2026 · مقارنة بأكتوبر</p>
      </section>

      <div className="mt-4 flex gap-1 rounded-2xl bg-muted p-1">
        {periods.map((p, i) => (
          <button key={p} onClick={() => setPeriod(i)} className={`flex-1 rounded-xl py-2 text-sm font-semibold transition ${i === period ? "bg-sunrise text-primary-foreground shadow-pop" : "text-muted-foreground"}`}>{p}</button>
        ))}
      </div>

      <SectionTitle title="الخلاصة" hint="أهم ما تغيّر في هذه الفترة" />
      <div className="grid grid-cols-2 gap-3">
        {insights.map((x, i) => (
          <div key={x.label} className={`animate-rise rounded-3xl p-4 ${i === 0 ? "col-span-2 bg-road text-ink-foreground" : "border border-border bg-card"}`} style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex items-center justify-between">
              <p className={`text-sm ${i === 0 ? "opacity-80" : "text-muted-foreground"}`}>{x.label}</p>
              <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${x.up ? "bg-lime/15 text-secondary" : "bg-destructive/10 text-destructive"} ${i === 0 ? "text-lime" : ""}`}>
                {x.up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}{x.delta}
              </span>
            </div>
            <p className={`font-display tabular mt-2 font-bold ${i === 0 ? "text-4xl" : "text-2xl"}`}>{x.value}<span className="text-sm opacity-60"> ر.س</span></p>
          </div>
        ))}
      </div>

      <SectionTitle title="أعلى الناقلين" hint="حسب قيمة الرحلات" />
      <div className="space-y-3 rounded-3xl border border-border bg-card p-5">
        {carriers.map((c, i) => (
          <div key={c.n}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-semibold"><span className="grid size-6 place-items-center rounded-lg bg-muted text-xs">{i + 1}</span>{c.n}</span>
              <span className="tabular text-muted-foreground">{c.v.toLocaleString("en")} ر.س · {c.t} رحلات</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
              <div className={`h-full rounded-full ${i === 0 ? "bg-sunrise" : "bg-secondary"}`} style={{ width: `${(c.v / max) * 100}%`, transition: "width 1s" }} />
            </div>
          </div>
        ))}
      </div>

      <SectionTitle title="المستخلصات" hint="4 مستخلصات · 221 سطر" action={<button className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-semibold"><Download className="size-4" />PDF</button>} />
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="flex items-center justify-center gap-2 border-b border-border bg-muted py-2 text-xs text-muted-foreground md:hidden">
          <MoveHorizontal className="size-4" />اسحب الجدول أفقياً لعرض كل الأعمدة
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-banner text-primary-foreground">
              <tr className="text-right">
                <th className="sticky right-0 z-20 whitespace-nowrap border-l border-primary-foreground/20 bg-banner-solid px-4 py-3 font-semibold">المستخلص</th>
                {["التاريخ", "السطور", "الكمية", "الوزن (طن)", "القيمة"].map((h) => <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {extracts.map((e) => (
                <tr key={e.n} className="border-t border-border transition hover:bg-muted">
                  <td className="sticky right-0 z-10 whitespace-nowrap border-l border-border bg-card px-4 py-4 font-semibold">{e.n}</td>
                  <td className="tabular whitespace-nowrap px-4 text-muted-foreground">{e.d}</td>
                  <td className="tabular px-4">{e.lines}</td>
                  <td className="tabular px-4">{e.qty}</td>
                  <td className="tabular px-4">{e.w}</td>
                  <td className="tabular whitespace-nowrap px-4 font-semibold">{e.v} <span className="text-xs font-normal text-muted-foreground">ر.س</span></td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border bg-accent font-bold text-accent-foreground">
                <td className="sticky right-0 z-10 whitespace-nowrap border-l border-accent-foreground/15 bg-accent px-4 py-3">إجمالي الفترة</td>
                <td className="px-4" colSpan={4} />
                <td className="tabular whitespace-nowrap sticky left-0 z-10 border-r border-accent-foreground/15 bg-accent px-4">2,612,146.80 <span className="text-xs font-normal">ر.س</span></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <SectionTitle title="سجل النشاط" hint="2 إضافة · 2 تعديل · 2 حذف · 1 استعادة" />
      <ol className="relative space-y-3 rounded-3xl border border-border bg-card p-5">
        {log.map((l, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className={`grid size-10 shrink-0 place-items-center rounded-2xl ${l.c}`}><l.I className="size-4" /></span>
            <div className="min-w-0 flex-1"><p className="font-semibold">{l.a} <span className="font-normal text-muted-foreground">· {l.t}</span></p></div>
            <span className="tabular shrink-0 text-xs text-muted-foreground">{l.d}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 flex items-center gap-3 rounded-3xl bg-secondary/10 p-4 text-secondary">
        <CheckCircle2 className="size-6 shrink-0" />
        <div><p className="font-semibold">اجتازت فحوص الاتساق والمراجعة</p><p className="text-xs opacity-80">أُعيد حساب كل رحلة وطابقت إجماليات الناقلين</p></div>
      </div>
    </AppShell>
  );
}
