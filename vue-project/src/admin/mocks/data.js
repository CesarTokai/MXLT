// Datos simulados con la forma exacta de la especificación de APIs.
// Cuando exista backend, esta carpeta desaparece y services/api.js hace fetch real.

export const usuarios = [
  { id: 1, email: 'admin@mexicolindo.com', nombre: 'Carlos Estrada', rol: 'ADMIN', activo: true, creado_en: '2026-01-15T10:30:00Z' },
  { id: 2, email: 'maria.r@mexicolindo.com', nombre: 'Maria Rodriguez', rol: 'GESTOR', activo: true, creado_en: '2026-02-10T14:20:00Z' },
  { id: 3, email: 'juan.lopez@mexicolindo.com', nombre: 'Juan Lopez', rol: 'GESTOR', activo: false, creado_en: '2026-03-02T09:00:00Z' }
]

export const camionetas = [
  { id: 1, placa: 'MLT-001', modelo: 'Urvan NV350', anio: 2022, km_actual: 45200, km_mantenimiento: 10000, proximo_mantenimiento_km: 50000, estado: 'disponible', color: 'blanco', creada_en: '2026-01-10T08:00:00Z' },
  { id: 2, placa: 'MLT-002', modelo: 'Urvan NV350', anio: 2021, km_actual: 80150, km_mantenimiento: 10000, proximo_mantenimiento_km: 80000, estado: 'en_taller', color: 'blanco', creada_en: '2026-01-10T08:00:00Z' },
  { id: 3, placa: 'MLT-003', modelo: 'Urvan NV350', anio: 2023, km_actual: 22300, km_mantenimiento: 10000, proximo_mantenimiento_km: 30000, estado: 'disponible', color: 'plata', creada_en: '2026-02-01T08:00:00Z' },
  { id: 4, placa: 'MLT-004', modelo: 'Urvan NV350', anio: 2024, km_actual: 9800, km_mantenimiento: 10000, proximo_mantenimiento_km: 10000, estado: 'disponible', color: 'blanco', creada_en: '2026-04-12T08:00:00Z' }
]

export const choferes = [
  { id: 1, nombre: 'Hector García', telefono: '+52 55 1234 5678', licencia_numero: 'FED-A-9876543', licencia_vencimiento: '2027-03-15', estado: 'activo', creado_en: '2026-01-01T08:00:00Z' },
  { id: 2, nombre: 'Miguel Rodriguez', telefono: '+52 55 9876 5432', licencia_numero: 'FED-B-1234567', licencia_vencimiento: '2026-08-02', estado: 'activo', creado_en: '2026-01-01T08:00:00Z' },
  { id: 3, nombre: 'Carlos Mendoza', telefono: '+52 33 4567 8901', licencia_numero: 'FED-A-4455667', licencia_vencimiento: '2028-08-20', estado: 'inactivo', creado_en: '2026-01-15T08:00:00Z' },
  { id: 4, nombre: 'Luis Ramirez', telefono: '+52 777 210 4433', licencia_numero: 'FED-A-2211334', licencia_vencimiento: '2027-11-30', estado: 'activo', creado_en: '2026-02-20T08:00:00Z' },
  { id: 5, nombre: 'Pedro Sánchez', telefono: '+52 734 118 9020', licencia_numero: 'FED-B-7788990', licencia_vencimiento: '2026-07-28', estado: 'activo', creado_en: '2026-03-05T08:00:00Z' }
]

export const clientes = [
  { id: 1, nombre: 'Grupo Estrella', telefono: '+52 55 1111 2222', email: 'contacto@grupoestrella.mx', total_viajes: 15, estado: 'activo', creado_en: '2026-01-05T10:00:00Z' },
  { id: 2, nombre: 'Turismo Horizonte', telefono: '+52 55 3333 4444', email: 'ventas@thorizonte.com', total_viajes: 9, estado: 'activo', creado_en: '2026-01-22T10:00:00Z' },
  { id: 3, nombre: 'Universidad Autónoma', telefono: '+52 777 555 6666', email: 'eventos@uaem.mx', total_viajes: 6, estado: 'activo', creado_en: '2026-02-14T10:00:00Z' },
  { id: 4, nombre: 'Ana García López', telefono: '+52 55 1234 5678', email: 'ana.garcia@email.com', total_viajes: 12, estado: 'activo', creado_en: '2026-02-28T10:00:00Z' },
  { id: 5, nombre: 'María Elena Vega', telefono: '+52 81 4455 6677', email: 'm.vega@travel.com', total_viajes: 0, estado: 'inactivo', creado_en: '2026-04-01T10:00:00Z' },
  { id: 6, nombre: 'Empresa Logística SA', telefono: '+52 55 5555 1111', email: 'contacto@logistica.mx', total_viajes: 45, estado: 'activo', creado_en: '2026-01-02T10:00:00Z' }
]

export const viajes = [
  { id: 10, cliente_id: 1, cliente_nombre: 'Grupo Estrella', camioneta_id: 2, camioneta_placa: 'MLT-002', chofer_id: 1, chofer_nombre: 'Hector García', fecha_inicio: '2026-07-02', fecha_fin: '2026-07-04', km_inicial: 79200, km_final: 79680, costo_total: 4200, estado: 'finalizado', notas: 'Tour corporativo Taxco', creado_en: '2026-06-25T14:30:00Z' },
  { id: 11, cliente_id: 2, cliente_nombre: 'Turismo Horizonte', camioneta_id: 1, camioneta_placa: 'MLT-001', chofer_id: 4, chofer_nombre: 'Luis Ramirez', fecha_inicio: '2026-07-13', fecha_fin: '2026-07-17', km_inicial: 44800, km_final: null, costo_total: 3850, estado: 'en_curso', notas: 'Circuito Pueblos Mágicos', creado_en: '2026-07-01T09:00:00Z' },
  { id: 12, cliente_id: 3, cliente_nombre: 'Universidad Autónoma', camioneta_id: 3, camioneta_placa: 'MLT-003', chofer_id: 5, chofer_nombre: 'Pedro Sánchez', fecha_inicio: '2026-07-05', fecha_fin: '2026-07-08', km_inicial: 21600, km_final: 22300, costo_total: 6100, estado: 'finalizado', notas: 'Excursión estudiantil Grutas', creado_en: '2026-06-20T11:00:00Z' },
  { id: 13, cliente_id: 4, cliente_nombre: 'Ana García López', camioneta_id: 3, camioneta_placa: 'MLT-003', chofer_id: 2, chofer_nombre: 'Miguel Rodriguez', fecha_inicio: '2026-07-20', fecha_fin: '2026-07-21', km_inicial: 22300, km_final: null, costo_total: 2500, estado: 'apartado', notas: 'Traslado aeropuerto CDMX', creado_en: '2026-07-10T16:00:00Z' },
  { id: 14, cliente_id: 6, cliente_nombre: 'Empresa Logística SA', camioneta_id: 4, camioneta_placa: 'MLT-004', chofer_id: null, chofer_nombre: null, fecha_inicio: '2026-07-24', fecha_fin: '2026-07-26', km_inicial: 9800, km_final: null, costo_total: 5400, estado: 'apartado', notas: 'Asignación de chofer pendiente', creado_en: '2026-07-12T10:00:00Z' },
  { id: 15, cliente_id: 1, cliente_nombre: 'Grupo Estrella', camioneta_id: 4, camioneta_placa: 'MLT-004', chofer_id: 1, chofer_nombre: 'Hector García', fecha_inicio: '2026-07-09', fecha_fin: '2026-07-10', km_inicial: 9100, km_final: 9800, costo_total: 2800, estado: 'finalizado', notas: 'Evento social Cuernavaca', creado_en: '2026-06-30T12:00:00Z' },
  { id: 16, cliente_id: 2, cliente_nombre: 'Turismo Horizonte', camioneta_id: 1, camioneta_placa: 'MLT-001', chofer_id: 4, chofer_nombre: 'Luis Ramirez', fecha_inicio: '2026-07-22', fecha_fin: '2026-07-23', km_inicial: null, km_final: null, costo_total: 3000, estado: 'apartado', notas: '', creado_en: '2026-07-13T18:00:00Z' },
  { id: 17, cliente_id: 5, cliente_nombre: 'María Elena Vega', camioneta_id: 3, camioneta_placa: 'MLT-003', chofer_id: 2, chofer_nombre: 'Miguel Rodriguez', fecha_inicio: '2026-07-06', fecha_fin: '2026-07-06', km_inicial: null, km_final: null, costo_total: 1800, estado: 'cancelado', notas: 'Cliente canceló por enfermedad', creado_en: '2026-06-28T09:30:00Z' },
  { id: 18, cliente_id: 6, cliente_nombre: 'Empresa Logística SA', camioneta_id: 2, camioneta_placa: 'MLT-002', chofer_id: 5, chofer_nombre: 'Pedro Sánchez', fecha_inicio: '2026-06-24', fecha_fin: '2026-06-27', km_inicial: 78300, km_final: 79200, costo_total: 7200, estado: 'finalizado', notas: 'Gira norte de Morelos', creado_en: '2026-06-10T08:00:00Z' },
  { id: 19, cliente_id: 3, cliente_nombre: 'Universidad Autónoma', camioneta_id: 1, camioneta_placa: 'MLT-001', chofer_id: 1, chofer_nombre: 'Hector García', fecha_inicio: '2026-06-30', fecha_fin: '2026-07-01', km_inicial: 44200, km_final: 44800, costo_total: 2400, estado: 'finalizado', notas: '', creado_en: '2026-06-18T13:00:00Z' }
]

export const mantenimientos = [
  { id: 1, camioneta_id: 2, camioneta_placa: 'MLT-002', fecha: '2026-07-14', km_realizado: 80150, tipo: 'revision_general', costo: 4800, notas: 'Servicio mayor + frenos', prox_km: 90000 },
  { id: 2, camioneta_id: 1, camioneta_placa: 'MLT-001', fecha: '2026-05-30', km_realizado: 40000, tipo: 'cambio_aceite', costo: 1200, notas: 'Preventivo', prox_km: 50000 },
  { id: 3, camioneta_id: 3, camioneta_placa: 'MLT-003', fecha: '2026-06-12', km_realizado: 20000, tipo: 'cambio_aceite', costo: 1150, notas: 'Preventivo', prox_km: 30000 }
]

export const tramites = [
  { id: 1, camioneta_id: 2, camioneta_placa: 'MLT-002', tipo: 'seguro', fecha_vencimiento: '2026-07-20', dias_para_vencer: 5, estado: 'vigente', costo: 3500, notas: 'Seguro cobertura amplia · GNP' },
  { id: 2, camioneta_id: 1, camioneta_placa: 'MLT-001', tipo: 'tenencia', fecha_vencimiento: '2026-07-30', dias_para_vencer: 15, estado: 'vigente', costo: 800, notas: 'Tenencia estatal · Edo. de México' },
  { id: 3, camioneta_id: 3, camioneta_placa: 'MLT-003', tipo: 'verificacion', fecha_vencimiento: '2026-09-15', dias_para_vencer: 62, estado: 'vigente', costo: 600, notas: 'Verificación semestral' },
  { id: 4, camioneta_id: 4, camioneta_placa: 'MLT-004', tipo: 'seguro', fecha_vencimiento: '2027-04-12', dias_para_vencer: 271, estado: 'vigente', costo: 3600, notas: 'Seguro cobertura amplia · Qualitas' }
]

export const gastosGenerales = [
  { id: 1, categoria: 'oficina', descripcion: 'Renta oficina', monto: 5000, fecha: '2026-07-01', creado_en: '2026-06-25T08:00:00Z' },
  { id: 2, categoria: 'seguros', descripcion: 'Seguro responsabilidad civil empresa', monto: 2000, fecha: '2026-07-05', creado_en: '2026-07-05T08:00:00Z' },
  { id: 3, categoria: 'nomina', descripcion: 'Nómina administrativa', monto: 8500, fecha: '2026-07-10', creado_en: '2026-07-10T08:00:00Z' }
]

// Gastos por viaje (resumen usado en dashboard/contabilidad)
export const gastosViajes = [
  { viaje_id: 10, chofer: 900, gasolina: 750, casetas: 320, otros: 100 },
  { viaje_id: 12, chofer: 1100, gasolina: 980, casetas: 410, otros: 0 },
  { viaje_id: 15, chofer: 600, gasolina: 420, casetas: 180, otros: 60 },
  { viaje_id: 18, chofer: 1500, gasolina: 1300, casetas: 520, otros: 200 },
  { viaje_id: 19, chofer: 550, gasolina: 380, casetas: 150, otros: 0 }
]

export const dashboard = {
  periodo: 'Julio 2026',
  resumen_general: { ingresos_total: 25000, egresos_total: 10500, neto_total: 14500, variacion_ingresos: 12.5, variacion_egresos: -2.1 },
  ganancia_por_camioneta: [
    { camioneta_id: 1, placa: 'MLT-001', ingresos: 15000, egresos: { chofer: 2000, gasolina: 1500, casetas: 300, mantenimiento: 500, otros: 200, total: 4500 }, neto: 10500, porcentaje_util: 70, viajes_completados: 6, semanas: [80, 65, 90, 70] },
    { camioneta_id: 2, placa: 'MLT-002', ingresos: 10000, egresos: { chofer: 1600, gasolina: 1300, casetas: 400, mantenimiento: 500, otros: 200, total: 4000 }, neto: 6000, porcentaje_util: 40, viajes_completados: 3, semanas: [60, 75, 50, 85] }
  ]
}

export const totales = {
  periodo: 'Julio 2026',
  ingresos: { total_viajes: 25000, descripcion: 'Suma de costo_total de viajes completados' },
  egresos: { gastos_viajes: 3500, gastos_camionetas: 2000, gastos_generales: 5000, total: 10500 },
  neto: 14500,
  detalle_camionetas: [
    { camioneta_id: 1, placa: 'MLT-001', viajes: 6, ingresos: 15000, gastos_ruta: 2900, mantenimiento: 1200, neto: 10900 },
    { camioneta_id: 2, placa: 'MLT-002', viajes: 3, ingresos: 10000, gastos_ruta: 1800, mantenimiento: 4800, neto: 3400 },
    { camioneta_id: 3, placa: 'MLT-003', viajes: 4, ingresos: 8500, gastos_ruta: 1400, mantenimiento: 1150, neto: 5950 },
    { camioneta_id: 4, placa: 'MLT-004', viajes: 2, ingresos: 8200, gastos_ruta: 1260, mantenimiento: 0, neto: 6940 }
  ]
}

export const avisos = {
  mantenimientos_proximamente: [
    { camioneta_id: 2, placa: 'MLT-002', km_actual: 80150, km_proximo: 80000, km_faltantes: -150, nivel: 'critico', mensaje: 'Servicio excedido por 150 km' },
    { camioneta_id: 4, placa: 'MLT-004', km_actual: 9800, km_proximo: 10000, km_faltantes: 200, nivel: 'alerta', mensaje: 'Faltan 200 km para primer servicio' },
    { camioneta_id: 1, placa: 'MLT-001', km_actual: 45200, km_proximo: 50000, km_faltantes: 4800, nivel: 'info', mensaje: 'Faltan 4,800 km para mantenimiento' }
  ],
  tramites_por_vencer: [
    { tramite_id: 1, camioneta_placa: 'MLT-002', tipo: 'seguro', vencimiento: '2026-07-20', dias_restantes: 5, nivel: 'critico' },
    { tramite_id: 2, camioneta_placa: 'MLT-001', tipo: 'tenencia', vencimiento: '2026-07-30', dias_restantes: 15, nivel: 'alerta' }
  ],
  licencias_chofer_por_vencer: [
    { chofer_id: 5, nombre: 'Pedro Sánchez', licencia_vencimiento: '2026-07-28', dias_restantes: 13, nivel: 'alerta' },
    { chofer_id: 2, nombre: 'Miguel Rodriguez', licencia_vencimiento: '2026-08-02', dias_restantes: 18, nivel: 'info' }
  ]
}

export const empresa = {
  nombre: 'Mexico Lindo Tours',
  moneda: 'MXN',
  zona_horaria: 'America/Mexico_City'
}
