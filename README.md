# Rosso Hnos. S.A. - Prototipo web

Prototipo funcional desarrollado para el relevamiento y modelado de los procesos de **Rosso Hnos. S.A.**. La aplicación representa el recorrido de una cotización web hasta la aprobación, preparación, despacho y seguimiento de un pedido.

> **Estado del proyecto:** prototipo/MVP académico funcional. Los datos se almacenan localmente en el navegador; todavía no es un sistema productivo ni procesa pagos reales.

## Funcionalidades

### Flujo del cliente

- Consulta del catálogo de materiales.
- Selección de productos y cantidades.
- Validación de stock disponible.
- Carga de datos personales y sucursal.
- Generación de presupuestos con numeración correlativa local.
- Consulta del detalle del presupuesto.
- Formulario de pago simulado con validaciones de tarjeta.
- Confirmación del pedido.
- Seguimiento público por número de pedido.

### Operación interna

- Acceso simulado por rol:
  - Personal de Depósito.
  - Personal de Logística.
  - Administrador.
- Gestión de estados del pedido:
  - Pendiente.
  - En preparación.
  - Listo para retiro.
  - Entregado.
- Búsqueda y confirmación de entregas.
- Gestión de catálogo, precios, imágenes, stock y disponibilidad.
- Alta de nuevos productos.
- Exportación e importación de respaldos JSON.
- Historial local de presupuestos.

## Tecnologías

- React 19.
- Vite.
- React Router.
- Tailwind CSS.
- ESLint.
- Progressive Web App (PWA).
- `localStorage` como persistencia temporal.

## Requisitos

- Node.js 20 o superior.
- npm 10 o superior.

## Instalación

```bash
git clone https://github.com/miguelsotelo01/tfi-rosso-hnos-web.git
cd tfi-rosso-hnos-web
npm install
```

## Comandos disponibles

```bash
# Servidor de desarrollo
npm run dev

# Validación de lint
npm run lint

# Build de producción
npm run build

# Vista previa del build
npm run preview
```

## Uso de la aplicación

1. Ingresar a la pantalla principal.
2. Seleccionar materiales y cantidades.
3. Completar los datos del cliente.
4. Generar el presupuesto.
5. Aprobarlo con datos de tarjeta ficticios.
6. Ingresar a **Acceso Empleados** para operar cada módulo.
7. Actualizar el pedido desde depósito y logística.
8. Consultar el resultado desde **Seguimiento de Pedido**.

La selección de rol es únicamente una simulación para demostrar el prototipo. No reemplaza un sistema de autenticación.

## Persistencia y respaldos

La información se guarda en el navegador mediante la clave `rosso-hnos-store`. Por este motivo:

- Los datos no se comparten entre navegadores o dispositivos.
- La limpieza de datos del navegador puede eliminar la información.
- La numeración de presupuestos es local.
- El respaldo JSON permite conservar o trasladar manualmente los datos.

La capa de persistencia está aislada en [`src/services/persistence/localStorageStore.js`](src/services/persistence/localStorageStore.js), para facilitar una futura migración a una API y una base de datos.

## Estructura principal

```text
src/
├── components/       # Pantallas del cliente y módulos internos
├── context/          # Estado global y reglas del flujo
├── services/         # Adaptadores de persistencia y servicios futuros
├── App.jsx           # Rutas, navegación y protección de módulos
└── main.jsx          # Punto de entrada
public/
├── manifest.webmanifest
├── sw.js
└── icon-*.png
```

## PWA y responsive

La aplicación incluye manifest, iconos y service worker para poder instalarse como aplicación en dispositivos compatibles. La interfaz mantiene layouts diferenciados para escritorio y móvil.

Durante el desarrollo, si se visualiza una versión antigua, es necesario actualizar o limpiar la caché del service worker del navegador.

## Alcance actual y próximos pasos

El proyecto está preparado como demostración académica y pieza de portafolio. Para una implementación empresarial se debería incorporar:

- API y base de datos centralizada.
- Autenticación y permisos reales.
- Inventario transaccional y auditoría.
- Integración de pagos mediante un proveedor autorizado.
- Notificaciones por email.
- Pruebas unitarias, de integración y end-to-end.
- CI/CD, monitoreo, backups y despliegue productivo.

Estas mejoras deben implementarse en ambientes separados de desarrollo, staging y producción, sin exponer datos reales durante las pruebas.

## Contexto académico

Este repositorio acompaña el relevamiento, los modelos y los prototipos del Trabajo Final Integrador. Su objetivo actual es demostrar el flujo funcional y la propuesta de solución; las decisiones de adopción productiva quedan sujetas a la evaluación y aprobación de la empresa.

## Licencia

Proyecto académico. Definir una licencia de distribución antes de publicar o reutilizar el código fuera del contexto del trabajo.
