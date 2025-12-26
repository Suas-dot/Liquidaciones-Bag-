import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, Calendar, Download, Filter, CheckCircle, XCircle, CheckCircle2, X as XIcon, AlertCircle } from 'lucide-react';

const EvaluacionPromociones = () => {
    const [selectedPromotion, setSelectedPromotion] = useState('');
    const [activeTab, setActiveTab] = useState('resumen');
    const [periodoAnalisis, setPeriodoAnalisis] = useState({ inicio: '2025-01-01', fin: '2025-03-31' });
    const [periodoComparativo, setPeriodoComparativo] = useState({ inicio: '2024-01-01', fin: '2024-03-31' });
    const [showResults, setShowResults] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Mock data de promociones disponibles
    const promociones = [
        { id: 1, nombre: 'Cupón Letti', mecanica: 'Cupones', vigencia: 'Ene-Jun 2025', objetivo: 20 },
        { id: 2, nombre: 'PMC GPF', mecanica: 'PMC', vigencia: 'Ene-Dic 2025', objetivo: 15 },
        { id: 3, nombre: 'Rebate Trifamox', mecanica: 'Rebates', vigencia: 'Ene-Mar 2025', objetivo: 25 },
    ];

    // Mock data de evaluación
    const evaluacionData = {
        totalClientes: {
            unidadesAnt: 11126,
            unidadesAct: 12572,
            ventasAnt: 436000,
            ventasAct: 492000,
            margenAnt: 180000,
            margenAct: 207000,
        },
        participantes: {
            unidadesAnt: 9295,
            unidadesAct: 11373,
            ventasAnt: 295000,
            ventasAct: 373000,
            margenAnt: 120000,
            margenAct: 155000,
        },
        ncEmitidas: 7000,
        objetivo: 20, // %
    };

    // Mock data por producto
    const productoData = [
        { producto: 'Letti 25%', unidadesAnt: 5000, unidadesAct: 6200, ventasAnt: 150000, ventasAct: 186000, margenAnt: 60000, margenAct: 75000 },
        { producto: 'Letti 50%', unidadesAnt: 3000, unidadesAct: 3800, ventasAnt: 120000, ventasAct: 152000, margenAnt: 48000, margenAct: 61000 },
        { producto: 'Letti Gel', unidadesAnt: 1295, unidadesAct: 1373, ventasAnt: 25000, ventasAct: 35000, margenAnt: 12000, margenAct: 19000 },
    ];

    // Mock data por cliente
    const clienteData = [
        { cliente: 'GPF', unidadesAnt: 3500, unidadesAct: 4500, ventasAnt: 125000, ventasAct: 165000, ncEmitidas: 3500 },
        { cliente: 'Difar', unidadesAnt: 2800, unidadesAct: 3400, ventasAnt: 95000, ventasAct: 118000, ncEmitidas: 2300 },
        { cliente: 'Farmaenlace', unidadesAnt: 1800, unidadesAct: 2300, ventasAnt: 55000, ventasAct: 70000, ncEmitidas: 1200 },
    ];

    const calcularVariacion = (actual, anterior) => {
        const variacion = ((actual - anterior) / anterior) * 100;
        return variacion.toFixed(1);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
    };

    const handleGenerateEvaluation = () => {
        if (!selectedPromotion) {
            showNotification('Por favor seleccione una promoción', 'warning');
            return;
        }
        showNotification('Generando evaluación comparativa...', 'info');
        setTimeout(() => {
            setShowResults(true);
            showNotification('Evaluación generada exitosamente', 'success');
        }, 1500);
    };

    const handleExportReport = () => {
        showNotification('Exportando reporte a Excel...', 'info');
        setTimeout(() => {
            showNotification('Reporte descargado exitosamente', 'success');
        }, 1000);
    };

    const handleSuggestPeriod = () => {
        // Set suggested periods based on promotion dates
        setPeriodoAnalisis({ inicio: '2025-01-01', fin: '2025-03-31' });
        setPeriodoComparativo({ inicio: '2024-01-01', fin: '2024-03-31' });
        showNotification('Períodos sugeridos aplicados', 'success');
    };

    const MetricCard = ({ title, anterior, actual, tipo = 'unidades', objetivo = null }) => {
        const variacion = calcularVariacion(actual, anterior);
        const cumpleObjetivo = objetivo ? parseFloat(variacion) >= objetivo : null;
        const isPositive = parseFloat(variacion) > 0;

        return (
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
                    {cumpleObjetivo !== null && (
                        cumpleObjetivo ?
                            <CheckCircle className="w-5 h-5 text-green-500" /> :
                            <XCircle className="w-5 h-5 text-red-500" />
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                        <span className="text-xs text-gray-500">Anterior:</span>
                        <span className="text-sm font-medium text-gray-700">
                            {tipo === 'currency' ? formatCurrency(anterior) : anterior.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex items-baseline justify-between">
                        <span className="text-xs text-gray-500">Actual:</span>
                        <span className="text-lg font-bold text-gray-900">
                            {tipo === 'currency' ? formatCurrency(actual) : actual.toLocaleString()}
                        </span>
                    </div>
                    <div className={`flex items-center justify-between pt-2 border-t ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="text-lg font-bold">{variacion}%</span>
                    </div>
                    {objetivo && (
                        <div className="text-xs text-gray-500 pt-1">
                            Objetivo: {objetivo}% {cumpleObjetivo ? '✓ Cumplido' : '✗ No cumplido'}
                        </div>
                    )}
                </div>
            </div>
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
                    {toastType === 'warning' && <AlertCircle className="w-5 h-5" />}
                    {toastType === 'info' && <Download className="w-5 h-5" />}
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Evaluación de Promociones</h1>
                <p className="text-gray-600">Analiza la efectividad de tus promociones comparando períodos</p>
            </div>

            {/* Selección de Promoción */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Seleccionar Promoción a Evaluar</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Promoción</label>
                        <select
                            value={selectedPromotion}
                            onChange={(e) => setSelectedPromotion(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        >
                            <option value="">Seleccione una promoción...</option>
                            {promociones.map(promo => (
                                <option key={promo.id} value={promo.id}>
                                    {promo.nombre} - {promo.mecanica} ({promo.vigencia})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {selectedPromotion && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600">Mecánica:</span>
                                <p className="font-semibold">Cupones</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Vigencia:</span>
                                <p className="font-semibold">Ene-Jun 2025</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Productos:</span>
                                <p className="font-semibold">Letti 25%, 50%, Gel</p>
                            </div>
                            <div>
                                <span className="text-gray-600">Objetivo:</span>
                                <p className="font-semibold text-pink-600">+20% unidades</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Configuración de Períodos */}
                {selectedPromotion && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Período de Análisis
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Fecha Inicio</label>
                                    <input
                                        type="date"
                                        value={periodoAnalisis.inicio}
                                        onChange={(e) => setPeriodoAnalisis({ ...periodoAnalisis, inicio: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Fecha Fin</label>
                                    <input
                                        type="date"
                                        value={periodoAnalisis.fin}
                                        onChange={(e) => setPeriodoAnalisis({ ...periodoAnalisis, fin: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                Período Comparativo
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Fecha Inicio</label>
                                    <input
                                        type="date"
                                        value={periodoComparativo.inicio}
                                        onChange={(e) => setPeriodoComparativo({ ...periodoComparativo, inicio: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Fecha Fin</label>
                                    <input
                                        type="date"
                                        value={periodoComparativo.fin}
                                        onChange={(e) => setPeriodoComparativo({ ...periodoComparativo, fin: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedPromotion && (
                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={handleGenerateEvaluation}
                            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
                        >
                            Generar Evaluación
                        </button>
                        <button
                            onClick={handleSuggestPeriod}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Sugerencias de Período
                        </button>
                    </div>
                )}
            </div>

            {/* Tabs de Resultados */}
            {selectedPromotion && showResults && (
                <div className="bg-white rounded-lg shadow">
                    {/* Tab Headers */}
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('resumen')}
                                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'resumen'
                                    ? 'border-pink-500 text-pink-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Resumen Ejecutivo
                            </button>
                            <button
                                onClick={() => setActiveTab('producto')}
                                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'producto'
                                    ? 'border-pink-500 text-pink-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Detalle por Producto
                            </button>
                            <button
                                onClick={() => setActiveTab('cliente')}
                                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'cliente'
                                    ? 'border-pink-500 text-pink-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Detalle por Cliente
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Tab 1: Resumen Ejecutivo */}
                        {activeTab === 'resumen' && (
                            <div className="space-y-6">
                                {/* Total Clientes */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Clientes (100% Cartera)</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <MetricCard
                                            title="Unidades"
                                            anterior={evaluacionData.totalClientes.unidadesAnt}
                                            actual={evaluacionData.totalClientes.unidadesAct}
                                            tipo="unidades"
                                        />
                                        <MetricCard
                                            title="Ventas"
                                            anterior={evaluacionData.totalClientes.ventasAnt}
                                            actual={evaluacionData.totalClientes.ventasAct}
                                            tipo="currency"
                                        />
                                        <MetricCard
                                            title="Margen CM2"
                                            anterior={evaluacionData.totalClientes.margenAnt}
                                            actual={evaluacionData.totalClientes.margenAct}
                                            tipo="currency"
                                        />
                                    </div>
                                </div>

                                {/* Solo Participantes */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Solo Clientes Participantes</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <MetricCard
                                            title="Unidades"
                                            anterior={evaluacionData.participantes.unidadesAnt}
                                            actual={evaluacionData.participantes.unidadesAct}
                                            tipo="unidades"
                                            objetivo={evaluacionData.objetivo}
                                        />
                                        <MetricCard
                                            title="Ventas"
                                            anterior={evaluacionData.participantes.ventasAnt}
                                            actual={evaluacionData.participantes.ventasAct}
                                            tipo="currency"
                                        />
                                        <MetricCard
                                            title="Margen CM2"
                                            anterior={evaluacionData.participantes.margenAnt}
                                            actual={evaluacionData.participantes.margenAct}
                                            tipo="currency"
                                        />
                                    </div>
                                </div>

                                {/* Impacto de NC */}
                                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Impacto de Notas de Crédito</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">NC Emitidas (3 meses)</p>
                                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(evaluacionData.ncEmitidas)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">Ventas Participantes</p>
                                            <p className="text-2xl font-bold text-gray-900">{formatCurrency(evaluacionData.participantes.ventasAct)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600 mb-1">% Participación NC</p>
                                            <p className="text-2xl font-bold text-pink-600">
                                                {((evaluacionData.ncEmitidas / evaluacionData.participantes.ventasAct) * 100).toFixed(1)}%
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">Bajo impacto, alta efectividad</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Conclusión */}
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                                        <div>
                                            <h4 className="font-semibold text-green-900 mb-1">Promoción Efectiva</h4>
                                            <p className="text-sm text-green-700">
                                                Objetivo: Crecer 20% en unidades | Real: 22.7% | ✓ Cumplido
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleExportReport}
                                    className="w-full md:w-auto px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Exportar Reporte a Excel
                                </button>
                            </div>
                        )}

                        {/* Tab 2: Por Producto */}
                        {activeTab === 'producto' && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Análisis por Producto</h3>
                                    <button
                                        onClick={handleExportReport}
                                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center text-sm"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Exportar
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unidades Ant</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unidades Act</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Var %</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ventas Ant</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ventas Act</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Var %</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {productoData.map((prod, idx) => {
                                                const varUnidades = calcularVariacion(prod.unidadesAct, prod.unidadesAnt);
                                                const varVentas = calcularVariacion(prod.ventasAct, prod.ventasAnt);
                                                return (
                                                    <tr key={idx} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prod.producto}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{prod.unidadesAnt.toLocaleString()}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{prod.unidadesAct.toLocaleString()}</td>
                                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${parseFloat(varUnidades) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {varUnidades > 0 ? '+' : ''}{varUnidades}%
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{formatCurrency(prod.ventasAnt)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{formatCurrency(prod.ventasAct)}</td>
                                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${parseFloat(varVentas) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {varVentas > 0 ? '+' : ''}{varVentas}%
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Por Cliente */}
                        {activeTab === 'cliente' && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Análisis por Cliente</h3>
                                    <button
                                        onClick={handleExportReport}
                                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center text-sm"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Exportar
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unidades Ant</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unidades Act</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Var %</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ventas Act</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">NC Emitidas</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {clienteData.map((cliente, idx) => {
                                                const varUnidades = calcularVariacion(cliente.unidadesAct, cliente.unidadesAnt);
                                                return (
                                                    <tr key={idx} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.cliente}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{cliente.unidadesAnt.toLocaleString()}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{cliente.unidadesAct.toLocaleString()}</td>
                                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${parseFloat(varUnidades) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {varUnidades > 0 ? '+' : ''}{varUnidades}%
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">{formatCurrency(cliente.ventasAct)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right">{formatCurrency(cliente.ncEmitidas)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EvaluacionPromociones;
