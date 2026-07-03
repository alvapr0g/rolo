// Espejo del componente Figma "Botón" (Estilo=Primario/Secundario · prop Etiqueta)
export default function Boton({ estilo = 'primario', children, ...props }) {
  const base = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '13px 20px', borderRadius: 'var(--radio-md)',
    fontWeight: 600, fontSize: 14, width: '100%', transition: 'filter .15s ease',
  }
  const estilos = {
    primario: { background: 'var(--color-acento-grado)', color: 'var(--color-texto-inverso)' },
    secundario: { border: '1.4px solid var(--color-borde-sutil)', color: 'var(--color-texto-primario)' },
  }
  return (
    <button style={{ ...base, ...estilos[estilo] }} {...props}>
      {children}
    </button>
  )
}
