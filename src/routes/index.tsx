import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "نبض — لوحة تحكم حيّة لفريقك" },
      { name: "description", content: "واجهة لوحة تحكم نابضة بالحياة: إحصاءات، مهام، ونشاط الفريق لحظة بلحظة." },
      { property: "og:title", content: "نبض — لوحة تحكم حيّة لفريقك" },
      { property: "og:description", content: "واجهة لوحة تحكم نابضة بالحياة: إحصاءات، مهام، ونشاط الفريق." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const bars = [40, 65, 50, 85, 70, 95, 60];
const days = ["سبت", "أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"];
const initialTasks = [
  { t: "مراجعة تصميم الصفحة الرئيسية", tag: "تصميم", done: true },
  { t: "إطلاق حملة الشتاء", tag: "تسويق", done: false },
  { t: "اجتماع مع فريق التطوير", tag: "فريق", done: false },
];
const people = [
  { n: "سارة", a: "أنهت مهمة «الهوية البصرية»", c: "bg-primary" },
  { n: "خالد", a: "علّق على تقرير المبيعات", c: "bg-secondary" },
  { n: "ليان", a: "أضافت 3 ملفات جديدة", c: "bg-accent" },
];

function Index() {
  const [tasks, setTasks] = useState(initialTasks);
  const [active, setActive] = useState(5);
  const done = tasks.filter((x) => x.done).length;

  return (
    <div className="min-h-screen pb-28">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6">
        <div className="flex items-center gap-2">
          <span className="relative grid size-10 place-items-center rounded-2xl bg-sunrise shadow-pop">
            <span className="absolute size-3 rounded-full bg-primary-foreground animate-pulse-ring" />
            <span className="size-3 rounded-full bg-primary-foreground" />
          </span>
          <span className="font-display text-3xl">نبض</span>
        </div>
        <div className="flex size-11 items-center justify-center rounded-full bg-ink font-bold text-ink-foreground">م</div>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        <section className="animate-rise mt-8">
          <p className="text-muted-foreground">صباح الخير يا محمد ☀️</p>
          <h1 className="font-display mt-1 text-5xl leading-tight md:text-6xl">
            يومك <span className="text-primary">مليء</span> بالإنجاز
          </h1>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="animate-rise relative overflow-hidden rounded-3xl bg-sunrise p-6 text-primary-foreground shadow-pop md:col-span-2">
            <div className="absolute -left-10 -top-10 size-40 rounded-full bg-lime/40 blur-2xl animate-float" />
            <p className="relative opacity-90">الإيرادات هذا الأسبوع</p>
            <p className="font-display relative mt-1 text-5xl">48,250 ر.س</p>
            <span className="relative mt-2 inline-block rounded-full bg-ink px-3 py-1 text-sm text-lime">▲ 18% عن الأسبوع الماضي</span>
            <div className="relative mt-6 flex h-32 items-end gap-2">
              {bars.map((h, i) => (
                <button key={i} onClick={() => setActive(i)} className="flex flex-1 flex-col items-center gap-2" aria-label={days[i]}>
                  <span
                    className={`animate-grow w-full rounded-xl transition-colors ${i === active ? "bg-ink" : "bg-primary-foreground/40"}`}
                    style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
                  />
                  <span className="text-[11px] opacity-90">{days[i]}</span>
                </button>
              ))}
            </div>
          </article>

          <article className="animate-rise rounded-3xl bg-ink p-6 text-ink-foreground" style={{ animationDelay: "100ms" }}>
            <p className="opacity-80">تقدّم المهام</p>
            <div className="mt-4 flex items-center justify-center">
              <div className="relative grid size-36 place-items-center rounded-full"
                style={{ background: `conic-gradient(var(--lime) ${(done / tasks.length) * 360}deg, color-mix(in oklab, var(--ink-foreground) 15%, transparent) 0)` }}>
                <div className="grid size-28 place-items-center rounded-full bg-ink">
                  <span className="font-display text-4xl text-lime">{Math.round((done / tasks.length) * 100)}%</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm opacity-80">{done} من {tasks.length} مهام مكتملة</p>
          </article>

          <article className="animate-rise rounded-3xl bg-card p-6 md:col-span-2" style={{ animationDelay: "200ms" }}>
            <h2 className="font-display text-2xl">مهام اليوم</h2>
            <ul className="mt-4 space-y-3">
              {tasks.map((task, i) => (
                <li key={i}>
                  <button
                    onClick={() => setTasks(tasks.map((x, j) => (j === i ? { ...x, done: !x.done } : x)))}
                    className="flex w-full items-center gap-3 rounded-2xl bg-muted p-4 text-right transition hover:-translate-y-0.5"
                  >
                    <span className={`grid size-7 shrink-0 place-items-center rounded-full border-2 transition ${task.done ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"}`}>
                      {task.done ? "✓" : ""}
                    </span>
                    <span className={`flex-1 font-medium ${task.done ? "text-muted-foreground line-through" : ""}`}>{task.t}</span>
                    <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">{task.tag}</span>
                  </button>
                </li>
              ))}
            </ul>
          </article>

          <article className="animate-rise rounded-3xl bg-secondary p-6 text-secondary-foreground" style={{ animationDelay: "300ms" }}>
            <h2 className="font-display text-2xl">نشاط الفريق</h2>
            <ul className="mt-4 space-y-4">
              {people.map((p) => (
                <li key={p.n} className="flex items-center gap-3">
                  <span className={`grid size-10 place-items-center rounded-full font-bold text-ink ${p.c}`}>{p.n[0]}</span>
                  <div>
                    <p className="font-semibold">{p.n}</p>
                    <p className="text-sm opacity-80">{p.a}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-4 mx-auto flex w-fit gap-1 rounded-full bg-ink p-2 text-ink-foreground shadow-pop">
        {["الرئيسية", "المهام", "الفريق", "التقارير"].map((l, i) => (
          <a key={l} href="#" className={`rounded-full px-4 py-2 text-sm ${i === 0 ? "bg-lime text-ink font-semibold" : "opacity-80"}`}>{l}</a>
        ))}
      </nav>
    </div>
  );
}
