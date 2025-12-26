import React, { useState } from 'react';
import {
    FileCheck,
    AlertCircle,
    CheckCircle2,
    RefreshCw,
    Search,
    Filter,
    FileText,
    Download
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const NCControl = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success'); // success, error, info

    // Mock data state
    const [creditNotes, setCreditNotes] = useState([
        { id: "NC-2024-8801", liquidationRef: "LIQ-2024-002", client: "Fybeca", amount: 8450.50, date: "2024-11-29", status: "issued", erpId: "SAP-990123" },
        { id: "NC-2024-8802", liquidationRef: "LIQ-2024-005", client: "Hospital Metropolitano", amount: 5000.00, date: "2024-11-31", status: "issued", erpId: "SAP-990124" },
        { id: "PENDING-001", liquidationRef: "LIQ-2024-001", client: "Farmacias Cruz Azul", amount: 12500.00, date: "2024-12-01", status: "pending_validation", erpId: "-" },
        { id: "ERR-2024-001", liquidationRef: "LIQ-2024-003", client: "Farmacias Económicas", amount: 3200.00, date: "2024-10-16", status: "error", erpId: "ERR_TIMEOUT" },
        { id: "NC-2024-8803", liquidationRef: "LIQ-2024-006", client: "Distribuidora Farmacéutica", amount: 1500.25, date: "2024-12-02", status: "issued", erpId: "SAP-990125" },
    ]);

    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleDownloadReport = () => {
        showNotification('Generando reporte de control en PDF...', 'info');
        setTimeout(() => {
            showNotification('Reporte descargado exitosamente', 'success');
        }, 1500);
    };

    const handleRetry = (id) => {
        // Find the note
        const noteToRetry = creditNotes.find(nc => nc.id === id);
        if (!noteToRetry) return;

        // Simulate processing
        setCreditNotes(currentNotes =>
            currentNotes.map(nc =>
                nc.id === id ? { ...nc, status: 'processing' } : nc
            )
        );

        showNotification('Reintentando sincronización con SAP...', 'info');

        setTimeout(() => {
            const newErpId = `SAP-${Math.floor(Math.random() * 100000)}`;
            const newId = `NC-2024-${Math.floor(Math.random() * 9000)}`;
            setCreditNotes(currentNotes =>
                currentNotes.map(nc =>
                    nc.id === id
                        ? { ...nc, status: 'issued', erpId: newErpId, id: newId }
                        : nc
                )
            );
            showNotification('¡Nota de crédito sincronizada exitosamente con SAP!', 'success');
        }, 1500);
    };

    const handleApprove = (id) => {
        const note = creditNotes.find(nc => nc.id === id);
        if (!note) return;

        // Simulate processing
        setCreditNotes(currentNotes =>
            currentNotes.map(nc =>
                nc.id === id ? { ...nc, status: 'processing' } : nc
            )
        );

        showNotification('Procesando aprobación...', 'info');

        setTimeout(() => {
            const newErpId = `SAP-${Math.floor(Math.random() * 100000)}`;
            const newId = `NC-2024-${Math.floor(Math.random() * 9000)}`;
            setCreditNotes(currentNotes =>
                currentNotes.map(nc =>
                    nc.id === id
                        ? { ...nc, status: 'issued', erpId: newErpId, id: newId }
                        : nc
                )
            );
            showNotification('¡Aprobación exitosa! Nota enviada al ERP.', 'success');
        }, 1500);
    };

    const handleDownloadPDF = (nc) => {
        showNotification(`Descargando PDF de ${nc.id}...`, 'info');
        setTimeout(() => {
            showNotification(`PDF de ${nc.id} descargado exitosamente`, 'success');
        }, 1000);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'issued': return <Badge variant="success">Emitida (ERP)</Badge>;
            case 'pending_validation': return <Badge variant="warning">Pendiente Validación</Badge>;
            case 'error': return <Badge variant="danger">Error Integración</Badge>;
            case 'processing': return <Badge variant="primary">Procesando...</Badge>;
            default: return <Badge>Desconocido</Badge>;
        }
    };

    const filteredNC = creditNotes.filter(nc =>
        (statusFilter === "all" || nc.status === statusFilter) &&
        (nc.client.toLowerCase().includes(searchTerm.toLowerCase()) || nc.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-6 space-y-6">
            {/* Toast Notification */}
            {showToast && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in ${toastType === 'success' ? 'bg-green-500 text-white' :
                    toastType === 'error' ? 'bg-red-500 text-white' :
                        'bg-blue-500 text-white'
                    }`}>
                    {toastType === 'success' && <CheckCircle2 className="w-5 h-5" />}
                    {toastType === 'error' && <AlertCircle className="w-5 h-5" />}
                    {toastType === 'info' && <FileCheck className="w-5 h-5" />}
                    <span>{toastMessage}</span>
                </div>
            )}

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Control de Notas de Crédito</h1>
                <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handleDownloadReport}
                >
                    <Download size={18} />
                    Reporte de Control
                </Button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6 flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                            <FileCheck size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total NC Emitidas (Mes)</p>
                            <h3 className="text-2xl font-bold text-gray-800">$14,950.75</h3>
                            <p className="text-xs text-purple-600 font-medium">3 registros exitosos</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center space-x-4">
                        <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pendientes Validación</p>
                            <h3 className="text-2xl font-bold text-gray-800">$12,500.00</h3>
                            <p className="text-xs text-yellow-600 font-medium">Requiere firma gerencial</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center space-x-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-full">
                            <RefreshCw size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Errores de Integración</p>
                            <h3 className="text-2xl font-bold text-gray-800">$3,200.00</h3>
                            <p className="text-xs text-red-600 font-medium">1 error (Timeout)</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por cliente, NC# o Ref..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Filter size={18} className="text-gray-500" />
                    <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Todos los Estados</option>
                        <option value="issued">Emitidas</option>
                        <option value="pending_validation">Pendientes</option>
                        <option value="error">Errores</option>
                    </select>
                </div>
            </div>

            {/* List */}
            <Card>
                <CardHeader>
                    <CardTitle>Bitácora de Emisión</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 font-medium">No. Nota Crédito</th>
                                    <th className="px-6 py-3 font-medium">Liquidación Origen</th>
                                    <th className="px-6 py-3 font-medium">Cliente</th>
                                    <th className="px-6 py-3 font-medium text-right">Monto</th>
                                    <th className="px-6 py-3 font-medium">ID ERP</th>
                                    <th className="px-6 py-3 font-medium text-center">Estado</th>
                                    <th className="px-6 py-3 font-medium text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredNC.map((nc) => (
                                    <tr key={nc.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800">{nc.id}</td>
                                        <td className="px-6 py-4 text-primary-600 hover:underline cursor-pointer">{nc.liquidationRef}</td>
                                        <td className="px-6 py-4 text-gray-600">{nc.client}</td>
                                        <td className="px-6 py-4 text-right font-bold text-gray-800">${nc.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{nc.erpId}</td>
                                        <td className="px-6 py-4 text-center">{getStatusBadge(nc.status)}</td>
                                        <td className="px-6 py-4 text-right">
                                            {nc.status === 'error' && (
                                                <button
                                                    onClick={() => handleRetry(nc.id)}
                                                    className="text-red-500 hover:text-red-700 font-medium text-xs flex items-center justify-end gap-1 ml-auto"
                                                >
                                                    <RefreshCw size={14} /> Reintentar
                                                </button>
                                            )}
                                            {nc.status === 'pending_validation' && (
                                                <button
                                                    onClick={() => handleApprove(nc.id)}
                                                    className="text-green-600 hover:text-green-800 font-medium text-xs flex items-center justify-end gap-1 ml-auto"
                                                    title="Aprobar y Emitir"
                                                >
                                                    <CheckCircle2 size={16} /> Aprobar
                                                </button>
                                            )}
                                            {nc.status === 'issued' && (
                                                <button
                                                    onClick={() => handleDownloadPDF(nc)}
                                                    className="text-gray-400 hover:text-primary-600 transition-colors ml-auto block"
                                                    title="Ver Documento"
                                                >
                                                    <FileText size={18} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default NCControl;
