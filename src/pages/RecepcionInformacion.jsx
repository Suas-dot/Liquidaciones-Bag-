import React, { useState } from 'react';
import { Inbox, Upload, Mail, FileText, User, Calendar, AlertCircle } from 'lucide-react';
import DataTable from '../components/DataTable';
import FilterPanel from '../components/FilterPanel';
import FileUpload from '../components/FileUpload';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { recepcionInformacion, interlocutores } from '../data/mockData';

const RecepcionInformacion = () => {
    const [recepciones, setRecepciones] = useState(recepcionInformacion);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecepcion, setSelectedRecepcion] = useState(null);
    const [formData, setFormData] = useState({
        cliente: '',
        tipoPromocion: '',
        metodoEnvio: '',
        observaciones: '',
        archivos: []
    });

    const filters = [
        {
            key: 'estado',
            label: 'Estado',
            type: 'select',
            options: [
                { value: 'Pendiente Validación', label: 'Pendiente Validación' },
                { value: 'En Proceso', label: 'En Proceso' },
                { value: 'Validado', label: 'Validado' },
                { value: 'Rechazado', label: 'Rechazado' }
            ]
        },
        {
            key: 'tipoPromocion',
            label: 'Tipo de Promoción',
            type: 'select',
            options: [
                { value: 'PMC', label: 'PMC' },
                { value: 'Cupones', label: 'Cupones' },
                { value: 'Rebates', label: 'Rebates' },
                { value: 'ACOAI', label: 'ACOAI' }
            ]
        },
        {
            key: 'fechaRecepcion',
            label: 'Fecha de Recepción',
            type: 'daterange'
        },
        {
            key: 'asignadoA',
            label: 'Asignado A',
            type: 'text'
        }
    ];

    const columns = [
        {
            header: 'ID',
            accessor: (row) => row.id
        },
        {
            header: 'Cliente',
            accessor: (row) => row.cliente.nombreComercial
        },
        {
            header: 'Tipo Promoción',
            accessor: (row) => (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {row.tipoPromocion}
                </span>
            )
        },
        {
            header: 'Fecha Recepción',
            accessor: (row) => new Date(row.fechaRecepcion).toLocaleDateString('es-EC')
        },
        {
            header: 'Método',
            accessor: (row) => row.metodoEnvio
        },
        {
            header: 'Archivos',
            accessor: (row) => (
                <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{row.archivos.length}</span>
                </div>
            )
        },
        {
            header: 'Estado',
            accessor: (row) => <StatusBadge status={row.estado} />
        },
        {
            header: 'Asignado A',
            accessor: (row) => (
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{row.asignadoA}</span>
                </div>
            )
        }
    ];

    const handleNuevaRecepcion = () => {
        setSelectedRecepcion(null);
        setFormData({
            cliente: '',
            tipoPromocion: '',
            metodoEnvio: '',
            observaciones: '',
            archivos: []
        });
        setShowModal(true);
    };

    const handleGuardar = () => {
        const nuevaRecepcion = {
            id: `REC-${String(recepciones.length + 1).padStart(3, '0')}`,
            cliente: interlocutores.find(c => c.id === formData.cliente),
            tipoPromocion: formData.tipoPromocion,
            fechaRecepcion: new Date().toISOString().split('T')[0],
            metodoEnvio: formData.metodoEnvio,
            archivos: formData.archivos.map(f => f.name),
            estado: 'Pendiente Validación',
            asignadoA: 'Maria Augusta',
            observaciones: formData.observaciones
        };

        setRecepciones([nuevaRecepcion, ...recepciones]);
        setShowModal(false);
        setFormData({
            cliente: '',
            tipoPromocion: '',
            metodoEnvio: '',
            observaciones: '',
            archivos: []
        });
    };

    const handleIniciarValidacion = () => {
        const updated = recepciones.map(r =>
            r.id === selectedRecepcion.id
                ? { ...r, estado: 'En Proceso' }
                : r
        );
        setRecepciones(updated);
        setShowModal(false);

        setSuccessMessage(`Validación iniciada para ${selectedRecepcion.id}`);
        setMessageType('success');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const handleRechazar = () => {
        const updated = recepciones.map(r =>
            r.id === selectedRecepcion.id
                ? { ...r, estado: 'Rechazado' }
                : r
        );
        setRecepciones(updated);
        setShowModal(false);

        setSuccessMessage(`Recepción ${selectedRecepcion.id} rechazada`);
        setMessageType('success');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <Inbox className="w-8 h-8 text-pink-600" />
                        Recepción de Información
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Registra la información enviada por farmacias y cadenas
                    </p>
                </div>
                <button
                    onClick={handleNuevaRecepcion}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg"
                >
                    <Upload className="w-5 h-5" />
                    Nueva Recepción
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pendientes</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {recepciones.filter(r => r.estado === 'Pendiente Validación').length}
                            </p>
                        </div>
                        <AlertCircle className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">En Proceso</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {recepciones.filter(r => r.estado === 'En Proceso').length}
                            </p>
                        </div>
                        <Calendar className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Validados</p>
                            <p className="text-2xl font-bold text-green-600">
                                {recepciones.filter(r => r.estado === 'Validado').length}
                            </p>
                        </div>
                        <FileText className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Mes</p>
                            <p className="text-2xl font-bold text-purple-600">{recepciones.length}</p>
                        </div>
                        <Inbox className="w-8 h-8 text-purple-500" />
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
                data={recepciones}
                onRowClick={(row) => {
                    setSelectedRecepcion(row);
                    setShowModal(true);
                }}
            />

            {/* Modal Nueva/Editar Recepción */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={selectedRecepcion ? 'Detalle de Recepción' : 'Nueva Recepción'}
                size="lg"
            >
                {selectedRecepcion ? (
                    // Vista de detalle
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                                <p className="text-gray-900">{selectedRecepcion.id}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                                <p className="text-gray-900">{selectedRecepcion.cliente.nombreComercial}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Promoción</label>
                                <p className="text-gray-900">{selectedRecepcion.tipoPromocion}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Recepción</label>
                                <p className="text-gray-900">{new Date(selectedRecepcion.fechaRecepcion).toLocaleDateString('es-EC')}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Método de Envío</label>
                                <p className="text-gray-900">{selectedRecepcion.metodoEnvio}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                                <StatusBadge status={selectedRecepcion.estado} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Archivos Adjuntos</label>
                            <div className="space-y-2">
                                {selectedRecepcion.archivos.map((archivo, index) => (
                                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                        <FileText className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm">{archivo}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
                            <p className="text-gray-900">{selectedRecepcion.observaciones}</p>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={handleRechazar}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Rechazar
                            </button>
                            <button
                                onClick={handleIniciarValidacion}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700"
                            >
                                Iniciar Validación
                            </button>
                        </div>
                    </div>
                ) : (
                    // Formulario nueva recepción
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
                                <select
                                    value={formData.cliente}
                                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                >
                                    <option value="">Seleccionar cliente...</option>
                                    {interlocutores.filter(i => i.estado === 'Activo').map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.nombreComercial} ({cliente.codigoBago})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Promoción *</label>
                                <select
                                    value={formData.tipoPromocion}
                                    onChange={(e) => setFormData({ ...formData, tipoPromocion: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                >
                                    <option value="">Seleccionar tipo...</option>
                                    <option value="PMC">PMC</option>
                                    <option value="Cupones">Cupones</option>
                                    <option value="Rebates">Rebates</option>
                                    <option value="ACOAI">ACOAI</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Método de Envío *</label>
                            <select
                                value={formData.metodoEnvio}
                                onChange={(e) => setFormData({ ...formData, metodoEnvio: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                            >
                                <option value="">Seleccionar método...</option>
                                <option value="Email">Email</option>
                                <option value="Físico">Físico</option>
                                <option value="Portal">Portal</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Archivos Adjuntos *</label>
                            <FileUpload
                                onFileSelect={(files) => setFormData({ ...formData, archivos: files })}
                                multiple={true}
                                accept=".pdf,.xlsx,.xls,.jpg,.png"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
                            <textarea
                                value={formData.observaciones}
                                onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                placeholder="Observaciones adicionales..."
                            />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleGuardar}
                                disabled={!formData.cliente || !formData.tipoPromocion || !formData.metodoEnvio}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Guardar y Asignar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default RecepcionInformacion;
