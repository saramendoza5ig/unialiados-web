# Unialiados Web

Sitio web corporativo de Unialiados desarrollado con:

- Next.js
- React
- JavaScript
- Tailwind CSS
- Node.js

## Objetivo

Construir una página web moderna, responsive y escalable para Unialiados, incluyendo las siguientes secciones:

- Home
- Nosotros
- Servicios
- Análisis de Vulnerabilidades
- Cotizador
- Contáctenos
- Unisoft

> Unisoft continúa siendo una aplicación independiente desarrollada en PHP.  
> La nueva página web únicamente tendrá una sección o acceso hacia la plataforma existente.

## Requisitos

- Node.js 20 o superior
- npm

## Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd unialiados-web
```

Instalar dependencias:

```bash
npm install
```

Crear archivo de variables de entorno:

```bash
copy .env.example .env.local
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## Estructura principal

```text
src/
├── app/
│   ├── analisis-vulnerabilidades/
│   ├── contacto/
│   ├── cotizador/
│   ├── nosotros/
│   ├── servicios/
│   ├── unisoft/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
└── components/
    ├── layout/
    ├── sections/
    └── ui/
```

## Organización de componentes

### layout

Componentes globales utilizados en toda la aplicación.

Ejemplos:

- Header
- Footer

### sections

Secciones principales de cada página.

Ejemplos:

- HomeHero
- ServicesSection
- AboutSection
- VulnerabilitySection
- QuoteSection
- ContactCTA
- UnisoftSection

### ui

Componentes reutilizables de interfaz.

Ejemplos:

- Button
- Card
- Container
- SectionTitle

## Flujo de ramas

Ramas principales:

```text
main
develop
```

`main` corresponde a la versión estable del proyecto.

`develop` es la rama de integración del equipo.

Cada tarea debe desarrollarse en una rama independiente creada desde `develop`.

Ejemplos:

```text
feature/home
feature/services
feature/cotizador
feature/contacto
feature/unisoft
fix/nombre-del-error
```

Flujo recomendado:

```text
feature/*
    ↓
develop
    ↓
main
```

Los cambios deben integrarse mediante Pull Request.

## Variables de entorno

Las variables disponibles se documentan en:

```text
.env.example
```

Cada desarrollador debe crear localmente:

```text
.env.local
```

No subir credenciales reales al repositorio.

## Estado del proyecto

El proyecto contiene actualmente la estructura técnica inicial.

La implementación visual y funcional definitiva se realizará a partir de los mockups aprobados por el cliente.
