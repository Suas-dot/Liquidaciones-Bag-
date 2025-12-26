import React, { useState } from 'react';
import {
    Calendar,
    Package,
    Users,
    Percent,
    Search,
    Plus,
    Edit2,
    Trash2,
    CheckCircle,
    XCircle,
    Download,
    Upload
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/Modal';

const SemanaDescuentos = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [showModal, setShowModal] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data for discount weeks
    const [discountWeeks, setDiscountWeeks] = useState([
        {
            id: 1,
            name: 'Semana Black Friday 2024',
            startDate: '2024-11-25',
            endDate: '2024-12-01',
            status: 'active',
            productsCount: 15,
            clientsCount: 45,
            totalDiscount: '12%',
            products: [
                { id: 1, code: 'PROD001', name: 'Amoxicilina 500mg', discount: 15, stock: 1000 },
                { id: 2, code: 'PROD002', name: 'Ibuprofeno 400mg', discount: 10, stock: 800 },
                { id: 3, code: 'PROD003', name: 'Paracetamol 500mg', discount: 12, stock: 1200 }
            ],
            clients: ['GPF', 'Difar', 'FarmaEnlace', 'Cruz Azul']
        },
        {
            id: 2,
            name: 'Semana Navidad 2024',
            startDate: '2024-12-20',
            endDate: '2024-12-27',
            status: 'scheduled',
            productsCount: 20,
            clientsCount: 38,
            totalDiscount: '18%',
            products: [
                { id: 4, code: 'PROD004', name: 'Vitamina C 1000mg', discount: 20, stock: 600 },
                { id: 5, code: 'PROD005', name: 'Complejo B', discount: 18, stock: 450 }
            ],
            clients: ['GPF', 'Difar', 'Verdezoto']
        },
        {
            id: 3,
            name: 'Semana Fin de Año 2024',
            startDate: '2024-12-28',
            endDate: '2025-01-03',
            status: 'inactive',
            productsCount: 12,
            clientsCount: 30,
            totalDiscount: '10%',
            products: [],
            clients: []
        }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        products: [],
        clients: []
    });

    const availableClients = [
        'GPF', 'Difar', 'FarmaEnlace', 'Cruz Azul', 'Verdezoto',
        'Fybeca', 'Pharmacys', 'SanaSana', 'MediFarma', 'FarmaVida'
    ];

    const handleCreateWeek = () => {
        setFormData({
            name: '',
            startDate: '',
            endDate: '',
            products: [],
            clients: []
        });
        setSelectedWeek(null);
        setShowModal(true);
    };

    const handleEditWeek = (week) => {
        setSelectedWeek(week);
        setFormData({
            name: week.name,
            startDate: week.startDate,
            endDate: week.endDate,
            products: week.products,
            clients: week.clients
        });
        setShowModal(true);
    };

    const handleSaveWeek = () => {
        if (selectedWeek) {
            // Update existing week
            setDiscountWeeks(discountWeeks.map(w =>
                w.id === selectedWeek.id
                    ? { ...w, ...formData, productsCount: formData.products.length, clientsCount: formData.clients.length }
                    : w
            ));
        } else {
            // Create new week
            const newWeek = {
                id: Date.now(),
                ...formData,
                status: 'scheduled',
                productsCount: formData.products.length,
                clientsCount: formData.clients.length,
                totalDiscount: '0%'
            };
            setDiscountWeeks([...discountWeeks, newWeek]);
        }
        setShowModal(false);
    };

    const handleActivateWeek = (id) => {
        setDiscountWeeks(discountWeeks.map(w =>
            w.id === id ? { ...w, status: 'active' } : w
        ));
    };

    const handleDeactivateWeek = (id) => {
        setDiscountWeeks(discountWeeks.map(w =>
            w.id === id ? { ...w, status: 'inactive' } : w
        ));
    };

    const handleDeleteWeek = (id) => {
        if (window.confirm('¿Está seguro de eliminar esta semana de descuentos?')) {
            setDiscountWeeks(discountWeeks.filter(w => w.id !== id));
        }
    };

    const handleAddProduct = () => {
        const newProduct = {
            id: Date.now(),
            code: '',
            name: '',
            discount: 0,
            stock: 0
        };
        setFormData({
            ...formData,
            products: [...formData.products, newProduct]
        });
    };

    const handleUpdateProduct = (id, field, value) => {
        setFormData({
            ...formData,
            products: formData.products.map(p =>
                p.id === id ? { ...p, [field]: value } : p
            )
        });
    };

    const handleRemoveProduct = (id) => {
        setFormData({
            ...formData,
            products: formData.products.filter(p => p.id !== id)
        });
    };

    const handleToggleClient = (client) => {
        if (formData.clients.includes(client)) {
            setFormData({
                ...formData,
                clients: formData.clients.filter(c => c !== client)
            });
        } else {
            setFormData({
                ...formData,
                clients: [...formData.clients, client]
            });
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { label: 'Activa', color: 'bg-green-100 text-green-800' },
            scheduled: { label: 'Programada', color: 'bg-blue-100 text-blue-800' },
            inactive: { label: 'Inactiva', color: 'bg-gray-100 text-gray-800' }
        };
        const config = statusConfig[status] || statusConfig.inactive;
        return <Badge className={config.color}>{config.label}</Badge>;
    };

    const filteredWeeks = discountWeeks.filter(week => {
        const matchesSearch = week.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'all' || week.status === activeTab;
        return matchesSearch && matchesTab;
    });

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Semana de Descuentos</h1>
                    <p className="text-gray-600 mt-1">Gestión de promociones semanales especiales</p>
                </div>
                <Button onClick={handleCreateWeek} className="flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Nueva Semana</span>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Semanas Activas</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {discountWeeks.filter(w => w.status === 'active').length}
                                </p>
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
                                <p className="text-sm text-gray-600">Programadas</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {discountWeeks.filter(w => w.status === 'scheduled').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Calendar className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Productos</p>
                                <p className="text-2xl font-bold text-purple-600">
                                    {discountWeeks.reduce((sum, w) => sum + w.productsCount, 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Package className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Clientes Participantes</p>
                                <p className="text-2xl font-bold text-primary-600">
                                    {Math.max(...discountWeeks.map(w => w.clientsCount))}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                <Users className="text-primary-600" size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        {/* Tabs */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'all'
                                        ? 'bg-primary-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Todas
                            </button>
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'active'
                                        ? 'bg-green-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Activas
                            </button>
                            <button
                                onClick={() => setActiveTab('scheduled')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'scheduled'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Programadas
                            </button>
                            <button
                                onClick={() => setActiveTab('inactive')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'inactive'
                                        ? 'bg-gray-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Inactivas
                            </button>
                        </div>

                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar semana..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Weeks List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredWeeks.map(week => (
                    <Card key={week.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{week.name}</h3>
                                        {getStatusBadge(week.status)}
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Fecha Inicio</p>
                                            <p className="font-semibold text-gray-900">{week.startDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Fecha Fin</p>
                                            <p className="font-semibold text-gray-900">{week.endDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Productos</p>
                                            <p className="font-semibold text-primary-600">{week.productsCount}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Clientes</p>
                                            <p className="font-semibold text-primary-600">{week.clientsCount}</p>
                                        </div>
                                    </div>
                                    {week.clients.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-600 mb-1">Clientes Participantes:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {week.clients.map(client => (
                                                    <Badge key={client} className="bg-primary-100 text-primary-800">
                                                        {client}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEditWeek(week)}
                                        className="flex items-center space-x-1"
                                    >
                                        <Edit2 size={16} />
                                        <span>Editar</span>
                                    </Button>
                                    {week.status === 'inactive' || week.status === 'scheduled' ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleActivateWeek(week.id)}
                                            className="flex items-center space-x-1 text-green-600 border-green-600 hover:bg-green-50"
                                        >
                                            <CheckCircle size={16} />
                                            <span>Activar</span>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeactivateWeek(week.id)}
                                            className="flex items-center space-x-1 text-gray-600 border-gray-600 hover:bg-gray-50"
                                        >
                                            <XCircle size={16} />
                                            <span>Desactivar</span>
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteWeek(week.id)}
                                        className="flex items-center space-x-1 text-red-600 border-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modal for Create/Edit Week */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={selectedWeek ? 'Editar Semana de Descuentos' : 'Nueva Semana de Descuentos'}
                size="xl"
            >
                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre de la Semana *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Ej: Semana Black Friday 2024"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fecha Inicio *
                                </label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fecha Fin *
                                </label>
                                <input
                                    type="date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Productos con Descuento
                            </label>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleAddProduct}
                                className="flex items-center space-x-1"
                            >
                                <Plus size={16} />
                                <span>Agregar Producto</span>
                            </Button>
                        </div>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descuento %</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {formData.products.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                                No hay productos agregados. Haz clic en "Agregar Producto" para comenzar.
                                            </td>
                                        </tr>
                                    ) : (
                                        formData.products.map(product => (
                                            <tr key={product.id}>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="text"
                                                        value={product.code}
                                                        onChange={(e) => handleUpdateProduct(product.id, 'code', e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                                                        placeholder="PROD001"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="text"
                                                        value={product.name}
                                                        onChange={(e) => handleUpdateProduct(product.id, 'name', e.target.value)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                                                        placeholder="Nombre del producto"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        value={product.discount}
                                                        onChange={(e) => handleUpdateProduct(product.id, 'discount', parseFloat(e.target.value))}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                                                        min="0"
                                                        max="100"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        value={product.stock}
                                                        onChange={(e) => handleUpdateProduct(product.id, 'stock', parseInt(e.target.value))}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                                                        min="0"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        onClick={() => handleRemoveProduct(product.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Clients Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Clientes Participantes
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {availableClients.map(client => (
                                <label
                                    key={client}
                                    className={`flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer transition-colors ${formData.clients.includes(client)
                                            ? 'bg-primary-50 border-primary-500'
                                            : 'bg-white border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={formData.clients.includes(client)}
                                        onChange={() => handleToggleClient(client)}
                                        className="rounded text-primary-600 focus:ring-primary-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">{client}</span>
                                </label>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            {formData.clients.length} cliente(s) seleccionado(s)
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button variant="outline" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSaveWeek}>
                            {selectedWeek ? 'Actualizar' : 'Crear'} Semana
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SemanaDescuentos;
