import { createFileRoute } from "@tanstack/react-router";
import { ReportView } from "@/components/ReportView";

export const Route = createFileRoute("/reports_/violations")({
  head: () => ({ meta: [
    { title: "تقرير المخالفات — ناقل" },
    { name: "description", content: "تفاصيل المخالفات حسب التاريخ والإجماليات خلال الفترة المحددة في ناقل." },
    { property: "og:title", content: "تقرير المخالفات — ناقل" },
    { property: "og:description", content: "تفاصيل المخالفات حسب التاريخ والإجماليات خلال الفترة المحددة." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ReportPage,
});

function ReportPage() {
  return <ReportView title="تقرير المخالفات" section="تفاصيل المخالفات حسب التاريخ" metrics={[["عدد المخالفات", "4"], ["عدد السائقين", "1"], ["أنواع المخالفات", "3"], ["إجمالي المبالغ (ر.س)", "676.00"]]} records={[
{ name: "مخالفة 3143820985", date: "09/11/2026", values: [["السائق", "فاروق"], ["النوع", "مخالفة تنظيمات السير على الطرق"], ["المبلغ", "113.00 ر.س"]] }
]} />;
}
