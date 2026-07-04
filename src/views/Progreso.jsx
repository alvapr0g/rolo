import Tarjeta from '../components/Tarjeta'
import Cinturon from '../components/Cinturon'
import AnilloProgreso from '../components/AnilloProgreso'

export default function Progreso({ irA }) {
  return (
    <section aria-label="Progreso de cinturón">
      <div className="encabezado"><h1>Progreso</h1><div className="avatar" aria-hidden="true" /></div>
      <div className="grid-cards" style={{ marginTop: 16 }}>
        <Tarjeta ancha>
          <Cinturon color="azul" grados={2} etiqueta="Cinturón azul, segundo grado" />
          <strong>Cinturón azul · 2° grado</strong>
          <span style={{ color: 'var(--color-texto-secundario)', fontSize: 13 }}>En este cinturón: 1 año y 4 meses</span>
        </Tarjeta>
        <Tarjeta ancha>
          <span className="overline">Hacia cinturón morado</span>
          <div className="anillo-wrap">
            <AnilloProgreso valor={64} etiqueta="Progreso hacia cinturón morado" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="requisito ok"><b>✓</b> 120 sesiones registradas (128/120)</div>
              <button className="requisito ok" style={{ background: 'none' }} onClick={() => irA({ vista: 'checklist' })}><b>◐</b> Checklist técnico · 18 de 28 ›</button>
              <div className="requisito pend"><b>○</b> Validación de instructor</div>
            </div>
          </div>
        </Tarjeta>
      </div>
    </section>
  )
}
