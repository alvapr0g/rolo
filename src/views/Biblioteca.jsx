import { useState } from 'react'
import Chip from '../components/Chip'
import { CATEGORIAS, TECNICAS } from '../data'

export default function Biblioteca({ irA }) {
  const [eje, setEje] = useState('posicion')
  const cuenta = (cat) => TECNICAS.filter((t) => t.cat === cat).length
  return (
    <section aria-label="Biblioteca de técnicas">
      <div className="encabezado"><h1>Biblioteca</h1><div className="avatar" aria-hidden="true" /></div>
      <div className="grupo-chips" style={{ margin: '16px 0' }}>
        <Chip seleccionado={eje === 'posicion'} onClick={() => setEje('posicion')}>Por posición</Chip>
        <Chip seleccionado={eje === 'sumision'} onClick={() => setEje('sumision')}>Por sumisión</Chip>
      </div>
      <div className="grid-cat">
        {CATEGORIAS.map((cat) => (
          <button key={cat.id} className={cat.ancha ? 'cat cat--ancha' : 'cat'} onClick={() => irA({ vista: 'lista', cat: cat.id })}>
            <h3>{cat.nombre}</h3><p>{cat.sub}</p><em>{cuenta(cat.id)} técnicas</em>
          </button>
        ))}
      </div>
    </section>
  )
}
