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
    <section className="pt-4"><p className="text-xs text-muted-foreground">تقارير التشغيل</p><h1 className="mt-1 font-display text-2xl font-bold">التقارير</h1></section>
    <div className="mt-4 grid gap-2.5 md:grid-cols-2">
      {types.map(({ to, title, sub, Icon }, index) => <article key={to} className="min-w-0">
        <Button asChild variant="ghost" className={`h-auto w-full justify-start gap-3 whitespace-normal rounded-lg border p-3 text-right ${index === 3 ? "border-accent-foreground/25 bg-accent text-accent-foreground hover:bg-accent" : "border-border bg-card text-card-foreground hover:bg-muted"}`}>
          <Link to={to}>
            <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${index === 3 ? "bg-banner-solid text-ink-foreground" : "bg-accent text-accent-foreground"}`}><Icon className="size-5" /></span>
            <span className="min-w-0 flex-1"><h2 className="font-display text-sm font-semibold leading-6">{title}</h2><p className="mt-0.5 text-xs font-normal leading-5 text-muted-foreground">{sub}</p></span>
            <ArrowLeft className="shrink-0 text-accent-foreground" />
          </Link>
        </Button>
      </article>)}
    </div>
  </AppShell>;
}
