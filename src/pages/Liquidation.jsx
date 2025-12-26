import React, { useState, useEffect } from 'react';
import {
    Calculator,
    CheckCircle2,
    Clock,
    XCircle,
    Download,
    Filter,
    Search,
    Eye,
    AlertTriangle,
    RefreshCw
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const Liquidation = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [calculationMode, setCalculationMode] = useState("standard"); // 'standard' | 'price_difference'

    // Toast notification state
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success'); // 'success', 'warning', 'error', 'info'

    // Detail modal state
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedLiquidation, setSelectedLiquidation] = useState(null);

    // Form State
    const [newLiqData, setNewLiqData] = useState({
        client: "",
        month: "Noviembre",
        year: "2024"
    });

    // Mock data state
    const [liquidations, setLiquidations] = useState([
        {
            id: "LIQ-2024-001", period: "Nov 2024", client: "Farmacias Cruz Azul", promotion: "Descuento Verano",
            reportedUnits: 1250, physicalUnits: 1250,
            billedPrice: 10.00, negotiatedPrice: 8.00,
            amount: 12500.00, status: "pending", date: "2024-11-30", mode: "standard"
        },
        {
            id: "LIQ-2024-002", period: "Nov 2024", client: "Fybeca", promotion: "Promo 2x1 Analgésicos",
            reportedUnits: 845, physicalUnits: 845,
            billedPrice: 12.00, negotiatedPrice: 8.00, // Price diff = 4
            amount: 8450.50, status: "approved", date: "2024-11-28", mode: "standard"
        },
        {
            id: "LIQ-2024-003", period: "Oct 2024", client: "Farmacias Económicas", promotion: "Bonificación Volumen",
            reportedUnits: 320, physicalUnits: 300, // Diff!
            billedPrice: 15.00, negotiatedPrice: 10.00,
            amount: 3200.00, status: "rejected", date: "2024-10-15", mode: "standard"
        },
    ]);

    // Toast notification helper
    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Recalculate amounts when editing physical count or mode
    const calculateAmount = (liq) => {
        const units = Math.min(liq.reportedUnits, liq.physicalUnits);

        if (calculationMode === 'price_difference') {
            // (Billed - Negotiated) * Units
            const diff = Math.max(0, liq.billedPrice - liq.negotiatedPrice);
            return units * diff;
        } else {
            // Standard: Just mocked amount for now, or imagine proper bonus logic
            // Preserving original amount logic for standard mode simplicity in mock
            return (liq.amount / liq.reportedUnits) * units;
        }
    };

    const handlePhysicalCountChange = (id, newCount) => {
        setLiquidations(liquidations.map(liq => {
            if (liq.id === id) {
                const count = parseInt(newCount) || 0;
                const updatedLiq = { ...liq, physicalUnits: count };
                // Recalculate amount based on new count
                // Note: In a real app, amount calculation is complex. Here we approximate.
                let newAmount = liq.amount;
                if (calculationMode === 'price_difference') {
                    const diff = Math.max(0, liq.billedPrice - liq.negotiatedPrice);
                    newAmount = Math.min(liq.reportedUnits, count) * diff;
                } else {
                    // Simple ratio adjustment for mock standard
                    newAmount = (liq.initialAmount || liq.amount) * (Math.min(liq.reportedUnits, count) / liq.reportedUnits);
                }

                return { ...updatedLiq, amount: maxDecimals(newAmount) };
            }
            return liq;
        }));
    };

    const maxDecimals = (val) => Math.round(val * 100) / 100;

    const toggleCalculationMode = () => {
        const newMode = calculationMode === 'standard' ? 'price_difference' : 'standard';
        setCalculationMode(newMode);
        showNotification(`Modo cambiado a: ${newMode === 'standard' ? 'Estándar' : 'Diferencia de Precio (GPF)'}`, 'info');
        // Recalculate all displayed amounts based on new mode logic simulation
        setLiquidations(liquidations.map(liq => {
            let newAmount = 0;
            const units = Math.min(liq.reportedUnits, liq.physicalUnits);
            if (newMode === 'price_difference') {
                const diff = Math.max(0, liq.billedPrice - liq.negotiatedPrice);
                newAmount = units * diff;
            } else {
                // Revert/Simulate standard (mock logic: $10/unit avg for demo)
                newAmount = units * 10.00;
            }
            return { ...liq, amount: newAmount, mode: newMode };
        }));
    };

    // Simulated Historic IDs for Duplicate Check
    const HISTORIC_INVOICES = ["LIQ-2024-002", "LIQ-2024-005"];

    // Gaby Cajas Format Download Helper
    const handleExportSAP = () => {
        const approvedLiqs = liquidations.filter(l => l.status === 'approved' || l.status === 'pending');

        if (approvedLiqs.length === 0) {
            showNotification('No hay liquidaciones aprobadas o pendientes para exportar', 'warning');
            return;
        }

        showNotification('Generando archivo SAP (Formato Gaby Cajas)...', 'info');

        setTimeout(() => {
            // Mock data generation for SAP "Gaby Cajas" format
            const header = "Material|Descripcion|Valor_A_Pagar|Condicion|Referencia\n";
            const rows = approvedLiqs.map(l => {
                const mockSku = `SKU-${Math.floor(Math.random() * 1000)}`;
                return `${mockSku}|${l.promotion}|${l.amount.toFixed(2)}|ZBON|${l.id}`;
            }).join("\n");

            const content = header + rows;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `SAP_Liquidacion_${new Date().toISOString().slice(0, 10)}.txt`;
            a.click();

            showNotification(`Archivo SAP exportado exitosamente (${approvedLiqs.length} registros)`, 'success');
        }, 1000);
    };

    const handleCreateLiquidation = () => {
        if (!newLiqData.client) {
            showNotification('Por favor seleccione un cliente', 'warning');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            const newId = `LIQ-${newLiqData.year}-${Math.floor(Math.random() * 1000)}`;

            // DUPLICATE CHECK SIMULATION
            if (HISTORIC_INVOICES.includes(newId)) { // In real life, check payload ID
                showNotification('Error: Se detectaron facturas duplicadas en este lote', 'error');
                setIsLoading(false);
                return;
            }

            const newEntry = {
                id: newId,
                period: `${newLiqData.month.substring(0, 3)} ${newLiqData.year}`,
                client: newLiqData.client,
                promotion: "Promoción General",
                reportedUnits: 1000,
                physicalUnits: 1000,
                billedPrice: 15.00,
                negotiatedPrice: 12.00,
                amount: calculationMode === 'price_difference' ? (3.00 * 1000) : 10000.00,
                status: "pending",
                date: new Date().toISOString().split('T')[0],
                mode: calculationMode
            };

            setLiquidations([newEntry, ...liquidations]);
            setIsLoading(false);
            setIsModalOpen(false);
            setNewLiqData({ client: "", month: "Noviembre", year: "2024" });
            showNotification(`Liquidación ${newId} creada exitosamente`, 'success');
        }, 1000);
    };

    const handleViewDetail = (liq) => {
        setSelectedLiquidation(liq);
        setIsDetailModalOpen(true);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved': return <Badge variant="success">Aprobado</Badge>;
            case 'pending': return <Badge variant="warning">Pendiente</Badge>;
            case 'rejected': return <Badge variant="danger">Rechazado</Badge>;
            case 'error': return <Badge variant="danger">Error Duplicado</Badge>;
            default: return <Badge>Desconocido</Badge>;
        }
    };

    const filteredLiquidations = liquidations.filter(liq =>
        (statusFilter === "all" || liq.status === statusFilter) &&
        (liq.client.toLowerCase().includes(searchTerm.toLowerCase()) || liq.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
                    {toastType === 'error' && <XCircle className="w-5 h-5" />}
                    {toastType === 'warning' && <AlertTriangle className="w-5 h-5" />}
                    {toastType === 'info' && <Clock className="w-5 h-5" />}
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Liquidación de Promociones</h1>
                <div className="flex gap-2">
                    <Button
                        variant={calculationMode === 'standard' ? 'primary' : 'outline'}
                        onClick={toggleCalculationMode}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw size={16} />
                        {calculationMode === 'standard' ? 'Modo: Estándar' : 'Modo: Dif. Precio (GPF)'}
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2" onClick={handleExportSAP}>
                        <Download size={18} />
                        Exportar SAP (Gaby)
                    </Button>
                </div>
            </div>

            {/* Application Summary Cards - Logic Updated dynamically */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6 flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pendientes de Aprobación</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                ${liquidations.filter(l => l.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                            </h3>
                            <p className="text-xs text-blue-600 font-medium">{liquidations.filter(l => l.status === 'pending').length} registros</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center space-x-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-full">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Liquidado (Mes)</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                ${liquidations.filter(l => l.status === 'approved').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                            </h3>
                            <p className="text-xs text-green-600 font-medium">+12% vs mes anterior</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center space-x-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-full">
                            <XCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Rechazados</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                ${liquidations.filter(l => l.status === 'rejected').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                            </h3>
                            <p className="text-xs text-red-600 font-medium">{liquidations.filter(l => l.status === 'rejected').length} registros</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por cliente o ID..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-gray-500" />
                        <span className="text-sm text-gray-600">Estado:</span>
                        <select
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Todos</option>
                            <option value="pending">Pendientes</option>
                            <option value="approved">Aprobados</option>
                            <option value="rejected">Rechazados</option>
                        </select>
                    </div>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Calculator size={18} className="mr-2" />
                        Nueva Liquidación
                    </Button>
                </div>
            </div>

            {/* Liquidations Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between">
                        <span>Detalle de Liquidaciones</span>
                        {calculationMode === 'price_difference' &&
                            <Badge variant="warning">Modo: Diferencia de Precio (GPF)</Badge>
                        }
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 font-medium">ID / Periodo</th>
                                    <th className="px-6 py-3 font-medium">Cliente</th>
                                    <th className="px-6 py-3 font-medium text-center">Unidades<br />(Rep vs Fis)</th>
                                    {calculationMode === 'price_difference' && (
                                        <th className="px-6 py-3 font-medium text-center">Precios<br />(Fac vs Neg)</th>
                                    )}
                                    <th className="px-6 py-3 font-medium text-right">Monto a Pagar</th>
                                    <th className="px-6 py-3 font-medium text-center">Estado</th>
                                    <th className="px-6 py-3 font-medium text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredLiquidations.map((liq) => (
                                    <tr key={liq.id} className={`hover:bg-gray-50 transition-colors ${liq.physicalUnits < liq.reportedUnits ? 'bg-orange-50' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-primary-700">{liq.id}</div>
                                            <div className="text-xs text-gray-500">{liq.period}</div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {liq.client}
                                            <div className="text-xs text-gray-500 font-normal">{liq.promotion}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-xs text-gray-500">Rep: {liq.reportedUnits}</span>
                                                <input
                                                    type="number"
                                                    className="w-20 text-center border rounded px-1 py-0.5 text-sm font-bold bg-white focus:ring-2 focus:ring-primary-300 outline-none"
                                                    value={liq.physicalUnits}
                                                    onChange={(e) => handlePhysicalCountChange(liq.id, e.target.value)}
                                                />
                                                {liq.physicalUnits < liq.reportedUnits &&
                                                    <span className="text-[10px] text-orange-600 font-bold">Diferencia: {liq.reportedUnits - liq.physicalUnits}</span>
                                                }
                                            </div>
                                        </td>
                                        {calculationMode === 'price_difference' && (
                                            <td className="px-6 py-4 text-center text-xs">
                                                <div className="grid grid-cols-2 gap-x-2 text-right">
                                                    <span className="text-gray-500">Fact:</span> <span className="font-medium">${liq.billedPrice}</span>
                                                    <span className="text-green-600">Neg:</span> <span className="font-medium">${liq.negotiatedPrice}</span>
                                                    <span className="text-blue-600 font-bold border-t col-span-2 text-center mt-1">Dif: ${(liq.billedPrice - liq.negotiatedPrice).toFixed(2)}</span>
                                                </div>
                                            </td>
                                        )}
                                        <td className="px-6 py-4 text-right font-bold text-gray-800 text-lg">
                                            ${liq.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-6 py-4 text-center">{getStatusBadge(liq.status)}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                className="text-gray-400 hover:text-primary-600 transition-colors"
                                                title="Ver Detalle"
                                                onClick={() => handleViewDetail(liq)}
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Generar Nueva Liquidación"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleCreateLiquidation} disabled={isLoading}>
                            {isLoading ? 'Verificando Duplicados...' : 'Calcular y Generar'}
                        </Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded border border-yellow-200">
                        <AlertTriangle className="inline w-4 h-4 mr-1 text-yellow-600" />
                        <strong>Importante:</strong> El sistema validará automáticamente si existen facturas duplicadas en el histórico antes de procesar.
                    </p>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                        <select
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={newLiqData.client}
                            onChange={(e) => setNewLiqData({ ...newLiqData, client: e.target.value })}
                        >
                            <option value="">Seleccione un cliente...</option>
                            <option value="Farmacias Cruz Azul">Farmacias Cruz Azul</option>
                            <option value="Fybeca">Fybeca/GPF (Habilitar Modo Dif. Precio)</option>
                            <option value="Farmacias Económicas">Farmacias Económicas</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mes</label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={newLiqData.month}
                                onChange={(e) => setNewLiqData({ ...newLiqData, month: e.target.value })}
                            >
                                <option value="Noviembre">Noviembre</option>
                                <option value="Diciembre">Diciembre</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
                            <select
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={newLiqData.year}
                                onChange={(e) => setNewLiqData({ ...newLiqData, year: e.target.value })}
                            >
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Detail Modal */}
            <Modal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                title="Detalle de Liquidación"
                size="lg"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setIsDetailModalOpen(false)}>Cerrar</Button>
                    </>
                }
            >
                {selectedLiquidation && (
                    <div className="space-y-6">
                        {/* Header Info */}
                        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">ID Liquidación</label>
                                    <p className="text-lg font-bold text-pink-700 font-mono">{selectedLiquidation.id}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Estado</label>
                                    <div className="mt-1">{getStatusBadge(selectedLiquidation.status)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Client and Promotion Info */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <Calculator className="w-4 h-4" />
                                Información General
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Cliente</label>
                                    <p className="text-sm font-medium text-gray-900">{selectedLiquidation.client}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Período</label>
                                    <p className="text-sm text-gray-900">{selectedLiquidation.period}</p>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Promoción</label>
                                    <p className="text-sm text-gray-900">{selectedLiquidation.promotion}</p>
                                </div>
                            </div>
                        </div>

                        {/* Units and Prices */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3">Unidades y Precios</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Unidades Reportadas</label>
                                    <p className="text-lg font-semibold text-gray-900">{selectedLiquidation.reportedUnits.toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Unidades Físicas</label>
                                    <p className="text-lg font-bold text-blue-600">{selectedLiquidation.physicalUnits.toLocaleString()}</p>
                                    {selectedLiquidation.physicalUnits < selectedLiquidation.reportedUnits && (
                                        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded mt-1 inline-block">
                                            ⚠ Diferencia: {selectedLiquidation.reportedUnits - selectedLiquidation.physicalUnits}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Precio Facturado</label>
                                    <p className="text-sm text-gray-900">${selectedLiquidation.billedPrice.toFixed(2)}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Precio Negociado</label>
                                    <p className="text-sm text-green-600 font-medium">${selectedLiquidation.negotiatedPrice.toFixed(2)}</p>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-gray-600 mb-1">Modo de Cálculo</label>
                                    <p className="text-sm text-gray-900 font-medium">
                                        {selectedLiquidation.mode === 'standard' ? '📊 Estándar' : '💰 Diferencia de Precio (GPF)'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Total Amount - Highlighted */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Monto Total a Pagar</label>
                            <p className="text-4xl font-bold text-green-600">
                                ${selectedLiquidation.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>

                        {/* Footer Info */}
                        <div className="bg-gray-100 p-3 rounded text-xs text-gray-600 flex items-center justify-between">
                            <span><strong>Fecha de creación:</strong> {selectedLiquidation.date}</span>
                            <span className="text-gray-500">ID: {selectedLiquidation.id}</span>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Liquidation;
