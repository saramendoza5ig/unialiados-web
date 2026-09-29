export function errorHandler(error, _req, res, _next) {
  console.error(error);

  res.status(500).json({
    ok: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "Ocurrió un error interno en el servidor."
  });
}
