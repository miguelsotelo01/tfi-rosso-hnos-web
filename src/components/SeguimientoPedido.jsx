import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../context/useStore";

const statuses = ["Confirmado", "En Preparación", "Listo para Retiro", "Entregado"];

function currentStep(status) {
  if (status === "Entregado") return 3;
  if (status === "Listo para Retiro") return 2;
  if (status === "En Preparación") return 1;
  return 0;
}

export default function SeguimientoPedido() {
  const { getOrder } = useStore();
  const [searchParams] = useSearchParams();
  const requestedOrder = searchParams.get("pedido");
  const [query, setQuery] = useState(requestedOrder || "");
  const [order, setOrder] = useState(null);
  const [buscado, setBuscado] = useState(Boolean(requestedOrder));
  const displayedOrder =
    order || (query === requestedOrder && requestedOrder ? getOrder(requestedOrder) : null);

  const handleSearch = (event) => {
    event.preventDefault();
    setOrder(getOrder(query.trim()));
    setBuscado(true);
  };

  const step = displayedOrder ? currentStep(displayedOrder.status) : 0;

  return (
    <div className="mx-auto max-w-3xl rounded-xl border-t-4 border-red-600 bg-white p-4 shadow-lg sm:p-6">
      <h2 className="mb-6 text-center text-xl font-bold text-gray-800 sm:text-2xl">
        Rastrea tu Pedido
      </h2>

      <form onSubmit={handleSearch} className="mb-8 flex flex-col gap-3 rounded-lg border bg-gray-50 p-4 sm:gap-4 sm:p-6 md:flex-row">
        <input
          type="text"
          placeholder="Ingresa tu Código de Seguimiento (Ej: 10245)"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1 rounded-md border p-3 text-center font-mono outline-none focus:ring-2 focus:ring-red-200 md:text-left"
        />
        <button type="submit" className="rounded-md bg-red-600 px-6 py-3 font-bold text-white shadow transition duration-200 hover:bg-red-700 sm:px-8">
          Buscar Pedido
        </button>
      </form>

      {buscado && !displayedOrder && (
        <p className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          No se encontró un pedido con ese número.
        </p>
      )}

      {displayedOrder && (
        <div className="animate-fade-in-up rounded-lg border bg-white p-4 sm:p-6">
          <div className="mb-6 flex flex-col items-start gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Pedido N° {displayedOrder.number}</h3>
              <p className="text-sm text-gray-500">{displayedOrder.branch}</p>
            </div>
            <span className="rounded bg-blue-100 px-3 py-1 text-center text-sm font-bold text-blue-800">
              {displayedOrder.status.toUpperCase()}
            </span>
          </div>

          <div className="relative mb-8 flex flex-col gap-4 pl-10 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pl-0">
            <div className="absolute bottom-4 left-4 top-4 w-1 bg-gray-200 sm:hidden"></div>
            <div className="absolute left-4 top-4 h-1/2 w-1 bg-green-500 sm:hidden"></div>
            <div className="absolute left-0 top-1/2 hidden h-1 w-full -translate-y-1/2 transform bg-gray-200 sm:block"></div>
            <div
              className="absolute left-0 top-1/2 hidden h-1 -translate-y-1/2 transform bg-green-500 sm:block"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>

            {statuses.map((status, index) => (
              <div key={status} className="flex items-center gap-3 sm:flex-col">
                <div
                  className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold shadow ${
                    index <= step
                      ? index === step
                        ? "bg-blue-500 text-white"
                        : "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {index === 0 ? "✓" : index + 1}
                </div>
                <span
                  className={`text-xs sm:mt-2 ${
                    index === step
                      ? "font-bold text-blue-600"
                      : index < step
                        ? "font-semibold text-gray-600"
                        : "font-semibold text-gray-400"
                  }`}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded bg-gray-50 p-4 text-sm text-gray-700">
            <strong>Materiales:</strong>{" "}
            {displayedOrder.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}.
            <br />
            <span className="mt-2 block italic text-gray-500">
              Estado actualizado desde los módulos internos de depósito y logística.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
