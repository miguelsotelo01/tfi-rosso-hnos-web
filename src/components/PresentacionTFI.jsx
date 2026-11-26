import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useXboxNav } from "../hooks/useXboxNav";

const FASES = {
  inicio: {
    titulo: "1. Fase de Inicio",
    expositor: "Bloque 1",
    subtitulo:
      "Introducción del proyecto, organización, áreas afectadas, BPD, alcance y casos de uso",
    temas: [
      {
        nombre: "Empresa y Estructura",
        bloques: [
          {
            subtitulo: "Proyecto, Organización y Unidad Rosso Mix",
            items: [
              "Proyecto: sistematización web de cotizaciones, reserva de stock, pedidos y despacho para Rosso Hnos. S.A.",
              "Empresa: comercialización de materiales para construcción en Tucumán y Salta + unidad Rosso Mix (hormigón elaborado).",
            ],
            modalSecciones: [
              {
                titulo: "Qué Hacemos en la Empresa (Propuesta del Proyecto)",
                destacado: false,
                items: [
                  "Objetivo de intervención: Reemplazar la confección manual de presupuestos y la comunicación informal por WhatsApp/teléfono entre Ventas y Depósito por una plataforma web integrada.",
                  "Alcance operativo: Autogestión de cotizaciones web en tiempo real, reserva lógica de inventario por sucursal, preparación en depósito y trazabilidad hasta el retiro.",
                ],
              },
              {
                titulo: "Perfil Organizacional, Misión, Visión y Rosso Mix",
                destacado: true,
                items: [
                  "Actividad principal: Comercialización de materiales para construcción, refacción y decoración en Tucumán y Salta, atendiendo a particulares, albañiles, arquitectos y constructoras.",
                  "Unidad Rosso Mix: División productiva complementaria especializada en hormigón elaborado.",
                  "Misión y Visión: Brindar soluciones integrales con calidad y atención personalizada, consolidándose como referente del NOA por innovación en procesos y logística.",
                ],
              },
            ],
          },
          {
            subtitulo: "Estructura Organizativa y Elicitación",
            items: [
              "Estructura jerárquica-funcional de 5 niveles encabezada por la Gerencia General.",
              "Departamentalización funcional: Gerencias Comercial, Producción Rosso Mix, RR.HH. y Administración y Finanzas.",
            ],
            modalSecciones: [
              {
                titulo:
                  "Configuración Jerárquica y Departamentalización (5 Niveles)",
                destacado: false,
                items: [
                  "Nivel 1 (Gerencia General): Autoridad central (10000/0) acompañada por staff de Asesoría Legal (10000).",
                  "Nivel 2 (Gerencias de Área): Gerencia Comercial (11000/0), Producción Rosso Mix (12000/0), RR.HH. (13000/0) y Administración y Finanzas (14000/0).",
                  "Niveles 3 a 5 (Departamentos, Divisiones y Secciones): Especialización funcional en Ventas, Sistemas, Logística, Almacén, Contabilidad y Programación de Rutas.",
                ],
              },
              {
                titulo: "Técnicas de Elicitación Aplicadas (Anexo A)",
                destacado: true,
                items: [
                  "Entrevistas semiestructuradas: Realizadas al Encargado de Depósito (control físico y picking), Vendedor/Atención al Cliente (nexo comercial) y Transportista/Fletero externo (carga y remitos).",
                  "Observación y análisis documental: Relevamiento de circuitos operativos diarios, registros históricos de inventario y análisis del sitio web institucional actual.",
                ],
              },
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
            subtitulo: "Áreas Directamente Involucradas (8 Sectores)",
            items: [
              "Comercial: Departamento de Ventas y Sucursales, Atención al Cliente, Ventas Mayoristas y Minoristas.",
              "Operaciones y Soporte: Almacén e Inventario, Transporte y Entregas, Programación de Rutas y Sistemas.",
            ],
            modalSecciones: [
              {
                titulo: "Sector Comercial (Gerencia Comercial)",
                destacado: false,
                items: [
                  "Depto. de Ventas y Sucursales (11100/0): Gestiona ventas de productos y coordina la atención comercial diaria en las sucursales.",
                  "División de Atención al Cliente (11130/0): Brinda asesoramiento, responde consultas y realiza seguimiento de presupuestos y pedidos.",
                  "Ventas Mayoristas (11110/0) y Minoristas (11120/0): Administran operaciones de gran volumen (constructoras/profesionales) y compras de clientes particulares respectivamente.",
                ],
              },
              {
                titulo: "Logística, Almacén y Soporte Tecnológico",
                destacado: true,
                items: [
                  "Almacén e Inventario (10110/0): Controla el almacenamiento físico, administra el stock disponible y coordina la preparación (picking) de pedidos.",
                  "Transporte y Entregas (10120/0) y Programación de Rutas (10121/0): Coordinan la distribución a obras y optimizan recorridos logísticos.",
                  "División de Sistemas de Información (10010/0): Administra la infraestructura tecnológica, soporte técnico y mantenimiento del sistema web.",
                ],
              },
            ],
          },
          {
            subtitulo: "Áreas Indirectamente Involucradas (3 Sectores)",
            items: [
              "Administración y Finanzas: Contabilidad y Tesorería y Cobranzas.",
              "Abastecimiento: Compras y Abastecimiento para reposición de stock.",
            ],
            modalSecciones: [
              {
                titulo: "Control Contable y Financiero",
                destacado: false,
                items: [
                  "Contabilidad (14100/0): Registra y controla las operaciones contables vinculadas a las actividades comerciales aprobadas.",
                  "Tesorería y Cobranzas (14110/0): Gestiona cobros, pagos y movimientos financieros asociados a la validación de pedidos.",
                ],
              },
              {
                titulo: "Gestión de Reposición de Materiales",
                destacado: true,
                items: [
                  "Compras y Abastecimiento (11010/0): Utiliza la información de salidas de inventario y rotación de productos para gestionar la reposición ante proveedores.",
                ],
              },
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
            subtitulo: "Flujo Operativo As-Is (5 Procesos)",
            items: [
              "Secuencia actual: Solicitud de Cotización → Verificación de Stock → Presupuesto → Registro/Preparación → Retiro.",
              "Modelado en BPMN con Pool externo CLIENTE y Pool interno ROSSO MATERIALES (carriles VENTAS y DEPÓSITO).",
            ],
            modalSecciones: [
              {
                titulo: "Descomposición de los 5 Procesos Identificados",
                destacado: false,
                items: [
                  "1. Solicitud de Cotización: El cliente consulta precios y disponibilidad por WhatsApp, teléfono, redes o mostrador; la web actual es solo informativa.",
                  "2. Verificación de Stock: Ventas consulta la disponibilidad física en depósito antes de confirmar la cotización.",
                  "3. Generación de Presupuesto: El vendedor confecciona manualmente el presupuesto y lo envía por WhatsApp.",
                  "4. Registro y Preparación del Pedido: Aprobada la cotización y el pago, Ventas registra el pedido y habilita a Depósito para preparar.",
                  "5. Retiro o Coordinación de Transporte: Entrega en sucursal a cliente o fletero externo contra verificación del comprobante.",
                ],
              },
              {
                titulo: "Notación y Flujo del Diagrama BPD",
                destacado: true,
                items: [
                  "Pools y Carriles: Pool CLIENTE (solicitud, aprobación y pago) frente a Pool ROSSO MATERIALES dividido en VENTAS y DEPÓSITO.",
                  "Compuertas Exclusivas (X) y Artefacto de Datos: Evalúan disponibilidad de stock en Ventas y aprobación en Cliente; el registro formal ocurre recién tras aprobarse la compra.",
                ],
              },
            ],
          },
          {
            subtitulo: "Diagnóstico y Cuellos de Botella",
            items: [
              "Fuerte dependencia de tareas manuales y comunicación informal vía WhatsApp o teléfono entre sectores.",
              "Demoras en horarios pico, errores de cálculo y falta de trazabilidad centralizada de pedidos.",
            ],
            modalSecciones: [
              {
                titulo: "Problemas Detectados por Sector (Elicitación)",
                destacado: false,
                items: [
                  "En Ventas: Saturación de consultas simultáneas en horas pico, confección manual de presupuestos y riesgo de errores en precios o cantidades.",
                  "En Depósito: Interrupciones constantes para responder consultas de stock; inexistencia de reserva lógica que expone a comprometer el mismo material dos veces.",
                  "En Logística / Fleteros: Tiempos de espera en sucursal por falta de aviso previo y demoras por direcciones o comprobantes incompletos.",
                ],
              },
              {
                titulo: "Oportunidad de Mejora (Documento Visión)",
                destacado: true,
                items: [
                  "Autogestión Web: Migrar la consulta y cotización hacia una plataforma digital conectada en tiempo real al inventario.",
                  "Integración Ventas–Depósito: Reemplazar la coordinación telefónica por una cola digital de pedidos confirmados con trazabilidad hasta el remito.",
                ],
              },
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
            subtitulo: "Límite del Sistema y Stakeholders",
            items: [
              "Dentro del límite: catálogo web, cotización autogestionada, reserva de stock, preparación y despacho.",
              "Fuera del límite (Ambiente): proveedores de materiales, contabilidad profunda y fleteros externos.",
            ],
            modalSecciones: [
              {
                titulo: "Frontera Funcional (Diagrama de Venn)",
                destacado: false,
                items: [
                  "Alcance incluido: Interacción web para cotizaciones, autogestión y registro de pedidos, control de stock en tiempo real por sucursal y coordinación interna de preparación y retiro.",
                  "Exclusiones explícitas: Facturación y gestión de proveedores, contabilidad general (balances y liquidación de sueldos), producción de hormigón Rosso Mix y gestión operativa de choferes externos.",
                ],
              },
              {
                titulo: "Clasificación de Interesados (Stakeholders)",
                destacado: true,
                items: [
                  "Usuarios Directos: Cliente (portal web), Personal de Ventas / Administrador (catálogo y seguimiento) y Personal de Depósito (picking y despacho).",
                  "Usuarios Indirectos y No Usuarios: Personal de Administración (consulta de comprobantes); equipo técnico del proyecto y Fletero externo (entidad física externa que presenta comprobante al retirar).",
                ],
              },
            ],
          },
          {
            subtitulo: "Reglas del Dominio (RN01 – RN10)",
            items: [
              "RN01 / RN02 / RN10: Consulta obligatoria de stock disponible antes de cotizar y validez de presupuesto por 72 hs.",
              "RN07 / RN08: Modalidad Retiro Personal o Fletero Externo, siempre respaldado por documentación comercial aprobada.",
            ],
            modalSecciones: [
              {
                titulo: "Reglas Comerciales y de Validación de Stock",
                destacado: false,
                items: [
                  "RN01 & RN02 (Política de Ventas e Inventario): Ventas/Sistema recibe solicitudes y valida disponibilidad física antes de gestionar un presupuesto o pedido.",
                  "RN10 (Condición Necesaria): La disponibilidad de materiales constituye una condición estrictamente necesaria para continuar con la operación.",
                  "Vigencia de Presupuesto (72 horas): Todo presupuesto web mantiene precios y condiciones por 72 hs; al aprobarse, se aplica reserva lógica de stock.",
                ],
              },
              {
                titulo: "Reglas de Depósito, Trazabilidad y Despacho",
                destacado: true,
                items: [
                  "RN03, RN04 & RN05: Depósito ejerce el control físico de materiales, prepara pedidos confirmados y mantiene coordinación operativa con Ventas.",
                  "RN06, RN07 & RN08: El cliente elige retiro personal o fletero externo; todo egreso exige documentación comercial aprobada/remito y registra el movimiento en inventario.",
                ],
              },
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
            subtitulo: "Caso de Uso 1: Solicitar Cotización Web",
            items: [
              "Actor principal: Cliente (Representación de el subsistema de Gestión de Catálogo y Cotización Web).",
              "Precondiciones: El cliente debe acceder a la plataforma web. Deben existir materiales y precios actualizados cargados en el inventario para el funcionamiento.",
              "Postcondiciones: Se generará y emitirá una Cotización - Presupuesto Web preliminar detallando precios, descuentos y plazo de validez.",
            ],
            modalSecciones: [
              {
                titulo: "Encabezado, Precondiciones y Postcondiciones",
                destacado: false,
                items: [
                  "Representación de el subsistema de Gestión de Catálogo y Cotización Web.",
                  "Nombre: Solicitar Cotización Web.",
                  "Actor principal: Cliente.",
                  "Precondiciones: El cliente debe acceder a la plataforma web. Deben existir materiales y precios actualizados cargados en el inventario para el funcionamiento.",
                  "Postcondiciones: Se generará y emitirá una Cotización - Presupuesto Web preliminar detallando precios, descuentos y plazo de validez.",
                ],
              },
              {
                titulo: "Escenario de éxito",
                destacado: true,
                items: [
                  "1. Este caso de uso comienza cuando el Cliente ingresa al sitio web y consulta el Catalogo.",
                  "2. El Sistema despliega el catálogo con los stocks correspondientes de los productos.",
                  "3. El cliente selecciona los productos para ser cotizados.",
                  '4. El sistema consulta en tiempo real la disponibilidad de stock de los materiales solicitados en la base de datos "Inventario".',
                  "5. El sistema valida la disponibilidad física (condición necesaria).",
                  "6. El Cliente ingresa sus datos de contacto (Nombre, Apellido, CUIT/DNI, Teléfono, Correo Electrónico) y selecciona la sucursal de referencia.",
                  "7. El sistema calcula los precios totales y genera el presupuesto.",
                  "8. El sistema emite y envía el Presupuesto Web al cliente.",
                  "9. Finaliza la sesión de cotización.",
                ],
              },
              {
                titulo:
                  "Flujo alternativo, Requisitos especiales y Lista de tecnología",
                destacado: false,
                items: [
                  "Flujo alternativo: El sistema falla, se pierde la conectividad o la energía eléctrica: conserva lo ya seleccionado y se retoma al restablecerse el servicio.",
                  "Flujo alternativo — 4a. Falta de stock físico: Si no hay disponibilidad de un material, el sistema informa la falta de stock y no permite presupuestar ese artículo.",
                  "Requisitos especiales: El sistema debe soportar alta concurrencia de clientes simultáneos sin presentar demoras (rendimiento).",
                  "Lista de tecnología: Interfaz Web (Frontend responsivo para celulares y PC), Servidor Backend, Base de Datos para inventario en tiempo real.",
                ],
              },
            ],
          },
          {
            subtitulo: "Caso de Uso 2: Aprobar Presupuesto y Registrar Pedido",
            items: [
              "Actor principal: Cliente (Autogestión) (Representación de el subsistema de Gestión y Registro de Pedidos).",
              "Precondiciones: Existe un presupuesto web vigente emitido previamente para el cliente en referencia al caso 1.",
              'Postcondiciones: El estado del pedido se actualiza a "Confirmado / Pendiente de preparación". Se establece una reserva lógica sobre el stock.',
            ],
            modalSecciones: [
              {
                titulo: "Encabezado, Precondiciones y Postcondiciones",
                destacado: false,
                items: [
                  "Representación de el subsistema de Gestión y Registro de Pedidos.",
                  "Nombre: Aprobar Presupuesto y Registrar Pedido.",
                  "Actor principal: Cliente (Autogestión).",
                  "Precondiciones: Existe un presupuesto web vigente emitido previamente para el cliente en referencia al caso 1.",
                  'Postcondiciones: El estado del pedido se actualiza a "Confirmado / Pendiente de preparación". Se establece una reserva lógica sobre el stock.',
                ],
              },
              {
                titulo: "Escenario de éxito",
                destacado: true,
                items: [
                  "1. Este caso de uso comienza cuando el Cliente aprueba la cotización.",
                  "2. El sistema solicita definir la modalidad de entrega y los datos de pago.",
                  "3. El Cliente selecciona la modalidad de entrega e ingresa los datos del comprobante de pago.",
                  '4. El sistema verifica y reserva lógicamente el stock en el sistema de datos "Inventario".',
                  "5. El sistema emite la Orden de Pedido Confirmado con su código de seguimiento.",
                  "6. Finaliza la aprobación de presupuesto y registro del pedido.",
                ],
              },
              {
                titulo:
                  "Flujo alternativo, Requisitos especiales y Lista de tecnología",
                destacado: false,
                items: [
                  "Flujo alternativo — 1a. Presupuesto vencido: Si el plazo de validez de la oferta caducó, el sistema exige generar una nueva cotización.",
                  "Flujo alternativo — Falla de conectividad/energía: El sistema falla, se pierde la conectividad o la energía eléctrica: conserva lo ya seleccionado y se retoma al restablecerse el servicio.",
                  "Requisitos especiales: Alta confiabilidad en la concurrencia de datos para evitar que dos clientes reserven el mismo stock físico simultáneamente.",
                  "Lista de tecnología: Motor de base de datos relacional con manejo de transacciones seguras (ACID).",
                ],
              },
            ],
          },
          {
            subtitulo: "Caso de Uso 3: Gestionar Preparación en Depósito",
            items: [
              "Actor principal: Personal de Depósito (Representa la operatoria del subsistema de Control de Stock y Preparación).",
              'Precondiciones: Existe al menos un pedido en estado "Confirmado / Pendiente de preparación" habilitado para prepararse.',
              'Postcondiciones: El estado del pedido cambia a "Listo para retiro" y se genera el Remito Interno / Ficha de Preparación.',
            ],
            modalSecciones: [
              {
                titulo: "Encabezado, Precondiciones y Postcondiciones",
                destacado: false,
                items: [
                  "Representa la operatoria del subsistema de Control de Stock y Preparación.",
                  "Nombre: Gestionar Preparación en Depósito.",
                  "Actor principal: Personal de Depósito.",
                  'Precondiciones: Existe al menos un pedido en estado "Confirmado / Pendiente de preparación" habilitado para prepararse.',
                  'Postcondiciones: El estado del pedido cambia a "Listo para retiro" y se genera el Remito Interno / Ficha de Preparación.',
                ],
              },
              {
                titulo: "Escenario de éxito",
                destacado: true,
                items: [
                  "1. Este caso de uso comienza cuando el Personal de Depósito consulta los pedidos pendientes de la sucursal.",
                  '2. El sistema retorna la lista de pedidos en estado "Confirmado".',
                  "3. El Personal de Depósito inicia la preparación de un pedido seleccionado.",
                  '4. El sistema confirma el estado actualizado a "En Preparación".',
                  '5. El Personal de Depósito marca el pedido como "Listo para retiro".',
                  "6. El sistema retorna la Ficha de Preparación interna.",
                  "7. Finaliza la preparación del depósito.",
                ],
              },
              {
                titulo:
                  "Flujo alternativo, Requisitos especiales y Lista de tecnología",
                destacado: false,
                items: [
                  "Flujo alternativo — 4a. Diferencia de inventario: Si al buscar el producto físicamente hay daños o faltantes, el operario notifica la irregularidad en el sistema, pausando el pedido.",
                  "Flujo alternativo — Falla de conectividad/energía: El sistema falla, se pierde la conectividad o la energía eléctrica: conserva lo ya seleccionado y se retoma al restablecerse el servicio.",
                  "Requisitos especiales: Interfaz simplificada y con botones accesibles para ser utilizada operativamente en el almacén.",
                  "Lista de tecnología: Dispositivos móviles/Tablets en el depósito, red WiFi local conectada al servidor central.",
                ],
              },
            ],
          },
          {
            subtitulo: "Caso de Uso 4: Registrar Retiro y Despacho",
            items: [
              "Actor principal: Personal de Depósito (Representa la etapa final logística).",
              'Precondiciones: El pedido se encuentra "Listo para retiro" y la documentación comercial (pago/facturación) está aprobada.',
              'Postcondiciones: El pedido cambia a estado "Entregado". El inventario se descuenta definitivamente.',
            ],
            modalSecciones: [
              {
                titulo: "Encabezado, Precondiciones y Postcondiciones",
                destacado: false,
                items: [
                  "Representa la etapa final logística.",
                  "Nombre: Registrar Retiro y Despacho.",
                  "Actor principal: Personal de Depósito.",
                  'Precondiciones: El pedido se encuentra "Listo para retiro" y la documentación comercial (pago/facturación) está aprobada.',
                  'Postcondiciones: El pedido cambia a estado "Entregado". El inventario se descuenta definitivamente.',
                ],
              },
              {
                titulo: "Escenario de éxito",
                destacado: true,
                items: [
                  "1. Este caso de uso comienza cuando el Personal de Depósito busca el pedido ingresando el código de seguimiento.",
                  "2. El sistema muestra la validación del pedido y el comprobante asociado.",
                  "3. El Personal de Depósito registra la entrega y el despacho, ingresando los datos del receptor.",
                  '4. El sistema descuenta el stock de forma definitiva, emite el Remito Comercial y confirma el estado del pedido a "Entregado".',
                  "5. Finaliza el registro del retiro y despacho.",
                ],
              },
              {
                titulo:
                  "Flujo alternativo, Requisitos especiales y Lista de tecnología",
                destacado: false,
                items: [
                  "Flujo alternativo — 1a. Documentación inválida: Si el fletero no posee el remito o comprobante requerido, el sistema alerta al operario para denegar la entrega.",
                  "Flujo alternativo — Falla de conectividad/energía: El sistema falla, se pierde la conectividad o la energía eléctrica: conserva lo ya seleccionado y se retoma al restablecerse el servicio.",
                  "Requisitos especiales: Trazabilidad estricta (registrar fecha, hora y operario que realiza la entrega).",
                  "Lista de tecnología: Sistema web backend, Lectores de Códigos de Barras o QR (opcional).",
                ],
              },
            ],
          },
          {
            subtitulo: "Caso de Uso 5: Consultar Estado de Pedido",
            items: [
              "Actor principal: Cliente (Representa el subsistema de seguimiento logístico para el cliente).",
              "Precondiciones: El cliente debe poseer el código de seguimiento generado tras la confirmación de su pedido.",
              "Postcondiciones: El sistema despliega el estado logístico actual y el detalle del pedido.",
            ],
            modalSecciones: [
              {
                titulo: "Encabezado, Precondiciones y Postcondiciones",
                destacado: false,
                items: [
                  "Representa el subsistema de seguimiento logístico para el cliente.",
                  "Nombre: Consultar Estado de Pedido.",
                  "Actor principal: Cliente.",
                  "Precondiciones: El cliente debe poseer el código de seguimiento generado tras la confirmación de su pedido.",
                  "Postcondiciones: El sistema despliega el estado logístico actual y el detalle del pedido.",
                ],
              },
              {
                titulo: "Escenario de éxito",
                destacado: true,
                items: [
                  "1. El caso de uso comienza cuando el Cliente ingresa a la sección de seguimiento web.",
                  "2. El sistema solicita el ingreso del código de seguimiento.",
                  "3. El Cliente ingresa el código y presiona buscar.",
                  '4. El sistema valida el código en la base de datos "Pedidos".',
                  '5. El sistema retorna el estado actual ("Confirmado", "En Preparación", "Listo para Retiro" o "Entregado") junto con el detalle de los materiales.',
                  "6. Finaliza la consulta de estado.",
                ],
              },
              {
                titulo:
                  "Flujo alternativo, Requisitos especiales y Lista de tecnología",
                destacado: false,
                items: [
                  "Flujo alternativo — 4a. Código inválido: Si el código no existe o es incorrecto, el sistema informa el error y solicita reingresarlo.",
                  "Flujo alternativo — Falla de conectividad/energía: El sistema falla, se pierde la conectividad o la energía eléctrica: conserva lo ya seleccionado y se retoma al restablecerse el servicio.",
                  "Requisitos especiales: Interfaz intuitiva y tiempos de respuesta mínimos en la búsqueda de la base de datos.",
                  "Lista de tecnología: Interfaz Web (Frontend responsivo), Servidor Backend, Base de Datos.",
                ],
              },
            ],
          },
          {
            subtitulo: "Caso de Uso 6: Gestionar Catálogo e Inventario",
            items: [
              "Actor principal: Personal de Ventas / Administrador (Representa el módulo administrativo para actualizar la tienda web).",
              "Precondiciones: El usuario debe estar logueado en la Intranet con permisos de edición.",
              "Postcondiciones: Se actualizan permanentemente los precios y las cantidades de stock en el catálogo público.",
            ],
            modalSecciones: [
              {
                titulo: "Encabezado, Precondiciones y Postcondiciones",
                destacado: false,
                items: [
                  "Representa el módulo administrativo para actualizar la tienda web.",
                  "Nombre: Gestionar Catálogo e Inventario.",
                  "Actor principal: Personal de Ventas / Administrador.",
                  "Precondiciones: El usuario debe estar logueado en la Intranet con permisos de edición.",
                  "Postcondiciones: Se actualizan permanentemente los precios y las cantidades de stock en el catálogo público.",
                ],
              },
              {
                titulo: "Escenario de éxito",
                destacado: true,
                items: [
                  "1. El caso de uso comienza cuando el Administrador ingresa al módulo de gestión de catálogo.",
                  "2. El sistema despliega la tabla con los materiales, stocks y precios actuales.",
                  "3. El Administrador modifica los precios o el stock disponible de los artículos deseados y hace clic en guardar.",
                  "4. El sistema valida que los datos ingresados sean correctos (valores numéricos positivos).",
                  '5. El sistema actualiza los registros en la base de datos "Inventario".',
                  "6. El sistema emite un mensaje de confirmación de éxito.",
                  "7. Finaliza la actualización.",
                ],
              },
              {
                titulo:
                  "Flujo alternativo, Requisitos especiales y Lista de tecnología",
                destacado: false,
                items: [
                  "Flujo alternativo — 4a. Datos inválidos: Si se ingresan valores negativos o texto en campos numéricos, el sistema rechaza la operación y muestra una alerta.",
                  "Flujo alternativo — Falla de conectividad/energía: El sistema falla, se pierde la conectividad o la energía eléctrica: conserva lo ya seleccionado y se retoma al restablecerse el servicio.",
                  "Requisitos especiales: Control de acceso y sesiones para evitar modificaciones no autorizadas.",
                  "Lista de tecnología: Panel de control Backend, Base de Datos Relacional.",
                ],
              },
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/casos-uso.jpg",
            pie: "Diagrama General de Casos de Uso UML",
          },
          {
            src: "/diagramas/prototipo-cu1.jpg",
            pie: "Prototipo No Operacional 1 – Cotización Web (CU1)",
          },
          {
            src: "/diagramas/prototipo-cu2.jpg",
            pie: "Prototipo No Operacional 2 – Confirmación de Pedido (CU2)",
          },
          {
            src: "/diagramas/prototipo-cu3.jpg",
            pie: "Prototipo No Operacional 3 – Panel de Depósito (CU3)",
          },
          {
            src: "/diagramas/prototipo-cu4.jpg",
            pie: "Prototipo No Operacional 4 – Despacho y Entrega (CU4)",
          },
          {
            src: "/diagramas/prototipo-cu5.jpg",
            pie: "Prototipo No Operacional 5 – Seguimiento de Pedido (CU5)",
          },
          {
            src: "/diagramas/prototipo-cu6.jpg",
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
      "Subsistemas y bloques, modelado conceptual, secuencias, contratos, estados, análisis BCE y viabilidad",
    temas: [
      {
        nombre: "Subsistemas y Bloques",
        bloques: [
          {
            subtitulo: "Sistema General y Cuadro RUP (Visión)",
            items: [
              "Sistema Global: Sistema Web de Cotización, Gestión de Pedidos y Distribución de Material.",
              "Solución RUP: autogestión de clientes, reserva de stock en tiempo real y trazabilidad Ventas–Depósito.",
            ],
            modalSecciones: [
              {
                titulo: "Definición del Problema / Oportunidad (Cuadro RUP)",
                destacado: false,
                items: [
                  "El problema: Confección manual de presupuestos y comunicación informal por WhatsApp/teléfono entre Ventas y Depósito.",
                  "A quién afecta: Ventas (Mayoristas, Minoristas y Atención al Cliente), Almacén e Inventario, Transporte y Clientes.",
                  "Solución adecuada: Plataforma web de autogestión conectada en tiempo real con el inventario de Tucumán y Salta.",
                  "Impacto / Beneficio: Eliminación de cuellos de botella en horarios pico, reducción de errores de cálculo y trazabilidad del retiro.",
                ],
              },
              {
                titulo: "Roles y Stakeholders del Sistema",
                destacado: true,
                items: [
                  "Usuarios Directos: Cliente (portal web), Personal de Ventas / Administrador (catálogo y seguimiento) y Personal de Depósito (picking y despacho).",
                  "Usuarios Indirectos y Ambiente: Personal de Administración (consulta de comprobantes); Transportista / Fletero externo (entidad física externa que no opera el software).",
                ],
              },
            ],
          },
          {
            subtitulo: "Descomposición en 4 Subsistemas",
            items: [
              "Frente Comercial (Web): 1. Gestión de Catálogo y Cotización Web | 2. Gestión y Registro de Pedidos.",
              "Frente Operativo (Intranet): 3. Control de Stock y Preparación en Depósito | 4. Gestión de Consultas y Comprobantes.",
            ],
            modalSecciones: [
              {
                titulo: "Subsistemas Comerciales (Autogestión del Cliente)",
                destacado: false,
                items: [
                  "1. Gestión de Catálogo y Cotización Web (CU1): Consulta de precios y disponibilidad física por sucursal, cálculo automático y emisión de Presupuesto Web válido por 72 hs.",
                  "2. Gestión y Registro de Pedidos (CU2): Aprobación de cotización vigente, elección de Retiro Personal o Fletero Externo, registro de pago y reserva lógica de stock.",
                ],
              },
              {
                titulo: "Subsistemas Operativos y de Control (Intranet)",
                destacado: true,
                items: [
                  "3. Control de Stock y Preparación en Depósito (CU3 y CU4): Gestión de cola de pedidos confirmados, emisión de Hoja de Preparación, validación documental y baja definitiva de stock.",
                  "4. Gestión de Consultas y Comprobantes (CU5 y CU6): Seguimiento público de pedidos por código, actualización de precios/existencias y consulta de comprobantes para Administración.",
                ],
              },
            ],
          },
          {
            subtitulo: "Diagrama de Bloques y Almacenes de Datos",
            items: [
              "4 Almacenes de Datos: Presupuestos, Productos e Inventario, Pedidos y Ventas.",
              "Salidas emitidas: Presupuesto Web (Cliente), Hoja de Preparación (Depósito) y Comprobantes (Administración).",
            ],
            modalSecciones: [
              {
                titulo: "Arquitectura de Almacenes de Datos",
                destacado: false,
                items: [
                  "Productos e Inventario: Consultado en tiempo real al cotizar (Subsistema 1), actualizado con reserva lógica al confirmar (Subsistema 2) y descontado al despachar (Subsistema 3).",
                  "Presupuestos, Pedidos y Ventas: Persisten el ciclo completo desde la oferta preliminar de 72 hs hasta la orden confirmada, el pago y el remito comercial.",
                ],
              },
              {
                titulo: "Lectura de Flujos en el Diagrama de Bloques",
                destacado: true,
                items: [
                  "Salidas externas del sistema: Los artefactos Presupuesto Web (hacia Cliente), Hoja de Preparación (hacia Depósito) y Comprobantes (hacia Administración) representan información emitida por los subsistemas hacia cada interesado.",
                  "Cohesión funcional: Cada bloque agrupa operaciones con alta afinidad de datos y separa la interfaz pública del cliente respecto de la operación interna del almacén.",
                ],
              },
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/bloques.jpg",
            pie: "Diagrama de Bloques – Subsistemas y Almacenes de Datos",
          },
        ],
      },
      {
        nombre: "Modelo del Dominio",
        bloques: [
          {
            subtitulo: "Clases Conceptuales y Atributos (10 Clases)",
            items: [
              "Núcleo comercial: Cliente, Cotizacion, DetalleCotizacion, Pedido, LineaPedido, ComprobantePago y Remito.",
              "Núcleo de inventario: Producto, StockInventario y Sucursal.",
            ],
            modalSecciones: [
              {
                titulo: "Entidades Comerciales, Financieras y Logísticas",
                destacado: false,
                items: [
                  "Cliente: idCliente, nombreRazonSocial, cuitDni, email, telefono, direccion.",
                  "Cotizacion y DetalleCotizacion: numeroCotizacion, fechaEmision, fechaVencimiento, montoTotal, estado | cantidad, precioUnitarioCotizado, subtotal.",
                  "Pedido y LineaPedido: idPedido, fechaCreacion, estado, modalidadEntrega, montoTotal | cantidadSolicitada, precioUnitarioAcordado, subtotal.",
                  "ComprobantePago y Remito: idComprobante, montoAbonado, fechaPago, formaPago | numeroRemito, fechaEmision, estadoEntrega, observaciones.",
                ],
              },
              {
                titulo: "Entidades de Catálogo e Inventario Multi-Sucursal",
                destacado: true,
                items: [
                  "Producto: codigoProducto, nombreProducto, descripcion, precioUnitarioVenta, unidadMedida, categoria.",
                  "StockInventario: cantidadDisponible, cantidadReservada, ubicacionPasillo.",
                  "Sucursal: idSucursal, nombreSucursal, direccion (soporte sincrónico entre las plantas de Tucumán y Salta).",
                ],
              },
            ],
          },
          {
            subtitulo: "Matriz de Asociaciones y Criterios de Diseño",
            items: [
              "Desacoplamiento entre Cotizacion (1 ── 0..1) y Pedido: cotizar no compromete inventario hasta la aprobación.",
              "Control explícito de unidadMedida (bolsas, unidades, tiras, varillas) y stock en dos tiempos.",
            ],
            modalSecciones: [
              {
                titulo: "Matriz de Asociaciones y Multiplicidades UML",
                destacado: false,
                items: [
                  "Cliente (1) ── Solicita ── (1..*) Cotizacion (1) ── Contiene ── (1..*) DetalleCotizacion (*) ── Especifica ── (1) Producto.",
                  "Cotizacion (1) ── Genera ── (0..1) Pedido (1) ── Compuesto por ── (1..*) LineaPedido (*) ── Referencia ── (1) Producto.",
                  "Pedido (1) ── Respaldado por ── (1) ComprobantePago | Pedido (1) ── Genera ── (0..1) Remito.",
                  "Sucursal (1) ── Almacenado en ── (1..*) StockInventario (*) ── Existencia de ── (1) Producto.",
                ],
              },
              {
                titulo: "Decisiones Conceptuales (Craig Larman)",
                destacado: true,
                items: [
                  "Clases asociativas: DetalleCotizacion y LineaPedido resuelven relaciones muchos a muchos preservando cantidades y precios históricos pactados.",
                  "Gestión de unidades de medida: Resuelve la complejidad del corralón donde coexisten ventas por unidad suelta (ladrillos) y fraccionamientos (bolsas, tiras, varillas).",
                  "Pureza conceptual: Se excluyen tablas SQL, controladores y pantallas, modelando exclusivamente conceptos del mundo real.",
                ],
              },
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/dominio.jpg",
            pie: "Modelo del Dominio UML",
          },
        ],
      },
      {
        nombre: "Diagramas de Secuencia (DSS)",
        bloques: [
          {
            subtitulo: "DSS 1 – Generación de Cotización Web",
            items: [
              "Participantes: c : Cliente ──► :SistemaWebRosso (caja negra).",
              "Bloque loop [para cada material]: agregarMaterialACotizacion(codigoProducto, cantidad) y emisión con fechaVencimiento.",
            ],
            modalSecciones: [
              {
                titulo: "Participantes y Estructura Dinámica",
                destacado: false,
                items: [
                  "Actor externo: c : Cliente (barra continua lateral izquierda indicando la duración total de la sesión).",
                  "Sistema: :SistemaWebRosso tratado como caja negra (barras laterales derechas por cada evento procesado).",
                  "Fragmento combinado: Bloque de iteración loop [para cada material seleccionado].",
                ],
              },
              {
                titulo: "Secuencia Cronológica de Mensajes",
                destacado: true,
                items: [
                  "1. ingresarDatosCliente(cuitDni, nombre, email, sucursalId) ──► 1.1. muestraCatalogoYStockDisponible(sucursalId).",
                  "2. loop: agregarMaterialACotizacion(codigoProducto, cantidad) ──► 2.1. actualizaSubtotalPreliminar().",
                  "3. solicitarCotizacionWeb() ──► 3.1. emiteCotizacionWeb(numeroCotizacion, montoTotal, fechaVencimiento).",
                ],
              },
            ],
          },
          {
            subtitulo: "DSS 2 – Confirmación y Registro de Pedido",
            items: [
              "Participantes: c : Cliente ──► :SistemaWebRosso.",
              "Incluye llamada interna verificarYReservarStock() antes de emitir Orden de Pedido Confirmado.",
            ],
            modalSecciones: [
              {
                titulo: "Participantes y Control Transaccional",
                destacado: false,
                items: [
                  "Actor externo: c : Cliente.",
                  "Sistema: :SistemaWebRosso con ejecución interna de verificación y reserva lógica de inventario.",
                ],
              },
              {
                titulo: "Secuencia Cronológica de Mensajes",
                destacado: true,
                items: [
                  "1. aprobarCotizacion(numeroCotizacion) ──► 1.1. solicitaModalidadEntregaYDatosPago().",
                  "2. seleccionarModalidadEntrega(modalidad, datosFletero).",
                  "3. registrarComprobantePago(monto, formaPago, nroComprobante) ──► * Proceso interno: verificarYReservarStock() ──► 3.1. emiteOrdenPedidoConfirmado(idPedido, codigoSeguimiento, estado='Confirmado').",
                ],
              },
            ],
          },
          {
            subtitulo: "DSS 3 – Gestionar Preparación en Depósito",
            items: [
              "Participantes: pd : PersonalDeposito ──► :SistemaWebRosso.",
              "Modela el ciclo interno de picking desde 'Confirmado' hasta 'Listo para Retiro' con Ficha de Preparación.",
            ],
            modalSecciones: [
              {
                titulo: "Participantes y Alcance Operativo",
                destacado: false,
                items: [
                  "Actor interno: pd : PersonalDeposito operando desde la Intranet del almacén.",
                  "Separación temporal: Desacopla la preparación física en depósito del momento posterior en que se retira la mercadería.",
                ],
              },
              {
                titulo: "Secuencia Cronológica de Mensajes",
                destacado: true,
                items: [
                  "1. consultarPedidosPendientes(sucursalId) ──► 1.1. retorna lista de pedidos en estado 'Confirmado'.",
                  "2. iniciarPreparacion(idPedido) ──► 2.1. confirma estado actualizado ('En Preparación').",
                  "3. marcarListoParaRetiro(idPedido) ──► 3.1. retorna Ficha de Preparación interna.",
                ],
              },
            ],
          },
          {
            subtitulo: "DSS 4 – Registrar Retiro y Despacho",
            items: [
              "Participantes: pd : PersonalDeposito ──► :SistemaWebRosso.",
              "Invoca el proceso interno descontarStockDefinitivo() y emite el Remito Comercial.",
            ],
            modalSecciones: [
              {
                titulo: "Participantes y Trazabilidad de Egreso",
                destacado: false,
                items: [
                  "Actor interno: pd : PersonalDeposito (único operador con acceso a la interfaz de despacho; el fletero externo no opera el software).",
                  "Validación previa: Comprobación del comprobante comercial antes de habilitar la salida física.",
                ],
              },
              {
                titulo: "Secuencia Cronológica de Mensajes",
                destacado: true,
                items: [
                  "1. buscarPedidoPorCodigo(codigoSeguimiento) ──► 1.1. muestra validación y comprobante asociado.",
                  "2. registrarEntregaYDespacho(idPedido, datosReceptor) ──► * Llama a proceso interno: descontarStockDefinitivo() ──► 2.1. emite Remito Comercial y confirma estado 'Entregado'.",
                ],
              },
            ],
          },
          {
            subtitulo: "DSS 5 – Consultar Estado de Pedido",
            items: [
              "Participantes: :Cliente ──► :SistemaWebRosso.",
              "Operación de consulta pública por código de seguimiento y detalle de sucursal de retiro.",
            ],
            modalSecciones: [
              {
                titulo: "Participantes y Naturaleza de la Interacción",
                destacado: false,
                items: [
                  "Actor externo: :Cliente en portal web público.",
                  "Interacción de solo lectura: No genera modificaciones de estado ni reservas sobre las entidades del dominio.",
                ],
              },
              {
                titulo: "Secuencia Cronológica de Mensajes",
                destacado: true,
                items: [
                  "1. ingresarCodigoSeguimiento(codigoSeguimiento) ──► 1.1. retorna estado actual (Confirmado / En Prep / Listo / Entregado) y detalle.",
                  "2. consultarDetalleUbicacion(idPedido) ──► 2.1. informa sucursal de origen y fecha estimada de retiro/entrega.",
                ],
              },
            ],
          },
          {
            subtitulo: "DSS 6 – Gestionar Catálogo e Inventario",
            items: [
              "Participantes: :Administrador ──► :SistemaWebRosso.",
              "Bloque loop [mientras existan productos a modificar] y persistencia atómica actualizarBaseDatosInventario().",
            ],
            modalSecciones: [
              {
                titulo: "Participantes y Control de Edición",
                destacado: false,
                items: [
                  "Actor interno: :Administrador autenticado en la Intranet.",
                  "Fragmento combinado: Bloque loop [mientras existan productos a modificar] para edición múltiple en una misma sesión.",
                ],
              },
              {
                titulo: "Secuencia Cronológica de Mensajes",
                destacado: true,
                items: [
                  "1. consultarCatalogoEInventario() ──► retornarTablaProductosYStock().",
                  "2. loop: modificarPrecioYStock(codigoProducto, nuevoPrecio, nuevoStock) ──► validarYActualizarVistaPreliminar().",
                  "3. guardarCambiosInventario() ──► * actualizarBaseDatosInventario() ──► confirmarActualizacionExitosa().",
                ],
              },
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/dss-1.jpg",
            pie: "DSS 1 – Generación de Cotización Web Autogestionada",
          },
          {
            src: "/diagramas/dss-2.jpg",
            pie: "DSS 2 – Confirmación, Registro de Pedido y Reserva de Stock",
          },
          {
            src: "/diagramas/dss-3.jpg",
            pie: "DSS 3 – Gestionar Preparación en Depósito",
          },
          {
            src: "/diagramas/dss-4.jpg",
            pie: "DSS 4 – Registrar Retiro y Despacho",
          },
          {
            src: "/diagramas/dss-5.jpg",
            pie: "DSS 5 – Consultar Estado de Pedido",
          },
          {
            src: "/diagramas/dss-6.jpg",
            pie: "DSS 6 – Gestionar Catálogo e Inventario",
          },
        ],
      },
      {
        nombre: "Contratos de Operación",
        bloques: [
          {
            subtitulo: "Contrato 1 – solicitarCotizacionWeb",
            items: [
              "Signatura: solicitarCotizacionWeb(cuitDni, listaMaterialesCantidades, sucursalId).",
              "Efecto: Crea Cotizacion 'cot' (validez 72 hs, estado 'Emitida') y sus instancias de DetalleCotizacion.",
            ],
            modalSecciones: [
              {
                titulo: "Signatura, Referencia y Precondiciones",
                destacado: false,
                items: [
                  "Operación: solicitarCotizacionWeb(cuitDni, listaMaterialesCantidades, sucursalId).",
                  "Referencia cruzada: Caso de Uso 1 – Solicitar Cotización Web.",
                  "Precondiciones: El Cliente 'c' existe en el sistema o es registrado durante la interacción. Los productos pertenecen al catálogo activo de la Sucursal 's'.",
                ],
              },
              {
                titulo:
                  "Postcondiciones (Instancias, Atributos y Asociaciones)",
                destacado: true,
                items: [
                  "Creación de instancia: Se creó 'cot' (Cotizacion) con numeroCotizacion, fechaEmision, fechaVencimiento (fechaActual + 72 horas), montoTotal = suma de subtotales, estado = 'Emitida'.",
                  "Asociaciones: Se asoció 'cot' con Cliente 'c' (Solicita) y con Sucursal 's'.",
                  "Detalles: Para cada ítem se creó 'dc' (DetalleCotizacion) con cantidadSolicitada, precioUnitarioCotizado y subtotal, asociado a 'cot' (Contiene) y Producto (Especifica).",
                ],
              },
            ],
          },
          {
            subtitulo: "Contrato 2 – registrarPedidoYReservarStock",
            items: [
              "Signatura: registrarPedidoYReservarStock(numeroCotizacion, modalidadEntrega, datosComprobantePago).",
              "Efecto: Crea Pedido ('Confirmado'), ComprobantePago, LineaPedido y traslada stock de disponible a reservado.",
            ],
            modalSecciones: [
              {
                titulo: "Signatura, Referencia y Precondiciones",
                destacado: false,
                items: [
                  "Operación: registrarPedidoYReservarStock(numeroCotizacion, modalidadEntrega, datosComprobantePago).",
                  "Referencia cruzada: Caso de Uso 2 – Aprobar Presupuesto y Registrar Pedido.",
                  "Precondiciones: Existe Cotizacion 'cot' en estado 'Emitida' con fechaVencimiento >= fechaActual, y cantidadDisponible en StockInventario es suficiente.",
                ],
              },
              {
                titulo: "Postcondiciones (Invariante de Reserva de Stock)",
                destacado: true,
                items: [
                  "Pedido y Cotización: Se creó Pedido 'p' (idPedido, fechaRegistro, estado = 'Confirmado', modalidadEntrega, codigoSeguimiento) y se modificó cot.estado = 'Aprobada'.",
                  "Líneas y Pago: Se crearon LineaPedido 'lp' asociadas a 'p' y Producto, y ComprobantePago 'cp' asociado a 'p' (Respaldado por).",
                  "StockInventario 'st': Se incrementó cantidadReservada en lp.cantidadSolicitada y se redujo cantidadDisponible en la misma cantidad.",
                ],
              },
            ],
          },
          {
            subtitulo: "Contrato 3 – marcarListoParaRetiro",
            items: [
              "Signatura: marcarListoParaRetiro(idPedido).",
              "Efecto: Modifica el atributo estado del Pedido 'p' de 'En Preparación' a 'Listo para Retiro'.",
            ],
            modalSecciones: [
              {
                titulo: "Signatura, Referencia y Precondiciones",
                destacado: false,
                items: [
                  "Operación: marcarListoParaRetiro(idPedido).",
                  "Referencia cruzada: Caso de Uso 3 – Gestionar Preparación en Depósito.",
                  "Precondiciones: Existe un Pedido 'p' en estado 'En Preparación' y los materiales físicos recolectados coinciden con las cantidades de las LineaPedido.",
                ],
              },
              {
                titulo: "Postcondiciones (Modificación de Estado)",
                destacado: true,
                items: [
                  "Modificación de atributo: Se modificó p.estado = 'Listo para Retiro'.",
                  "Integridad: No se crearon ni eliminaron instancias en el Modelo del Dominio ni se alteró el inventario reservado.",
                ],
              },
            ],
          },
          {
            subtitulo: "Contrato 4 – registrarEntregaYDespacho",
            items: [
              "Signatura: registrarEntregaYDespacho(idPedido, idEmpleadoDeposito, datosReceptor).",
              "Efecto: Marca Pedido 'Entregado', crea Remito 'r' y ejecuta la baja definitiva en StockInventario.",
            ],
            modalSecciones: [
              {
                titulo: "Signatura, Referencia y Precondiciones",
                destacado: false,
                items: [
                  "Operación: registrarEntregaYDespacho(idPedido, idEmpleadoDeposito, datosReceptor).",
                  "Referencia cruzada: Caso de Uso 4 – Registrar Retiro y Despacho.",
                  "Precondiciones: Existe Pedido 'p' en estado 'Listo para Retiro' con documentación comercial o pago validado.",
                ],
              },
              {
                titulo: "Postcondiciones (Remito y Baja Definitiva de Stock)",
                destacado: true,
                items: [
                  "Estado del Pedido: Se modificó p.estado = 'Entregado'.",
                  "Creación de Remito: Se creó 'r' (numeroRemito, fechaEmision, estadoEntrega = 'Despachado', observaciones = datosReceptor), asociado a 'p' (Genera) y PersonalDeposito (Emite).",
                  "Descuento de StockInventario: Para cada LineaPedido 'lp' en 'p', se decrementó cantidadReservada consolidando la baja física definitiva.",
                ],
              },
            ],
          },
          {
            subtitulo: "Contrato 5 – ingresarCodigoSeguimiento",
            items: [
              "Signatura: ingresarCodigoSeguimiento(codigoSeguimiento).",
              "Efecto: Operación de solo lectura que recupera Pedido, LineaPedido, Producto y Sucursal.",
            ],
            modalSecciones: [
              {
                titulo: "Signatura, Referencia y Precondiciones",
                destacado: false,
                items: [
                  "Operación: ingresarCodigoSeguimiento(codigoSeguimiento).",
                  "Referencia cruzada: Caso de Uso 5 – Consultar Estado de Pedido.",
                  "Precondiciones: Existe una instancia 'p' de la clase Pedido registrada en el sistema vinculada al codigoSeguimiento ingresado.",
                ],
              },
              {
                titulo: "Postcondiciones (Consulta Pura sin Efectos Laterales)",
                destacado: true,
                items: [
                  "Inmutabilidad del dominio: No se crearon ni eliminaron instancias ni se modificaron atributos o asociaciones existentes.",
                  "Recuperación de datos: Se localizó 'p' junto con LineaPedido, Producto, Sucursal (y Remito si ya fue despachado) para desplegar estado, modalidadEntrega y montoTotal.",
                ],
              },
            ],
          },
          {
            subtitulo: "Contrato 6 – guardarCambiosInventario",
            items: [
              "Signatura: guardarCambiosInventario(sucursalId, codigoProducto, nuevoPrecio, nuevoStock).",
              "Efecto: Actualiza precioUnitarioVenta en Producto y cantidadDisponible en StockInventario sin tocar reservas.",
            ],
            modalSecciones: [
              {
                titulo: "Signatura, Referencia y Precondiciones",
                destacado: false,
                items: [
                  "Operación: guardarCambiosInventario(sucursalId, codigoProducto, nuevoPrecio, nuevoStock).",
                  "Referencia cruzada: Caso de Uso 6 – Gestionar Catálogo e Inventario.",
                  "Precondiciones: Administrador 'admin' con sesión activa y permisos. Existen Sucursal 's', Producto 'prod' y StockInventario 'si' asociados. Valores nuevoPrecio >= 0 y nuevoStock >= 0.",
                ],
              },
              {
                titulo: "Postcondiciones (Actualización Controlada)",
                destacado: true,
                items: [
                  "Modificación de atributos: Se actualizó prod.precioUnitarioVenta = nuevoPrecio y si.cantidadDisponible = nuevoStock.",
                  "Preservación de reservas: Se mantuvieron vigentes las asociaciones entre 'prod', 'si' y 's', conservando intacto el atributo si.cantidadReservada.",
                ],
              },
            ],
          },
        ],
        imagenes: [],
      },
      {
        nombre: "Transición de Estados",
        bloques: [
          {
            subtitulo: "Ciclo de Vida del Objeto Pedido",
            items: [
              "Estados definidos: Confirmado → En Preparación → Listo para Retiro → Entregado (Estado Final).",
              "El objeto Pedido nace al aprobarse la cotización; mientras se cotiza solo existe la clase Cotizacion.",
            ],
            modalSecciones: [
              {
                titulo: "Semántica del Ciclo de Vida en UML",
                destacado: false,
                items: [
                  "Nacimiento de la instancia: El estado inicial transiciona directamente a 'Confirmado' mediante aprobarPresupuesto(), respetando la separación conceptual entre Cotizacion y Pedido.",
                  "Actividad interna (Do): Dentro del estado 'En Preparación' se ejecuta de forma continua la actividad `do / realizar picking físico de materiales`.",
                ],
              },
              {
                titulo: "Invariantes y Trazabilidad con Contratos",
                destacado: true,
                items: [
                  "Confirmado: Vinculado al Contrato 2 (reserva lógica de stock).",
                  "Listo para Retiro: Vinculado al Contrato 3 (finalización de picking y emisión de ficha/remito interno).",
                  "Entregado: Vinculado al Contrato 4 (descuento definitivo de stock y cierre del ciclo).",
                ],
              },
            ],
          },
          {
            subtitulo: "Tabla Formal de Transiciones UML",
            items: [
              "(Inicial) → Confirmado: aprobarPresupuesto(nroCot) / crearPedido(), reservarStock().",
              "Confirmado → En Preparación → Listo para Retiro → Entregado.",
            ],
            modalSecciones: [
              {
                titulo: "Eventos, Acciones y Estados Destino",
                destacado: false,
                items: [
                  "Transición 1: [Estado Inicial] ── aprobarPresupuesto(numeroCotizacion) / crearPedido(), reservarStock() ──► Confirmado.",
                  "Transición 2: Confirmado ── iniciarPreparacion() / notificarDeposito() ──► En Preparación.",
                  "Transición 3: En Preparación ── finalizarPicking() / emitirRemito() ──► Listo para Retiro.",
                  "Transición 4: Listo para Retiro ── registrarEntrega() / descontarStockDefinitivo() ──► Entregado [Estado Final].",
                ],
              },
              {
                titulo: "Comportamiento ante Eventos No Válidos",
                destacado: true,
                items: [
                  "Regla de máquinas de estado UML: Si ocurre un evento no contemplado para el estado vigente (ej. intentar registrar entrega cuando el pedido sigue en preparación), la transición no se dispara y el objeto conserva su estado sin alterar el stock.",
                ],
              },
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/estados.jpg",
            pie: "Diagrama de Transición de Estados (Objeto: Pedido)",
          },
        ],
      },
      {
        nombre: "Modelo de Análisis (Boundary – Control – Entity)",
        bloques: [
          {
            subtitulo: "BCE 1 – Generar Cotización Web",
            items: [
              "Borde: :UI Cotización Web | Control: :Coordinador de Cotización.",
              "Entidades: :Cliente, :Producto, :StockInventario, :Cotizacion.",
            ],
            modalSecciones: [
              {
                titulo: "Estereotipos de Jacobson (Borde, Control y Entidades)",
                destacado: false,
                items: [
                  "Actor y Borde (Boundary): :Cliente interactúa con :UI Cotización Web.",
                  "Control: :Coordinador de Cotización (orquesta la secuencia IniciarCotizacion).",
                  "Entidades (Entity): :Cliente, :Producto, :StockInventario y :Cotizacion.",
                ],
              },
              {
                titulo: "Colaboración Interna y Validación del CU1",
                destacado: true,
                items: [
                  "Mensajes del coordinador: obtenerDatos() sobre :Cliente, obtenerPrecios() sobre :Producto, verificarStock() sobre :StockInventario y generar() sobre :Cotizacion.",
                  "Objetivo metodológico: Abre la caja negra del DSS 1 verificando que todas las entidades requeridas existan en el Modelo del Dominio sin depender de tecnología de implementación.",
                ],
              },
            ],
          },
          {
            subtitulo: "BCE 2 – Aprobar Presupuesto y Registrar Pedido",
            items: [
              "Borde: :UI Confirmación de Pedido | Control: :Coordinador de Pedidos.",
              "Entidades: :Cotizacion, :Pedido, :ComprobantePago, :StockInventario.",
            ],
            modalSecciones: [
              {
                titulo: "Estereotipos de Jacobson (Borde, Control y Entidades)",
                destacado: false,
                items: [
                  "Actor y Borde: :Cliente interactúa con :UI Confirmación de Pedido.",
                  "Control: :Coordinador de Pedidos (recibe Confirmar y Pagar).",
                  "Entidades: :Cotizacion, :Pedido, :ComprobantePago y :StockInventario.",
                ],
              },
              {
                titulo: "Colaboración Interna y Validación del CU2",
                destacado: true,
                items: [
                  "Mensajes del coordinador: validar() sobre :Cotizacion, crear(Confirmado) sobre :Pedido, registrar() sobre :ComprobantePago y reservarStock() sobre :StockInventario.",
                ],
              },
            ],
          },
          {
            subtitulo: "BCE 3 – Gestionar Preparación en Depósito",
            items: [
              "Borde: :UI Panel de Depósito | Control: :Coordinador de Preparación.",
              "Entidades: :Pedido, :LineaPedido.",
            ],
            modalSecciones: [
              {
                titulo: "Estereotipos de Jacobson (Borde, Control y Entidades)",
                destacado: false,
                items: [
                  "Actor y Borde: :PersonalDeposito interactúa con :UI Panel de Depósito.",
                  "Control: :Coordinador de Preparación (recibe Iniciar recolección).",
                  "Entidades: :Pedido y :LineaPedido.",
                ],
              },
              {
                titulo: "Colaboración Interna y Validación del CU3",
                destacado: true,
                items: [
                  "Mensajes del coordinador: consultarMateriales() sobre :LineaPedido para confeccionar la lista de picking y actualizarEstado() sobre :Pedido.",
                ],
              },
            ],
          },
          {
            subtitulo: "BCE 4 – Registrar Retiro y Despacho",
            items: [
              "Borde: :UI Despacho y Entrega | Control: :Coordinador de Despacho.",
              "Entidades: :Pedido, :Remito, :StockInventario.",
            ],
            modalSecciones: [
              {
                titulo: "Estereotipos de Jacobson (Borde, Control y Entidades)",
                destacado: false,
                items: [
                  "Actor y Borde: :PersonalDeposito interactúa con :UI Despacho y Entrega.",
                  "Control: :Coordinador de Despacho (recibe Registrar retiro y despacho).",
                  "Entidades: :Pedido, :Remito y :StockInventario.",
                ],
              },
              {
                titulo: "Colaboración Interna y Validación del CU4",
                destacado: true,
                items: [
                  "Mensajes del coordinador: verificar(Listo) -> Entregado sobre :Pedido, crear() sobre :Remito y descontarDefinitivo() sobre :StockInventario.",
                ],
              },
            ],
          },
          {
            subtitulo: "BCE 5 – Consultar Estado de Pedido",
            items: [
              "Borde: :UI Seguimiento Web | Control: :Coordinador de Seguimiento.",
              "Entidad: :Pedido.",
            ],
            modalSecciones: [
              {
                titulo: "Estereotipos de Jacobson (Borde, Control y Entidades)",
                destacado: false,
                items: [
                  "Actor y Borde: :Cliente interactúa con :UI Seguimiento Web.",
                  "Control: :Coordinador de Seguimiento (recibe buscarPorCodigo(codigoSeguimiento)).",
                  "Entidad: :Pedido.",
                ],
              },
              {
                titulo: "Colaboración Interna y Validación del CU5",
                destacado: true,
                items: [
                  "Mensajes del coordinador: consultarEstado() sobre :Pedido para recuperar el estado logístico actual y retornarlo a la interfaz pública.",
                ],
              },
            ],
          },
          {
            subtitulo: "BCE 6 – Gestionar Catálogo e Inventario",
            items: [
              "Borde: :UI Gestión Catálogo | Control: :Coordinador de Catálogo.",
              "Entidades: :Producto, :StockInventario.",
            ],
            modalSecciones: [
              {
                titulo: "Estereotipos de Jacobson (Borde, Control y Entidades)",
                destacado: false,
                items: [
                  "Actor y Borde: :Administrador interactúa con :UI Gestión Catálogo.",
                  "Control: :Coordinador de Catálogo (recibe actualizarCatalogo()).",
                  "Entidades: :Producto y :StockInventario.",
                ],
              },
              {
                titulo: "Colaboración Interna y Validación del CU6",
                destacado: true,
                items: [
                  "Mensajes del coordinador: actualizarPrecio() sobre :Producto y actualizarStock() sobre :StockInventario.",
                ],
              },
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/bce-1.jpg",
            pie: "Modelo del Análisis – CU1 Generar Cotización Web",
          },
          {
            src: "/diagramas/bce-2.jpg",
            pie: "Modelo del Análisis – CU2 Aprobar Presupuesto y Registrar Pedido",
          },
          {
            src: "/diagramas/bce-3.jpg",
            pie: "Modelo del Análisis – CU3 Gestionar Preparación en Depósito",
          },
          {
            src: "/diagramas/bce-4.jpg",
            pie: "Modelo del Análisis – CU4 Registrar Retiro y Despacho",
          },
          {
            src: "/diagramas/bce-5.jpg",
            pie: "Modelo del Análisis – CU5 Consultar Estado de Pedido",
          },
          {
            src: "/diagramas/bce-6.jpg",
            pie: "Modelo del Análisis – CU6 Gestionar Catálogo e Inventario",
          },
        ],
      },
      {
        nombre: "Viabilidad y Gantt",
        bloques: [
          {
            subtitulo: "Viabilidad Técnica (Hardware y Software)",
            items: [
              "Hardware ($7.290.000): 5 PCs ($6.000.000), 2 impresoras láser ($500.000), 4 lectores QR/barras ($340.000), Cloud AWS ($300.000) y routers Wi-Fi ($150.000).",
              "Software ($725.000): 5 licencias Windows 11 Pro ($600.000), 5 ESET Endpoint ($125.000) y React + Node.js Open Source ($0).",
            ],
            modalSecciones: [
              {
                titulo:
                  "Recursos de Hardware (Proveedor, Garantía y Costos Exactos)",
                destacado: false,
                items: [
                  "Tecnologías de Entrada: 4 Lectores de Códigos de Barras/QR ($85.000 c/u = $340.000 – Intelex S.A., 2 años de garantía), teclados y mouses estándar.",
                  'Tecnologías de Salida: 2 Impresoras láser/térmicas ($250.000 c/u = $500.000 – Intelex S.A., 1 año de garantía) y monitores de 24".',
                  "Procesamiento y Almacenamiento: 5 PC de escritorio con SSD 512 GB ($1.200.000 c/u = $6.000.000 – Intelex S.A., 3 años de garantía) + Infraestructura Cloud Hosting AWS ($300.000 anual, soporte 24/7, backups automatizados).",
                  "Comunicaciones: Internet de banda ancha (ISP) y Routers Wi-Fi internos en depósito ($150.000 – Cisco local, 1 año de garantía).",
                ],
              },
              {
                titulo: "Recursos de Software (Licencias y Stack Tecnológico)",
                destacado: true,
                items: [
                  "Sistema Operativo: Windows 11 Pro — $120.000 × 5 licencias permanentes = $600.000.",
                  "Seguridad: Antivirus ESET Endpoint Security Corporativo — $25.000 × 5 licencias (1 año) = $125.000.",
                  "Desarrollo: Lenguajes JavaScript / TypeScript con React (Frontend) y Node.js (Backend) — $0 (Open Source).",
                ],
              },
            ],
          },
          {
            subtitulo: "Viabilidad Económica (Personal e Inversión Total)",
            items: [
              "Equipo de Desarrollo ($9.300.000): Gestor ($2.5M / 480 hs), Analista ($1.8M / 480 hs), 2 Desarrolladores ($3.0M / 240 hs) y Arquitecto de sistemas / BD ($2.0M / 320 hs).",
              "Inversión Total del Proyecto: $17.315.000 (Capacitación a 5 usuarios finales: $0, incluida en sueldo).",
            ],
            modalSecciones: [
              {
                titulo:
                  "2.3 - Estimación de Costo de Personal (Desglose por Hora y Tiempo)",
                destacado: false,
                items: [
                  "Gestor de Proyecto: $2.500.000 — 480 hs (160 hs/mes) / $5.208,33 por hora — Cantidad: 1 — Tiempo: 3 meses.",
                  "Análisis de sistemas: $1.800.000 — 480 hs (160 hs/mes) / $3.750,00 por hora — Cantidad: 1 — Tiempo: 3 meses.",
                  "Desarrolladores: $1.500.000 c/u ($3.000.000 total) — 120 hs c/u (240 hs total) / $10.000,00 por hora — Cantidad: 2 — Tiempo: 3 meses.",
                  "Arquitecto de sistemas / BD: $2.000.000 — 320 hs (160 hs/mes) / $6.250,00 por hora — Cantidad: 1 — Tiempo: 2 meses.",
                  "Usuarios Finales (5 empleados de Ventas y Depósito – 2 semanas de capacitación): $0 (incluido en sueldo).",
                ],
              },
              {
                titulo: "Resumen Consolidado de Inversión",
                destacado: true,
                items: [
                  "Subtotal Hardware: $7.290.000 | Subtotal Software: $725.000 | Subtotal Personal: $9.300.000.",
                  "Inversión Total Estimada: $17.315.000, recuperable mediante reducción de tiempos operativos, eliminación de errores de cotización y mayor atención simultánea.",
                ],
              },
            ],
          },
          {
            subtitulo: "Viabilidad Operacional y Matriz de Riesgos",
            items: [
              "Operacional: alta predisposición del personal relevada en Fase 1 y experiencia previa con ERP (curva corta con tutoriales).",
              "Riesgos (5 categorías): Tecnológico, Personal, Organizacional, Requerimientos y Herramientas.",
            ],
            modalSecciones: [
              {
                titulo: "Factibilidad Operacional (Adopción y Capacitación)",
                destacado: false,
                items: [
                  "Predisposición de usuarios: En las entrevistas de Fase 1, Ventas y Depósito manifestaron la necesidad de eliminar presupuestos manuales y cruces informales por WhatsApp.",
                  "Capacitación: El personal ya opera sistemas de gestión (ERP actuales); no requiere cursos formales extensos, solo demos y tutoriales guiados durante 2 semanas en Transición.",
                ],
              },
              {
                titulo: "Estudio de Riesgos del Proyecto (5 Categorías)",
                destacado: true,
                items: [
                  "Tecnológico: Caídas temporales del servidor en la nube o fallas de conectividad Wi-Fi en depósito que impidan leer remitos.",
                  "Personal: Resistencia del personal de depósito a abandonar el registro físico en papel.",
                  "Organizacional: Demoras en la toma de decisiones de la gerencia de Rosso Hnos. S.A. durante la validación.",
                  "Requerimientos: Cambios en la lógica de precios (mayoristas vs. minoristas) en etapa de Construcción.",
                  "Herramientas: Incompatibilidad temporal entre los lectores QR adquiridos y el módulo frontend del depósito.",
                ],
              },
            ],
          },
          {
            subtitulo: "Calendario Gantt y Marco de Desarrollo UP",
            items: [
              "Gantt Completo (4 Fases): abarca desde relevamiento y modelado hasta desarrollo, hardware, capacitación y puesta en marcha.",
              "Matriz UP: Requisitos y Entorno (c Inicio / r Elaboración); Dominio y Análisis (c Elaboración).",
            ],
            modalSecciones: [
              {
                titulo: "Estructura de Tareas del Diagrama de Gantt",
                destacado: false,
                items: [
                  "Fase de Inicio: Relevamiento y elicitación (entrevistas), modelado BPD, Documento de la Empresa y Documento Visión.",
                  "Fase de Elaboración: Especificación Complementaria y Glosario, Casos de Uso y prototipos, Modelo del Dominio y Análisis, DSS y Contratos, Transición de Estados y Estudio de Viabilidad.",
                  "Fase de Construcción: Desarrollo Frontend y Backend, integración del cotizador y gestión de stock, pruebas de validación (testing).",
                  "Fase de Transición: Manuales de usuario, instalación de hardware en sucursales y depósito, capacitación al personal (2 semanas) y puesta en marcha final.",
                ],
              },
              {
                titulo:
                  "Matriz de Disciplinas del Proceso Unificado (c = comenzar / r = refinar)",
                destacado: true,
                items: [
                  "Modelado del negocio: Modelo del dominio (c en Elaboración).",
                  "Requisitos: Casos de uso, Visión, Especificación complementaria y Glosario (c en Inicio, r en Elaboración).",
                  "Análisis y diseño: Modelo del análisis (c en Elaboración) | Pruebas: Modelo de Prueba (c en Elaboración, r en Construcción).",
                  "Implementación: Modelo de implementación (c en Elaboración, r en Construcción y Transición) | Gestión: Plan de desarrollo (c en Inicio, r en Elaboración, Construcción y Transición) e Informe de viabilidad (c en Inicio).",
                ],
              },
            ],
          },
        ],
        imagenes: [
          {
            src: "/diagramas/gantt.jpg",
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
              "Catálogo web interactivo con validación de stock en tiempo real y cálculo automático de presupuestos (CU1).",
              "Aprobación con descuento pago contado, selección de retiro/fletero (CU2) y seguimiento por código (CU5).",
            ],
            modalSecciones: [
              {
                titulo: "Secuencia Operativa en el Portal Cliente",
                destacado: false,
                items: [
                  "1. Cotización Web (CU1): Selección de materiales (Cemento, Ladrillo Hueco, Caño PVC, Hierro), carga de datos del cliente y sucursal (Tucumán/Salta) con verificación de stock.",
                  "2. Confirmación de Pedido (CU2): Revisión del presupuesto válido por 72 hs, elección de Retiro Personal o Fletero Externo, registro de pago y emisión de Orden de Pedido.",
                  "3. Seguimiento en Línea (CU5): Consulta pública mediante código de pedido visualizando la línea de tiempo de estados en tiempo real.",
                ],
              },
              {
                titulo: "Arquitectura de Software y Control de Concurrencia",
                destacado: true,
                items: [
                  "Diseño en 3 Capas: Interfaz Web responsiva (React + Tailwind CSS), capa de control de reglas de negocio y persistencia relacional.",
                  "Inventario en Dos Tiempos: Implementación de la reserva lógica (`cantidadReservada` vs. `cantidadDisponible`) para evitar sobreventas simultáneas entre sucursales.",
                ],
              },
            ],
          },
          {
            subtitulo: "Flujo 2: Intranet Operativa (Empleados)",
            items: [
              "Módulo de Depósito: bandeja de pedidos confirmados, inicio de picking y marcado como listo (CU3).",
              "Módulo de Despacho (CU4) con baja definitiva de stock y Administración de Catálogo e Inventario (CU6).",
            ],
            modalSecciones: [
              {
                titulo: "Secuencia Operativa en la Intranet",
                destacado: false,
                items: [
                  "1. Preparación en Depósito (CU3): Operario toma pedidos en estado 'Confirmado', inicia recolección ('En Preparación') y emite Ficha de Preparación ('Listo para Retiro').",
                  "2. Despacho y Entrega (CU4): Validación de comprobante comercial aprobado, registro de receptor/fletero, emisión de Remito y descuento definitivo del inventario.",
                  "3. Gestión de Catálogo (CU6): Actualización controlada de precios unitarios y stock disponible desde el panel administrativo.",
                ],
              },
              {
                titulo: "Trazabilidad con los Artefactos UML",
                destacado: true,
                items: [
                  "Correspondencia 1 a 1: Cada vista funcional materializa los 6 Casos de Uso, los 6 DSS, los 6 Contratos de Operación y la máquina de estados del Pedido.",
                  "Navegación directa: Botón/tecla [X] accede al Portal Cliente (/) y [Y] accede a la Intranet (/intranet).",
                ],
              },
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
            subtitulo: "Transformación Operacional y Escalabilidad Regional",
            items: [
              "Eliminación de cuellos de botella en cotizaciones manuales y triangulación telefónica Ventas–Depósito.",
              "Escalabilidad multi-sucursal (Tucumán y Salta) con trazabilidad completa desde presupuesto hasta remito.",
            ],
            modalSecciones: [
              {
                titulo: "Cuadro Comparativo de Transformación Operacional",
                destacado: false,
                items: [
                  "Cotizaciones y Catálogo: De gestión manual vía WhatsApp y planillas aisladas a plataforma web autogestionada en tiempo real (CU1) con catálogo unificado.",
                  "Gestión de Inventario: De stock desvinculado entre Tucumán y Salta a reserva atómica al confirmar (CU2) y baja física al despachar (CU4).",
                  "Trazabilidad y Despacho: De falta de seguimiento en preparación a ficha de picking interna (CU3), código público (CU5) y remito comercial (CU4).",
                ],
              },
              {
                titulo: "Valor Estratégico y Rigor Metodológico",
                destacado: true,
                items: [
                  "Escalabilidad regional: Soporte sincrónico entre las plantas de Tucumán y Salta neutralizando el costo de oportunidad por demoras en mostrador.",
                  "Consistencia UP/UML: Trazabilidad completa desde el BPD y Documento Visión hasta el Modelo del Dominio, Contratos e invariantes transaccionales.",
                ],
              },
            ],
          },
          {
            subtitulo: "Estrategia de Despliegue y Cierre Institucional",
            items: [
              "Migración inicial de maestro de artículos y clientes históricos, seguida de despliegue piloto por sucursal.",
              "Capacitación operativa por rol para Ventas y Depósito y respaldo documental del proyecto.",
            ],
            modalSecciones: [
              {
                titulo: "Lineamientos de Implantación y Puesta en Marcha",
                destacado: false,
                items: [
                  "Migración de datos (ETL): Saneamiento e importación del maestro de artículos, unidades de medida (bolsa, unidad, tira, varilla) y existencias iniciales.",
                  "Despliegue progresivo: Puesta en marcha piloto en casa central de Tucumán con acompañamiento técnico antes de extender a las sucursales de Salta.",
                  "Capacitación focalizada: Entrenamiento práctico por perfil (Ventas/Administración y Personal de Depósito) apoyado en manuales operativos y glosario unificado.",
                ],
              },
              {
                titulo: "Verificación y Documentación Final del Proyecto",
                destacado: true,
                items: [
                  "Pruebas orientadas a Contratos: Verificación automatizada de precondiciones y postcondiciones sobre cada operación crítica antes del paso a producción.",
                  "Cierre documental: Carpeta integrada con las 4 fases del Proceso Unificado, Estudio de Viabilidad, Glosario, Diccionario de Datos y anexos de relevamiento de Rosso Hnos. S.A.",
                ],
              },
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

  // Cálculo del progreso global de la exposición (barra superior)
  const totalTemas = keysFases.reduce(
    (acc, k) => acc + FASES[k].temas.length,
    0,
  );
  const temasPrevios = keysFases
    .slice(0, keysFases.indexOf(faseKey))
    .reduce((acc, k) => acc + FASES[k].temas.length, 0);
  const progresoPorcentaje = Math.round(
    ((temasPrevios + temaIdx + 1) / totalTemas) * 100,
  );

  useEffect(() => {
    setErrorImagen(false);
  }, [faseKey, temaIdx, imgIdx]);

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

        {/* Barra sutil de progreso de la presentación */}
        <div className="w-full h-[3px] bg-gray-200">
          <div
            className="h-full bg-red-600 transition-all duration-300 ease-out"
            style={{ width: `${progresoPorcentaje}%` }}
          />
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
                    {imagenesActuales.length === 7
                      ? idx === 0
                        ? "General"
                        : `Prototipo ${idx}`
                      : `Vista ${idx + 1}`}
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-2 h-[36vh] md:h-[50vh]">
              {!errorImagen ? (
                <img
                  key={imagenActiva.src}
                  src={imagenActiva.src}
                  alt={imagenActiva.pie}
                  onError={() => setErrorImagen(true)}
                  className="max-h-full max-w-full object-contain rounded animate-fade-suave"
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

      {/* MODAL 1: Especificación Completa del Apartado Seleccionado (Botón A) */}
      {modalAbierto === "bloque" && bloqueActivo && (
        <div
          onClick={() => setModalAbierto(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl border-t-8 border-red-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 animate-modal-in"
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

            <div className="space-y-4">
              {(bloqueActivo.modalSecciones || []).map((sec, sIdx) => (
                <div
                  key={sIdx}
                  className={
                    sec.destacado
                      ? "bg-red-50/70 border-l-4 border-red-600 rounded-r-xl p-4 sm:p-5"
                      : "bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5"
                  }
                >
                  <h4
                    className={`text-xs sm:text-sm font-bold uppercase tracking-wide mb-2.5 ${
                      sec.destacado ? "text-red-800" : "text-gray-600"
                    }`}
                  >
                    {sec.titulo}
                  </h4>
                  <ul className="space-y-2">
                    {sec.items.map((linea, lIdx) => (
                      <li
                        key={lIdx}
                        className="flex items-start text-sm sm:text-base text-gray-800 leading-relaxed"
                      >
                        <span
                          className={`font-bold mr-2.5 ${
                            sec.destacado ? "text-red-700" : "text-red-600"
                          }`}
                        >
                          {sec.destacado ? "▸" : "•"}
                        </span>
                        <span>{linea}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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
            key={imagenActiva.src}
            src={imagenActiva.src}
            alt={imagenActiva.pie}
            className="max-w-full max-h-[85vh] rounded shadow-2xl bg-white p-2 animate-modal-in"
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
