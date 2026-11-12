import { useState } from "react";

export default function ModuloDeposito() {
  // Estado local para simular la funcionalidad de la tabla
  const [estadoPedido, setEstadoPedido] = useState("Pendiente");

  return (
    <div className="bg-white p-6 shadow rounded-lg w-full border-t-4 border-gray-800">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="bg-gray-800 text-white p-2 rounded mr-3 text-sm">
          DEPÓSITO
        </span>
        Pedidos Pendientes
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-gray-200 text-gray-600 text-left text-sm uppercase font-semibold">
            <tr>
              <th className="py-3 px-4 border-b">N° Pedido</th>
              <th className="py-3 px-4 border-b">Cliente</th>
              <th className="py-3 px-4 border-b">Materiales a Preparar</th>
              <th className="py-3 px-4 border-b text-center">Estado Actual</th>
              <th className="py-3 px-4 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            <tr className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4 font-bold">10245</td>
              <td className="py-3 px-4">Pérez, Juan</td>
              <td className="py-3 px-4 text-xs">
                Cemento x2, Ladrillos x40, Caño x2
              </td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`px-2 py-1 rounded font-semibold text-xs ${
                    estadoPedido === "Pendiente"
                      ? "bg-yellow-100 text-yellow-800"
                      : estadoPedido === "En Preparación"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {estadoPedido}
                </span>
              </td>
              <td className="py-3 px-4 text-center space-x-2">
                <button
                  onClick={() => setEstadoPedido("En Preparación")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow text-xs"
                >
                  Iniciar Picking
                </button>
                <button
                  onClick={() => setEstadoPedido("Listo para Retiro")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow text-xs"
                >
                  Marcar Listo
                </button>
              </td>
            </tr>
            {/* Fila vacía de relleno para simular tabla real */}
            <tr className="hover:bg-gray-50 border-b opacity-50">
              <td className="py-3 px-4">10246</td>
              <td className="py-3 px-4">Constructora NOA</td>
              <td className="py-3 px-4 text-xs">Hierro del 8 x50</td>
              <td className="py-3 px-4 text-center">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                  Pendiente
                </span>
              </td>
              <td className="py-3 px-4 text-center">...</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
