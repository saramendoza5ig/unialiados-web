"use client";

import { useRef } from "react";
import styles from "./page.module.css";

export default function DashboardTilt({ children }) {
  const previewRef = useRef(null);

  function handlePointerMove(event) {
    if (event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    previewRef.current?.style.setProperty("--tilt-x", `${2 - y * 6}deg`);
    previewRef.current?.style.setProperty("--tilt-y", `${-4 + x * 8}deg`);
  }

  function handlePointerLeave() {
    previewRef.current?.style.removeProperty("--tilt-x");
    previewRef.current?.style.removeProperty("--tilt-y");
  }

  return (
    <div className={styles.previewStage} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <div ref={previewRef} className={styles.preview} aria-label="Vista ilustrativa de los módulos de Unisoft">
        {children}
      </div>
    </div>
  );
}
