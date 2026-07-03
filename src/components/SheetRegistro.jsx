import { useEffect, useRef, useState } from 'react'
import Boton from './Boton'
import Chip from './Chip'

const TIPOS = ['Drilling', 'Rolling', 'Clase']
const TECNICAS = ['Z guard', 'Scissor sweep', 'DLR', 'Triangle', 'Uchimata']

export default function SheetRegistro({ abierto, onCerrar, onGuardar }) {
  const [tipo, setTipo] = useState('Rolling')
  const [duracion, setDuracion] = useState(60)
  const [tecnicas, setTecnicas] = useState(['Z guard', 'Scissor sweep'])
  const dialogo = useRef(null)

  useEffect(() => {
    if (abierto) dialogo.current?.focus()
    const esc = (e) => { if (e.key === 'Escape' && abierto) onCerrar() }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [abierto, onCerrar])

  const alternarTecnica = (t) =>
    setTecnicas((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  return (
    <>
      <div className={abierto ? 'sheet-fondo abierta' : 'sheet-fondo'} onClick={onCerrar} />
      <div ref={dialogo} tabIndex={-1} className={abierto ? 'sheet abierta' : 'sheet'} role="dialog" aria-modal="true" aria-labelledby="titulo-registro" aria-hidden={!abierto}>
        <div className="asa" aria-hidden="true" />
        <h2 id="titulo-registro">Registrar sesión</h2>

        <span className="overline">Tipo de sesión</span>
        <div className="grupo-chips">
          {TIPOS.map((t) => (
            <Chip key={t} seleccionado={tipo === t} onClick={() => setTipo(t)}>{t}</Chip>
          ))}
        </div>

        <span className="overline">Duración</span>
        <div className="stepper">
          <button onClick={() => setDuracion((d) => Math.max(15, d - 15))} aria-label="Restar 15 minutos">−</button>
          <output>{duracion} min</output>
          <button onClick={() => setDuracion((d) => Math.min(240, d + 15))} aria-label="Sumar 15 minutos">+</button>
        </div>

        <span className="overline">Técnicas practicadas</span>
        <div className="grupo-chips">
          {TECNICAS.map((t) => (
            <Chip key={t} seleccionado={tecnicas.includes(t)} onClick={() => alternarTecnica(t)}>{t}</Chip>
          ))}
        </div>

        <Boton estilo="primario" onClick={() => onGuardar({ tipo, duracion, tecnicas })}>Guardar sesión</Boton>
        <button className="enlace" onClick={onCerrar} style={{ alignSelf: 'center' }}>Cancelar</button>
      </div>
    </>
  )
}
