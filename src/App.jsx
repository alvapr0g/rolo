import { useState } from 'react'
import Login from './views/Login'
import Inicio from './views/Inicio'
import Biblioteca from './views/Biblioteca'
import Progreso from './views/Progreso'
import { Sidebar, BottomNav } from './components/NavApp'
import SheetRegistro from './components/SheetRegistro'
import Toast from './components/Toast'

const HOY = 5 // sábado de ejemplo, aún sin entrenar

export default function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false)
  const [vista, setVista] = useState('inicio')
  const [tema, setTema] = useState('oscuro')
  const [racha, setRacha] = useState([1, 1, 0, 1, 1, 0, 0])
  const [reciente, setReciente] = useState(null)
  const [sheetAbierto, setSheetAbierto] = useState(false)
  const [toast, setToast] = useState(false)

  const alternarTema = () => {
    const nuevo = tema === 'oscuro' ? 'claro' : 'oscuro'
    setTema(nuevo)
    document.documentElement.dataset.theme = nuevo
  }

  const navegar = (v) => { setVista(v); window.scrollTo({ top: 0 }) }

  const guardarSesion = () => {
    setSheetAbierto(false)
    if (!racha[HOY]) {
      setRacha((r) => r.map((v, i) => (i === HOY ? 1 : v)))
      setReciente(HOY)
    }
    setToast(true)
    setTimeout(() => setToast(false), 2200)
  }

  if (!sesionIniciada) return <Login onEntrar={() => setSesionIniciada(true)} />

  return (
    <div className="app">
      <Sidebar vista={vista} onNavegar={navegar} onRegistrar={() => setSheetAbierto(true)} tema={tema} onTema={alternarTema} />
      <main className="main">
        {vista === 'inicio' && <Inicio racha={racha} reciente={reciente} onIrProgreso={() => navegar('progreso')} />}
        {vista === 'biblioteca' && <Biblioteca />}
        {vista === 'progreso' && <Progreso />}
      </main>
      <BottomNav vista={vista} onNavegar={navegar} onRegistrar={() => setSheetAbierto(true)} onTema={alternarTema} />
      <SheetRegistro abierto={sheetAbierto} onCerrar={() => setSheetAbierto(false)} onGuardar={guardarSesion} />
      <Toast visible={toast}>Sesión guardada</Toast>
    </div>
  )
}
