export default function Page() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Nuestros servicios</span>
          <h1>Gestión empresarial clara, organizada y acompañada.</h1>
          <p>
            Apoyamos a las empresas en sus procesos de nómina, seguridad social y
            requerimientos administrativos específicos.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-tabs" aria-label="Categorías de servicios">
            <span className="active">Todos los servicios</span>
            <span>Nómina</span>
            <span>Seguridad Social</span>
            <span>Consultoría</span>
          </div>

          <div className="services-grid">
            <article className="service-card featured">
              <div className="service-top">
                <div className="icon">▤</div>
                <span className="tag">Nómina empresarial</span>
              </div>
              <h3>Gestión y administración de nómina empresarial</h3>
              <p>
                Acompañamiento integral desde la vinculación de trabajadores hasta
                el procesamiento de novedades y obligaciones periódicas.
              </p>
              <h4>Incluye</h4>
              <ul>
                <li>Contratos laborales y afiliación a seguridad social.</li>
                <li>Liquidación de nómina ordinaria y extraordinaria.</li>
                <li>Gestión de novedades, incapacidades y accidentes laborales.</li>
                <li>Planillas PILA, prestaciones y desprendibles de pago.</li>
                <li>Reporte de nómina electrónica.</li>
              </ul>
              <div className="benefit">
                <strong>Beneficio principal</strong>
                <span>
                  Mayor organización y menor carga administrativa en los procesos de
                  nómina y cumplimiento laboral.
                </span>
              </div>
              <a className="btn btn-primary" href="/cotizador">Cotizar servicio</a>
            </article>

            <article className="service-card">
              <div className="service-top">
                <div className="icon">✚</div>
                <span className="tag">Seguridad Social</span>
              </div>
              <h3>Gestión integral de seguridad social</h3>
              <p>
                Administración y seguimiento de afiliaciones, aportes, incapacidades
                y demás procesos del sistema de seguridad social.
              </p>
              <h4>Incluye</h4>
              <ul>
                <li>Afiliaciones a EPS, ARL, AFP y cajas de compensación.</li>
                <li>Registro en PILA, gestión y pago de aportes.</li>
                <li>Actualización de novedades e incapacidades.</li>
                <li>Seguimiento y depuración de cartera.</li>
                <li>Organización documental e informes de gestión.</li>
              </ul>
              <div className="benefit">
                <strong>Beneficio principal</strong>
                <span>
                  Mayor control de los procesos y acompañamiento continuo frente a
                  novedades y requerimientos.
                </span>
              </div>
              <a className="btn btn-primary" href="/cotizador">Cotizar servicio</a>
            </article>

            <article className="service-card">
              <div className="service-top">
                <div className="icon">⌁</div>
                <span className="tag">Por evento</span>
              </div>
              <h3>Servicios de consultoría empresarial</h3>
              <p>
                Atención puntual para empresas que requieren apoyo específico en
                procesos administrativos, laborales o de seguridad social.
              </p>
              <h4>Puede incluir</h4>
              <ul>
                <li>Afiliaciones puntuales y elaboración de planillas PILA.</li>
                <li>Gestión de incapacidades y depuración de cartera.</li>
                <li>Revisión documental.</li>
                <li>Acompañamiento ante requerimientos específicos.</li>
                <li>Apoyo administrativo por evento.</li>
              </ul>
              <div className="benefit">
                <strong>Modalidad</strong>
                <span>
                  El servicio se presta por evento o requerimiento, de acuerdo con el
                  tipo y alcance de la necesidad.
                </span>
              </div>
              <a className="btn btn-primary" href="/contacto">Solicitar acompañamiento</a>
            </article>
          </div>
        </div>
      </section>

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
              <a className="btn btn-gold" href="/cotizador">Solicitar cotización</a>
              <a className="btn btn-light" href="/contacto">Hablar con un asesor</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
