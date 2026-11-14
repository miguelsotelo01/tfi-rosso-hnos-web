import { useState } from "react";

export default function ModuloDeposito() {
  // Estado local para simular la funcionalidad de la tabla
  const [estadoPedido, setEstadoPedido] = useState("Pendiente");

  return (
    <div className="w-full rounded-lg border-t-4 border-gray-800 bg-white p-4 shadow sm:p-6">
      <h2 className="mb-6 flex flex-col items-start gap-2 text-xl font-bold text-gray-800 sm:flex-row sm:items-center sm:text-2xl">
        <span className="rounded bg-gray-800 p-2 text-sm text-white sm:mr-3">
          DEPÓSITO
        </span>
        Pedidos Pendientes
      </h2>

      <div className="hidden overflow-x-auto sm:block">
        <table className="min-w-[760px] rounded border bg-white">
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

      <div className="space-y-3 sm:hidden">
        <article className="rounded border p-3 text-sm">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-bold text-gray-800">Pedido N° 10245</p>
              <p className="text-gray-600">Pérez, Juan</p>
            </div>
            <span
              className={`rounded px-2 py-1 text-xs font-semibold ${
                estadoPedido === "Pendiente"
                  ? "bg-yellow-100 text-yellow-800"
                  : estadoPedido === "En Preparación"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
              }`}
            >
              {estadoPedido}
            </span>
          </div>
          <p className="mb-3 text-xs text-gray-700">
            <strong>Materiales:</strong> Cemento x2, Ladrillos x40, Caño x2
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setEstadoPedido("En Preparación")}
              className="rounded bg-blue-500 px-3 py-2 text-xs font-bold text-white shadow hover:bg-blue-600"
            >
              Iniciar Picking
            </button>
            <button
              onClick={() => setEstadoPedido("Listo para Retiro")}
              className="rounded bg-green-500 px-3 py-2 text-xs font-bold text-white shadow hover:bg-green-600"
            >
              Marcar Listo
            </button>
          </div>
        </article>

        <article className="rounded border p-3 text-sm opacity-60">
          <p className="font-bold text-gray-800">Pedido N° 10246</p>
          <p className="text-gray-600">Constructora NOA</p>
          <p className="mt-2 text-xs text-gray-700">
            <strong>Materiales:</strong> Hierro del 8 x50
          </p>
          <span className="mt-3 inline-block rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
            Pendiente
          </span>
        </article>
      </div>
    </div>
  );
}
