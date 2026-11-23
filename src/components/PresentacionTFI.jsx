import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useXboxNav } from "../hooks/useXboxNav";

const FASES = {
  inicio: {
    titulo: "1. Fase de Inicio",
    expositor: "Bloque 1",
    subtitulo:
      "Relevamiento organizacional, alcance, reglas de negocio, casos de uso y prototipos",
    temas: [
      {
        nombre: "Empresa y Estructura",
        bloques: [
          {
            subtitulo: "Organización y Unidad Rosso Mix",
            items: [
              "Rosso Hnos. S.A.: comercialización de materiales de construcción (sucursales en Tucumán y Salta) y unidad productiva Rosso Mix.",
              "Atiende tanto a clientes particulares en mostrador como a profesionales y empresas constructoras.",
            ],
            detalle: [
              "Unidad Rosso Mix: división especializada en producción y distribución de hormigón elaborado.",
              "Fuentes del relevamiento: entrevistas semiestructuradas a Encargado de Depósito, Personal de Ventas y Fletero externo, junto a registros históricos de inventario.",
              "Crecimiento operativo: la expansión comercial en ambas provincias volvió insuficiente la gestión manual y telefónica entre sectores.",
            ],
          },
          {
            subtitulo: "Estructura Organizativa General",
            items: [
              "Estructura jerárquica-funcional de 5 niveles encabezada por la Gerencia General.",
              "Departamentalización funcional agrupada en Comercial, Producción Rosso Mix, RR.HH. y Administración y Finanzas.",
            ],
            detalle: [
              "Permite visualizar la cadena de mando completa de la empresa antes de delimitar el alcance del sistema.",
              "La división por funciones facilita asignar responsabilidades claras en cada etapa del circuito comercial, de almacenamiento y de logística.",
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/organigrama-general.png",
            pie: "Organigrama General de Rosso Hnos. S.A.",
          },
        ],
      },
      {
        nombre: "Áreas Afectadas",
        bloques: [
          {
            subtitulo: "Áreas Directas (8 Sectores)",
            items: [
              "Comercial: Ventas Mayoristas, Ventas Minoristas y Atención al Cliente.",
              "Operaciones y Soporte: Almacén e Inventario, Transporte y Entregas, Programación de Rutas y Sistemas.",
            ],
            detalle: [
              "Son las unidades organizacionales que operan diariamente el circuito de cotización, reserva lógica, preparación en depósito y despacho.",
              "Sobre estas áreas impacta directamente la automatización del portal web público y la intranet operativa.",
            ],
          },
          {
            subtitulo: "Áreas Indirectas (3 Sectores)",
            items: [
              "Administración y Finanzas: Contabilidad, Tesorería y Compras.",
              "Reciben impacto informativo para control de comprobantes, cobranzas y reposición de stock.",
            ],
            detalle: [
              "Contabilidad y Tesorería validan el respaldo financiero y la facturación de las operaciones aprobadas.",
              "Compras utiliza la información de rotación de materiales y quiebres de inventario para planificar el reabastecimiento a proveedores.",
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/organigrama-afectadas.jpg",
            pie: "Organigrama – Áreas Involucradas en el Análisis",
          },
        ],
      },
      {
        nombre: "Procesos Actuales (BPD)",
        bloques: [
          {
            subtitulo: "Circuito Operativo As-Is",
            items: [
              "Descompuesto en 5 procesos: Solicitud de Cotización, Verificación de Stock, Presupuesto, Registro/Preparación y Retiro/Entrega.",
              "Participantes: Pool externo CLIENTE y Pool interno ROSSO MATERIALES (carriles VENTAS y DEPÓSITO).",
            ],
            detalle: [
              "Compuertas exclusivas (X): evalúan disponibilidad de stock en Ventas y aprobación del presupuesto en Cliente.",
              "Artefacto Base de Datos: recién al aprobarse la compra Ventas registra formalmente el pedido en el sistema actual.",
            ],
          },
          {
            subtitulo: "Cuellos de Botella Detectados",
            items: [
              "Cotizaciones manuales y consultas informales por teléfono o WhatsApp con demoras en horarios pico.",
              "Desconexión física entre Ventas y Depósito, generando errores de stock y doble triangulación de avisos.",
            ],
            detalle: [
              "Cada cotización obliga a detener la atención en mostrador para consultar disponibilidad física al almacén.",
              "Al no existir reserva lógica de inventario, dos vendedores pueden comprometer el mismo lote de material crítico.",
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/bpd.png",
            pie: "Diagrama de Procesos de Negocio Actuales (BPD)",
          },
        ],
      },
      {
        nombre: "Alcance y Reglas (Venn)",
        bloques: [
          {
            subtitulo: "Límite y Frontera del Sistema",
            items: [
              "Dentro del límite: catálogo web, cotización autogestionada, reserva lógica de stock, preparación en depósito y logística interna.",
              "En el ambiente (fuera): proveedores de materiales, contabilidad profunda y fleteros externos contratados por el cliente.",
            ],
            detalle: [
              "Aclaración clave: el departamento interno de Transporte y Programación de Rutas pertenece a la empresa, mientras que el fletero externo solo presenta el comprobante al retirar.",
              "La seguridad y autenticación de empleados en Intranet se contempla como requisito no funcional en la Especificación Complementaria.",
            ],
          },
          {
            subtitulo: "Reglas de Negocio Clave",
            items: [
              "RN01: Todo presupuesto web tiene una validez de 72 horas corridas con reserva temporal de stock.",
              "RN02: Modalidades diferenciadas entre Retiro Personal en sucursal y Envío por Fletero Externo.",
              "RN03: Validación obligatoria de documentación comercial aprobada antes de confirmar el despacho.",
            ],
            detalle: [
              "Justificación de RN01 (72 hs): protege el inventario frente a presupuestos abandonados; vencido el plazo, el stock se libera automáticamente.",
              "Justificación de RN02: si retira un fletero externo, se registran datos del transportista y patente para autorizar la carga.",
              "Justificación de RN03: ningún material sale del depósito sin comprobante/remito validado en el módulo de despacho.",
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/venn.jpg",
            pie: "Diagrama de Venn – Límite y Alcance del Sistema",
          },
        ],
      },
      {
        nombre: "Casos de Uso (CU 1–6)",
        bloques: [
          {
            subtitulo: "CU1 – Solicitar Cotización Web",
            items: [
              "Actor Principal: Cliente (Portal Público).",
              "Precondición: Acceso web activo y catálogo/precios cargados en Inventario.",
              "Postcondición: Se emite Presupuesto Web preliminar con validez de 72 horas.",
            ],
            detalle: [
              "Escenario de éxito: 1) Cliente navega catálogo y selecciona materiales/cantidades; 2) Ingresa datos (Nombre, CUIT/DNI, Teléfono, Email) y sucursal; 3) Sistema consulta y valida stock físico; 4) Calcula precios totales y emite presupuesto.",
              "Extensiones: 4a. Falta de stock físico (informa indisponibilidad y no permite presupuestar ese ítem). Falla de conectividad/energía: conserva lo seleccionado y retoma al restablecerse.",
              "Requisitos y Tecnología: Alta concurrencia de clientes simultáneos sin demoras. Frontend Web responsivo, Backend y BD de inventario en tiempo real.",
            ],
          },
          {
            subtitulo: "CU2 – Aprobar Presupuesto y Registrar Pedido",
            items: [
              "Actor Principal: Cliente (Autogestión).",
              "Precondición: Existe un presupuesto web vigente (dentro de las 72 horas).",
              "Postcondición: Pedido en estado 'Confirmado' con reserva lógica sobre el stock.",
            ],
            detalle: [
              "Escenario de éxito: 1) Cliente aprueba cotización; 2) Sistema solicita modalidad de entrega y datos de pago; 3) Cliente elige Retiro Personal o Fletero Externo e ingresa pago; 4) Sistema reserva lógicamente el stock; 5) Emite Orden de Pedido con código de seguimiento.",
              "Extensiones: 1a. Presupuesto vencido (> 72 hs): exige generar nueva cotización. Falla de conectividad/energía: conserva selección.",
              "Requisitos y Tecnología: Confiabilidad transaccional (ACID) para evitar sobreventas concurrentes.",
            ],
          },
          {
            subtitulo: "CU3 – Gestionar Preparación en Depósito",
            items: [
              "Actor Principal: Personal de Depósito (Intranet).",
              "Precondición: Existe al menos un pedido en estado 'Confirmado' en la sucursal.",
              "Postcondición: Pedido pasa a 'Listo para Retiro' y se emite Ficha de Preparación.",
            ],
            detalle: [
              "Escenario de éxito: 1) Operario consulta pedidos pendientes; 2) Sistema lista pedidos 'Confirmados'; 3) Operario inicia preparación; 4) Sistema actualiza a 'En Preparación'; 5) Operario finaliza picking y marca 'Listo para Retiro'; 6) Sistema genera Ficha de Preparación.",
              "Extensiones: 3a. Diferencia de inventario físico (daños o faltantes): operario notifica irregularidad pausando el pedido.",
              "Requisitos y Tecnología: Interfaz operativa simplificada apta para tablets/PCs en almacén con red WiFi local.",
            ],
          },
          {
            subtitulo: "CU4 – Registrar Retiro y Despacho",
            items: [
              "Actor Principal: Personal de Depósito (Intranet).",
              "Precondición: Pedido en estado 'Listo para Retiro' y documentación comercial aprobada.",
              "Postcondición: Pedido en estado 'Entregado', emisión de Remito y baja definitiva de stock.",
            ],
            detalle: [
              "Escenario de éxito: 1) Operario busca pedido por código de seguimiento; 2) Sistema valida estado y comprobante; 3) Operario registra entrega física y datos del receptor (cliente o fletero); 4) Sistema descuenta stock definitivamente, emite Remito y marca 'Entregado'.",
              "Extensiones: 1a. Documentación inválida o inexistente: sistema alerta para denegar la entrega física.",
              "Requisitos y Tecnología: Trazabilidad estricta (fecha, hora y operario responsable) y soporte para lectores QR/código de barras.",
            ],
          },
          {
            subtitulo: "CU5 – Consultar Estado de Pedido",
            items: [
              "Actor Principal: Cliente (Portal Público).",
              "Precondición: El cliente posee el código de seguimiento generado tras confirmar su pedido.",
              "Postcondición: Se despliega el estado logístico actual y el detalle de materiales.",
            ],
            detalle: [
              "Escenario de éxito: 1) Cliente accede a Seguimiento Web; 2) Sistema solicita código; 3) Cliente ingresa código; 4) Sistema busca y muestra estado ('Confirmado', 'En Preparación', 'Listo para Retiro' o 'Entregado') y sucursal.",
              "Extensiones: 3a. Código inválido o inexistente: informa el error y solicita reingreso.",
              "Requisitos y Tecnología: Respuesta menor a 2 segundos en consulta pública sin necesidad de login.",
            ],
          },
          {
            subtitulo: "CU6 – Gestionar Catálogo e Inventario",
            items: [
              "Actor Principal: Administrador / Personal de Ventas (Intranet).",
              "Precondición: Usuario autenticado en Intranet con permisos de edición de catálogo.",
              "Postcondición: Se actualizan precios y existencias disponibles en el catálogo público.",
            ],
            detalle: [
              "Escenario de éxito: 1) Administrador ingresa a Gestión de Catálogo; 2) Sistema despliega tabla de productos, precios y stock; 3) Modifica precio o stock disponible y guarda; 4) Sistema valida valores numéricos no negativos; 5) Actualiza BD y confirma éxito.",
              "Extensiones: 3a. Datos inválidos (valores negativos o texto): rechaza la operación y muestra alerta de validación.",
              "Requisitos y Tecnología: Control de acceso estricto (sesión activa) para evitar modificaciones no autorizadas.",
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/casos-uso.png",
            pie: "Diagrama General de Casos de Uso UML",
          },
          {
            src: "/diagramas/prototipo-cu1.png",
            pie: "Prototipo No Operacional 1 – Cotización Web (CU1)",
          },
          {
            src: "/diagramas/prototipo-cu2.png",
            pie: "Prototipo No Operacional 2 – Confirmación de Pedido (CU2)",
          },
          {
            src: "/diagramas/prototipo-cu3.png",
            pie: "Prototipo No Operacional 3 – Panel de Depósito (CU3)",
          },
          {
            src: "/diagramas/prototipo-cu4.png",
            pie: "Prototipo No Operacional 4 – Despacho y Entrega (CU4)",
          },
          {
            src: "/diagramas/prototipo-cu5.png",
            pie: "Prototipo No Operacional 5 – Seguimiento de Pedido (CU5)",
          },
          {
            src: "/diagramas/prototipo-cu6.png",
            pie: "Prototipo No Operacional 6 – Gestión de Catálogo (CU6)",
          },
        ],
      },
    ],
  },
  elaboracion: {
    titulo: "2. Fase de Elaboración",
    expositor: "Bloque 2",
    subtitulo:
      "Modelado conceptual, secuencias, contratos, estados, análisis BCE y viabilidad",
    temas: [
      {
        nombre: "Modelo del Dominio",
        bloques: [
          {
            subtitulo: "Clases Conceptuales Centrales",
            items: [
              "Núcleo comercial: Cliente, Cotizacion, DetalleCotizacion, Pedido, LineaPedido, ComprobantePago y Remito.",
              "Núcleo de inventario: Producto, StockInventario y Sucursal.",
            ],
            detalle: [
              "Resolución de relaciones N a N: se incorporan DetalleCotizacion y LineaPedido como clases asociativas para registrar cantidades exactas y precios históricos por ítem.",
              "Matriz de asociaciones: cada relación entre clases está respaldada por su multiplicidad exacta y las reglas de negocio que la gobiernan.",
              "Pureza conceptual: se excluyen pantallas, controladores y tablas SQL, modelando únicamente conceptos del dominio real.",
            ],
          },
          {
            subtitulo: "Decisiones de Modelado",
            items: [
              "Separación entre Cotización (temporal, 72 hs) y Pedido (confirmado con compromiso de entrega).",
              "Control explícito de unidades de medida (bolsas, m², varillas, palets) para evitar errores de fraccionamiento.",
            ],
            detalle: [
              "Por qué separar Cotización de Pedido: una cotización puede vencer o rechazarse sin comprometer la logística; el Pedido nace recién con la aprobación.",
              "Gestión de unidades de medida: resuelve la complejidad del corralón donde coexisten ventas por unidad suelta (ladrillos) y por bulto o fraccionamiento (bolsas, metros, palets).",
              "Stock por sucursal: StockInventario vincula Producto con Sucursal diferenciando cantidad física total disponible de cantidad reservada.",
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/dominio.png",
            pie: "Modelo del Dominio UML",
          },
        ],
      },
      {
        nombre: "Diagramas de Secuencia (DSS)",
        bloques: [
          {
            subtitulo: "DSS 1 – Solicitar Cotización Web",
            items: [
              "Participantes: :Cliente → :SistemaWebRosso (caja negra).",
              "Eventos: seleccionarProductos(), ingresarDatosCliente(datos, sucursal) → retorna Presupuesto (72 hs).",
            ],
            detalle: [
              "Barras de activación: barra continua en :Cliente durante la sesión y barras puntuales en :SistemaWebRosso por cada evento.",
              "Valida stock disponible en tiempo real antes de calcular totales y emitir el código de cotización.",
            ],
          },
          {
            subtitulo: "DSS 2 – Aprobar Presupuesto y Pedido",
            items: [
              "Participantes: :Cliente → :SistemaWebRosso.",
              "Eventos: aprobarPresupuesto(nroCotizacion), confirmarEntregaYPago(modalidad, pago) → retorna Orden de Pedido.",
            ],
            detalle: [
              "Verifica vigencia del plazo de 72 horas, crea la instancia de Pedido y ejecuta la reserva lógica de inventario.",
            ],
          },
          {
            subtitulo: "DSS 3 – Preparación en Depósito",
            items: [
              "Participantes: :PersonalDeposito → :SistemaWebRosso.",
              "Eventos: consultarPedidosPendientes(sucursalId), iniciarPreparacion(idPedido), marcarListoParaRetiro(idPedido).",
            ],
            detalle: [
              "Refleja exclusivamente el trabajo interno de almacén (picking), separado temporalmente del momento en que retira el cliente o fletero.",
            ],
          },
          {
            subtitulo: "DSS 4 – Registrar Retiro y Despacho",
            items: [
              "Participantes: :PersonalDeposito → :SistemaWebRosso.",
              "Eventos: buscarPedidoPorCodigo(codigo), registrarDespachoYRetiro(idPedido, datosReceptor) → emite Remito.",
            ],
            detalle: [
              "Incluye la acción interna descontarStockDefinitivo() una vez validada la documentación comercial.",
            ],
          },
          {
            subtitulo: "DSS 5 – Consultar Estado de Pedido",
            items: [
              "Participantes: :Cliente → :SistemaWebRosso.",
              "Eventos: consultarEstadoPedido(codigoSeguimiento) → retorna estado actual y detalle.",
            ],
            detalle: [
              "Interacción de consulta pura sin modificación de estado en el Modelo del Dominio.",
            ],
          },
          {
            subtitulo: "DSS 6 – Gestionar Catálogo e Inventario",
            items: [
              "Participantes: :Administrador → :SistemaWebRosso.",
              "Eventos: obtenerCatalogo(sucursalId), guardarCambiosInventario(sucursalId, codProd, precio, stock).",
            ],
            detalle: [
              "Permite actualizar precios unitarios y cantidades físicas disponibles manteniendo intactas las reservas activas.",
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/dss-1.png",
            pie: "DSS 1 – Solicitar Cotización Web",
          },
          {
            src: "/diagramas/dss-2.png",
            pie: "DSS 2 – Aprobar Presupuesto y Registrar Pedido",
          },
          {
            src: "/diagramas/dss-3.png",
            pie: "DSS 3 – Gestionar Preparación en Depósito",
          },
          {
            src: "/diagramas/dss-4.png",
            pie: "DSS 4 – Registrar Retiro y Despacho",
          },
          {
            src: "/diagramas/dss-5.png",
            pie: "DSS 5 – Consultar Estado de Pedido",
          },
          {
            src: "/diagramas/dss-6.png",
            pie: "DSS 6 – Gestionar Catálogo e Inventario",
          },
        ],
      },
      {
        nombre: "Contratos de Operación",
        bloques: [
          {
            subtitulo: "Contrato 1 – generarPresupuestoWeb",
            items: [
              "Referencia: CU1 – Solicitar Cotización Web.",
              "Efecto: Crea instancia 'cot' de Cotizacion con validez de 72 horas y sus DetalleCotizacion.",
            ],
            detalle: [
              "Precondiciones: Existen instancias válidas de Producto y StockInventario en la Sucursal con cantidadDisponible >= cantidadSolicitada.",
              "Postcondiciones: Se creó 'cot' (Cotizacion) con fechaEmision, fechaVencimiento = fechaActual + 72 horas, estado = 'Emitida'. Se crearon instancias de DetalleCotizacion asociadas a 'cot' y 'prod'. Se asoció 'cot' con Cliente.",
            ],
          },
          {
            subtitulo: "Contrato 2 – confirmarPedidoYReservarStock",
            items: [
              "Referencia: CU2 – Aprobar Presupuesto y Registrar Pedido.",
              "Efecto: Crea Pedido ('Confirmado'), ComprobantePago y reserva lógicamente StockInventario.",
            ],
            detalle: [
              "Precondiciones: Existe 'cot' en estado 'Emitida' y fechaActual <= cot.fechaVencimiento. Stock disponible sigue siendo suficiente.",
              "Postcondiciones: Se creó Pedido 'p' (estado = 'Confirmado', modalidadEntrega) y LineaPedido por cada detalle. Se creó ComprobantePago asociado a 'p'. En StockInventario: cantidadDisponible -= cantidad y cantidadReservada += cantidad.",
            ],
          },
          {
            subtitulo: "Contrato 3 – marcarPedidoListoParaRetiro",
            items: [
              "Referencia: CU3 – Gestionar Preparación en Depósito.",
              "Efecto: Modifica el atributo estado del Pedido 'p' a 'Listo para Retiro'.",
            ],
            detalle: [
              "Precondiciones: Existe un Pedido 'p' en estado 'En Preparación' y los materiales físicos recolectados coinciden con las LineaPedido.",
              "Postcondiciones: No se crearon ni eliminaron instancias. Se modificó p.estado = 'Listo para Retiro'.",
            ],
          },
          {
            subtitulo: "Contrato 4 – registrarDespachoYRetiro",
            items: [
              "Referencia: CU4 – Registrar Retiro y Despacho.",
              "Efecto: Cambia Pedido a 'Entregado', crea Remito 'r' y descuenta cantidadReservada.",
            ],
            detalle: [
              "Precondiciones: Existe Pedido 'p' en estado 'Listo para Retiro' con ComprobantePago aprobado.",
              "Postcondiciones: Se modificó p.estado = 'Entregado'. Se creó Remito 'r' (numeroRemito, fechaEmision, estadoEntrega = 'Despachado', observaciones = datosReceptor) asociado a 'p' y PersonalDeposito. En StockInventario: cantidadReservada -= cantidad.",
            ],
          },
          {
            subtitulo: "Contrato 5 – consultarEstadoPedido",
            items: [
              "Referencia: CU5 – Consultar Estado de Pedido.",
              "Efecto: Operación de solo lectura (no modifica instancias, atributos ni asociaciones).",
            ],
            detalle: [
              "Precondiciones: Existe una instancia 'p' de Pedido asociada al codigoSeguimiento ingresado.",
              "Postcondiciones: No se crearon ni eliminaron instancias ni se modificaron atributos o asociaciones en el Modelo del Dominio (consulta pura).",
            ],
          },
          {
            subtitulo: "Contrato 6 – guardarCambiosInventario",
            items: [
              "Referencia: CU6 – Gestionar Catálogo e Inventario.",
              "Efecto: Actualiza precioUnitarioVenta en Producto y cantidadDisponible en StockInventario.",
            ],
            detalle: [
              "Precondiciones: Administrador 'admin' con sesión activa. Existen Sucursal 's', Producto 'prod' y StockInventario 'si' asociados. Valores nuevoPrecio >= 0 y nuevoStock >= 0.",
              "Postcondiciones: Se modificó prod.precioUnitarioVenta = nuevoPrecio y si.cantidadDisponible = nuevoStock. Se conservaron sin cambios las asociaciones y si.cantidadReservada.",
            ],
          },
        ],
        imagenes: [],
      },
      {
        nombre: "Transición de Estados",
        bloques: [
          {
            subtitulo: "Objeto de Estudio: Pedido",
            items: [
              "Estados del ciclo de vida: Confirmado → En Preparación → Listo para Retiro → Entregado (Estado Final).",
              "El objeto Pedido nace exclusivamente cuando el cliente aprueba una cotización previa.",
            ],
            detalle: [
              "Justificación teórica: mientras el cliente solo solicita precios, la entidad existente es Cotizacion; el Pedido se instancia recién al confirmarse la operación y reservarse el stock.",
              "Asegura trazabilidad 1 a 1 con los Contratos 2, 3 y 4 y con los botones operativos del prototipo funcional.",
            ],
          },
          {
            subtitulo: "Tabla de Transiciones UML",
            items: [
              "(Inicial) → Confirmado: aprobarPresupuesto(nroCot) / crearPedido(), reservarStock().",
              "Confirmado → En Preparación → Listo para Retiro → Entregado.",
            ],
            detalle: [
              "Transición 1: [Inicial] aprobarPresupuesto(numeroCotizacion) / crearPedido(), reservarStock() → Confirmado.",
              "Transición 2: iniciarPreparacion() / notificarDeposito() → En Preparación (Actividad interna: do / realizar picking físico de materiales).",
              "Transición 3: finalizarPicking() / emitirRemito() → Listo para Retiro.",
              "Transición 4: registrarEntrega() / descontarStockDefinitivo() → Entregado (Estado Final).",
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/estados.png",
            pie: "Diagrama de Transición de Estados (Objeto: Pedido)",
          },
        ],
      },
      {
        nombre: "Modelo de Análisis (BCE)",
        bloques: [
          {
            subtitulo: "BCE 1 – Solicitar Cotización Web",
            items: [
              "Borde: :UI Catálogo y Cotización | Control: :Coordinador de Cotización.",
              "Entidades: :Cliente, :Producto, :StockInventario, :Cotizacion.",
            ],
            detalle: [
              "Abre la caja negra del DSS 1 validando la especificación del CU1 mediante los estereotipos de Jacobson (Boundary, Control, Entity).",
              "El coordinador consulta precios en :Producto, verifica existencias en :StockInventario y genera :Cotizacion.",
            ],
          },
          {
            subtitulo: "BCE 2 – Aprobar Presupuesto y Pedido",
            items: [
              "Borde: :UI Confirmación de Pedido | Control: :Coordinador de Pedidos.",
              "Entidades: :Cotizacion, :Pedido, :ComprobantePago, :StockInventario.",
            ],
            detalle: [
              "Valida la vigencia de :Cotizacion, instancia :Pedido y :ComprobantePago, y actualiza la reserva lógica en :StockInventario.",
            ],
          },
          {
            subtitulo: "BCE 3 – Preparación en Depósito",
            items: [
              "Borde: :UI Panel de Depósito | Control: :Coordinador de Preparación.",
              "Entidades: :Pedido, :LineaPedido.",
            ],
            detalle: [
              "El operario consulta los pedidos confirmados, lee el detalle de materiales en :LineaPedido y actualiza el estado en :Pedido.",
            ],
          },
          {
            subtitulo: "BCE 4 – Registrar Retiro y Despacho",
            items: [
              "Borde: :UI Despacho y Entrega | Control: :Coordinador de Despacho.",
              "Entidades: :Pedido, :Remito, :StockInventario.",
            ],
            detalle: [
              "Verifica el estado del :Pedido, emite la instancia de :Remito y asienta la salida definitiva en :StockInventario.",
            ],
          },
          {
            subtitulo: "BCE 5 – Consultar Estado de Pedido",
            items: [
              "Borde: :UI Seguimiento Web | Control: :Coordinador de Seguimiento.",
              "Entidades: :Pedido, :LineaPedido, :Sucursal.",
            ],
            detalle: [
              "Recupera el estado actual del :Pedido junto con su detalle y sucursal de retiro para mostrarlo al :Cliente.",
            ],
          },
          {
            subtitulo: "BCE 6 – Gestionar Catálogo e Inventario",
            items: [
              "Borde: :UI Gestión de Catálogo | Control: :Coordinador de Catálogo.",
              "Entidades: :Producto, :StockInventario, :Sucursal.",
            ],
            detalle: [
              "El :Administrador modifica valores a través de :UI Gestión de Catálogo, y el coordinador persiste los cambios en :Producto y :StockInventario.",
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/bce-1.png",
            pie: "Modelo de Análisis BCE – CU1 Cotización Web",
          },
          {
            src: "/diagramas/bce-2.png",
            pie: "Modelo de Análisis BCE – CU2 Aprobar Pedido",
          },
          {
            src: "/diagramas/bce-3.png",
            pie: "Modelo de Análisis BCE – CU3 Preparación en Depósito",
          },
          {
            src: "/diagramas/bce-4.png",
            pie: "Modelo de Análisis BCE – CU4 Retiro y Despacho",
          },
          {
            src: "/diagramas/bce-5.png",
            pie: "Modelo de Análisis BCE – CU5 Seguimiento de Pedido",
          },
          {
            src: "/diagramas/bce-6.png",
            pie: "Modelo de Análisis BCE – CU6 Gestión de Catálogo",
          },
        ],
      },
      {
        nombre: "Viabilidad y Gantt",
        bloques: [
          {
            subtitulo: "Viabilidad Técnica y Operacional",
            items: [
              "Técnica: arquitectura web liviana (React + Node.js) compatible con terminales actuales y lectores QR/barras.",
              "Operacional: interfaces diferenciadas por rol con curva de aprendizaje mínima para Ventas y Depósito.",
            ],
            detalle: [
              "Infraestructura requerida: servidores cloud de alta disponibilidad, PCs estándar en mostrador/depósito y lectores para validar remitos.",
              "Adopción operacional: respaldada por las entrevistas de Fase 1; cada empleado opera únicamente su módulo correspondiente.",
              "Gestión de riesgos: mitigación de sobreventa mediante reserva lógica a 72 hs y validación temprana con prototipos.",
            ],
          },
          {
            subtitulo: "Viabilidad Económica y Cronograma",
            items: [
              "Inversión desglosada en hardware ($7.290.000), software ($725.000) y equipo de desarrollo ($9.300.000 a dedicación parcial en 3 meses).",
              "Planificación estructurada en GanttProject siguiendo las 4 fases del Proceso Unificado.",
            ],
            detalle: [
              "Criterio de costos de personal ($9.300.000): las horas presupuestadas reflejan dedicación parcial del equipo distribuida en los 3 meses de desarrollo.",
              "Cronograma real UP: Inicio (18/05 – 23/09), Elaboración (24/09 – 14/11), Construcción (16/11 – 04/12) y Transición (07/12 – 18/12).",
              "Marco de Desarrollo: matriz de disciplinas mostrando creación (c) y refinamiento (r) iterativo.",
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/gantt.png",
            pie: "Diagrama de Gantt del Proyecto (Proceso Unificado)",
          },
        ],
      },
    ],
  },
  construccion: {
    titulo: "3. Fase de Construcción",
    expositor: "Bloque 3",
    subtitulo:
      "Validación funcional mediante prototipo web interactivo (React + Tailwind)",
    temas: [
      {
        nombre: "Demostración en Vivo",
        bloques: [
          {
            subtitulo: "Flujo 1: Portal Público (Cliente)",
            items: [
              "Navegación por catálogo con control de cantidades, generación de presupuesto (CU1) y aprobación con modalidad de retiro (CU2).",
              "Consulta en tiempo real del avance del pedido mediante código de seguimiento (CU5).",
            ],
            detalle: [
              "Paso 1 en vivo: seleccionar materiales en el catálogo, completar datos del cliente y generar presupuesto.",
              "Paso 2 en vivo: verificar cálculo de totales, validez de 72 hs y confirmar el pedido eligiendo Retiro Personal o Fletero Externo.",
              "Acceso directo con mando: presionar botón [X] para saltar al Portal Cliente (/).",
            ],
          },
          {
            subtitulo: "Flujo 2: Intranet (Empleados)",
            items: [
              "Gestión de cola de pedidos en Depósito: inicio de picking y marcado como listo (CU3).",
              "Validación de despacho con baja definitiva de inventario (CU4) y edición de precios/stock (CU6).",
            ],
            detalle: [
              'Paso 3 en vivo: ingresar a Acceso Empleados → Gestión de Depósito, tomar el pedido confirmado y pasarlo a "Listo para Retiro".',
              "Paso 4 en vivo: ingresar a Despacho y Logística, validar el código y confirmar la entrega con descuento real de stock.",
              "Acceso directo con mando: presionar botón [Y] para saltar a la Intranet (/intranet).",
            ],
          },
        ],
        esDemo: true,
        imagenes: [],
      },
    ],
  },
  transicion: {
    titulo: "4. Fase de Transición",
    expositor: "Bloque 3",
    subtitulo: "Impacto operacional esperado, despliegue y cierre del proyecto",
    temas: [
      {
        nombre: "Impacto y Conclusiones",
        bloques: [
          {
            subtitulo: "Transformación Operativa (As-Is vs. To-Be)",
            items: [
              "Reducción drástica de tiempos muertos en mostrador mediante presupuestos web inmediatos.",
              "Eliminación de diferencias de inventario gracias a la reserva lógica a 72 hs y el descuento controlado en despacho.",
            ],
            detalle: [
              "Antes (As-Is): presupuestos en papel/WhatsApp, demoras por llamadas a depósito y riesgo de vender stock ya comprometido.",
              "Después (To-Be): autogestión web 24/7, cola digital ordenada para operarios de almacén y trazabilidad completa hasta el remito.",
              "Trazabilidad académica: coherencia verificada de punta a punta desde el BPD hasta el prototipo funcional.",
            ],
          },
          {
            subtitulo: "Lineamientos de Puesta en Marcha",
            items: [
              "Capacitación focalizada de 2 semanas para el personal de Ventas y Almacén.",
              "Despliegue progresivo por sucursal con respaldo de documentación técnica y manuales de usuario.",
            ],
            detalle: [
              "Estrategia de implantación: puesta en marcha piloto en casa central Tucumán antes de extender a las sucursales de Salta.",
              "Acompañamiento al usuario: entrega de manuales operativos por rol y soporte intensivo durante las primeras dos semanas.",
              "Aval institucional: proyecto respaldado mediante nota formal firmada por Responsable de Recursos Humanos de Rosso Hnos. S.A.",
            ],
          },
        ],
        imagenes: [],
      },
    ],
  },
};

export default function PresentacionTFI() {
  const [faseKey, setFaseKey] = useState("inicio");
  const [temaIdx, setTemaIdx] = useState(0);
  const [foco, setFoco] = useState("bloque"); // 'bloque' | 'imagen'
  const [bloqueIdx, setBloqueIdx] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(null); // null | 'bloque' | 'imagen'
  const [errorImagen, setErrorImagen] = useState(false);

  const navigate = useNavigate();
  const bloqueRefs = useRef([]);

  const faseActual = FASES[faseKey];
  const temaActual = faseActual.temas[temaIdx] || faseActual.temas[0];
  const bloquesActuales = temaActual.bloques || [];
  const bloqueActivo = bloquesActuales[bloqueIdx] || bloquesActuales[0];

  const imagenesActuales = temaActual.imagenes || [];
  const tieneImagenes = imagenesActuales.length > 0;
  const imagenActiva = imagenesActuales[imgIdx] || imagenesActuales[0];

  const keysFases = Object.keys(FASES);

  // Reinicia el estado de error al cambiar de fase, tema o imagen del carrusel
  useEffect(() => {
    setErrorImagen(false);
  }, [faseKey, temaIdx, imgIdx]);

  // Hace scroll suave hacia el recuadro seleccionado cuando hay muchos bloques (ej. CU 1-6)
  useEffect(() => {
    if (foco === "bloque" && bloqueRefs.current[bloqueIdx]) {
      bloqueRefs.current[bloqueIdx].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [bloqueIdx, foco]);

  const cambiarFase = (nuevaFase) => {
    setFaseKey(nuevaFase);
    setTemaIdx(0);
    setFoco("bloque");
    setBloqueIdx(0);
    setImgIdx(0);
    setModalAbierto(null);
  };

  const cambiarTema = (nuevoIdx) => {
    setTemaIdx(nuevoIdx);
    setFoco("bloque");
    setBloqueIdx(0);
    setImgIdx(0);
    setModalAbierto(null);
  };

  const mandoConectado = useXboxNav({
    onSiguientePaso: () => {
      setModalAbierto(null);
      setFoco("bloque");
      setBloqueIdx(0);
      setImgIdx(0);
      if (temaIdx < faseActual.temas.length - 1) {
        setTemaIdx(temaIdx + 1);
      } else {
        const fIdx = keysFases.indexOf(faseKey);
        if (fIdx < keysFases.length - 1) {
          cambiarFase(keysFases[fIdx + 1]);
        }
      }
    },
    onPasoAnterior: () => {
      setModalAbierto(null);
      setFoco("bloque");
      setBloqueIdx(0);
      setImgIdx(0);
      if (temaIdx > 0) {
        setTemaIdx(temaIdx - 1);
      } else {
        const fIdx = keysFases.indexOf(faseKey);
        if (fIdx > 0) {
          const faseAnt = keysFases[fIdx - 1];
          setFaseKey(faseAnt);
          setTemaIdx(FASES[faseAnt].temas.length - 1);
        }
      }
    },
    onAbajo: () => {
      if (modalAbierto === "imagen" && imagenesActuales.length > 1) {
        setImgIdx((prev) =>
          prev < imagenesActuales.length - 1 ? prev + 1 : 0,
        );
        return;
      }
      if (modalAbierto) return;

      if (foco === "imagen") {
        if (imagenesActuales.length > 1) {
          setImgIdx((prev) =>
            prev < imagenesActuales.length - 1 ? prev + 1 : 0,
          );
        } else {
          setFoco("bloque");
          setBloqueIdx(0);
        }
      } else {
        setBloqueIdx((prev) =>
          prev < bloquesActuales.length - 1 ? prev + 1 : 0,
        );
      }
    },
    onArriba: () => {
      if (modalAbierto === "imagen" && imagenesActuales.length > 1) {
        setImgIdx((prev) =>
          prev > 0 ? prev - 1 : imagenesActuales.length - 1,
        );
        return;
      }
      if (modalAbierto) return;

      if (foco === "imagen") {
        if (imagenesActuales.length > 1) {
          setImgIdx((prev) =>
            prev > 0 ? prev - 1 : imagenesActuales.length - 1,
          );
        } else {
          setFoco("bloque");
          setBloqueIdx(bloquesActuales.length - 1);
        }
      } else {
        setBloqueIdx((prev) =>
          prev > 0 ? prev - 1 : bloquesActuales.length - 1,
        );
      }
    },
    onDerecha: () => {
      if (modalAbierto === "imagen" && imagenesActuales.length > 1) {
        setImgIdx((prev) =>
          prev < imagenesActuales.length - 1 ? prev + 1 : 0,
        );
        return;
      }
      if (modalAbierto) return;

      if (tieneImagenes) {
        setFoco("imagen");
      } else if (bloqueIdx < bloquesActuales.length - 1) {
        setFoco("bloque");
        setBloqueIdx(bloqueIdx + 1);
      }
    },
    onIzquierda: () => {
      if (modalAbierto === "imagen" && imagenesActuales.length > 1) {
        setImgIdx((prev) =>
          prev > 0 ? prev - 1 : imagenesActuales.length - 1,
        );
        return;
      }
      if (modalAbierto) return;

      if (foco === "imagen") {
        setFoco("bloque");
      } else if (!tieneImagenes && bloqueIdx > 0) {
        setBloqueIdx(bloqueIdx - 1);
      }
    },
    onPrevFase: () => {
      const i = keysFases.indexOf(faseKey);
      if (i > 0) cambiarFase(keysFases[i - 1]);
    },
    onNextFase: () => {
      const i = keysFases.indexOf(faseKey);
      if (i < keysFases.length - 1) cambiarFase(keysFases[i + 1]);
    },
    onAccionA: () => {
      if (modalAbierto) {
        setModalAbierto(null);
      } else if (foco === "imagen" && tieneImagenes) {
        setModalAbierto("imagen");
      } else {
        setModalAbierto("bloque");
      }
    },
    onCerrarModal: () => setModalAbierto(null),
    onIrCliente: () => navigate("/"),
    onIrIntranet: () => navigate("/intranet"),
  });

  return (
    <div className="w-full max-w-7xl mx-auto space-y-3">
      {/* Cabecera de Navegación Principal */}
      <div className="bg-white rounded-xl shadow-md border-t-4 border-red-700 overflow-hidden">
        <div className="bg-gray-900 text-white px-3 md:px-4 py-2.5 flex flex-wrap gap-2 justify-between items-center">
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {Object.entries(FASES).map(([key, data]) => (
              <button
                key={key}
                onClick={() => cambiarFase(key)}
                className={`px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-bold transition ${
                  faseKey === key
                    ? "bg-red-600 text-white shadow"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {data.titulo}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs bg-gray-800 border border-gray-700 text-gray-300 px-2.5 py-1 rounded-full">
              {faseActual.expositor} • Rosso Hnos. S.A.
            </span>
            {mandoConectado && (
              <span className="text-xs bg-green-900/80 border border-green-500 text-green-200 px-2.5 py-1 rounded-full font-semibold">
                ● Mando activo
              </span>
            )}
          </div>
        </div>

        {/* Subtítulo + Pestañas horizontales de temas */}
        <div className="px-4 md:px-6 py-2.5 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="shrink-0">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 leading-tight">
              {faseActual.titulo}
            </h2>
            <p className="text-xs text-gray-500">{faseActual.subtitulo}</p>
          </div>

          <div className="flex flex-wrap gap-1.5 md:justify-end">
            {faseActual.temas.map((tema, idx) => (
              <button
                key={tema.nombre}
                onClick={() => cambiarTema(idx)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                  temaIdx === idx
                    ? "bg-red-700 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {tema.nombre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Área de Contenido: 2 columnas desde md: (768px) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* TARJETA IZQUIERDA (Sub-recuadros navegables con scroll interno) */}
        <div
          className={`bg-white rounded-xl p-4 md:p-5 border border-gray-200 shadow-md flex flex-col justify-between ${
            tieneImagenes ? "md:col-span-5" : "md:col-span-12"
          }`}
        >
          <div>
            <div className="border-b pb-2 mb-3 flex items-center justify-between gap-2">
              <h3 className="text-base md:text-lg font-bold text-gray-800">
                {temaActual.nombre}
              </h3>
              <span className="text-[11px] text-gray-400 shrink-0">
                Stick ↑↓ ({bloqueIdx + 1}/{bloquesActuales.length}) • [A]
                Detalle
              </span>
            </div>

            <div
              className={`grid gap-3 md:max-h-[56vh] md:overflow-y-auto p-1 ${
                tieneImagenes ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {bloquesActuales.map((bloque, bIdx) => {
                const estaSeleccionado =
                  foco === "bloque" && bloqueIdx === bIdx;
                return (
                  <div
                    key={bIdx}
                    ref={(el) => (bloqueRefs.current[bIdx] = el)}
                    onClick={() => {
                      setFoco("bloque");
                      setBloqueIdx(bIdx);
                      setModalAbierto("bloque");
                    }}
                    className={`rounded-xl p-3.5 md:p-4 cursor-pointer transition-all duration-200 ${
                      estaSeleccionado
                        ? "bg-red-50/40 ring-2 md:ring-4 ring-red-600 border-2 border-red-600 shadow-md"
                        : "bg-gray-50 border border-gray-200 hover:border-gray-300 opacity-85 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h4 className="text-xs md:text-sm font-bold text-red-700 uppercase tracking-wide">
                        {bloque.subtitulo}
                      </h4>
                      {estaSeleccionado && (
                        <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-full shrink-0">
                          [A] Ampliar
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1.5">
                      {bloque.items.map((item, iIdx) => (
                        <li
                          key={iIdx}
                          className="flex items-start text-xs md:text-sm text-gray-700 leading-snug"
                        >
                          <span className="text-red-600 font-bold mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Botones de salto al prototipo en Fase 3 */}
          {temaActual.esDemo && (
            <div className="mt-4 pt-3 border-t flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => navigate("/")}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 md:px-5 rounded-lg shadow transition text-xs md:text-sm"
              >
                Abrir Portal Cliente [X] →
              </button>
              <button
                onClick={() => navigate("/intranet")}
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 md:px-5 rounded-lg shadow transition text-xs md:text-sm"
              >
                Abrir Intranet Empleados [Y] →
              </button>
            </div>
          )}
        </div>

        {/* TARJETA DERECHA: Diagrama UML / Carrusel de Imágenes */}
        {tieneImagenes && imagenActiva && (
          <div
            onClick={() => {
              setFoco("imagen");
              setModalAbierto("imagen");
            }}
            className={`md:col-span-7 bg-white rounded-xl p-4 md:p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
              foco === "imagen"
                ? "ring-2 md:ring-4 ring-red-600 border-2 border-red-600 shadow-xl"
                : "border border-gray-200 shadow-md opacity-85 hover:opacity-100"
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2 mb-2 gap-2">
              <span className="text-xs md:text-sm font-bold text-gray-700 truncate">
                {imagenActiva.pie}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                {imagenesActuales.length > 1 && (
                  <span className="text-[11px] font-bold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                    {imgIdx + 1} / {imagenesActuales.length}
                  </span>
                )}
                {foco === "imagen" ? (
                  <span className="text-[10px] md:text-[11px] font-bold bg-red-600 text-white px-2.5 py-0.5 rounded-full">
                    {imagenesActuales.length > 1
                      ? "Stick ↑↓ Cambiar • [A] Zoom ⤢"
                      : "Seleccionado • [A] Ampliar ⤢"}
                  </span>
                ) : (
                  <span className="text-[11px] text-gray-400">
                    Stick Der. →
                  </span>
                )}
              </div>
            </div>

            {/* Selector rápido cuando hay múltiples gráficos/prototipos en la misma pestaña */}
            {imagenesActuales.length > 1 && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-wrap gap-1.5 mb-2.5"
              >
                {imagenesActuales.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => {
                      setFoco("imagen");
                      setImgIdx(idx);
                    }}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition ${
                      imgIdx === idx
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300"
                    }`}
                  >
                    {idx === 0 ? "1. General" : `${idx + 1}. Vista ${idx}`}
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-2 h-[36vh] md:h-[50vh]">
              {!errorImagen ? (
                <img
                  src={imagenActiva.src}
                  alt={imagenActiva.pie}
                  onError={() => setErrorImagen(true)}
                  className="max-h-full max-w-full object-contain rounded"
                />
              ) : (
                <div className="text-center p-4 text-gray-400">
                  <p className="text-sm font-semibold text-gray-500">
                    {imagenActiva.pie}
                  </p>
                  <p className="text-xs mt-1">
                    Guardar archivo en:{" "}
                    <code className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-700">
                      public{imagenActiva.src}
                    </code>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: Detalle Exclusivo del Recuadro Interno Seleccionado (Botón A) */}
      {modalAbierto === "bloque" && bloqueActivo && (
        <div
          onClick={() => setModalAbierto(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl border-t-8 border-red-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8"
          >
            <div className="flex items-start justify-between border-b pb-3 mb-5 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                  {faseActual.titulo} • {temaActual.nombre}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                  {bloqueActivo.subtitulo}
                </h3>
              </div>
              <button
                onClick={() => setModalAbierto(null)}
                className="bg-gray-900 text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-gray-700 shrink-0"
              >
                Cerrar [A / B]
              </button>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 mb-5">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                Síntesis del Apartado
              </h4>
              <ul className="space-y-2">
                {bloqueActivo.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-sm sm:text-base text-gray-800 leading-relaxed"
                  >
                    <span className="text-red-600 font-bold mr-2.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {bloqueActivo.detalle && bloqueActivo.detalle.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-600 rounded-r-xl p-4 sm:p-6">
                <h4 className="text-xs sm:text-sm font-bold text-red-800 uppercase tracking-wide mb-2.5">
                  Desarrollo Detallado y Argumentos de Defensa
                </h4>
                <ul className="space-y-2.5">
                  {bloqueActivo.detalle.map((extra, eIdx) => (
                    <li
                      key={eIdx}
                      className="flex items-start text-sm sm:text-base text-gray-900 leading-relaxed"
                    >
                      <span className="text-red-700 font-bold mr-2.5">▸</span>
                      <span>{extra}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Diagrama / Prototipo a Pantalla Completa (Botón A sobre Imagen) */}
      {modalAbierto === "imagen" && imagenActiva && (
        <div
          onClick={() => setModalAbierto(null)}
          className="fixed inset-0 bg-black/85 z-50 flex flex-col items-center justify-center p-3 sm:p-4 cursor-zoom-out"
        >
          <img
            src={imagenActiva.src}
            alt={imagenActiva.pie}
            className="max-w-full max-h-[85vh] rounded shadow-2xl bg-white p-2"
          />
          <span className="mt-3 text-xs text-gray-200 bg-gray-900/90 px-4 py-1.5 rounded-full text-center">
            {imagenActiva.pie}
            {imagenesActuales.length > 1
              ? ` (${imgIdx + 1}/${imagenesActuales.length} • Stick ↑↓ para cambiar)`
              : ""}{" "}
            • Apretá [A] o [B] para volver
          </span>
        </div>
      )}
    </div>
  );
}
