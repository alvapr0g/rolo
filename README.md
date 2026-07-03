# Rolo — App de entrenamiento de BJJ (React)

Implementación en React del diseño de Figma "Rolo — App BJJ · Wireframes".
Una sola base de código sirve la versión **app** (móvil: barra inferior con botón
dorado "+", registro en bottom sheet) y la versión **web** (≥1024px: sidebar,
login de dos paneles), como en las páginas 📱 y 🖥 del archivo de Figma.

## Correr el proyecto
```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # build de producción en /dist
```

## Estructura
- `src/styles/tokens.css` — espejo 1:1 de las variables de Figma
  (colección Color con modos Oscuro/Claro vía `[data-theme]`, Espaciado, Radio).
- `src/components/` — espejo de la página 🧩 Componentes:
  `Boton` (Estilo=primario/secundario), `Input` (foco = borde acento),
  `Chip` (seleccionado), `BarraProgreso`, `PuntosDominio` (nivel 0–3),
  `Tarjeta`, `Cinturon` (color + grados), `AnilloProgreso`, `NavApp`
  (Sidebar web + BottomNav app), `SheetRegistro`, `Toast`.
- `src/views/` — Login, Inicio (racha con animación al guardar sesión),
  Biblioteca, Progreso.

## Accesibilidad
Foco visible por teclado, `role="progressbar"` con valores en barras y anillo,
`aria-pressed` en chips, Escape cierra el sheet, `prefers-reduced-motion`
respetado, cinturones siempre con etiqueta textual.
