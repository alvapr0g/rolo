import Chip from '../components/Chip'
import { useState } from 'react'
import { FLUJO, TECNICAS } from '../data'

const nombreDe = (n) => n.etiqueta || TECNICAS.find((t) => t.id === n.id)?.nombre || n.id

export default function FlujoTecnicas({ irA }) {
  const [soloMias, setSoloMias] = useState(true)
  const centro = (n) => ({ cx: n.x + n.w / 2, cy: n.y + 18 })
  const ruta = (a) => {
    const de = centro(FLUJO.nodos.find((n) => n.id === a.de))
    const hasta = centro(FLUJO.nodos.find((n) => n.id === a.a))
    const mx = (de.cy + hasta.cy) / 2
    return `M ${de.cx} ${de.cy} C ${de.cx} ${mx}, ${hasta.cx} ${mx}, ${hasta.cx} ${hasta.cy}`
  }
  return (
    <section aria-label="Flujo de técnicas">
      <div className="miga">
        <button onClick={() => irA({ vista: 'biblioteca' })} aria-label="Volver">←</button>
        <h1 className="display" style={{ fontSize: 22 }}>Flujo de técnicas</h1>
      </div>
      <p style={{ color: 'var(--color-texto-secundario)', fontSize: 13, margin: '6px 0 14px' }}>
        Centrado en: Pase torreando · toca un nodo para ver la técnica
      </p>
      <svg className="grafo-svg" viewBox="0 0 360 360" role="group" aria-label="Grafo de encadenamientos">
        {FLUJO.aristas.map((a, k) => (
          <path key={k} className={`grafo-arista ${a.tipo === 'contra' ? 'contra' : ''}`} d={ruta(a)} />
        ))}
        {FLUJO.nodos.map((n) => {
          const esTecnica = TECNICAS.some((t) => t.id === n.id)
          return (
            <g key={n.id} className={`grafo-nodo ${n.activo ? 'activo' : ''}`}
               onClick={() => esTecnica && irA({ vista: 'tecnica', id: n.id })}
               role={esTecnica ? 'button' : undefined} tabIndex={esTecnica ? 0 : undefined}
               onKeyDown={(e) => e.key === 'Enter' && esTecnica && irA({ vista: 'tecnica', id: n.id })}>
              <rect x={n.x} y={n.y} width={n.w} height={36} rx={18} />
              <text x={n.x + n.w / 2} y={n.y + 23} textAnchor="middle">{nombreDe(n).toUpperCase()}</text>
            </g>
          )
        })}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
        <div className="leyenda"><span>━ encadena</span><span>┅ contra</span></div>
        <div className="grupo-chips">
          <Chip seleccionado={soloMias} onClick={() => setSoloMias(true)}>Solo mis técnicas</Chip>
          <Chip seleccionado={!soloMias} onClick={() => setSoloMias(false)}>Todo</Chip>
        </div>
      </div>
    </section>
  )
}
