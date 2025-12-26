import React from 'react';
import { Server, CheckCircle, AlertCircle, FileText, RefreshCw } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { monitorKifatex } from '../data/mockData';

const MonitorKifatex = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <Server className="w-8 h-8 text-pink-600" />
                        Monitor de Integración Kifatex
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Estado de la integración con Kifatex (FTP/API)
                    </p>
                </div>
                <button
                    onClick={() => alert('Verificando conexión...')}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg"
                >
                    <RefreshCw className="w-5 h-5" />
                    Verificar Conexión
                </button>
            </div>

            {/* Estado General */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Estado General</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${monitorKifatex.estado === 'Conectado' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <div>
                            <p className="text-sm text-gray-600">Estado</p>
                            <p className="font-semibold text-gray-800">{monitorKifatex.estado}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Última Recepción</p>
                        <p className="font-semibold text-gray-800">{monitorKifatex.ultimaRecepcion}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">NCs Enviadas</p>
                        <p className="font-semibold text-blue-600 text-xl">{monitorKifatex.ncEnviadas}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">NCs con Respuesta</p>
                        <p className="font-semibold text-green-600 text-xl">{monitorKifatex.ncConRespuesta}</p>
                    </div>
                </div>
            </div>

            {/* NCs Pendientes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-yellow-800 mb-1 flex items-center gap-2">
                            <AlertCircle className="w-6 h-6" />
                            NCs Pendientes de Respuesta
                        </h2>
                        <p className="text-sm text-yellow-700">
                            {monitorKifatex.ncPendientes} notas de crédito esperando número de Kifatex
                        </p>
                    </div>
                    <div className="text-4xl font-bold text-yellow-600">
                        {monitorKifatex.ncPendientes}
                    </div>
                </div>
            </div>

            {/* Errores */}
            {monitorKifatex.errores.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-red-500" />
                        Errores Recientes
                    </h2>
                    <div className="space-y-3">
                        {monitorKifatex.errores.map((error, index) => (
                            <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 bg-red-200 text-red-800 rounded text-xs font-medium">
                                                {error.tipo}
                                            </span>
                                            <span className="text-sm text-gray-600">{error.fecha}</span>
                                        </div>
                                        <p className="text-sm text-gray-800 mb-1">{error.mensaje}</p>
                                        <p className="text-xs text-gray-600">Acción: {error.accion}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Últimos Archivos Recibidos */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-500" />
                    Últimos Archivos Recibidos
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Fecha/Hora</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Archivo</th>
                                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Registros</th>
                                <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Procesados</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {monitorKifatex.ultimosArchivos.map((archivo, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm text-gray-700">{archivo.fecha}</td>
                                    <td className="px-4 py-3 text-sm font-mono text-gray-700">{archivo.archivo}</td>
                                    <td className="px-4 py-3 text-sm text-right text-gray-700">{archivo.registros}</td>
                                    <td className="px-4 py-3 text-sm text-right font-semibold text-green-600">{archivo.procesados}</td>
                                    <td className="px-4 py-3 text-sm">
                                        {archivo.registros === archivo.procesados ? (
                                            <span className="flex items-center gap-1 text-green-600">
                                                <CheckCircle className="w-4 h-4" />
                                                Completo
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-yellow-600">
                                                <AlertCircle className="w-4 h-4" />
                                                Parcial
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm">NCs Enviadas</p>
                            <p className="text-3xl font-bold">{monitorKifatex.ncEnviadas}</p>
                        </div>
                        <FileText className="w-12 h-12 text-blue-200" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm">Con Respuesta</p>
                            <p className="text-3xl font-bold">{monitorKifatex.ncConRespuesta}</p>
                        </div>
                        <CheckCircle className="w-12 h-12 text-green-200" />
                    </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm">Tasa de Respuesta</p>
                            <p className="text-3xl font-bold">
                                {Math.round((monitorKifatex.ncConRespuesta / monitorKifatex.ncEnviadas) * 100)}%
                            </p>
                        </div>
                        <Server className="w-12 h-12 text-purple-200" />
                    </div>
                </div>
            </div>

            {/* Información de Configuración */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Configuración de Integración</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-600">Método de Integración</p>
                        <p className="font-medium text-gray-800">FTP / API</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Frecuencia de Sincronización</p>
                        <p className="font-medium text-gray-800">Cada 1 hora</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Formato de Archivo</p>
                        <p className="font-medium text-gray-800">CSV</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Última Configuración</p>
                        <p className="font-medium text-gray-800">2024-05-01</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitorKifatex;
