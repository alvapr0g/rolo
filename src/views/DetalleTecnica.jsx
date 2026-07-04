import { useState } from 'react'
import Chip from '../components/Chip'
import Boton from '../components/Boton'
import { TECNICAS, NODOS_EXTRA } from '../data'

const nombreDe = (id) => TECNICAS.find((t) => t.id === id)?.nombre || NODOS_EXTRA.find((n) => n.id === id)?.nombre || id

export default function DetalleTecnica({ id, dominio, onDominio, irA }) {
  const t = TECNICAS.find((x) => x.id === id)
  const [paso, setPaso] = useState(0)
  if (!t) return null
  const nivel = dominio[t.id] || 0
  const etiquetas = ['Sin empezar', 'Iniciada', 'En práctica', 'Dominada ✓']
  return (
    <section aria-label={`Técnica ${t.nombre}`}>
      <div className="miga" style={{ justifyContent: 'space-between' }}>
        <div className="miga">
          <button onClick={() => irA({ vista: 'lista', cat: t.cat })} aria-label="Volver a la lista">←</button>
          <h1 className="display" style={{ fontSize: 24 }}>{t.nombre}</h1>
        </div>
        <span style={{ color: 'var(--color-texto-secundario)' }}>♡ 📌</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
        <div className="video-ph" role="img" aria-label={`Video de ${t.nombre}`}><i>▶</i></div>
        <span style={{ color: 'var(--color-texto-secundario)', fontSize: 13 }}>
          {t.familia} · mecánica de {t.mecanica.toLowerCase()}
        </span>

        <span className="overline">Prerrequisitos</span>
        <div className="grupo-chips">
          {t.prereq.length === 0 && <small style={{ color: 'var(--color-texto-secundario)' }}>Sin prerrequisitos</small>}
          {t.prereq.map((p) => {
            const tec = TECNICAS.find((x) => x.id === p)
            const ok = tec ? (dominio[p] || 0) >= 2 : true
            return (
              <Chip key={p} seleccionado={ok} onClick={tec ? () => irA({ vista: 'tecnica', id: p }) : undefined}>
                {tec ? tec.nombre : p} {ok ? '✓' : '✗'}
              </Chip>
            )
          })}
        </div>

        <div className="tarjeta">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="overline">Paso a paso</span>
            <span className="dato">{paso + 1} / {t.pasos.length}</span>
          </div>
          <p style={{ fontSize: 14 }}>{t.pasos[paso]}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="paso-dots">
              {t.pasos.map((_, k) => <i key={k} className={k === paso ? 'activo' : ''} />)}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="enlace" onClick={() => setPaso((p) => Math.max(0, p - 1))} disabled={paso === 0}>← Ant.</button>
              <button className="enlace" onClick={() => setPaso((p) => Math.min(t.pasos.length - 1, p + 1))} disabled={paso === t.pasos.length - 1}>Sig. →</button>
            </div>
          </div>
        </div>

        <div className="dos-col">
          <div className="tarjeta">
            <span className="overline">Encadena con</span>
            {t.encadena.length === 0 && <small style={{ color: 'var(--color-texto-secundario)' }}>—</small>}
            {t.encadena.map((e) => {
              const existe = TECNICAS.some((x) => x.id === e)
              return existe
                ? <button key={e} className="enlace" style={{ textAlign: 'left' }} onClick={() => irA({ vista: 'tecnica', id: e })}>▸ {nombreDe(e)}</button>
                : <span key={e} style={{ fontSize: 13 }}>▸ {nombreDe(e)}</span>
            })}
          </div>
          <div className="tarjeta">
            <span className="overline">Contras</span>
            {t.contras.length === 0 && <small style={{ color: 'var(--color-texto-secundario)' }}>—</small>}
            {t.contras.map((c) => {
              const existe = TECNICAS.some((x) => x.id === c)
              return existe
                ? <button key={c} className="enlace" style={{ textAlign: 'left' }} onClick={() => irA({ vista: 'tecnica', id: c })}>▸ {nombreDe(c)}</button>
                : <span key={c} style={{ fontSize: 13 }}>▸ {c}</span>
            })}
          </div>
        </div>

        <div className="acciones">
          <Boton estilo="secundario" onClick={() => irA({ vista: 'flujo', id: t.id })}>Ver en flujo</Boton>
          <Boton estilo="primario" onClick={() => onDominio(t.id)}>{etiquetas[nivel]} · marcar</Boton>
        </div>
      </div>
    </section>
  )
}
