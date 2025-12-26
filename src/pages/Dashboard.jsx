import React from 'react';
import {
    TrendingUp,
    DollarSign,
    FileText,
    Users,
    AlertCircle,
    CheckCircle,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardStats, liquidaciones, notasCredito, provisiones } from '../data/mockData';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color, link }) => (
    <Link to={link} className="block">
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {trendValue}
                    </div>
                )}
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </Link>
);

const AlertCard = ({ type, message }) => {
    const config = {
        warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: AlertCircle, iconColor: 'text-yellow-600' },
        info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: Clock, iconColor: 'text-blue-600' },
        success: { bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle, iconColor: 'text-green-600' }
    };
    const { bg, border, icon: Icon, iconColor } = config[type];

    return (
        <div className={`${bg} border ${border} rounded-lg p-4 flex items-start gap-3`}>
            <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
            <p className="text-sm text-gray-700">{message}</p>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mt-1">Vista general del sistema de liquidación de promociones</p>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Liquidaciones del Mes"
                    value={dashboardStats.liquidacionesMes.total}
                    icon={FileText}
                    trend="up"
                    trendValue="+12%"
                    color="from-pink-500 to-pink-600"
                    link="/bitacora-liquidaciones"
                />
                <StatCard
                    title="Valor Total Liquidado"
                    value={`$${dashboardStats.liquidacionesMes.valorTotal.toLocaleString()}`}
                    icon={DollarSign}
                    trend="up"
                    trendValue="+8%"
                    color="from-green-500 to-green-600"
                    link="/bitacora-liquidaciones"
                />
                <StatCard
                    title="NCs Generadas"
                    value={dashboardStats.ncGeneradas.total}
                    icon={CheckCircle}
                    color="from-blue-500 to-blue-600"
                    link="/promotions"
                />
                <StatCard
                    title="Provisión Actual"
                    value={`$${dashboardStats.provisiones.mesActual.toLocaleString()}`}
                    icon={TrendingUp}
                    color="from-purple-500 to-purple-600"
                    link="/provisiones"
                />
            </div>

            {/* Liquidaciones por Estado */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Liquidaciones por Estado</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(dashboardStats.liquidacionesMes.porEstado).map(([estado, cantidad]) => (
                        <div key={estado} className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-bold text-gray-900">{cantidad}</p>
                            <p className="text-sm text-gray-600 mt-1">{estado}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Alertas */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                    Alertas y Notificaciones
                </h2>
                <div className="space-y-3">
                    {dashboardStats.alertas.map((alerta, index) => (
                        <AlertCard key={index} type={alerta.tipo} message={alerta.mensaje} />
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/recepcion" className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-lg p-6 hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Nueva Recepción</h3>
                        <FileText className="w-8 h-8 opacity-80" />
                    </div>
                    <p className="text-pink-100 text-sm">Registrar información de cliente</p>
                </Link>

                <Link to="/solicitudes-nc" className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Aprobar NCs</h3>
                        <CheckCircle className="w-8 h-8 opacity-80" />
                    </div>
                    <p className="text-blue-100 text-sm">{notasCredito.filter(nc => nc.estado === 'Pendiente Aprobación').length} solicitudes pendientes</p>
                </Link>

                <Link to="/provisiones" className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Generar Provisión</h3>
                        <DollarSign className="w-8 h-8 opacity-80" />
                    </div>
                    <p className="text-purple-100 text-sm">Calcular provisiones del mes</p>
                </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-gray-600" />
                    Actividad Reciente
                </h2>
                <div className="space-y-3">
                    {liquidaciones.slice(0, 5).map((liq) => (
                        <div key={liq.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-pink-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{liq.id}</p>
                                    <p className="text-sm text-gray-600">{liq.cliente.nombreComercial} - {liq.tipoPromocion}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-green-600">${liq.valorTotal.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">{new Date(liq.fechaCreacion).toLocaleDateString('es-EC')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado de Integraciones</h3>
                    <div className="space-y-3">
                        <Link to="/monitor-sap" className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="font-medium text-gray-900">SAP</span>
                            </div>
                            <span className="text-sm text-green-600">Conectado</span>
                        </Link>
                        <Link to="/monitor-kifatex" className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="font-medium text-gray-900">Kifatex</span>
                            </div>
                            <span className="text-sm text-green-600">Conectado</span>
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Accesos Rápidos</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <Link to="/interlocutores" className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                            <Users className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                            <p className="text-sm font-medium text-gray-700">Interlocutores</p>
                        </Link>
                        <Link to="/reports" className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                            <FileText className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                            <p className="text-sm font-medium text-gray-700">Reportes</p>
                        </Link>
                        <Link to="/validacion" className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                            <CheckCircle className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                            <p className="text-sm font-medium text-gray-700">Validación</p>
                        </Link>
                        <Link to="/settings" className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center">
                            <Activity className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                            <p className="text-sm font-medium text-gray-700">Configuración</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
