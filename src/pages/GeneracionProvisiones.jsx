import React, { useState } from 'react';
import { Calculator, Download, Send, TrendingUp, FileSpreadsheet } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { provisiones, interlocutores } from '../data/mockData';

const GeneracionProvisiones = () => {
    const [provisionesData, setProvisionesData] = useState(provisiones);
    const [showModal, setShowModal] = useState(false);
    const [selectedProvision, setSelectedProvision] = useState(null);
    const [calculando, setCalculando] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({
        mes: '',
        fechaCorte: ''
    });

    const columns = [
        {
            header: 'Mes',
            accessor: (row) => row.mes
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
            header: 'Clientes',
            accessor: (row) => row.clientes.length
        },
        {
            header: 'Estado',
            accessor: (row) => <StatusBadge status={row.estado} />
        },
        {
            header: 'Fecha Generación',
            accessor: (row) => new Date(row.fechaGeneracion).toLocaleDateString('es-EC')
        },
        {
            header: 'Procesado Por',
            accessor: (row) => row.procesadoPor || '-'
        }
    ];

    const handleGenerarProvision = () => {
        if (!formData.mes || !formData.fechaCorte) return;

        setCalculando(true);

        // Simular cálculo
        setTimeout(() => {
            const nuevaProvision = {
                mes: formData.mes,
                valorTotal: Math.floor(Math.random() * 50000) + 30000,
                clientes: interlocutores.slice(0, 3).map(cliente => ({
                    cliente: cliente,
                    metodo: 'Promedio 3 meses',
                    mes1: Math.floor(Math.random() * 5000) + 2000,
                    mes2: Math.floor(Math.random() * 5000) + 2000,
                    mes3: Math.floor(Math.random() * 5000) + 2000,
                    valorProvisionado: Math.floor(Math.random() * 15000) + 6000
                })),
                estado: 'Generado',
                fechaGeneracion: new Date().toISOString().split('T')[0],
                procesadoPor: 'Usuario Sistema'
            };

            setProvisionesData([nuevaProvision, ...provisionesData]);
            setCalculando(false);
            setShowModal(false);
            setFormData({ mes: '', fechaCorte: '' });

            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
        }, 2000);
    };

    const handleDescargarExcel = (provision) => {
        // Simular descarga de Excel
        const csvContent = provision.clientes.map(c =>
            `${c.cliente.nombreComercial},${c.metodo},${c.mes1},${c.mes2},${c.mes3},${c.valorProvisionado}`
        ).join('\n');

        const blob = new Blob([`Cliente,Método,Mes 1,Mes 2,Mes 3,Provisión\n${csvContent}`], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Provision_${provision.mes}.csv`;
        a.click();
    };

    const handleEnviarContabilidad = (provision) => {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
        setShowModal(false);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
                    <Calculator className="w-5 h-5" />
                    <span>Provisión procesada exitosamente</span>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <Calculator className="w-8 h-8 text-pink-600" />
                        Generación de Provisiones
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Calcular y generar reporte de provisiones para cierre de mes
                    </p>
                </div>
                <button
                    onClick={() => {
                        setSelectedProvision(null);
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg"
                >
                    <Calculator className="w-5 h-5" />
                    Nueva Provisión
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Provisión Actual</p>
                            <p className="text-2xl font-bold text-green-600">
                                ${provisionesData[0]?.valorTotal.toLocaleString()}
                            </p>
                        </div>
                        <Calculator className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Estado</p>
                            <StatusBadge status={provisionesData[0]?.estado} />
                        </div>
                        <TrendingUp className="w-8 h-8 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Clientes</p>
                            <p className="text-2xl font-bold text-purple-600">{provisionesData[0]?.clientes.length}</p>
                        </div>
                        <Send className="w-8 h-8 text-purple-500" />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Mes</p>
                            <p className="text-xl font-bold text-pink-600">{provisionesData[0]?.mes}</p>
                        </div>
                        <Download className="w-8 h-8 text-pink-500" />
                    </div>
                </div>
            </div>

            {/* Tabla */}
            <DataTable
                columns={columns}
                data={provisionesData}
                onRowClick={(row) => {
                    setSelectedProvision(row);
                    setShowModal(true);
                }}
            />

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={selectedProvision ? 'Detalle de Provisión' : 'Nueva Provisión'}
                size="xl"
            >
                {selectedProvision ? (
                    // Vista de detalle
                    <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600">Mes</label>
                                <p className="font-medium">{selectedProvision.mes}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Valor Total</label>
                                <p className="font-semibold text-green-600 text-lg">${selectedProvision.valorTotal.toLocaleString()}</p>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Estado</label>
                                <StatusBadge status={selectedProvision.estado} />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Detalle por Cliente</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Cliente</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Método</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Mes 1</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Mes 2</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Mes 3</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Provisión</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {selectedProvision.clientes.map((cliente, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 text-sm">{cliente.cliente.nombreComercial}</td>
                                                <td className="px-4 py-2 text-sm">
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                                        {cliente.metodo}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-2 text-sm text-right">${cliente.mes1.toLocaleString()}</td>
                                                <td className="px-4 py-2 text-sm text-right">${cliente.mes2.toLocaleString()}</td>
                                                <td className="px-4 py-2 text-sm text-right">${cliente.mes3.toLocaleString()}</td>
                                                <td className="px-4 py-2 text-sm text-right font-semibold text-green-600">
                                                    ${cliente.valorProvisionado.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={() => handleDescargarExcel(selectedProvision)}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 flex items-center justify-center gap-2"
                            >
                                <Download className="w-5 h-5" />
                                Descargar Excel
                            </button>
                            <button
                                onClick={() => handleEnviarContabilidad(selectedProvision)}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Enviar a Contabilidad
                            </button>
                        </div>
                    </div>
                ) : (
                    // Formulario nueva provisión
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mes a Provisionar *</label>
                                <select
                                    value={formData.mes}
                                    onChange={(e) => setFormData({ ...formData, mes: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                >
                                    <option value="">Seleccionar mes...</option>
                                    <option value="2024-06">Junio 2024</option>
                                    <option value="2024-07">Julio 2024</option>
                                    <option value="2024-08">Agosto 2024</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Corte *</label>
                                <input
                                    type="date"
                                    value={formData.fechaCorte}
                                    onChange={(e) => setFormData({ ...formData, fechaCorte: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                />
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-800 mb-2">Métodos de Cálculo</h3>
                            <div className="space-y-2 text-sm text-blue-700">
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                                    <p><strong>Promedio 3 meses:</strong> Para clientes sin información</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                                    <p><strong>Valor estimado:</strong> Para promociones nuevas</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                                    <p><strong>Valor real:</strong> Si el cliente envió estado de cuenta</p>
                                </div>
                            </div>
                        </div>

                        {calculando && (
                            <div className="text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
                                <p className="mt-4 text-gray-600">Calculando provisiones...</p>
                            </div>
                        )}

                        <div className="flex gap-3 pt-4 border-t">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleGenerarProvision}
                                disabled={calculando || !formData.mes || !formData.fechaCorte}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <Calculator className="w-5 h-5" />
                                Generar Provisión
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default GeneracionProvisiones;
