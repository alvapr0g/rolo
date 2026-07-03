// Espejo del componente Figma "Input" (Estado=Reposo/Foco · prop Placeholder)
// El estado Foco lo maneja el navegador via :focus (borde acento en global.css inline)
export default function Input(props) {
  return (
    <input
      className="campo"
      style={{
        width: '100%', padding: '14px 16px',
        borderRadius: 'var(--radio-md)', border: '1.5px solid transparent',
        background: 'var(--color-fondo-superficie-2)',
        color: 'var(--color-texto-primario)', fontSize: 13,
      }}
      onFocus={(e) => (e.target.style.borderColor = 'var(--color-acento-grado)')}
      onBlur={(e) => (e.target.style.borderColor = 'transparent')}
      {...props}
    />
  )
}
