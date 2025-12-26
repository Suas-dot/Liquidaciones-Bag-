import React, { useState, useRef } from 'react';
import {
    Search,
    Upload,
    Download,
    Plus,
    Trash2,
    Edit2,
    Database,
    FileSpreadsheet,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Modal from '../components/ui/Modal';

const CatalogManagement = () => {
    const [selectedClient, setSelectedClient] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [uploadStatus, setUploadStatus] = useState(null);
    const fileInputRef = useRef(null);

    const [newRelationData, setNewRelationData] = useState({
        clientProduct: '',
        bagoCode: '',
        productName: ''
    });

    // Mock Data - Extended for pagination demo
    const [mappings, setMappings] = useState([
        { id: 1, clientCode: 'C001', clientProduct: '78910', bagoProduct: 'BG-1020', name: 'Neurobion Ampolla x3' },
        { id: 2, clientCode: 'C001', clientProduct: '78911', bagoProduct: 'BG-1021', name: 'Neurobion Tabletas x10' },
        { id: 3, clientCode: 'C001', clientProduct: '78955', bagoProduct: 'BG-5001', name: 'Migradorixina x20' },
        { id: 4, clientCode: 'C001', clientProduct: '78999', bagoProduct: 'BG-3030', name: 'Bagonax Suspensión' },
        { id: 5, clientCode: 'C001', clientProduct: '79001', bagoProduct: 'BG-2010', name: 'Aspirina 500mg x24' },
        { id: 6, clientCode: 'C002', clientProduct: '79002', bagoProduct: 'BG-2011', name: 'Paracetamol 500mg x20' },
        { id: 7, clientCode: 'C002', clientProduct: '79003', bagoProduct: 'BG-2012', name: 'Ibuprofeno 400mg x30' },
        { id: 8, clientCode: 'C003', clientProduct: '79004', bagoProduct: 'BG-3001', name: 'Amoxicilina 500mg x12' },
        { id: 9, clientCode: 'C003', clientProduct: '79005', bagoProduct: 'BG-3002', name: 'Cefalexina 500mg x14' },
        { id: 10, clientCode: 'C001', clientProduct: '79006', bagoProduct: 'BG-4001', name: 'Omeprazol 20mg x28' },
        { id: 11, clientCode: 'C001', clientProduct: '79007', bagoProduct: 'BG-4002', name: 'Losartán 50mg x30' },
        { id: 12, clientCode: 'C002', clientProduct: '79008', bagoProduct: 'BG-5002', name: 'Metformina 850mg x60' },
    ]);

    // File upload handler
    const handleFileUpload = (event) => {
        const file = event?.target?.files?.[0];
        if (!file) return;

        setUploadStatus('processing');

        // Simulate file processing
        setTimeout(() => {
            const mockNewRecords = [
                { id: Date.now(), clientCode: selectedClient || 'C001', clientProduct: '99001', bagoProduct: 'BG-9001', name: 'Producto Importado 1' },
                { id: Date.now() + 1, clientCode: selectedClient || 'C001', clientProduct: '99002', bagoProduct: 'BG-9002', name: 'Producto Importado 2' },
                { id: Date.now() + 2, clientCode: selectedClient || 'C001', clientProduct: '99003', bagoProduct: 'BG-9003', name: 'Producto Importado 3' },
            ];

            setMappings([...mockNewRecords, ...mappings]);
            setUploadStatus('success');

            setTimeout(() => setUploadStatus(null), 3000);
        }, 1500);
    };

    const handleDownloadTemplate = () => {
        // Create CSV template
        const template = `Código Cliente,Código Bagó,Nombre Producto
78910,BG-1020,Neurobion Ampolla x3
78911,BG-1021,Neurobion Tabletas x10`;

        const blob = new Blob([template], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Plantilla_Homologacion.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleNewRelation = () => {
        setNewRelationData({ clientProduct: '', bagoCode: '', productName: '' });
        setIsModalOpen(true);
    };

    const handleSaveRelation = () => {
        if (!newRelationData.clientProduct || !newRelationData.bagoCode) {
            alert("Por favor complete los códigos.");
            return;
        }
        const newMapping = {
            id: Date.now(),
            clientCode: selectedClient || 'GENERIC',
            clientProduct: newRelationData.clientProduct,
            bagoProduct: newRelationData.bagoCode,
            name: newRelationData.productName || 'Producto Nuevo (Sin Nombre)'
        };
        setMappings([newMapping, ...mappings]);
        setIsModalOpen(false);
    };

    const handleExport = () => {
        // Export to CSV
        const headers = ['Código Cliente', 'Código Bagó', 'Nombre Producto'];
        const rows = filteredMappings.map(m => [m.clientProduct, m.bagoProduct, m.name]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `catalogo_${selectedClient || 'todos'}_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const handleEdit = (id) => {
        const item = mappings.find(m => m.id === id);
        if (item) {
            setEditingItem({
                id: item.id,
                clientProduct: item.clientProduct,
                bagoCode: item.bagoProduct,
                productName: item.name
            });
            setIsEditModalOpen(true);
        }
    };

    const handleSaveEdit = () => {
        if (!editingItem.clientProduct || !editingItem.bagoCode) {
            alert("Por favor complete los códigos.");
            return;
        }

        setMappings(mappings.map(m =>
            m.id === editingItem.id
                ? {
                    ...m,
                    clientProduct: editingItem.clientProduct,
                    bagoProduct: editingItem.bagoCode,
                    name: editingItem.productName
                }
                : m
        ));
        setIsEditModalOpen(false);
        setEditingItem(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar este mapeo?")) {
            setMappings(mappings.filter(m => m.id !== id));
        }
    };

    const filteredMappings = mappings.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.clientProduct.includes(searchTerm) ||
        m.bagoProduct.includes(searchTerm)
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredMappings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMappings = filteredMappings.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Gestión de Catálogos</h1>
                    <p className="text-gray-500 mt-2">Administra la homologación de productos por cliente.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" icon={Download} onClick={handleExport}>Exportar Catálogo</Button>
                    <Button icon={Plus} onClick={handleNewRelation}>Nueva Relación</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar / Filter Area */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Selección de Cliente</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cliente / Cadena</label>
                                    <select
                                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        value={selectedClient}
                                        onChange={(e) => setSelectedClient(e.target.value)}
                                    >
                                        <option value="">Seleccione...</option>
                                        <option value="C001">Farmacias Económicas</option>
                                        <option value="C002">Fybeca</option>
                                        <option value="C003">Cruz Azul</option>
                                    </select>
                                </div>
                                <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
                                    <strong>Nota:</strong> Los códigos de productos suelen variar cada mes para ciertas cadenas. Recuerda actualizar la base regularmente.
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Carga Masiva</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept=".xlsx,.xls,.csv"
                                className="hidden"
                            />
                            <div
                                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors cursor-pointer bg-gray-50"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {uploadStatus === 'processing' ? (
                                    <>
                                        <FileSpreadsheet className="mx-auto h-12 w-12 text-primary-500 animate-pulse" />
                                        <p className="mt-2 text-sm font-medium text-gray-900">Procesando archivo...</p>
                                    </>
                                ) : uploadStatus === 'success' ? (
                                    <>
                                        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                                        <p className="mt-2 text-sm font-medium text-green-700">¡Archivo cargado exitosamente!</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm font-medium text-gray-900">Arrastra tu archivo aquí</p>
                                        <p className="text-xs text-gray-500">o haz clic para buscar (Excel .xlsx, .csv)</p>
                                    </>
                                )}
                            </div>
                            <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                                <span>Plantilla_Homologacion.csv</span>
                                <button
                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                    onClick={handleDownloadTemplate}
                                >
                                    Descargar
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Table Area */}
                <div className="md:col-span-2">
                    <Card className="h-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Productos Homologados</CardTitle>
                            <div className="relative w-64">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar por código o nombre..."
                                    className="w-full pl-9 pr-4 py-1.5 rounded-lg border-gray-200 text-sm focus:border-primary-500 focus:ring-primary-500"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1); // Reset to first page on search
                                    }}
                                />
                            </div>
                        </CardHeader>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Cód. Cliente</th>
                                        <th className="px-6 py-3 font-medium">Cód. Bagó</th>
                                        <th className="px-6 py-3 font-medium">Producto</th>
                                        <th className="px-6 py-3 font-medium text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {currentMappings.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-3 font-mono text-gray-600">{item.clientProduct}</td>
                                            <td className="px-6 py-3 font-mono text-primary-600 font-medium">{item.bagoProduct}</td>
                                            <td className="px-6 py-3 text-gray-900">{item.name}</td>
                                            <td className="px-6 py-3 text-right flex justify-end gap-2">
                                                <button
                                                    className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                                                    onClick={() => handleEdit(item.id)}
                                                    title="Editar"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                                    onClick={() => handleDelete(item.id)}
                                                    title="Eliminar"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {currentMappings.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                                                <Database className="mx-auto h-12 w-12 mb-2 text-gray-300" />
                                                No hay productos registrados para este cliente.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <span>
                                    Mostrando {startIndex + 1}-{Math.min(endIndex, filteredMappings.length)} de {filteredMappings.length} registros
                                </span>
                                <select
                                    className="rounded border-gray-300 text-xs"
                                    value={itemsPerPage}
                                    onChange={(e) => {
                                        setItemsPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="5">5 por página</option>
                                    <option value="10">10 por página</option>
                                    <option value="20">20 por página</option>
                                    <option value="50">50 por página</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">
                                    Página {currentPage} de {totalPages || 1}
                                </span>
                                <div className="flex gap-1">
                                    <button
                                        className={`px-3 py-1 rounded bg-white border border-gray-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                                            }`}
                                        onClick={handlePreviousPage}
                                        disabled={currentPage === 1}
                                    >
                                        Ant
                                    </button>
                                    <button
                                        className={`px-3 py-1 rounded bg-white border border-gray-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                                            }`}
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                    >
                                        Sig
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* New Relation Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Crear Nueva Relación de Producto"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSaveRelation}>Guardar Relación</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Vincula manualmente un código de lista de precios de cliente con un código maestro de Bagó.
                    </p>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cliente</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
                            value={selectedClient || "No seleccionado (General)"}
                            readOnly
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cód. Producto Cliente</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                placeholder="Ej: 78910"
                                value={newRelationData.clientProduct}
                                onChange={(e) => setNewRelationData({ ...newRelationData, clientProduct: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cód. Bagó (Maestro)</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                placeholder="Ej: BG-1020"
                                value={newRelationData.bagoCode}
                                onChange={(e) => setNewRelationData({ ...newRelationData, bagoCode: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre del Producto (Ref)</label>
                        <input
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="Ej: Aspirina 500mg"
                            value={newRelationData.productName}
                            onChange={(e) => setNewRelationData({ ...newRelationData, productName: e.target.value })}
                        />
                    </div>
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingItem(null);
                }}
                title="Editar Relación de Producto"
                footer={
                    <>
                        <Button variant="outline" onClick={() => {
                            setIsEditModalOpen(false);
                            setEditingItem(null);
                        }}>Cancelar</Button>
                        <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
                    </>
                }
            >
                {editingItem && (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Modifica la relación entre el código de cliente y el código maestro de Bagó.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cód. Producto Cliente</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    placeholder="Ej: 78910"
                                    value={editingItem.clientProduct}
                                    onChange={(e) => setEditingItem({ ...editingItem, clientProduct: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cód. Bagó (Maestro)</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                    placeholder="Ej: BG-1020"
                                    value={editingItem.bagoCode}
                                    onChange={(e) => setEditingItem({ ...editingItem, bagoCode: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                placeholder="Ej: Aspirina 500mg"
                                value={editingItem.productName}
                                onChange={(e) => setEditingItem({ ...editingItem, productName: e.target.value })}
                            />
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CatalogManagement;
