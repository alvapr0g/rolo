export default function Toast({ visible, children }) {
  return (
    <div className={visible ? 'toast visible' : 'toast'} role="status">
      {children}
    </div>
  )
}
