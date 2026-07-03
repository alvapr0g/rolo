// Espejo del componente Figma "Tarjeta"
export default function Tarjeta({ ancha = false, children, ...props }) {
  return (
    <div
      className={ancha ? 'tarjeta tarjeta--ancha' : 'tarjeta'}
      style={{
        background: 'var(--color-fondo-superficie)', borderRadius: 'var(--radio-lg)',
        padding: 'var(--espaciado-lg)', display: 'flex', flexDirection: 'column',
        gap: 'var(--espaciado-md)',
      }}
      {...props}
    >
      {children}
    </div>
  )
}
