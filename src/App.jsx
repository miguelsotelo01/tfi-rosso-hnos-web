import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
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
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-800 text-center max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Portal Interno
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          Seleccione el módulo al que desea ingresar
        </p>
        <div className="space-y-4">
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
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navbar Comercial y Limpia */}
        <nav className="bg-red-700 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold italic tracking-wide">
              R - Rosso Hnos S.A.
            </Link>

            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-sm font-bold hover:text-red-200 transition"
              >
                Solicitar Presupuesto
              </Link>
              <Link
                to="/seguimiento"
                className="text-sm font-bold hover:text-red-200 transition"
              >
                Seguimiento de Pedido
              </Link>
              {/* Botón discreto de acceso interno */}
              <Link
                to="/intranet"
                className="text-xs border border-red-500 rounded px-3 py-1.5 hover:bg-red-600 transition text-red-100"
              >
                Acceso Empleados
              </Link>
            </div>
          </div>
        </nav>

        {/* Contenedor Principal */}
        <main className="container mx-auto p-4 flex-grow">
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
