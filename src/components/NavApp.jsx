// Navegación: sidebar en web (≥1024px) y BottomNav en app — espejo del componente Figma "BottomNav"
const raiz = { inicio: 'inicio', biblioteca: 'biblioteca', lista: 'biblioteca', tecnica: 'biblioteca', flujo: 'biblioteca', progreso: 'progreso', checklist: 'progreso', resumen: 'inicio', academias: 'academias', perfil: 'perfil', academia: 'perfil' }

export function Sidebar({ ruta, irA, onRegistrar }) {
  const activo = raiz[ruta.vista]
  const item = (id, etiqueta, onClick) => (
    <button className="nav-item" aria-current={activo === id ? 'page' : undefined} onClick={onClick}>
      <span className="icono" />{etiqueta}
    </button>
  )
  return (
    <nav className="sidebar" aria-label="Navegación principal">
      <div className="logo">ROLO</div>
      {item('inicio', 'Inicio', () => irA({ vista: 'inicio' }))}
      {item('biblioteca', 'Biblioteca', () => irA({ vista: 'biblioteca' }))}
      <button className="nav-item" onClick={onRegistrar}><span className="icono" />Registrar sesión</button>
      {item('academias', 'Academias', () => irA({ vista: 'academias' }))}
      {item('progreso', 'Progreso', () => irA({ vista: 'progreso' }))}
      <div className="empuje" />
      {item('perfil', 'Perfil', () => irA({ vista: 'perfil' }))}
    </nav>
  )
}

export function BottomNav({ ruta, irA, onRegistrar }) {
  const activo = raiz[ruta.vista]
  const tab = (id, etiqueta, onClick) => (
    <button className="tab" aria-current={activo === id ? 'page' : undefined} onClick={onClick}>
      <span className="icono" />{etiqueta}
    </button>
  )
  return (
    <nav className="bottomnav" aria-label="Navegación inferior">
      {tab('inicio', 'Inicio', () => irA({ vista: 'inicio' }))}
      {tab('biblioteca', 'Biblioteca', () => irA({ vista: 'biblioteca' }))}
      <button className="tab-registrar" onClick={onRegistrar} aria-label="Registrar sesión">+</button>
      {tab('progreso', 'Progreso', () => irA({ vista: 'progreso' }))}
      {tab('perfil', 'Perfil', () => irA({ vista: 'perfil' }))}
    </nav>
  )
}
