"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

export default function UnisoftScrollEffects() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const targets = document.querySelectorAll(`.${styles.page} .${styles.scrollReveal}`);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove(styles.scrollPending);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

    targets.forEach((target) => {
      if (target.getBoundingClientRect().top < window.innerHeight) return;
      target.classList.add(styles.scrollPending);
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
      targets.forEach((target) => target.classList.remove(styles.scrollPending));
    };
  }, []);

  return null;
}
