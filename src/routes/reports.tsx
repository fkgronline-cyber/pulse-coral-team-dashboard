import { createFileRoute, Link } from "@tanstack/react-router";
import { Boxes, Truck, FileText, BarChart3, ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [
    { title: "التقارير — ناقل" },
    { name: "description", content: "تقارير المستخلصات والناقلين والمخالفات والتقرير التشغيلي الشامل في ناقل." },
    { property: "og:title", content: "التقارير — ناقل" },
    { property: "og:description", content: "تقارير المستخلصات والناقلين والمخالفات والأداء التشغيلي الشامل." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Reports,
});

const types = [
  { to: "/reports/extracts", title: "تقارير المستخلصات", sub: "السطور · الكميات · الأوزان · الإجماليات", Icon: Boxes },
  { to: "/reports/carriers", title: "تقارير الناقلين", sub: "الرحلات · الكميات · قيمة النقل", Icon: Truck },
  { to: "/reports/violations", title: "تقارير المخالفات", sub: "السائقون · أنواع المخالفات · المبالغ", Icon: FileText },
  { to: "/reports/comprehensive", title: "تقرير الأداء التشغيلي الشامل", sub: "المقارنة · سجل النشاط · فحوص الاتساق", Icon: BarChart3 },
] as const;

function Reports() {
  return <AppShell title="التقارير" active="تقارير">
    <section className="pt-7"><p className="text-sm text-muted-foreground">تقارير التشغيل</p><h1 className="mt-1 font-display text-3xl font-bold">التقارير</h1></section>
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {types.map(({ to, title, sub, Icon }, index) => <article key={to} className={`flex min-w-0 flex-col rounded-lg border p-5 ${index === 3 ? "border-primary/30 bg-banner text-primary-foreground" : "border-border bg-card"}`}>
        <div className="flex items-center justify-between"><span className={`grid size-12 place-items-center rounded-lg ${index === 3 ? "bg-primary-foreground/15" : "bg-accent text-accent-foreground"}`}><Icon className="size-6" /></span><span className="text-xs opacity-60">0{index + 1}</span></div>
        <h2 className="mt-4 font-display text-lg font-semibold">{title}</h2><p className={`mt-2 text-sm ${index === 3 ? "opacity-80" : "text-muted-foreground"}`}>{sub}</p>
        <Button asChild variant="ghost" className={`mt-4 w-full justify-between ${index === 3 ? "hover:bg-primary-foreground/15 hover:text-primary-foreground" : "text-accent-foreground"}`}><Link to={to}>{index === 3 ? "عرض التقرير الشامل" : "عرض التقرير"}<ArrowLeft /></Link></Button>
      </article>)}
    </div>
  </AppShell>;
}
