// Autenticación simulada. Cuando exista backend real, login() debe llamar
// POST /auth/login y guardar el JWT que devuelva.
const SESSION_KEY = 'mlt_session'

const DEMO_USER = {
  email: 'admin@mexicolindo.com',
  password: 'admin123',
  usuario: { id: 1, email: 'admin@mexicolindo.com', nombre: 'Carlos Estrada', rol: 'ADMIN' }
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === DEMO_USER.email && password === DEMO_USER.password) {
        const session = { token: 'demo-jwt-token', usuario: DEMO_USER.usuario }
        localStorage.setItem(SESSION_KEY, JSON.stringify(session))
        resolve(session)
      } else {
        reject(new Error('Credenciales inválidas'))
      }
    }, 400)
  })
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

export function isAuthenticated() {
  return !!getSession()
}
