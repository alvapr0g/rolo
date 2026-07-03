// Navegación: sidebar en web (≥1024px) y BottomNav en app — espejo del componente Figma "BottomNav"
const ITEMS = [
  { id: 'inicio', etiqueta: 'Inicio' },
  { id: 'biblioteca', etiqueta: 'Biblioteca' },
  { id: 'progreso', etiqueta: 'Progreso' },
]

export function Sidebar({ vista, onNavegar, onRegistrar, tema, onTema }) {
  return (
    <nav className="sidebar" aria-label="Navegación principal">
      <div className="logo">ROLO</div>
      {ITEMS.slice(0, 2).map((it) => (
        <button key={it.id} className="nav-item" aria-current={vista === it.id ? 'page' : undefined} onClick={() => onNavegar(it.id)}>
          <span className="icono" />{it.etiqueta}
        </button>
      ))}
      <button className="nav-item" onClick={onRegistrar}><span className="icono" />Registrar sesión</button>
      <button className="nav-item" aria-current={vista === 'progreso' ? 'page' : undefined} onClick={() => onNavegar('progreso')}>
        <span className="icono" />Progreso
      </button>
      <div className="empuje" />
      <button className="nav-item" onClick={onTema}><span className="icono" />{tema === 'oscuro' ? 'Modo claro' : 'Modo oscuro'}</button>
    </nav>
  )
}

export function BottomNav({ vista, onNavegar, onRegistrar, onTema }) {
  return (
    <nav className="bottomnav" aria-label="Navegación inferior">
      <button className="tab" aria-current={vista === 'inicio' ? 'page' : undefined} onClick={() => onNavegar('inicio')}>
        <span className="icono" />Inicio
      </button>
      <button className="tab" aria-current={vista === 'biblioteca' ? 'page' : undefined} onClick={() => onNavegar('biblioteca')}>
        <span className="icono" />Biblioteca
      </button>
      <button className="tab-registrar" onClick={onRegistrar} aria-label="Registrar sesión">+</button>
      <button className="tab" aria-current={vista === 'progreso' ? 'page' : undefined} onClick={() => onNavegar('progreso')}>
        <span className="icono" />Progreso
      </button>
      <button className="tab" onClick={onTema}><span className="icono" />Tema</button>
    </nav>
  )
}
