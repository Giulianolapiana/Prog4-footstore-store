# Store

1: https://www.youtube.com/watch?v=T5U75H9Gki0
2: https://youtu.be/sqpembLRGBA

`store-app` es la aplicación cliente del módulo Store del Parcial (Vite + React + TypeScript). Está diseñada para consumir la API backend y cubrir el flujo de compra: catálogo, carrito persistente y gestión de pedidos.

Funcionalidades clave (según la especificación del Parcial)

- Catálogo público con filtros: categoría (jerárquica), disponibilidad, búsqueda por texto y paginación.
- Detalle de producto: muestra información, ingredientes y campos relevantes (ej. `es_alergeno`).
- Carrito: persistencia en `localStorage` mediante middleware; calculo de totales y transición a flujo de pedido.
- Checkout/Realizar pedido: creación de pedido desde el carrito (transacción atómica, snapshot de precio/nombre al momento del pedido). No incluye pasarela de pago en esta entrega.
- Pedidos: pantalla de pedidos del cliente (ver historial y estado). El cliente sólo ve sus pedidos.
- Axios: instancia central con `interceptors` para manejo de auth (cookie `access token`) y errores.
- Server State: TanStack Query (`useQuery` para listados, `useMutation` para alta/edición) y uso de `invalidateQueries` donde aplica.
- Rutas: `react-router-dom` con parámetros dinámicos (ej. `/productos/:id`).

Requisitos

- Node 16+ y `pnpm` (recomendado). También funcionan `npm` o `yarn`.

Ejecución local (desarrollo)

```powershell
cd Store2\store-app
pnpm install
pnpm run dev
```

Abre la URL que muestre Vite (por defecto `http://localhost:5173`).

Build (producción)

```powershell
cd Store2\store-app
pnpm install
pnpm run build
# Resultado: carpeta dist/
```

Configuración de entorno

- Copiá `.env.example` a `.env` y configurá `VITE_API_BASE_URL` (ej: `http://localhost:8000/api/v1`).
- No subir archivos `.env` con secretos.

Contratos/API esperada (resumen relevante para el frontend)

- Base API: `/api/v1`
- Autenticación: `/api/v1/auth/` (login por email/password → cookie `access token`, `GET /me`).
- Productos: `/api/v1/productos/` (listado público con filtros, detalle, PATCH `/disponibilidad`).
- Categorías: `/api/v1/categorias/` (jerarquía, consulta recursiva, filtro por `parent_id`).
- Pedidos: `/api/v1/pedidos/` (crear pedido atómico desde carrito, ver pedidos del usuario, historial de estados).

Roles (impacto en interfaz)

- `CLIENT`: interfaz de tienda (catálogo, carrito y pedidos propios).
- `ADMIN`, `STOCK`, `PEDIDOS`: gestionan funcionalidades administrativas desde la parte admin.

Estructura útil

- `src/` — componentes, páginas, hooks y servicios.
- `src/services/axios.ts` — instancia y `interceptors`.
- `src/hooks/` — hooks para TanStack Query y lógica del carrito.

Recomendaciones

- Usar TanStack Query para sincronizar datos y minimizar llamadas redundantes.
- Mostrar mensajes de error claros cuando el backend devuelve validaciones (Pydantic).

Extensiones posibles

- Dockerizar el frontend y/o generar un `docker-compose` para integrarlo con el backend.
- Añadir pruebas E2E (Cypress / Playwright) para cubrir el flujo de compra.
