import QuoteSection from "@/components/sections/QuoteSection";

export default function Page() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Nuestros servicios</span>
          <h1>Gestión empresarial clara, organizada y acompañada.</h1>
          <p>
            Unialiados presta servicios especializados para facilitar la gestión
            laboral, el cumplimiento de las obligaciones de seguridad social y la
            administración de procesos de nómina y asuntos jurídicos laborales.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-tabs" aria-label="Categorías de servicios">
            <span className="active">Todos los servicios</span>
            <span>Seguridad Social</span>
            <span>Nómina</span>
            <span>Gestión Legal</span>
          </div>

          <div className="services-grid">
            <article className="service-card featured">
              <div className="service-top">
                <div className="icon">✚</div>
                <span className="tag">Seguridad Social</span>
              </div>
              <h3>Gestión en seguridad social</h3>
              <p>
                Acompañamiento integral en los procesos de afiliación, aportes,
                novedades y trámites relacionados con el sistema de seguridad social.
              </p>
              <h4>Incluye</h4>
              <ul>
                <li>Afiliación de la empresa y sus trabajadores a EPS, AFP, ARL y cajas de compensación.</li>
                <li>Recepción, entrega y cargue de documentos requeridos por las entidades.</li>
                <li>Capacitación y actualización sobre la Ley 100 en EPS, AFP, ARL y cajas de compensación.</li>
                <li>Generación de planillas y pago de autoliquidaciones mediante PILA.</li>
                <li>Orientación en servicios de IPS: lugares, clínicas y hospitales.</li>
                <li>Reporte de accidentes laborales, trámites y recobros de incapacidades.</li>
                <li>Manejo de licencias y permisos.</li>
                <li>Entrega de paz y salvos al finalizar contratos.</li>
                <li>Cargue de información en UNISOFT.</li>
              </ul>
              <a className="btn btn-primary" href="#cotizador">Cotizar servicio</a>
            </article>

            <article className="service-card">
              <div className="service-top">
                <div className="icon">▤</div>
                <span className="tag">Nómina</span>
              </div>
              <h3>Gestión de nómina</h3>
              <p>
                Servicio integral de apoyo a la gestión de nómina, desde la
                documentación laboral hasta la liquidación periódica y el cumplimiento
                de obligaciones asociadas.
              </p>
              <h4>Incluye</h4>
              <ul>
                <li>Gestión relacionada con seguridad social.</li>
                <li>Elaboración de contratos de trabajo según las necesidades de la empresa.</li>
                <li>Liquidación de nómina con información y novedades actualizadas.</li>
                <li>Generación de desprendibles de pago mensuales.</li>
                <li>Liquidación de prestaciones sociales: primas, cesantías, intereses y vacaciones.</li>
                <li>Envío de la nómina electrónica a la DIAN.</li>
              </ul>
              <a className="btn btn-primary" href="#cotizador">Cotizar servicio</a>
            </article>

            <article className="service-card">
              <div className="service-top">
                <div className="icon">§</div>
                <span className="tag">Gestión Legal</span>
              </div>
              <h3>Gestión legal y jurídica en aspectos laborales</h3>
              <p>
                Acompañamiento en asuntos laborales y requerimientos que requieren
                orientación jurídica y conocimiento de la normativa vigente.
              </p>
              <h4>Incluye</h4>
              <ul>
                <li>Elaboración de contratos de trabajo según las necesidades de la empresa.</li>
                <li>Liquidación de contratos.</li>
                <li>Acompañamiento en demandas laborales.</li>
                <li>Gestión de carteras de seguridad social.</li>
                <li>Atención de reclamaciones de la UGPP.</li>
                <li>Asesoría y orientación para procesos de pensión.</li>
              </ul>
              <a className="btn btn-primary" href="#cotizador">Cotizar servicio</a>
            </article>
          </div>
        </div>
      </section>

      <QuoteSection />

      <section className="section alt">
        <div className="container">
          <div className="unisoft-panel">
            <div className="unisoft-icon" aria-hidden="true">U</div>
            <div>
              <span className="eyebrow">Tecnología para apoyar la gestión</span>
              <h2>Unisoft: información más organizada y fácil de consultar</h2>
              <p>
                Unialiados cuenta con Unisoft, una herramienta tecnológica propia que
                facilita la organización y consulta de información relacionada con
                los procesos administrativos de las empresas y sus trabajadores.
              </p>
              <div className="unisoft-points">
                <span>✓ Mejor trazabilidad de la información</span>
                <span>✓ Simplificación de tareas administrativas</span>
                <span>✓ Acceso más ágil a datos relevantes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <div>
              <span className="eyebrow" style={{ color: "#ffd35b" }}>
                SOLUCIONES A LA MEDIDA
              </span>
              <h2>¿Necesitas apoyo para un proceso específico?</h2>
              <p>
                Cuéntanos tu necesidad y definiremos el alcance adecuado para tu
                empresa.
              </p>
            </div>
            <div className="actions">
              <a className="btn btn-gold" href="#cotizador">Solicitar cotización</a>
              <a className="btn btn-light" href="/contacto">Hablar con un asesor</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
