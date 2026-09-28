"use client";

import { useEffect, useMemo, useState } from "react";

const questions = [
  {
    id: 1,
    text: "¿Tiene certeza de que todos los contratos laborales vigentes están debidamente firmados, actualizados y archivados?",
    note: "Evita reclamaciones por contratos verbales o cláusulas desactualizadas frente al Código Sustantivo del Trabajo.",
    riskWhen: false,
  },
  {
    id: 2,
    text: "¿Sus liquidaciones de nómina aplican correctamente los topes del IBC y las exoneraciones tributarias?",
    note: "La revisión del IBC ayuda a prevenir diferencias en aportes y posibles requerimientos de la UGPP.",
    riskWhen: false,
  },
  {
    id: 3,
    text: "¿Cuenta con soporte firmado de entrega periódica de dotaciones y descansos remunerados según la ley colombiana?",
    note: "La documentación respaldatoria ayuda a reducir contingencias probatorias.",
    riskWhen: false,
  },
  {
    id: 4,
    text: "¿Ha recibido algún requerimiento de información, persuasivo o sancionatorio de la UGPP en los últimos 3 años?",
    note: "Los antecedentes de fiscalización requieren seguimiento documental y respuesta oportuna.",
    riskWhen: true,
  },
  {
    id: 5,
    text: "¿Mantiene actualizados los exámenes ocupacionales y soportes de Seguridad y Salud en el Trabajo?",
    note: "La actualización periódica permite evidenciar acciones preventivas y cumplimiento documental.",
    riskWhen: false,
  },
  {
    id: 6,
    text: "¿Cuenta con políticas y soportes claros para incapacidades, licencias y novedades de afiliación?",
    note: "La trazabilidad reduce reprocesos y facilita la atención ante EPS, ARL y fondos.",
    riskWhen: false,
  },
  {
    id: 7,
    text: "¿Tiene definido a quién acudir cuando aparece una novedad laboral, tributaria o de seguridad social?",
    note: "Contar con una ruta de atención permite actuar antes de que el problema escale.",
    riskWhen: false,
  },
];

const emptyLead = {
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  empleados: "",
  sector: "",
};

function riskLevelFor(percent) {
  if (percent <= 25) {
    return {
      key: "low",
      label: "Riesgo Bajo",
      text: "Su operación se encuentra controlada y con soportes al día. Recomendamos mantener el seguimiento periódico.",
    };
  }

  if (percent <= 60) {
    return {
      key: "medium",
      label: "Riesgo Medio",
      text: "Existen puntos de atención en nómina, documentación y procesos de seguridad social que ameritan revisión técnica.",
    };
  }

  return {
    key: "high",
    label: "Riesgo Alto",
    text: "Se identifican riesgos que requieren atención prioritaria. Le recomendamos solicitar acompañamiento especializado lo antes posible.",
  };
}

function Icon({ name }) {
  const paths = {
    shield: (
      <>
        <path d="M12 3 5.5 5.6v5.7c0 4.3 2.7 7.7 6.5 9.7 3.8-2 6.5-5.4 6.5-9.7V5.6L12 3Z" />
        <path d="m9.3 12 1.8 1.8 3.8-4" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 1.8" />
      </>
    ),
    chart: (
      <>
        <path d="M5 19V9" />
        <path d="M12 19V5" />
        <path d="M19 19v-7" />
        <path d="M3 19h18" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    refresh: (
      <>
        <path d="M20 11a8 8 0 1 0-2.4 5.7" />
        <path d="M20 5v6h-6" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

export default function Page() {
  const [step, setStep] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [answers, setAnswers] = useState({});
  const [lead, setLead] = useState(emptyLead);
  const [errors, setErrors] = useState({});
  const [gaugePercent, setGaugePercent] = useState(0);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  const alertCount = useMemo(
    () =>
      questions.reduce((total, question) => {
        if (!(question.id in answers)) return total;
        return total + (answers[question.id] === question.riskWhen ? 1 : 0);
      }, 0),
    [answers]
  );

  const riskPercent = Math.round((alertCount / questions.length) * 100);
  const risk = riskLevelFor(riskPercent);

  useEffect(() => {
    if (step !== "result") {
      setGaugePercent(0);
      return undefined;
    }

    let frame;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const linear = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - linear, 3);
      setGaugePercent(Math.round(riskPercent * eased));
      if (linear < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [step, riskPercent]);

  function isAlert(question, value) {
    return value === question.riskWhen;
  }

  function goToQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTransitioning(false);
    }, 220);
  }

  function handleAnswer(value) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setTransitioning(true);

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((index) => index + 1);
      } else {
        setStep("lead");
      }
      setTransitioning(false);
    }, 320);
  }

  function handleLeadChange(field, value) {
    setLead((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleLeadSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!lead.nombre.trim()) nextErrors.nombre = "Ingrese su nombre.";

    if (!lead.email.trim()) {
      nextErrors.email = "Ingrese su correo electrónico.";
    } else if (!/^\S+@\S+\.\S+$/.test(lead.email)) {
      nextErrors.email = "Ingrese un correo válido.";
    }

    if (!lead.empresa.trim()) nextErrors.empresa = "Ingrese el nombre de la empresa.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStep("result");
  }

  function restart() {
    setStep("intro");
    setCurrentIndex(0);
    setTransitioning(false);
    setAnswers({});
    setLead(emptyLead);
    setErrors({});
  }

  const pendingMessage = {
    intro: "Completa el diagnóstico para calcular el nivel de vulnerabilidad de tu empresa.",
    checklist: `Llevas ${answeredCount} de ${questions.length} respuestas. El resultado se revelará al finalizar.`,
    lead: "Tu diagnóstico está listo. Completa tus datos para visualizar el resultado.",
  }[step];

  return (
    <main className="ua-audit">
      <section className="ua-hero">
        <div className="ua-container ua-hero-grid">
          <div className="ua-hero-copy">
            <span className="ua-eyebrow">Autodiagnóstico en línea</span>
            <h1>Análisis de vulnerabilidades laborales</h1>
            <p>
              Identifica puntos de atención en tu operación laboral y de seguridad social con una evaluación clara,
              rápida y visual.
            </p>
            <div className="ua-hero-meta">
              <span><Icon name="clock" /> Menos de 2 minutos</span>
              <span><Icon name="shield" /> 7 puntos críticos</span>
            </div>
          </div>

          <div className="ua-hero-visual" aria-hidden="true">
            <div className="ua-hero-orbit ua-orbit-one" />
            <div className="ua-hero-orbit ua-orbit-two" />
            <div className="ua-hero-card">
              <div className="ua-hero-card-icon"><Icon name="chart" /></div>
              <span>Lectura ejecutiva</span>
              <strong>Riesgo laboral</strong>
              <div className="ua-mini-scale">
                <i className="low" />
                <i className="medium" />
                <i className="high" />
              </div>
              <small>Resultado visual al finalizar</small>
            </div>
          </div>
        </div>
      </section>

      <section className="ua-section">
        <div className="ua-container">
          <div className="ua-level-row">
            <div className="ua-level low">
              <span className="ua-level-dot" />
              <div><strong>Nivel Bajo</strong><small>0–25%</small><p>Operación controlada y soportes al día.</p></div>
            </div>
            <div className="ua-level medium">
              <span className="ua-level-dot" />
              <div><strong>Nivel Medio</strong><small>26–60%</small><p>Existen observaciones que requieren revisión.</p></div>
            </div>
            <div className="ua-level high">
              <span className="ua-level-dot" />
              <div><strong>Nivel Alto</strong><small>61–100%</small><p>Se identifican riesgos de atención prioritaria.</p></div>
            </div>
          </div>

          <div className="ua-audit-grid">
            <div className="ua-main-column">
              {step === "intro" && (
                <div className="ua-panel ua-step-panel ua-intro-panel" key="intro">
                  <div className="ua-panel-kicker"><span>01</span> Diagnóstico gratuito</div>
                  <h2>¿Quieres conocer el nivel de riesgo de tu empresa?</h2>
                  <p className="ua-panel-copy">
                    Responde 7 preguntas rápidas sobre contratación, nómina, seguridad social y SST. Al finalizar
                    recibirás una lectura de riesgo con los principales puntos de atención.
                  </p>

                  <div className="ua-feature-row">
                    <div><span className="ua-feature-icon"><Icon name="clock" /></span><strong>Rápido</strong><small>Menos de 2 minutos</small></div>
                    <div><span className="ua-feature-icon"><Icon name="chart" /></span><strong>Visual</strong><small>Indicador de riesgo</small></div>
                    <div><span className="ua-feature-icon"><Icon name="lock" /></span><strong>Confidencial</strong><small>Datos protegidos</small></div>
                  </div>

                  <button type="button" className="ua-btn ua-btn-primary ua-btn-full" onClick={() => setStep("checklist")}>
                    Comenzar diagnóstico <Icon name="arrow" />
                  </button>
                </div>
              )}

              {step === "checklist" && (
                <div className="ua-panel" key={`question-${currentQuestion.id}`}>
                  <div className="ua-check-head">
                    <div>
                      <span className="ua-eyebrow ua-eyebrow-dark">Autodiagnóstico</span>
                      <h2>Lista de chequeo rápida</h2>
                      <p className="ua-panel-copy">Selecciona la opción que mejor representa la situación actual de tu empresa.</p>
                    </div>
                    <div className="ua-question-counter">
                      <strong>{String(currentIndex + 1).padStart(2, "0")}</strong>
                      <span>/ {String(questions.length).padStart(2, "0")}</span>
                    </div>
                  </div>

                  <div className="ua-progress-wrap">
                    <div className="ua-progress-labels">
                      <span>Progreso</span>
                      <strong>{progressPercent}%</strong>
                    </div>
                    <div className="ua-progress-track">
                      <div className="ua-progress-bar" style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>

                  <div className={`ua-question-card${transitioning ? " is-leaving" : ""}`}>
                    <div className="ua-question-number">{currentIndex + 1}</div>
                    <div className="ua-question-copy">
                      <span className="ua-question-label">Punto crítico {currentIndex + 1}</span>
                      <h3>{currentQuestion.text}</h3>
                      <p>{currentQuestion.note}</p>
                    </div>

                    <div className="ua-answer-grid">
                      <button
                        type="button"
                        className={`ua-answer yes${answers[currentQuestion.id] === true ? " selected" : ""}`}
                        disabled={transitioning}
                        onClick={() => handleAnswer(true)}
                      >
                        <span className="ua-answer-mark">✓</span>
                        <span><strong>Sí</strong><small>Esta condición se cumple</small></span>
                      </button>
                      <button
                        type="button"
                        className={`ua-answer no${answers[currentQuestion.id] === false ? " selected" : ""}`}
                        disabled={transitioning}
                        onClick={() => handleAnswer(false)}
                      >
                        <span className="ua-answer-mark">×</span>
                        <span><strong>No</strong><small>Esta condición no se cumple</small></span>
                      </button>
                    </div>
                  </div>

                  <div className="ua-question-nav">
                    <button type="button" onClick={() => goToQuestion(currentIndex - 1)} disabled={currentIndex === 0 || transitioning}>
                      ← Anterior
                    </button>
                    <span>{answeredCount} de {questions.length} respondidas</span>
                  </div>
                </div>
              )}

              {step === "lead" && (
                <div className="ua-panel ua-step-panel" key="lead">
                  <div className="ua-panel-kicker"><span>02</span> Un último paso</div>
                  <h2>Tu diagnóstico ya está listo</h2>
                  <p className="ua-panel-copy">
                    Completa tus datos para visualizar el resultado. Esta información también permitirá que un asesor
                    de Unialiados pueda orientarte sobre los hallazgos si lo requieres.
                  </p>

                  <div className="ua-lead-banner">
                    <span className="ua-lead-banner-icon"><Icon name="shield" /></span>
                    <div><strong>Información protegida</strong><small>Usaremos tus datos únicamente para este diagnóstico y su seguimiento.</small></div>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="ua-form">
                    <div className="ua-grid-2">
                      <div className="ua-field">
                        <label htmlFor="nombre">Nombre completo <b>*</b></label>
                        <input id="nombre" type="text" value={lead.nombre} onChange={(event) => handleLeadChange("nombre", event.target.value)} placeholder="Ej. Laura Gómez" />
                        {errors.nombre && <span className="ua-field-error">{errors.nombre}</span>}
                      </div>

                      <div className="ua-field">
                        <label htmlFor="email">Correo electrónico <b>*</b></label>
                        <input id="email" type="email" value={lead.email} onChange={(event) => handleLeadChange("email", event.target.value)} placeholder="nombre@empresa.com" />
                        {errors.email && <span className="ua-field-error">{errors.email}</span>}
                      </div>

                      <div className="ua-field">
                        <label htmlFor="telefono">Teléfono</label>
                        <input id="telefono" type="tel" value={lead.telefono} onChange={(event) => handleLeadChange("telefono", event.target.value)} placeholder="+57 300 000 0000" />
                      </div>

                      <div className="ua-field">
                        <label htmlFor="empresa">Nombre de la empresa <b>*</b></label>
                        <input id="empresa" type="text" value={lead.empresa} onChange={(event) => handleLeadChange("empresa", event.target.value)} placeholder="Nombre de la empresa" />
                        {errors.empresa && <span className="ua-field-error">{errors.empresa}</span>}
                      </div>

                      <div className="ua-field">
                        <label htmlFor="empleados">Número de empleados</label>
                        <select id="empleados" value={lead.empleados} onChange={(event) => handleLeadChange("empleados", event.target.value)}>
                          <option value="">Seleccione…</option>
                          <option value="1-10">1 a 10</option>
                          <option value="11-50">11 a 50</option>
                          <option value="51-200">51 a 200</option>
                          <option value="200+">Más de 200</option>
                        </select>
                      </div>

                      <div className="ua-field">
                        <label htmlFor="sector">Sector económico</label>
                        <input id="sector" type="text" placeholder="Ej. Construcción, comercio, servicios…" value={lead.sector} onChange={(event) => handleLeadChange("sector", event.target.value)} />
                      </div>
                    </div>

                    <div className="ua-actions ua-actions-two">
                      <button type="button" className="ua-btn ua-btn-secondary" onClick={() => setStep("checklist")}>← Volver</button>
                      <button type="submit" className="ua-btn ua-btn-primary">Ver mi resultado <Icon name="arrow" /></button>
                    </div>
                  </form>
                </div>
              )}

              {step === "result" && (
                <div className="ua-panel ua-step-panel" key="result">
                  <div className="ua-result-heading">
                    <div>
                      <span className="ua-eyebrow ua-eyebrow-dark">Resultado del diagnóstico</span>
                      <h2>{lead.nombre}, este es el panorama de {lead.empresa}</h2>
                      <p className="ua-panel-copy">Revisa las respuestas registradas y los puntos que requieren mayor atención.</p>
                    </div>
                    <span className={`ua-result-badge ${risk.key}`}>{risk.label}</span>
                  </div>

                  <div className="ua-result-list">
                    {questions.map((question) => {
                      const value = answers[question.id];
                      const alert = isAlert(question, value);
                      return (
                        <div key={question.id} className={`ua-result-item ${alert ? "alert" : "ok"}`}>
                          <div className="ua-result-num">{question.id}</div>
                          <div className="ua-result-copy">
                            <strong>{question.text}</strong>
                            <p>{question.note}</p>
                          </div>
                          <span className={`ua-status ${alert ? "alert" : "ok"}`}>{alert ? "Alerta" : "Cumple"}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="ua-actions">
                    <button type="button" className="ua-btn ua-btn-secondary" onClick={restart}><Icon name="refresh" /> Realizar otro diagnóstico</button>
                  </div>
                </div>
              )}
            </div>

            <aside className="ua-sidebar">
              {step !== "result" && (
                <div className="ua-risk-card ua-risk-pending">
                  <div className="ua-card-topline">
                    <span className="ua-eyebrow ua-eyebrow-dark">Termómetro de riesgo</span>
                    <span className="ua-live-dot">En espera</span>
                  </div>

                  <div className="ua-pending-gauge" aria-hidden="true">
                    <div className="ua-gauge-arc" />
                    <div className="ua-pending-center"><Icon name="chart" /></div>
                  </div>

                  <h3>Tu resultado aparecerá aquí</h3>
                  <p>{pendingMessage}</p>

                  {step === "checklist" && (
                    <div className="ua-side-progress">
                      <span style={{ width: `${progressPercent}%` }} />
                    </div>
                  )}
                </div>
              )}

              {step === "result" && (
                <div className={`ua-risk-card ua-risk-result ${risk.key}`}>
                  <div className="ua-card-topline">
                    <span className="ua-eyebrow ua-eyebrow-dark">Termómetro de riesgo</span>
                    <span className={`ua-risk-pill ${risk.key}`}>{risk.label}</span>
                  </div>

                  <div className="ua-gauge-wrap">
                    <div className="ua-gauge" style={{ "--p": gaugePercent }}>
                      <div className="ua-needle" />
                      <div className="ua-gauge-center" />
                    </div>
                  </div>

                  <div className="ua-gauge-value">{gaugePercent}%</div>
                  <p className="ua-risk-sub">de vulnerabilidad potencial detectada</p>

                  <div className={`ua-interpret ${risk.key}`}>
                    <strong>{risk.label}</strong>
                    <p>{risk.text}</p>
                  </div>

                  <a className="ua-btn ua-btn-primary ua-btn-full" href="/contacto">Solicitar acompañamiento <Icon name="arrow" /></a>
                </div>
              )}

              <div className="ua-legal-card">
                <span className="ua-eyebrow ua-eyebrow-dark">Marco legal aplicable</span>
                <h3>Referencias principales</h3>
                <ul>
                  <li><span>01</span><div><strong>Estatuto Tributario &amp; Ley UGPP</strong><p>Aportes parafiscales y procesos de fiscalización.</p></div></li>
                  <li><span>02</span><div><strong>Código Sustantivo del Trabajo</strong><p>Relaciones laborales, contratos y novedades.</p></div></li>
                  <li><span>03</span><div><strong>Decreto 1072 y estándares SG-SST</strong><p>Seguridad y salud en el trabajo.</p></div></li>
                  <li><span>04</span><div><strong>Ley 1581 de 2012</strong><p>Protección de datos personales.</p></div></li>
                </ul>
              </div>
            </aside>
          </div>

          <div className="ua-final-cta">
            <div className="ua-final-icon"><Icon name="shield" /></div>
            <div>
              <span className="ua-eyebrow">Siguiente paso</span>
              <h2>Convierte el diagnóstico en un plan de mitigación</h2>
              <p>Unialiados puede ayudarte a priorizar hallazgos y definir una ruta de acompañamiento para tu empresa.</p>
            </div>
            <a className="ua-btn ua-btn-gold" href="/contacto">Solicitar plan <Icon name="arrow" /></a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ua-audit {
          --ua-navy: var(--navy);
          --ua-navy-deep: var(--navy-dark);
          --ua-blue: var(--blue);
          --ua-blue-soft: #eef5fa;
          --ua-gold: var(--gold);
          --ua-gold-deep: var(--gold-dark);
          --ua-text: var(--ink);
          --ua-muted: var(--muted);
          --ua-line: var(--line);
          --ua-surface: var(--white);
          --ua-bg: var(--surface);
          --ua-green: #238767;
          --ua-green-soft: #edf8f4;
          --ua-amber: #c58b27;
          --ua-amber-soft: #fff7e7;
          --ua-red: var(--red);
          --ua-red-soft: #fff2f2;
          background: var(--ua-bg);
          color: var(--ua-text);
          font-family: inherit;
          overflow: hidden;
        }

        .ua-container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        .ua-hero {
          position: relative;
          background:
            radial-gradient(circle at 82% 20%, rgba(255, 211, 91, 0.22), transparent 27%),
            linear-gradient(128deg, var(--ua-navy-deep) 0%, var(--ua-navy) 58%, #235f8f 100%);
          color: white;
        }

        .ua-hero::after {
          content: "";
          position: absolute;
          inset: auto 0 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.16);
        }

        .ua-hero-grid {
          min-height: 330px;
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) 0.85fr;
          gap: 60px;
          align-items: center;
          padding: 58px 0 78px;
        }

        .ua-hero-copy { max-width: 700px; }

        .ua-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--ua-gold);
          font-size: 12px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 0.11em;
          text-transform: uppercase;
        }

        .ua-eyebrow::before {
          content: "";
          width: 24px;
          height: 2px;
          border-radius: 99px;
          background: currentColor;
        }

        .ua-eyebrow-dark { color: var(--ua-blue); }

        .ua-hero h1 {
          margin: 16px 0 17px;
          max-width: 720px;
          font-size: clamp(38px, 4.8vw, 58px);
          line-height: 1.02;
          letter-spacing: -0.035em;
          color: #fff;
        }

        .ua-hero-copy > p {
          max-width: 680px;
          margin: 0;
          color: rgba(255,255,255,.82);
          font-size: 17px;
          line-height: 1.7;
        }

        .ua-hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .ua-hero-meta span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 12px;
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 999px;
          background: rgba(255,255,255,.08);
          color: rgba(255,255,255,.9);
          font-size: 12px;
          font-weight: 700;
          backdrop-filter: blur(8px);
        }

        .ua-hero-meta svg { width: 15px; height: 15px; color: var(--ua-gold); }

        .ua-hero-visual {
          position: relative;
          min-height: 220px;
          display: grid;
          place-items: center;
        }

        .ua-hero-orbit {
          position: absolute;
          border: 1px solid rgba(255,255,255,.14);
          border-radius: 50%;
        }

        .ua-orbit-one { width: 330px; height: 330px; }
        .ua-orbit-two { width: 240px; height: 240px; }

        .ua-hero-card {
          position: relative;
          z-index: 2;
          width: min(285px, 100%);
          padding: 26px;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 24px;
          background: rgba(255,255,255,.1);
          box-shadow: 0 28px 70px rgba(0,0,0,.18);
          backdrop-filter: blur(14px);
        }

        .ua-hero-card-icon {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          margin-bottom: 24px;
          border-radius: 14px;
          background: var(--ua-gold);
          color: var(--ua-navy-deep);
        }

        .ua-hero-card-icon svg { width: 22px; height: 22px; }
        .ua-hero-card > span { display: block; color: rgba(255,255,255,.68); font-size: 11px; text-transform: uppercase; letter-spacing: .1em; font-weight: 800; }
        .ua-hero-card > strong { display: block; margin: 7px 0 18px; color: white; font-size: 25px; }
        .ua-hero-card > small { display: block; margin-top: 12px; color: rgba(255,255,255,.65); font-size: 11px; }

        .ua-mini-scale { display: grid; grid-template-columns: 1fr 1.4fr 1.5fr; gap: 4px; }
        .ua-mini-scale i { height: 7px; border-radius: 999px; }
        .ua-mini-scale .low { background: #4fb488; }
        .ua-mini-scale .medium { background: #e0ac43; }
        .ua-mini-scale .high { background: #dc7171; }

        .ua-section { padding: 0 0 72px; }

        .ua-level-row {
          position: relative;
          z-index: 4;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: -42px;
          padding: 12px;
          border: 1px solid rgba(225,232,239,.9);
          border-radius: 20px;
          background: rgba(255,255,255,.96);
          box-shadow: 0 18px 45px rgba(18,59,98,.09);
        }

        .ua-level {
          display: grid;
          grid-template-columns: 12px 1fr;
          gap: 12px;
          align-items: start;
          padding: 16px 18px;
          border-radius: 14px;
          background: #fff;
        }

        .ua-level-dot { width: 9px; height: 9px; margin-top: 5px; border-radius: 50%; box-shadow: 0 0 0 5px currentColor; opacity: .16; }
        .ua-level.low .ua-level-dot { background: var(--ua-green); color: var(--ua-green); }
        .ua-level.medium .ua-level-dot { background: var(--ua-amber); color: var(--ua-amber); }
        .ua-level.high .ua-level-dot { background: var(--ua-red); color: var(--ua-red); }
        .ua-level strong { font-size: 13px; color: var(--ua-navy); }
        .ua-level small { margin-left: 8px; color: var(--ua-muted); font-size: 11px; font-weight: 700; }
        .ua-level p { margin: 5px 0 0; color: var(--ua-muted); font-size: 12px; line-height: 1.5; }

        .ua-audit-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(300px, .65fr);
          gap: 28px;
          align-items: start;
          margin-top: 30px;
        }

        .ua-panel,
        .ua-risk-card,
        .ua-legal-card {
          border: 1px solid var(--ua-line);
          background: var(--ua-surface);
          box-shadow: 0 12px 32px rgba(18,59,98,.055);
        }

        .ua-panel {
          min-height: 440px;
          padding: 34px;
          border-radius: 22px;
        }

        .ua-step-panel { animation: uaRise .38s ease both; }

        .ua-panel-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 15px;
          color: var(--ua-blue);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .ua-panel-kicker span {
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 9px;
          background: var(--ua-blue-soft);
          color: var(--ua-blue);
          font-size: 10px;
        }

        .ua-panel h2 {
          margin: 0 0 11px;
          color: var(--ua-navy);
          font-size: clamp(27px, 3vw, 36px);
          line-height: 1.12;
          letter-spacing: -.025em;
        }

        .ua-panel-copy {
          max-width: 700px;
          margin: 0;
          color: var(--ua-muted);
          font-size: 14px;
          line-height: 1.7;
        }

        .ua-intro-panel { padding-top: 42px; }

        .ua-feature-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin: 30px 0;
        }

        .ua-feature-row > div {
          display: grid;
          grid-template-columns: 42px 1fr;
          column-gap: 11px;
          align-items: center;
          padding: 14px;
          border: 1px solid var(--ua-line);
          border-radius: 14px;
          background: #fbfdff;
        }

        .ua-feature-icon {
          grid-row: span 2;
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: var(--ua-blue-soft);
          color: var(--ua-blue);
        }
        .ua-feature-icon svg { width: 20px; height: 20px; }
        .ua-feature-row strong { font-size: 12px; color: var(--ua-navy); }
        .ua-feature-row small { margin-top: 2px; color: var(--ua-muted); font-size: 10.5px; }

        .ua-btn {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 13px 22px;
          border: 1px solid transparent;
          border-radius: 999px;
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
        }

        .ua-btn:hover { transform: translateY(-2px); }
        .ua-btn svg { width: 17px; height: 17px; }
        .ua-btn-full { width: 100%; }

        .ua-btn-primary {
          background: var(--ua-blue);
          color: white;
          box-shadow: 0 10px 20px rgba(8,77,155,.18);
        }

        .ua-btn-primary:hover { box-shadow: 0 14px 28px rgba(8,77,155,.23); }

        .ua-btn-secondary {
          border-color: var(--ua-line);
          background: white;
          color: var(--ua-navy);
        }

        .ua-btn-gold {
          background: var(--ua-gold);
          color: var(--ua-navy-deep);
          box-shadow: 0 10px 24px rgba(215,166,43,.18);
          white-space: nowrap;
        }

        .ua-check-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
        }

        .ua-check-head h2 { margin-top: 10px; font-size: 29px; }

        .ua-question-counter {
          min-width: 90px;
          display: flex;
          justify-content: flex-end;
          align-items: baseline;
          gap: 4px;
          color: var(--ua-muted);
        }
        .ua-question-counter strong { color: var(--ua-navy); font-size: 34px; line-height: 1; letter-spacing: -.05em; }
        .ua-question-counter span { font-size: 12px; font-weight: 800; }

        .ua-progress-wrap { margin: 26px 0 22px; }
        .ua-progress-labels { display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--ua-muted); font-size: 10.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
        .ua-progress-labels strong { color: var(--ua-blue); }
        .ua-progress-track { height: 7px; overflow: hidden; border-radius: 999px; background: #edf1f5; }
        .ua-progress-bar { height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--ua-blue), var(--ua-gold)); transition: width .28s ease; }

        .ua-question-card {
          position: relative;
          padding: 30px;
          border: 1px solid #dbe5ee;
          border-radius: 20px;
          background: linear-gradient(145deg, #ffffff, #fbfdff);
          box-shadow: 0 10px 24px rgba(18,59,98,.045);
          transition: opacity .2s ease, transform .2s ease;
        }
        .ua-question-card.is-leaving { opacity: 0; transform: translateX(-10px); }

        .ua-question-number {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: var(--ua-blue-soft);
          color: var(--ua-blue);
          font-size: 12px;
          font-weight: 900;
        }

        .ua-question-copy { padding-right: 46px; }
        .ua-question-label { display: block; margin-bottom: 9px; color: var(--ua-gold-deep); font-size: 10px; font-weight: 900; letter-spacing: .09em; text-transform: uppercase; }
        .ua-question-copy h3 { margin: 0; color: var(--ua-navy); font-size: 20px; line-height: 1.45; letter-spacing: -.012em; }
        .ua-question-copy p { margin: 10px 0 0; color: var(--ua-muted); font-size: 12.5px; line-height: 1.6; }

        .ua-answer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 26px; }
        .ua-answer {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 12px;
          align-items: center;
          padding: 14px 15px;
          border: 1px solid var(--ua-line);
          border-radius: 14px;
          background: white;
          color: var(--ua-text);
          font: inherit;
          text-align: left;
          cursor: pointer;
          transition: border-color .18s ease, transform .18s ease, background .18s ease, box-shadow .18s ease;
        }
        .ua-answer:hover:not(:disabled) { transform: translateY(-1px); border-color: #bfd0df; box-shadow: 0 8px 18px rgba(18,59,98,.06); }
        .ua-answer:disabled { cursor: default; }
        .ua-answer-mark { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 12px; font-size: 18px; font-weight: 900; }
        .ua-answer strong { display: block; color: var(--ua-navy); font-size: 13px; }
        .ua-answer small { display: block; margin-top: 2px; color: var(--ua-muted); font-size: 10.5px; }
        .ua-answer.yes .ua-answer-mark { background: var(--ua-green-soft); color: var(--ua-green); }
        .ua-answer.no .ua-answer-mark { background: var(--ua-red-soft); color: var(--ua-red); }
        .ua-answer.yes.selected { border-color: #a9d5c5; background: var(--ua-green-soft); }
        .ua-answer.no.selected { border-color: #e7b9b9; background: var(--ua-red-soft); }

        .ua-question-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; }
        .ua-question-nav button { border: 0; background: transparent; color: var(--ua-blue); font: inherit; font-size: 12px; font-weight: 800; cursor: pointer; }
        .ua-question-nav button:disabled { opacity: .35; cursor: default; }
        .ua-question-nav span { color: var(--ua-muted); font-size: 11px; font-weight: 700; }

        .ua-lead-banner {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 12px;
          align-items: center;
          margin: 24px 0;
          padding: 14px 16px;
          border: 1px solid #d9e6f0;
          border-radius: 14px;
          background: var(--ua-blue-soft);
        }
        .ua-lead-banner-icon { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 12px; background: white; color: var(--ua-blue); }
        .ua-lead-banner-icon svg { width: 20px; height: 20px; }
        .ua-lead-banner strong { display: block; color: var(--ua-navy); font-size: 12px; }
        .ua-lead-banner small { display: block; margin-top: 3px; color: var(--ua-muted); font-size: 10.5px; line-height: 1.45; }

        .ua-form { margin-top: 5px; }
        .ua-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 17px; }
        .ua-field { display: flex; flex-direction: column; gap: 7px; }
        .ua-field label { color: var(--ua-navy); font-size: 11px; font-weight: 800; }
        .ua-field label b { color: var(--ua-gold-deep); }
        .ua-field input,
        .ua-field select {
          width: 100%;
          height: 48px;
          padding: 0 14px;
          border: 1px solid var(--ua-line);
          border-radius: 11px;
          outline: none;
          background: #fff;
          color: var(--ua-text);
          font: inherit;
          font-size: 13px;
          transition: border-color .18s ease, box-shadow .18s ease;
        }
        .ua-field input::placeholder { color: #a5afb9; }
        .ua-field input:focus,
        .ua-field select:focus { border-color: #8bb0ce; box-shadow: 0 0 0 3px rgba(31,92,143,.08); }
        .ua-field-error { color: var(--ua-red); font-size: 10.5px; font-weight: 700; }

        .ua-actions { display: flex; margin-top: 26px; gap: 10px; }
        .ua-actions-two { justify-content: space-between; }

        .ua-result-heading { display: flex; justify-content: space-between; gap: 20px; align-items: flex-start; margin-bottom: 24px; }
        .ua-result-heading h2 { margin-top: 10px; font-size: 29px; }
        .ua-result-badge,
        .ua-risk-pill { display: inline-flex; align-items: center; justify-content: center; min-height: 31px; padding: 0 11px; border-radius: 999px; font-size: 10.5px; font-weight: 900; white-space: nowrap; }
        .ua-result-badge.low, .ua-risk-pill.low { background: var(--ua-green-soft); color: var(--ua-green); }
        .ua-result-badge.medium, .ua-risk-pill.medium { background: var(--ua-amber-soft); color: var(--ua-amber); }
        .ua-result-badge.high, .ua-risk-pill.high { background: var(--ua-red-soft); color: var(--ua-red); }

        .ua-result-list { display: grid; gap: 9px; }
        .ua-result-item { display: grid; grid-template-columns: 34px 1fr auto; gap: 12px; align-items: center; padding: 14px; border: 1px solid var(--ua-line); border-radius: 14px; background: #fff; }
        .ua-result-item.alert { border-color: #f0d0d0; background: #fffafa; }
        .ua-result-item.ok { border-color: #d8eae3; background: #fbfefd; }
        .ua-result-num { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 10px; background: var(--ua-blue-soft); color: var(--ua-blue); font-size: 11px; font-weight: 900; }
        .ua-result-copy strong { display: block; color: var(--ua-navy); font-size: 12.5px; line-height: 1.4; }
        .ua-result-copy p { margin: 4px 0 0; color: var(--ua-muted); font-size: 10.5px; line-height: 1.45; }
        .ua-status { min-width: 68px; padding: 7px 9px; border-radius: 999px; text-align: center; font-size: 9.5px; font-weight: 900; text-transform: uppercase; letter-spacing: .04em; }
        .ua-status.ok { background: var(--ua-green-soft); color: var(--ua-green); }
        .ua-status.alert { background: var(--ua-red-soft); color: var(--ua-red); }

        .ua-sidebar { display: grid; gap: 18px; position: sticky; top: 100px; }
        .ua-risk-card,
        .ua-legal-card { border-radius: 20px; padding: 22px; }

        .ua-card-topline { display: flex; justify-content: space-between; gap: 10px; align-items: center; }
        .ua-live-dot { display: inline-flex; align-items: center; gap: 6px; color: var(--ua-muted); font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: .06em; }
        .ua-live-dot::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #b7c1cb; }

        .ua-pending-gauge { width: 180px; height: 105px; margin: 28px auto 10px; position: relative; overflow: hidden; }
        .ua-gauge-arc { position: absolute; width: 180px; height: 180px; border: 15px solid #e9eef3; border-radius: 50%; left: 0; top: 14px; }
        .ua-pending-center { position: absolute; left: 50%; bottom: 2px; transform: translateX(-50%); width: 52px; height: 52px; display: grid; place-items: center; border-radius: 50%; background: var(--ua-blue-soft); color: var(--ua-blue); box-shadow: 0 0 0 9px #fff; }
        .ua-pending-center svg { width: 22px; height: 22px; }
        .ua-risk-pending h3 { margin: 8px 0 7px; text-align: center; color: var(--ua-navy); font-size: 16px; }
        .ua-risk-pending > p { margin: 0; text-align: center; color: var(--ua-muted); font-size: 11.5px; line-height: 1.55; }
        .ua-side-progress { height: 5px; margin-top: 18px; overflow: hidden; border-radius: 999px; background: #edf1f4; }
        .ua-side-progress span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--ua-blue), var(--ua-gold)); transition: width .28s ease; }

        .ua-gauge-wrap { width: 225px; height: 126px; margin: 24px auto 0; overflow: hidden; position: relative; }
        .ua-gauge { --p: 0; position: absolute; width: 225px; height: 225px; border-radius: 50%; background: conic-gradient(from 270deg, var(--ua-green) 0 25%, var(--ua-amber) 25% 60%, var(--ua-red) 60% 100%); left: 0; top: 0; }
        .ua-gauge::after { content: ""; position: absolute; width: 177px; height: 177px; border-radius: 50%; background: #fff; left: 24px; top: 24px; }
        .ua-needle { position: absolute; z-index: 3; width: 84px; height: 3px; left: 29px; top: 111px; transform-origin: 83px 50%; transform: rotate(calc(-90deg + (var(--p) * 1.8deg))); border-radius: 999px; background: var(--ua-navy); transition: transform .08s linear; }
        .ua-needle::after { content: ""; position: absolute; right: -7px; top: -6px; width: 15px; height: 15px; border-radius: 50%; background: var(--ua-navy); }
        .ua-gauge-center { position: absolute; z-index: 4; width: 22px; height: 22px; border: 6px solid #fff; border-radius: 50%; background: var(--ua-navy); left: 101px; top: 101px; box-shadow: 0 2px 8px rgba(18,59,98,.22); }
        .ua-gauge-value { margin-top: 2px; text-align: center; color: var(--ua-navy); font-size: 40px; line-height: 1; font-weight: 900; letter-spacing: -.05em; }
        .ua-risk-sub { margin: 7px 0 18px; text-align: center; color: var(--ua-muted); font-size: 10.5px; }

        .ua-interpret { padding: 14px; margin-bottom: 14px; border-radius: 13px; }
        .ua-interpret.low { background: var(--ua-green-soft); }
        .ua-interpret.medium { background: var(--ua-amber-soft); }
        .ua-interpret.high { background: var(--ua-red-soft); }
        .ua-interpret strong { display: block; margin-bottom: 5px; color: var(--ua-navy); font-size: 12px; }
        .ua-interpret p { margin: 0; color: var(--ua-muted); font-size: 10.8px; line-height: 1.5; }

        .ua-legal-card h3 { margin: 10px 0 15px; color: var(--ua-navy); font-size: 17px; }
        .ua-legal-card ul { display: grid; gap: 12px; padding: 0; margin: 0; list-style: none; }
        .ua-legal-card li { display: grid; grid-template-columns: 29px 1fr; gap: 10px; align-items: start; }
        .ua-legal-card li > span { width: 29px; height: 29px; display: grid; place-items: center; border-radius: 9px; background: #fff8df; color: #a77d17; font-size: 9px; font-weight: 900; }
        .ua-legal-card li strong { display: block; color: var(--ua-navy); font-size: 11px; line-height: 1.35; }
        .ua-legal-card li p { margin: 3px 0 0; color: var(--ua-muted); font-size: 10.2px; line-height: 1.4; }

        .ua-final-cta {
          display: grid;
          grid-template-columns: 54px 1fr auto;
          gap: 20px;
          align-items: center;
          margin-top: 28px;
          padding: 28px 30px;
          border-radius: 22px;
          background:
            radial-gradient(circle at 90% 10%, rgba(255,211,91,.18), transparent 25%),
            linear-gradient(120deg, var(--ua-navy-deep), var(--ua-navy));
          color: #fff;
          box-shadow: 0 18px 38px rgba(18,59,98,.14);
        }
        .ua-final-icon { width: 54px; height: 54px; display: grid; place-items: center; border-radius: 16px; background: rgba(255,255,255,.09); color: var(--ua-gold); }
        .ua-final-icon svg { width: 26px; height: 26px; }
        .ua-final-cta h2 { margin: 7px 0 6px; color: white; font-size: 24px; letter-spacing: -.02em; }
        .ua-final-cta p { margin: 0; max-width: 760px; color: rgba(255,255,255,.72); font-size: 12.5px; line-height: 1.55; }

        @keyframes uaRise {
          from { opacity: 0; transform: translateY(7px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 980px) {
          .ua-hero-grid { grid-template-columns: 1fr; padding-bottom: 86px; }
          .ua-hero-visual { display: none; }
          .ua-audit-grid { grid-template-columns: 1fr; }
          .ua-sidebar { position: static; grid-template-columns: 1fr 1fr; }
          .ua-risk-card { min-height: 100%; }
        }

        @media (max-width: 760px) {
          .ua-container { width: min(100% - 24px, 1180px); }
          .ua-hero-grid { min-height: 300px; padding: 44px 0 70px; }
          .ua-hero h1 { font-size: 39px; }
          .ua-hero-copy > p { font-size: 15px; }
          .ua-level-row { grid-template-columns: 1fr; margin-top: -28px; }
          .ua-panel { min-height: 0; padding: 22px 18px; border-radius: 18px; }
          .ua-feature-row { grid-template-columns: 1fr; }
          .ua-check-head { display: block; }
          .ua-question-counter { margin-top: 15px; justify-content: flex-start; }
          .ua-question-card { padding: 22px 17px; }
          .ua-question-copy { padding-right: 35px; }
          .ua-question-copy h3 { font-size: 17px; }
          .ua-answer-grid { grid-template-columns: 1fr; }
          .ua-grid-2 { grid-template-columns: 1fr; }
          .ua-actions-two { flex-direction: column-reverse; }
          .ua-actions-two .ua-btn { width: 100%; }
          .ua-result-heading { display: block; }
          .ua-result-badge { margin-top: 15px; }
          .ua-result-item { grid-template-columns: 32px 1fr; }
          .ua-status { grid-column: 2; justify-self: start; }
          .ua-sidebar { grid-template-columns: 1fr; }
          .ua-final-cta { grid-template-columns: 1fr; padding: 24px; }
          .ua-final-icon { display: none; }
          .ua-final-cta .ua-btn { width: 100%; }
        }
      `}</style>
    </main>
  );
}