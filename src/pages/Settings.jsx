import React, { useState } from 'react';
import { Settings as SettingsIcon, Package, Ticket, CheckCircle, Percent, Bell, DollarSign, Users, Save, AlertCircle, X, Plus, Edit2 } from 'lucide-react';

const Settings = () => {
    const [activeSection, setActiveSection] = useState('productos');
    const [showSaveNotification, setShowSaveNotification] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalData, setModalData] = useState(null);

    const handleSave = () => {
        setShowSaveNotification(true);
        setTimeout(() => setShowSaveNotification(false), 3000);
    };

    const openModal = (type, data = null) => {
        setModalType(type);
        setModalData(data);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
        setModalData(null);
    };

    const sections = [
        { id: 'productos', name: 'Productos', icon: Package },
        { id: 'cupones', name: 'Cupones', icon: Ticket },
        { id: 'validaciones', name: 'Validaciones', icon: CheckCircle },
        { id: 'rebates', name: 'Rebates', icon: Percent },
        { id: 'notificaciones', name: 'Notificaciones', icon: Bell },
        { id: 'contabilidad', name: 'Contabilidad', icon: DollarSign },
        { id: 'usuarios', name: 'Usuarios y Permisos', icon: Users }
    ];

    // Modal Component
    const Modal = () => {
        if (!showModal) return null;

        const renderModalContent = () => {
            switch (modalType) {
                case 'pmc_products':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Gestionar Productos PMC</h3>
                            <div className="space-y-3">
                                <div className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Trifamox 500mg</span>
                                        <button className="text-red-600 hover:text-red-700 text-sm">Remover</button>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Novo Morab 10mg</span>
                                        <button className="text-red-600 hover:text-red-700 text-sm">Remover</button>
                                    </div>
                                </div>
                                <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600">
                                    + Agregar Producto
                                </button>
                            </div>
                        </div>
                    );

                case 'bonification':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">
                                {modalData ? 'Editar' : 'Nueva'} Condición de Bonificación
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Código de Condición
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={modalData || ''}
                                        placeholder="Ej: 5+1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Descripción
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Compra 5, bonifica 1"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>
                    );

                case 'launch_products':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Productos de Lanzamiento</h3>
                            <div className="space-y-3">
                                <div className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium block">Letty 28 comprimidos</span>
                                            <span className="text-xs text-gray-500">Desde: 01/01/2025</span>
                                        </div>
                                        <button className="text-red-600 hover:text-red-700 text-sm">Remover</button>
                                    </div>
                                </div>
                                <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600">
                                    + Agregar Producto de Lanzamiento
                                </button>
                            </div>
                        </div>
                    );

                case 'discontinued_products':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Productos Descontinuados</h3>
                            <div className="space-y-3">
                                <div className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="font-medium block">Producto X</span>
                                            <span className="text-xs text-gray-500">Descontinuado: 15/03/2024</span>
                                        </div>
                                        <button className="text-primary-600 hover:text-primary-700 text-sm">Reactivar</button>
                                    </div>
                                </div>
                                <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600">
                                    + Marcar Producto como Descontinuado
                                </button>
                            </div>
                        </div>
                    );

                case 'new_coupon':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Nuevo Cupón</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre del Producto
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Trifamox"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tipo de Descuento
                                        </label>
                                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                                            <option>Monto Fijo</option>
                                            <option>Porcentaje</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Valor
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="10.00"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fecha Inicio
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Fecha Fin
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                case 'coupon_ranges':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Registrar Nuevo Rango de Cupones</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Producto
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                                        <option>Trifamox</option>
                                        <option>Novo Morab</option>
                                        <option>Letty</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Rango Desde
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="1300"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Rango Hasta
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="1400"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );

                case 'add_reason':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Agregar Razón de Devolución</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre de la Razón
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Producto dañado"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Acción en Cálculos
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                                        <option>Incluir en cálculos</option>
                                        <option>Excluir de cálculos</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    );

                case 'email_templates':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Gestionar Plantillas de Correo</h3>
                            <div className="space-y-3">
                                <div className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">Plantilla PMC</span>
                                        <button className="text-primary-600 hover:text-primary-700 text-sm">Editar</button>
                                    </div>
                                    <p className="text-xs text-gray-500">Asunto: Liquidación PMC - [Cliente]</p>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">Plantilla Cupones</span>
                                        <button className="text-primary-600 hover:text-primary-700 text-sm">Editar</button>
                                    </div>
                                    <p className="text-xs text-gray-500">Asunto: Liquidación Cupones - [Producto]</p>
                                </div>
                                <button className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-500 hover:text-primary-600">
                                    + Nueva Plantilla
                                </button>
                            </div>
                        </div>
                    );

                case 'accounting_code':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">
                                {modalData ? 'Editar' : 'Agregar'} Código de Afectación
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Código
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={modalData || ''}
                                        placeholder="Ej: 014"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Descripción
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Rebates"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>
                    );

                case 'sap_account':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">
                                {modalData ? 'Editar' : 'Agregar'} Cuenta SAP
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Código de Cuenta
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={modalData || ''}
                                        placeholder="Ej: CD09"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Descripción
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Cuenta para Rebates"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                            </div>
                        </div>
                    );

                case 'new_user':
                    return (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Nuevo Usuario</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Ej: Juan Pérez"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="juan.perez@bago.com"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Rol
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
                                        <option>Auditoría</option>
                                        <option>Ventas</option>
                                        <option>Marketing</option>
                                        <option>Facturación</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    );

                default:
                    return <div>Contenido del modal</div>;
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800">Configuración</h2>
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
                    <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                handleSave();
                                closeModal();
                            }}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-100 rounded-lg">
                            <SettingsIcon className="text-primary-600" size={24} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Configuración</h2>
                            <p className="text-xs text-gray-500">Sistema</p>
                        </div>
                    </div>
                </div>
                <nav className="p-4">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${activeSection === section.id
                                    ? 'bg-primary-50 text-primary-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="text-sm">{section.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6 max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {sections.find(s => s.id === activeSection)?.name}
                        </h1>
                        <p className="text-gray-600">
                            Configura los parámetros del sistema
                        </p>
                    </div>

                    {/* Save Notification */}
                    {showSaveNotification && (
                        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                            <CheckCircle className="text-green-600" size={20} />
                            <span className="text-green-800 font-medium">Configuración guardada exitosamente</span>
                        </div>
                    )}

                    {/* Content Sections */}
                    <div className="bg-white rounded-lg shadow-sm">
                        {activeSection === 'productos' && (
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración de Productos</h3>

                                {/* PMC Products */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Productos PMC (Plan Medicación Continua)
                                    </label>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
                                        <p className="text-sm text-blue-800 mb-2">
                                            <strong>31 productos activos</strong> en PMC
                                        </p>
                                        <button
                                            onClick={() => openModal('pmc_products')}
                                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
                                        >
                                            Gestionar Productos PMC
                                        </button>
                                    </div>
                                </div>

                                {/* Bonification Conditions */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Condiciones de Bonificación
                                    </label>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                            <span className="font-mono text-sm bg-white px-3 py-1 rounded border">3+1</span>
                                            <span className="text-sm text-gray-600">Compra 3, bonifica 1</span>
                                            <button
                                                onClick={() => openModal('bonification', '3+1')}
                                                className="ml-auto text-primary-600 hover:text-primary-700 text-sm"
                                            >
                                                Editar
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                            <span className="font-mono text-sm bg-white px-3 py-1 rounded border">4+1</span>
                                            <span className="text-sm text-gray-600">Compra 4, bonifica 1</span>
                                            <button
                                                onClick={() => openModal('bonification', '4+1')}
                                                className="ml-auto text-primary-600 hover:text-primary-700 text-sm"
                                            >
                                                Editar
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => openModal('bonification')}
                                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                        >
                                            + Agregar Nueva Condición
                                        </button>
                                    </div>
                                </div>

                                {/* Launch Products */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Productos de Lanzamiento
                                    </label>
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                        <p className="text-sm text-purple-800 mb-2">
                                            Define qué productos se consideran "nuevos" para validaciones de Rebates
                                        </p>
                                        <button
                                            onClick={() => openModal('launch_products')}
                                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
                                        >
                                            Gestionar Productos de Lanzamiento
                                        </button>
                                    </div>
                                </div>

                                {/* Discontinued Products */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Productos Descontinuados
                                    </label>
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <p className="text-sm text-gray-600 mb-2">
                                            Productos que no se consideran en cálculos de devoluciones
                                        </p>
                                        <button
                                            onClick={() => openModal('discontinued_products')}
                                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
                                        >
                                            Gestionar Productos Descontinuados
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'cupones' && (
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración de Cupones</h3>

                                {/* Active Coupons */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cupones Activos 2025
                                    </label>
                                    <div className="space-y-3">
                                        {['Trifamox', 'Novo Morab', 'Letty'].map((coupon, idx) => (
                                            <div key={idx} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">{coupon}</h4>
                                                        <p className="text-sm text-gray-600">2 presentaciones</p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                        Activo
                                                    </span>
                                                </div>
                                                <div className="mt-3 flex gap-2">
                                                    <button
                                                        onClick={() => openModal('new_coupon')}
                                                        className="text-primary-600 hover:text-primary-700 text-sm"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => openModal('coupon_ranges')}
                                                        className="text-gray-600 hover:text-gray-700 text-sm"
                                                    >
                                                        Ver Rangos
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => openModal('new_coupon')}
                                        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                                    >
                                        + Nuevo Cupón
                                    </button>
                                </div>

                                {/* Coupon Ranges */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gestión de Rangos
                                    </label>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <p className="text-sm text-blue-800 mb-2">
                                            Los rangos de cupones son registrados por Marketing/Bodega
                                        </p>
                                        <button
                                            onClick={() => openModal('coupon_ranges')}
                                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
                                        >
                                            Registrar Nuevo Rango
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'validaciones' && (
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración de Validaciones</h3>

                                {/* Movement Types */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipos de Movimiento (Ventas)
                                    </label>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Define qué tipos de movimiento se incluyen en los cálculos
                                    </p>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                                            <span className="text-sm">Promoción descuento</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                                            <span className="text-sm">Reverso y provisión</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                                            <span className="text-sm">Movimiento comercial</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <input type="checkbox" className="rounded text-primary-600" />
                                            <span className="text-sm">Rebates (según cliente)</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Return Reasons */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Razones de Devolución
                                    </label>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Configura qué razones de devolución se excluyen de cálculos
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-sm">Producto descontinuado</span>
                                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Excluir</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-sm">Falla de fabricación</span>
                                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Excluir</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-sm">Error de cantidad</span>
                                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Excluir</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <span className="text-sm">Producto caducado</span>
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Incluir</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => openModal('add_reason')}
                                        className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
                                    >
                                        + Agregar Razón
                                    </button>
                                </div>

                                {/* Client Limits */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Límites por Defecto
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Límite de Devoluciones (%)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                defaultValue="1.5"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600 mb-1">
                                                Días Máximos de Inventario
                                            </label>
                                            <input
                                                type="number"
                                                defaultValue="30"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'rebates' && (
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración de Rebates</h3>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                    <div className="flex gap-3">
                                        <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
                                        <div>
                                            <p className="text-sm text-yellow-800 font-medium mb-1">
                                                Configuración por Cliente
                                            </p>
                                            <p className="text-sm text-yellow-700">
                                                Las condiciones de Rebates son únicas por cliente. Configure desde la pantalla de Gestión de Clientes.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipos de Rebate
                                    </label>
                                    <div className="space-y-3">
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-2">Rebate por Marcas</h4>
                                            <p className="text-sm text-gray-600">
                                                Bonificación sobre productos específicos según unidades vendidas
                                            </p>
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-2">Rebate por Montos</h4>
                                            <p className="text-sm text-gray-600">
                                                Bonificación sobre valor total de compras (excluye productos de Rebate por Marcas)
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Períodos de Evaluación
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                                            <span className="text-sm">Trimestral</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                                            <span className="text-sm">Semestral</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                            <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                                            <span className="text-sm">Anual</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'notificaciones' && (
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración de Notificaciones</h3>

                                {/* Email Recipients */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Destinatarios por Tipo de Promoción
                                    </label>
                                    <div className="space-y-4">
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">PMC (Plan Medicación Continua)</h4>
                                            <div className="space-y-2">
                                                <input
                                                    type="email"
                                                    placeholder="gaby.cajas@bago.com"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="supervisor@bago.com"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                                                />
                                                <button className="text-primary-600 hover:text-primary-700 text-sm">
                                                    + Agregar Destinatario
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">Cupones</h4>
                                            <div className="space-y-2">
                                                <input
                                                    type="email"
                                                    placeholder="gaby.cajas@bago.com"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                                                />
                                                <button className="text-primary-600 hover:text-primary-700 text-sm">
                                                    + Agregar Destinatario
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">Rebates</h4>
                                            <div className="space-y-2">
                                                <input
                                                    type="email"
                                                    placeholder="gaby.cajas@bago.com"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="gerencia@bago.com"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                                                />
                                                <button className="text-primary-600 hover:text-primary-700 text-sm">
                                                    + Agregar Destinatario
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Templates */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Plantillas de Correo
                                    </label>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <p className="text-sm text-blue-800 mb-2">
                                            Personaliza las plantillas de correo para cada tipo de notificación
                                        </p>
                                        <button
                                            onClick={() => openModal('email_templates')}
                                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
                                        >
                                            Gestionar Plantillas
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'contabilidad' && (
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Configuración Contable</h3>

                                {/* Accounting Codes */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Códigos de Afectación
                                    </label>
                                    <div className="space-y-3">
                                        {[
                                            { code: '011', desc: 'Semana de Descuento' },
                                            { code: '012', desc: 'PMC' },
                                            { code: '013', desc: 'Cupones' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                                <span className="font-mono text-sm bg-white px-3 py-1 rounded border">{item.code}</span>
                                                <span className="text-sm text-gray-600 flex-1">{item.desc}</span>
                                                <button
                                                    onClick={() => openModal('accounting_code', item.code)}
                                                    className="text-primary-600 hover:text-primary-700 text-sm"
                                                >
                                                    Editar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => openModal('accounting_code')}
                                        className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
                                    >
                                        + Agregar Código
                                    </button>
                                </div>

                                {/* SAP Accounts */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cuentas SAP
                                    </label>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                            <span className="font-mono text-sm bg-white px-3 py-1 rounded border">CD08</span>
                                            <span className="text-sm text-gray-600 flex-1">Cuenta para Semanas de Descuento</span>
                                            <button
                                                onClick={() => openModal('sap_account', 'CD08')}
                                                className="text-primary-600 hover:text-primary-700 text-sm"
                                            >
                                                Editar
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => openModal('sap_account')}
                                        className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium"
                                    >
                                        + Agregar Cuenta
                                    </button>
                                </div>

                                {/* Provisions */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Provisiones
                                    </label>
                                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                                        <h4 className="font-medium text-purple-800 mb-2">Método de Cálculo</h4>
                                        <div className="space-y-2 text-sm text-purple-700">
                                            <p>• Promedio de últimos 3 meses (por defecto)</p>
                                            <p>• Multiplicación por meses pendientes (retrasos)</p>
                                            <p>• Registro por producto (no genérico)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'usuarios' && (
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Usuarios y Permisos</h3>

                                {/* Roles */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Roles del Sistema
                                    </label>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Auditoría', desc: 'Acceso completo a validaciones y liquidaciones', users: 3, color: 'blue' },
                                            { name: 'Ventas', desc: 'Creación y modificación de promociones', users: 2, color: 'green' },
                                            { name: 'Marketing', desc: 'Gestión de cupones y productos de lanzamiento', users: 2, color: 'purple' },
                                            { name: 'Facturación', desc: 'Solo lectura de liquidaciones aprobadas', users: 1, color: 'yellow' }
                                        ].map((role, idx) => (
                                            <div key={idx} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">{role.name}</h4>
                                                        <p className="text-sm text-gray-600">{role.desc}</p>
                                                    </div>
                                                    <span className={`px-2 py-1 bg-${role.color}-100 text-${role.color}-700 rounded text-xs`}>
                                                        {role.users} usuarios
                                                    </span>
                                                </div>
                                                <button className="text-primary-600 hover:text-primary-700 text-sm">
                                                    Ver Permisos
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Users */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gestión de Usuarios
                                    </label>
                                    <button
                                        onClick={() => openModal('new_user')}
                                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                                    >
                                        + Nuevo Usuario
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
                            <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
                            >
                                <Save size={18} />
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal />
        </div>
    );
};

export default Settings;
