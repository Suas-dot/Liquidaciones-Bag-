import React, { useState } from 'react';
import {
    FileText,
    Users,
    Package,
    Calendar,
    Search,
    Plus,
    Edit2,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    Download,
    Filter,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';

const OII = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Mock data for internal orders
    const [orders, setOrders] = useState([
        {
            id: 1,
            orderNumber: 'OII-2024-001',
            client: 'GPF',
            clientCode: 'CLI001',
            createdDate: '2024-12-15',
            status: 'pendiente',
            products: [
                { id: 1, code: 'PROD001', name: 'Amoxicilina 500mg', quantity: 100, unitPrice: 2.50, total: 250 },
                { id: 2, code: 'PROD002', name: 'Ibuprofeno 400mg', quantity: 50, unitPrice: 1.80, total: 90 }
            ],
            observations: 'Pedido urgente para campaña navideña',
            totalAmount: 340,
            createdBy: 'Juan Pérez',
            timeline: [
                { date: '2024-12-15 10:30', status: 'pendiente', user: 'Juan Pérez', action: 'Orden creada' }
            ]
        },
        {
            id: 2,
            orderNumber: 'OII-2024-002',
            client: 'Difar',
            clientCode: 'CLI002',
            createdDate: '2024-12-18',
            status: 'aprobada',
            products: [
                { id: 3, code: 'PROD003', name: 'Paracetamol 500mg', quantity: 200, unitPrice: 1.20, total: 240 }
            ],
            observations: 'Promoción especial fin de año',
            totalAmount: 240,
            createdBy: 'María González',
            timeline: [
                { date: '2024-12-18 09:15', status: 'pendiente', user: 'María González', action: 'Orden creada' },
                { date: '2024-12-18 14:30', status: 'aprobada', user: 'Carlos Ruiz', action: 'Orden aprobada' }
            ]
        },
        {
            id: 3,
            orderNumber: 'OII-2024-003',
            client: 'FarmaEnlace',
            clientCode: 'CLI003',
            createdDate: '2024-12-20',
            status: 'procesada',
            products: [
                { id: 4, code: 'PROD004', name: 'Vitamina C 1000mg', quantity: 150, unitPrice: 3.00, total: 450 },
                { id: 5, code: 'PROD005', name: 'Complejo B', quantity: 80, unitPrice: 2.50, total: 200 }
            ],
            observations: 'Entrega programada para el 27 de diciembre',
            totalAmount: 650,
            createdBy: 'Ana Torres',
            timeline: [
                { date: '2024-12-20 08:00', status: 'pendiente', user: 'Ana Torres', action: 'Orden creada' },
                { date: '2024-12-20 11:00', status: 'aprobada', user: 'Carlos Ruiz', action: 'Orden aprobada' },
                { date: '2024-12-21 16:00', status: 'procesada', user: 'Sistema', action: 'Orden procesada en SAP' }
            ]
        }
    ]);

    const [formData, setFormData] = useState({
        orderNumber: '',
        client: '',
        clientCode: '',
        products: [],
        observations: ''
    });

    const availableClients = [
        { name: 'GPF', code: 'CLI001' },
        { name: 'Difar', code: 'CLI002' },
        { name: 'FarmaEnlace', code: 'CLI003' },
        { name: 'Cruz Azul', code: 'CLI004' },
        { name: 'Verdezoto', code: 'CLI005' }
    ];

    const handleCreateOrder = () => {
        const newOrderNumber = `OII-2024-${String(orders.length + 1).padStart(3, '0')}`;
        setFormData({
            orderNumber: newOrderNumber,
            client: '',
            clientCode: '',
            products: [],
            observations: ''
        });
        setSelectedOrder(null);
        setShowModal(true);
    };

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setShowDetailModal(true);
    };

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setFormData({
            orderNumber: order.orderNumber,
            client: order.client,
            clientCode: order.clientCode,
            products: [...order.products],
            observations: order.observations
        });
        setShowModal(true);
    };

    const handleSaveOrder = () => {
        const totalAmount = formData.products.reduce((sum, p) => sum + p.total, 0);

        if (selectedOrder) {
            // Update existing order
            setOrders(orders.map(o =>
                o.id === selectedOrder.id
                    ? {
                        ...o,
                        ...formData,
                        totalAmount,
                        timeline: [
                            ...o.timeline,
                            {
                                date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                                status: o.status,
                                user: 'Usuario Sistema',
                                action: 'Orden actualizada'
                            }
                        ]
                    }
                    : o
            ));
        } else {
            // Create new order
            const newOrder = {
                id: Date.now(),
                ...formData,
                createdDate: new Date().toISOString().split('T')[0],
                status: 'pendiente',
                totalAmount,
                createdBy: 'Usuario Sistema',
                timeline: [
                    {
                        date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                        status: 'pendiente',
                        user: 'Usuario Sistema',
                        action: 'Orden creada'
                    }
                ]
            };
            setOrders([...orders, newOrder]);
        }
        setShowModal(false);
        showNotification(selectedOrder ? 'Orden actualizada exitosamente' : 'Orden creada exitosamente', 'success');
    };

    const handleApproveOrder = (id) => {
        setOrders(orders.map(o =>
            o.id === id
                ? {
                    ...o,
                    status: 'aprobada',
                    timeline: [
                        ...o.timeline,
                        {
                            date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                            status: 'aprobada',
                            user: 'Usuario Sistema',
                            action: 'Orden aprobada'
                        }
                    ]
                }
                : o
        ));
        showNotification('Orden aprobada exitosamente', 'success');
    };

    const handleProcessOrder = (id) => {
        setOrders(orders.map(o =>
            o.id === id
                ? {
                    ...o,
                    status: 'procesada',
                    timeline: [
                        ...o.timeline,
                        {
                            date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                            status: 'procesada',
                            user: 'Sistema',
                            action: 'Orden procesada en SAP'
                        }
                    ]
                }
                : o
        ));
        showNotification('Orden procesada en SAP exitosamente', 'success');
    };

    const handleRejectOrder = (id) => {
        setOrders(orders.map(o =>
            o.id === id
                ? {
                    ...o,
                    status: 'rechazada',
                    timeline: [
                        ...o.timeline,
                        {
                            date: new Date().toISOString().slice(0, 16).replace('T', ' '),
                            status: 'rechazada',
                            user: 'Usuario Sistema',
                            action: 'Orden rechazada'
                        }
                    ]
                }
                : o
        ));
        showNotification('Orden rechazada', 'success');
    };

    const handleAddProduct = () => {
        const newProduct = {
            id: Date.now(),
            code: '',
            name: '',
            quantity: 0,
            unitPrice: 0,
            total: 0
        };
        setFormData({
            ...formData,
            products: [...formData.products, newProduct]
        });
    };

    const handleUpdateProduct = (id, field, value) => {
        setFormData({
            ...formData,
            products: formData.products.map(p => {
                if (p.id === id) {
                    const updated = { ...p, [field]: value };
                    if (field === 'quantity' || field === 'unitPrice') {
                        updated.total = updated.quantity * updated.unitPrice;
                    }
                    return updated;
                }
                return p;
            })
        });
    };

    const handleRemoveProduct = (id) => {
        setFormData({
            ...formData,
            products: formData.products.filter(p => p.id !== id)
        });
    };

    const handleClientChange = (clientName) => {
        const client = availableClients.find(c => c.name === clientName);
        setFormData({
            ...formData,
            client: clientName,
            clientCode: client ? client.code : ''
        });
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: orders.length,
        pendiente: orders.filter(o => o.status === 'pendiente').length,
        aprobada: orders.filter(o => o.status === 'aprobada').length,
        procesada: orders.filter(o => o.status === 'procesada').length
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
                    {toastType === 'error' && <XCircle className="w-5 h-5" />}
                    {toastType === 'warning' && <AlertCircle className="w-5 h-5" />}
                    {toastType === 'info' && <FileText className="w-5 h-5" />}
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Órdenes Internas (OII)</h1>
                    <p className="text-gray-600 mt-1">Gestión de órdenes internas de inventario</p>
                </div>
                <Button onClick={handleCreateOrder} className="flex items-center space-x-2">
                    <Plus size={20} />
                    <span>Nueva Orden</span>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Órdenes</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <FileText className="text-gray-600" size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Pendientes</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.pendiente}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="text-yellow-600" size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Aprobadas</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.aprobada}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Procesadas</p>
                                <p className="text-2xl font-bold text-green-600">{stats.procesada}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por número de orden o cliente..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="aprobada">Aprobada</option>
                            <option value="procesada">Procesada</option>
                            <option value="rechazada">Rechazada</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Órdenes Internas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Número Orden
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Productos
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Monto Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                                            <div className="text-xs text-gray-500">Por: {order.createdBy}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{order.client}</div>
                                            <div className="text-xs text-gray-500">{order.clientCode}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.createdDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {order.products.length} producto(s)
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                            ${order.totalAmount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => handleViewOrder(order)}
                                                className="text-primary-600 hover:text-primary-900"
                                                title="Ver detalle"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            {order.status === 'pendiente' && (
                                                <>
                                                    <button
                                                        onClick={() => handleEditOrder(order)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                        title="Editar"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleApproveOrder(order.id)}
                                                        className="text-green-600 hover:text-green-900"
                                                        title="Aprobar"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleRejectOrder(order.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Rechazar"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            )}
                                            {order.status === 'aprobada' && (
                                                <button
                                                    onClick={() => handleProcessOrder(order.id)}
                                                    className="text-purple-600 hover:text-purple-900"
                                                    title="Procesar en SAP"
                                                >
                                                    <CheckCircle size={18} />
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

            {/* Create/Edit Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={selectedOrder ? 'Editar Orden Interna' : 'Nueva Orden Interna'}
                size="xl"
            >
                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Número de Orden
                            </label>
                            <input
                                type="text"
                                value={formData.orderNumber}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cliente *
                            </label>
                            <select
                                value={formData.client}
                                onChange={(e) => handleClientChange(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="">Seleccione un cliente</option>
                                {availableClients.map(client => (
                                    <option key={client.code} value={client.name}>
                                        {client.name} ({client.code})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                                Productos *
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
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio Unit.</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {formData.products.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
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
                                                        value={product.quantity}
                                                        onChange={(e) => handleUpdateProduct(product.id, 'quantity', parseFloat(e.target.value) || 0)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                                                        min="0"
                                                    />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input
                                                        type="number"
                                                        value={product.unitPrice}
                                                        onChange={(e) => handleUpdateProduct(product.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                                                        className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                                                        min="0"
                                                        step="0.01"
                                                    />
                                                </td>
                                                <td className="px-4 py-3 font-semibold">
                                                    ${product.total.toFixed(2)}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <button
                                                        onClick={() => handleRemoveProduct(product.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    {formData.products.length > 0 && (
                                        <tr className="bg-gray-50 font-semibold">
                                            <td colSpan="4" className="px-4 py-3 text-right">Total:</td>
                                            <td className="px-4 py-3 text-primary-600">
                                                ${formData.products.reduce((sum, p) => sum + p.total, 0).toFixed(2)}
                                            </td>
                                            <td></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Observations */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Observaciones
                        </label>
                        <textarea
                            value={formData.observations}
                            onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Ingrese observaciones adicionales..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <Button variant="outline" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSaveOrder}>
                            {selectedOrder ? 'Actualizar' : 'Crear'} Orden
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Detail Modal */}
            <Modal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                title="Detalle de Orden Interna"
                size="xl"
            >
                {selectedOrder && (
                    <div className="space-y-6">
                        {/* Order Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Número de Orden</p>
                                <p className="font-semibold text-gray-900">{selectedOrder.orderNumber}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Cliente</p>
                                <p className="font-semibold text-gray-900">{selectedOrder.client} ({selectedOrder.clientCode})</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Fecha de Creación</p>
                                <p className="font-semibold text-gray-900">{selectedOrder.createdDate}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Estado</p>
                                <StatusBadge status={selectedOrder.status} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Creado Por</p>
                                <p className="font-semibold text-gray-900">{selectedOrder.createdBy}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Monto Total</p>
                                <p className="font-semibold text-primary-600 text-lg">${selectedOrder.totalAmount.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* Products */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Productos</h3>
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio Unit.</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {selectedOrder.products.map(product => (
                                            <tr key={product.id}>
                                                <td className="px-4 py-3 text-sm">{product.code}</td>
                                                <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                                                <td className="px-4 py-3 text-sm">{product.quantity}</td>
                                                <td className="px-4 py-3 text-sm">${product.unitPrice.toFixed(2)}</td>
                                                <td className="px-4 py-3 text-sm font-semibold">${product.total.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Observations */}
                        {selectedOrder.observations && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Observaciones</h3>
                                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedOrder.observations}</p>
                            </div>
                        )}

                        {/* Timeline */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Historial de Estados</h3>
                            <div className="space-y-3">
                                {selectedOrder.timeline.map((event, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                                <Clock className="text-primary-600" size={16} />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{event.action}</p>
                                            <p className="text-xs text-gray-500">{event.date} - {event.user}</p>
                                        </div>
                                        <StatusBadge status={event.status} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
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

export default OII;
