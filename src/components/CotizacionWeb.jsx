import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/useStore";

export default function CotizacionWeb() {
  const navigate = useNavigate();
  const { products, createQuote } = useStore();
  const [quantities, setQuantities] = useState({});
  const [customer, setCustomer] = useState({
    name: "",
    document: "",
    phone: "",
    email: "",
  });
  const [branch, setBranch] = useState("Sucursal Tucumán Centro");

  const handleQuantityChange = (productId, value) => {
    const quantity = Math.max(0, Number(value) || 0);
    setQuantities((current) => ({ ...current, [productId]: quantity }));
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  };

  const handleCotizar = (event) => {
    event.preventDefault();
    const items = products
      .filter((product) => (quantities[product.id] || 0) > 0)
      .map((product) => {
        const quantity = quantities[product.id];
        return {
          productId: product.id,
          name: product.name,
          quantity,
          unitPrice: product.price,
          total: quantity * product.price,
        };
      });

    const unavailable = items.find((item) => {
      const product = products.find((current) => current.id === item.productId);
      return item.quantity > product.stock;
    });
    if (unavailable) {
      alert(`No hay stock suficiente para ${unavailable.name}.`);
      return;
    }
    if (!items.length) {
      alert("Seleccioná al menos un material para generar el presupuesto.");
      return;
    }

    createQuote(customer, items, branch);
    navigate("/confirmar");
  };

  return (
    <div className="mx-auto flex h-auto max-w-6xl flex-col overflow-hidden rounded-xl border-t-4 border-red-600 bg-white shadow-lg md:h-[80vh] md:flex-row lg:h-[620px]">
      <div className="flex w-full flex-col border-r bg-gray-50 p-4 sm:p-6 md:w-2/3">
        <h2 className="mb-4 flex items-center text-lg font-bold text-gray-800 sm:text-xl">
          <svg
            className="mr-2 h-5 w-5 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          Catálogo de Materiales
        </h2>

        <div className="custom-scrollbar flex-1 overflow-y-auto pr-1 sm:pr-2">
          <div className="grid grid-cols-2 gap-3 pb-4 sm:gap-4 lg:grid-cols-3">
            {products
              .filter((product) => product.active)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center rounded-lg border bg-white p-2 text-center transition hover:shadow-md sm:p-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-3 h-20 w-20 rounded-md object-cover sm:h-24 sm:w-24"
                  />
                  <span className="h-10 text-xs font-semibold text-gray-700 sm:text-sm line-clamp-2">
                    {product.name}
                  </span>
                  <span className="mt-1 text-xs text-gray-500">
                    ${product.price.toLocaleString("es-AR")} · Stock: {product.stock}
                  </span>
                  <div className="mt-2 flex w-full items-center overflow-hidden rounded-md border bg-gray-100">
                    <span className="border-r bg-gray-200 px-2 py-2 text-xs font-bold text-gray-500">
                      Cant.
                    </span>
                    <input
                      type="number"
                      min="0"
                      max={product.stock}
                      value={quantities[product.id] || ""}
                      onChange={(event) =>
                        handleQuantityChange(product.id, event.target.value)
                      }
                      disabled={product.stock === 0}
                      className="w-full bg-transparent p-1 text-center font-mono outline-none"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-between overflow-y-auto bg-white p-4 sm:p-6 md:w-1/3">
        <div>
          <h2 className="mb-6 border-b pb-2 text-lg font-bold text-gray-800 sm:text-xl">
            Finalizar Presupuesto
          </h2>
          <form id="cotizacion-form" onSubmit={handleCotizar} className="space-y-4">
            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase text-gray-600">
                Datos Personales
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Nombre y Apellido"
                value={customer.name}
                onChange={handleCustomerChange}
                className="w-full rounded-md border bg-gray-50 p-2.5 outline-none transition focus:ring-2 focus:ring-red-200"
              />
              <input
                name="document"
                type="text"
                required
                placeholder="CUIT / DNI"
                value={customer.document}
                onChange={handleCustomerChange}
                className="w-full rounded-md border bg-gray-50 p-2.5 outline-none transition focus:ring-2 focus:ring-red-200"
              />
              <input
                name="phone"
                type="tel"
                required
                placeholder="Teléfono"
                value={customer.phone}
                onChange={handleCustomerChange}
                className="w-full rounded-md border bg-gray-50 p-2.5 outline-none transition focus:ring-2 focus:ring-red-200"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                value={customer.email}
                onChange={handleCustomerChange}
                className="w-full rounded-md border bg-gray-50 p-2.5 outline-none transition focus:ring-2 focus:ring-red-200"
              />
            </div>
            <div className="space-y-3 pt-4">
              <label className="block text-sm font-bold uppercase text-gray-600">
                Sucursal de Retiro
              </label>
              <select
                value={branch}
                onChange={(event) => setBranch(event.target.value)}
                className="w-full cursor-pointer rounded-md border bg-gray-50 p-2.5 outline-none transition focus:ring-2 focus:ring-red-200"
              >
                <option>Sucursal Tucumán Centro</option>
                <option>Sucursal Yerba Buena</option>
                <option>Sucursal Salta</option>
              </select>
            </div>
          </form>
        </div>
        <div className="mt-8 border-t pt-4">
          <button
            form="cotizacion-form"
            type="submit"
            className="flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-3.5 font-bold text-white shadow-md transition duration-200 hover:bg-red-700"
          >
            Verificar Stock y Cotizar
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
