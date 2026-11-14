export default function ConfirmacionPedido() {
  return (
    <div className="mx-auto max-w-3xl rounded-lg border-t-4 border-red-600 bg-white p-4 shadow sm:p-6">
      <h2 className="mb-6 text-center text-xl font-bold text-gray-800 sm:text-2xl">
        Presupuesto N° 10245
      </h2>

      {/* Detalle Ticket */}
      <div className="relative mb-6 rounded border-2 border-dashed border-gray-400 bg-yellow-50 p-4 pt-12 sm:p-6">
        <span className="absolute top-2 right-2 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
          Válido por 72 hs
        </span>
        <h3 className="font-bold text-gray-700 mb-4">Materiales Cotizados:</h3>
        <ul className="space-y-2 text-sm text-gray-600 border-b border-gray-300 pb-4 mb-4">
          <li className="flex justify-between gap-4">
            <span>Cemento Loma Negra x 2</span> <span className="whitespace-nowrap">$ 10.000</span>
          </li>
          <li className="flex justify-between gap-4">
            <span>Ladrillo Hueco x 40</span> <span className="whitespace-nowrap">$ 20.000</span>
          </li>
          <li className="flex justify-between gap-4">
            <span>Caño PVC 110mm x 2</span> <span className="whitespace-nowrap">$ 25.000</span>
          </li>
        </ul>
        <div className="flex justify-between font-bold text-lg text-gray-800">
          <span>SUBTOTAL:</span>
          <span>$ 55.000</span>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {/* Pagos */}
        <div>
          <h3 className="font-bold text-gray-700 border-b pb-2 mb-3">* Pago</h3>
          <p className="text-sm text-green-600 font-semibold mb-3">
            Descuento 10% Pago Contado aplicado
          </p>
          <input
            type="text"
            placeholder="Ingresar datos Tarjeta (opcional)"
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        {/* Modalidad de entrega */}
        <div>
          <h3 className="font-bold text-gray-700 border-b pb-2 mb-3">
            * Defina dónde retirar:
          </h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="entrega"
                defaultChecked
                className="form-radio text-red-600 h-4 w-4"
              />
              <span>Retiro Personal en Sucursal</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="entrega"
                className="form-radio text-red-600 h-4 w-4"
              />
              <span>Envío con Fletero Externo</span>
            </label>
          </div>
        </div>
      </div>

      {/* Acción */}
      <div className="flex justify-end border-t pt-4">
        <button className="w-full rounded bg-green-600 px-6 py-3 font-bold text-white shadow transition duration-200 hover:bg-green-700 sm:w-auto">
          Aprobar Presupuesto y Confirmar Pedido
        </button>
      </div>
    </div>
  );
}
