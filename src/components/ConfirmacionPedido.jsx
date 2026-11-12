export default function ConfirmacionPedido() {
  return (
    <div className="bg-white p-6 shadow rounded-lg max-w-3xl mx-auto border-t-4 border-red-600">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Presupuesto N° 10245
      </h2>

      {/* Detalle Ticket */}
      <div className="border-2 border-dashed border-gray-400 bg-yellow-50 p-6 rounded relative mb-6">
        <span className="absolute top-2 right-2 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
          Válido por 72 hs
        </span>
        <h3 className="font-bold text-gray-700 mb-4">Materiales Cotizados:</h3>
        <ul className="space-y-2 text-sm text-gray-600 border-b border-gray-300 pb-4 mb-4">
          <li className="flex justify-between">
            <span>Cemento Loma Negra x 2</span> <span>$ 10.000</span>
          </li>
          <li className="flex justify-between">
            <span>Ladrillo Hueco x 40</span> <span>$ 20.000</span>
          </li>
          <li className="flex justify-between">
            <span>Caño PVC 110mm x 2</span> <span>$ 25.000</span>
          </li>
        </ul>
        <div className="flex justify-between font-bold text-lg text-gray-800">
          <span>SUBTOTAL:</span>
          <span>$ 55.000</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded shadow transition duration-200">
          Aprobar Presupuesto y Confirmar Pedido
        </button>
      </div>
    </div>
  );
}
