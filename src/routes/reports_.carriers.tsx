import { createFileRoute } from "@tanstack/react-router";
import { ReportView } from "@/components/ReportView";

export const Route = createFileRoute("/reports_/carriers")({
  head: () => ({ meta: [
    { title: "تقرير الناقلين — ناقل" },
    { name: "description", content: "ملخص النشاط حسب الناقل والإجماليات خلال الفترة المحددة في ناقل." },
    { property: "og:title", content: "تقرير الناقلين — ناقل" },
    { property: "og:description", content: "ملخص النشاط حسب الناقل والإجماليات خلال الفترة المحددة." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ReportPage,
});

function ReportPage() {
  return <ReportView title="تقرير الناقلين" section="ملخص النشاط حسب الناقل" metrics={[["عدد الناقلين", "122"], ["عدد الرحلات", "219"], ["الكمية بالوحدات", "3,022"], ["الوزن (طن)", "11,241.84"], ["القيمة بعد الضريبة (ر.س)", "2,585,623.20"]]} records={[
{ name: "الدرع الغربي", date: "1 – 26 نوفمبر 2026", values: [["عدد المستخلصات", "1"], ["عدد الرحلات", "12"], ["الكمية", "192"], ["الوزن (طن)", "714.24"], ["قبل الضريبة", "142,848.00"], ["الضريبة", "21,427.20"], ["الإجمالي بعد الضريبة", "164,275.20 ر.س"]] }
]} />;
}
