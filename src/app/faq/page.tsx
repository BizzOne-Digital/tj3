"use client";

import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { api } from "@/lib/api";
import { STATIC_FAQ } from "@/lib/home-content";
import { faqJsonLd } from "@/lib/seo";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

function FaqAccordion({
  items,
}: {
  items: { _id: string; question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item._id} className="glass-panel overflow-hidden rounded-xl">
          <button
            className="flex w-full items-center justify-between px-6 py-4 text-left"
            onClick={() => setOpen(open === item._id ? null : item._id)}
            aria-expanded={open === item._id}
          >
            <span className="font-medium text-white">{item.question}</span>
            <ChevronDown
              className={cn("h-5 w-5 shrink-0 text-ice transition-transform", open === item._id && "rotate-180")}
            />
          </button>
          {open === item._id && (
            <div className="border-t border-border px-6 py-4 text-cool-grey">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FaqPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["faq"],
    queryFn: () => api.getFaq(),
  });

  const apiItems = data?.data.filter((f) => f.published) ?? [];
  const items =
    apiItems.length > 0
      ? apiItems
      : STATIC_FAQ.map((f, i) => ({ _id: `static-${i}`, ...f }));

  return (
    <>
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(items.map((i) => ({ question: i.question, answer: i.answer })))),
          }}
        />
      )}
      <PageHero title="FAQ" subtitle="Answers to common questions about Little Mounties Community Sports Complex." />
      <section className="py-24">
        <Container className="max-w-3xl">
          {isLoading ? (
            <p className="text-center text-cool-grey">Loading...</p>
          ) : (
            <FaqAccordion items={items} />
          )}
        </Container>
      </section>
    </>
  );
}
