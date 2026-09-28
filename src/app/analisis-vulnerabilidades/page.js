"use client";

import { useEffect, useRef, useState } from "react";

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

function isAlert(question, value) {
  return value === question.riskWhen;
}

export default function Page() {
  const [step, setStep] = useState("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [answers, setAnswers] = useState({});
  const [lead, setLead] = useState(emptyLead);
  const [errors, setErrors] = useState({});
  const gaugeRef = useRef(null);
  const gaugeValueRef = useRef(null);

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const alertCount = questions.filter((question) =>
    isAlert(question, answers[question.id]),
  ).length;
  const riskPercent = Math.round((alertCount / questions.length) * 100);
  const risk = riskLevelFor(riskPercent);
  const stepIndex = { intro: 0, checklist: 1, lead: 2, result: 3 }[step];

  useEffect(() => {
    if (step !== "result") return;
    let frame;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : 1500;
    const start = performance.now();
    function tick(now) {
      const linear = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - linear, 4);
      const value = Math.round(riskPercent * eased);
      gaugeRef.current?.style.setProperty("--p", String(value));
      if (gaugeValueRef.current) gaugeValueRef.current.textContent = `${value}%`;
      if (linear < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [step, riskPercent]);

  function goToQuestion(index) {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTransitioning(false);
    }, 260);
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
    }, 240);
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

  function clearDiagnostic() {
    setCurrentIndex(0);
    setTransitioning(false);
    setAnswers({});
    setLead(emptyLead);
    setErrors({});
  }

  function startDiagnostic(scrollToForm = false) {
    if (scrollToForm) clearDiagnostic();
    setStep("checklist");
    if (!scrollToForm) return;

    requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("diagnostico")?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function restart() {
    clearDiagnostic();
    setStep("intro");
  }

  return (
    <main className="analysis-page">
      <section className="page-hero analysis-hero">
        <div className="container analysis-hero-inner">
          <div className="analysis-hero-copy">
            <span className="eyebrow">Autodiagnóstico en línea</span>
            <h1>
              Análisis de <span>vulnerabilidades laborales</span>
            </h1>
            <div className="analysis-hero-lead">
              <p>
                Identifica áreas que requieren revisión mediante una lista de chequeo y un indicador gráfico de riesgo.
              </p>
              <div className="analysis-hero-meta" aria-label="Características del diagnóstico">
                <span><strong>7</strong> preguntas</span>
                <span><strong>&lt; 2 min</strong> de duración</span>
                <span><strong>100%</strong> confidencial</span>
              </div>
              <div className="analysis-hero-actions">
                <button type="button" className="btn btn-primary" onClick={() => startDiagnostic(true)}>
                  Comenzar diagnóstico
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section analysis-section" id="diagnostico">
        <div className="container audit-grid">
          <div>
            <ol className="analysis-steps" aria-label="Progreso del diagnóstico">
              {["Inicio", "Preguntas", "Datos", "Resultado"].map((label, index) => (
                <li
                  key={label}
                  className={`${index === stepIndex ? "active" : ""}${index < stepIndex ? " complete" : ""}`}
                  aria-current={index === stepIndex ? "step" : undefined}
                >
                  <span>{index < stepIndex ? "✓" : index + 1}</span>
                  <strong>{label}</strong>
                </li>
              ))}
            </ol>
            <div className="level-row">
              <div className="level low">
                <strong>Nivel Bajo (0–25%)</strong>
                <span>Operación controlada y soportes al día.</span>
              </div>
              <div className="level medium">
                <strong>Nivel Medio (26–60%)</strong>
                <span>Existen observaciones que requieren revisión.</span>
              </div>
              <div className="level high">
                <strong>Nivel Alto (61–100%)</strong>
                <span>Se identifican riesgos que requieren atención prioritaria.</span>
              </div>
            </div>
            {step === "intro" && (
              <div className="check-panel intro-panel step-panel" key="intro">
                <span className="eyebrow">Evaluación inicial gratuita</span>
                <h2 className="panel-title checklist-title">
                  ¿Quieres conocer el nivel de riesgo de tu empresa?
                </h2>
                <p className="panel-copy">
                  Responde 7 preguntas rápidas sobre tu operación laboral y de seguridad social. Al final verás tu
                  nivel de riesgo con un indicador gráfico, en menos de 2 minutos.
                </p>
                <div className="diagnostic-highlights">
                  <span><b>01</b> Respuestas simples</span>
                  <span><b>02</b> Resultado inmediato</span>
                  <span><b>03</b> Orientación clara</span>
                </div>
                <div className="checklist-actions analysis-intro-cta">
                  <button
                    type="button"
                    className="btn btn-primary full"
                    onClick={() => startDiagnostic()}
                  >
                    Sí, quiero mi diagnóstico
                  </button>
                </div>
              </div>
            )}

            {step === "checklist" && (
              <div className="check-panel">
                <div className="check-panel-head">
                  <div>
                    <span className="eyebrow">Autodiagnóstico</span>
                    <h2 className="panel-title checklist-title">Lista de chequeo rápida</h2>
                  </div>
                  <strong className="question-counter">{currentIndex + 1} / {questions.length}</strong>
                </div>
                <p className="panel-copy">Responde según la situación actual de tu empresa.</p>
                <div
                  className="progress-track"
                  role="progressbar"
                  aria-label="Progreso del cuestionario"
                  aria-valuemin="1"
                  aria-valuemax={questions.length}
                  aria-valuenow={currentIndex + 1}
                >
                  <div
                    className="progress-bar"
                    style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
                <div
                  key={currentQuestion.id}
                  className={`question question-single${transitioning ? " question-leave" : ""}`}
                >
                  <div className="qnum">{currentIndex + 1}</div>
                  <div className="qtext">
                    <strong>{currentQuestion.text}</strong>
                    <p>{currentQuestion.note}</p>
                  </div>
                  <div className="answer-buttons">
                    <button
                      type="button"
                      className={`answer-btn yes${answers[currentQuestion.id] === true ? " selected" : ""}`}
                      disabled={transitioning}
                      onClick={() => handleAnswer(true)}
                      aria-pressed={answers[currentQuestion.id] === true}
                    >
                      <span aria-hidden="true">✓</span> Sí
                    </button>
                    <button
                      type="button"
                      className={`answer-btn no${answers[currentQuestion.id] === false ? " selected" : ""}`}
                      disabled={transitioning}
                      onClick={() => handleAnswer(false)}
                      aria-pressed={answers[currentQuestion.id] === false}
                    >
                      <span aria-hidden="true">×</span> No
                    </button>
                  </div>
                </div>
                <div className="question-nav">
                  <button
                    type="button"
                    onClick={() => goToQuestion(currentIndex - 1)}
                    disabled={currentIndex === 0 || transitioning}
                  >
                    ← Anterior
                  </button>
                  <span>{answeredCount} de {questions.length} respondidas</span>
                </div>
              </div>
            )}

            {step === "lead" && (
              <div className="check-panel step-panel" key="lead">
                <span className="eyebrow">Un último paso</span>
                <h2 className="panel-title checklist-title">
                  Cuéntenos quién está detrás de este diagnóstico
                </h2>
                <p className="panel-copy">
                  Completa estos datos para personalizar el resultado de tu empresa.
                </p>
                <form onSubmit={handleLeadSubmit}>
                  <div className="grid-2">
                    <div className="field">
                      <label htmlFor="nombre">Nombre completo *</label>
                      <input
                        id="nombre"
                        type="text"
                        autoComplete="name"
                        aria-invalid={Boolean(errors.nombre)}
                        value={lead.nombre}
                        onChange={(event) => handleLeadChange("nombre", event.target.value)}
                      />
                      {errors.nombre && <span className="field-error">{errors.nombre}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="email">Correo electrónico *</label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        value={lead.email}
                        onChange={(event) => handleLeadChange("email", event.target.value)}
                      />
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="telefono">Teléfono</label>
                      <input
                        id="telefono"
                        type="tel"
                        autoComplete="tel"
                        value={lead.telefono}
                        onChange={(event) => handleLeadChange("telefono", event.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="empresa">Nombre de la empresa *</label>
                      <input
                        id="empresa"
                        type="text"
                        autoComplete="organization"
                        aria-invalid={Boolean(errors.empresa)}
                        value={lead.empresa}
                        onChange={(event) => handleLeadChange("empresa", event.target.value)}
                      />
                      {errors.empresa && <span className="field-error">{errors.empresa}</span>}
                    </div>
                    <div className="field">
                      <label htmlFor="empleados">Número de empleados</label>
                      <select
                        id="empleados"
                        value={lead.empleados}
                        onChange={(event) => handleLeadChange("empleados", event.target.value)}
                      >
                        <option value="">Seleccione…</option>
                        <option value="1-10">1 a 10</option>
                        <option value="11-50">11 a 50</option>
                        <option value="51-200">51 a 200</option>
                        <option value="200+">Más de 200</option>
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="sector">Sector económico</label>
                      <input
                        id="sector"
                        type="text"
                        placeholder="Ej. Construcción, comercio, servicios…"
                        value={lead.sector}
                        onChange={(event) => handleLeadChange("sector", event.target.value)}
                      />
                    </div>
                  </div>
                  <p className="analysis-data-note">
                    En esta versión los datos no se envían ni se almacenan; permanecen únicamente en tu navegador.
                  </p>
                  <div className="checklist-actions two">
                    <button type="button" className="btn btn-secondary" onClick={() => setStep("checklist")}>
                      ← Volver
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Ver mi resultado
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === "result" && (
              <div className="check-panel step-panel" key="result">
                <span className="eyebrow">Resultado</span>
                <h2 className="panel-title checklist-title">
                  Resultado de {lead.nombre} — {lead.empresa}
                </h2>
                <p className="panel-copy">
                  Estas son las respuestas registradas en su autodiagnóstico.
                </p>
                {questions.map((question) => {
                  const value = answers[question.id];
                  const alert = isAlert(question, value);
                  return (
                    <div key={question.id} className={`question ${alert ? "alert" : "ok"}`}>
                      <div className="qnum">{question.id}</div>
                      <div className="qtext">
                        <strong>{question.text}</strong>
                        <p>{question.note}</p>
                      </div>
                      <span className={`status ${alert ? "status-alert" : "status-ok"}`}>
                        {alert ? "✕ Alerta" : "✓ Cumple"}
                      </span>
                    </div>
                  );
                })}
                <div className="checklist-actions">
                  <button type="button" className="btn btn-secondary" onClick={restart}>
                    Realizar otro diagnóstico
                  </button>
                </div>
              </div>
            )}
          </div>
          <aside>
            {step !== "result" && (
              <div className="risk-box risk-box-pending">
                <div className="risk-head">
                  <span className="eyebrow">Termómetro de riesgo</span>
                </div>
                <div className="risk-preview" aria-hidden="true">
                  <span>{step === "intro" ? "?" : `${answeredCount}/7`}</span>
                </div>
                <p className="risk-sub">
                  {step === "intro" && "Complete el diagnóstico para calcular su nivel de riesgo."}
                  {step === "checklist" && "Complete las 7 preguntas para calcular su nivel de riesgo."}
                  {step === "lead" && "Su diagnóstico está listo. Complete sus datos para verlo."}
                </p>
              </div>
            )}
            {step === "result" && (
              <div
                className={`risk-box risk-${risk.key} step-panel`}
                aria-label={`${risk.label}: ${riskPercent}% de vulnerabilidad potencial detectada`}
              >
                <div className="risk-head">
                  <span className="eyebrow">Termómetro de riesgo en vivo</span>
                  <span className={`risk-pill ${risk.key}`}>{risk.label}</span>
                </div>
                <div className="gauge-wrap">
                  <div ref={gaugeRef} className="gauge" style={{ "--p": 0 }}>
                    <div className="needle"></div>
                  </div>
                </div>
                <div className="gauge-scale" aria-hidden="true">
                  <span>0</span><span>25</span><span>60</span><span>100</span>
                </div>
                <div ref={gaugeValueRef} className="gauge-value" aria-hidden="true">0%</div>
                <p className="risk-sub">de vulnerabilidad potencial detectada</p>
                <div className="interpret">
                  <strong>{risk.label}</strong>
                  <p>{risk.text}</p>
                </div>
                <a className="btn btn-primary full" href="/contacto">
                  Solicitar acompañamiento
                </a>
              </div>
            )}
            <div className="legal-box">
              <span className="eyebrow">Marco legal aplicable</span>
              <ul>
                <li>
                  <strong>Estatuto Tributario &amp; Ley UGPP:</strong> aportes parafiscales y procesos de fiscalización.
                </li>
                <li>
                  <strong>Código Sustantivo del Trabajo:</strong> relaciones laborales, contratos y novedades.
                </li>
                <li>
                  <strong>Decreto 1072 y estándares SG-SST:</strong> lineamientos de seguridad y salud en el trabajo.
                </li>
                <li>
                  <strong>Ley 1581 de 2012:</strong> protección de datos personales.
                </li>
              </ul>
            </div>
          </aside>
        </div>
        <div className="container">
          <div className="analysis-final-cta">
            <div>
              <span className="eyebrow analysis-final-eyebrow">
                Siguiente paso
              </span>
              <h2>Solicita tu plan de mitigación</h2>
              <p>
                Con el resultado del diagnóstico, Unialiados puede ayudarte a priorizar hallazgos y definir una ruta de acompañamiento para tu empresa.
              </p>
            </div>
            <a className="btn btn-gold" href="/contacto">
              Solicitar plan
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
