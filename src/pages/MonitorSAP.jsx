import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle, Clock, RefreshCw, CheckCircle2, X as XIcon } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { monitorSAP } from '../data/mockData';

const MonitorSAP = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [lastSync, setLastSync] = useState(monitorSAP.ultimaSincronizacion);

    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleSync = () => {
        showNotification('Sincronizando con SAP...', 'info');
        setTimeout(() => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
            setLastSync(`Hoy ${timeStr}`);
            showNotification('Sincronización completada exitosamente', 'success');
        }, 2000);
    };

    const handleRetryError = (errorMsg) => {
        showNotification('Reintentando acción...', 'info');
        setTimeout(() => {
            showNotification('Acción reintentada exitosamente', 'success');
        }, 1500);
    };

    const handleRetryQuery = (factura) => {
        showNotification(`Consultando factura ${factura} en SAP...`, 'info');
        setTimeout(() => {
            showNotification('Consulta completada', 'success');
        }, 1500);
    };
    return (
        <div className="p-6 space-y-6">
            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in ${toastType === 'success' ? 'bg-green-500 text-white' :
                        toastType === 'error' ? 'bg-red-500 text-white' :
                            toastType === 'warning' ? 'bg-yellow-500 text-white' :
                                'bg-blue-500 text-white'
                    }`}>
                    {toastType === 'success' && <CheckCircle2 className="w-5 h-5" />}
                    {toastType === 'error' && <XIcon className="w-5 h-5" />}
                    {toastType === 'warning' && <AlertCircle className="w-5 h-5" />}
                    {toastType === 'info' && <RefreshCw className="w-5 h-5" />}
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <Activity className="w-8 h-8 text-pink-600" />
                        Monitor de Integración SAP
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Estado de las integraciones con SAP
                    </p>
                </div>
                <button
                    onClick={handleSync}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg"
                >
                    <RefreshCw className="w-5 h-5" />
                    Sincronizar Ahora
                </button>
            </div>

            {/* Estado General */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Estado General</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${monitorSAP.estado === 'Conectado' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <div>
                            <p className="text-sm text-gray-600">Estado</p>
                            <p className="font-semibold text-gray-800">{monitorSAP.estado}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Última Sincronización</p>
                        <p className="font-semibold text-gray-800">{lastSync}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">NCs Pendientes</p>
                        <p className="font-semibold text-yellow-600 text-xl">{monitorSAP.ncPendientes}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Facturas Consultadas</p>
                        <p className="font-semibold text-purple-600 text-xl">{monitorSAP.facturasConsultadas}</p>
                    </div>
                </div>
            </div>

            {/* Errores Recientes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    Errores Recientes
                </h2>
                <div className="space-y-3">
                    {monitorSAP.erroresRecientes.map((error, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${error.tipo === 'Error' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${error.tipo === 'Error' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                            {error.tipo}
                                        </span>
                                        <span className="text-sm text-gray-600">{error.fecha}</span>
                                    </div>
                                    <p className="text-sm text-gray-800 mb-1">{error.mensaje}</p>
                                    <p className="text-xs text-gray-600">Acción: {error.accion}</p>
                                </div>
                                <button
                                    onClick={() => handleRetryError(error.mensaje)}
                                    className="ml-4 p-2 hover:bg-white rounded-lg transition-colors"
                                    title="Reintentar"
                                >
                                    <RefreshCw className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Últimas Consultas */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock className="w-6 h-6 text-blue-500" />
                    Últimas Consultas de Facturas
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha/Hora</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nº Factura</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Resultado</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {monitorSAP.ultimasConsultas.map((consulta, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">{consulta.fecha}</td>
                                    <td className="px-4 py-3 text-sm font-mono text-gray-700">{consulta.factura}</td>
                                    <td className="px-4 py-3 text-sm">
                                        {consulta.resultado === 'Encontrada' ? (
                                            <span className="flex items-center gap-1 text-green-600">
                                                <CheckCircle className="w-4 h-4" />
                                                Encontrada
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-red-600">
                                                <AlertCircle className="w-4 h-4" />
                                                No encontrada
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <button
                                            onClick={() => handleRetryQuery(consulta.factura)}
                                            className="text-pink-600 hover:text-pink-700 font-medium"
                                        >
                                            Reintentar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm">Consultas Exitosas</p>
                            <p className="text-3xl font-bold">
                                {monitorSAP.ultimasConsultas.filter(c => c.resultado === 'Encontrada').length}
                            </p>
                        </div>
                        <CheckCircle className="w-12 h-12 text-green-200" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-red-100 text-sm">Consultas Fallidas</p>
                            <p className="text-3xl font-bold">
                                {monitorSAP.ultimasConsultas.filter(c => c.resultado === 'No encontrada').length}
                            </p>
                        </div>
                        <AlertCircle className="w-12 h-12 text-red-200" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm">Tasa de Éxito</p>
                            <p className="text-3xl font-bold">
                                {Math.round((monitorSAP.ultimasConsultas.filter(c => c.resultado === 'Encontrada').length / monitorSAP.ultimasConsultas.length) * 100)}%
                            </p>
                        </div>
                        <Activity className="w-12 h-12 text-purple-200" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitorSAP;
