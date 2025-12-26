import React, { useState } from 'react';
import {
    Ticket,
    Upload,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Download,
    Search,
    FileText,
    TrendingUp,
    Eye,
    CheckCircle2,
    X as XIcon,
    Edit2
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import FileUpload from '../components/FileUpload';
import Modal from '../components/Modal';

const Coupons = () => {
    const [activePlan, setActivePlan] = useState('trifamox');
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [validationData, setValidationData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Plans configuration
    const plans = [
        { id: 'trifamox', name: 'Trifamox', subcodigos: ['TRF-001', 'TRF-002', 'TRF-003'] },
        { id: 'novo_morav', name: 'Novo Morav', subcodigos: ['NVM-001', 'NVM-002'] },
        { id: 'letti', name: 'Letti', subcodigos: ['LET-001', 'LET-002', 'LET-003', 'LET-004'] },
        { id: 'corpus', name: 'Corpus', subcodigos: ['COR-001', 'COR-002'] }
    ];

    // Mock validation data
    const mockValidationData = {
        'TRF-001': [
            { factura: 'FAC-001-2024', fecha: '2024-12-15', producto: 'Amoxicilina 500mg', cantidad: 10, valor: 25.50, estado: 'valido', observacion: 'Factura válida' },
            { factura: 'FAC-002-2024', fecha: '2024-12-16', producto: 'Amoxicilina 500mg', cantidad: 5, valor: 12.75, estado: 'valido', observacion: 'Factura válida' },
            { factura: 'FAC-003-2024', fecha: '2024-12-10', producto: 'Amoxicilina 500mg', cantidad: 8, valor: 20.40, estado: 'invalido', observacion: 'Fecha fuera de rango promocional' },
            { factura: 'FAC-004-2024', fecha: '2024-12-17', producto: 'Amoxicilina 500mg', cantidad: 12, valor: 30.60, estado: 'advertencia', observacion: 'Valor unitario difiere del esperado' }
        ],
        'TRF-002': [
            { factura: 'FAC-005-2024', fecha: '2024-12-14', producto: 'Cefalexina 500mg', cantidad: 6, valor: 18.00, estado: 'valido', observacion: 'Factura válida' },
            { factura: 'FAC-006-2024', fecha: '2024-12-18', producto: 'Cefalexina 500mg', cantidad: 4, valor: 12.00, estado: 'valido', observacion: 'Factura válida' }
        ],
        'TRF-003': [
            { factura: 'FAC-007-2024', fecha: '2024-12-12', producto: 'Azitromicina 500mg', cantidad: 3, valor: 15.00, estado: 'invalido', observacion: 'Producto no corresponde al subcódigo' }
        ]
    };

    const currentPlan = plans.find(p => p.id === activePlan);

    const handleFileUpload = (subcodigo, files) => {
        if (files && files.length > 0) {
            setUploadedFiles(prev => ({
                ...prev,
                [subcodigo]: files[0]
            }));
            // Simulate validation
            setTimeout(() => {
                setValidationData(prev => ({
                    ...prev,
                    [subcodigo]: mockValidationData[subcodigo] || []
                }));
            }, 1000);
        }
    };

    const handleViewDetail = (invoice) => {
        setSelectedInvoice(invoice);
        setShowDetailModal(true);
    };

    const handleValidate = () => {
        showNotification('Validando todas las facturas del plan...', 'info');
        setTimeout(() => {
            showNotification(`Validación completada: ${stats.validos} facturas válidas`, 'success');
        }, 1500);
    };

    const handleConsolidate = () => {
        if (stats.validos === 0) {
            showNotification('No hay facturas válidas para consolidar', 'warning');
            return;
        }
        showNotification('Consolidando subcódigos y generando liquidación...', 'info');
        setTimeout(() => {
            showNotification(`Liquidación generada: $${stats.totalValor.toFixed(2)} para ${stats.validos} facturas`, 'success');
        }, 1500);
    };

    const handleExport = () => {
        showNotification('Exportando resultados a Excel...', 'info');
        setTimeout(() => {
            showNotification('Archivo Excel descargado exitosamente', 'success');
        }, 1000);
    };

    const handleCorrect = () => {
        if (selectedInvoice) {
            // Update the invoice status to valid
            const updatedData = { ...validationData };
            Object.keys(updatedData).forEach(subcodigo => {
                updatedData[subcodigo] = updatedData[subcodigo].map(inv =>
                    inv.factura === selectedInvoice.factura
                        ? { ...inv, estado: 'valido', observacion: 'Corregido manualmente' }
                        : inv
                );
            });
            setValidationData(updatedData);
            setShowDetailModal(false);
            showNotification(`Factura ${selectedInvoice.factura} marcada como corregida`, 'success');
        }
    };

    // Calculate stats for current plan
    const allInvoices = currentPlan.subcodigos.flatMap(sub => validationData[sub] || []);
    const stats = {
        total: allInvoices.length,
        validos: allInvoices.filter(inv => inv.estado === 'valido').length,
        invalidos: allInvoices.filter(inv => inv.estado === 'invalido').length,
        advertencias: allInvoices.filter(inv => inv.estado === 'advertencia').length,
        totalValor: allInvoices.filter(inv => inv.estado === 'valido').reduce((sum, inv) => sum + inv.valor, 0)
    };

    const progress = stats.total > 0 ? ((stats.validos / stats.total) * 100).toFixed(1) : 0;

    const filteredInvoices = allInvoices.filter(inv => {
        const matchesSearch = inv.factura.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.producto.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || inv.estado === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const getStatusBadge = (estado) => {
        switch (estado) {
            case 'valido':
                return (
                    <Badge className="bg-green-100 text-green-800 flex items-center w-fit space-x-1">
                        <CheckCircle size={14} />
                        <span>✓ Válido</span>
                    </Badge>
                );
            case 'invalido':
                return (
                    <Badge className="bg-red-100 text-red-800 flex items-center w-fit space-x-1">
                        <XCircle size={14} />
                        <span>✗ Inválido</span>
                    </Badge>
                );
            case 'advertencia':
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 flex items-center w-fit space-x-1">
                        <AlertTriangle size={14} />
                        <span>⚠ Advertencia</span>
                    </Badge>
                );
            default:
                return null;
        }
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
                    {toastType === 'warning' && <AlertTriangle className="w-5 h-5" />}
                    {toastType === 'info' && <FileText className="w-5 h-5" />}
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Cupones</h1>
                <p className="text-gray-600 mt-1">Validación de facturas por plan promocional</p>
            </div>

            {/* Plan Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        {plans.map(plan => (
                            <button
                                key={plan.id}
                                onClick={() => setActivePlan(plan.id)}
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activePlan === plan.id
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {plan.name}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Facturas</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FileText className="text-blue-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Válidas</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.validos}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="text-green-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Inválidas</p>
                                        <p className="text-2xl font-bold text-red-600">{stats.invalidos}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                        <XCircle className="text-red-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Advertencias</p>
                                        <p className="text-2xl font-bold text-yellow-600">{stats.advertencias}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <AlertTriangle className="text-yellow-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Progress Bar */}
                    {stats.total > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Progreso de Validación</span>
                                <span className="text-sm font-bold text-primary-600">{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-primary-500 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="mt-2 text-xs text-gray-600">
                                {stats.validos} de {stats.total} facturas validadas correctamente
                            </div>
                        </div>
                    )}

                    {/* Subcódigos Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {currentPlan.subcodigos.map(subcodigo => {
                            const hasFile = uploadedFiles[subcodigo];
                            const invoices = validationData[subcodigo] || [];
                            const validCount = invoices.filter(inv => inv.estado === 'valido').length;

                            return (
                                <Card key={subcodigo} className="hover:shadow-md transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-bold text-gray-900">{subcodigo}</h3>
                                                {hasFile && (
                                                    <Badge className="bg-green-100 text-green-800">
                                                        <CheckCircle size={12} className="mr-1" />
                                                        Cargado
                                                    </Badge>
                                                )}
                                            </div>

                                            {!hasFile ? (
                                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                                    <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                                                    <p className="text-xs text-gray-500 mb-2">Cargar archivo</p>
                                                    <input
                                                        type="file"
                                                        accept=".xlsx,.xls,.csv"
                                                        onChange={(e) => handleFileUpload(subcodigo, e.target.files)}
                                                        className="hidden"
                                                        id={`file-${subcodigo}`}
                                                    />
                                                    <label
                                                        htmlFor={`file-${subcodigo}`}
                                                        className="text-xs text-primary-600 hover:text-primary-800 cursor-pointer font-medium"
                                                    >
                                                        Seleccionar archivo
                                                    </label>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">Facturas:</span>
                                                        <span className="font-semibold text-gray-900">{invoices.length}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600">Válidas:</span>
                                                        <span className="font-semibold text-green-600">{validCount}</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-green-500 h-2 rounded-full"
                                                            style={{ width: `${invoices.length > 0 ? (validCount / invoices.length) * 100 : 0}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {/* Validation Rules */}
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="text-sm">Reglas de Validación</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                                    <div>
                                        <p className="font-medium text-gray-900">Número de Factura</p>
                                        <p className="text-gray-600 text-xs">Formato válido y único</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                                    <div>
                                        <p className="font-medium text-gray-900">Fecha de Emisión</p>
                                        <p className="text-gray-600 text-xs">Dentro del período promocional</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                                    <div>
                                        <p className="font-medium text-gray-900">Valor Unitario</p>
                                        <p className="text-gray-600 text-xs">Coincide con precio de lista</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Filters and Actions */}
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por factura o producto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="valido">Válidos</option>
                            <option value="invalido">Inválidos</option>
                            <option value="advertencia">Advertencias</option>
                        </select>
                        <div className="flex space-x-2">
                            <Button variant="outline" onClick={handleExport}>
                                <Download size={16} className="mr-2" />
                                Exportar
                            </Button>
                            <Button variant="outline" onClick={handleValidate}>
                                Validar Todo
                            </Button>
                            <Button onClick={handleConsolidate}>
                                Consolidar y Liquidar
                            </Button>
                        </div>
                    </div>

                    {/* Invoices Table */}
                    {stats.total > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Facturas del Plan {currentPlan.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Factura</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredInvoices.map((invoice, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {invoice.factura}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {invoice.fecha}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        {invoice.producto}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {invoice.cantidad}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                        ${invoice.valor.toFixed(2)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {getStatusBadge(invoice.estado)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <button
                                                            onClick={() => handleViewDetail(invoice)}
                                                            className="text-primary-600 hover:text-primary-900"
                                                            title="Ver detalle"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-50">
                                            <tr>
                                                <td colSpan="4" className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                                                    Total Válidas:
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary-600">
                                                    ${stats.totalValor.toFixed(2)}
                                                </td>
                                                <td colSpan="2"></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {stats.total === 0 && (
                        <div className="text-center py-12">
                            <Ticket className="mx-auto text-gray-400 mb-4" size={48} />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay facturas cargadas</h3>
                            <p className="text-gray-600">Carga archivos por subcódigo para comenzar la validación</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            <Modal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                title="Detalle de Factura"
                size="lg"
            >
                {selectedInvoice && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Número de Factura</p>
                                <p className="font-semibold text-gray-900">{selectedInvoice.factura}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Fecha de Emisión</p>
                                <p className="font-semibold text-gray-900">{selectedInvoice.fecha}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Producto</p>
                                <p className="font-semibold text-gray-900">{selectedInvoice.producto}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Cantidad</p>
                                <p className="font-semibold text-gray-900">{selectedInvoice.cantidad}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Valor Total</p>
                                <p className="font-semibold text-primary-600">${selectedInvoice.valor.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Estado</p>
                                {getStatusBadge(selectedInvoice.estado)}
                            </div>
                        </div>
                        <div className="border-t pt-4">
                            <p className="text-sm text-gray-600 mb-2">Observación</p>
                            <p className="text-gray-900">{selectedInvoice.observacion}</p>
                        </div>
                        <div className="flex justify-end space-x-2 pt-4 border-t">
                            <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                                Cerrar
                            </Button>
                            {selectedInvoice.estado === 'invalido' && (
                                <Button onClick={handleCorrect}>
                                    <Edit2 size={16} className="mr-2" />
                                    Corregir
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Coupons;
