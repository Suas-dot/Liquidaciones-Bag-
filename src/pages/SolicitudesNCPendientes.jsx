import React, { useState } from 'react';
import { ClipboardCheck, CheckSquare, XSquare, Send, FileText, Download, AlertCircle } from 'lucide-react';
import DataTable from '../components/DataTable';
import FilterPanel from '../components/FilterPanel';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { notasCredito, liquidaciones } from '../data/mockData';

const SolicitudesNCPendientes = () => {
    const [solicitudes, setSolicitudes] = useState(
        notasCredito.filter(nc => nc.estado === 'Pendiente Aprobación')
    );
    const [selectedRows, setSelectedRows] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNC, setSelectedNC] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [messageType, setMessageType] = useState('success'); // 'success', 'warning', 'error'

    const filters = [
        {
            key: 'cliente',
            label: 'Cliente',
            type: 'text'
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
            key: 'valorMin',
            label: 'Valor Mínimo',
            type: 'number',
            placeholder: '0'
        },
        {
            key: 'valorMax',
            label: 'Valor Máximo',
            type: 'number',
            placeholder: '100000'
        }
    ];

    const columns = [
        {
            header: 'Nº Liquidación',
            accessor: (row) => (
                <span className="font-mono font-medium text-pink-600">
                    {row.liquidacion.id}
                </span>
            )
        },
        {
            header: 'Nº Interno',
            accessor: (row) => row.numeroInterno
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
            header: 'Valor Total',
            accessor: (row) => (
                <span className="font-semibold text-green-600">
                    ${row.valor.toLocaleString()}
                </span>
            )
        },
        {
            header: 'Fecha Solicitud',
            accessor: (row) => new Date(row.liquidacion.fechaCreacion).toLocaleDateString('es-EC')
        },
        {
            header: 'Analista',
            accessor: (row) => row.liquidacion.analista
        },
        {
            header: 'Factura Ref.',
            accessor: (row) => row.facturaReferencia || (
                <span className="text-yellow-600 text-xs">Pendiente búsqueda</span>
            )
        }
    ];

    const handleAprobarSeleccionadas = () => {
        if (selectedRows.length === 0) {
            setSuccessMessage('Por favor, selecciona al menos una solicitud para aprobar');
            setMessageType('warning');
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
            return;
        }

        // Filter out the selected rows by comparing IDs
        const updated = solicitudes.filter(s => !selectedRows.includes(s.id));
        setSolicitudes(updated);
        setSelectedRows([]);

        setSuccessMessage(`${selectedRows.length} solicitud(es) aprobada(s) y enviada(s) a SAP`);
        setMessageType('success');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const handleRechazarSeleccionadas = () => {
        if (selectedRows.length === 0) {
            setSuccessMessage('Por favor, selecciona al menos una solicitud para rechazar');
            setMessageType('warning');
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
            return;
        }

        // Filter out the selected rows by comparing IDs
        const updated = solicitudes.filter(s => !selectedRows.includes(s.id));
        setSolicitudes(updated);
        setSelectedRows([]);

        setSuccessMessage(`${selectedRows.length} solicitud(es) rechazada(s)`);
        setMessageType('success');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const handleAprobarIndividual = () => {
        const updated = solicitudes.filter(s => s.numeroInterno !== selectedNC.numeroInterno);
        setSolicitudes(updated);
        setShowModal(false);

        setSuccessMessage('NC aprobada y enviada a SAP');
        setMessageType('success');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const handleRechazarIndividual = () => {
        const updated = solicitudes.filter(s => s.numeroInterno !== selectedNC.numeroInterno);
        setSolicitudes(updated);
        setShowModal(false);

        setSuccessMessage('NC rechazada');
        setMessageType('success');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    const handleDescargarTXT = () => {
        if (!selectedNC) return;

        const txtContent = `HEADER|${selectedNC.numeroInterno}|${selectedNC.cliente.codigoBago}|${new Date().toISOString().split('T')[0]}
ITEM|${selectedNC.liquidacion.productos[0]?.codigo}|${selectedNC.liquidacion.productos[0]?.unidadesAprobadas}|${selectedNC.liquidacion.productos[0]?.valorTotal}
FOOTER|${selectedNC.valor}|${selectedNC.condicionDescuento}`;

        const blob = new Blob([txtContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `NC_${selectedNC.numeroInterno}_${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
    };

    return (
        <div className="p-6 space-y-6">
            {/* Notification Message */}
            {showSuccessMessage && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in ${messageType === 'success' ? 'bg-green-500 text-white' :
                    messageType === 'warning' ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                    }`}>
                    {messageType === 'success' && <CheckSquare className="w-5 h-5" />}
                    {messageType === 'warning' && <AlertCircle className="w-5 h-5" />}
                    {messageType === 'error' && <XSquare className="w-5 h-5" />}
                    <span>{successMessage}</span>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <ClipboardCheck className="w-8 h-8 text-pink-600" />
                        Solicitudes de NC Pendientes
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Revisar y aprobar solicitudes de notas de crédito antes de generar en SAP
                    </p>
                </div>
                {selectedRows.length > 0 && (
                    <div className="flex gap-3">
                        <button
                            onClick={handleRechazarSeleccionadas}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            <XSquare className="w-5 h-5" />
                            Rechazar ({selectedRows.length})
                        </button>
                        <button
                            onClick={handleAprobarSeleccionadas}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800"
                        >
                            <CheckSquare className="w-5 h-5" />
                            Aprobar ({selectedRows.length})
                        </button>
                    </div>
                )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pendientes Aprobación</p>
                            <p className="text-2xl font-bold text-yellow-600">{solicitudes.length}</p>
                        </div>
                        <ClipboardCheck className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Valor Total</p>
                            <p className="text-2xl font-bold text-green-600">
                                ${solicitudes.reduce((sum, s) => sum + s.valor, 0).toLocaleString()}
                            </p>
                        </div>
                        <FileText className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Seleccionadas</p>
                            <p className="text-2xl font-bold text-pink-600">{selectedRows.length}</p>
                        </div>
                        <CheckSquare className="w-8 h-8 text-pink-500" />
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
                data={solicitudes}
                selectable={true}
                onSelectionChange={setSelectedRows}
                onRowClick={(row) => {
                    setSelectedNC(row);
                    setShowModal(true);
                }}
            />

            {/* Modal Detalle */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Detalle de Solicitud de NC"
                size="xl"
            >
                {selectedNC && (
                    <div className="space-y-6">
                        {/* Información General */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3">Información General</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600">Nº Liquidación</label>
                                    <p className="font-mono font-medium text-pink-600">{selectedNC.liquidacion.id}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Nº Interno Control</label>
                                    <p className="font-medium">{selectedNC.numeroInterno}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Cliente</label>
                                    <p className="font-medium">{selectedNC.cliente.nombreComercial}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Tipo de Promoción</label>
                                    <p className="font-medium">{selectedNC.tipoPromocion}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Valor Total</label>
                                    <p className="font-semibold text-green-600 text-lg">${selectedNC.valor.toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Analista</label>
                                    <p className="font-medium">{selectedNC.liquidacion.analista}</p>
                                </div>
                            </div>
                        </div>

                        {/* Campos para NC (prellenados) */}
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Datos para Generación de NC</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Condición de Descuento</label>
                                    <input
                                        type="text"
                                        value={selectedNC.condicionDescuento}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Motivo de Rechazo</label>
                                    <input
                                        type="text"
                                        value={selectedNC.motivoRechazo}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Clase de Documento</label>
                                    <input
                                        type="text"
                                        value="18 - Factura"
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Factura de Referencia</label>
                                    <input
                                        type="text"
                                        value={selectedNC.facturaReferencia || 'Búsqueda automática pendiente'}
                                        readOnly
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Productos */}
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Detalle de Productos</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Código SAP</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Producto</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Cantidad</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {selectedNC.liquidacion.productos.map((producto, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 text-sm">{producto.codigo}</td>
                                                <td className="px-4 py-2 text-sm">{producto.nombre}</td>
                                                <td className="px-4 py-2 text-sm text-right">{producto.unidadesAprobadas}</td>
                                                <td className="px-4 py-2 text-sm text-right">${producto.valorTotal.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Vista Previa del TXT */}
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-gray-400">Vista previa del TXT para SAP:</p>
                                <button
                                    onClick={handleDescargarTXT}
                                    className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-white"
                                >
                                    <Download className="w-3 h-3" />
                                    Descargar TXT
                                </button>
                            </div>
                            <pre className="whitespace-pre-wrap">
                                {`HEADER|${selectedNC.numeroInterno}|${selectedNC.cliente.codigoBago}|${new Date().toISOString().split('T')[0]}
ITEM|${selectedNC.liquidacion.productos[0]?.codigo}|${selectedNC.liquidacion.productos[0]?.unidadesAprobadas}|${selectedNC.liquidacion.productos[0]?.valorTotal}
FOOTER|${selectedNC.valor}|${selectedNC.condicionDescuento}`}
                            </pre>
                        </div>

                        {/* Acciones */}
                        <div className="flex gap-3 pt-4 border-t">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={handleRechazarIndividual}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                            >
                                <XSquare className="w-5 h-5" />
                                Rechazar
                            </button>
                            <button
                                onClick={handleAprobarIndividual}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Aprobar y Generar NC
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default SolicitudesNCPendientes;
