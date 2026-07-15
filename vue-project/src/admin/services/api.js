// Capa de servicios simulada. Misma firma que tendrán las llamadas reales:
// cada función devuelve una promesa con la forma de la API documentada.
// Para conectar el backend real, reemplazar el cuerpo por fetch(BASE_URL + ...).
import * as db from '../mocks/data'

const LATENCY = 300

function fake(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), LATENCY)
  })
}

export const getUsuarios = () => fake({ usuarios: db.usuarios })
export const getCamionetas = () => fake({ camionetas: db.camionetas })
export const getChoferes = () => fake({ choferes: db.choferes })
export const getClientes = () => fake({ clientes: db.clientes })
export const getViajes = () => fake({ viajes: db.viajes })
export const getMantenimientos = () => fake({ mantenimientos: db.mantenimientos })
export const getTramites = () => fake({ tramites: db.tramites })
export const getGastosGenerales = () => fake({ gastos: db.gastosGenerales })
export const getDashboard = () => fake(db.dashboard)
export const getTotales = () => fake(db.totales)
export const getAvisos = () => fake({ avisos: db.avisos })
export const getEmpresa = () => fake(db.empresa)

// GET /calendario — ocupación derivada de viajes + camionetas
export const getCalendario = () =>
  fake({
    ocupacion: db.camionetas.map((c) => ({
      camioneta_id: c.id,
      placa: c.placa,
      modelo: c.modelo,
      estado: c.estado,
      viajes: db.viajes
        .filter((v) => v.camioneta_id === c.id && v.estado !== 'cancelado')
        .map((v) => ({
          viaje_id: v.id,
          cliente: v.cliente_nombre,
          fecha_inicio: v.fecha_inicio,
          fecha_fin: v.fecha_fin,
          estado: v.estado,
          notas: v.notas,
          chofer: v.chofer_nombre
        })),
      mantenimiento:
        c.estado === 'en_taller'
          ? db.mantenimientos.find((m) => m.camioneta_id === c.id) || null
          : null
    }))
  })
