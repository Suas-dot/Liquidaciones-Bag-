import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Eye,
    Edit2,
    Trash2,
    Calendar,
    FileText,
    Save,
    ArrowLeft,
    TrendingUp,
    CheckCircle2,
    Clock,
    DollarSign,
    X,
    AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Modal from '../components/Modal';

const Promotions = () => {
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedPromotion, setSelectedPromotion] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    // Mock Data with more entries
    const [promotions, setPromotions] = useState([
        { id: 'PROM-2025-001', name: 'Descuento Temporada Escolar', type: 'Semana de Descuento', start: '2025-08-01', end: '2025-08-15', status: 'Vigente', liquidado: 8500, clientes: 12, productos: 25 },
        { id: 'PROM-2025-002', name: 'Plan Crónicos - Presión', type: 'PMC', start: '2025-01-01', end: '2025-12-31', status: 'Vigente', liquidado: 12500, clientes: 8, productos: 15 },
        { id: 'PROM-2025-003', name: 'Lanzamiento Neurobion', type: 'Rebates', start: '2025-06-01', end: '2025-06-30', status: 'Finalizada', liquidado: 5400, clientes: 20, productos: 5 },
        { id: 'PROM-2024-045', name: 'Black Friday Farmacias', type: 'Cupones', start: '2024-11-24', end: '2024-11-27', status: 'Finalizada', liquidado: 18200, clientes: 35, productos: 50 },
        { id: 'PROM-2024-038', name: 'Vitaminas Invierno', type: 'Semana de Descuento', start: '2024-07-01', end: '2024-07-15', status: 'Finalizada', liquidado: 9800, clientes: 15, productos: 12 },
    ]);

    const [formData, setFormData] = useState({
        name: '',
        type: 'PMC',
        startDate: '',
        endDate: '',
        mechanic: '1+1',
        discount: 0,
        customers: [],
        products: []
    });

    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleSave = () => {
        if (!formData.name || !formData.startDate || !formData.endDate) {
            showNotification('Por favor complete todos los campos requeridos', 'error');
            return;
        }

        const newPromo = {
            id: `PROM-2025-00${promotions.length + 1}`,
            name: formData.name,
            type: formData.type,
            start: formData.startDate,
            end: formData.endDate,
            status: 'Vigente',
            liquidado: 0,
            clientes: formData.customers.length,
            productos: formData.products.length
        };
        setPromotions([newPromo, ...promotions]);
        setIsCreating(false);
        showNotification('Promoción guardada y enviada a Auditoría para revisión', 'success');
    };

    const handleView = (promo) => {
        setSelectedPromotion(promo);
        setShowDetailModal(true);
    };

    const handleEdit = (promo) => {
        setSelectedPromotion(promo);
        setFormData({
            name: promo.name,
            type: promo.type,
            startDate: promo.start,
            endDate: promo.end,
            mechanic: '1+1',
            discount: 0,
            customers: [],
            products: []
        });
        setIsCreating(true);
        showNotification('Editando promoción ' + promo.id, 'info');
    };

    const handleDelete = (id) => {
        const promo = promotions.find(p => p.id === id);
        if (window.confirm(`¿Está seguro de eliminar la promoción "${promo.name}"?`)) {
            setPromotions(promotions.filter(p => p.id !== id));
            showNotification('Promoción eliminada exitosamente', 'success');
        }
    };

    const filteredPromotions = promotions.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Calculate statistics
    const stats = {
        total: promotions.length,
        vigentes: promotions.filter(p => p.status === 'Vigente').length,
        finalizadas: promotions.filter(p => p.status === 'Finalizada').length,
        totalLiquidado: promotions.reduce((sum, p) => sum + p.liquidado, 0)
    };

    const PromotionForm = () => (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center space-x-4 mb-6">
                <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver
                </Button>
                <h2 className="text-2xl font-bold text-gray-900">Nueva Promoción</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles Generales</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Promoción</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        placeholder="Ej. Semana del Corazón"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Promoción</label>
                                        <select
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option>PMC (Plan Medicación Continua)</option>
                                            <option>Cupones</option>
                                            <option>Semana de Descuento</option>
                                            <option>Rebates</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mecánica</label>
                                        <select
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                            value={formData.mechanic}
                                            onChange={(e) => setFormData({ ...formData, mechanic: e.target.value })}
                                        >
                                            <option>1+1 (Bonificación)</option>
                                            <option>Descuento sobre PVP</option>
                                            <option>Acumulativo (3+1)</option>
                                            <option>Rebate por Volumen</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                                        <input
                                            type="date"
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                                        <input
                                            type="date"
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Alcance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Clientes Participantes</label>
                                    <select
                                        multiple
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 h-32"
                                        value={formData.customers}
                                        onChange={(e) => {
                                            const selected = Array.from(e.target.selectedOptions, option => option.value);
                                            setFormData({ ...formData, customers: selected });
                                        }}
                                    >
                                        <option value="GPF">GPF</option>
                                        <option value="Difar">Difar</option>
                                        <option value="FarmaEnlace">FarmaEnlace</option>
                                        <option value="Cruz Azul">Cruz Azul</option>
                                        <option value="Fybeca">Fybeca</option>
                                        <option value="Farmacias Económicas">Farmacias Económicas</option>
                                        <option value="Sana Sana">Sana Sana</option>
                                    </select>
                                    {formData.customers.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {formData.customers.map(client => (
                                                <span key={client} className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                                                    {client}
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, customers: formData.customers.filter(c => c !== client) })}
                                                        className="ml-1 hover:text-blue-900"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Productos Incluidos</label>
                                    <select
                                        multiple
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 h-32"
                                        value={formData.products}
                                        onChange={(e) => {
                                            const selected = Array.from(e.target.selectedOptions, option => option.value);
                                            setFormData({ ...formData, products: selected });
                                        }}
                                    >
                                        <option value="PROD001 - Amoxicilina 500mg">PROD001 - Amoxicilina 500mg</option>
                                        <option value="PROD002 - Ibuprofeno 400mg">PROD002 - Ibuprofeno 400mg</option>
                                        <option value="PROD003 - Paracetamol 500mg">PROD003 - Paracetamol 500mg</option>
                                        <option value="PROD004 - Vitamina C 1000mg">PROD004 - Vitamina C 1000mg</option>
                                        <option value="PROD005 - Complejo B">PROD005 - Complejo B</option>
                                        <option value="PROD006 - Omeprazol 20mg">PROD006 - Omeprazol 20mg</option>
                                        <option value="PROD007 - Losartán 50mg">PROD007 - Losartán 50mg</option>
                                        <option value="PROD008 - Metformina 850mg">PROD008 - Metformina 850mg</option>
                                    </select>
                                    {formData.products.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {formData.products.map(product => (
                                                <span key={product} className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                                    {product}
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, products: formData.products.filter(p => p !== product) })}
                                                        className="ml-1 hover:text-green-900"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Condiciones Económicas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Porcentaje / Valor</label>
                                    <div className="relative rounded-md shadow-sm">
                                        <input
                                            type="number"
                                            className="w-full rounded-lg border-gray-300 pl-4 pr-12 focus:border-primary-500 focus:ring-primary-500"
                                            placeholder="0.00"
                                            value={formData.discount}
                                            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Asunción del Descuento</h4>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Bagó</span>
                                        <span className="text-sm font-bold text-gray-900">70%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                        <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">Cliente</span>
                                        <span className="text-sm font-bold text-gray-900">30%</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button
                        className="w-full py-4 text-lg shadow-lg shadow-primary-500/20"
                        onClick={handleSave}
                    >
                        <Save className="w-5 h-5 mr-2" />
                        Guardar y Notificar
                    </Button>
                </div>
            </div>
        </div>
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
                    {toastType === 'error' && <X className="w-5 h-5" />}
                    {toastType === 'warning' && <AlertCircle className="w-5 h-5" />}
                    {toastType === 'info' && <FileText className="w-5 h-5" />}
                    <span>{toastMessage}</span>
                </div>
            )}

            {!isCreating ? (
                <>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Bitácora de Promociones</h1>
                            <p className="text-gray-500 mt-1">Gestiona y consulta el histórico de promociones comerciales</p>
                        </div>
                        <Button onClick={() => setIsCreating(true)}>
                            <Plus className="w-5 h-5 mr-2" />
                            Nueva Promoción
                        </Button>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Promociones</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="text-purple-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Vigentes</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.vigentes}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CheckCircle2 className="text-green-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Finalizadas</p>
                                        <p className="text-2xl font-bold text-gray-600">{stats.finalizadas}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Clock className="text-gray-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Liquidado</p>
                                        <p className="text-2xl font-bold text-blue-600">${stats.totalLiquidado.toLocaleString()}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <DollarSign className="text-blue-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters and Table */}
                    <Card>
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-4">
                            <div className="relative flex-1 min-w-[200px]">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Buscar promoción..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-200 focus:border-primary-500 focus:ring-primary-500 text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            >
                                <option value="all">Todos los estados</option>
                                <option value="Vigente">Vigente</option>
                                <option value="Finalizada">Finalizada</option>
                            </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">ID / Nombre</th>
                                        <th className="px-6 py-4 font-medium">Tipo</th>
                                        <th className="px-6 py-4 font-medium">Vigencia</th>
                                        <th className="px-6 py-4 font-medium text-center">Alcance</th>
                                        <th className="px-6 py-4 font-medium">Estado</th>
                                        <th className="px-6 py-4 font-medium text-right">Liquidado</th>
                                        <th className="px-6 py-4 font-medium text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredPromotions.map((promo) => (
                                        <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{promo.name}</div>
                                                <div className="text-xs text-gray-400 font-mono">{promo.id}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                                                    {promo.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-xs">
                                                <div>{promo.start}</div>
                                                <div>{promo.end}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="text-xs text-gray-600">
                                                    <div>{promo.clientes} clientes</div>
                                                    <div>{promo.productos} productos</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant={promo.status === 'Vigente' ? 'success' : 'default'}>
                                                    {promo.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right font-semibold text-gray-900">
                                                ${promo.liquidado.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleView(promo)}
                                                        className="text-gray-400 hover:text-blue-600 transition-colors"
                                                        title="Ver detalle"
                                                    >
                                                        <Eye size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(promo)}
                                                        className="text-gray-400 hover:text-green-600 transition-colors"
                                                        title="Editar"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(promo.id)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </>
            ) : (
                <PromotionForm />
            )}

            {/* Detail Modal */}
            <Modal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                title="Detalle de Promoción"
                size="lg"
            >
                {selectedPromotion && (
                    <div className="space-y-6">
                        {/* Header Info */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-xs text-gray-600">ID Promoción</span>
                                    <p className="font-mono font-bold text-purple-700">{selectedPromotion.id}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-600">Estado</span>
                                    <div className="mt-1">
                                        <Badge variant={selectedPromotion.status === 'Vigente' ? 'success' : 'default'}>
                                            {selectedPromotion.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Nombre</label>
                                <p className="font-medium text-gray-900">{selectedPromotion.name}</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Tipo</label>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                                    {selectedPromotion.type}
                                </span>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Fecha Inicio</label>
                                <p className="font-medium text-gray-900">{selectedPromotion.start}</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-600 mb-1">Fecha Fin</label>
                                <p className="font-medium text-gray-900">{selectedPromotion.end}</p>
                            </div>
                        </div>

                        {/* Alcance */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3">Alcance</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Clientes</label>
                                    <p className="text-2xl font-bold text-blue-600">{selectedPromotion.clientes}</p>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-600 mb-1">Productos</label>
                                    <p className="text-2xl font-bold text-green-600">{selectedPromotion.productos}</p>
                                </div>
                            </div>
                        </div>

                        {/* Liquidado */}
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <label className="block text-xs text-gray-600 mb-1">Total Liquidado</label>
                            <p className="text-3xl font-bold text-green-700">${selectedPromotion.liquidado.toLocaleString()}</p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end pt-4 border-t">
                            <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                                Cerrar
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Promotions;
