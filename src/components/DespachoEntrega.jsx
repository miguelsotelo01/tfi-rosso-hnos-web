import { useState } from "react";

export default function DespachoEntrega() {
  const [buscado, setBuscado] = useState(false);

  return (
    <div className="mx-auto max-w-3xl rounded-lg border-t-4 border-gray-800 bg-white p-4 shadow sm:p-6">
      <h2 className="mb-6 flex flex-col items-start gap-2 text-xl font-bold text-gray-800 sm:flex-row sm:items-center sm:text-2xl">
        <span className="rounded bg-gray-800 p-2 text-sm text-white sm:mr-3">
          LOGÍSTICA
        </span>
        Despacho y Entrega de Materiales
      </h2>

      {/* Buscador */}
      <div className="mb-8 flex flex-col gap-3 rounded border bg-gray-50 p-4 sm:flex-row sm:gap-4">
        <input
          type="text"
          placeholder="Ingrese Código de Seguimiento, N° Remito o DNI"
          className="flex-1 p-2 border rounded font-mono"
          defaultValue="10245"
        />
        <button
          onClick={() => setBuscado(true)}
          className="rounded bg-gray-800 px-6 py-2 font-bold text-white shadow hover:bg-gray-900"
        >
          Buscar
        </button>
      </div>

      {/* Resultado de búsqueda (Simulado) */}
      {buscado && (
        <div className="animate-fade-in-up">
          <h3 className="font-bold text-gray-700 border-b pb-2 mb-4">
            Detalle del Pedido a Entregar:
          </h3>

          <div className="relative mb-6 grid grid-cols-1 gap-4 rounded border border-blue-200 bg-blue-50 p-4 md:grid-cols-2">
            <div>
              <p className="font-bold text-xl text-blue-900">Pedido N° 10245</p>
              <p className="text-sm mt-1">
                Cliente: <span className="font-semibold">Pérez, Juan</span>
              </p>
              <div className="mt-3 text-sm bg-white p-2 border rounded">
                <p className="font-bold text-green-700 flex items-center">
                  ✓ Doc. Comercial Aprobada (Pagado)
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-600">Estado en Depósito:</p>
                <span className="bg-green-200 text-green-800 px-3 py-1 rounded font-bold inline-block mt-1">
                  LISTO PARA RETIRO
                </span>
              </div>
              <div className="mt-3 text-sm">
                <p className="text-gray-600">Transportista Autorizado:</p>
                <p className="font-bold uppercase">
                  Fletero Externo (Patente AB123CD)
                </p>
              </div>
            </div>
          </div>

          {/* Acción final */}
          <div className="flex justify-end">
            <button
              onClick={() =>
                alert(
                  "¡Entrega registrada exitosamente! Stock descontado de la Base de Datos.",
                )
              }
              className="w-full rounded bg-red-600 px-8 py-3 text-lg font-bold text-white shadow transition duration-200 hover:bg-red-700 sm:w-auto"
            >
              Confirmar Entrega y Descontar Stock
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
