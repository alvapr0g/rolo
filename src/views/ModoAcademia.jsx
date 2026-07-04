import Chip from '../components/Chip'
import Tarjeta from '../components/Tarjeta'
import { useState } from 'react'
import { ESTUDIANTES } from '../data'

const COLOR = { blanco: 'var(--cinturon-blanco)', azul: 'var(--cinturon-azul)', morado: 'var(--cinturon-morado)', cafe: 'var(--cinturon-cafe)', negro: 'var(--cinturon-negro)' }

export default function ModoAcademia({ irA }) {
  const [filtro, setFiltro] = useState('Todos')
  const visibles = ESTUDIANTES.filter((e) => filtro === 'Todos' || e.cinturon === filtro.toLowerCase())
  return (
    <section aria-label="Modo academia">
      <div className="miga" style={{ justifyContent: 'space-between' }}>
        <div className="miga">
          <button onClick={() => irA({ vista: 'perfil' })} aria-label="Volver a perfil">←</button>
          <h1 className="display" style={{ fontSize: 22 }}>Academia Chiloé BJJ</h1>
        </div>
        <Chip seleccionado onClick={() => {}}>+ Clase</Chip>
      </div>
      <div className="grupo-chips" style={{ margin: '14px 0' }}>
        {['Todos', 'Blanco', 'Azul', 'Morado'].map((f) => (
          <Chip key={f} seleccionado={filtro === f} onClick={() => setFiltro(f)}>{f}</Chip>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {visibles.map((e) => (
          <div key={e.id} className="estudiante">
            <div className="fila">
              <span className="avatar" style={{ width: 34, height: 34 }} />
              <b style={{ flex: 1 }}>{e.nombre}</b>
              <span className="cint-dot" style={{ background: COLOR[e.cinturon], border: e.cinturon === 'blanco' ? '1px solid var(--color-borde-sutil)' : 'none' }}
                    role="img" aria-label={`Cinturón ${e.cinturon}`} />
              <span className="dato" style={{ fontSize: 12 }}>{e.grado}</span>
            </div>
            <div className="fila" style={{ fontSize: 11, color: 'var(--color-texto-secundario)' }}>
              Asistencia
              <span className="mini-barra"><span style={{ width: `${(e.asistencia / 5) * 100}%` }} /></span>
              <span className="dato" style={{ fontSize: 11 }}>{e.asistencia}/sem</span>
            </div>
            {e.alerta
              ? <span className="alerta-txt">⚠ {e.alerta}</span>
              : <div className="fila" style={{ justifyContent: 'space-between', fontSize: 12, color: 'var(--color-texto-secundario)' }}>
                  Checklist {e.checklist}% <button className="enlace">Validar ›</button>
                </div>}
          </div>
        ))}
      </div>
      <Tarjeta style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className="overline">Próxima clase</span><span className="dato" style={{ fontSize: 12 }}>jue 19:00</span>
        </div>
        <strong>Plan: Butterfly ▸ wrestle up ▸ double leg smash</strong>
        <button className="enlace" style={{ alignSelf: 'flex-start' }}>Editar plan ›</button>
      </Tarjeta>
    </section>
  )
}
