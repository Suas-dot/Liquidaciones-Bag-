// Mock Data para Sistema de Liquidación de Promociones
// Datos de prueba completos para todas las pantallas

// ============================================
// INTERLOCUTORES (Clientes)
// ============================================
export const interlocutores = [
    {
        id: '1',
        codigoBago: '0011',
        codigoKifatex: '3559',
        razonSocial: 'Difare S.A.',
        nombreComercial: 'Difare',
        email: 'contacto@difare.com',
        supervisor: { nombre: 'Juan Pérez', email: 'jperez@bago.com' },
        visitador: { nombre: 'Ana López', email: 'alopez@bago.com' },
        estado: 'Activo',
        fechaCreacion: '2023-01-15',
        ultimaActualizacion: '2024-05-10'
    },
    {
        id: '2',
        codigoBago: '0025',
        codigoKifatex: '4120',
        razonSocial: 'Fybeca S.A.',
        nombreComercial: 'Fybeca',
        email: 'contacto@fybeca.com',
        supervisor: { nombre: 'María García', email: 'mgarcia@bago.com' },
        visitador: { nombre: 'Carlos Ruiz', email: 'cruiz@bago.com' },
        estado: 'Activo',
        fechaCreacion: '2023-02-20',
        ultimaActualizacion: '2024-05-12'
    },
    {
        id: '3',
        codigoBago: '0033',
        codigoKifatex: '5678',
        razonSocial: 'Cruz Azul',
        nombreComercial: 'Cruz Azul',
        email: 'info@cruzazul.com',
        supervisor: { nombre: 'Pedro Sánchez', email: 'psanchez@bago.com' },
        visitador: { nombre: 'Laura Martínez', email: 'lmartinez@bago.com' },
        estado: 'Activo',
        fechaCreacion: '2023-03-10',
        ultimaActualizacion: '2024-04-28'
    },
    {
        id: '4',
        codigoBago: '0045',
        codigoKifatex: '6789',
        razonSocial: 'Pharmacys',
        nombreComercial: 'Pharmacys',
        email: 'contacto@pharmacys.com',
        supervisor: { nombre: 'Juan Pérez', email: 'jperez@bago.com' },
        visitador: { nombre: 'Roberto Díaz', email: 'rdiaz@bago.com' },
        estado: 'Activo',
        fechaCreacion: '2023-04-05',
        ultimaActualizacion: '2024-05-15'
    },
    {
        id: '5',
        codigoBago: '0052',
        codigoKifatex: '7890',
        razonSocial: 'Medicity',
        nombreComercial: 'Medicity',
        email: 'info@medicity.com',
        supervisor: { nombre: 'María García', email: 'mgarcia@bago.com' },
        visitador: { nombre: 'Sofía Torres', email: 'storres@bago.com' },
        estado: 'Inactivo',
        fechaCreacion: '2023-05-12',
        ultimaActualizacion: '2024-03-20'
    }
];

// ============================================
// LIQUIDACIONES
// ============================================
export const liquidaciones = [
    {
        id: 'LIQ-2024-001',
        numeroInterno: 'CI-001-2024',
        cliente: interlocutores[0],
        tipoPromocion: 'PMC',
        periodo: '2024-05',
        estado: 'Pendiente Aprobación',
        valorTotal: 15000,
        analista: 'Maria Augusta',
        supervisor: 'Maritza',
        fechaCreacion: '2024-05-15',
        fechaValidacion: null,
        productos: [
            { codigo: 'SAP001', nombre: 'Producto A', unidadesReclamadas: 100, unidadesAprobadas: 95, valorUnitario: 150, valorTotal: 14250 },
            { codigo: 'SAP002', nombre: 'Producto B', unidadesReclamadas: 50, unidadesAprobadas: 50, valorUnitario: 15, valorTotal: 750 }
        ],
        documentos: ['factura_001.pdf', 'estado_cuenta.xlsx'],
        observaciones: 'Cliente envió información completa'
    },
    {
        id: 'LIQ-2024-002',
        numeroInterno: 'CI-002-2024',
        cliente: interlocutores[1],
        tipoPromocion: 'Cupones',
        periodo: '2024-05',
        estado: 'Aprobado',
        valorTotal: 8500,
        analista: 'Maria Augusta',
        supervisor: 'Maritza',
        fechaCreacion: '2024-05-10',
        fechaValidacion: '2024-05-12',
        productos: [
            { codigo: 'SAP003', nombre: 'Producto C', unidadesReclamadas: 200, unidadesAprobadas: 200, valorUnitario: 42.5, valorTotal: 8500 }
        ],
        documentos: ['cupones_escaneados.pdf'],
        observaciones: 'Todos los cupones validados correctamente'
    },
    {
        id: 'LIQ-2024-003',
        numeroInterno: 'CI-003-2024',
        cliente: interlocutores[2],
        tipoPromocion: 'Rebates',
        periodo: '2024-04',
        estado: 'Enviado a Facturación',
        valorTotal: 25000,
        analista: 'Maritza',
        supervisor: 'Maria Augusta',
        fechaCreacion: '2024-04-28',
        fechaValidacion: '2024-05-02',
        productos: [
            { codigo: 'SAP004', nombre: 'Producto D', unidadesReclamadas: 500, unidadesAprobadas: 500, valorUnitario: 50, valorTotal: 25000 }
        ],
        documentos: ['factura_ref.pdf', 'contrato.pdf'],
        observaciones: 'Rebate anual aprobado'
    },
    {
        id: 'LIQ-2024-004',
        numeroInterno: 'CI-004-2024',
        cliente: interlocutores[3],
        tipoPromocion: 'ACOAI',
        periodo: '2024-05',
        estado: 'En Proceso',
        valorTotal: 12000,
        analista: 'Maria Augusta',
        supervisor: 'Maritza',
        fechaCreacion: '2024-05-18',
        fechaValidacion: null,
        productos: [
            { codigo: 'SAP005', nombre: 'Producto E', unidadesReclamadas: 300, unidadesAprobadas: 280, valorUnitario: 40, valorTotal: 11200 },
            { codigo: 'SAP006', nombre: 'Producto F', unidadesReclamadas: 20, unidadesAprobadas: 20, valorUnitario: 40, valorTotal: 800 }
        ],
        documentos: ['estado_cuenta.xlsx'],
        observaciones: 'Pendiente validación de algunas facturas'
    },
    {
        id: 'LIQ-2024-005',
        numeroInterno: 'CI-005-2024',
        cliente: interlocutores[0],
        tipoPromocion: 'PMC',
        periodo: '2024-04',
        estado: 'Rechazado',
        valorTotal: 0,
        analista: 'Maritza',
        supervisor: 'Maria Augusta',
        fechaCreacion: '2024-04-20',
        fechaValidacion: '2024-04-22',
        productos: [],
        documentos: ['estado_cuenta_incompleto.xlsx'],
        observaciones: 'Información incompleta, cliente no envió facturas de soporte'
    }
];

// ============================================
// NOTAS DE CRÉDITO
// ============================================
export const notasCredito = [
    {
        id: 'NC-001',
        numeroInterno: 'CI-001-2024',
        ncSAP: '990123456',
        ncKifatex: 'KF-2024-789',
        liquidacion: liquidaciones[2],
        cliente: interlocutores[2],
        tipoPromocion: 'Rebates',
        valor: 25000,
        estado: 'NC Kifatex Recibida',
        fechaGeneracion: '2024-05-05',
        fechaEnvioKifatex: '2024-05-05',
        fechaRecepcionKifatex: '2024-05-08',
        facturaReferencia: '001-002-000123456',
        condicionDescuento: 'Z001 - Rebates',
        motivoRechazo: 'Descuento por volumen',
        generadoPor: 'Gaby Cajas'
    },
    {
        id: 'NC-002',
        numeroInterno: 'CI-002-2024',
        ncSAP: '990123457',
        ncKifatex: null,
        liquidacion: liquidaciones[1],
        cliente: interlocutores[1],
        tipoPromocion: 'Cupones',
        valor: 8500,
        estado: 'Enviada a Kifatex',
        fechaGeneracion: '2024-05-13',
        fechaEnvioKifatex: '2024-05-13',
        fechaRecepcionKifatex: null,
        facturaReferencia: '001-002-000123450',
        condicionDescuento: 'Z002 - Cupones',
        motivoRechazo: 'Cupón promocional',
        generadoPor: 'Gaby Cajas'
    },
    {
        id: 'NC-003',
        numeroInterno: 'CI-003-2024',
        ncSAP: null,
        ncKifatex: null,
        liquidacion: liquidaciones[0],
        cliente: interlocutores[0],
        tipoPromocion: 'PMC',
        valor: 15000,
        estado: 'Pendiente Aprobación',
        fechaGeneracion: null,
        fechaEnvioKifatex: null,
        fechaRecepcionKifatex: null,
        facturaReferencia: null,
        condicionDescuento: 'Z003 - PMC',
        motivoRechazo: 'Plan de medicación continua',
        generadoPor: null
    },
    {
        id: 'NC-004',
        numeroInterno: 'CI-004-2024',
        ncSAP: null,
        ncKifatex: null,
        liquidacion: liquidaciones[3],
        cliente: interlocutores[3],
        tipoPromocion: 'ACOAI',
        valor: 12000,
        estado: 'Pendiente Aprobación',
        fechaGeneracion: null,
        fechaEnvioKifatex: null,
        fechaRecepcionKifatex: null,
        facturaReferencia: '001-002-000123470',
        condicionDescuento: 'Z004 - ACOAI',
        motivoRechazo: 'Acuerdo comercial',
        generadoPor: null
    },
    {
        id: 'NC-005',
        numeroInterno: 'CI-005-2024',
        ncSAP: null,
        ncKifatex: null,
        liquidacion: liquidaciones[0],
        cliente: interlocutores[0],
        tipoPromocion: 'PMC',
        valor: 18500,
        estado: 'Pendiente Aprobación',
        fechaGeneracion: null,
        fechaEnvioKifatex: null,
        fechaRecepcionKifatex: null,
        facturaReferencia: '001-002-000123471',
        condicionDescuento: 'Z003 - PMC',
        motivoRechazo: 'Plan de medicación continua',
        generadoPor: null
    },
    {
        id: 'NC-006',
        numeroInterno: 'CI-006-2024',
        ncSAP: null,
        ncKifatex: null,
        liquidacion: liquidaciones[1],
        cliente: interlocutores[1],
        tipoPromocion: 'Cupones',
        valor: 6750,
        estado: 'Pendiente Aprobación',
        fechaGeneracion: null,
        fechaEnvioKifatex: null,
        fechaRecepcionKifatex: null,
        facturaReferencia: '001-002-000123472',
        condicionDescuento: 'Z002 - Cupones',
        motivoRechazo: 'Cupón promocional',
        generadoPor: null
    },
    {
        id: 'NC-007',
        numeroInterno: 'CI-007-2024',
        ncSAP: null,
        ncKifatex: null,
        liquidacion: liquidaciones[2],
        cliente: interlocutores[2],
        tipoPromocion: 'Rebates',
        valor: 32000,
        estado: 'Pendiente Aprobación',
        fechaGeneracion: null,
        fechaEnvioKifatex: null,
        fechaRecepcionKifatex: null,
        facturaReferencia: '001-002-000123473',
        condicionDescuento: 'Z001 - Rebates',
        motivoRechazo: 'Descuento por volumen',
        generadoPor: null
    },
    {
        id: 'NC-008',
        numeroInterno: 'CI-008-2024',
        ncSAP: null,
        ncKifatex: null,
        liquidacion: liquidaciones[3],
        cliente: interlocutores[3],
        tipoPromocion: 'ACOAI',
        valor: 9500,
        estado: 'Pendiente Aprobación',
        fechaGeneracion: null,
        fechaEnvioKifatex: null,
        fechaRecepcionKifatex: null,
        facturaReferencia: null,
        condicionDescuento: 'Z004 - ACOAI',
        motivoRechazo: 'Acuerdo comercial',
        generadoPor: null
    },
    {
        id: 'NC-009',
        numeroInterno: 'CI-009-2024',
        ncSAP: null,
        ncKifatex: null,
        liquidacion: liquidaciones[0],
        cliente: interlocutores[0],
        tipoPromocion: 'PMC',
        valor: 21300,
        estado: 'Pendiente Aprobación',
        fechaGeneracion: null,
        fechaEnvioKifatex: null,
        fechaRecepcionKifatex: null,
        facturaReferencia: '001-002-000123474',
        condicionDescuento: 'Z003 - PMC',
        motivoRechazo: 'Plan de medicación continua',
        generadoPor: null
    },
    {
        id: 'NC-010',
        numeroInterno: 'CI-010-2024',
        ncSAP: null,
        ncKifatex: null,
        liquidacion: liquidaciones[1],
        cliente: interlocutores[1],
        tipoPromocion: 'Cupones',
        valor: 11200,
        estado: 'Pendiente Aprobación',
        fechaGeneracion: null,
        fechaEnvioKifatex: null,
        fechaRecepcionKifatex: null,
        facturaReferencia: '001-002-000123475',
        condicionDescuento: 'Z002 - Cupones',
        motivoRechazo: 'Cupón promocional',
        generadoPor: null
    },
    {
        id: 'NC-011',
        numeroInterno: 'CI-011-2024',
        ncSAP: null,
        ncKifatex: null,
        liquidacion: liquidaciones[2],
        cliente: interlocutores[2],
        tipoPromocion: 'Rebates',
        valor: 28750,
        estado: 'Pendiente Aprobación',
        fechaGeneracion: null,
        fechaEnvioKifatex: null,
        fechaRecepcionKifatex: null,
        facturaReferencia: '001-002-000123476',
        condicionDescuento: 'Z001 - Rebates',
        motivoRechazo: 'Descuento por volumen',
        generadoPor: null
    },
    {
        id: 'NC-012',
        numeroInterno: 'CI-012-2024',
        ncSAP: null,
        ncKifatex: null,
        liquidacion: liquidaciones[3],
        cliente: interlocutores[3],
        tipoPromocion: 'ACOAI',
        valor: 14600,
        estado: 'Pendiente Aprobación',
        fechaGeneracion: null,
        fechaEnvioKifatex: null,
        fechaRecepcionKifatex: null,
        facturaReferencia: '001-002-000123477',
        condicionDescuento: 'Z004 - ACOAI',
        motivoRechazo: 'Acuerdo comercial',
        generadoPor: null
    }
];

// ============================================
// PROVISIONES
// ============================================
export const provisiones = [
    {
        id: 'PROV-2024-05',
        mes: '2024-05',
        valorTotal: 50000,
        estado: 'Pendiente',
        fechaGeneracion: '2024-05-22',
        fechaProcesamiento: null,
        procesadoPor: null,
        clientes: [
            { cliente: interlocutores[0], valorProvisionado: 15000, metodo: 'Promedio 3 meses', mes1: 14000, mes2: 15500, mes3: 15500 },
            { cliente: interlocutores[1], valorProvisionado: 8500, metodo: 'Valor Real', mes1: 0, mes2: 0, mes3: 0 },
            { cliente: interlocutores[2], valorProvisionado: 25000, metodo: 'Valor Estimado', mes1: 0, mes2: 0, mes3: 0 },
            { cliente: interlocutores[3], valorProvisionado: 1500, metodo: 'Promedio 3 meses', mes1: 1200, mes2: 1600, mes3: 1700 }
        ],
        archivoExcel: 'provision_mayo_2024.xlsx'
    },
    {
        id: 'PROV-2024-04',
        mes: '2024-04',
        valorTotal: 48000,
        estado: 'Procesada en SAP',
        fechaGeneracion: '2024-04-22',
        fechaProcesamiento: '2024-04-23',
        procesadoPor: 'Will Aragón',
        clientes: [
            { cliente: interlocutores[0], valorProvisionado: 14500, metodo: 'Promedio 3 meses', mes1: 13000, mes2: 15000, mes3: 15500 },
            { cliente: interlocutores[1], valorProvisionado: 8000, metodo: 'Promedio 3 meses', mes1: 7500, mes2: 8200, mes3: 8300 },
            { cliente: interlocutores[2], valorProvisionado: 24000, metodo: 'Valor Real', mes1: 0, mes2: 0, mes3: 0 },
            { cliente: interlocutores[3], valorProvisionado: 1500, metodo: 'Promedio 3 meses', mes1: 1400, mes2: 1500, mes3: 1600 }
        ],
        archivoExcel: 'provision_abril_2024.xlsx'
    },
    {
        id: 'PROV-2024-03',
        mes: '2024-03',
        valorTotal: 45000,
        estado: 'Reversada',
        fechaGeneracion: '2024-03-22',
        fechaProcesamiento: '2024-03-23',
        procesadoPor: 'Will Aragón',
        clientes: [
            { cliente: interlocutores[0], valorProvisionado: 13000, metodo: 'Promedio 3 meses', mes1: 12500, mes2: 13000, mes3: 13500 },
            { cliente: interlocutores[1], valorProvisionado: 7500, metodo: 'Promedio 3 meses', mes1: 7000, mes2: 7800, mes3: 7700 },
            { cliente: interlocutores[2], valorProvisionado: 23000, metodo: 'Valor Estimado', mes1: 0, mes2: 0, mes3: 0 },
            { cliente: interlocutores[3], valorProvisionado: 1500, metodo: 'Promedio 3 meses', mes1: 1300, mes2: 1600, mes3: 1600 }
        ],
        archivoExcel: 'provision_marzo_2024.xlsx'
    }
];

// ============================================
// CONDICIONES DE DESCUENTO
// ============================================
export const condicionesDescuento = [
    { id: '1', codigo: 'Z001', nombre: 'Rebates', descripcion: 'Descuento por volumen anual', motivoRechazo: 'Descuento por volumen', estado: 'Activo' },
    { id: '2', codigo: 'Z002', nombre: 'Cupones', descripcion: 'Cupones promocionales', motivoRechazo: 'Cupón promocional', estado: 'Activo' },
    { id: '3', codigo: 'Z003', nombre: 'PMC', descripcion: 'Plan de Medicación Continua', motivoRechazo: 'Plan de medicación continua', estado: 'Activo' },
    { id: '4', codigo: 'Z004', nombre: 'ACOAI', descripcion: 'Acuerdo Comercial', motivoRechazo: 'Acuerdo comercial', estado: 'Activo' },
    { id: '5', codigo: 'Z005', nombre: 'Descuento Especial', descripcion: 'Descuentos especiales aprobados', motivoRechazo: 'Descuento especial', estado: 'Inactivo' }
];

// ============================================
// USUARIOS
// ============================================
export const usuarios = [
    { id: '1', nombre: 'Maria Augusta', email: 'maugusta@bago.com', rol: 'Supervisor Control Interno', estado: 'Activo', ultimoAcceso: '2024-05-18 09:30' },
    { id: '2', nombre: 'Maritza', email: 'maritza@bago.com', rol: 'Analista Control Interno', estado: 'Activo', ultimoAcceso: '2024-05-18 10:15' },
    { id: '3', nombre: 'Gaby Cajas', email: 'gcajas@bago.com', rol: 'Facturación', estado: 'Activo', ultimoAcceso: '2024-05-18 08:45' },
    { id: '4', nombre: 'Will Aragón', email: 'waragon@bago.com', rol: 'Contabilidad', estado: 'Activo', ultimoAcceso: '2024-05-17 16:20' },
    { id: '5', nombre: 'Orlando', email: 'orlando@bago.com', rol: 'Administrador', estado: 'Activo', ultimoAcceso: '2024-05-18 11:00' },
    { id: '6', nombre: 'Cynthia', email: 'cynthia@bago.com', rol: 'Analista Control Interno', estado: 'Activo', ultimoAcceso: '2024-05-18 09:00' }
];

// ============================================
// RECEPCIÓN DE INFORMACIÓN
// ============================================
export const recepcionInformacion = [
    {
        id: 'REC-001',
        cliente: interlocutores[0],
        tipoPromocion: 'PMC',
        fechaRecepcion: '2024-05-15',
        metodoEnvio: 'Email',
        archivos: ['estado_cuenta_mayo.xlsx', 'facturas.pdf'],
        estado: 'Pendiente Validación',
        asignadoA: 'Maria Augusta',
        observaciones: 'Cliente envió información completa'
    },
    {
        id: 'REC-002',
        cliente: interlocutores[1],
        tipoPromocion: 'Cupones',
        fechaRecepcion: '2024-05-10',
        metodoEnvio: 'Email',
        archivos: ['cupones_mayo.pdf'],
        estado: 'En Proceso',
        asignadoA: 'Maritza',
        observaciones: 'Validando cupones'
    },
    {
        id: 'REC-003',
        cliente: interlocutores[2],
        tipoPromocion: 'Rebates',
        fechaRecepcion: '2024-05-08',
        metodoEnvio: 'Portal',
        archivos: ['reporte_ventas.xlsx'],
        estado: 'Validado',
        asignadoA: 'Cynthia',
        observaciones: 'Información validada correctamente'
    }
];

// ============================================
// MONITOR SAP
// ============================================
export const monitorSAP = {
    estado: 'Conectado',
    ultimaSincronizacion: '2024-05-18 11:30:00',
    erroresRecientes: [
        { fecha: '2024-05-17 15:20', tipo: 'Error', mensaje: 'Timeout al consultar factura 001-002-000123460', accion: 'Reintentado exitosamente' },
        { fecha: '2024-05-16 10:15', tipo: 'Warning', mensaje: 'Factura no encontrada: 001-002-000123461', accion: 'Pendiente revisión' }
    ],
    ncPendientes: 2,
    facturasConsultadas: 156,
    ultimasConsultas: [
        { fecha: '2024-05-18 11:25', factura: '001-002-000123456', resultado: 'Encontrada' },
        { fecha: '2024-05-18 11:20', factura: '001-002-000123457', resultado: 'Encontrada' },
        { fecha: '2024-05-18 11:15', factura: '001-002-000123458', resultado: 'No encontrada' }
    ]
};

// ============================================
// MONITOR KIFATEX
// ============================================
export const monitorKifatex = {
    estado: 'Conectado',
    ultimaRecepcion: '2024-05-18 10:00:00',
    ncEnviadas: 25,
    ncConRespuesta: 23,
    ncPendientes: 2,
    errores: [
        { fecha: '2024-05-15 14:30', tipo: 'Error', mensaje: 'Archivo FTP no encontrado', accion: 'Reintentado exitosamente' }
    ],
    ultimosArchivos: [
        { fecha: '2024-05-18 10:00', archivo: 'nc_response_20240518.csv', registros: 5, procesados: 5 },
        { fecha: '2024-05-17 10:00', archivo: 'nc_response_20240517.csv', registros: 8, procesados: 8 }
    ]
};

// ============================================
// DASHBOARD STATS
// ============================================
export const dashboardStats = {
    liquidacionesMes: {
        total: 15,
        valorTotal: 125000,
        porEstado: {
            'Pendiente Aprobación': 3,
            'En Proceso': 5,
            'Aprobado': 4,
            'Enviado a Facturación': 2,
            'Rechazado': 1
        }
    },
    ncGeneradas: {
        total: 12,
        valorTotal: 98000,
        pendientesEnvio: 2
    },
    provisiones: {
        mesActual: 50000,
        estado: 'Pendiente'
    },
    alertas: [
        { tipo: 'warning', mensaje: '3 liquidaciones pendientes de aprobación por más de 3 días' },
        { tipo: 'info', mensaje: '2 NCs sin número de Kifatex por más de 7 días' },
        { tipo: 'success', mensaje: 'Provisión de mayo generada correctamente' }
    ]
};

export default {
    interlocutores,
    liquidaciones,
    notasCredito,
    provisiones,
    condicionesDescuento,
    usuarios,
    recepcionInformacion,
    monitorSAP,
    monitorKifatex,
    dashboardStats
};
