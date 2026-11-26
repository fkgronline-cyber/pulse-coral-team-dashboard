import { createFileRoute } from "@tanstack/react-router";
import { ReportView } from "@/components/ReportView";

export const Route = createFileRoute("/reports_/extracts")({
  head: () => ({ meta: [
    { title: "تقرير المستخلصات — ناقل" },
    { name: "description", content: "تفاصيل المستخلصات والإجماليات خلال الفترة المحددة في ناقل." },
    { property: "og:title", content: "تقرير المستخلصات — ناقل" },
    { property: "og:description", content: "تفاصيل المستخلصات والإجماليات خلال الفترة المحددة." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ReportPage,
});

function ReportPage() {
  return <ReportView title="تقرير المستخلصات" section="تفاصيل المستخلصات" metrics={[ ["عدد المستخلصات", "4"], ["عدد سطور الرحلات", "221"], ["الكمية بالوحدات", "3,053"], ["الوزن (طن)", "11,357.16"], ["القيمة بعد الضريبة (ر.س)", "2,612,146.80"] ]} records={[
{ name: "مستخلص رقم 6", extractId: "مستخلص رقم 6", date: "حتى 09/11/2026", values: [["عدد السطور", "43"], ["الكمية", "567"], ["الوزن (طن)", "2,109.24"], ["قبل الضريبة", "421,848.00"], ["الضريبة", "63,277.20"], ["الإجمالي بعد الضريبة", "485,125.20 ر.س"]] },
{ name: "مستخلص رقم 5", extractId: "مستخلص رقم 5", date: "حتى 09/11/2026", values: [["عدد السطور", "48"], ["الوزن (طن)", "2,525.88"], ["قبل الضريبة", "505,176.00 ر.س"]] },
{ name: "مستخلص رقم 4", extractId: "مستخلص رقم 4", date: "حتى 09/11/2026", values: [["عدد السطور", "34"], ["الوزن (طن)", "1,744.68"], ["قبل الضريبة", "348,936.00 ر.س"]] },
{ name: "مستخلص ناقل", extractId: "مستخلص ناقل", date: "حتى 09/11/2026", values: [["عدد السطور", "96"], ["الوزن (طن)", "4,977.36"], ["قبل الضريبة", "995,472.00 ر.س"]] }
]} />;
}
