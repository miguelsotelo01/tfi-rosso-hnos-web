export default function GestionCatalogo() {
  const handleGuardar = () => {
    alert(
      "¡Cambios guardados exitosamente! El catálogo público ha sido actualizado.",
    );
  };

  return (
    <div className="mx-auto max-w-5xl rounded-xl border-t-4 border-gray-800 bg-white p-4 shadow-lg sm:p-6">
      <h2 className="mb-6 flex flex-col items-start gap-2 text-xl font-bold text-gray-800 sm:flex-row sm:items-center sm:text-2xl">
        <span className="rounded bg-gray-800 p-2 text-sm text-white sm:mr-3">
          ADMINISTRACIÓN
        </span>
        Gestión de Catálogo e Inventario
      </h2>

      <div className="mb-6 hidden overflow-x-auto rounded-lg border sm:block">
        <table className="min-w-[700px] bg-white">
          <thead className="bg-gray-100 text-gray-600 text-left text-sm uppercase font-bold">
            <tr>
              <th className="py-3 px-4 border-b">Código</th>
              <th className="py-3 px-4 border-b">Producto</th>
              <th className="py-3 px-4 border-b w-32">Precio Unit. ($)</th>
              <th className="py-3 px-4 border-b w-32">Stock Físico</th>
              <th className="py-3 px-4 border-b text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            <tr className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4 font-mono">CEM-01</td>
              <td className="py-3 px-4 font-semibold">
                Cemento Loma Negra 50kg
              </td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  defaultValue="10000"
                  className="w-full p-1 border rounded bg-yellow-50 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
                />
              </td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  defaultValue="1500"
                  className="w-full p-1 border rounded bg-yellow-50 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
                />
              </td>
              <td className="py-3 px-4 text-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                  Activo
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4 font-mono">LAD-02</td>
              <td className="py-3 px-4 font-semibold">
                Ladrillo Hueco 18x18x33
              </td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  defaultValue="500"
                  className="w-full p-1 border rounded bg-yellow-50 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
                />
              </td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  defaultValue="5000"
                  className="w-full p-1 border rounded bg-yellow-50 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
                />
              </td>
              <td className="py-3 px-4 text-center">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                  Activo
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-50 border-b opacity-50">
              <td className="py-3 px-4 font-mono">CAÑ-03</td>
              <td className="py-3 px-4 font-semibold">Caño PVC 110mm x 4m</td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  defaultValue="12500"
                  disabled
                  className="w-full p-1 border rounded bg-gray-100 text-right font-mono"
                />
              </td>
              <td className="py-3 px-4">
                <input
                  type="number"
                  defaultValue="0"
                  disabled
                  className="w-full p-1 border rounded bg-gray-100 text-right font-mono text-red-500"
                />
              </td>
              <td className="py-3 px-4 text-center">
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">
                  Sin Stock
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6 space-y-3 sm:hidden">
        <article className="rounded-lg border p-3">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-gray-500">CEM-01</p>
              <p className="font-semibold text-gray-700">Cemento Loma Negra 50kg</p>
            </div>
            <span className="rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-800">
              Activo
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-bold text-gray-600">
              Precio unitario
              <input
                type="number"
                defaultValue="10000"
                className="mt-1 w-full rounded border bg-yellow-50 p-2 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
              />
            </label>
            <label className="text-xs font-bold text-gray-600">
              Stock físico
              <input
                type="number"
                defaultValue="1500"
                className="mt-1 w-full rounded border bg-yellow-50 p-2 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
              />
            </label>
          </div>
        </article>

        <article className="rounded-lg border p-3">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-gray-500">LAD-02</p>
              <p className="font-semibold text-gray-700">Ladrillo Hueco 18x18x33</p>
            </div>
            <span className="rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-800">
              Activo
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-bold text-gray-600">
              Precio unitario
              <input
                type="number"
                defaultValue="500"
                className="mt-1 w-full rounded border bg-yellow-50 p-2 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
              />
            </label>
            <label className="text-xs font-bold text-gray-600">
              Stock físico
              <input
                type="number"
                defaultValue="5000"
                className="mt-1 w-full rounded border bg-yellow-50 p-2 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
              />
            </label>
          </div>
        </article>

        <article className="rounded-lg border p-3 opacity-50">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-gray-500">CAÑ-03</p>
              <p className="font-semibold text-gray-700">Caño PVC 110mm x 4m</p>
            </div>
            <span className="rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-800">
              Sin Stock
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-bold text-gray-600">
              Precio unitario
              <input
                type="number"
                defaultValue="12500"
                disabled
                className="mt-1 w-full rounded border bg-gray-100 p-2 text-right font-mono"
              />
            </label>
            <label className="text-xs font-bold text-gray-600">
              Stock físico
              <input
                type="number"
                defaultValue="0"
                disabled
                className="mt-1 w-full rounded border bg-gray-100 p-2 text-right font-mono text-red-500"
              />
            </label>
          </div>
        </article>
      </div>

      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 italic">
          * Los campos resaltados en amarillo permiten edición directa.
        </span>
        <div className="flex flex-col gap-3 sm:flex-row sm:space-x-3 sm:gap-0">
          <button className="rounded bg-gray-200 px-6 py-2 font-bold text-gray-800 shadow transition hover:bg-gray-300">
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="rounded bg-gray-800 px-8 py-2 font-bold text-white shadow transition hover:bg-gray-900"
          >
            Guardar Cambios del Catálogo
          </button>
        </div>
      </div>
    </div>
  );
}
