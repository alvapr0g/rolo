// Espejo del componente Figma "Chip" (selected=on/off)
export default function Chip({ seleccionado = false, onClick, children }) {
  return (
    <button
      className="chip"
      aria-pressed={seleccionado}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', padding: '8px 14px',
        borderRadius: 'var(--radio-completo)', fontSize: 13, fontWeight: 500,
        border: `1.2px solid ${seleccionado ? 'var(--color-acento-grado)' : 'var(--color-borde-sutil)'}`,
        background: seleccionado ? 'var(--color-acento-grado)' : 'transparent',
        color: seleccionado ? 'var(--color-texto-inverso)' : 'var(--color-texto-secundario)',
      }}
    >
      {children}
    </button>
  )
}
