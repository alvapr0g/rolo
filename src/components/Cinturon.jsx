// Cinturón literal: banda de color + barra negra + marcas doradas de grado
const COLORES = {
  blanco: 'var(--cinturon-blanco)', azul: 'var(--cinturon-azul)',
  morado: 'var(--cinturon-morado)', cafe: 'var(--cinturon-cafe)', negro: 'var(--cinturon-negro)',
}
export default function Cinturon({ color = 'azul', grados = 0, etiqueta }) {
  return (
    <div className="cinturon" role="img" aria-label={etiqueta} style={{ background: COLORES[color] }}>
      <span className="barra-grado" />
      {Array.from({ length: grados }).map((_, k) => (
        <span key={k} className="grado" style={{ right: `${24 - k * 5}%` }} />
      ))}
    </div>
  )
}
