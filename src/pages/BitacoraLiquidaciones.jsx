import React, { useState } from 'react';
import { FileText, History, Filter as FilterIcon, Download, Eye, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import DataTable from '../components/DataTable';
import FilterPanel from '../components/FilterPanel';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { liquidaciones } from '../data/mockData';

const BitacoraLiquidaciones = () => {
    const [selectedLiquidacion, setSelectedLiquidacion] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [historyData, setHistoryData] = useState(null);

    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleExportLiquidacion = (liquidacion) => {
        showNotification('Generando archivo de exportación...', 'info');
        setTimeout(() => {
            const content = `Liquidación: ${liquidacion.id}\nCliente: ${liquidacion.cliente.nombreComercial}\nValor: $${liquidacion.valorTotal}`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Liquidacion_${liquidacion.id}.txt`;
            a.click();
            showNotification('Archivo exportado exitosamente', 'success');
        }, 1000);
    };

    const handleShowHistory = (liquidacion) => {
        // Generar historial simulado
        const history = [
            {
                fecha: new Date(liquidacion.fechaCreacion).toLocaleString('es-EC'),
                usuario: liquidacion.analista,
                accion: 'Creación',
                detalle: 'Liquidación creada',
                valorAnterior: '-',
                valorNuevo: `$${liquidacion.valorTotal.toLocaleString()}`
            },
            {
                fecha: new Date(new Date(liquidacion.fechaCreacion).getTime() + 86400000).toLocaleString('es-EC'),
                usuario: liquidacion.analista,
                accion: 'Validación',
                detalle: 'Productos validados',
                valorAnterior: '-',
                valorNuevo: `${liquidacion.productos.length} productos`
            },
            {
                fecha: new Date(new Date(liquidacion.fechaCreacion).getTime() + 172800000).toLocaleString('es-EC'),
                usuario: liquidacion.supervisor,
                accion: 'Aprobación',
                detalle: 'Estado cambiado',
                valorAnterior: 'En Revisión',
                valorNuevo: liquidacion.estado
            }
        ];

        setHistoryData({ liquidacion, history });
        setShowHistoryModal(true);
    };

    const handleDownloadDocument = (docName) => {
        showNotification(`Descargando ${docName}...`, 'info');
        setTimeout(() => {
            showNotification(`${docName} descargado exitosamente`, 'success');
        }, 1000);
    };

    const handleExportPDF = () => {
        if (!selectedLiquidacion) return;
        showNotification('Generando PDF...', 'info');
        setTimeout(() => {
            showNotification(`PDF de ${selectedLiquidacion.id} generado exitosamente`, 'success');
        }, 1500);
    };

    const filters = [
        {
            key: 'año',
            label: 'Año',
            type: 'select',
            options: [
                { value: '2024', label: '2024' },
                { value: '2023', label: '2023' }
            ]
        },
        {
            key: 'mes',
            label: 'Mes',
            type: 'select',
            options: [
                { value: '05', label: 'Mayo' },
                { value: '04', label: 'Abril' },
                { value: '03', label: 'Marzo' }
            ]
        },
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
            key: 'estado',
            label: 'Estado',
            type: 'select',
            options: [
                { value: 'Borrador', label: 'Borrador' },
                { value: 'En Revisión', label: 'En Revisión' },
                { value: 'Aprobado', label: 'Aprobado' },
                { value: 'Enviado a Facturación', label: 'Enviado a Facturación' },
                { value: 'NC Generada', label: 'NC Generada' }
            ]
        },
        {
            key: 'analista',
            label: 'Analista',
            type: 'text'
        }
    ];

    const columns = [
        {
            header: 'Nº Liquidación',
            accessor: (row) => (
                <span className="font-mono font-medium text-pink-600">{row.id}</span>
            )
        },
        {
            header: 'Fecha',
            accessor: (row) => new Date(row.fechaCreacion).toLocaleDateString('es-EC')
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
                    ${row.valorTotal.toLocaleString()}
                </span>
            )
        },
        {
            header: 'Estado',
            accessor: (row) => <StatusBadge status={row.estado} />
        },
        {
            header: 'Analista',
            accessor: (row) => row.analista
        },
        {
            header: 'Acciones',
            accessor: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLiquidacion(row);
                            setShowModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Ver detalle"
                    >
                        <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleExportLiquidacion(row);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Exportar"
                    >
                        <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleShowHistory(row);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Historial"
                    >
                        <History className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            )
        }
    ];

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
            <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-pink-600" />
                    Bitácora de Liquidaciones
                </h1>
                <p className="text-gray-600 mt-1">
                    Repositorio histórico de todas las liquidaciones
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Liquidaciones</p>
                            <p className="text-2xl font-bold text-purple-600">{liquidaciones.length}</p>
                        </div>
                        <FileText className="w-8 h-8 text-purple-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Valor Total</p>
                            <p className="text-2xl font-bold text-green-600">
                                ${liquidaciones.reduce((sum, l) => sum + l.valorTotal, 0).toLocaleString()}
                            </p>
                        </div>
                        <Download className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Aprobadas</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {liquidaciones.filter(l => l.estado === 'Aprobado' || l.estado === 'Enviado a Facturación').length}
                            </p>
                        </div>
                        <History className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Este Mes</p>
                            <p className="text-2xl font-bold text-pink-600">
                                {liquidaciones.filter(l => l.periodo === '2024-05').length}
                            </p>
                        </div>
                        <FilterIcon className="w-8 h-8 text-pink-500" />
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
                data={liquidaciones}
                onRowClick={(row) => {
                    setSelectedLiquidacion(row);
                    setShowModal(true);
                }}
            />

            {/* Modal Detalle */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Detalle de Liquidación"
                size="xl"
            >
                {selectedLiquidacion && (
                    <div className="space-y-6">
                        {/* Información General */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600">Nº Liquidación</label>
                                <p className="font-mono font-medium text-pink-600">{selectedLiquidacion.id}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Nº Interno</label>
                                <p className="font-medium">{selectedLiquidacion.numeroInterno}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Estado</label>
                                <StatusBadge status={selectedLiquidacion.estado} />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Cliente</label>
                                <p className="font-medium">{selectedLiquidacion.cliente.nombreComercial}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Tipo de Promoción</label>
                                <p className="font-medium">{selectedLiquidacion.tipoPromocion}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Período</label>
                                <p className="font-medium">{selectedLiquidacion.periodo}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Analista</label>
                                <p className="font-medium">{selectedLiquidacion.analista}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Supervisor</label>
                                <p className="font-medium">{selectedLiquidacion.supervisor}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Fecha Creación</label>
                                <p className="font-medium">{new Date(selectedLiquidacion.fechaCreacion).toLocaleDateString('es-EC')}</p>
                            </div>
                        </div>

                        {/* Productos */}
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Detalle de Productos</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Código</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Producto</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Unidades</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Valor Unit.</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {selectedLiquidacion.productos.map((producto, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 text-sm">{producto.codigo}</td>
                                                <td className="px-4 py-2 text-sm">{producto.nombre}</td>
                                                <td className="px-4 py-2 text-sm text-right">{producto.unidadesAprobadas}</td>
                                                <td className="px-4 py-2 text-sm text-right">${producto.valorUnitario}</td>
                                                <td className="px-4 py-2 text-sm text-right font-medium">${producto.valorTotal.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td colSpan="4" className="px-4 py-2 text-right font-semibold">Total:</td>
                                            <td className="px-4 py-2 text-right font-bold text-lg text-green-600">
                                                ${selectedLiquidacion.valorTotal.toLocaleString()}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {/* Documentos */}
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Documentos Adjuntos</h3>
                            <div className="space-y-2">
                                {selectedLiquidacion.documentos.map((doc, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm">{doc}</span>
                                        </div>
                                        <button
                                            onClick={() => handleDownloadDocument(doc)}
                                            className="text-sm text-pink-600 hover:text-pink-700"
                                        >
                                            Descargar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Observaciones */}
                        {selectedLiquidacion.observaciones && (
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Observaciones</h3>
                                <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                    {selectedLiquidacion.observaciones}
                                </p>
                            </div>
                        )}

                        {/* Acciones */}
                        <div className="flex gap-3 pt-4 border-t">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={handleExportPDF}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                Exportar PDF
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* History Modal */}
            <Modal
                isOpen={showHistoryModal}
                onClose={() => setShowHistoryModal(false)}
                title="Historial de Cambios"
                size="lg"
            >
                {historyData && (
                    <div className="space-y-4">
                        {/* Liquidation Info */}
                        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <span className="text-xs text-gray-600">Liquidación:</span>
                                    <p className="font-mono font-bold text-pink-700">{historyData.liquidacion.id}</p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-600">Cliente:</span>
                                    <p className="font-medium text-gray-900">{historyData.liquidacion.cliente.nombreComercial}</p>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <History className="w-4 h-4" />
                                Línea de Tiempo
                            </h3>
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                                {/* Timeline items */}
                                <div className="space-y-4">
                                    {historyData.history.map((item, index) => (
                                        <div key={index} className="relative pl-10">
                                            {/* Timeline dot */}
                                            <div className="absolute left-2.5 top-1.5 w-3 h-3 bg-pink-500 rounded-full border-2 border-white shadow"></div>

                                            {/* Content */}
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{item.accion}</p>
                                                        <p className="text-xs text-gray-500">{item.fecha}</p>
                                                    </div>
                                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                                        {item.usuario}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-2">{item.detalle}</p>
                                                {item.valorAnterior !== '-' && (
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <span className="text-gray-500">Anterior:</span>
                                                        <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded">{item.valorAnterior}</span>
                                                        <span className="text-gray-400">→</span>
                                                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">{item.valorNuevo}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end pt-4 border-t">
                            <button
                                onClick={() => setShowHistoryModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default BitacoraLiquidaciones;
