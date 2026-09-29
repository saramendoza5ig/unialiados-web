import cors from "cors";
import express from "express";
import cotizadorRoutes from "./routes/cotizador.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(
    cors({
      origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000"
    })
  );
  app.use(express.json({ limit: "100kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "unialiados-backend" });
  });

  app.use("/api/cotizador", cotizadorRoutes);
  app.use(errorHandler);

  return app;
}
