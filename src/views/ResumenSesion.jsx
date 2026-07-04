import Tarjeta from '../components/Tarjeta'
import Chip from '../components/Chip'
import BarraProgreso from '../components/BarraProgreso'
import Boton from '../components/Boton'

export default function ResumenSesion({ sesion, irA }) {
  const s = sesion || { tipo: 'Rolling', duracion: 90, tecnicas: ['Z guard', 'Scissor sweep'], rpe: 7, fecha: 'ayer' }
  const frecuencia = [['Z guard', 8], ['Scissor sweep', 4], ['Uchimata', 2]]
  return (
    <section aria-label="Resumen de sesión">
      <div className="miga">
        <button onClick={() => irA({ vista: 'inicio' })} aria-label="Volver a inicio">←</button>
        <h1 className="display" style={{ fontSize: 22 }}>Sesión · {s.fecha}</h1>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
        <span style={{ color: 'var(--color-acento-grado)', fontWeight: 600 }}>
          {s.tipo} · {s.duracion} min · RPE {s.rpe}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--color-texto-secundario)' }}>
          Con <span className="avatar" style={{ width: 26, height: 26 }} /> Nico
          <span className="avatar" style={{ width: 26, height: 26 }} /> Vale
        </div>
        <Tarjeta>
          <span className="overline">Técnicas de hoy</span>
          <div className="grupo-chips">{s.tecnicas.map((t) => <Chip key={t}>{t}</Chip>)}</div>
        </Tarjeta>
        <Tarjeta>
          <span className="overline">Frecuencia · últimos 30 días</span>
          {frecuencia.map(([n, v]) => (
            <div className="hbar" key={n}>
              <b>{n}</b>
              <BarraProgreso valor={(v / 8) * 100} etiqueta={`${n}: ${v} sesiones`} />
              <em>{v}</em>
            </div>
          ))}
        </Tarjeta>
        <Tarjeta>
          <span className="overline">Este mes</span>
          <strong>14 sesiones · 21 h en el tatami</strong>
          <BarraProgreso valor={60} etiqueta="Distribución de tipos de sesión" />
          <small style={{ color: 'var(--color-texto-secundario)' }}>Rolling 60% · Clase 30% · Drilling 10%</small>
        </Tarjeta>
        <div className="acciones">
          <Boton estilo="secundario">Editar sesión</Boton>
          <Boton estilo="primario">Compartir tarjeta</Boton>
        </div>
      </div>
    </section>
  )
}
