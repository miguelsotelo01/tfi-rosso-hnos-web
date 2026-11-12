export default function GestionCatalogo() {
  const handleGuardar = () => {
    alert(
      "¡Cambios guardados exitosamente! El catálogo público ha sido actualizado.",
    );
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl max-w-5xl mx-auto border-t-4 border-gray-800">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <span className="bg-gray-800 text-white p-2 rounded mr-3 text-sm">
          ADMINISTRACIÓN
        </span>
        Gestión de Catálogo e Inventario
      </h2>

      <div className="overflow-x-auto border rounded-lg mb-6">
        <table className="min-w-full bg-white">
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

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 italic">
          * Los campos resaltados en amarillo permiten edición directa.
        </span>
        <div className="space-x-3">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded shadow transition">
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-8 rounded shadow transition"
          >
            Guardar Cambios del Catálogo
          </button>
        </div>
      </div>
    </div>
  );
}
