# FloraGuía · Exposición

Página web de la exposición del trabajo final de **Base de Datos (1ASI0787, UPC 2026-10)** de la startup **Raíz Urbana**.

- **División por integrante:** quién expone cada diapositiva, el tiempo sugerido y el guion.
- **Modo presentación:** diapositivas a pantalla completa con notas del expositor.
- **Descargas:** la exposición en PDF y en PPTX (carpeta `descargas/`).

## Controles del modo presentación

| Tecla | Acción |
|---|---|
| `→` / `Espacio` | Siguiente diapositiva |
| `←` | Diapositiva anterior |
| `N` | Mostrar u ocultar notas |
| `F` | Pantalla completa |
| `Esc` | Volver a la vista general |

También se puede abrir una diapositiva directamente con `#número` al final de la URL (por ejemplo `…/#9`).

## Publicar con GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `floraguia-expo`) y sube **el contenido de esta carpeta** a la raíz del repositorio:
   ```bash
   git init
   git add .
   git commit -m "Exposición FloraGuía"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/floraguia-expo.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)` → **Save**.
3. En uno o dos minutos la página estará en `https://<tu-usuario>.github.io/floraguia-expo/`.

El sitio es estático (HTML, CSS y JS sin compilación); el archivo `.nojekyll` evita que GitHub lo procese con Jekyll.

## Cambiar quién expone

Cada diapositiva es una `<section class="slide">` en `index.html`:

- `data-presenter` indica el integrante (`espinoza`, `moreno`, `lluen`, `arias`, `mendez`; ver `PRESENTERS` en `app.js`).
- `data-min` es el tiempo sugerido en minutos.
- El `<aside>` contiene el guion que aparece en las notas.

La división y los tiempos de la vista general se recalculan solos.
