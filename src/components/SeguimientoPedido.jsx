import { useState } from "react";

export default function SeguimientoPedido() {
  const [buscado, setBuscado] = useState(false);

  return (
    <div className="mx-auto max-w-3xl rounded-xl border-t-4 border-red-600 bg-white p-4 shadow-lg sm:p-6">
      <h2 className="mb-6 text-center text-xl font-bold text-gray-800 sm:text-2xl">
        Rastrea tu Pedido
      </h2>

      {/* Buscador */}
      <div className="mb-8 flex flex-col gap-3 rounded-lg border bg-gray-50 p-4 sm:gap-4 sm:p-6 md:flex-row">
        <input
          type="text"
          placeholder="Ingresa tu Código de Seguimiento (Ej: 10245)"
          className="flex-1 p-3 border rounded-md font-mono text-center md:text-left focus:ring-2 focus:ring-red-200 outline-none"
        />
        <button
          onClick={() => setBuscado(true)}
          className="rounded-md bg-red-600 px-6 py-3 font-bold text-white shadow transition duration-200 hover:bg-red-700 sm:px-8"
        >
          Buscar Pedido
        </button>
      </div>

      {/* Resultados de Búsqueda */}
      {buscado && (
        <div className="animate-fade-in-up rounded-lg border bg-white p-4 sm:p-6">
          <div className="mb-6 flex flex-col items-start gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Pedido N° 10245
              </h3>
              <p className="text-sm text-gray-500">Sucursal Tucumán Centro</p>
            </div>
            <span className="rounded bg-blue-100 px-3 py-1 text-center text-sm font-bold text-blue-800">
              EN PREPARACIÓN
            </span>
          </div>

          {/* Línea de tiempo visual */}
          <div className="relative mb-8 flex flex-col gap-4 pl-10 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pl-0">
            <div className="absolute bottom-4 left-4 top-4 w-1 bg-gray-200 sm:hidden"></div>
            <div className="absolute left-4 top-4 h-1/2 w-1 bg-green-500 sm:hidden"></div>
            <div className="absolute left-0 top-1/2 hidden h-1 w-full -translate-y-1/2 transform bg-gray-200 sm:block"></div>
            <div className="absolute left-0 top-1/2 hidden h-1 w-1/2 -translate-y-1/2 transform bg-green-500 sm:block"></div>

            <div className="flex items-center gap-3 sm:flex-col">
              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 font-bold text-white shadow">
                ✓
              </div>
              <span className="text-xs font-semibold text-gray-600 sm:mt-2">
                Confirmado
              </span>
            </div>
            <div className="flex items-center gap-3 sm:flex-col">
              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 font-bold text-white shadow animate-pulse">
                2
              </div>
              <span className="text-xs font-bold text-blue-600 sm:mt-2">
                En Preparación
              </span>
            </div>
            <div className="flex items-center gap-3 sm:flex-col">
              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300 font-bold text-gray-500">
                3
              </div>
              <span className="text-xs font-semibold text-gray-400 sm:mt-2">
                Listo para Retiro
              </span>
            </div>
            <div className="flex items-center gap-3 sm:flex-col">
              <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-300 font-bold text-gray-500">
                4
              </div>
              <span className="text-xs font-semibold text-gray-400 sm:mt-2">
                Entregado
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded text-sm text-gray-700">
            <strong>Materiales:</strong> Cemento Loma Negra x2, Ladrillo Hueco
            x40, Caño PVC x2.
            <br />
            <span className="text-gray-500 italic mt-2 block">
              Los operarios están recolectando tus materiales en el depósito. Te
              notificaremos cuando esté listo para retirar.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
