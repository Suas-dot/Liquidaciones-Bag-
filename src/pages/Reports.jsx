import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import {
    Download,
    Calendar,
    Filter,
    FileText,
    TrendingUp,
    PieChart as PieIcon,
    DollarSign,
    X,
    CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const Reports = () => {
    const [activeTab, setActiveTab] = useState("general");
    const [dateRange, setDateRange] = useState("Nov 2024 - Dic 2024");
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    // Mock Data for Charts
    const monthlyData = [
        { name: 'Jul', liquidado: 40000, proyectado: 42000 },
        { name: 'Ago', liquidado: 45000, proyectado: 44000 },
        { name: 'Sep', liquidado: 48000, proyectado: 48000 },
        { name: 'Oct', liquidado: 52000, proyectado: 50000 },
        { name: 'Nov', liquidado: 49000, proyectado: 51000 },
        { name: 'Dic', liquidado: 60000, proyectado: 58000 },
    ];

    const clientDistribution = [
        { name: 'Fybeca', value: 45, color: '#ec4899' },
        { name: 'Cruz Azul', value: 30, color: '#3b82f6' },
        { name: 'Farm. Económicas', value: 15, color: '#10b981' },
        { name: 'Otros', value: 10, color: '#94a3b8' },
    ];

    const statusData = [
        { name: 'Emitidas', value: 145, color: '#10b981' },
        { name: 'Pendientes', value: 42, color: '#f59e0b' },
        { name: 'Con Error', value: 12, color: '#ef4444' },
    ];

    const detailedReport = [
        { id: 1, date: '2024-12-10', client: 'Fybeca', type: 'Rebate Anual', amount: 15400, status: 'Emitida', doc: 'NC-9901' },
        { id: 2, date: '2024-12-12', client: 'Farmacias Cruz Azul', type: 'Liquidación Promo', amount: 3200, status: 'Pendiente', doc: '-' },
        { id: 3, date: '2024-12-14', client: 'Distribuidora Farmacéutica', type: 'Dif. Precio', amount: 850, status: 'Error', doc: 'ERR-TIMEOUT' },
        { id: 4, date: '2024-12-15', client: 'Farmacias Económicas', type: 'Plan Medicación', amount: 1200, status: 'Emitida', doc: 'NC-9904' },
    ];

    const provisionsData = [
        { id: 101, product: "Crema Anti-Edad 50ml", avgSales: 12500, rebatePercent: 5, provision: 625 },
        { id: 102, product: "Pack Verano 2024", avgSales: 8000, rebatePercent: 3, provision: 240 },
        { id: 103, product: "Jarabe Tos Adultos", avgSales: 15600, rebatePercent: 4, provision: 624 },
        { id: 104, product: "Analgésico Forte", avgSales: 45000, rebatePercent: 5, provision: 2250 },
        { id: 105, product: "Multivitamínico Kids", avgSales: 5200, rebatePercent: 2, provision: 104 },
    ];

    const totalProvision = provisionsData.reduce((acc, curr) => acc + curr.provision, 0);

    const openModal = (type) => {
        setModalType(type);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
    };

    const showSuccessNotification = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleExport = (format) => {
        showSuccessNotification(`Generando reporte en formato ${format}...`);
        closeModal();
        // Simular descarga
        setTimeout(() => {
            showSuccessNotification(`Reporte ${format} descargado exitosamente`);
        }, 1500);
    };

    const handleDateRangeApply = (startDate, endDate) => {
        setDateRange(`${startDate} - ${endDate}`);
        showSuccessNotification('Rango de fechas actualizado');
        closeModal();
    };

    const handleFilterApply = () => {
        showSuccessNotification('Filtros aplicados correctamente');
        closeModal();
    };

    // Modal Component
    const Modal = () => {
        if (!showModal) return null;

        const renderModalContent = () => {
            switch (modalType) {
                case 'export':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Exportar Reporte</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Selecciona el formato de exportación para el reporte completo
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleExport('Excel')}
                                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <FileText className="text-green-600" size={24} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Excel (.xlsx)</p>
                                            <p className="text-sm text-gray-500">Incluye todas las pestañas y gráficos</p>
                                        </div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => handleExport('PDF')}
                                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-100 rounded-lg">
                                            <FileText className="text-red-600" size={24} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">PDF</p>
                                            <p className="text-sm text-gray-500">Formato de presentación ejecutiva</p>
                                        </div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => handleExport('CSV')}
                                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <FileText className="text-blue-600" size={24} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">CSV</p>
                                            <p className="text-sm text-gray-500">Datos sin formato para análisis</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    );

                case 'dateRange':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Seleccionar Rango de Fechas</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha Inicio
                                    </label>
                                    <input
                                        type="date"
                                        defaultValue="2024-11-01"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Fecha Fin
                                    </label>
                                    <input
                                        type="date"
                                        defaultValue="2024-12-31"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <p className="text-sm text-blue-800">
                                        <strong>Rangos Predefinidos:</strong>
                                    </p>
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        <button
                                            onClick={() => handleDateRangeApply('Este Mes', new Date().toLocaleDateString())}
                                            className="px-3 py-1 bg-white border border-blue-300 rounded text-sm hover:bg-blue-100"
                                        >
                                            Este Mes
                                        </button>
                                        <button
                                            onClick={() => handleDateRangeApply('Último Trimestre', new Date().toLocaleDateString())}
                                            className="px-3 py-1 bg-white border border-blue-300 rounded text-sm hover:bg-blue-100"
                                        >
                                            Último Trimestre
                                        </button>
                                        <button
                                            onClick={() => handleDateRangeApply('Este Año', new Date().toLocaleDateString())}
                                            className="px-3 py-1 bg-white border border-blue-300 rounded text-sm hover:bg-blue-100"
                                        >
                                            Este Año
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                case 'filter':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Filtros Avanzados</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Cliente
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                                        <option value="">Todos los clientes</option>
                                        <option>Fybeca</option>
                                        <option>Farmacias Cruz Azul</option>
                                        <option>Distribuidora Farmacéutica</option>
                                        <option>Farmacias Económicas</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipo de Nota
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                                        <option value="">Todos los tipos</option>
                                        <option>Rebate Anual</option>
                                        <option>Liquidación Promo</option>
                                        <option>Dif. Precio</option>
                                        <option>Plan Medicación</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Estado
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2">
                                            <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                                            <span className="text-sm">Emitidas</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                                            <span className="text-sm">Pendientes</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input type="checkbox" className="rounded text-primary-600" />
                                            <span className="text-sm">Con Error</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Rango de Monto
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                type="number"
                                                placeholder="Mínimo"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                placeholder="Máximo"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                default:
                    return null;
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">Reportes</h2>
                        <button
                            onClick={closeModal}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="p-6">
                        {renderModalContent()}
                    </div>
                    {modalType !== 'export' && (
                        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={modalType === 'filter' ? handleFilterApply : () => handleDateRangeApply('Nov 2024', 'Dic 2024')}
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                            >
                                Aplicar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 space-y-6">
            {/* Success Notification */}
            {showNotification && (
                <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 shadow-lg animate-fade-in">
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="text-green-800 font-medium">{notificationMessage}</span>
                </div>
            )}

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Reportes y Análisis</h1>
                    <p className="text-gray-500 mt-1">Visualización estratégica del desempeño comercial</p>
                </div>
                <div className="flex gap-2">
                    <Button variant={activeTab === 'general' ? 'primary' : 'outline'} onClick={() => setActiveTab('general')}>
                        General
                    </Button>
                    <Button variant={activeTab === 'provisions' ? 'primary' : 'outline'} onClick={() => setActiveTab('provisions')}>
                        Provisiones (3 Meses)
                    </Button>
                    <div className="w-px bg-gray-300 mx-2"></div>
                    <Button variant="outline" className="flex items-center gap-2" onClick={() => openModal('dateRange')}>
                        <Calendar size={18} />
                        {dateRange}
                    </Button>
                    <Button className="flex items-center gap-2" onClick={() => openModal('export')}>
                        <Download size={18} />
                        Exportar Todo
                    </Button>
                </div>
            </div>

            {activeTab === 'general' ? (
                <>
                    {/* Top Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Monthly Trend */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="text-primary-600" size={20} />
                                    Tendencia de Liquidaciones (Semestral)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={monthlyData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                                            <Tooltip
                                                cursor={{ fill: '#f8fafc' }}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Legend />
                                            <Bar dataKey="liquidado" name="Liquidado Real" fill="#ec4899" radius={[4, 4, 0, 0]} />
                                            <Bar dataKey="proyectado" name="Proyectado" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Client Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieIcon className="text-primary-600" size={20} />
                                    Distribución por Cliente Principal
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col md:flex-row items-center h-72">
                                    <div className="h-full w-full md:w-1/2">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={clientDistribution}
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {clientDistribution.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="w-full md:w-1/2 grid grid-cols-1 gap-4">
                                        {clientDistribution.map((item) => (
                                            <div key={item.name} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Status Breakdown Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {statusData.map((stat, index) => (
                            <Card key={index}>
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Notas {stat.name}</p>
                                            <h3 className="text-3xl font-bold mt-1" style={{ color: stat.color }}>{stat.value}</h3>
                                        </div>
                                        <div className="p-2 rounded-lg bg-gray-50" style={{ color: stat.color }}>
                                            <FileText size={24} />
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className="h-full rounded-full transition-all duration-1000"
                                            style={{ width: `${(stat.value / 200) * 100}%`, backgroundColor: stat.color }}
                                        ></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Detailed Table */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Detalle de Transacciones (Últimos 30 días)</CardTitle>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => openModal('filter')}>
                                    <Filter size={16} /> Filtrar
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                                        <tr>
                                            <th className="px-6 py-3">Fecha</th>
                                            <th className="px-6 py-3">Cliente</th>
                                            <th className="px-6 py-3">Tipo</th>
                                            <th className="px-6 py-3 text-right">Monto</th>
                                            <th className="px-6 py-3 text-center">Estado</th>
                                            <th className="px-6 py-3 text-right">Documento</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {detailedReport.map((row) => (
                                            <tr key={row.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{row.date}</td>
                                                <td className="px-6 py-4 text-gray-600">{row.client}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                                                        {row.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-gray-900">
                                                    ${row.amount.toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <Badge variant={
                                                        row.status === 'Emitida' ? 'success' :
                                                            row.status === 'Error' ? 'danger' : 'warning'
                                                    }>
                                                        {row.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-right font-mono text-xs text-gray-500">
                                                    {row.doc}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </>
            ) : (
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="bg-blue-50">
                            <CardTitle className="text-blue-900">Cálculo de Provisiones de Rebates (Promedio 3 Meses)</CardTitle>
                            <p className="text-sm text-blue-700">Estimación basada en el historial de ventas reciente para provisionar contablemente los montos a pagar.</p>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                    <p className="text-sm text-gray-500">Total Provisión Estimada</p>
                                    <p className="text-3xl font-bold text-gray-900">${totalProvision.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                    <p className="text-sm text-gray-500">Productos Analizados</p>
                                    <p className="text-3xl font-bold text-gray-900">{provisionsData.length}</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border shadow-sm">
                                    <p className="text-sm text-gray-500">Periodo de Referencia</p>
                                    <p className="text-3xl font-bold text-gray-900">Ago - Oct</p>
                                </div>
                            </div>

                            <div className="overflow-x-auto border rounded-lg">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                        <tr>
                                            <th className="px-6 py-3">Producto</th>
                                            <th className="px-6 py-3 text-right">Venta Promedio (3 Meses)</th>
                                            <th className="px-6 py-3 text-right">Rebate Aplicable (%)</th>
                                            <th className="px-6 py-3 text-right">Provisión ($)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {provisionsData.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{item.product}</td>
                                                <td className="px-6 py-4 text-right">${item.avgSales.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-right">{item.rebatePercent}%</td>
                                                <td className="px-6 py-4 text-right font-bold text-blue-600">${item.provision.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50 font-bold">
                                        <tr>
                                            <td className="px-6 py-3 text-right" colSpan={3}>TOTAL</td>
                                            <td className="px-6 py-3 text-right text-blue-700">${totalProvision.toLocaleString()}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Modal */}
            <Modal />
        </div>
    );
};

export default Reports;
