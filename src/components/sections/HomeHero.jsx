import Link from "next/link";
import styles from "./HomeHero.module.css";

const benefits = [
  "Gestión preventiva",
  "Acompañamiento especializado",
  "Atención empresarial cercana",
  "Cumplimiento normativo",
];

export default function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>25+ AÑOS DE RESPALDO EMPRESARIAL EN COLOMBIA</p>

          <h1 className={styles.title}>
            Gestión administrativa y <span>seguridad social</span> para empresas
            que buscan tranquilidad
          </h1>

          <p className={styles.description}>
            Acompañamos a empresas colombianas en seguridad social, nómina,
            cumplimiento normativo y gestión preventiva con atención cercana y
            especializada.
          </p>

          <div className={styles.benefits} aria-label="Beneficios principales">
            {benefits.map((benefit) => (
              <div className={styles.benefit} key={benefit}>
                <span className={styles.check} aria-hidden="true">
                  ✓
                </span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <Link href="/cotizador" className={styles.primaryButton}>
              Cotizar solución en línea
              <span aria-hidden="true">→</span>
            </Link>

            <Link href="/servicios" className={styles.secondaryButton}>
              Explorar portafolio
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <img
            className={styles.image}
            src="https://images.unsplash.com/photo-1758518730151-cf64fddb4f0a?auto=format&fit=crop&w=1800&q=88"
            alt="Equipo de profesionales reunido revisando información empresarial"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
