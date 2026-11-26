import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, FilePlus2, Printer, FileText, FileSpreadsheet, FileUp, ArrowUpDown, Trash2, MoveHorizontal, ListPlus, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

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
  return { i: i + 1, d: dates[i] ?? "", truck: trucks[i] ?? "", driver: drivers[i] ?? "", trip: trips[i] ?? 0, q, w, pre, tax, total: pre + tax };
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
  const th = "whitespace-nowrap px-3 py-2.5 font-semibold";
  return (
    <AppShell title="المستخلصات" active="المستخلصات">
      <Button asChild variant="ghost" size="sm" className="mt-3 text-muted-foreground"><Link to="/extracts"><ArrowRight className="size-4" />كل المستخلصات</Link></Button>

      <section className="mt-2 overflow-hidden rounded-lg bg-road p-4 text-ink-foreground">
        <p className="text-xs text-ink-foreground/90">بيانات تجريبية · {rows.length} سطراً</p>
        <h1 className="font-display mt-1 break-words text-2xl font-bold">{decodeURIComponent(id)}</h1>
        <p className="tabular mt-1 text-xs text-ink-foreground/90">حتى 09/11/2026</p>
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-ink-foreground/20 pt-3">
          {[["الكمية", String(sum("q"))], ["الوزن (طن)", f(sum("w"))], ["الإجمالي", f(sum("total"))]].map(([k, v]) => (
            <div key={k} className="min-w-0 text-center">
              <p className="text-xs text-ink-foreground/90">{k}</p>
              <p dir="ltr" className="font-display tabular mt-1 text-sm font-bold">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <Button className="mt-3 w-full font-semibold"><FilePlus2 className="size-4" />إضافة سطر إلى النهاية</Button>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {actions.map((a) => (
          <Button variant="outline" key={a.l} className="h-auto min-h-10 justify-start whitespace-normal bg-card px-2.5 py-2 text-right text-xs leading-5 text-card-foreground">
            <a.I className="size-4 shrink-0 text-accent-foreground" />{a.l}
          </Button>
        ))}
      </div>

      <details className="mt-3 border-y border-border py-3">
        <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold"><ListPlus className="size-4 shrink-0 text-primary" />نسيت سطراً وتريد إدراجه في مكانه؟</summary>
        <p className="mt-2 text-sm text-muted-foreground">اكتب رقم التسلسل الجديد، مثل 5؛ ستتحرك أرقام السطور التالية تلقائياً مع بقاء بياناتها.</p>
        <div className="mt-3 flex gap-2">
          <input aria-label="موضع السطر" value={pos} onChange={(e) => setPos(e.target.value)} inputMode="numeric" placeholder={`1–${rows.length + 1}`} className="tabular min-w-0 flex-1 rounded-md border border-border bg-background px-3 py-2 text-center outline-none focus:ring-2 focus:ring-ring" />
          <Button disabled={!pos}>إدراج</Button>
        </div>
      </details>

      <div className="mt-3 overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
        <div className="flex items-center justify-center gap-2 border-b border-border bg-muted/60 py-2 text-xs text-muted-foreground md:hidden">
          <MoveHorizontal className="size-4" />اسحب الجدول أفقياً لعرض كل الأعمدة
        </div>
        <div className="relative isolate overflow-x-auto">
          <table className="w-full min-w-[1400px] table-fixed border-separate border-spacing-0 text-sm">
            <colgroup><col className="w-[180px]" />{Array.from({ length: 9 }, (_, i) => <col key={i} />)}<col className="w-[160px]" /><col className="w-[116px]" /></colgroup>
            <thead className="bg-banner-solid text-ink-foreground">
              <tr className="text-right">
                <th className={`sticky right-0 z-20 border-l border-ink-foreground/20 bg-banner-solid ${th}`}>م · الناقل</th>
                {["التاريخ", "رقم الشاحنة", "رقم الرحلة", "الكمية", "وزن الوحدة", "الوزن (طن)", "سعر الطن", "قبل الضريبة", "الضريبة 15%", "بعد الضريبة", "إجراء"].map((h) => <th key={h} className={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.i}>
                  <td className="sticky right-0 z-10 border-l border-border bg-card px-3 py-2.5">
                    <div className="flex items-center gap-2"><span className="tabular inline-grid size-5 shrink-0 place-items-center rounded bg-accent text-xs font-bold text-accent-foreground">{r.i}</span>
                    <span className="min-w-0 text-xs font-semibold leading-5">{r.driver}</span></div>
                  </td>
                  <td className="tabular whitespace-nowrap px-4 text-muted-foreground">{r.d}</td>
                  <td className="tabular px-4 font-semibold">{r.truck}</td>
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
                        return <Button variant="ghost" size="icon" title={l as string} key={l as string} aria-label={l as string} className={`size-8 ${c}`}><Icon className="size-4" /></Button>;
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
