export default function Page() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            Contacto
          </span>
          <h1>
            Hablemos, estamos para ayudarle.
          </h1>
          <p>
            Cuéntenos sobre su empresa y uno de nuestros especialistas podrá orientar la solicitud hacia el servicio adecuado.
          </p>
        </div>
      </section>
      <section className="section contact-section">
        <div className="container contact-grid contact-grid-polished">
          <div className="contact-side">
            <div className="contact-intro-card">
              <span className="eyebrow">
                Canales de atención
              </span>
              <h2>
                Conversemos sobre lo que necesita su empresa
              </h2>
              <p>
                Elija el canal que le resulte más cómodo. Nuestro equipo orientará su solicitud hacia el servicio o especialista adecuado.
              </p>
              <div className="contact-trust">
                <span>
                  ✓ Atención empresarial
                </span>
                <span>
                  ✓ Cobertura nacional
                </span>
                <span>
                  ✓ Respuesta oportuna
                </span>
              </div>
            </div>
            <div className="contact-list contact-list-polished">
              <div className="contact-item">
                <span className="contact-icon">
                  ☎
                </span>
                <div>
                  <small>
                    PBX Bogotá
                  </small>
                  <strong>
                    +57 (601) 248 6717
                  </strong>
                  <p>
                    Lunes a Viernes · 8:00 a 17:00
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  ▤
                </span>
                <div>
                  <small>
                    Línea WhatsApp
                  </small>
                  <strong>
                    +57 300 445 5981
                  </strong>
                  <p>
                    Atención comercial y seguimiento
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  ✉
                </span>
                <div>
                  <small>
                    Correo corporativo
                  </small>
                  <strong>
                    hola@unialiados.com
                  </strong>
                  <p>
                    Propuestas, información y solicitudes
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  ⌖
                </span>
                <div>
                  <small>
                    Sede principal
                  </small>
                  <strong>
                    Bogotá D.C., Colombia
                  </strong>
                  <p>
                    Atención presencial con cita previa
                  </p>
                </div>
              </div>
            </div>
            <div className="legal-id-card">
              <span className="eyebrow">
                Identificación jurídica
              </span>
              <h3>
                UNIDOS & ALIADOS DE COLOMBIA SAS
              </h3>
              <div className="legal-id-grid">
                <div>
                  <span>
                    NIT
                  </span>
                  <strong>
                    900.123.456-7
                  </strong>
                </div>
                <div>
                  <span>
                    Régimen
                  </span>
                  <strong>
                    Responsable de IVA
                  </strong>
                </div>
                <div>
                  <span>
                    Ciudad
                  </span>
                  <strong>
                    Bogotá D.C., Colombia
                  </strong>
                </div>
                <div>
                  <span>
                    Cobertura
                  </span>
                  <strong>
                    Nivel Nacional
                  </strong>
                </div>
              </div>
              <div className="legal-id-footer">
                ✹ Registro mercantil y Cámara de Comercio al día
              </div>
            </div>
          </div>
          <div className="panel contact-form-panel">
            <div className="contact-form-head">
              <span className="eyebrow">
                Envíenos un mensaje
              </span>
              <h2 className="panel-title">
                ¿Cómo podemos ayudarle?
              </h2>
              <p>
                Complete el formulario y uno de nuestros especialistas se pondrá en contacto con usted.
              </p>
            </div>
            <div className="grid-2">
              <div className="field">
                <label>
                  Nombre completo
                </label>
                <input placeholder="Nombre y apellido" />
              </div>
              <div className="field">
                <label>
                  Empresa
                </label>
                <input placeholder="Nombre de la empresa" />
              </div>
            </div>
            <div className="grid-2">
              <div className="field">
                <label>
                  Correo electrónico
                </label>
                <input placeholder="correo@empresa.com" />
              </div>
              <div className="field">
                <label>
                  Teléfono
                </label>
                <input placeholder="(+57) 300 000 0000" />
              </div>
            </div>
            <div className="field">
              <label>
                Motivo de contacto
              </label>
              <select>
                <option>
                  Información sobre servicios
                </option>
                <option>
                  Cotización
                </option>
                <option>
                  Análisis de vulnerabilidades
                </option>
                <option>
                  Acceso a Unisoft
                </option>
                <option>
                  Otro
                </option>
              </select>
            </div>
            <div className="field">
              <label>
                Mensaje
              </label>
              <textarea rows="6" placeholder="Cuéntenos brevemente qué necesita su empresa..."></textarea>
            </div>
            <div className="contact-form-actions">
              <button className="btn btn-gold full">
                Enviar mensaje
              </button>
              <span>
                🔒 Información tratada de acuerdo con la política de protección de datos.
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
