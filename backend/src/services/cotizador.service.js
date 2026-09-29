import { cotizadorConfig } from "../config/cotizador.config.js";

export class CotizadorConfigurationPendingError extends Error {
  constructor() {
    super(
      "El cotizador todavía no tiene reglas funcionales aprobadas para realizar cálculos."
    );
    this.name = "CotizadorConfigurationPendingError";
    this.code = "QUOTE_CONFIGURATION_PENDING";
  }
}

export function getCotizadorConfig() {
  return cotizadorConfig;
}

export function calculateCotizacion(inputs = {}) {
  if (cotizadorConfig.status !== "active") {
    throw new CotizadorConfigurationPendingError();
  }

  // Este punto queda preparado para implementar la lógica aprobada.
  // Evitamos hardcodear fórmulas, porcentajes o variables antes de la reunión.
  return {
    configVersion: cotizadorConfig.version,
    inputs,
    result: null
  };
}
