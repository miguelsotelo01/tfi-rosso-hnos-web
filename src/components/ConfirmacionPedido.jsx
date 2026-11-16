import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/useStore";

export default function ConfirmacionPedido() {
  const navigate = useNavigate();
  const { getLatestQuote, confirmQuote, cancelQuote } = useStore();
  const quote = getLatestQuote();
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [payment, setPayment] = useState({
    number: "",
    expiry: "",
    securityCode: "",
    holder: "",
  });
  const [delivery, setDelivery] = useState("Retiro Personal en Sucursal");

  if (!quote) {
    return (
      <div className="mx-auto max-w-3xl rounded-lg border-t-4 border-red-600 bg-white p-6 text-center shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          No hay un presupuesto pendiente
        </h2>
        <button
          onClick={() => navigate("/")}
          className="rounded bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
        >
          Solicitar presupuesto
        </button>
      </div>
    );
  }

  const handlePaymentChange = (event) => {
    const { name, value } = event.target;
    setPayment((current) => ({ ...current, [name]: value }));
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    const hasPaymentData = Object.values(payment).some(Boolean);
    if (hasPaymentData && Object.values(payment).some((value) => !value)) {
      alert("Completá todos los datos de la tarjeta o dejá el pago sin tarjeta.");
      return;
    }

    if (hasPaymentData) {
      const cardNumber = payment.number.replace(/\s/g, "");
      if (!/^\d{13,19}$/.test(cardNumber) || !passesLuhn(cardNumber)) {
        alert("Ingresá un número de tarjeta válido.");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(payment.expiry) || !/^\d{3,4}$/.test(payment.securityCode)) {
        alert("Revisá el vencimiento y el código de seguridad de la tarjeta.");
        return;
      }
    }

    const result = confirmQuote(
      quote.id,
      hasPaymentData ? { ...payment, number: payment.number.replace(/\s/g, "") } : null,
      delivery,
    );
    if (result.order) {
      navigate(`/seguimiento?pedido=${result.order.number}`);
    } else if (result.error) {
      alert(result.error);
    }
  };

  const handleCancel = () => {
    cancelQuote(quote.id);
    navigate("/");
  };

  return (
    <div className="mx-auto max-w-3xl rounded-lg border-t-4 border-red-600 bg-white p-4 shadow lg:max-w-4xl sm:p-6">
      <h2 className="mb-6 text-center text-xl font-bold text-gray-800 sm:text-2xl">
        Presupuesto N° {quote.number}
      </h2>

      <div className="relative mb-6 rounded border-2 border-dashed border-gray-400 bg-yellow-50 p-4 pt-12 sm:p-6">
        <span className="absolute right-2 top-2 rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-600">
          Válido por 72 hs
        </span>
        <h3 className="mb-4 font-bold text-gray-700">Materiales Cotizados:</h3>
        <ul className="mb-4 space-y-2 border-b border-gray-300 pb-4 text-sm text-gray-600">
          {quote.items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-4">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span className="whitespace-nowrap">
                $ {item.total.toLocaleString("es-AR")}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>SUBTOTAL:</span>
          <span>$ {quote.subtotal.toLocaleString("es-AR")}</span>
        </div>
      </div>

      <form onSubmit={handleConfirm}>
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="mb-3 border-b pb-2 font-bold text-gray-700">* Pago</h3>
            <p className="mb-3 text-sm font-semibold text-green-600">
              Descuento 10% Pago Contado aplicado
            </p>
            <button
              type="button"
              onClick={() => setMostrarTarjeta(!mostrarTarjeta)}
              className="w-full rounded border bg-white p-2 text-left text-sm text-gray-500 transition hover:border-red-400"
            >
              {mostrarTarjeta
                ? "Ocultar datos de tarjeta"
                : "Ingresar datos Tarjeta (opcional)"}
            </button>
            {mostrarTarjeta && (
              <div className="mt-3 grid grid-cols-2 gap-3 rounded border bg-gray-50 p-3">
                <input
                  name="number"
                  required
                  placeholder="Número de tarjeta"
                  value={payment.number}
                  onChange={handlePaymentChange}
                  className="col-span-2 rounded border p-2 text-sm"
                  inputMode="numeric"
                />
                <input
                  name="holder"
                  required
                  placeholder="Titular"
                  value={payment.holder}
                  onChange={handlePaymentChange}
                  className="col-span-2 rounded border p-2 text-sm"
                />
                <input
                  name="expiry"
                  required
                  placeholder="MM/AA"
                  value={payment.expiry}
                  onChange={handlePaymentChange}
                  className="rounded border p-2 text-sm"
                />
                <input
                  name="securityCode"
                  required
                  placeholder="CVV"
                  value={payment.securityCode}
                  onChange={handlePaymentChange}
                  className="rounded border p-2 text-sm"
                  inputMode="numeric"
                />
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-3 border-b pb-2 font-bold text-gray-700">
              * Defina dónde retirar:
            </h3>
            <div className="space-y-2">
              {["Retiro Personal en Sucursal", "Envío con Fletero Externo"].map(
                (option) => (
                  <label key={option} className="flex cursor-pointer items-center space-x-2">
                    <input
                      type="radio"
                      name="delivery"
                      value={option}
                      checked={delivery === option}
                      onChange={(event) => setDelivery(event.target.value)}
                      className="form-radio h-4 w-4 text-red-600"
                    />
                    <span>{option}</span>
                  </label>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="mr-3 rounded bg-gray-200 px-6 py-3 font-bold text-gray-800 shadow transition hover:bg-gray-300"
          >
            Cancelar presupuesto
          </button>
          <button
            type="submit"
            className="w-full rounded bg-green-600 px-6 py-3 font-bold text-white shadow transition duration-200 hover:bg-green-700 sm:w-auto"
          >
            Aprobar Presupuesto y Confirmar Pedido
          </button>
        </div>
      </form>
    </div>
  );
}

function passesLuhn(number) {
  let sum = 0;
  let shouldDouble = false;
  for (let index = number.length - 1; index >= 0; index -= 1) {
    let digit = Number(number[index]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}
