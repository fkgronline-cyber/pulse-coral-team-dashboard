import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, FilePlus2, Printer, FileText, FileSpreadsheet, FileUp, ArrowUpDown, Trash2, MoveHorizontal, ListPlus, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/extracts_/$id")({
  head: () => ({
    meta: [
      { title: "عرض المستخلص — ناقل" },
      { name: "description", content: "سطور رحلات المستخلص مع الكمية والوزن والضريبة والإجمالي." },
      { property: "og:title", content: "عرض المستخلص — ناقل" },
      { property: "og:description", content: "تفاصيل سطور المستخلص وإجمالياته." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExtractView,
});

const drivers = ["نايف الشيباني", "عبدالعزيز عبدالله", "احمد اللحيدان", "احمد اللحيدان", "احمد اللحيدان", "احمد اللحيدان", "محسن الهمامي", "مفرح البلوي", "مفرح البلوي"];
const trucks = ["ZEB9451", "KDA5307", "TXA2445", "TXA2443", "XAA9911", "UXA7942", "DSA3749", "LJA9355", "SDA7016"];
const dates = ["06/11/2026", "05/11/2026", "05/11/2026", "03/11/2026", "03/11/2026", "03/11/2026", "08/11/2026", "02/11/2026", "02/11/2026"];
const trips = [4939, 4857, 4703, 4198, 4190, 4191, 5372, 4142, 4140];
const qtys = [14, 13, 7, 7, 7, 7, 12, 8, 12];
const rows = qtys.map((q, i) => {
  const w = q * 3.72, pre = w * 200, tax = pre * 0.15;
  return { i: i + 1, d: dates[i]!, truck: trucks[i]!, driver: drivers[i]!, trip: trips[i]!, q, w, pre, tax, total: pre + tax };
});
const f = (n: number) => n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const sum = (k: "q" | "w" | "pre" | "tax" | "total") => rows.reduce((s, r) => s + r[k], 0);

const actions = [
  { l: "تعديل العنوان والتاريخ", I: Pencil },
  { l: "فتح PDF للطباعة", I: Printer },
  { l: "تنزيل / مشاركة PDF", I: FileText },
  { l: "نسخة دون اسم الناقل", I: FileText },
  { l: "تنزيل Excel", I: FileSpreadsheet },
  { l: "استيراد Excel", I: FileUp },
];

function ExtractView() {
  const { id } = Route.useParams();
  const [pos, setPos] = useState("");
  const th = "whitespace-nowrap px-4 py-3 font-semibold";
  return (
    <AppShell title="المستخلصات" active="المستخلصات">
      <Link to="/extracts" className="mt-5 inline-flex items-center gap-1 text-sm text-muted-foreground"><ArrowRight className="size-4" />كل المستخلصات</Link>

      <section className="mt-2 overflow-hidden rounded-3xl bg-road p-5 text-primary-foreground shadow-pop">
        <p className="text-sm opacity-80">دفتر مستقل · {rows.length} سطراً</p>
        <h1 className="font-display mt-1 text-3xl font-bold">{decodeURIComponent(id)}</h1>
        <p className="tabular mt-1 text-sm opacity-80">حق تاريخ 09/11/2026</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[["الكمية", String(sum("q"))], ["الوزن (طن)", f(sum("w"))], ["الإجمالي", f(sum("total"))]].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-primary-foreground/10 p-2.5 text-center">
              <p className="text-[11px] opacity-75">{k}</p>
              <p dir="ltr" className="font-display tabular text-sm font-bold">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-sunrise py-3.5 font-semibold text-primary-foreground shadow-pop active:scale-[.98]"><FilePlus2 className="size-5" />إضافة سطر إلى النهاية</button>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {actions.map((a) => (
          <button key={a.l} className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card px-2 py-3 text-center text-xs font-medium leading-tight active:scale-95">
            <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground"><a.I className="size-4" /></span>{a.l}
          </button>
        ))}
      </div>

      <details className="mt-4 rounded-3xl border border-border bg-card p-4">
        <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold"><ListPlus className="size-5 text-primary" />نسيت سطراً وتريد إدراجه في مكانه؟</summary>
        <p className="mt-2 text-sm text-muted-foreground">اكتب رقم التسلسل الجديد، مثل 5؛ ستتحرك أرقام السطور التالية تلقائياً مع بقاء بياناتها.</p>
        <div className="mt-3 flex gap-2">
          <input value={pos} onChange={(e) => setPos(e.target.value)} inputMode="numeric" placeholder={`1–${rows.length + 1}`} className="tabular min-w-0 flex-1 rounded-2xl border border-border bg-background px-4 py-3 text-center outline-none focus:ring-2 focus:ring-ring" />
          <button disabled={!pos} className="rounded-2xl bg-primary px-4 font-semibold text-primary-foreground disabled:opacity-40">إدراج</button>
        </div>
      </details>

      <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="flex items-center justify-center gap-2 border-b border-border bg-muted/60 py-2 text-xs text-muted-foreground md:hidden">
          <MoveHorizontal className="size-4" />اسحب الجدول أفقياً لعرض كل الأعمدة
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px] text-sm">
            <thead className="bg-banner text-primary-foreground">
              <tr className="text-right">
                <th className={`sticky right-0 z-20 border-l border-primary-foreground/20 bg-banner-solid ${th}`}>م · الناقل</th>
                {["التاريخ", "رقم الشاحنة", "رقم الرحلة", "الكمية", "وزن الوحدة", "الوزن (طن)", "سعر الطن", "قبل الضريبة", "الضريبة 15%", "بعد الضريبة", "إجراء"].map((h) => <th key={h} className={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.i} className="border-t border-border hover:bg-muted">
                  <td className="sticky right-0 z-10 whitespace-nowrap border-l border-border bg-card px-4 py-3">
                    <span className="tabular ml-2 inline-grid size-6 place-items-center rounded-lg bg-accent text-xs font-bold text-accent-foreground">{r.i}</span>
                    <span className="font-semibold">{r.driver}</span>
                  </td>
                  <td className="tabular whitespace-nowrap px-4 text-muted-foreground">{r.d}</td>
                  <td className="tabular px-4 font-semibold tracking-wide">{r.truck}</td>
                  <td className="tabular px-4">{r.trip}</td>
                  <td className="tabular px-4">{r.q}</td>
                  <td className="tabular px-4 text-muted-foreground">3.72</td>
                  <td className="tabular px-4">{f(r.w)}</td>
                  <td className="tabular px-4 text-muted-foreground">200.00</td>
                  <td className="tabular px-4">{f(r.pre)}</td>
                  <td className="tabular px-4 text-muted-foreground">{f(r.tax)}</td>
                  <td className="tabular px-4 font-bold text-primary">{f(r.total)}</td>
                  <td className="px-3">
                    <div className="flex items-center gap-1">
                      {[[Pencil, "تعديل", ""], [ArrowUpDown, "نقل", ""], [Trash2, "حذف", "text-destructive"]].map(([I, l, c]) => {
                        const Icon = I as typeof Pencil;
                        return <button key={l as string} aria-label={l as string} className={`grid size-8 place-items-center rounded-xl hover:bg-muted ${c}`}><Icon className="size-4" /></button>;
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-border bg-accent font-bold text-accent-foreground">
                <td className="sticky right-0 z-10 whitespace-nowrap border-l border-accent-foreground/15 bg-accent px-4 py-3">الإجمالي</td>
                <td className="px-4" colSpan={3} />
                <td className="tabular px-4">{sum("q")}</td>
                <td className="px-4" />
                <td className="tabular px-4">{f(sum("w"))}</td>
                <td className="px-4" />
                <td className="tabular px-4">{f(sum("pre"))}</td>
                <td className="tabular px-4">{f(sum("tax"))}</td>
                <td className="tabular sticky left-0 z-10 whitespace-nowrap border-r border-accent-foreground/15 bg-accent px-4">{f(sum("total"))} <span className="text-xs font-normal">ر.س</span></td>
                <td className="px-4" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
