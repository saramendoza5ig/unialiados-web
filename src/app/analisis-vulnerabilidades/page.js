"use client";

import { useEffect, useState } from "react";

const questions = [
  {
    id: 1,
    text: "¿Tiene certeza de que todos los contratos laborales vigentes están debidamente firmados, actualizados y archivados?",
    note: "Evita reclamaciones por contratos verbales o cláusulas desactualizadas frente al Código Sustantivo del Trabajo.",
  },
  {
    id: 2,
    text: "¿Sus liquidaciones de nómina aplican correctamente los topes del IBC y las exoneraciones tributarias?",
    note: "La revisión del IBC ayuda a prevenir diferencias en aportes y posibles requerimientos de la UGPP.",
  },
  {
    id: 3,
    text: "¿Cuenta con soporte firmado de entrega periódica de dotaciones y descansos remunerados según la ley colombiana?",
    note: "La documentación respaldatoria ayuda a reducir contingencias probatorias.",
  },
  {
    id: 4,
    text: "¿Ha recibido algún requerimiento de información, persuasivo o sancionatorio de la UGPP en los últimos 3 años?",
    note: "Los antecedentes de fiscalización requieren seguimiento documental y respuesta oportuna.",
  },
  {
    id: 5,
    text: "¿Mantiene actualizados los exámenes ocupacionales y soportes de Seguridad y Salud en el Trabajo?",
    note: "La actualización periódica permite evidenciar acciones preventivas y cumplimiento documental.",
  },
  {
    id: 6,
    text: "¿Cuenta con políticas y soportes claros para incapacidades, licencias y novedades de afiliación?",
    note: "La trazabilidad reduce reprocesos y facilita la atención ante EPS, ARL y fondos.",
  },
  {
    id: 7,
    text: "¿Tiene definido a quién acudir cuando aparece una novedad laboral, tributaria o de seguridad social?",
    note: "Contar con una ruta de atención permite actuar antes de que el problema escale.",
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

export default function Page() {
  const [step, setStep] = useState("checklist");
  const [answers, setAnswers] = useState({});
  const [lead, setLead] = useState(emptyLead);
  const [errors, setErrors] = useState({});
  const [gaugePercent, setGaugePercent] = useState(0);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;
  const alertCount = Object.values(answers).filter((value) => value === false).length;
  const riskPercent = Math.round((alertCount / questions.length) * 100);
  const risk = riskLevelFor(riskPercent);

  useEffect(() => {
    if (step !== "result") {
      setGaugePercent(0);
      return;
    }
    let frame;
    const duration = 1100;
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

  function handleAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
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

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Autodiagnóstico en línea</span>
          <h1>Análisis de vulnerabilidades laborales</h1>
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

            {step === "checklist" && (
              <div className="check-panel">
                <span className="eyebrow">Paso 1 de 3 · Autodiagnóstico</span>
                <h2 className="panel-title checklist-title">
                  Lista de Chequeo Rápida (7 puntos críticos)
                </h2>
                <p className="panel-copy">
                  Responda cada pregunta con Sí o No. Al finalizar podrá ver su resultado.
                </p>
                <p className="note">{answeredCount} de {questions.length} preguntas respondidas</p>
                {questions.map((question) => {
                  const value = answers[question.id];
                  const answeredClass =
                    value === true ? "ok" : value === false ? "alert" : "";
                  return (
                    <div key={question.id} className={`question ${answeredClass}`}>
                      <div className="qnum">{question.id}</div>
                      <div className="qtext">
                        <strong>{question.text}</strong>
                        <p>{question.note}</p>
                      </div>
                      <div className="answer-buttons">
                        <button
                          type="button"
                          className={`answer-btn yes${value === true ? " selected" : ""}`}
                          onClick={() => handleAnswer(question.id, true)}
                        >
                          Sí
                        </button>
                        <button
                          type="button"
                          className={`answer-btn no${value === false ? " selected" : ""}`}
                          onClick={() => handleAnswer(question.id, false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="checklist-actions">
                  <button
                    type="button"
                    className="btn btn-primary full"
                    disabled={!allAnswered}
                    onClick={() => setStep("lead")}
                  >
                    Ver mi resultado →
                  </button>
                </div>
              </div>
            )}

            {step === "lead" && (
              <div className="check-panel">
                <span className="eyebrow">Paso 2 de 3 · Sus datos</span>
                <h2 className="panel-title checklist-title">
                  Un último paso para mostrarle su diagnóstico
                </h2>
                <p className="panel-copy">
                  Con esta información un asesor de Unialiados podrá contactarle para explicarle el resultado y las recomendaciones.
                </p>
                <form onSubmit={handleLeadSubmit}>
                  <div className="grid-2">
                    <div className="field">
                      <label htmlFor="nombre">Nombre completo *</label>
                      <input
                        id="nombre"
                        type="text"
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
                        value={lead.telefono}
                        onChange={(event) => handleLeadChange("telefono", event.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="empresa">Nombre de la empresa *</label>
                      <input
                        id="empresa"
                        type="text"
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
                  <div className="checklist-actions two">
                    <button type="button" className="btn btn-secondary" onClick={() => setStep("checklist")}>
                      ← Volver
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Ver mi resultado →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === "result" && (
              <div className="check-panel">
                <span className="eyebrow">Paso 3 de 3 · Resultado</span>
                <h2 className="panel-title checklist-title">
                  Resultado de {lead.nombre} — {lead.empresa}
                </h2>
                <p className="panel-copy">
                  Estas son las respuestas registradas en su autodiagnóstico.
                </p>
                {questions.map((question) => {
                  const value = answers[question.id];
                  return (
                    <div key={question.id} className={`question ${value ? "ok" : "alert"}`}>
                      <div className="qnum">{question.id}</div>
                      <div className="qtext">
                        <strong>{question.text}</strong>
                        <p>{question.note}</p>
                      </div>
                      <span className={`status ${value ? "status-ok" : "status-alert"}`}>
                        {value ? "✓ Cumple" : "✕ Alerta"}
                      </span>
                    </div>
                  );
                })}
                <div className="checklist-actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setStep("checklist");
                      setAnswers({});
                      setLead(emptyLead);
                    }}
                  >
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
                <p className="risk-sub">
                  {step === "checklist"
                    ? "Complete las 7 preguntas para calcular su nivel de riesgo."
                    : "Su diagnóstico está listo. Complete sus datos para verlo."}
                </p>
              </div>
            )}
            {step === "result" && (
              <div className="risk-box">
                <div className="risk-head">
                  <span className="eyebrow">Termómetro de riesgo en vivo</span>
                  <span className="risk-pill">{risk.label}</span>
                </div>
                <div className="gauge-wrap">
                  <div className="gauge" style={{ "--p": gaugePercent }}>
                    <div className="needle"></div>
                  </div>
                </div>
                <div className="gauge-value">{gaugePercent}%</div>
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
              <span className="eyebrow" style={{ color: "#ffd35b" }}>
                Siguiente paso
              </span>
              <h2>Solicita tu plan de mitigación</h2>
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
