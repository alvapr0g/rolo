import Boton from '../components/Boton'
import Input from '../components/Input'

const CINTURONES = ['blanco', 'azul', 'morado', 'cafe', 'negro']
const CaminoCinturones = () => (
  <div className="camino-cinturones" aria-hidden="true">
    {CINTURONES.map((c) => (
      <i key={c} style={{ background: `var(--cinturon-${c})`, border: c === 'negro' ? '1px solid var(--color-borde-sutil)' : 'none' }} />
    ))}
  </div>
)

export default function Login({ onEntrar }) {
  return (
    <section className="login" aria-label="Iniciar sesión">
      <div className="login-marca">
        <div className="marca-linea" style={{ width: 72, height: 7 }} />
        <div className="logo">ROLO</div>
        <p className="tagline">Registra. Aprende. Progresa.</p>
        <CaminoCinturones />
        <p style={{ color: 'var(--color-texto-secundario)', fontSize: 13, maxWidth: 320, textAlign: 'center' }}>
          "El cinturón solo cubre dos centímetros de tu espalda."
        </p>
      </div>
      <div className="login-panel">
        <form className="login-card" onSubmit={(e) => { e.preventDefault(); onEntrar() }}>
          <div className="marca-linea" style={{ margin: '0 auto' }} />
          <div className="logo">ROLO</div>
          <p className="tagline">Registra. Aprende. Progresa.</p>
          <h1 className="display titulo-web" style={{ fontSize: 24, display: 'none' }}>Bienvenido de vuelta</h1>
          <label htmlFor="correo" className="overline">Correo</label>
          <Input id="correo" type="email" placeholder="Correo electrónico" autoComplete="email" />
          <label htmlFor="clave" className="overline">Contraseña</label>
          <Input id="clave" type="password" placeholder="Contraseña" autoComplete="current-password" />
          <button type="button" className="enlace" style={{ alignSelf: 'flex-end', fontSize: 12 }}>¿Olvidaste tu contraseña?</button>
          <Boton estilo="primario" type="submit">Entrar</Boton>
          <div className="divisor">o</div>
          <Boton estilo="secundario" type="button">Continuar con Google</Boton>
          <p style={{ textAlign: 'center', color: 'var(--color-texto-secundario)', fontSize: 13 }}>
            ¿Primera vez en el tatami? <button type="button" className="enlace">Crea tu cuenta</button>
          </p>
          <CaminoCinturones />
        </form>
      </div>
    </section>
  )
}
