export default function Page() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            Cotizador en línea
          </span>
          <h1>
            Estima el valor del servicio según el perfil de tu empresa.
          </h1>
          <p>
            El cálculo definitivo dependerá de la tabla comercial aprobada por Unialiados. El diseño contempla las variables mencionadas en reunión: IBC, número de trabajadores y servicio contratado.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container form-layout">
          <div className="panel">
            <span className="eyebrow">
              Datos base
            </span>
            <h2 className="panel-title">
              Escenario de servicio
            </h2>
            <p className="panel-copy">
              Configura los datos principales para visualizar un resumen demostrativo.
            </p>
            <div className="field">
              <label>
                Número de colaboradores
              </label>
              <input defaultValue="10" />
            </div>
            <div className="field">
              <label>
                IBC / salario base promedio por colaborador
              </label>
              <input defaultValue="$ 1.800.000" />
            </div>
            <div className="field">
              <label>
                Tipo de servicio
              </label>
              <select>
                <option>
                  Gestión de Seguridad Social
                </option>
                <option>
                  Gestión de nómina
                </option>
                <option>
                  Asesoría UGPP
                </option>
                <option>
                  Gestión administrativa
                </option>
              </select>
            </div>
            <div className="field">
              <label>
                Clase de riesgo ARL
              </label>
              <select>
                <option>
                  Riesgo I
                </option>
                <option>
                  Riesgo II
                </option>
                <option>
                  Riesgo III
                </option>
                <option>
                  Riesgo IV
                </option>
                <option>
                  Riesgo V
                </option>
              </select>
            </div>
            <div className="note">
              <strong>
                Simulación visual.
              </strong>
              La tarifa del servicio se definirá con la fórmula y porcentajes oficiales entregados por Unialiados.
            </div>
            <a className="btn btn-primary full">
              Calcular escenario
            </a>
          </div>
          <div className="panel dark">
            <span className="eyebrow" style={{color: "var(--gold)"}}>
              Resumen
            </span>
            <h2 className="panel-title light">
              Liquidación estimada
            </h2>
            <div className="summary-chip">
              IBC total de referencia: $18.000.000
            </div>
            <div className="summary-row">
              <span>
                Volumen de colaboradores
              </span>
              <strong>
                10
              </strong>
            </div>
            <div className="summary-row">
              <span>
                Servicio seleccionado
              </span>
              <strong>
                Seguridad Social
              </strong>
            </div>
            <div className="summary-row">
              <span>
                Base IBC estimada
              </span>
              <strong>
                $ 18.000.000
              </strong>
            </div>
            <div className="summary-row">
              <span>
                Clase de riesgo
              </span>
              <strong>
                Riesgo I
              </strong>
            </div>
            <div className="summary-row accent">
              <span>
                Tarifa Unialiados
              </span>
              <strong>
                Según tabla comercial
              </strong>
            </div>
            <div className="total">
              <span>
                Total estimado
              </span>
              <strong>
                $ —
              </strong>
            </div>
            <p className="dark-note">
              El resultado final se habilitará cuando se incorporen las reglas comerciales definitivas.
            </p>
            <div className="actions">
              <a className="btn btn-gold">
                Solicitar cotización formal
              </a>
              <a className="btn btn-light">
                Guardar resumen
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="container">
          <div className="grid-3 quote-benefits">
            <div className="card quote-card">
              <span className="qbadge">
                01
              </span>
              <div className="icon">
                ⌕
              </div>
              <h3>
                Transparente
              </h3>
              <p>
                El usuario puede entender de dónde sale cada subtotal y qué valor corresponde a la administración.
              </p>
            </div>
            <div className="card quote-card">
              <span className="qbadge">
                02
              </span>
              <div className="icon">
                ☷
              </div>
              <h3>
                Configurable
              </h3>
              <p>
                Las reglas y porcentajes podrán centralizarse para facilitar futuras actualizaciones.
              </p>
            </div>
            <div className="card quote-card">
              <span className="qbadge">
                03
              </span>
              <div className="icon">
                ☎
              </div>
              <h3>
                Conectado a un asesor
              </h3>
              <p>
                El resultado puede terminar en una solicitud comercial para recibir una propuesta oficial.
              </p>
            </div>
          </div>
          <div className="quote-final">
            <div>
              <span className="eyebrow">
                DA EL SIGUIENTE PASO
              </span>
              <h2>
                Recibe una cotización oficial y personalizada
              </h2>
              <p>
                Un asesor de Unialiados podrá validar la información de tu empresa y entregar una propuesta formal.
              </p>
              <div className="quote-meta">
                <span>
                  ✓ Sin costo
                </span>
                <span>
                  ✓ Atención personalizada
                </span>
                <span>
                  ✓ Respuesta oportuna
                </span>
              </div>
            </div>
            <a className="btn btn-gold" href="/contacto">
              Quiero una cotización oficial
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
