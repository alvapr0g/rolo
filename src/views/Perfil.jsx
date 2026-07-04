import Cinturon from '../components/Cinturon'

export default function Perfil({ tema, onTema, irA }) {
  return (
    <section aria-label="Perfil">
      <div className="perfil-head">
        <span className="avatar" aria-hidden="true" />
        <div>
          <h1 className="display" style={{ fontSize: 24 }}>Camila R.</h1>
          <small style={{ color: 'var(--color-texto-secundario)' }}>Chiloé BJJ · miembro desde 2024</small>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
        <Cinturon color="azul" grados={2} etiqueta="Cinturón azul, segundo grado" />
        <button className="item-lista" onClick={() => irA({ vista: 'academias' })}>Buscar academias en el mundo <span>⌖</span></button>
        <button className="item-lista" onClick={() => irA({ vista: 'academia' })}>Modo Academia (instructor) <span>›</span></button>
        <button className="item-lista" onClick={() => irA({ vista: 'checklist' })}>Mi checklist de dominio <span>›</span></button>
        <button className="item-lista" onClick={onTema}>{tema === 'oscuro' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} <span>◐</span></button>
        <button className="item-lista" style={{ color: 'var(--color-estado-alerta)' }}>Cerrar sesión <span>→</span></button>
      </div>
    </section>
  )
}
