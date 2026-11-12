import { useState } from "react";

export default function DespachoEntrega() {
  const [buscado, setBuscado] = useState(false);

  return (
    <div className="bg-white p-6 shadow rounded-lg max-w-3xl mx-auto border-t-4 border-gray-800">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="bg-gray-800 text-white p-2 rounded mr-3 text-sm">
          LOGÍSTICA
        </span>
        Despacho y Entrega de Materiales
      </h2>

      {/* Buscador */}
      <div className="flex gap-4 mb-8 bg-gray-50 p-4 rounded border">
        <input
          type="text"
          placeholder="Ingrese Código de Seguimiento, N° Remito o DNI"
          className="flex-1 p-2 border rounded font-mono"
          defaultValue="10245"
        />
        <button
          onClick={() => setBuscado(true)}
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-6 rounded shadow"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-blue-50 border border-blue-200 p-4 rounded relative">
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
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow text-lg transition duration-200"
            >
              Confirmar Entrega y Descontar Stock
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
