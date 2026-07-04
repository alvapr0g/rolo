import { useState } from 'react'
import Login from './views/Login'
import Inicio from './views/Inicio'
import Biblioteca from './views/Biblioteca'
import ListaTecnicas from './views/ListaTecnicas'
import DetalleTecnica from './views/DetalleTecnica'
import FlujoTecnicas from './views/FlujoTecnicas'
import ResumenSesion from './views/ResumenSesion'
import Progreso from './views/Progreso'
import Checklist from './views/Checklist'
import Academias from './views/Academias'
import ModoAcademia from './views/ModoAcademia'
import Perfil from './views/Perfil'
import { Sidebar, BottomNav } from './components/NavApp'
import SheetRegistro from './components/SheetRegistro'
import Toast from './components/Toast'
import { CHECKLIST, DOMINIO_INICIAL } from './data'

const HOY = 5 // sábado de ejemplo, aún sin entrenar

export default function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false)
  const [ruta, setRuta] = useState({ vista: 'inicio' })
  const [tema, setTema] = useState('oscuro')
  const [racha, setRacha] = useState([1, 1, 0, 1, 1, 0, 0])
  const [reciente, setReciente] = useState(null)
  const [sheetAbierto, setSheetAbierto] = useState(false)
  const [toast, setToast] = useState('')
  const [dominio, setDominio] = useState(DOMINIO_INICIAL)
  const [checklist, setChecklist] = useState(CHECKLIST)
  const [ultimaSesion, setUltimaSesion] = useState(null)

  const irA = (r) => { setRuta(r); window.scrollTo({ top: 0 }) }

  const alternarTema = () => {
    const nuevo = tema === 'oscuro' ? 'claro' : 'oscuro'
    setTema(nuevo)
    document.documentElement.dataset.theme = nuevo
  }

  const avisar = (msj) => { setToast(msj); setTimeout(() => setToast(''), 2200) }

  const guardarSesion = (datos) => {
    setSheetAbierto(false)
    setUltimaSesion({ ...datos, rpe: 7, fecha: 'hoy' })
    if (!racha[HOY]) {
      setRacha((r) => r.map((v, i) => (i === HOY ? 1 : v)))
      setReciente(HOY)
    }
    avisar('Sesión guardada')
  }

  const ciclarDominio = (id) => {
    setDominio((d) => ({ ...d, [id]: ((d[id] || 0) + 1) % 4 }))
    avisar('Dominio actualizado')
  }

  const ciclarChecklist = (si, id) => {
    setChecklist((cl) => cl.map((sec, k) => k !== si ? sec : {
      ...sec,
      items: sec.items.map((it) => it.id !== id ? it : { ...it, estado: it.estado === 2 ? 2 : it.estado === 0 ? 1 : 0 }),
    }))
  }

  if (!sesionIniciada) return <Login onEntrar={() => setSesionIniciada(true)} />

  const vistas = {
    inicio: <Inicio racha={racha} reciente={reciente} irA={irA} />,
    biblioteca: <Biblioteca irA={irA} />,
    lista: <ListaTecnicas cat={ruta.cat} dominio={dominio} irA={irA} />,
    tecnica: <DetalleTecnica id={ruta.id} dominio={dominio} onDominio={ciclarDominio} irA={irA} />,
    flujo: <FlujoTecnicas irA={irA} />,
    resumen: <ResumenSesion sesion={ultimaSesion} irA={irA} />,
    progreso: <Progreso irA={irA} />,
    checklist: <Checklist checklist={checklist} onCiclar={ciclarChecklist} irA={irA} />,
    academias: <Academias irA={irA} />,
    academia: <ModoAcademia irA={irA} />,
    perfil: <Perfil tema={tema} onTema={alternarTema} irA={irA} />,
  }

  return (
    <div className="app">
      <Sidebar ruta={ruta} irA={irA} onRegistrar={() => setSheetAbierto(true)} />
      <main className="main">{vistas[ruta.vista] || vistas.inicio}</main>
      <BottomNav ruta={ruta} irA={irA} onRegistrar={() => setSheetAbierto(true)} />
      <SheetRegistro abierto={sheetAbierto} onCerrar={() => setSheetAbierto(false)} onGuardar={guardarSesion} />
      <Toast visible={!!toast}>{toast}</Toast>
    </div>
  )
}
