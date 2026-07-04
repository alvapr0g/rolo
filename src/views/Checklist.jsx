import { useState } from 'react'
import Chip from '../components/Chip'

const ETIQUETAS = ['Pendiente', 'En práctica', 'Validada']

export default function Checklist({ checklist, onCiclar, irA }) {
  const [filtro, setFiltro] = useState('Todas')
  const pasa = (it) =>
    filtro === 'Todas' || (filtro === 'Pendientes' && it.estado === 0) || (filtro === 'Validadas' && it.estado === 2)
  return (
    <section aria-label="Checklist de requisitos para cinturón morado">
      <div className="miga">
        <button onClick={() => irA({ vista: 'progreso' })} aria-label="Volver a progreso">←</button>
        <h1 className="display" style={{ fontSize: 22 }}>Requisitos · Morado</h1>
      </div>
      <div className="grupo-chips" style={{ margin: '14px 0' }}>
        {['Todas', 'Pendientes', 'Validadas'].map((f) => (
          <Chip key={f} seleccionado={filtro === f} onClick={() => setFiltro(f)}>{f}</Chip>
        ))}
      </div>
      {checklist.map((sec, si) => {
        const items = sec.items.filter(pasa)
        if (!items.length) return null
        const ok = sec.items.filter((i) => i.estado === 2).length
        return (
          <div key={sec.seccion} style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            <div className="seccion-head">
              <span className="overline">{sec.seccion}</span>
              <span className="dato" style={{ fontSize: 12 }}>{ok}/{sec.items.length}</span>
            </div>
            {items.map((it) => (
              <button key={it.id} className="check-fila" onClick={() => onCiclar(si, it.id)}
                      aria-label={`${it.nombre}: ${ETIQUETAS[it.estado]}. Tocar para cambiar`}>
                <span className={`check-dot ${it.estado === 1 ? 'medio' : it.estado === 2 ? 'full' : ''}`} />
                <b>{it.nombre}</b>
                <em className={it.estado === 2 ? 'ok' : ''}>{ETIQUETAS[it.estado]}</em>
              </button>
            ))}
          </div>
        )
      })}
      <p style={{ fontSize: 11, color: 'var(--color-texto-secundario)' }}>
        ○ pendiente → ◐ en práctica → ● validada (la validación final la otorga tu instructor)
      </p>
    </section>
  )
}
