import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Building2, Link as LinkIcon, FileText, Mail, Phone, MapPin, ChevronRight } from 'lucide-react';

const Clients = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [activeTab, setActiveTab] = useState('general');

    // Mock data
    const clients = [
        {
            id: 1,
            codigoBago: '8127',
            codigoKifatex: '8127',
            razonSocial: 'Suiza',
            tipo: 'Cadena Grande',
            contacto: 'Juan Pérez',
            email: 'juan.perez@suiza.com',
            telefono: '02-2345678',
            ciudad: 'Quito',
            estado: 'Activo',
            productosAsociados: 31,
            promocionesActivas: 3
        },
        {
            id: 2,
            codigoBago: '8653',
            codigoKifatex: '8653',
            razonSocial: 'Cordexfa',
            tipo: 'Cadena Grande',
            contacto: 'María González',
            email: 'maria.gonzalez@cordexfa.com',
            telefono: '02-3456789',
            ciudad: 'Guayaquil',
            estado: 'Activo',
            productosAsociados: 45,
            promocionesActivas: 5
        },
        {
            id: 3,
            codigoBago: '9001',
            codigoKifatex: '9001',
            razonSocial: 'GPF (Grupo Fybeca)',
            tipo: 'Cadena Grande',
            contacto: 'Carlos Ramírez',
            email: 'carlos.ramirez@fybeca.com',
            telefono: '02-4567890',
            ciudad: 'Quito',
            estado: 'Activo',
            productosAsociados: 120,
            promocionesActivas: 8
        },
        {
            id: 4,
            codigoBago: '7234',
            codigoKifatex: '7234',
            razonSocial: 'Difare',
            tipo: 'Cadena Grande',
            contacto: 'Ana Morales',
            email: 'ana.morales@difare.com',
            telefono: '02-5678901',
            ciudad: 'Cuenca',
            estado: 'Activo',
            productosAsociados: 89,
            promocionesActivas: 6
        },
        {
            id: 5,
            codigoBago: '5678',
            codigoKifatex: '5678',
            razonSocial: 'Farmacias Keilas',
            tipo: 'Cadena Pequeña',
            contacto: 'Luis Torres',
            email: 'luis.torres@keilas.com',
            telefono: '02-6789012',
            ciudad: 'Ambato',
            estado: 'Activo',
            productosAsociados: 22,
            promocionesActivas: 2
        },
        {
            id: 6,
            codigoBago: '4321',
            codigoKifatex: '4321',
            razonSocial: 'Coxybamba',
            tipo: 'Cadena Pequeña',
            contacto: 'Patricia Vega',
            email: 'patricia.vega@coxybamba.com',
            telefono: '02-7890123',
            ciudad: 'Riobamba',
            estado: 'Activo',
            productosAsociados: 18,
            promocionesActivas: 1
        }
    ];

    const filteredClients = clients.filter(client => {
        const matchesSearch =
            client.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.codigoBago.includes(searchTerm) ||
            client.codigoKifatex.includes(searchTerm) ||
            client.contacto.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterType === 'all' || client.tipo === filterType;

        return matchesSearch && matchesFilter;
    });

    const handleEdit = (client) => {
        setSelectedClient(client);
        setShowModal(true);
    };

    const handleNew = () => {
        setSelectedClient(null);
        setShowModal(true);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Clientes</h1>
                <p className="text-gray-600">Administra clientes, códigos y relaciones con productos</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-primary-600">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Clientes</p>
                            <p className="text-2xl font-bold text-gray-800">{clients.length}</p>
                        </div>
                        <Building2 className="text-primary-600" size={32} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-blue-600">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Cadenas Grandes</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {clients.filter(c => c.tipo === 'Cadena Grande').length}
                            </p>
                        </div>
                        <Building2 className="text-blue-600" size={32} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-600">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Cadenas Pequeñas</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {clients.filter(c => c.tipo === 'Cadena Pequeña').length}
                            </p>
                        </div>
                        <Building2 className="text-green-600" size={32} />
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-purple-600">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Promociones Activas</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {clients.reduce((sum, c) => sum + c.promocionesActivas, 0)}
                            </p>
                        </div>
                        <FileText className="text-purple-600" size={32} />
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por razón social, código Bagó, código Kifatex o contacto..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">Todos los tipos</option>
                        <option value="Cadena Grande">Cadenas Grandes</option>
                        <option value="Cadena Pequeña">Cadenas Pequeñas</option>
                    </select>
                    <button
                        onClick={handleNew}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <Plus size={20} />
                        Nuevo Cliente
                    </button>
                </div>
            </div>

            {/* Clients Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Cliente
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Códigos
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tipo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contacto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Productos
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Promociones
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredClients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                <Building2 className="text-primary-600" size={20} />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{client.razonSocial}</div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <MapPin size={12} />
                                                    {client.ciudad}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono bg-gray-100 px-2 py-1 rounded">B: {client.codigoBago}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="font-mono bg-blue-100 px-2 py-1 rounded text-blue-700">K: {client.codigoKifatex}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${client.tipo === 'Cadena Grande'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-green-100 text-green-800'
                                            }`}>
                                            {client.tipo}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{client.contacto}</div>
                                        <div className="text-sm text-gray-500 flex items-center gap-1">
                                            <Mail size={12} />
                                            {client.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                            {client.productosAsociados}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                            {client.promocionesActivas}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {client.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(client)}
                                            className="text-primary-600 hover:text-primary-900 mr-3"
                                            title="Editar"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">
                                {selectedClient ? 'Editar Cliente' : 'Nuevo Cliente'}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200">
                            <nav className="flex px-6">
                                <button
                                    onClick={() => setActiveTab('general')}
                                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'general'
                                            ? 'border-primary-600 text-primary-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Información General
                                </button>
                                <button
                                    onClick={() => setActiveTab('productos')}
                                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'productos'
                                            ? 'border-primary-600 text-primary-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Productos Asociados
                                </button>
                                <button
                                    onClick={() => setActiveTab('condiciones')}
                                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'condiciones'
                                            ? 'border-primary-600 text-primary-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Condiciones Especiales
                                </button>
                            </nav>
                        </div>

                        <div className="p-6">
                            {activeTab === 'general' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Razón Social *
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            defaultValue={selectedClient?.razonSocial}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tipo de Cliente *
                                        </label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                                            <option>Cadena Grande</option>
                                            <option>Cadena Pequeña</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Código Bagó *
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            defaultValue={selectedClient?.codigoBago}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Código Kifatex *
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            defaultValue={selectedClient?.codigoKifatex}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Contacto Responsable
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            defaultValue={selectedClient?.contacto}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            defaultValue={selectedClient?.email}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            defaultValue={selectedClient?.telefono}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Ciudad
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            defaultValue={selectedClient?.ciudad}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'productos' && (
                                <div>
                                    <p className="text-gray-600 mb-4">
                                        Gestiona los productos asociados a este cliente y sus costos negociados.
                                    </p>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <p className="text-sm text-blue-800">
                                            <strong>Productos asociados:</strong> {selectedClient?.productosAsociados || 0}
                                        </p>
                                        <button className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                                            Gestionar Productos
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'condiciones' && (
                                <div>
                                    <p className="text-gray-600 mb-4">
                                        Define condiciones especiales para este cliente (límites de devolución, inventario, etc.)
                                    </p>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Límite de Devoluciones (%)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                placeholder="1.5"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Días Máximos de Inventario
                                            </label>
                                            <input
                                                type="number"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                                placeholder="30"
                                            />
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2">
                                                <input type="checkbox" className="rounded text-primary-600" />
                                                <span className="text-sm text-gray-700">Requiere compra de productos nuevos</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                                {selectedClient ? 'Guardar Cambios' : 'Crear Cliente'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clients;
