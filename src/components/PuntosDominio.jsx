// Espejo del componente Figma "Puntos de dominio" (Nivel=0..3)
const ETIQUETAS = ['sin empezar', 'iniciada', 'en práctica', 'dominada']
export default function PuntosDominio({ nivel = 0 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 5 }} role="img" aria-label={`Dominio: ${ETIQUETAS[nivel]}`}>
      {[0, 1, 2].map((k) => (
        <i key={k} style={{
          width: 10, height: 10, borderRadius: '50%', display: 'block',
          background: k < nivel ? 'var(--color-acento-grado)' : 'transparent',
          border: k < nivel ? 'none' : '1px solid var(--color-borde-sutil)',
        }} />
      ))}
    </span>
  )
}
