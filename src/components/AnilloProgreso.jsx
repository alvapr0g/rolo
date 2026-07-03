export default function AnilloProgreso({ valor = 0, etiqueta }) {
  return (
    <div
      className="anillo" role="progressbar" aria-valuenow={valor}
      aria-valuemin={0} aria-valuemax={100} aria-label={etiqueta}
      style={{ background: `conic-gradient(var(--color-acento-grado) 0 ${valor}%, var(--color-fondo-superficie-2) ${valor}% 100%)` }}
    >
      <span className="anillo-centro">{valor}%</span>
    </div>
  )
}
