import React, { useState } from 'react';
import {
    HeartPulse,
    Users,
    Upload,
    CheckCircle,
    XCircle,
    AlertCircle,
    Download,
    FileSpreadsheet,
    DollarSign,
    Search,
    Filter,
    Eye,
    CheckCircle2,
    X
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';

const PMC = () => {
    const [activeStep, setActiveStep] = useState('carga'); // carga, validacion, liquidacion
    const [uploadedFile, setUploadedFile] = useState(null);
    const [previewData, setPreviewData] = useState([]);
    const [validationResults, setValidationResults] = useState([]);
    const [liquidationData, setLiquidationData] = useState([]);
    const [filterValidation, setFilterValidation] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const showNotification = (message, type = 'success') => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Mock preview data after file upload
    const mockPreviewData = [
        { cedula: '1234567890', producto: 'PROD001', nombre: 'Amoxicilina 500mg', cantidad: 5, valor: 12.50 },
        { cedula: '0987654321', producto: 'PROD002', nombre: 'Ibuprofeno 400mg', cantidad: 3, valor: 8.40 },
        { cedula: '1122334455', producto: 'PROD003', nombre: 'Paracetamol 500mg', cantidad: 4, valor: 6.80 },
        { cedula: '5544332211', producto: 'PROD001', nombre: 'Amoxicilina 500mg', cantidad: 2, valor: 5.00 },
        { cedula: '9988776655', producto: 'PROD004', nombre: 'Losartán 100mg', cantidad: 6, valor: 18.00 }
    ];

    // Mock validation results from InnovaSer
    const mockValidationResults = [
        { cedula: '1234567890', producto: 'PROD001', nombre: 'Amoxicilina 500mg', cantidad: 5, valor: 12.50, estado: 'valido', observacion: 'Paciente validado correctamente' },
        { cedula: '0987654321', producto: 'PROD002', nombre: 'Ibuprofeno 400mg', cantidad: 3, valor: 8.40, estado: 'valido', observacion: 'Paciente validado correctamente' },
        { cedula: '1122334455', producto: 'PROD003', nombre: 'Paracetamol 500mg', cantidad: 4, valor: 6.80, estado: 'invalido', observacion: 'Cédula no encontrada en sistema' },
        { cedula: '5544332211', producto: 'PROD001', nombre: 'Amoxicilina 500mg', cantidad: 2, valor: 5.00, estado: 'valido', observacion: 'Paciente validado correctamente' },
        { cedula: '9988776655', producto: 'PROD004', nombre: 'Losartán 100mg', cantidad: 6, valor: 18.00, estado: 'invalido', observacion: 'Paciente inactivo' }
    ];

    // Mock liquidation data by client
    const mockLiquidationData = [
        { cliente: 'GPF', clienteCode: 'CLI001', unidades: 10, valor: 25.90, productos: 2 },
        { cliente: 'Difar', clienteCode: 'CLI002', unidades: 5, valor: 12.50, productos: 1 },
        { cliente: 'FarmaEnlace', clienteCode: 'CLI003', unidades: 3, valor: 8.40, productos: 1 }
    ];

    const handleFileUpload = (files) => {
        if (files && files.length > 0) {
            setUploadedFile(files[0]);
            showNotification('Archivo cargado exitosamente. Procesando datos...', 'info');
            // Simulate processing
            setTimeout(() => {
                setPreviewData(mockPreviewData);
                showNotification(`Vista previa generada: ${mockPreviewData.length} registros encontrados`, 'success');
            }, 500);
        }
    };

    const handleProcessFile = () => {
        if (previewData.length > 0) {
            showNotification('Enviando datos a InnovaSer para validación...', 'info');
            setActiveStep('validacion');
            // Simulate validation
            setTimeout(() => {
                setValidationResults(mockValidationResults);
                const validos = mockValidationResults.filter(r => r.estado === 'valido').length;
                const invalidos = mockValidationResults.filter(r => r.estado === 'invalido').length;
                showNotification(`Validación completada: ${validos} válidos, ${invalidos} inválidos`, 'success');
            }, 1000);
        }
    };

    const handleValidate = () => {
        const validos = validationResults.filter(r => r.estado === 'valido').length;
        showNotification(`Procesando ${validos} registros válidos para liquidación...`, 'info');
        setTimeout(() => {
            setActiveStep('liquidacion');
            setLiquidationData(mockLiquidationData);
            showNotification('Liquidación generada exitosamente', 'success');
        }, 500);
    };

    const handleGenerateNC = () => {
        showNotification('Generando solicitudes de NC para 3 clientes...', 'success');
    };

    const handleExportErrors = () => {
        const errors = validationResults.filter(r => r.estado === 'invalido');
        showNotification(`Exportando ${errors.length} registros con errores a Excel...`, 'info');
        setTimeout(() => {
            showNotification('Archivo de errores descargado exitosamente', 'success');
        }, 1000);
    };

    const filteredValidationResults = validationResults.filter(result => {
        const matchesFilter = filterValidation === 'all' || result.estado === filterValidation;
        const matchesSearch = result.cedula.includes(searchTerm) ||
            result.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const stats = {
        totalRegistros: previewData.length,
        validos: validationResults.filter(r => r.estado === 'valido').length,
        invalidos: validationResults.filter(r => r.estado === 'invalido').length,
        totalUnidades: liquidationData.reduce((sum, c) => sum + c.unidades, 0),
        totalValor: liquidationData.reduce((sum, c) => sum + c.valor, 0),
        totalClientes: liquidationData.length
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
                    {toastType === 'error' && <X className="w-5 h-5" />}
                    {toastType === 'warning' && <AlertCircle className="w-5 h-5" />}
                    {toastType === 'info' && <FileSpreadsheet className="w-5 h-5" />}
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Plan de Medicación Continua (PMC)</h1>
                <p className="text-gray-600 mt-1">Proceso de carga, validación y liquidación</p>
            </div>

            {/* Steps Navigation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    {/* Step 1 */}
                    <div className="flex items-center flex-1">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activeStep === 'carga' ? 'bg-primary-600 text-white' :
                            previewData.length > 0 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                            {previewData.length > 0 ? <CheckCircle size={20} /> : '1'}
                        </div>
                        <div className="ml-3">
                            <p className={`text-sm font-medium ${activeStep === 'carga' ? 'text-primary-600' : 'text-gray-900'}`}>
                                Carga PMC
                            </p>
                            <p className="text-xs text-gray-500">Cargar archivo Excel</p>
                        </div>
                    </div>

                    <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>

                    {/* Step 2 */}
                    <div className="flex items-center flex-1">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activeStep === 'validacion' ? 'bg-primary-600 text-white' :
                            validationResults.length > 0 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                            {validationResults.length > 0 ? <CheckCircle size={20} /> : '2'}
                        </div>
                        <div className="ml-3">
                            <p className={`text-sm font-medium ${activeStep === 'validacion' ? 'text-primary-600' : 'text-gray-900'}`}>
                                Validación InnovaSer
                            </p>
                            <p className="text-xs text-gray-500">Validar pacientes</p>
                        </div>
                    </div>

                    <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>

                    {/* Step 3 */}
                    <div className="flex items-center flex-1">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${activeStep === 'liquidacion' ? 'bg-primary-600 text-white' :
                            liquidationData.length > 0 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                            }`}>
                            {liquidationData.length > 0 ? <CheckCircle size={20} /> : '3'}
                        </div>
                        <div className="ml-3">
                            <p className={`text-sm font-medium ${activeStep === 'liquidacion' ? 'text-primary-600' : 'text-gray-900'}`}>
                                Liquidación PMC
                            </p>
                            <p className="text-xs text-gray-500">Generar solicitud NC</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step Content */}
            {activeStep === 'carga' && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Paso 1: Carga de Archivo PMC</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                        <div className="text-sm text-blue-800">
                                            <p className="font-medium mb-1">Formato esperado del archivo Excel:</p>
                                            <ul className="list-disc list-inside space-y-1 text-blue-700">
                                                <li>Columna A: <strong>Cédula</strong> (10 dígitos)</li>
                                                <li>Columna B: <strong>Código Producto</strong></li>
                                                <li>Columna C: <strong>Cantidad</strong> (número entero)</li>
                                                <li>Columna D: <strong>Valor</strong> (decimal con 2 decimales)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <FileUpload
                                    onFileSelect={handleFileUpload}
                                    accept=".xlsx,.xls,.csv"
                                    maxSize={10}
                                    multiple={false}
                                />

                                {/* Simulation Button */}
                                <div className="flex items-center justify-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            const mockFile = new File([""], "ejemplo_pmc.xlsx", { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                                            handleFileUpload([mockFile]);
                                        }}
                                        className="w-full"
                                    >
                                        <Upload size={16} className="mr-2" />
                                        Simular Carga de Archivo (Para Pruebas)
                                    </Button>
                                </div>

                                {uploadedFile && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <FileSpreadsheet className="text-green-600" size={24} />
                                                <div>
                                                    <p className="font-medium text-green-900">{uploadedFile.name}</p>
                                                    <p className="text-sm text-green-700">
                                                        {(uploadedFile.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge className="bg-green-100 text-green-800">Cargado</Badge>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {previewData.length > 0 && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Preview de Datos ({previewData.length} registros)</CardTitle>
                                    <Button onClick={handleProcessFile}>
                                        Continuar a Validación
                                        <CheckCircle size={16} className="ml-2" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cédula</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {previewData.map((row, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{row.cedula}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.producto}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">{row.nombre}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.cantidad}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                        ${row.valor.toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            )}

            {activeStep === 'validacion' && (
                <div className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Enviados</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.totalRegistros}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FileSpreadsheet className="text-blue-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Válidos</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.validos}</p>
                                        <p className="text-xs text-gray-500">
                                            {stats.totalRegistros > 0 ? ((stats.validos / stats.totalRegistros) * 100).toFixed(1) : 0}%
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="text-green-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Inválidos</p>
                                        <p className="text-2xl font-bold text-red-600">{stats.invalidos}</p>
                                        <p className="text-xs text-gray-500">
                                            {stats.totalRegistros > 0 ? ((stats.invalidos / stats.totalRegistros) * 100).toFixed(1) : 0}%
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                        <XCircle className="text-red-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Paso 2: Resultados de Validación InnovaSer</CardTitle>
                                <div className="flex space-x-2">
                                    <Button variant="outline" onClick={handleExportErrors}>
                                        <Download size={16} className="mr-2" />
                                        Exportar Errores
                                    </Button>
                                    <Button onClick={handleValidate}>
                                        Continuar con Válidos
                                        <CheckCircle size={16} className="ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Filters */}
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Buscar por cédula o producto..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Filter size={18} className="text-gray-500" />
                                    <select
                                        value={filterValidation}
                                        onChange={(e) => setFilterValidation(e.target.value)}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    >
                                        <option value="all">Todos</option>
                                        <option value="valido">Válidos</option>
                                        <option value="invalido">Inválidos</option>
                                    </select>
                                </div>
                            </div>

                            {/* Results Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cédula</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Observación</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredValidationResults.map((row, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">{row.cedula}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{row.nombre}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.cantidad}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                    ${row.valor.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {row.estado === 'valido' ? (
                                                        <Badge className="bg-green-100 text-green-800 flex items-center w-fit space-x-1">
                                                            <CheckCircle size={14} />
                                                            <span>Válido</span>
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="bg-red-100 text-red-800 flex items-center w-fit space-x-1">
                                                            <XCircle size={14} />
                                                            <span>Inválido</span>
                                                        </Badge>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{row.observacion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {activeStep === 'liquidacion' && (
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Pacientes</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.validos}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Users className="text-purple-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Unidades</p>
                                        <p className="text-2xl font-bold text-blue-600">{stats.totalUnidades}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <HeartPulse className="text-blue-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Valor</p>
                                        <p className="text-2xl font-bold text-primary-600">
                                            ${stats.totalValor.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                        <DollarSign className="text-primary-600" size={24} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Paso 3: Liquidación PMC por Cliente</CardTitle>
                                <Button onClick={handleGenerateNC}>
                                    Generar Solicitud NC
                                    <CheckCircle size={16} className="ml-2" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Productos</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unidades</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor a Reconocer</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {liquidationData.map((row, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{row.cliente}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.clienteCode}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.productos}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                                                    {row.unidades}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary-600">
                                                    ${row.valor.toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    <button className="text-primary-600 hover:text-primary-900">
                                                        <Eye size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gray-50 font-semibold">
                                            <td colSpan="3" className="px-6 py-4 text-right text-sm text-gray-900">
                                                TOTAL:
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                                {stats.totalUnidades}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600">
                                                ${stats.totalValor.toFixed(2)}
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default PMC;
