/**
 * Configuración funcional del cotizador.
 *
 * IMPORTANTE:
 * Esta configuración se mantiene deliberadamente general hasta que Unialiados
 * defina y apruebe en reunión las variables, reglas de cálculo, mensajes y
 * resultados esperados.
 *
 * Cuando la definición funcional sea aprobada, la mayoría de los cambios
 * iniciales podrán concentrarse en este archivo sin rehacer la UI base.
 */
export const cotizadorConfig = {
  status: "pending_definition",
  version: "0.1-draft",
  title: "Cotizador Unialiados",
  description:
    "La estructura técnica está preparada. Los campos, reglas de cálculo y resultado final se habilitarán con la definición funcional aprobada por Unialiados.",

  // Ejemplo de estructura de un campo futuro:
  // {
  //   key: "numero_trabajadores",
  //   label: "Número de trabajadores",
  //   type: "number", // text | number | select | email | tel
  //   required: true,
  //   placeholder: "Ej. 10",
  //   options: []
  // }
  fields: [],

  // Las reglas reales NO deben agregarse hasta contar con aprobación del cliente.
  rules: [],

  result: {
    // Posibles modos a definir: amount | range | breakdown | message | lead_only
    mode: null,
    currency: "COP",
    labels: []
  },

  finalAction: {
    // Ejemplos que deberán validarse: contactar asesor, enviar formulario,
    // descargar resumen, enviar correo, WhatsApp, etc.
    type: null,
    label: null
  }
};
