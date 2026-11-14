import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import CotizacionWeb from "./components/CotizacionWeb";
import ConfirmacionPedido from "./components/ConfirmacionPedido";
import ModuloDeposito from "./components/ModuloDeposito";
import DespachoEntrega from "./components/DespachoEntrega";
import SeguimientoPedido from "./components/SeguimientoPedido";
import GestionCatalogo from "./components/GestionCatalogo";

// Componente para simular el Panel de Acceso de Empleados
function PanelEmpleados() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <div className="w-full max-w-md rounded-xl border-t-4 border-gray-800 bg-white p-5 text-center shadow-lg sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Portal Interno
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          Seleccione el módulo al que desea ingresar
        </p>
        <div className="space-y-3 sm:space-y-4">
          <button
            onClick={() => navigate("/deposito")}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded transition"
          >
            Gestión de Depósito
          </button>
          <button
            onClick={() => navigate("/despacho")}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded transition"
          >
            Despacho y Logística
          </button>
          <button
            onClick={() => navigate("/gestion-catalogo")}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded transition"
          >
            Gestión de Catálogo
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navbar Comercial y Limpia */}
        <nav className="bg-red-700 p-3 text-white shadow-md sm:p-4">
          <div className="container relative mx-auto flex items-center justify-between sm:static">
            <Link
              to="/"
              onClick={cerrarMenu}
              className="text-lg font-bold italic tracking-wide sm:text-xl"
            >
              R - Rosso Hnos S.A.
            </Link>

            <button
              type="button"
              aria-label="Abrir menú de navegación"
              aria-expanded={menuAbierto}
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="rounded border border-red-500 px-2 py-1 text-xl leading-none sm:hidden"
            >
              <span className="block h-0.5 w-5 bg-white"></span>
              <span className="my-1 block h-0.5 w-5 bg-white"></span>
              <span className="block h-0.5 w-5 bg-white"></span>
            </button>

            <div
              className={`${menuAbierto ? "flex" : "hidden"} absolute left-0 right-0 top-full z-10 flex-col gap-2 bg-red-700 p-3 shadow-md sm:static sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-6 sm:bg-transparent sm:p-0 sm:shadow-none`}
            >
              <Link
                to="/"
                onClick={cerrarMenu}
                className="text-sm font-bold transition hover:text-red-200"
              >
                Solicitar Presupuesto
              </Link>
              <Link
                to="/seguimiento"
                onClick={cerrarMenu}
                className="text-sm font-bold transition hover:text-red-200"
              >
                Seguimiento de Pedido
              </Link>
              {/* Botón discreto de acceso interno */}
              <Link
                to="/intranet"
                onClick={cerrarMenu}
                className="w-fit rounded border border-red-500 px-3 py-1.5 text-xs text-red-100 transition hover:bg-red-600"
              >
                Acceso Empleados
              </Link>
            </div>
          </div>
        </nav>

        {/* Contenedor Principal */}
        <main className="container mx-auto flex-grow p-3 sm:p-4">
          <Routes>
            {/* Rutas Públicas (Cliente) */}
            <Route path="/" element={<CotizacionWeb />} />
            <Route path="/confirmar" element={<ConfirmacionPedido />} />
            <Route path="/seguimiento" element={<SeguimientoPedido />} />
            
            {/* Rutas Privadas (Empleados) */}
            <Route path="/intranet" element={<PanelEmpleados />} />
            <Route path="/deposito" element={<ModuloDeposito />} />
            <Route path="/despacho" element={<DespachoEntrega />} />
            <Route path="/gestion-catalogo" element={<GestionCatalogo />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white text-center py-3 text-xs mt-auto">
          Prototipo - Rosso Hnos S.A. | Trabajo Final Integrador
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
