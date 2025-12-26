import React, { useState } from 'react';
import { Settings, Wifi, WifiOff, CheckCircle, XCircle, Activity, PieChart, RefreshCw, Save, CheckCircle2, X as XIcon, AlertCircle } from 'lucide-react';

const ConfiguracionInnovaSer = () => {
    const [config, setConfig] = useState({
        url: 'https://api.innovaser.com/v1/validate',
        usuario: 'bago_ecuador',
        password: '',
        timeout: 30,
    });

    const [connectionStatus, setConnectionStatus] = useState('disconnected'); // connected, disconnected, testing
    const [validationStats, setValidationStats] = useState({
        totalEnviadas: 1250,
        validas: 1087,
        invalidas: 143,
        erroresServicio: 20,
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleTestConnection = () => {
        if (!config.url || !config.usuario) {
            showNotification('Por favor complete URL y Usuario antes de probar la conexión', 'warning');
            return;
        }
        setConnectionStatus('testing');
        showNotification('Probando conexión con InnovaSer...', 'info');
        // Simular prueba de conexión
        setTimeout(() => {
            setConnectionStatus('connected');
            showNotification('Conexión exitosa con InnovaSer', 'success');
        }, 2000);
    };

    const handleSaveConfig = () => {
        // Validar campos requeridos
        if (!config.url || !config.usuario || !config.password) {
            showNotification('Por favor complete todos los campos requeridos (*)', 'error');
            return;
        }

        showNotification('Guardando configuración...', 'info');
        setTimeout(() => {
            showNotification('Configuración guardada exitosamente', 'success');
        }, 500);
    };

    const calcularPorcentaje = (valor, total) => {
        return ((valor / total) * 100).toFixed(1);
    };

    const { totalEnviadas, validas, invalidas, erroresServicio } = validationStats;
    const porcentajeValidas = calcularPorcentaje(validas, totalEnviadas);
    const porcentajeInvalidas = calcularPorcentaje(invalidas, totalEnviadas);
    const porcentajeErrores = calcularPorcentaje(erroresServicio, totalEnviadas);

    return (
        <div className="p-6 max-w-6xl mx-auto">
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
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración InnovaSer</h1>
                <p className="text-gray-600">Configura la integración con el servicio de validación de cédulas</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Panel de Configuración */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Settings className="w-5 h-5 mr-2" />
                            Configuración del Servicio
                        </h2>
                        <div className="flex items-center">
                            {connectionStatus === 'connected' && (
                                <div className="flex items-center text-green-600 text-sm">
                                    <Wifi className="w-4 h-4 mr-1" />
                                    Conectado
                                </div>
                            )}
                            {connectionStatus === 'disconnected' && (
                                <div className="flex items-center text-gray-400 text-sm">
                                    <WifiOff className="w-4 h-4 mr-1" />
                                    Desconectado
                                </div>
                            )}
                            {connectionStatus === 'testing' && (
                                <div className="flex items-center text-blue-600 text-sm">
                                    <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                                    Probando...
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                URL del Servicio *
                            </label>
                            <input
                                type="text"
                                value={config.url}
                                onChange={(e) => setConfig({ ...config, url: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="https://api.innovaser.com/v1/validate"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Usuario *
                            </label>
                            <input
                                type="text"
                                value={config.usuario}
                                onChange={(e) => setConfig({ ...config, usuario: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="usuario_api"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contraseña *
                            </label>
                            <input
                                type="password"
                                value={config.password}
                                onChange={(e) => setConfig({ ...config, password: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Timeout (segundos)
                            </label>
                            <input
                                type="number"
                                value={config.timeout}
                                onChange={(e) => setConfig({ ...config, timeout: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                min="5"
                                max="120"
                            />
                            <p className="text-xs text-gray-500 mt-1">Tiempo máximo de espera por respuesta</p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={handleTestConnection}
                                disabled={connectionStatus === 'testing'}
                                className="flex-1 px-4 py-2 border border-pink-500 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {connectionStatus === 'testing' ? 'Probando...' : 'Probar Conexión'}
                            </button>
                            <button
                                onClick={handleSaveConfig}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all flex items-center justify-center"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar
                            </button>
                        </div>
                    </div>

                    {/* Resultado de Prueba de Conexión */}
                    {connectionStatus === 'connected' && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                                <div>
                                    <h4 className="font-semibold text-green-900 mb-1">Conexión Exitosa</h4>
                                    <p className="text-sm text-green-700">
                                        El servicio de InnovaSer está disponible y respondiendo correctamente.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Panel de Estadísticas */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Estadísticas de Validación
                    </h2>

                    {/* Gráfico de Dona (Simulado con CSS) */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-48 h-48">
                            {/* Círculo de fondo */}
                            <svg className="w-48 h-48 transform -rotate-90">
                                {/* Válidas (Verde) - 87% */}
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    fill="none"
                                    stroke="#10B981"
                                    strokeWidth="32"
                                    strokeDasharray={`${2 * Math.PI * 80 * (validas / totalEnviadas)} ${2 * Math.PI * 80}`}
                                    strokeDashoffset="0"
                                />
                                {/* Inválidas (Rojo) - 11.4% */}
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    fill="none"
                                    stroke="#EF4444"
                                    strokeWidth="32"
                                    strokeDasharray={`${2 * Math.PI * 80 * (invalidas / totalEnviadas)} ${2 * Math.PI * 80}`}
                                    strokeDashoffset={`-${2 * Math.PI * 80 * (validas / totalEnviadas)}`}
                                />
                                {/* Errores (Amarillo) - 1.6% */}
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    fill="none"
                                    stroke="#F59E0B"
                                    strokeWidth="32"
                                    strokeDasharray={`${2 * Math.PI * 80 * (erroresServicio / totalEnviadas)} ${2 * Math.PI * 80}`}
                                    strokeDashoffset={`-${2 * Math.PI * 80 * ((validas + invalidas) / totalEnviadas)}`}
                                />
                            </svg>
                            {/* Texto central */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-3xl font-bold text-gray-900">{totalEnviadas}</p>
                                <p className="text-sm text-gray-500">Total</p>
                            </div>
                        </div>
                    </div>

                    {/* Leyenda */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                                <span className="text-sm font-medium text-gray-700">Cédulas Válidas</span>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">{validas}</p>
                                <p className="text-xs text-gray-500">{porcentajeValidas}%</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                                <span className="text-sm font-medium text-gray-700">Cédulas Inválidas</span>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">{invalidas}</p>
                                <p className="text-xs text-gray-500">{porcentajeInvalidas}%</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                                <span className="text-sm font-medium text-gray-700">Errores de Servicio</span>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">{erroresServicio}</p>
                                <p className="text-xs text-gray-500">{porcentajeErrores}%</p>
                            </div>
                        </div>
                    </div>

                    {/* Tasa de Éxito */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Tasa de Éxito</span>
                            <span className="text-2xl font-bold text-pink-600">{porcentajeValidas}%</span>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${porcentajeValidas}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla de Resultados Recientes */}
            <div className="mt-6 bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Últimas Validaciones</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observación</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">1726XXXXXX</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">GPF</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-05-23 14:32</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Válida
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">Cédula activa</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">0912XXXXXX</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Difar</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-05-23 14:30</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                        <XCircle className="w-3 h-3 mr-1" />
                                        Inválida
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">Cédula no existe en registro civil</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">1803XXXXXX</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Farmaenlace</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-05-23 14:28</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Válida
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">Cédula activa</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ConfiguracionInnovaSer;
