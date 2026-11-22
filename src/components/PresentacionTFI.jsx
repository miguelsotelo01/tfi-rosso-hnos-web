import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useXboxNav } from "../hooks/useXboxNav";

const FASES = {
  inicio: {
    titulo: "1. Fase de Inicio",
    expositor: "Bloque 1",
    subtitulo:
      "Relevamiento organizacional, alcance, reglas de negocio y casos de uso",
    temas: [
      {
        nombre: "Empresa y BPD (As-Is)",
        bloques: [
          {
            subtitulo: "Organización y Contexto",
            items: [
              "Rosso Hnos. S.A.: comercialización de materiales de construcción (sucursales en Tucumán y Salta) y unidad Rosso Mix.",
              "Áreas involucradas: Ventas/Mostrador, Depósito/Almacén, Logística y Administración.",
            ],
            detalle: [
              "Estructura comercial: atiende tanto a clientes particulares en mostrador como a profesionales y empresas constructoras de gran volumen.",
              "Unidad Rosso Mix: división especializada en producción y distribución de hormigón elaborado.",
              "Fuentes del relevamiento: entrevistas semiestructuradas a Encargado de Depósito, Personal de Ventas y Fletero externo, junto a registros históricos de inventario.",
            ],
          },
          {
            subtitulo: "Problemática Actual (As-Is)",
            items: [
              "Cotizaciones manuales y consultas informales por teléfono o WhatsApp con demoras de respuesta.",
              "Falta de visibilidad en tiempo real del stock entre Ventas y Depósito, generando quiebres y reprocesos.",
            ],
            detalle: [
              "Cuello de botella en mostrador: el vendedor debe consultar físicamente o por teléfono la disponibilidad en almacén antes de emitir un presupuesto.",
              "Desincronización de inventario: al no existir reserva lógica, dos vendedores pueden comprometer el mismo lote de material crítico.",
              "Impacto económico: pérdida de presupuestos por lentitud de respuesta y demoras en el despacho hacia obra.",
            ],
          },
        ],
        imagen: "/diagramas/bpd.png",
        pieImagen: "Diagrama de Procesos de Negocio Actuales (BPD)",
      },
      {
        nombre: "Visión, Alcance y Reglas",
        bloques: [
          {
            subtitulo: "Alcance del Sistema (To-Be)",
            items: [
              "Incluye: catálogo web, cotización autogestionada, reserva lógica de stock, preparación en depósito y despacho.",
              "Excluye: contabilidad general, gestión de compras a proveedores y logística interna de fleteros externos.",
            ],
            detalle: [
              "Frontera del sistema: cubre desde que el cliente arma su presupuesto en la web hasta que el operario emite el remito y descuenta el stock físico en despacho.",
              "Sistemas fuera de alcance: liquidación de sueldos, balances contables (ERP administrativo) y seguimiento GPS de transportistas terceros.",
              "Seguridad de acceso: la autenticación de empleados en Intranet se establece como requisito no funcional en la Especificación Complementaria.",
            ],
          },
          {
            subtitulo: "Reglas de Negocio Clave",
            items: [
              "RN01: Todo presupuesto web tiene una validez de 72 horas corridas con reserva temporal de stock.",
              "RN02: Modalidades de entrega diferenciadas entre Retiro Personal en sucursal y Envío por Fletero Externo.",
              "RN03: Validación obligatoria de documentación comercial aprobada antes de confirmar el despacho.",
            ],
            detalle: [
              "Justificación de RN01 (72 hs): protege el inventario frente a presupuestos abandonados; vencido el plazo, el sistema libera el stock automáticamente.",
              "Justificación de RN02: si retira un fletero externo contratado por el cliente, el sistema registra los datos del transportista y patente para autorizar la carga.",
              "Justificación de RN03: ningún material sale del depósito sin comprobante/remito validado en el módulo de despacho.",
            ],
          },
        ],
        imagen: null,
      },
      {
        nombre: "Casos de Uso (CU 1–6)",
        bloques: [
          {
            subtitulo: "Portal Público (Cliente)",
            items: [
              "CU1 – Solicitar Cotización Web: selección de materiales, cantidades, datos y sucursal.",
              "CU2 – Aprobar Presupuesto y Registrar Pedido: confirmación y elección de retiro/envío.",
              "CU5 – Consultar Estado de Pedido: seguimiento en línea mediante código.",
            ],
            detalle: [
              "Actor principal: Cliente (acceso público sin fricción de registro previo para agilizar cotizaciones).",
              "Flujo CU1 → CU2: el presupuesto generado en CU1 devuelve un código único y precio congelado por 72 hs; al aprobarlo en CU2, pasa de Cotización a Pedido confirmado.",
              "Trazabilidad en CU5: reduce las llamadas telefónicas al corralón permitiendo ver en tiempo real si el pedido está Confirmado, En Preparación o Listo para Retiro.",
            ],
          },
          {
            subtitulo: "Intranet Operativa (Empleados)",
            items: [
              'CU3 – Gestionar Preparación en Depósito: picking y cambio a "Listo para Retiro".',
              "CU4 – Validar y Registrar Despacho: entrega final y descuento definitivo de stock.",
              "CU6 – Gestionar Catálogo e Inventario: actualización de precios y existencias.",
            ],
            detalle: [
              "Actores internos: Personal de Depósito (opera CU3 y CU4) y Administrador / Ventas (opera CU6).",
              'Control de stock en dos pasos: en CU2 se pasa stock de "Disponible" a "Reservado", y recién en CU4 (despacho efectivo) se descuenta definitivamente del inventario.',
              "Especificación completa: los 6 casos cuentan con precondiciones, postcondiciones, flujo normal, extensiones y prototipos no operacionales.",
            ],
          },
        ],
        imagen: "/diagramas/casos-uso.png",
        pieImagen: "Diagrama General de Casos de Uso UML",
      },
    ],
  },
  elaboracion: {
    titulo: "2. Fase de Elaboración",
    expositor: "Bloque 2",
    subtitulo:
      "Modelado conceptual, comportamiento dinámico y análisis de viabilidad",
    temas: [
      {
        nombre: "Modelo del Dominio",
        bloques: [
          {
            subtitulo: "Clases Conceptuales Centrales",
            items: [
              "Núcleo comercial: Cliente, Cotizacion, DetalleCotizacion, Pedido, LineaPedido y Remito.",
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
              "Stock por sucursal: StockInventario vincula Producto con Sucursal diferenciando cantidad física total de cantidad reservada.",
            ],
          },
        ],
        imagen: "/diagramas/dominio.png",
        pieImagen: "Modelo del Dominio UML",
      },
      {
        nombre: "DSS, Contratos y Estados",
        bloques: [
          {
            subtitulo: "Dinámica y Contratos (DSS 1–6)",
            items: [
              "6 Diagramas de Secuencia del Sistema con barras de activación por sesión y por evento.",
              "Contratos de operación especificando precondiciones y postcondiciones sobre instancias y asociaciones.",
            ],
            detalle: [
              "Convención de barras de activación: barra continua en la línea de vida del Actor (duración de la sesión) y barras puntuales en :Sistema por cada evento procesado.",
              "Contratos de operación: formalizan creación de instancias (ej. Pedido, Remito), formación de asociaciones y modificación de atributos de stock.",
              "Modelo de Análisis (BCE): apertura de la caja negra del sistema en objetos Borde (:UI...), Control (:Coordinador...) y Entidad (:Pedido, :StockInventario).",
            ],
          },
          {
            subtitulo: "Ciclo de Vida del Pedido",
            items: [
              "Estados: Confirmado → En Preparación → Listo para Retiro → Entregado (Estado Final).",
              "El objeto Pedido nace directamente al aprobarse el presupuesto y reservarse el stock.",
            ],
            detalle: [
              "Transición 1: [Inicial] aprobarPresupuesto() / crearPedido(), reservarStock() → Confirmado.",
              "Transición 2: iniciarPreparacion() / notificarDeposito() → En Preparación (actividad interna: do / realizar picking físico).",
              "Transición 3 y 4: finalizarPicking() / emitirRemito() → Listo para Retiro → registrarEntrega() / descontarStockDefinitivo() → Entregado.",
            ],
          },
        ],
        imagen: "/diagramas/estados.png",
        pieImagen: "Diagrama de Transición de Estados (Objeto: Pedido)",
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
              "Infraestructura requerida: servidores cloud de alta disponibilidad, PCs estándar en mostrador/depósito y dispositivos móviles/lectores para validar remitos.",
              "Adopción operacional: al separar el Portal Público de la Intranet por roles, cada empleado ve únicamente las acciones de su puesto.",
              "Gestión de riesgos: mitigación de sobreventa mediante reserva lógica a 72 hs y validación temprana con prototipos.",
            ],
          },
          {
            subtitulo: "Viabilidad Económica y Cronograma",
            items: [
              "Inversión desglosada en hardware ($7.290.000), software ($725.000) y equipo de desarrollo ($9.300.000 a dedicación parcial en 3 meses).",
              "Planificación iterativa en GanttProject abarcando las 4 fases del Proceso Unificado.",
            ],
            detalle: [
              "Criterio de costos de personal ($9.300.000): las horas presupuestadas reflejan dedicación parcial de los roles del equipo distribuida a lo largo de los 3 meses.",
              "Retorno de inversión (ROI): amortización impulsada por el ahorro de horas-hombre en presupuestos manuales y reducción de errores de despacho.",
              "Cronograma UP: Inicio (relevamiento y CU), Elaboración (UML y viabilidad), Construcción (prototipo web) y Transición (despliegue).",
            ],
          },
        ],
        imagen: "/diagramas/gantt.png",
        pieImagen: "Diagrama de Gantt del Proyecto",
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
              "Paso 1 en vivo: seleccionar materiales en el catálogo con scroll independiente, completar datos del cliente y generar presupuesto.",
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
        imagen: null,
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
              "Aval institucional: proyecto respaldado mediante nota formal firmada por Recursos Humanos de Rosso Hnos. S.A.",
            ],
          },
        ],
        imagen: null,
      },
    ],
  },
};

export default function PresentacionTFI() {
  const [faseKey, setFaseKey] = useState("inicio");
  const [temaIdx, setTemaIdx] = useState(0);
  const [foco, setFoco] = useState("bloque"); // 'bloque' | 'imagen'
  const [bloqueIdx, setBloqueIdx] = useState(0);
  const [modalAbierto, setModalAbierto] = useState(null); // null | 'bloque' | 'imagen'
  const [errorImagen, setErrorImagen] = useState(false);

  const navigate = useNavigate();
  const bloqueRefs = useRef([]);

  const faseActual = FASES[faseKey];
  const temaActual = faseActual.temas[temaIdx] || faseActual.temas[0];
  const bloquesActuales = temaActual.bloques || [];
  const bloqueActivo = bloquesActuales[bloqueIdx] || bloquesActuales[0];
  const keysFases = Object.keys(FASES);

  // Reinicia el estado de error de imagen al cambiar de diapositiva
  useEffect(() => {
    setErrorImagen(false);
  }, [faseKey, temaIdx]);

  // Si hay varios bloques con mucho texto, hace scroll suave hacia el recuadro seleccionado
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
    setModalAbierto(null);
  };

  const cambiarTema = (nuevoIdx) => {
    setTemaIdx(nuevoIdx);
    setFoco("bloque");
    setBloqueIdx(0);
    setModalAbierto(null);
  };

  const mandoConectado = useXboxNav({
    onSiguientePaso: () => {
      setModalAbierto(null);
      setFoco("bloque");
      setBloqueIdx(0);
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
      if (modalAbierto) return;
      if (foco === "imagen") {
        setFoco("bloque");
        setBloqueIdx(0);
      } else {
        setBloqueIdx((prev) =>
          prev < bloquesActuales.length - 1 ? prev + 1 : 0,
        );
      }
    },
    onArriba: () => {
      if (modalAbierto) return;
      if (foco === "imagen") {
        setFoco("bloque");
        setBloqueIdx(bloquesActuales.length - 1);
      } else {
        setBloqueIdx((prev) =>
          prev > 0 ? prev - 1 : bloquesActuales.length - 1,
        );
      }
    },
    onDerecha: () => {
      if (modalAbierto) return;
      if (temaActual.imagen) {
        setFoco("imagen");
      } else if (bloqueIdx < bloquesActuales.length - 1) {
        setFoco("bloque");
        setBloqueIdx(bloqueIdx + 1);
      }
    },
    onIzquierda: () => {
      if (modalAbierto) return;
      if (foco === "imagen") {
        setFoco("bloque");
      } else if (!temaActual.imagen && bloqueIdx > 0) {
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
      } else if (foco === "imagen" && temaActual.imagen) {
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
      {/* Cabecera de Navegación Principal (Compacta para proyectores 768p y móvil) */}
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
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-800 leading-tight">
              {faseActual.titulo}
            </h2>
            <p className="text-xs text-gray-500">{faseActual.subtitulo}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
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

      {/* Área de Contenido: Mantiene 2 columnas desde 768px (md:) para proyectores 4:3 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* TARJETA IZQUIERDA (Con scroll interno controlado por stick para textos largos) */}
        <div
          className={`bg-white rounded-xl p-4 md:p-5 border border-gray-200 shadow-md flex flex-col justify-between ${
            temaActual.imagen ? "md:col-span-5" : "md:col-span-12"
          }`}
        >
          <div>
            <div className="border-b pb-2 mb-3 flex items-center justify-between gap-2">
              <h3 className="text-base md:text-lg font-bold text-gray-800">
                {temaActual.nombre}
              </h3>
              <span className="text-[11px] text-gray-400 shrink-0">
                Stick ↑↓ • [A] Detalle
              </span>
            </div>

            <div
              className={`grid gap-3 md:max-h-[56vh] md:overflow-y-auto p-1 ${
                temaActual.imagen ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
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

        {/* TARJETA DERECHA: Diagrama UML / Gráfico */}
        {temaActual.imagen && (
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
            <div className="flex items-center justify-between border-b pb-2 mb-3 gap-2">
              <span className="text-xs md:text-sm font-bold text-gray-700 truncate">
                {temaActual.pieImagen}
              </span>
              {foco === "imagen" ? (
                <span className="text-[10px] md:text-[11px] font-bold bg-red-600 text-white px-2.5 py-0.5 rounded-full shrink-0">
                  Seleccionado • [A] Ampliar ⤢
                </span>
              ) : (
                <span className="text-[11px] text-gray-400 shrink-0">
                  Stick Der. →
                </span>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-2 h-[36vh] md:h-[52vh]">
              {!errorImagen ? (
                <img
                  src={temaActual.imagen}
                  alt={temaActual.pieImagen}
                  onError={() => setErrorImagen(true)}
                  className="max-h-full max-w-full object-contain rounded"
                />
              ) : (
                <div className="text-center p-4 text-gray-400">
                  <p className="text-sm font-semibold text-gray-500">
                    {temaActual.pieImagen}
                  </p>
                  <p className="text-xs mt-1">
                    Guardar archivo en:{" "}
                    <code className="bg-gray-200 px-1.5 py-0.5 rounded text-gray-700">
                      public{temaActual.imagen}
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

      {/* MODAL 2: Diagrama a Pantalla Completa (Botón A sobre Imagen) */}
      {modalAbierto === "imagen" && temaActual.imagen && (
        <div
          onClick={() => setModalAbierto(null)}
          className="fixed inset-0 bg-black/85 z-50 flex flex-col items-center justify-center p-3 sm:p-4 cursor-zoom-out"
        >
          <img
            src={temaActual.imagen}
            alt={temaActual.pieImagen}
            className="max-w-full max-h-[85vh] rounded shadow-2xl bg-white p-2"
          />
          <span className="mt-3 text-xs text-gray-200 bg-gray-900/90 px-4 py-1.5 rounded-full text-center">
            {temaActual.pieImagen} • Apretá [A] o [B] para volver
          </span>
        </div>
      )}
    </div>
  );
}
