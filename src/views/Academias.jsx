import { useMemo, useRef, useState } from 'react'
import Chip from '../components/Chip'
import { ACADEMIAS } from '../data'

const D = Math.PI / 180
function proyectar(lat, lon, rot, R) {
  const f = lat * D, l = lon * D, f0 = rot.phi * D, l0 = rot.lam * D
  const cosc = Math.sin(f0) * Math.sin(f) + Math.cos(f0) * Math.cos(f) * Math.cos(l - l0)
  const x = R * Math.cos(f) * Math.sin(l - l0)
  const y = R * (Math.cos(f0) * Math.sin(f) - Math.sin(f0) * Math.cos(f) * Math.cos(l - l0))
  return { x, y: -y, visible: cosc > 0 }
}
function trazo(puntos, rot, R) {
  let d = '', dib = false
  for (const [lat, lon] of puntos) {
    const p = proyectar(lat, lon, rot, R)
    if (p.visible) { d += `${dib ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)} `; dib = true }
    else dib = false
  }
  return d
}

export default function Academias({ irA }) {
  const [rot, setRot] = useState({ lam: -75, phi: -10 })
  const [sel, setSel] = useState('atos')
  const [filtros, setFiltros] = useState(['Visitantes'])
  const [busca, setBusca] = useState('')
  const [zona, setZona] = useState(false)
  const arrastre = useRef(null)
  const R = 140

  const graticule = useMemo(() => {
    const lineas = []
    for (let lon = -180; lon < 180; lon += 30)
      lineas.push(Array.from({ length: 37 }, (_, i) => [-90 + i * 5, lon]))
    for (let lat = -60; lat <= 60; lat += 30)
      lineas.push(Array.from({ length: 73 }, (_, i) => [lat, -180 + i * 5]))
    return lineas
  }, [])

  const alternarFiltro = (f) =>
    setFiltros((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))

  const visiblesEnGlobo = (a) => proyectar(a.lat, a.lon, rot, R).visible
  const resultados = ACADEMIAS.filter((a) => {
    const texto = (a.nombre + a.ciudad + a.pais).toLowerCase().includes(busca.toLowerCase())
    const tags = filtros.every((f) => a.tags.includes(f)) || filtros.length === 0
    const enZona = !zona || visiblesEnGlobo(a)
    return texto && tags && enZona
  })

  const empezar = (e) => { arrastre.current = { x: e.clientX, y: e.clientY, rot: { ...rot } }; e.target.setPointerCapture?.(e.pointerId) }
  const mover = (e) => {
    if (!arrastre.current) return
    const dx = e.clientX - arrastre.current.x, dy = e.clientY - arrastre.current.y
    setRot({
      lam: arrastre.current.rot.lam - dx * 0.45,
      phi: Math.max(-80, Math.min(80, arrastre.current.rot.phi + dy * 0.45)),
    })
  }
  const soltar = () => { arrastre.current = null }

  const seleccionar = (a) => {
    setSel(a.id)
    setRot({ lam: a.lon, phi: a.lat })
  }

  return (
    <section aria-label="Buscador de academias">
      <div className="encabezado"><h1>Academias</h1><span style={{ color: 'var(--color-acento-grado)' }}>⌖</span></div>
      <div className="academias-layout" style={{ marginTop: 14 }}>
        <div className="academias-panel">
          <input className="campo" placeholder="🔍  Ciudad, país o academia…" value={busca}
                 onChange={(e) => setBusca(e.target.value)} aria-label="Buscar academias" />
          <div className="grupo-chips">
            {['Gi', 'No-Gi', 'Visitantes'].map((f) => (
              <Chip key={f} seleccionado={filtros.includes(f)} onClick={() => alternarFiltro(f)}>{f}</Chip>
            ))}
          </div>
          <span className="overline">{zona ? 'En la zona visible' : 'Todas'} · {resultados.length} academias</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {resultados.map((a) => (
              <button key={a.id} className={`acad-card ${sel === a.id ? 'activa' : ''}`} onClick={() => seleccionar(a)}>
                <span className="fila"><b>{a.nombre}</b><span className="dist">{a.id === 'chiloe' ? '🏠' : '—'}</span></span>
                <span className="fila"><small>{a.ciudad}, {a.pais}</small><small>{a.tags.join(' · ')}</small></span>
              </button>
            ))}
            {resultados.length === 0 && (
              <p className="tip">No hay academias en esta zona del globo todavía — gira el planeta o <button className="enlace" onClick={() => setZona(false)}>ver todas</button>.</p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="globo-wrap">
            <svg className="globo-svg" width="320" height="320" viewBox="-160 -160 320 320"
                 onPointerDown={empezar} onPointerMove={mover} onPointerUp={soltar} onPointerLeave={soltar}
                 role="img" aria-label="Globo terráqueo con academias marcadas. La lista de resultados es la alternativa accesible.">
              <circle r={R + 8} fill="none" stroke="var(--color-acento-grado)" strokeWidth="1.5" opacity="0.25" />
              <circle r={R} fill="var(--color-fondo-superficie)" />
              {graticule.map((linea, k) => (
                <path key={k} d={trazo(linea, rot, R)} fill="none" stroke="var(--color-texto-secundario)" strokeWidth="1" opacity="0.32" />
              ))}
              <circle r={R} fill="none" stroke="var(--color-texto-secundario)" strokeWidth="1.5" opacity="0.6" />
              {ACADEMIAS.map((a) => {
                const p = proyectar(a.lat, a.lon, rot, R)
                if (!p.visible) return null
                const activa = a.id === sel
                return (
                  <g key={a.id} onClick={() => setSel(a.id)} style={{ cursor: 'pointer' }}>
                    {activa && <circle cx={p.x} cy={p.y} r="12" fill="none" stroke="var(--color-acento-grado)" strokeWidth="1.5" opacity="0.6" />}
                    <circle cx={p.x} cy={p.y} r="5.5" fill="var(--color-acento-grado)" />
                    {activa && (
                      <g>
                        <rect x={p.x - 8} y={p.y - 34} width={a.nombre.length * 6.4 + 16} height="20" rx="8" fill="var(--color-acento-grado)" />
                        <text x={p.x} y={p.y - 20} fill="var(--color-texto-inverso)" style={{ font: '600 11px Inter' }}>{a.nombre}</text>
                      </g>
                    )}
                  </g>
                )
              })}
            </svg>
            <div className="globo-hint"><small>VISTA ORTOGRÁFICA 3D</small><span>Arrastra para rotar</span></div>
          </div>
          <button className="cta-zona" onClick={() => setZona((z) => !z)} aria-pressed={zona}>
            ⌖ {zona ? 'Mostrando esta zona · ver todas' : 'Buscar academias en esta zona del globo'}
          </button>
        </div>
      </div>
    </section>
  )
}
