import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

const contactChannels = [
  {
    icon: "☎",
    label: "Móvil 1",
    value: "300 447 0236",
    href: "tel:+573004470236",
    detail: "Atención comercial",
  },
  {
    icon: "☎",
    label: "Móvil 2",
    value: "313 428 3965",
    href: "tel:+573134283965",
    detail: "Atención y seguimiento",
  },
  {
    icon: "✉",
    label: "Correo comercial",
    value: "comercial@unialiados.com",
    href: "mailto:comercial@unialiados.com",
    detail: "Cotizaciones e información de servicios",
  },
  {
    icon: "✉",
    label: "Correo administrativo",
    value: "administracion@unialiados.com",
    href: "mailto:administracion@unialiados.com",
    detail: "Solicitudes y procesos administrativos",
  },
  {
    icon: "⌂",
    label: "Sitio web",
    value: "www.unialiados.com",
    href: "https://www.unialiados.com",
    detail: "Información institucional y servicios",
    external: true,
  },
  {
    icon: "⌖",
    label: "Dirección",
    value: "Calle 57 N.º 13-48, Oficina 401",
    detail: "Bogotá D.C.",
  },
  {
    icon: "◷",
    label: "Horario",
    value: "Lunes a viernes",
    detail: "8:00 a.m. a 5:00 p.m.",
  },
];

const socialNetworks = [
  { network: "Instagram", account: "@unialiados", icon: FaInstagram, slug: "instagram" },
  { network: "Facebook", account: "Unialiados Marcas", icon: FaFacebookF, slug: "facebook" },
  { network: "TikTok", account: "@unialiados", icon: FaTiktok, slug: "tiktok" },
  {
    network: "YouTube",
    account: (
      <>
        @unialiados<wbr />mejoraliado8786
      </>
    ),
    icon: FaYoutube,
    slug: "youtube",
  },
];

export default function Page() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            Contacto
          </span>
          <h1>
            ¡Estamos listos para apoyar tu gestión!
          </h1>
          <p>
            Cuéntanos sobre tu empresa y nuestro equipo orientará la solicitud hacia
            el servicio adecuado.
          </p>
        </div>
      </section>
      <section className="section contact-section">
        <div className="container contact-grid contact-grid-polished">
          <div className="contact-side">
            <div className="contact-directory">
              <div className="contact-directory-head">
                <span className="eyebrow">Canales de atención</span>
                <h2>Elige el canal que prefieras</h2>
                <p>
                  Estamos disponibles para resolver tus inquietudes, preparar una
                  propuesta o acompañar los procesos de tu empresa.
                </p>
              </div>

              <div className="contact-directory-body">
                <section className="contact-directory-group">
                  <h3>Líneas directas</h3>
                  <div className="contact-phone-grid">
                    {contactChannels.slice(0, 2).map((channel) => (
                      <a className="contact-phone" href={channel.href} key={channel.label}>
                        <span className="contact-directory-icon" aria-hidden="true">
                          {channel.icon}
                        </span>
                        <span>
                          <small>{channel.label}</small>
                          <strong>{channel.value}</strong>
                          <em>{channel.detail}</em>
                        </span>
                      </a>
                    ))}
                  </div>
                </section>

                <section className="contact-directory-group">
                  <h3>Correos electrónicos</h3>
                  <div className="contact-directory-rows">
                    {contactChannels.slice(2, 4).map((channel) => (
                      <a className="contact-directory-row" href={channel.href} key={channel.label}>
                        <span className="contact-directory-icon" aria-hidden="true">
                          {channel.icon}
                        </span>
                        <span className="contact-directory-copy">
                          <small>{channel.label}</small>
                          <strong>{channel.value}</strong>
                          <em>{channel.detail}</em>
                        </span>
                      </a>
                    ))}
                  </div>
                </section>

                <section className="contact-directory-group">
                  <h3>Información general</h3>
                  <div className="contact-directory-rows compact">
                    {contactChannels.slice(4).map((channel) => {
                      const Row = channel.href ? "a" : "div";

                      return (
                        <Row
                          className="contact-directory-row"
                          href={channel.href}
                          target={channel.external ? "_blank" : undefined}
                          rel={channel.external ? "noopener noreferrer" : undefined}
                          key={channel.label}
                        >
                          <span className="contact-directory-icon" aria-hidden="true">
                            {channel.icon}
                          </span>
                          <span className="contact-directory-copy">
                            <small>{channel.label}</small>
                            <strong>{channel.value}</strong>
                            <em>{channel.detail}</em>
                          </span>
                        </Row>
                      );
                    })}
                  </div>
                </section>
              </div>

              <div className="contact-assurances">
                <span>✓ Atención empresarial</span>
                <span>✓ Cobertura nacional</span>
                <span>✓ Respuesta oportuna</span>
              </div>
            </div>
          </div>
          <div className="panel contact-form-panel">
            <div className="contact-form-head">
              <span className="eyebrow">
                Envíenos un mensaje
              </span>
              <h2 className="panel-title">
                ¿Cómo podemos ayudarte?
              </h2>
              <p>
                Completa el formulario y uno de nuestros especialistas se pondrá en
                contacto contigo.
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
      <section className="section contact-social-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Redes sociales</span>
              <h2>También estamos en redes</h2>
              <p>Sigue a Unialiados y conoce nuestras novedades.</p>
            </div>
          </div>
          <div className="social-grid">
            {socialNetworks.map(({ network, account, icon: SocialIcon, slug }) => (
              <div className={`social-item ${slug}`} key={network}>
                <span className="social-icon" aria-hidden="true">
                  <SocialIcon />
                </span>
                <div>
                  <span className="social-network">{network}</span>
                  <strong>{account}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
