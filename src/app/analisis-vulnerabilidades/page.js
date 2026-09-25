export default function Page() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            Autodiagnóstico en línea
          </span>
          <h1>
            Análisis de vulnerabilidades laborales
          </h1>
          <p>
            Identifica áreas que requieren revisión mediante una lista de chequeo y un indicador gráfico de riesgo.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container audit-grid">
          <div>
            <div className="level-row">
              <div className="level low">
                <strong>
                  Nivel Bajo (0–25%)
                </strong>
                <span>
                  Operación controlada y soportes al día.
                </span>
              </div>
              <div className="level medium">
                <strong>
                  Nivel Medio (26–60%)
                </strong>
                <span>
                  Existen observaciones que requieren revisión.
                </span>
              </div>
              <div className="level high">
                <strong>
                  Nivel Alto (61–100%)
                </strong>
                <span>
                  Se identifican riesgos que requieren atención prioritaria.
                </span>
              </div>
            </div>
            <div className="check-panel">
              <span className="eyebrow">
                Autodiagnóstico en línea
              </span>
              <h2 className="panel-title checklist-title">
                Lista de Chequeo Rápida (7 puntos críticos)
              </h2>
              <p className="panel-copy">
                Cada ítem muestra un estado demostrativo de cumplimiento para visualizar el comportamiento de la herramienta.
              </p>
              <div className="question ok">
                <div className="qnum">
                  1
                </div>
                <div className="qtext">
                  <strong>
                    ¿Tiene certeza de que todos los contratos laborales vigentes están debidamente firmados, actualizados y archivados?
                  </strong>
                  <p>
                    Evita reclamaciones por contratos verbales o cláusulas desactualizadas frente al Código Sustantivo del Trabajo.
                  </p>
                </div>
                <span className="status status-ok">
                  ✓ Cumple
                </span>
              </div>
              <div className="question alert">
                <div className="qnum">
                  2
                </div>
                <div className="qtext">
                  <strong>
                    ¿Sus liquidaciones de nómina aplican correctamente los topes del IBC y las exoneraciones tributarias?
                  </strong>
                  <p>
                    La revisión del IBC ayuda a prevenir diferencias en aportes y posibles requerimientos de la UGPP.
                  </p>
                </div>
                <span className="status status-alert">
                  ✕ Alerta
                </span>
              </div>
              <div className="question ok">
                <div className="qnum">
                  3
                </div>
                <div className="qtext">
                  <strong>
                    ¿Cuenta con soporte firmado de entrega periódica de dotaciones y descansos remunerados según la ley colombiana?
                  </strong>
                  <p>
                    La documentación respaldatoria ayuda a reducir contingencias probatorias.
                  </p>
                </div>
                <span className="status status-ok">
                  ✓ Cumple
                </span>
              </div>
              <div className="question alert">
                <div className="qnum">
                  4
                </div>
                <div className="qtext">
                  <strong>
                    ¿Ha recibido algún requerimiento de información, persuasivo o sancionatorio de la UGPP en los últimos 3 años?
                  </strong>
                  <p>
                    Los antecedentes de fiscalización requieren seguimiento documental y respuesta oportuna.
                  </p>
                </div>
                <span className="status status-alert">
                  ✕ Alerta
                </span>
              </div>
              <div className="question ok">
                <div className="qnum">
                  5
                </div>
                <div className="qtext">
                  <strong>
                    ¿Mantiene actualizados los exámenes ocupacionales y soportes de Seguridad y Salud en el Trabajo?
                  </strong>
                  <p>
                    La actualización periódica permite evidenciar acciones preventivas y cumplimiento documental.
                  </p>
                </div>
                <span className="status status-ok">
                  ✓ Cumple
                </span>
              </div>
              <div className="question ok">
                <div className="qnum">
                  6
                </div>
                <div className="qtext">
                  <strong>
                    ¿Cuenta con políticas y soportes claros para incapacidades, licencias y novedades de afiliación?
                  </strong>
                  <p>
                    La trazabilidad reduce reprocesos y facilita la atención ante EPS, ARL y fondos.
                  </p>
                </div>
                <span className="status status-ok">
                  ✓ Cumple
                </span>
              </div>
              <div className="question alert">
                <div className="qnum">
                  7
                </div>
                <div className="qtext">
                  <strong>
                    ¿Tiene definido a quién acudir cuando aparece una novedad laboral, tributaria o de seguridad social?
                  </strong>
                  <p>
                    Contar con una ruta de atención permite actuar antes de que el problema escale.
                  </p>
                </div>
                <span className="status status-alert">
                  ✕ Alerta
                </span>
              </div>
            </div>
          </div>
          <aside>
            <div className="risk-box">
              <div className="risk-head">
                <span className="eyebrow">
                  Termómetro de riesgo en vivo
                </span>
                <span className="risk-pill">
                  Riesgo Medio
                </span>
              </div>
              <div className="gauge-wrap">
                <div className="gauge" style={{"--p": 55}}>
                  <div className="needle"></div>
                </div>
              </div>
              <div className="gauge-value">
                55%
              </div>
              <p className="risk-sub">
                de vulnerabilidad potencial detectada
              </p>
              <div className="interpret">
                <strong>
                  Riesgo moderado
                </strong>
                <p>
                  Existen puntos de atención en nómina, documentación y procesos de seguridad social que ameritan revisión técnica.
                </p>
              </div>
              <a className="btn btn-primary full" href="/contacto">
                Solicitar acompañamiento
              </a>
            </div>
            <div className="legal-box">
              <span className="eyebrow">
                Marco legal aplicable
              </span>
              <ul>
                <li>
                  <strong>
                    Estatuto Tributario & Ley UGPP:
                  </strong>
                  aportes parafiscales y procesos de fiscalización.
                </li>
                <li>
                  <strong>
                    Código Sustantivo del Trabajo:
                  </strong>
                  relaciones laborales, contratos y novedades.
                </li>
                <li>
                  <strong>
                    Decreto 1072 y estándares SG-SST:
                  </strong>
                  lineamientos de seguridad y salud en el trabajo.
                </li>
                <li>
                  <strong>
                    Ley 1581 de 2012:
                  </strong>
                  protección de datos personales.
                </li>
              </ul>
            </div>
          </aside>
        </div>
        <div className="container">
          <div className="analysis-final-cta">
            <div>
              <span className="eyebrow" style={{color: "#ffd35b"}}>
                Siguiente paso
              </span>
              <h2>
                Solicita tu plan de mitigación
              </h2>
              <p>
                Con el resultado del diagnóstico, Unialiados puede ayudarte a priorizar hallazgos y definir una ruta de acompañamiento para tu empresa.
              </p>
            </div>
            <a className="btn btn-gold" href="/contacto">
              Solicitar plan →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
