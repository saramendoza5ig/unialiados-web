import Link from "next/link";
import DashboardTilt from "./DashboardTilt";
import UnisoftScrollEffects from "./UnisoftScrollEffects";
import styles from "./page.module.css";

export const metadata = {
  title: "Unisoft",
  description:
    "Conoce Unisoft, la plataforma de Unialiados para organizar empresas, trabajadores, afiliaciones, documentos y procesos de seguridad social.",
};

const capabilities = [
  {
    number: "01",
    title: "Empresas y trabajadores",
    description:
      "Organiza empresas, sucursales y fichas de trabajadores en un mismo lugar, con la información vinculada a cada sede.",
    detail: "Empresas · Sucursales · Perfiles",
  },
  {
    number: "02",
    title: "Afiliaciones y entidades",
    description:
      "Registra afiliaciones a EPS, ARL, AFP y cajas de compensación; consulta su estado y los soportes asociados.",
    detail: "Registro · Verificación · Soportes",
  },
  {
    number: "03",
    title: "Documentos bajo control",
    description:
      "Centraliza documentos de empresas y trabajadores, sus vigencias, vencimientos y archivos para facilitar el seguimiento.",
    detail: "Vigencias · Adjuntos · Consulta",
  },
  {
    number: "04",
    title: "Novedades laborales",
    description:
      "Mantén el historial de incapacidades y accidentes laborales con fechas, observaciones y soportes en cada registro.",
    detail: "Incapacidades · Accidentes · Historial",
  },
  {
    number: "05",
    title: "Planillas e información",
    description:
      "Consulta planillas de seguridad social por empresa y sucursal, junto con informes y comunicados de la operación.",
    detail: "Planillas · Informes · Comunicados",
  },
  {
    number: "06",
    title: "Acceso según el perfil",
    description:
      "Cada usuario encuentra la información correspondiente a su rol, con un panel de indicadores, pendientes y actividad reciente.",
    detail: "Administrador · Empresa · Trabajador",
  },
];

export default function Page() {
  return (
    <main className={styles.page}>
      <UnisoftScrollEffects />
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <span className={styles.heroKicker}><i /> PLATAFORMA DIGITAL UNISOFT <span>01 / 06</span></span>
            <h1>Tu operación, <span>más conectada.</span></h1>
            <p>
              Una plataforma para reunir empresas, trabajadores y procesos de seguridad
              social. Consulta la información, registra novedades y da seguimiento a
              cada proceso desde un mismo entorno.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryAction} href="mailto:comercial@unialiados.com?subject=Quiero%20conocer%20Unisoft">
                Solicitar una demostración <span aria-hidden="true">↗</span>
              </a>
              <a className={styles.secondaryAction} href="#funcionalidades">Explorar funcionalidades <span aria-hidden="true">↓</span></a>
            </div>
            <div className={styles.heroNotes}>
              <span>Información centralizada</span>
              <span>Seguimiento por empresa y sede</span>
              <span>Consulta según el perfil</span>
            </div>
          </div>

          <DashboardTilt>
            <div className={styles.previewBar}>
              <span className={styles.windowDots} aria-hidden="true"><i /><i /><i /></span>
              <span className={styles.previewBrand}>U<span>nisoft</span><small> / workspace</small></span>
              <span className={styles.previewStatus}><i /> Entorno de gestión</span>
            </div>
            <div className={styles.previewBody}>
              <aside className={styles.previewSidebar} aria-hidden="true">
                <span className={styles.sidebarActive}>▦ <b>Resumen</b></span>
                <span>▤ <b>Empresas</b></span>
                <span>♙ <b>Trabajadores</b></span>
                <span>✓ <b>Afiliaciones</b></span>
                <span>▧ <b>Documentos</b></span>
              </aside>
              <div className={styles.previewContent}>
                <small>UNISOFT / VISTA GENERAL</small>
                <h2>Panel de gestión</h2>
                <p>Consulta los procesos según tu perfil y mantén visible la información que necesitas.</p>
                <div className={styles.previewCards}>
                  <div><span>01 / Empresas y sedes</span><strong>Organizadas</strong><i className={styles.blueLine} /></div>
                  <div><span>02 / Documentos</span><strong>Disponibles</strong><i className={styles.goldLine} /></div>
                </div>
                <div className={styles.previewList}>
                  <strong>Procesos principales</strong>
                  <span><i /> Afiliaciones <em>Consultar</em></span>
                  <span><i /> Planillas de seguridad social <em>Consultar</em></span>
                  <span><i /> Incapacidades y accidentes <em>Consultar</em></span>
                </div>
              </div>
            </div>
            <span className={styles.previewCaption}>Vista ilustrativa de los módulos de la plataforma</span>
          </DashboardTilt>
        </div>
      </section>

      <section className={styles.intro}>
        <div className="container">
          <div className={`${styles.introGrid} ${styles.scrollReveal}`}>
            <div>
              <span className="eyebrow">Una operación más visible</span>
              <h2>Menos información dispersa. Más contexto para actuar.</h2>
            </div>
            <p>
              Desde una empresa o la ficha de un trabajador, Unisoft conecta los
              registros con sus documentos y procesos relacionados. Así es más fácil
              encontrar antecedentes, revisar pendientes y consultar soportes cuando
              se necesitan.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.features} id="funcionalidades">
        <div className="container">
          <div className={`${styles.sectionHeading} ${styles.scrollReveal}`}>
            <span className="eyebrow">Qué puedes gestionar</span>
            <h2>Funcionalidades para el día a día de tu empresa</h2>
            <p>Los módulos se conectan alrededor de las empresas, sus sedes y sus trabajadores.</p>
          </div>
          <div className={`${styles.featureGrid} ${styles.scrollReveal}`}>
            {capabilities.map((item) => (
              <article className={styles.featureCard} key={item.number}>
                <span className={styles.featureNumber}>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className={styles.featureDetail}>{item.detail}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.workflow}>
        <div className={`container ${styles.workflowGrid} ${styles.scrollReveal}`}>
          <div>
            <span className="eyebrow">Pensado para distintos usuarios</span>
            <h2>Cada persona accede a lo que le corresponde</h2>
            <p>
              Unisoft contempla perfiles de administrador, operador, empresa y
              trabajador. La información se presenta de acuerdo con el alcance de
              cada usuario para facilitar la consulta y el seguimiento.
            </p>
          </div>
          <div className={styles.roleList}>
            <div><strong>01</strong><span><b>Administración y operación</b><small>Gestiona registros, entidades y procesos.</small></span></div>
            <div><strong>02</strong><span><b>Empresa</b><small>Consulta información de su empresa y sedes dentro de su alcance.</small></span></div>
            <div><strong>03</strong><span><b>Trabajador</b><small>Accede a su perfil y a los registros disponibles para consulta.</small></span></div>
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className="container">
          <div className={`${styles.finalCard} ${styles.scrollReveal}`}>
            <div>
              <span className="eyebrow">Conoce Unisoft</span>
              <h2>Hablemos de lo que necesita tu empresa.</h2>
              <p>Solicita una demostración y una propuesta para incorporar la plataforma a tu operación.</p>
            </div>
            <div className={styles.finalActions}>
              <a className="btn btn-gold" href="mailto:comercial@unialiados.com?subject=Solicitar%20propuesta%20de%20Unisoft">Solicitar propuesta</a>
              <Link className="btn btn-light" href="/contacto">Ver canales de contacto</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
