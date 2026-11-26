import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, ArrowUpLeft, FileText, Truck, Boxes, Scale, AlertTriangle, Upload, UserPlus, MoveHorizontal } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ناقل — نظرة عامة على أعمال النقل" },
      { name: "description", content: "قيمة المستخلصات والرحلات والناقلين في لوحة واحدة واضحة." },
      { property: "og:title", content: "ناقل — نظرة عامة على أعمال النقل" },
      { property: "og:description", content: "قيمة المستخلصات والرحلات والناقلين في لوحة واحدة واضحة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const spark = [30, 42, 38, 55, 48, 70, 62, 85, 78, 96];
const kpis = [
  { label: "المستخلصات", value: "4", sub: "221 سطر رحلة", Icon: Boxes },
  { label: "الرحلات", value: "219", sub: "+34 هذا الأسبوع", Icon: FileText },
  { label: "الناقلون", value: "122", sub: "نشطون هذا الشهر", Icon: Truck },
  { label: "الوزن", value: "11,357", sub: "طن منقول", Icon: Scale },
];
const extracts = [
  { name: "مستخلص ناقل", trips: 96, value: "1,144,792", status: "معتمد" },
  { name: "مستخلص رقم 5", trips: 48, value: "583,210", status: "قيد المراجعة" },
  { name: "مستخلص رقم 4", trips: 34, value: "412,880", status: "معتمد" },
];

function Status({ s }: { s: string }) {
  return <span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${s === "معتمد" ? "bg-secondary/15 text-secondary" : "bg-accent text-accent-foreground"}`}>{s}</span>;
}

function Home() {
  const max = Math.max(...spark);
  return (
    <AppShell title="نظرة عامة" active="الرئيسية">
      <section className="animate-rise pt-6">
        <p className="text-sm text-muted-foreground">الخميس، 26 نوفمبر</p>
        <h1 className="font-display mt-1 text-3xl font-bold">أهلاً أبو ضياء 👋</h1>
      </section>

      <article className="animate-rise relative mt-5 overflow-hidden rounded-3xl bg-road p-6 text-ink-foreground">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm opacity-80">
            <span className="relative flex size-2"><span className="absolute size-2 rounded-full bg-lime animate-pulse-ring" /><span className="size-2 rounded-full bg-lime" /></span>
            قيمة المستخلصات · نوفمبر
          </span>
          <span className="rounded-full bg-lime/15 px-2.5 py-1 text-xs font-semibold text-lime">▲ 18%</span>
        </div>
        <p className="font-display tabular mt-3 text-4xl font-bold"><span dir="ltr">2,612,146<span className="text-xl opacity-60">.80</span></span> <span className="text-xl opacity-60">ر.س</span></p>
        <svg viewBox="0 0 100 32" className="mt-4 h-16 w-full" preserveAspectRatio="none">
          <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--primary)" stopOpacity=".5" /><stop offset="1" stopColor="var(--primary)" stopOpacity="0" /></linearGradient></defs>
          <path d={`M0,32 ${spark.map((v, i) => `L${(i / (spark.length - 1)) * 100},${32 - (v / max) * 28}`).join(" ")} L100,32 Z`} fill="url(#g)" />
          <path d={spark.map((v, i) => `${i ? "L" : "M"}${(i / (spark.length - 1)) * 100},${32 - (v / max) * 28}`).join(" ")} fill="none" stroke="var(--primary)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" style={{ strokeWidth: 2.5 }} />
        </svg>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-sunrise py-3 font-semibold text-primary-foreground transition active:scale-95"><Plus className="size-4" />مستخلص جديد</button>
          <Link to="/reports" className="flex items-center justify-center gap-2 rounded-2xl bg-ink-foreground/10 py-3 font-semibold transition active:scale-95"><ArrowUpLeft className="size-4" />التقارير</Link>
        </div>
      </article>

      <SectionTitle title="مؤشرات التشغيل" hint="محدّثة لحظة بلحظة" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map(({ label, value, sub, Icon }, i) => (
          <div key={label} className="animate-rise rounded-3xl border border-border bg-card p-4" style={{ animationDelay: `${i * 60}ms` }}>
            <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon className="size-4" /></span>
            <p className="mt-3 text-sm text-muted-foreground">{label}</p>
            <p className="font-display tabular text-2xl font-bold">{value}</p>
            <p className="text-xs text-secondary">{sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 rounded-3xl border border-border bg-card p-5 sm:grid-cols-3">
        <div><p className="text-xs text-muted-foreground">اتجاه العمل</p><p className="font-display text-lg font-bold">هذا الشهر مقارنة بالسابق</p></div>
        <div className="rounded-2xl bg-muted p-3"><p className="text-xs text-muted-foreground">هذا الشهر</p><p className="font-display tabular text-xl font-bold">2.61M <span className="text-xs text-secondary">▲ 18%</span></p></div>
        <div className="rounded-2xl bg-muted p-3"><p className="text-xs text-muted-foreground">الشهر السابق</p><p className="font-display tabular text-xl font-bold">2.21M</p></div>
      </div>

      <SectionTitle title="وصول سريع" hint="أهم الأدوات بنقرة" />
      <div className="grid grid-cols-4 gap-3">
        {[["مستخلص", Plus], ["ناقل جديد", UserPlus], ["رفع ملف", Upload], ["مخالفة", AlertTriangle]].map(([l, I]) => {
          const Icon = I as typeof Plus;
          return (
            <button key={l as string} className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-card py-4 text-xs font-semibold transition hover:-translate-y-0.5 hover:shadow-pop">
              <span className="grid size-11 place-items-center rounded-2xl bg-sunrise text-primary-foreground"><Icon className="size-5" /></span>{l as string}
            </button>
          );
        })}
      </div>

      <SectionTitle title="آخر المستخلصات" action={<Link to="/extracts" className="text-sm font-semibold text-accent-foreground">عرض الكل</Link>} />
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <div className="flex items-center justify-center gap-2 border-b border-border bg-muted/60 py-2 text-xs text-muted-foreground sm:hidden">
          <MoveHorizontal className="size-4" />اسحب الجدول أفقياً
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-muted text-xs text-muted-foreground">
              <tr className="text-right">
                <th className="sticky right-0 z-20 whitespace-nowrap border-l border-border bg-muted px-4 py-3 font-semibold">المستخلص</th>
                {["الرحلات", "القيمة", "الحالة"].map((h) => <th key={h} className="whitespace-nowrap px-4 py-3 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {extracts.map((e) => (
                <tr key={e.name} className="border-t border-border transition hover:bg-muted">
                  <td className="sticky right-0 z-10 flex items-center gap-3 border-l border-border bg-card px-4 py-4 font-semibold">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted"><Boxes className="size-4" /></span>
                    <span className="whitespace-nowrap">{e.name}</span>
                  </td>
                  <td className="tabular px-4">{e.trips}</td>
                  <td className="font-display tabular whitespace-nowrap px-4 font-bold">{e.value}<span className="font-sans text-xs font-normal text-muted-foreground"> ر.س</span></td>
                  <td className="px-4"><Status s={e.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
