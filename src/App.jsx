import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
    FileSpreadsheet,
    Database,
    Calculator,
    FileCheck,
    Ticket,
    Percent,
    Stethoscope,
    BarChart3,
    Bell,
    User,
    Menu,
    X,
    Users,
    Settings2,
    Inbox,
    CheckCircle,
    FileText,
    ClipboardCheck,
    Send,
    DollarSign,
    Activity,
    Server,
    Shield,
    Calendar,
    Package,
    CreditCard
} from 'lucide-react';
import { useState } from 'react';

// Existing pages
import Dashboard from './pages/Dashboard';
import Promotions from './pages/Promotions';
import CatalogManagement from './pages/CatalogManagement';
import Liquidation from './pages/Liquidation';
import NCControl from './pages/NCControl';
import Coupons from './pages/Coupons';
import Rebates from './pages/Rebates';
import PMC from './pages/PMC';
import Reports from './pages/Reports';
import Clients from './pages/Clients';
import Settings from './pages/Settings';

// New pages - Control Interno
import RecepcionInformacion from './pages/RecepcionInformacion';
import ValidacionCondiciones from './pages/ValidacionCondiciones';
import BitacoraLiquidaciones from './pages/BitacoraLiquidaciones';

// New pages - Facturación
import SolicitudesNCPendientes from './pages/SolicitudesNCPendientes';

// New pages - Provisiones
import GeneracionProvisiones from './pages/GeneracionProvisiones';

// New pages - Configuración
import TablaInterlocutores from './pages/TablaInterlocutores';

// New pages - Integraciones
import MonitorSAP from './pages/MonitorSAP';
import MonitorKifatex from './pages/MonitorKifatex';

// New pages - Pantallas Críticas Completadas
import EvaluacionPromociones from './pages/EvaluacionPromociones';
import ConfiguracionInnovaSer from './pages/ConfiguracionInnovaSer';
import Conciliaciones from './pages/Conciliaciones';

// New pages - Additional Modules
import SemanaDescuentos from './pages/SemanaDescuentos';
import OII from './pages/OII';
import EstadosCuenta from './pages/EstadosCuenta';

const NavItem = ({ to, icon: Icon, label, onClick }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mb-1 ${isActive
                ? 'bg-white text-primary-700 font-bold shadow-md'
                : 'text-primary-100 hover:bg-primary-800 hover:text-white'
                }`}
        >
            <Icon size={20} />
            <span>{label}</span>
        </Link>
    );
};

const Sidebar = ({ isOpen, toggleSidebar }) => (
    <>
        {/* Overlay */}
        {isOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
                onClick={toggleSidebar}
            />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-900 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between h-16 px-6 border-b border-primary-800">
                <div className="text-lg font-semibold text-primary-200 tracking-wide">Menú</div>
                <button onClick={toggleSidebar} className="text-primary-200 hover:text-white transition-colors">
                    <X size={24} />
                </button>
            </div>
            <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
                <div className="pt-4 pb-2 text-xs font-semibold text-primary-300 uppercase tracking-wider pl-4">Control Interno</div>
                <NavItem to="/recepcion" icon={Inbox} label="Recepción Información" onClick={toggleSidebar} />
                <NavItem to="/validacion" icon={CheckCircle} label="Validación Condiciones" onClick={toggleSidebar} />
                <NavItem to="/liquidation" icon={Calculator} label="Generación Liquidación" onClick={toggleSidebar} />
                <NavItem to="/bitacora-liquidaciones" icon={FileText} label="Bitácora Liquidaciones" onClick={toggleSidebar} />
                <NavItem to="/oii" icon={Package} label="Órdenes Internas (OII)" onClick={toggleSidebar} />

                <div className="pt-4 pb-2 text-xs font-semibold text-primary-300 uppercase tracking-wider pl-4">Facturación</div>
                <NavItem to="/solicitudes-nc" icon={ClipboardCheck} label="Solicitudes NC" onClick={toggleSidebar} />
                <NavItem to="/nc-control" icon={Send} label="Generación NC" onClick={toggleSidebar} />

                <div className="pt-4 pb-2 text-xs font-semibold text-primary-300 uppercase tracking-wider pl-4">Provisiones</div>
                <NavItem to="/provisiones" icon={DollarSign} label="Generación Provisiones" onClick={toggleSidebar} />

                <div className="pt-4 pb-2 text-xs font-semibold text-primary-300 uppercase tracking-wider pl-4">Promociones</div>
                <NavItem to="/promotions" icon={FileSpreadsheet} label="Bitácora Promociones" onClick={toggleSidebar} />
                <NavItem to="/pmc" icon={Stethoscope} label="PMC" onClick={toggleSidebar} />
                <NavItem to="/coupons" icon={Ticket} label="Cupones" onClick={toggleSidebar} />
                <NavItem to="/rebates" icon={Percent} label="Rebates" onClick={toggleSidebar} />
                <NavItem to="/semana-descuentos" icon={Calendar} label="Semana Descuentos" onClick={toggleSidebar} />

                <div className="pt-4 pb-2 text-xs font-semibold text-primary-300 uppercase tracking-wider pl-4">Reportes y Análisis</div>
                <NavItem to="/estados-cuenta" icon={CreditCard} label="Estados de Cuenta" onClick={toggleSidebar} />
                <NavItem to="/evaluacion-promociones" icon={BarChart3} label="Evaluación Promociones" onClick={toggleSidebar} />
                <NavItem to="/conciliaciones" icon={FileCheck} label="Conciliaciones" onClick={toggleSidebar} />
                <NavItem to="/reports" icon={BarChart3} label="Reportes" onClick={toggleSidebar} />

                <div className="pt-4 pb-2 text-xs font-semibold text-primary-300 uppercase tracking-wider pl-4">Configuración</div>
                <NavItem to="/interlocutores" icon={Users} label="Interlocutores" onClick={toggleSidebar} />
                <NavItem to="/config-innovaser" icon={Shield} label="Config. InnovaSer" onClick={toggleSidebar} />
                <NavItem to="/catalogs" icon={Database} label="Catálogos" onClick={toggleSidebar} />
                <NavItem to="/settings" icon={Settings2} label="Configuración" onClick={toggleSidebar} />

                <div className="pt-4 pb-2 text-xs font-semibold text-primary-300 uppercase tracking-wider pl-4">Integraciones</div>
                <NavItem to="/monitor-sap" icon={Activity} label="Monitor SAP" onClick={toggleSidebar} />
                <NavItem to="/monitor-kifatex" icon={Server} label="Monitor Kifatex" onClick={toggleSidebar} />
            </nav>
        </aside>
    </>
);

const Header = ({ toggleSidebar }) => (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b shadow-sm">
        <div className="flex items-center space-x-4">
            <button
                onClick={toggleSidebar}
                className="text-gray-600 hover:text-primary-700 hover:bg-primary-50 p-2 rounded-lg transition-colors"
                aria-label="Toggle menu"
            >
                <Menu size={24} />
            </button>
            <Link
                to="/"
                className="text-2xl font-bold text-primary-700 tracking-wide hover:text-primary-600 transition-colors"
            >
                Bagó <span className="text-primary-500 font-normal">Liq</span>
            </Link>
        </div>
        <div className="flex items-center space-x-4 ml-auto">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2 border-l pl-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                    US
                </div>
                <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-700">Usuario Sistema</p>
                    <p className="text-xs text-gray-500">Control Interno</p>
                </div>
            </div>
        </div>
    </header>
);

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <Router>
            <div className="flex h-screen bg-gray-50">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <div className="flex-1 flex flex-col overflow-hidden w-full">
                    <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                        <Routes>
                            {/* Dashboard */}
                            <Route path="/" element={<Dashboard />} />

                            {/* Control Interno */}
                            <Route path="/recepcion" element={<RecepcionInformacion />} />
                            <Route path="/validacion" element={<ValidacionCondiciones />} />
                            <Route path="/liquidation" element={<Liquidation />} />
                            <Route path="/bitacora-liquidaciones" element={<BitacoraLiquidaciones />} />
                            <Route path="/oii" element={<OII />} />

                            {/* Facturación */}
                            <Route path="/solicitudes-nc" element={<SolicitudesNCPendientes />} />
                            <Route path="/nc-control" element={<NCControl />} />
                            <Route path="/promotions" element={<Promotions />} />

                            {/* Provisiones */}
                            <Route path="/provisiones" element={<GeneracionProvisiones />} />

                            {/* Promociones */}
                            <Route path="/pmc" element={<PMC />} />
                            <Route path="/coupons" element={<Coupons />} />
                            <Route path="/rebates" element={<Rebates />} />
                            <Route path="/semana-descuentos" element={<SemanaDescuentos />} />

                            {/* Reportes y Análisis */}
                            <Route path="/estados-cuenta" element={<EstadosCuenta />} />
                            <Route path="/evaluacion-promociones" element={<EvaluacionPromociones />} />
                            <Route path="/conciliaciones" element={<Conciliaciones />} />
                            <Route path="/reports" element={<Reports />} />

                            {/* Configuración */}
                            <Route path="/interlocutores" element={<TablaInterlocutores />} />
                            <Route path="/config-innovaser" element={<ConfiguracionInnovaSer />} />
                            <Route path="/clients" element={<Clients />} />
                            <Route path="/catalogs" element={<CatalogManagement />} />
                            <Route path="/settings" element={<Settings />} />

                            {/* Integraciones */}
                            <Route path="/monitor-sap" element={<MonitorSAP />} />
                            <Route path="/monitor-kifatex" element={<MonitorKifatex />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;

