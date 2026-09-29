import { Router } from "express";
import {
  calculateCotizacion,
  CotizadorConfigurationPendingError,
  getCotizadorConfig
} from "../services/cotizador.service.js";

const router = Router();

router.get("/config", (_req, res) => {
  res.json({
    ok: true,
    data: getCotizadorConfig()
  });
});

router.post("/calculate", (req, res, next) => {
  try {
    const inputs = req.body?.inputs;

    if (!inputs || typeof inputs !== "object" || Array.isArray(inputs)) {
      return res.status(400).json({
        ok: false,
        code: "INVALID_INPUTS",
        message: "El cuerpo debe incluir un objeto 'inputs'."
      });
    }

    const data = calculateCotizacion(inputs);

    return res.json({
      ok: true,
      data
    });
  } catch (error) {
    if (error instanceof CotizadorConfigurationPendingError) {
      return res.status(409).json({
        ok: false,
        code: error.code,
        message: error.message
      });
    }

    return next(error);
  }
});

export default router;
