import { useNavigate } from "react-router-dom";

export default function CotizacionWeb() {
  const navigate = useNavigate();

  const handleCotizar = (e) => {
    e.preventDefault();
    navigate("/confirmar");
  };

  // Simulación de muchos productos para probar el scroll
  const productos = [
    {
      id: 1,
      nombre: "Cemento Loma Negra 50kg",
      foto: "https://media.istockphoto.com/id/1448349078/es/foto/bolsas-de-cemento-o-sacos-aislados-sobre-blanco.jpg?s=2048x2048&w=is&k=20&c=H0HldYgLckLZ1AMNk6qHYNCdoOQUltXzR4KWgyTKGZU=",
    },
    {
      id: 2,
      nombre: "Ladrillo Hueco 18x18",
      foto: "https://acdn-us.mitiendanube.com/stores/003/143/779/products/whatsapp-image-2024-10-16-at-12-45-51-53c217ee574f070f5217404065580345-480-0.webp",
    },
    {
      id: 3,
      nombre: "Caño PVC 110mm",
      foto: "https://www.ropelato.com.ar/7050-medium_default/1051701-Cano-pvc-cloacal-110-x-3-2-x-6m-con-junta-elastica.jpg",
    },
    {
      id: 4,
      nombre: "Hierro Aletado 8mm",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmyk7GeqlNxppRBXfqJqKabiN9E3PKafxVixJ5mmbc4IbtwOYyHcvWWfh8&s=10",
    },
    {
      id: 5,
      nombre: "Arena Fina x Metro",
      foto: "https://arcencohogar.vtexassets.com/arquivos/ids/315512/1269247-1.jpg?v=637820029448170000",
    },
    {
      id: 6,
      nombre: "Cal Hidratada 25kg",
      foto: "https://arcencohogar.vtexassets.com/arquivos/ids/284491/1200232.jpg?v=639149012460600000",
    },
    {
      id: 7,
      nombre: "Pegamento Klaukol",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvX6hKtYz00tMifN1xTyzOT_URrYjofx1Xq0B5TZrMWeidvDCsSOz74i4&s=10",
    },
    {
      id: 8,
      nombre: "Cerámico San Lorenzo",
      foto: "https://www.sagosa.com.ar/3220-thickbox_default/ceramica-san-lorenzo-flowers-black-natural-453x453-205-disc1.jpg",
    },
  ];

  return (
    <div className="mx-auto flex h-auto max-w-6xl flex-col overflow-hidden rounded-xl border-t-4 border-red-600 bg-white shadow-lg md:h-[80vh] md:flex-row">
      {/* COLUMNA IZQUIERDA: Catálogo con Scroll */}
      <div className="flex w-full flex-col border-r bg-gray-50 p-4 sm:p-6 md:w-2/3">
        <h2 className="mb-4 flex items-center text-lg font-bold text-gray-800 sm:text-xl">
          <svg
            className="w-5 h-5 mr-2 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
          Catálogo de Materiales
        </h2>

        {/* Contenedor scrolleable */}
        <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
          <div className="grid grid-cols-2 gap-3 pb-4 sm:gap-4 lg:grid-cols-3">
            {productos.map((prod) => (
              <div
                key={prod.id}
                className="flex flex-col items-center rounded-lg border bg-white p-2 text-center transition hover:shadow-md sm:p-3"
              >
                <img
                  src={prod.foto}
                  alt={prod.nombre}
                  className="mb-3 h-20 w-20 rounded-md object-cover sm:h-24 sm:w-24"
                />
                <span className="h-10 text-xs font-semibold text-gray-700 sm:text-sm line-clamp-2">
                  {prod.nombre}
                </span>
                <div className="mt-2 flex items-center bg-gray-100 rounded-md overflow-hidden border w-full">
                  <span className="px-2 text-gray-500 text-xs font-bold bg-gray-200 py-2 border-r">
                    Cant.
                  </span>
                  <input
                    type="number"
                    min="0"
                    defaultValue="0"
                    className="w-full p-1 text-center bg-transparent outline-none font-mono"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: Datos del Cliente (Fija) */}
      <div className="flex w-full flex-col justify-between overflow-y-auto bg-white p-4 sm:p-6 md:w-1/3">
        <div>
          <h2 className="mb-6 border-b pb-2 text-lg font-bold text-gray-800 sm:text-xl">
            Finalizar Presupuesto
          </h2>

          <form
            id="cotizacion-form"
            onSubmit={handleCotizar}
            className="space-y-4"
          >
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-600 uppercase">
                Datos Personales
              </label>
              <input
                type="text"
                required
                placeholder="Nombre y Apellido"
                className="w-full p-2.5 bg-gray-50 border rounded-md focus:ring-2 focus:ring-red-200 outline-none transition"
              />
              <input
                type="text"
                required
                placeholder="CUIT / DNI"
                className="w-full p-2.5 bg-gray-50 border rounded-md focus:ring-2 focus:ring-red-200 outline-none transition"
              />
              <input
                type="tel"
                required
                placeholder="Teléfono"
                className="w-full p-2.5 bg-gray-50 border rounded-md focus:ring-2 focus:ring-red-200 outline-none transition"
              />
              <input
                type="email"
                required
                placeholder="Email"
                className="w-full p-2.5 bg-gray-50 border rounded-md focus:ring-2 focus:ring-red-200 outline-none transition"
              />
            </div>

            <div className="pt-4 space-y-3">
              <label className="block text-sm font-bold text-gray-600 uppercase">
                Sucursal de Retiro
              </label>
              <select className="w-full p-2.5 bg-gray-50 border rounded-md focus:ring-2 focus:ring-red-200 outline-none transition cursor-pointer">
                <option>Sucursal Tucumán Centro</option>
                <option>Sucursal Yerba Buena</option>
                <option>Sucursal Salta</option>
              </select>
            </div>
          </form>
        </div>

        {/* Botón pegado abajo */}
        <div className="mt-8 pt-4 border-t">
          <button
            form="cotizacion-form"
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-lg shadow-md transition duration-200 flex justify-center items-center"
          >
            Verificar Stock y Cotizar
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
