import { useState } from 'react'
import Chip from '../components/Chip'
import PuntosDominio from '../components/PuntosDominio'
import { CATEGORIAS, TECNICAS } from '../data'

export default function ListaTecnicas({ cat, dominio, irA }) {
  const categoria = CATEGORIAS.find((c) => c.id === cat)
  const tecnicas = TECNICAS.filter((t) => t.cat === cat)
  const mecanicas = ['Todas', ...new Set(tecnicas.map((t) => t.mecanica))]
  const [filtro, setFiltro] = useState('Todas')
  const visibles = filtro === 'Todas' ? tecnicas : tecnicas.filter((t) => t.mecanica === filtro)
  return (
    <section aria-label={`Técnicas de ${categoria.nombre}`}>
      <div className="miga">
        <button onClick={() => irA({ vista: 'biblioteca' })} aria-label="Volver a biblioteca">←</button>
        <h1 className="display" style={{ fontSize: 22 }}>{categoria.nombre}</h1>
      </div>
      <div className="grupo-chips" style={{ margin: '14px 0' }}>
        {mecanicas.map((m) => (
          <Chip key={m} seleccionado={filtro === m} onClick={() => setFiltro(m)}>{m}</Chip>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {visibles.map((t) => (
          <button key={t.id} className="fila-tec" onClick={() => irA({ vista: 'tecnica', id: t.id })}>
            <b>{t.nombre}</b>
            <span className="der"><PuntosDominio nivel={dominio[t.id] || 0} /> ›</span>
          </button>
        ))}
      </div>
      {cat === 'depie' && <p className="tip" style={{ marginTop: 14 }}>💡 Encadena con single leg si el uchimata falla</p>}
      {cat === 'leglocks' && <p className="tip" style={{ marginTop: 14 }}>⚠ Heel hooks ocultos para cinturón blanco según reglas IBJJF</p>}
    </section>
  )
}
