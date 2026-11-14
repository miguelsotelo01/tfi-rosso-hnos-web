import { useState } from "react";
import { useStore } from "../context/useStore";

function statusClass(status) {
  if (status === "Entregado") return "bg-gray-200 text-gray-700";
  if (status === "Listo para Retiro") return "bg-green-200 text-green-800";
  if (status === "En Preparación") return "bg-blue-100 text-blue-800";
  return "bg-yellow-100 text-yellow-800";
}

export default function DespachoEntrega() {
  const { getOrder, updateOrderStatus } = useStore();
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState(null);
  const [buscado, setBuscado] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    setOrder(getOrder(query.trim()));
    setBuscado(true);
  };

  const handleDelivery = () => {
    if (order) {
      updateOrderStatus(order.id, "Entregado");
      setOrder({ ...order, status: "Entregado" });
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg border-t-4 border-gray-800 bg-white p-4 shadow lg:max-w-5xl sm:p-6">
      <h2 className="mb-6 flex flex-col items-start gap-2 text-xl font-bold text-gray-800 sm:flex-row sm:items-center sm:text-2xl">
        <span className="rounded bg-gray-800 p-2 text-sm text-white sm:mr-3">
          LOGÍSTICA
        </span>
        Despacho y Entrega de Materiales
      </h2>

      <form onSubmit={handleSearch} className="mb-8 flex flex-col gap-3 rounded border bg-gray-50 p-4 sm:flex-row sm:gap-4">
        <input
          type="text"
          placeholder="Ingrese N° de Pedido"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1 rounded border p-2 font-mono"
        />
        <button
          type="submit"
          className="rounded bg-gray-800 px-6 py-2 font-bold text-white shadow hover:bg-gray-900"
        >
          Buscar
        </button>
      </form>

      {buscado && !order && (
        <p className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          No se encontró un pedido con ese número.
        </p>
      )}

      {order && (
        <div className="animate-fade-in-up">
          <h3 className="mb-4 border-b pb-2 font-bold text-gray-700">
            Detalle del Pedido a Entregar:
          </h3>
          <div className="relative mb-6 grid grid-cols-1 gap-4 rounded border border-blue-200 bg-blue-50 p-4 md:grid-cols-2">
            <div>
              <p className="text-xl font-bold text-blue-900">Pedido N° {order.number}</p>
              <p className="mt-1 text-sm">
                Cliente: <span className="font-semibold">{order.customer.name}</span>
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Sucursal: <span className="font-semibold">{order.branch}</span>
              </p>
              <div className="mt-3 rounded border bg-white p-2 text-sm">
                <p className="font-bold text-green-700">
                  ✓ Presupuesto aprobado
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm text-gray-600">Estado en Depósito:</p>
                <span className={`mt-1 inline-block rounded px-3 py-1 font-bold ${statusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-3 text-sm">
                <p className="text-gray-600">Modalidad:</p>
                <p className="font-bold uppercase">{order.delivery}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleDelivery}
              disabled={order.status !== "Listo para Retiro"}
              className="w-full rounded bg-red-600 px-8 py-3 text-lg font-bold text-white shadow transition duration-200 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {order.status === "Entregado"
                ? "Entrega Confirmada"
                : "Confirmar Entrega"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
