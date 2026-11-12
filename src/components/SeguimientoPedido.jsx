import { useState } from "react";

export default function SeguimientoPedido() {
  const [buscado, setBuscado] = useState(false);

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl max-w-3xl mx-auto border-t-4 border-red-600">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Rastrea tu Pedido
      </h2>

      {/* Buscador */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gray-50 p-6 rounded-lg border">
        <input
          type="text"
          placeholder="Ingresa tu Código de Seguimiento (Ej: 10245)"
          className="flex-1 p-3 border rounded-md font-mono text-center md:text-left focus:ring-2 focus:ring-red-200 outline-none"
        />
        <button
          onClick={() => setBuscado(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md shadow transition duration-200"
        >
          Buscar Pedido
        </button>
      </div>

      {/* Resultados de Búsqueda */}
      {buscado && (
        <div className="animate-fade-in-up border rounded-lg p-6 bg-white">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Pedido N° 10245
              </h3>
              <p className="text-sm text-gray-500">Sucursal Tucumán Centro</p>
            </div>
            <span className="bg-blue-100 text-blue-800 font-bold px-3 py-1 rounded">
              EN PREPARACIÓN
            </span>
          </div>

          {/* Línea de tiempo visual */}
          <div className="flex justify-between items-center mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-green-500 -z-10 transform -translate-y-1/2"></div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mb-2 shadow">
                ✓
              </div>
              <span className="text-xs font-semibold text-gray-600">
                Confirmado
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold mb-2 shadow animate-pulse">
                2
              </div>
              <span className="text-xs font-bold text-blue-600">
                En Preparación
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold mb-2">
                3
              </div>
              <span className="text-xs font-semibold text-gray-400">
                Listo para Retiro
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-bold mb-2">
                4
              </div>
              <span className="text-xs font-semibold text-gray-400">
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
