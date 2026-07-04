import Tarjeta from '../components/Tarjeta'
import Chip from '../components/Chip'
import BarraProgreso from '../components/BarraProgreso'

const DIAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']

export default function Inicio({ racha, reciente, irA }) {
  const total = racha.reduce((a, b) => a + b, 0)
  return (
    <section aria-label="Inicio">
      <div className="encabezado"><h1>Oss, Camila</h1><div className="avatar" aria-hidden="true" /></div>
      <div className="grid-cards" style={{ marginTop: 16 }}>
        <Tarjeta ancha>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="overline">Racha semanal</span>
            <span className="dato">{total} días</span>
          </div>
          <div className="racha-dias">
            {DIAS.map((d, i) => (
              <div key={d} className="racha-dia">
                <span>{d}</span>
                <span className={`punto ${racha[i] ? 'hecho' : ''} ${reciente === i ? 'recien' : ''}`} />
              </div>
            ))}
          </div>
        </Tarjeta>

        <Tarjeta>
          <span className="overline">Última sesión · ayer</span>
          <strong>Rolling · 90 min · RPE 7</strong>
          <div className="grupo-chips"><Chip>Z guard</Chip><Chip>Scissor sweep</Chip></div>
          <button className="enlace" style={{ alignSelf: 'flex-start' }} onClick={() => irA({ vista: 'resumen' })}>Ver resumen →</button>
        </Tarjeta>

        <Tarjeta>
          <span className="overline">Técnica del día</span>
          <strong className="display" style={{ fontSize: 22 }}>Uchimata</strong>
          <span style={{ color: 'var(--color-texto-secundario)', fontSize: 12 }}>Judo · proyección de cadera</span>
          <button className="enlace" style={{ alignSelf: 'flex-start' }} onClick={() => irA({ vista: 'tecnica', id: 'uchimata' })}>Repasar →</button>
        </Tarjeta>

        <Tarjeta>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="overline">Hacia cinturón azul</span><span className="dato">64%</span>
          </div>
          <BarraProgreso valor={64} etiqueta="Progreso hacia cinturón azul" />
          <button className="enlace" onClick={() => irA({ vista: 'checklist' })} style={{ alignSelf: 'flex-start' }}>Ver requisitos →</button>
        </Tarjeta>

        <Tarjeta ancha>
          <span className="overline">Frecuencia · últimos 30 días</span>
          {[['Z guard', 8], ['Scissor sweep', 4], ['Uchimata', 2]].map(([n, v]) => (
            <div className="hbar" key={n}>
              <b>{n}</b>
              <BarraProgreso valor={(v / 8) * 100} etiqueta={`${n}: ${v} sesiones`} />
              <em>{v}</em>
            </div>
          ))}
        </Tarjeta>
      </div>
    </section>
  )
}
