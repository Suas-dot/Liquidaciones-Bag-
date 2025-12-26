import React from 'react';

const StatusBadge = ({ status, type = 'default' }) => {
    const statusConfig = {
        // Estados de Liquidación
        'Pendiente Validación': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
        'En Proceso': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
        'Validado': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
        'Rechazado': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
        'Aprobado': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
        'Enviado a Facturación': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },

        // Estados de NC
        'Pendiente Aprobación': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
        'Generada': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
        'Enviada a Kifatex': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
        'NC Kifatex Recibida': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },

        // Estados de Provisión
        'Pendiente': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
        'Procesada en SAP': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
        'Procesada': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
        'Reversada': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },

        // Estados generales
        'Activo': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
        'Inactivo': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
        'Borrador': { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
        'En Revisión': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
        'Completado': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
        'Cancelado': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },

        // Estados de integración
        'Conectado': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
        'Desconectado': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
        'Error': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
        'Sincronizando': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    };

    const config = statusConfig[status] || {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        border: 'border-gray-300'
    };

    return (
        <span className={`
      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
      ${config.bg} ${config.text} ${config.border}
    `}>
            {status}
        </span>
    );
};

export default StatusBadge;
