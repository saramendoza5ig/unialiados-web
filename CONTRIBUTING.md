# Guía de contribución

Este documento define las reglas básicas para trabajar en el proyecto de Unialiados.

## Ramas

Las ramas principales son:

- `main`: versión estable del proyecto.
- `develop`: rama de integración del equipo.

Las ramas de trabajo deben crearse desde `develop`.

Ejemplos:

```text
feature/home
feature/servicios
feature/cotizador
feature/unisoft
fix/header-mobile
```

## Tipos de commits

Usaremos prefijos simples para identificar el tipo de cambio:

- `feat:` nueva funcionalidad.
- `fix:` corrección de un error.
- `docs:` cambios en documentación.
- `style:` cambios visuales o de formato que no modifican la lógica.
- `refactor:` reorganización o mejora de código sin cambiar su comportamiento.
- `chore:` tareas técnicas o de configuración.

Ejemplos:

```text
feat: agrega sección de servicios
fix: corrige menú en mobile
docs: actualiza README
style: ajusta espaciado del header
refactor: reorganiza componentes de home
chore: actualiza configuración del proyecto
```

## Flujo de trabajo

1. Actualizar `develop`.

```bash
git checkout develop
git pull
```

2. Crear una rama nueva.

```bash
git checkout -b feature/nombre-tarea
```

3. Realizar los cambios.

4. Crear el commit.

```bash
git add .
git commit -m "feat: descripción del cambio"
```

5. Subir la rama.

```bash
git push -u origin feature/nombre-tarea
```

6. Crear Pull Request hacia `develop`.

## Reglas básicas

- No trabajar directamente sobre `main`.
- No subir archivos `.env` ni credenciales.
- Mantener los componentes reutilizables dentro de `src/components`.
- Revisar que el proyecto funcione antes de abrir un Pull Request.
- Una vez aprobado el Pull Request, hacer merge hacia `develop`.