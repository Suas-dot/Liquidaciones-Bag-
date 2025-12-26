import React, { useState } from 'react';
import { FileCheck, CheckCircle, XCircle, AlertTriangle, TrendingUp, Download } from 'lucide-react';
import DataTable from '../components/DataTable';
import FilterPanel from '../components/FilterPanel';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { liquidaciones } from '../data/mockData';

const ValidacionCondiciones = () => {
    const [liquidacionesData, setLiquidacionesData] = useState(
        liquidaciones.filter(l => l.estado === 'Pendiente Validación' || l.estado === 'En Proceso')
    );
    const [selectedLiquidacion, setSelectedLiquidacion] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [validationChecks, setValidationChecks] = useState({
        clienteEnPromocion: false,
        productosCorresponden: false,
        periodoValido: false,
        volumenCumple: false,
        documentacionCompleta: false
    });
    const [comentarios, setComentarios] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successType, setSuccessType] = useState('');

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
            key: 'periodo',
            label: 'Período',
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
            header: 'Período',
            accessor: (row) => row.periodo
        },
        {
            header: 'Valor Reclamado',
            accessor: (row) => `$${row.valorTotal.toLocaleString()}`
        },
        {
            header: 'Productos',
            accessor: (row) => row.productos.length
        },
        {
            header: 'Estado',
            accessor: (row) => <StatusBadge status={row.estado} />
        },
        {
            header: 'Analista',
            accessor: (row) => row.analista
        }
    ];

    const handleValidar = (decision) => {
        if (decision === 'aprobar') {
            const allChecked = Object.values(validationChecks).every(v => v);
            if (!allChecked) {
                return;
            }

            const updated = liquidacionesData.filter(l => l.id !== selectedLiquidacion.id);
            setLiquidacionesData(updated);
            setSuccessType('aprobada');
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);

            setValidationChecks({
                clienteEnPromocion: false,
                productosCorresponden: false,
                periodoValido: false,
                volumenCumple: false,
                documentacionCompleta: false
            });
            setComentarios('');
        } else {
            const updated = liquidacionesData.filter(l => l.id !== selectedLiquidacion.id);
            setLiquidacionesData(updated);
            setSuccessType('rechazada');
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
            setComentarios('');
        }
        setShowModal(false);
    };

    const handleExportarReporte = () => {
        const csvContent = liquidacionesData.map(l =>
            `${l.id},${l.cliente.nombreComercial},${l.tipoPromocion},${l.periodo},${l.valorTotal},${l.estado}`
        ).join('\n');

        const blob = new Blob([`ID,Cliente,Tipo,Período,Valor,Estado\n${csvContent}`], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `validaciones_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="p-6 space-y-6">
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
                    <CheckCircle className="w-5 h-5" />
                    <span>Liquidación {successType} exitosamente</span>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FileCheck className="w-8 h-8 text-pink-600" />
                        Validación de Condiciones
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Valida que la información del cliente cumpla con las condiciones de la promoción
                    </p>
                </div>
                <button
                    onClick={handleExportarReporte}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                    <Download className="w-5 h-5" />
                    Exportar Reporte
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pendientes Validación</p>
                            <p className="text-2xl font-bold text-yellow-600">
                                {liquidacionesData.filter(l => l.estado === 'Pendiente Validación').length}
                            </p>
                        </div>
                        <AlertTriangle className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">En Proceso</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {liquidacionesData.filter(l => l.estado === 'En Proceso').length}
                            </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Valor Total</p>
                            <p className="text-2xl font-bold text-purple-600">
                                ${liquidacionesData.reduce((sum, l) => sum + l.valorTotal, 0).toLocaleString()}
                            </p>
                        </div>
                        <FileCheck className="w-8 h-8 text-purple-500" />
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
                data={liquidacionesData}
                onRowClick={(row) => {
                    setSelectedLiquidacion(row);
                    setShowModal(true);
                }}
            />

            {/* Modal de Validación */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Validación de Condiciones"
                size="xl"
            >
                {selectedLiquidacion && (
                    <div className="space-y-6">
                        {/* Información General */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3">Información General</h3>
                            <div className="grid grid-cols-3 gap-4">
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
                            </div>
                        </div>

                        {/* Checklist de Validación */}
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Checklist de Validación</h3>
                            <div className="space-y-3">
                                {[
                                    { key: 'clienteEnPromocion', label: 'Cliente está en la promoción' },
                                    { key: 'productosCorresponden', label: 'Productos corresponden' },
                                    { key: 'periodoValido', label: 'Período de compra es válido' },
                                    { key: 'volumenCumple', label: 'Volumen/unidades cumplen mínimos' },
                                    { key: 'documentacionCompleta', label: 'Documentación completa (facturas, cupones, etc.)' }
                                ].map(check => (
                                    <label key={check.key} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={validationChecks[check.key]}
                                            onChange={(e) => setValidationChecks({
                                                ...validationChecks,
                                                [check.key]: e.target.checked
                                            })}
                                            className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                        />
                                        <span className="flex-1">{check.label}</span>
                                        {validationChecks[check.key] && (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        )}
                                    </label>
                                ))}
                            </div>

                            {!Object.values(validationChecks).every(v => v) && (
                                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                                    Complete todas las validaciones para poder aprobar
                                </div>
                            )}
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
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Reclamado</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Aprobado</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Valor Unit.</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {selectedLiquidacion.productos.map((producto, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 text-sm">{producto.codigo}</td>
                                                <td className="px-4 py-2 text-sm">{producto.nombre}</td>
                                                <td className="px-4 py-2 text-sm text-right">{producto.unidadesReclamadas}</td>
                                                <td className="px-4 py-2 text-sm text-right font-medium">{producto.unidadesAprobadas}</td>
                                                <td className="px-4 py-2 text-sm text-right">${producto.valorUnitario}</td>
                                                <td className="px-4 py-2 text-sm text-right font-medium">${producto.valorTotal.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td colSpan="5" className="px-4 py-2 text-right font-semibold">Total:</td>
                                            <td className="px-4 py-2 text-right font-bold text-lg">
                                                ${selectedLiquidacion.valorTotal.toLocaleString()}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {/* Diferencias Detectadas */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                Diferencias Detectadas
                            </h3>
                            <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                                <li>Producto A: 5 unidades rechazadas (no cumplen período de compra)</li>
                            </ul>
                        </div>

                        {/* Comentarios */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Comentarios</label>
                            <textarea
                                value={comentarios}
                                onChange={(e) => setComentarios(e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                placeholder="Agregar comentarios sobre la validación..."
                            />
                        </div>

                        {/* Acciones */}
                        <div className="flex gap-3 pt-4 border-t">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleValidar('rechazar')}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                            >
                                <XCircle className="w-5 h-5" />
                                Rechazar
                            </button>
                            <button
                                onClick={() => handleValidar('aprobar')}
                                disabled={!Object.values(validationChecks).every(v => v)}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CheckCircle className="w-5 h-5" />
                                Aprobar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ValidacionCondiciones;
