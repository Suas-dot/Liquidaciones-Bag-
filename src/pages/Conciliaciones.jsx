import React, { useState } from 'react';
import { GitCompare, AlertTriangle, CheckCircle, Download, Filter, Search, CheckCircle2, X as XIcon, Eye } from 'lucide-react';
import Modal from '../components/Modal';

const Conciliaciones = () => {
    const [activeTab, setActiveTab] = useState('ventas-nc');
    const [searchTerm, setSearchTerm] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);

    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleExport = (tabName) => {
        showNotification(`Exportando datos de ${tabName} a Excel...`, 'info');
        setTimeout(() => {
            showNotification('Archivo Excel descargado exitosamente', 'success');
        }, 1000);
    };

    const handleViewDetail = (item, type) => {
        setSelectedDetail({ ...item, type });
        setShowDetailModal(true);
    };

    // Mock data para Ventas vs NC
    const ventasVsNC = [
        { cliente: 'GPF', ventasReportadas: 125000, ncEmitidas: 5000, diferencia: 0, estado: 'conciliado' },
        { cliente: 'Difar', ventasReportadas: 95000, ncEmitidas: 3800, diferencia: 200, estado: 'diferencia' },
        { cliente: 'Farmaenlace', ventasReportadas: 55000, ncEmitidas: 2200, diferencia: 0, estado: 'conciliado' },
        { cliente: 'Fybeca', ventasReportadas: 180000, ncEmitidas: 7200, diferencia: -500, estado: 'diferencia' },
    ];

    // Mock data para Provisiones vs NC
    const provisionesVsNC = [
        { mes: 'Enero 2025', provisionCalculada: 45000, ncReales: 44500, diferencia: 500, estado: 'ajuste-menor' },
        { mes: 'Febrero 2025', provisionCalculada: 52000, ncReales: 52000, diferencia: 0, estado: 'exacto' },
        { mes: 'Marzo 2025', provisionCalculada: 48000, ncReales: 51000, diferencia: -3000, estado: 'ajuste-mayor' },
    ];

    // Mock data para NC Bagó vs NC Kifatex
    const ncBagoVsKifatex = [
        { ncBago: '900456', ncKifatex: 'KF-2025-0123', cliente: 'GPF', valorBago: 5000, valorKifatex: 5000, diferencia: 0, estado: 'conciliado' },
        { ncBago: '900457', ncKifatex: 'KF-2025-0124', cliente: 'Difar', valorBago: 3500, valorKifatex: 3500, diferencia: 0, estado: 'conciliado' },
        { ncBago: '900458', ncKifatex: 'Pendiente', cliente: 'Farmaenlace', valorBago: 2200, valorKifatex: 0, diferencia: 2200, estado: 'pendiente' },
        { ncBago: '900459', ncKifatex: 'KF-2025-0126', cliente: 'Fybeca', valorBago: 7200, valorKifatex: 7150, diferencia: 50, estado: 'diferencia' },
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
    };

    const getEstadoBadge = (estado) => {
        const badges = {
            'conciliado': { bg: 'bg-green-100', text: 'text-green-800', label: 'Conciliado', icon: CheckCircle },
            'diferencia': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Con Diferencia', icon: AlertTriangle },
            'pendiente': { bg: 'bg-red-100', text: 'text-red-800', label: 'Pendiente', icon: AlertTriangle },
            'exacto': { bg: 'bg-green-100', text: 'text-green-800', label: 'Exacto', icon: CheckCircle },
            'ajuste-menor': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Ajuste Menor', icon: CheckCircle },
            'ajuste-mayor': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Ajuste Mayor', icon: AlertTriangle },
        };

        const badge = badges[estado] || badges['diferencia'];
        const Icon = badge.icon;

        return (
            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${badge.bg} ${badge.text}`}>
                <Icon className="w-3 h-3 mr-1" />
                {badge.label}
            </span>
        );
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in ${toastType === 'success' ? 'bg-green-500 text-white' :
                        toastType === 'error' ? 'bg-red-500 text-white' :
                            toastType === 'warning' ? 'bg-yellow-500 text-white' :
                                'bg-blue-500 text-white'
                    }`}>
                    {toastType === 'success' && <CheckCircle2 className="w-5 h-5" />}
                    {toastType === 'error' && <XIcon className="w-5 h-5" />}
                    {toastType === 'warning' && <AlertTriangle className="w-5 h-5" />}
                    {toastType === 'info' && <Download className="w-5 h-5" />}
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Conciliaciones</h1>
                <p className="text-gray-600">Valida la consistencia de información entre sistemas</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow">
                {/* Tab Headers */}
                <div className="border-b border-gray-200">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('ventas-nc')}
                            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'ventas-nc'
                                ? 'border-pink-500 text-pink-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Ventas vs NC
                        </button>
                        <button
                            onClick={() => setActiveTab('provisiones-nc')}
                            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'provisiones-nc'
                                ? 'border-pink-500 text-pink-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Provisiones vs NC
                        </button>
                        <button
                            onClick={() => setActiveTab('nc-bago-kifatex')}
                            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'nc-bago-kifatex'
                                ? 'border-pink-500 text-pink-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            NC Bagó vs NC Kifatex
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {/* Tab 1: Ventas vs NC */}
                    {activeTab === 'ventas-nc' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Ventas Reportadas vs NC Emitidas</h2>
                                    <p className="text-sm text-gray-600 mt-1">Valida que las NC emitidas correspondan a las ventas reportadas por el cliente</p>
                                </div>
                                <button
                                    onClick={() => handleExport('Ventas vs NC')}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center text-sm"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Exportar
                                </button>
                            </div>

                            {/* Estadísticas */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                                    <p className="text-sm text-green-700 mb-1">Conciliados</p>
                                    <p className="text-2xl font-bold text-green-900">
                                        {ventasVsNC.filter(v => v.estado === 'conciliado').length}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
                                    <p className="text-sm text-yellow-700 mb-1">Con Diferencias</p>
                                    <p className="text-2xl font-bold text-yellow-900">
                                        {ventasVsNC.filter(v => v.estado === 'diferencia').length}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                                    <p className="text-sm text-blue-700 mb-1">Total Clientes</p>
                                    <p className="text-2xl font-bold text-blue-900">{ventasVsNC.length}</p>
                                </div>
                                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4">
                                    <p className="text-sm text-pink-700 mb-1">% Conciliación</p>
                                    <p className="text-2xl font-bold text-pink-900">
                                        {((ventasVsNC.filter(v => v.estado === 'conciliado').length / ventasVsNC.length) * 100).toFixed(0)}%
                                    </p>
                                </div>
                            </div>

                            {/* Tabla */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ventas Reportadas</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">NC Emitidas</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Diferencia</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {ventasVsNC.map((item, idx) => (
                                            <tr key={idx} className={`hover:bg-gray-50 ${item.diferencia !== 0 ? 'bg-yellow-50' : ''}`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.cliente}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(item.ventasReportadas)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(item.ncEmitidas)}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${item.diferencia === 0 ? 'text-green-600' :
                                                    item.diferencia > 0 ? 'text-yellow-600' : 'text-red-600'
                                                    }`}>
                                                    {item.diferencia === 0 ? '-' : formatCurrency(Math.abs(item.diferencia))}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getEstadoBadge(item.estado)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {item.estado === 'conciliado' ? (
                                                        <button
                                                            onClick={() => handleViewDetail(item, 'ventas')}
                                                            className="text-green-600 hover:text-green-900 flex items-center"
                                                        >
                                                            <Eye size={16} className="mr-1" />
                                                            Ver Detalle
                                                        </button>
                                                    ) : (
                                                        <button className="text-pink-600 hover:text-pink-900 font-medium">Reportar Diferencia</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Tab 2: Provisiones vs NC */}
                    {activeTab === 'provisiones-nc' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Provisiones Calculadas vs NC Reales</h2>
                                    <p className="text-sm text-gray-600 mt-1">Compara las provisiones mensuales con las NC realmente emitidas</p>
                                </div>
                                <button
                                    onClick={() => handleExport('Provisiones vs NC')}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center text-sm"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Exportar
                                </button>
                            </div>

                            {/* Estadísticas */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                                    <p className="text-sm text-purple-700 mb-1">Total Provisionado</p>
                                    <p className="text-2xl font-bold text-purple-900">
                                        {formatCurrency(provisionesVsNC.reduce((sum, p) => sum + p.provisionCalculada, 0))}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
                                    <p className="text-sm text-indigo-700 mb-1">NC Reales</p>
                                    <p className="text-2xl font-bold text-indigo-900">
                                        {formatCurrency(provisionesVsNC.reduce((sum, p) => sum + p.ncReales, 0))}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4">
                                    <p className="text-sm text-pink-700 mb-1">Diferencia Total</p>
                                    <p className="text-2xl font-bold text-pink-900">
                                        {formatCurrency(Math.abs(provisionesVsNC.reduce((sum, p) => sum + p.diferencia, 0)))}
                                    </p>
                                </div>
                            </div>

                            {/* Tabla */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mes</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Provisión Calculada</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">NC Reales</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Diferencia</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {provisionesVsNC.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.mes}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(item.provisionCalculada)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(item.ncReales)}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${item.diferencia === 0 ? 'text-green-600' :
                                                    Math.abs(item.diferencia) < 1000 ? 'text-blue-600' : 'text-orange-600'
                                                    }`}>
                                                    {item.diferencia === 0 ? '-' : formatCurrency(Math.abs(item.diferencia))}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getEstadoBadge(item.estado)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button
                                                        onClick={() => handleViewDetail(item, 'provisiones')}
                                                        className="text-pink-600 hover:text-pink-900 flex items-center"
                                                    >
                                                        <Eye size={16} className="mr-1" />
                                                        Ver Detalle
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Nota explicativa */}
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <strong>Nota:</strong> Las provisiones se calculan al cierre de mes y se ajustan al mes siguiente cuando se emiten las NC reales.
                                    Diferencias menores al 5% se consideran normales.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Tab 3: NC Bagó vs NC Kifatex */}
                    {activeTab === 'nc-bago-kifatex' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">NC Bagó vs NC Kifatex</h2>
                                    <p className="text-sm text-gray-600 mt-1">Valida que las NC de Bagó tengan su réplica en Kifatex con valores correctos</p>
                                </div>
                                <button
                                    onClick={() => handleExport('NC Bagó vs Kifatex')}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center text-sm"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Exportar
                                </button>
                            </div>

                            {/* Estadísticas */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                                    <p className="text-sm text-green-700 mb-1">Conciliadas</p>
                                    <p className="text-2xl font-bold text-green-900">
                                        {ncBagoVsKifatex.filter(nc => nc.estado === 'conciliado').length}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                                    <p className="text-sm text-red-700 mb-1">Pendientes</p>
                                    <p className="text-2xl font-bold text-red-900">
                                        {ncBagoVsKifatex.filter(nc => nc.estado === 'pendiente').length}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
                                    <p className="text-sm text-yellow-700 mb-1">Con Diferencias</p>
                                    <p className="text-2xl font-bold text-yellow-900">
                                        {ncBagoVsKifatex.filter(nc => nc.estado === 'diferencia').length}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4">
                                    <p className="text-sm text-pink-700 mb-1">Total NC</p>
                                    <p className="text-2xl font-bold text-pink-900">{ncBagoVsKifatex.length}</p>
                                </div>
                            </div>

                            {/* Tabla */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NC Bagó</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NC Kifatex</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Bagó</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Kifatex</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Diferencia</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {ncBagoVsKifatex.map((item, idx) => (
                                            <tr key={idx} className={`hover:bg-gray-50 ${item.estado === 'pendiente' ? 'bg-red-50' : item.estado === 'diferencia' ? 'bg-yellow-50' : ''}`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono font-medium text-gray-900">{item.ncBago}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                                                    {item.ncKifatex === 'Pendiente' ? (
                                                        <span className="text-red-600 font-semibold">{item.ncKifatex}</span>
                                                    ) : (
                                                        item.ncKifatex
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.cliente}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{formatCurrency(item.valorBago)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                                                    {item.valorKifatex === 0 ? '-' : formatCurrency(item.valorKifatex)}
                                                </td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${item.diferencia === 0 ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                    {item.diferencia === 0 ? '-' : formatCurrency(Math.abs(item.diferencia))}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getEstadoBadge(item.estado)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Alerta de pendientes */}
                            {ncBagoVsKifatex.some(nc => nc.estado === 'pendiente') && (
                                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-start">
                                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
                                        <div>
                                            <h4 className="font-semibold text-red-900 mb-1">NC Pendientes de Respuesta</h4>
                                            <p className="text-sm text-red-700">
                                                Hay {ncBagoVsKifatex.filter(nc => nc.estado === 'pendiente').length} NC(s) de Bagó que aún no tienen réplica de Kifatex.
                                                Contacta con Kifatex para obtener los números de NC correspondientes.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            <Modal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                title="Detalle de Conciliación"
                size="lg"
            >
                {selectedDetail && (
                    <div className="space-y-4">
                        {selectedDetail.type === 'ventas' && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Cliente</p>
                                        <p className="font-semibold text-gray-900">{selectedDetail.cliente}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Estado</p>
                                        {getEstadoBadge(selectedDetail.estado)}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Ventas Reportadas</p>
                                        <p className="font-semibold text-gray-900">{formatCurrency(selectedDetail.ventasReportadas)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">NC Emitidas</p>
                                        <p className="font-semibold text-gray-900">{formatCurrency(selectedDetail.ncEmitidas)}</p>
                                    </div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <p className="text-sm text-green-800">
                                        <strong>Conciliación exitosa:</strong> Las ventas reportadas coinciden con las NC emitidas.
                                    </p>
                                </div>
                            </>
                        )}
                        {selectedDetail.type === 'provisiones' && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Mes</p>
                                        <p className="font-semibold text-gray-900">{selectedDetail.mes}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Estado</p>
                                        {getEstadoBadge(selectedDetail.estado)}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Provisión Calculada</p>
                                        <p className="font-semibold text-gray-900">{formatCurrency(selectedDetail.provisionCalculada)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">NC Reales</p>
                                        <p className="font-semibold text-gray-900">{formatCurrency(selectedDetail.ncReales)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Diferencia</p>
                                        <p className={`font-semibold ${selectedDetail.diferencia === 0 ? 'text-green-600' :
                                                Math.abs(selectedDetail.diferencia) < 1000 ? 'text-blue-600' : 'text-orange-600'
                                            }`}>
                                            {selectedDetail.diferencia === 0 ? 'Sin diferencia' : formatCurrency(Math.abs(selectedDetail.diferencia))}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                        <strong>Nota:</strong> {selectedDetail.diferencia === 0 ? 'La provisión fue exacta.' : 'Se requiere ajuste contable para el próximo mes.'}
                                    </p>
                                </div>
                            </>
                        )}
                        <div className="flex justify-end pt-4 border-t">
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Conciliaciones;
