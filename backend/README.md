# Backend Unialiados

Backend base en Node.js + Express para las funcionalidades dinámicas del sitio.

## Estado del cotizador

La API del cotizador se encuentra preparada, pero **sin reglas comerciales hardcodeadas**. Esto es intencional: las variables de entrada, reglas de cálculo, mensajes y resultado deben ser definidos y aprobados por Unialiados antes de implementar el cálculo definitivo.

## Ejecutar localmente

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Servidor por defecto:

```text
http://localhost:4000
```

Endpoints iniciales:

```text
GET  /api/health
GET  /api/cotizador/config
POST /api/cotizador/calculate
```

Mientras la configuración esté en `pending_definition`, el endpoint de cálculo responde con `409 QUOTE_CONFIGURATION_PENDING`.

## Activar el cotizador después de la reunión

1. Documentar la definición funcional aprobada.
2. Completar `src/config/cotizador.config.js` con los campos definitivos.
3. Implementar las reglas aprobadas dentro de `src/services/cotizador.service.js`.
4. Cambiar `status` de `pending_definition` a `active` únicamente cuando las reglas estén implementadas y probadas.
5. Crear casos de prueba con ejemplos suministrados o validados por Unialiados.
