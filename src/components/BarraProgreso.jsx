// Espejo del componente Figma "Barra de progreso"
export default function BarraProgreso({ valor = 0, etiqueta }) {
  return (
    <div
      className="barra" role="progressbar" aria-valuenow={valor}
      aria-valuemin={0} aria-valuemax={100} aria-label={etiqueta}
      style={{ height: 8, borderRadius: 'var(--radio-completo)', background: 'var(--color-fondo-superficie-2)', overflow: 'hidden' }}
    >
      <span style={{ display: 'block', height: '100%', width: `${valor}%`, background: 'var(--color-acento-grado)', borderRadius: 'var(--radio-completo)' }} />
    </div>
  )
}
