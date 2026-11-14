import { useState } from "react";
import { useStore } from "../context/useStore";

function productStatus(product) {
  return product.stock > 0 ? "Activo" : "Sin Stock";
}

export default function GestionCatalogo() {
  const { products, saveProducts } = useStore();
  const [draftProducts, setDraftProducts] = useState(products);
  const [mostrarNuevo, setMostrarNuevo] = useState(false);
  const [newProduct, setNewProduct] = useState({
    code: "",
    name: "",
    price: "",
    stock: "",
    image: "",
  });

  const updateProduct = (id, field, value) => {
    setDraftProducts((current) =>
      current.map((product) =>
        product.id === id
          ? {
              ...product,
              [field]: field === "price" || field === "stock" ? Number(value) || 0 : value,
            }
          : product,
      ),
    );
  };

  const handleGuardar = () => {
    saveProducts(draftProducts);
    alert("¡Cambios guardados exitosamente! El catálogo público ha sido actualizado.");
  };

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((current) => ({ ...current, [name]: value }));
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    if (!newProduct.code || !newProduct.name || !newProduct.price) {
      alert("Completá código, nombre y precio del producto.");
      return;
    }
    const product = {
      id: Date.now(),
      code: newProduct.code.toUpperCase(),
      name: newProduct.name,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock) || 0,
      image:
        newProduct.image ||
        "https://placehold.co/240x240/e5e7eb/374151?text=Producto",
      active: true,
    };
    setDraftProducts((current) => [...current, product]);
    setNewProduct({ code: "", name: "", price: "", stock: "", image: "" });
    setMostrarNuevo(false);
  };

  return (
    <div className="mx-auto max-w-5xl rounded-xl border-t-4 border-gray-800 bg-white p-4 shadow-lg lg:max-w-6xl sm:p-6">
      <h2 className="mb-6 flex flex-col items-start gap-2 text-xl font-bold text-gray-800 sm:flex-row sm:items-center sm:text-2xl">
        <span className="rounded bg-gray-800 p-2 text-sm text-white sm:mr-3">
          ADMINISTRACIÓN
        </span>
        Gestión de Catálogo e Inventario
      </h2>

      <div className="mb-6 hidden overflow-x-auto rounded-lg border sm:block">
        <table className="w-full bg-white">
          <thead className="bg-gray-100 text-left text-sm font-bold uppercase text-gray-600">
            <tr>
              <th className="border-b px-4 py-3">Código</th>
              <th className="border-b px-4 py-3">Producto</th>
              <th className="w-32 border-b px-4 py-3">Precio Unit. ($)</th>
              <th className="w-32 border-b px-4 py-3">Stock Físico</th>
              <th className="border-b px-4 py-3 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {draftProducts.map((product) => (
              <tr key={product.id} className={`border-b hover:bg-gray-50 ${product.stock === 0 ? "opacity-50" : ""}`}>
                <td className="px-4 py-3 font-mono">{product.code}</td>
                <td className="px-4 py-3 font-semibold">{product.name}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    value={product.price}
                    onChange={(event) => updateProduct(product.id, "price", event.target.value)}
                    className="w-full rounded border bg-yellow-50 p-1 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    value={product.stock}
                    onChange={(event) => updateProduct(product.id, "stock", event.target.value)}
                    className="w-full rounded border bg-yellow-50 p-1 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`rounded px-2 py-1 text-xs font-bold ${product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {productStatus(product)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6 space-y-3 sm:hidden">
        {draftProducts.map((product) => (
          <article key={product.id} className={`rounded-lg border p-3 ${product.stock === 0 ? "opacity-50" : ""}`}>
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-gray-500">{product.code}</p>
                <p className="font-semibold text-gray-700">{product.name}</p>
              </div>
              <span className={`rounded px-2 py-1 text-xs font-bold ${product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {productStatus(product)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs font-bold text-gray-600">
                Precio unitario
                <input
                  type="number"
                  value={product.price}
                  onChange={(event) => updateProduct(product.id, "price", event.target.value)}
                  className="mt-1 w-full rounded border bg-yellow-50 p-2 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
                />
              </label>
              <label className="text-xs font-bold text-gray-600">
                Stock físico
                <input
                  type="number"
                  min="0"
                  value={product.stock}
                  onChange={(event) => updateProduct(product.id, "stock", event.target.value)}
                  className="mt-1 w-full rounded border bg-yellow-50 p-2 text-right font-mono outline-none focus:ring-1 focus:ring-gray-400"
                />
              </label>
            </div>
          </article>
        ))}
      </div>

      {mostrarNuevo && (
        <form onSubmit={handleAddProduct} className="mb-6 grid grid-cols-1 gap-3 rounded border bg-gray-50 p-4 md:grid-cols-5">
          <input name="code" placeholder="Código" value={newProduct.code} onChange={handleNewProductChange} className="rounded border p-2" />
          <input name="name" placeholder="Nombre" value={newProduct.name} onChange={handleNewProductChange} className="rounded border p-2" />
          <input name="price" type="number" placeholder="Precio" value={newProduct.price} onChange={handleNewProductChange} className="rounded border p-2" />
          <input name="stock" type="number" placeholder="Stock" value={newProduct.stock} onChange={handleNewProductChange} className="rounded border p-2" />
          <button type="submit" className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700">
            Agregar
          </button>
        </form>
      )}

      <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm italic text-gray-500">
          * Los campos resaltados en amarillo permiten edición directa.
        </span>
        <div className="flex flex-col gap-3 sm:flex-row sm:space-x-3 sm:gap-0">
          <button
            type="button"
            onClick={() => setMostrarNuevo(!mostrarNuevo)}
            className="rounded bg-blue-100 px-6 py-2 font-bold text-blue-800 shadow transition hover:bg-blue-200"
          >
            {mostrarNuevo ? "Cancelar nuevo" : "Agregar producto"}
          </button>
          <button type="button" onClick={handleGuardar} className="rounded bg-gray-800 px-8 py-2 font-bold text-white shadow transition hover:bg-gray-900">
            Guardar Cambios del Catálogo
          </button>
        </div>
      </div>
    </div>
  );
}
