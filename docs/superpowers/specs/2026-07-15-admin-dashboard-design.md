# Spec: Consola Admin Mexico Lindo Tours (login + dashboard, datos simulados)

Fecha: 2026-07-15 · Estado: aprobado por usuario

## Objetivo

Agregar zona de administración al proyecto Vue existente (`vue-project`), con pantallas fieles a los mockups HTML/Tailwind entregados por el usuario. **Sin backend real**: toda la data es simulada (mocks con la forma exacta de la especificación de APIs), de modo que conectar el backend después solo requiera reemplazar la capa de servicios.

## Arquitectura

- Mismo proyecto `vue-project` (Vue 3 + Vite). Se agrega `vue-router@4`.
- Landing pública actual queda en `/` (se mueve el contenido de `App.vue` a `views/LandingView.vue`; `App.vue` pasa a ser `<router-view/>`).
- Admin bajo `/admin/*`, protegido por guard de sesión.
- Tailwind CSS v3 instalado como dependencia (no CDN), con el theme Material de los mockups (primary `#031632`, secondary `#3b6934`, tokens surface/error/etc., fuente Inter, Material Symbols).
  - `preflight: false` para no romper los estilos del landing; reset manual scoped a `.admin-root`.
- Mock data en `src/admin/mocks/data.js` con la forma de las APIs: usuarios, camionetas, choferes, clientes, viajes (+pagos/gastos), mantenimientos, trámites, gastos generales, calendario, totales, avisos, dashboard.
- `src/admin/services/api.js`: funciones async que simulan latencia (~300ms) y devuelven los mocks. Punto único de reemplazo cuando exista backend.
- Auth simulada: `admin@mexicolindo.com` / `admin123` → token falso + usuario en `localStorage` (`mlt_session`). Logout limpia sesión. Guard redirige a `/admin/login`.

## Pantallas

| Ruta | Vista | Contenido |
|---|---|---|
| `/admin/login` | LoginView | Form email/password estilo navy/verde, error de credenciales |
| `/admin` | DashboardView | Cards ingresos/egresos/neto, gráfica de barras CSS (ganancia por camioneta), mantenimientos próximos, tabla viajes recientes |
| `/admin/viajes` | ViajesView | Filtros estado/fechas, tabla con badges de estado, paginación |
| `/admin/flota` | FlotaView | Cards por camioneta (odómetro, progreso a mantenimiento), panel trámites por vencer |
| `/admin/choferes` | ChoferesView | Stats (activos, licencias por vencer, en ruta), tabla con alertas de licencia |
| `/admin/clientes` | ClientesView | KPIs, directorio con búsqueda |
| `/admin/calendario` | CalendarioView | Gantt de ocupación por camioneta con leyenda de estados |
| `/admin/contabilidad` | ContabilidadView | Utilidad neta, resumen ingresos/egresos, desglose egresos, detalle por camioneta |
| `/admin/configuracion` | ConfiguracionView | Ajustes empresa, tabla gestión de usuarios (ADMIN/GESTOR) |

## Componentes compartidos

`AdminLayout` (sidebar + topbar + `<router-view>`), `AdminSidebar`, `AdminTopbar`, `StatusBadge`.

## Fuera de alcance

- Llamadas HTTP reales, JWT real, roles con permisos efectivos, CRUD persistente (los formularios/acciones solo mutan estado en memoria o son visuales).
