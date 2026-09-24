"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const selector = ".hero-grid, .page-hero .container, .section-head, .why-grid, .process, .card, .service-card, .person, .partner-card, .panel, .cta, .question, .contact-item, .legal-id-card, .quote-card, .quote-final, .analysis-final-cta";

export default function SiteEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll(selector);
    targets.forEach((element) => element.classList.add("reveal-on-scroll"));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("reveal-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <a className="whatsapp-float" href="https://wa.me/573004455981" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp"><span>◉</span></a>
  );
}
