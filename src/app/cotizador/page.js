"use client";

import { useEffect, useMemo, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function Field({ field, value, onChange }) {
  const commonProps = {
    id: field.key,
    name: field.key,
    value: value ?? "",
    required: Boolean(field.required),
    onChange: (event) => onChange(field.key, event.target.value)
  };

  if (field.type === "select") {
    return (
      <select {...commonProps}>
        <option value="">Selecciona una opción</option>
        {(field.options || []).map((option) => {
          const optionValue = typeof option === "string" ? option : option.value;
          const optionLabel = typeof option === "string" ? option : option.label;

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <input
      {...commonProps}
      type={field.type || "text"}
      placeholder={field.placeholder || ""}
      min={field.min}
      max={field.max}
      step={field.step}
    />
  );
}

export default function Page() {
  const [config, setConfig] = useState(null);
  const [values, setValues] = useState({});
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadConfig() {
      try {
        const response = await fetch(`${API_URL}/api/cotizador/config`, {
          cache: "no-store"
        });
        const payload = await response.json();

        if (!response.ok || !payload.ok) {
          throw new Error("No fue posible cargar la configuración del cotizador.");
        }

        if (active) {
          setConfig(payload.data);
        }
      } catch (_error) {
        if (active) {
          setMessage(
            "El frontend está listo, pero el backend del cotizador no está conectado en este momento."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadConfig();

    return () => {
      active = false;
    };
  }, []);

  const isActive = config?.status === "active";
  const fields = useMemo(() => config?.fields || [], [config]);

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
    setMessage("");
  }

  async function handleCalculate(event) {
    event.preventDefault();

    if (!isActive) {
      setMessage(
        "La lógica de cálculo se habilitará cuando Unialiados apruebe los campos, reglas y resultado del cotizador."
      );
      return;
    }

    setSubmitting(true);
    setMessage("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/api/cotizador/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: values })
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || "No fue posible calcular la cotización.");
      }

      setResult(payload.data?.result ?? null);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Cotizador en línea</span>
          <h1>Una estructura flexible para cotizar según las reglas de Unialiados.</h1>
          <p>
            El módulo está preparado para recibir los datos de entrada, aplicar las reglas
            comerciales aprobadas y presentar el resultado definido por Unialiados. La
            configuración exacta se completará después de la reunión de definición funcional.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container form-layout">
          <form className="panel" onSubmit={handleCalculate}>
            <span className="eyebrow">Datos de cotización</span>
            <h2 className="panel-title">Información requerida</h2>
            <p className="panel-copy">
              Los campos se generan desde la configuración del backend para que puedan
              ajustarse sin rehacer la estructura del cotizador.
            </p>

            {loading && <div className="quote-placeholder">Cargando configuración…</div>}

            {!loading && fields.length === 0 && (
              <div className="quote-placeholder">
                <strong>Pendiente de definición funcional.</strong>
                <span>
                  En la reunión se confirmarán las preguntas o variables que deberá completar
                  el usuario para obtener la cotización.
                </span>
              </div>
            )}

            {fields.map((field) => (
              <div className="field" key={field.key}>
                <label htmlFor={field.key}>
                  {field.label}
                  {field.required ? " *" : ""}
                </label>
                <Field field={field} value={values[field.key]} onChange={updateValue} />
                {field.helpText && <small className="quote-help">{field.helpText}</small>}
              </div>
            ))}

            <div className="note">
              <strong>Configuración controlada. </strong>
              No se han definido fórmulas, porcentajes, tarifas ni variables definitivas antes
              de la validación con Unialiados.
            </div>

            {message && <div className="quote-message">{message}</div>}

            <button className="btn btn-primary full" type="submit" disabled={!isActive || submitting}>
              {submitting ? "Calculando…" : "Calcular cotización"}
            </button>
          </form>

          <div className="panel dark">
            <span className="eyebrow" style={{ color: "var(--gold)" }}>
              Resultado
            </span>
            <h2 className="panel-title light">Salida de la cotización</h2>
            <p className="dark-note quote-result-intro">
              El resultado podrá configurarse como valor exacto, rango, desglose, mensaje o
              contacto con un asesor, según lo que se apruebe en reunión.
            </p>

            <div className="summary-row">
              <span>Datos de entrada</span>
              <strong>{fields.length ? "Configurados" : "Por definir"}</strong>
            </div>
            <div className="summary-row">
              <span>Reglas de cálculo</span>
              <strong>{config?.rules?.length ? "Configuradas" : "Por definir"}</strong>
            </div>
            <div className="summary-row">
              <span>Tipo de resultado</span>
              <strong>{config?.result?.mode || "Por definir"}</strong>
            </div>
            <div className="summary-row accent">
              <span>Estado funcional</span>
              <strong>{isActive ? "Activo" : "Pendiente de aprobación"}</strong>
            </div>

            <div className="total quote-result-box">
              <span>Resultado</span>
              <strong>{result ?? "—"}</strong>
            </div>

            <p className="dark-note">
              Cuando se aprueben las reglas, este panel mostrará automáticamente el resultado
              correspondiente al escenario ingresado.
            </p>

            <div className="actions">
              <a className="btn btn-gold" href="/contacto">
                Hablar con un asesor
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Estructura preparada</span>
              <h2>Lo que se definirá con Unialiados</h2>
              <p>
                La base técnica queda lista sin asumir reglas comerciales que todavía no han
                sido aprobadas.
              </p>
            </div>
          </div>

          <div className="grid-3 quote-benefits">
            <div className="card quote-card">
              <span className="qbadge">01</span>
              <div className="icon">⌨</div>
              <h3>Entradas</h3>
              <p>Qué datos debe ingresar el usuario, cuáles son obligatorios y qué opciones tendrá.</p>
            </div>
            <div className="card quote-card">
              <span className="qbadge">02</span>
              <div className="icon">ƒ</div>
              <h3>Reglas</h3>
              <p>Fórmulas, tarifas, condiciones, rangos, excepciones y cualquier lógica de cálculo.</p>
            </div>
            <div className="card quote-card">
              <span className="qbadge">03</span>
              <div className="icon">✓</div>
              <h3>Resultado</h3>
              <p>Qué verá el usuario y qué acción podrá realizar después de obtener la cotización.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
