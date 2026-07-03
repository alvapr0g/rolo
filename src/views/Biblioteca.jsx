import { useState } from 'react'
import Chip from '../components/Chip'

const CATEGORIAS = [
  { n: 'De pie', d: 'Stójka · wrestling · judo', c: 12 },
  { n: 'Pases', d: 'Gi · No-Gi · defensa de leg locks', c: 8 },
  { n: 'Guardia', d: 'Cerrada · lasso · butterfly', c: 15 },
  { n: 'Bottom work', d: 'Połówka · Z guard · DLR · single X', c: 11 },
  { n: 'Leg locks', d: 'Ataque y defensa · ⚠ heel hooks ocultos para cinturón blanco', c: 9, ancha: true },
]

export default function Biblioteca() {
  const [eje, setEje] = useState('posicion')
  return (
    <section aria-label="Biblioteca de técnicas">
      <div className="encabezado"><h1>Biblioteca</h1><div className="avatar" aria-hidden="true" /></div>
      <div className="grupo-chips" style={{ margin: '16px 0' }}>
        <Chip seleccionado={eje === 'posicion'} onClick={() => setEje('posicion')}>Por posición</Chip>
        <Chip seleccionado={eje === 'sumision'} onClick={() => setEje('sumision')}>Por sumisión</Chip>
      </div>
      <div className="grid-cat">
        {CATEGORIAS.map((cat) => (
          <button key={cat.n} className={cat.ancha ? 'cat cat--ancha' : 'cat'}>
            <h3>{cat.n}</h3><p>{cat.d}</p><em>{cat.c} técnicas</em>
          </button>
        ))}
      </div>
    </section>
  )
}
