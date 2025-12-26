import React, { useState } from 'react';
import { Users, Plus, Edit, Download, Upload } from 'lucide-react';
import DataTable from '../components/DataTable';
import FilterPanel from '../components/FilterPanel';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { interlocutores } from '../data/mockData';

const TablaInterlocutores = () => {
    const [interlocutoresData, setInterlocutoresData] = useState(interlocutores);
    const [showModal, setShowModal] = useState(false);
    const [selectedInterlocutor, setSelectedInterlocutor] = useState(null);
    const [formData, setFormData] = useState({
        codigoBago: '',
        codigoKifatex: '',
        razonSocial: '',
        nombreComercial: '',
        email: '',
        supervisorNombre: '',
        supervisorEmail: '',
        visitadorNombre: '',
        visitadorEmail: ''
    });

    const filters = [
        {
            key: 'estado',
            label: 'Estado',
            type: 'select',
            options: [
                { value: 'Activo', label: 'Activo' },
                { value: 'Inactivo', label: 'Inactivo' }
            ]
        },
        {
            key: 'codigo',
            label: 'Código',
            type: 'text'
        },
        {
            key: 'nombre',
            label: 'Nombre',
            type: 'text'
        }
    ];

    const columns = [
        {
            header: 'Código Bagó',
            accessor: (row) => (
                <span className="font-mono font-medium text-pink-600">{row.codigoBago}</span>
            )
        },
        {
            header: 'Código Kifatex',
            accessor: (row) => (
                <span className="font-mono text-purple-600">{row.codigoKifatex}</span>
            )
        },
        {
            header: 'Razón Social',
            accessor: (row) => row.razonSocial
        },
        {
            header: 'Nombre Comercial',
            accessor: (row) => row.nombreComercial
        },
        {
            header: 'Email',
            accessor: (row) => row.email
        },
        {
            header: 'Supervisor',
            accessor: (row) => row.supervisor.nombre
        },
        {
            header: 'Estado',
            accessor: (row) => <StatusBadge status={row.estado} />
        }
    ];

    const handleNuevo = () => {
        setSelectedInterlocutor(null);
        setFormData({
            codigoBago: '',
            codigoKifatex: '',
            razonSocial: '',
            nombreComercial: '',
            email: '',
            supervisorNombre: '',
            supervisorEmail: '',
            visitadorNombre: '',
            visitadorEmail: ''
        });
        setShowModal(true);
    };

    const handleGuardar = () => {
        if (selectedInterlocutor) {
            // Editar
            alert('Interlocutor actualizado');
        } else {
            // Crear nuevo
            const nuevoInterlocutor = {
                id: String(interlocutoresData.length + 1),
                codigoBago: formData.codigoBago,
                codigoKifatex: formData.codigoKifatex,
                razonSocial: formData.razonSocial,
                nombreComercial: formData.nombreComercial,
                email: formData.email,
                supervisor: {
                    nombre: formData.supervisorNombre,
                    email: formData.supervisorEmail
                },
                visitador: {
                    nombre: formData.visitadorNombre,
                    email: formData.visitadorEmail
                },
                estado: 'Activo',
                fechaCreacion: new Date().toISOString().split('T')[0],
                ultimaActualizacion: new Date().toISOString().split('T')[0]
            };
            setInterlocutoresData([...interlocutoresData, nuevoInterlocutor]);
            alert('Interlocutor creado exitosamente');
        }
        setShowModal(false);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <Users className="w-8 h-8 text-pink-600" />
                        Tabla de Interlocutores
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Sincronización de códigos Bagó y Kifatex
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => alert('Importando desde Excel...')}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                    >
                        <Upload className="w-5 h-5" />
                        Importar
                    </button>
                    <button
                        onClick={handleNuevo}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Interlocutor
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Interlocutores</p>
                            <p className="text-2xl font-bold text-purple-600">{interlocutoresData.length}</p>
                        </div>
                        <Users className="w-8 h-8 text-purple-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Activos</p>
                            <p className="text-2xl font-bold text-green-600">
                                {interlocutoresData.filter(i => i.estado === 'Activo').length}
                            </p>
                        </div>
                        <Users className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Inactivos</p>
                            <p className="text-2xl font-bold text-gray-600">
                                {interlocutoresData.filter(i => i.estado === 'Inactivo').length}
                            </p>
                        </div>
                        <Users className="w-8 h-8 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <FilterPanel
                filters={filters}
                onFilterChange={(values) => console.log('Filtros:', values)}
                onClear={() => console.log('Limpiar filtros')}
            />

            {/* Tabla */}
            <DataTable
                columns={columns}
                data={interlocutoresData}
                onRowClick={(row) => {
                    setSelectedInterlocutor(row);
                    setFormData({
                        codigoBago: row.codigoBago,
                        codigoKifatex: row.codigoKifatex,
                        razonSocial: row.razonSocial,
                        nombreComercial: row.nombreComercial,
                        email: row.email,
                        supervisorNombre: row.supervisor.nombre,
                        supervisorEmail: row.supervisor.email,
                        visitadorNombre: row.visitador.nombre,
                        visitadorEmail: row.visitador.email
                    });
                    setShowModal(true);
                }}
            />

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={selectedInterlocutor ? 'Editar Interlocutor' : 'Nuevo Interlocutor'}
                size="lg"
            >
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Código Bagó (SAP) *</label>
                            <input
                                type="text"
                                value={formData.codigoBago}
                                onChange={(e) => setFormData({ ...formData, codigoBago: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                placeholder="0011"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Código Kifatex *</label>
                            <input
                                type="text"
                                value={formData.codigoKifatex}
                                onChange={(e) => setFormData({ ...formData, codigoKifatex: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                placeholder="3559"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Razón Social *</label>
                        <input
                            type="text"
                            value={formData.razonSocial}
                            onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                            placeholder="Difare S.A."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Comercial *</label>
                        <input
                            type="text"
                            value={formData.nombreComercial}
                            onChange={(e) => setFormData({ ...formData, nombreComercial: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                            placeholder="Difare"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                            placeholder="contacto@difare.com"
                        />
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Supervisor</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.supervisorNombre}
                                    onChange={(e) => setFormData({ ...formData, supervisorNombre: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.supervisorEmail}
                                    onChange={(e) => setFormData({ ...formData, supervisorEmail: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-800 mb-3">Visitador</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.visitadorNombre}
                                    onChange={(e) => setFormData({ ...formData, visitadorNombre: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.visitadorEmail}
                                    onChange={(e) => setFormData({ ...formData, visitadorEmail: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                        <button
                            onClick={() => setShowModal(false)}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleGuardar}
                            disabled={!formData.codigoBago || !formData.codigoKifatex || !formData.razonSocial}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 disabled:opacity-50"
                        >
                            {selectedInterlocutor ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default TablaInterlocutores;
