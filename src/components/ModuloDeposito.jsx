import { useStore } from "../context/useStore";

function statusClass(status) {
  if (status === "En Preparación") return "bg-blue-100 text-blue-800";
  if (status === "Listo para Retiro") return "bg-green-100 text-green-800";
  return "bg-yellow-100 text-yellow-800";
}

function orderMaterials(order) {
  return order.items.map((item) => `${item.name} x${item.quantity}`).join(", ");
}

export default function ModuloDeposito() {
  const { orders, updateOrderStatus } = useStore();

  return (
    <div className="w-full rounded-lg border-t-4 border-gray-800 bg-white p-4 shadow sm:p-6">
      <h2 className="mb-6 flex flex-col items-start gap-2 text-xl font-bold text-gray-800 sm:flex-row sm:items-center sm:text-2xl">
        <span className="rounded bg-gray-800 p-2 text-sm text-white sm:mr-3">
          DEPÓSITO
        </span>
        Pedidos Pendientes
      </h2>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full rounded border bg-white">
          <thead className="bg-gray-200 text-left text-sm font-semibold uppercase text-gray-600">
            <tr>
              <th className="border-b px-4 py-3">N° Pedido</th>
              <th className="border-b px-4 py-3">Cliente</th>
              <th className="border-b px-4 py-3">Materiales a Preparar</th>
              <th className="border-b px-4 py-3 text-center">Estado Actual</th>
              <th className="border-b px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {orders.length ? (
              orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-bold">{order.number}</td>
                  <td className="px-4 py-3">{order.customer.name}</td>
                  <td className="px-4 py-3 text-xs">{orderMaterials(order)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`rounded px-2 py-1 text-xs font-semibold ${statusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="space-x-2 px-4 py-3 text-center">
                    <button
                      onClick={() => updateOrderStatus(order.id, "En Preparación")}
                      disabled={order.status !== "Pendiente"}
                      className="rounded bg-blue-500 px-3 py-1 text-xs text-white shadow hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Iniciar Picking
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, "Listo para Retiro")}
                      disabled={order.status === "Listo para Retiro" || order.status === "Entregado"}
                      className="rounded bg-green-500 px-3 py-1 text-xs text-white shadow hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Marcar Listo
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  No hay pedidos confirmados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 sm:hidden">
        {orders.length ? (
          orders.map((order) => (
            <article key={order.id} className="rounded border p-3 text-sm">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-gray-800">Pedido N° {order.number}</p>
                  <p className="text-gray-600">{order.customer.name}</p>
                </div>
                <span className={`rounded px-2 py-1 text-xs font-semibold ${statusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <p className="mb-3 text-xs text-gray-700">
                <strong>Materiales:</strong> {orderMaterials(order)}
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => updateOrderStatus(order.id, "En Preparación")}
                  disabled={order.status !== "Pendiente"}
                  className="rounded bg-blue-500 px-3 py-2 text-xs font-bold text-white shadow disabled:opacity-40"
                >
                  Iniciar Picking
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, "Listo para Retiro")}
                  disabled={order.status === "Listo para Retiro" || order.status === "Entregado"}
                  className="rounded bg-green-500 px-3 py-2 text-xs font-bold text-white shadow disabled:opacity-40"
                >
                  Marcar Listo
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="rounded border p-4 text-center text-sm text-gray-500">
            No hay pedidos confirmados.
          </p>
        )}
      </div>
    </div>
  );
}
