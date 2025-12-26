import React, { useState } from 'react';
import { Download, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const DataTable = ({
    columns,
    data,
    onRowClick,
    selectable = false,
    onSelectionChange,
    exportable = true,
    searchable = true,
    pageSize = 10,
    emptyMessage = "No hay datos disponibles"
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRows, setSelectedRows] = useState(new Set());

    // Filtrar datos por búsqueda
    const filteredData = searchable && searchTerm
        ? data.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        : data;

    // Paginación
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

    // Manejo de selección
    const toggleRow = (id) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
        onSelectionChange?.(Array.from(newSelected));
    };

    const toggleAll = () => {
        if (selectedRows.size === paginatedData.length) {
            setSelectedRows(new Set());
            onSelectionChange?.([]);
        } else {
            const allIds = new Set(paginatedData.map(row => row.id));
            setSelectedRows(allIds);
            onSelectionChange?.(Array.from(allIds));
        }
    };

    // Exportar a CSV
    const exportToCSV = () => {
        const headers = columns.map(col => col.header).join(',');
        const rows = filteredData.map(row =>
            columns.map(col => {
                const value = col.accessor(row);
                return typeof value === 'string' ? `"${value}"` : value;
            }).join(',')
        );
        const csv = [headers, ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `export_${Date.now()}.csv`;
        a.click();
    };

    return (
        <div className="space-y-4">
            {/* Header con búsqueda y exportación */}
            <div className="flex justify-between items-center gap-4">
                {searchable && (
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                    </div>
                )}

                {exportable && (
                    <button
                        onClick={exportToCSV}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Exportar
                    </button>
                )}
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
                        <tr>
                            {selectable && (
                                <th className="px-4 py-3 text-left">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                                        onChange={toggleAll}
                                        className="w-4 h-4 rounded border-white"
                                    />
                                </th>
                            )}
                            {columns.map((column, index) => (
                                <th key={index} className="px-4 py-3 text-left font-semibold">
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + (selectable ? 1 : 0)}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    onClick={() => onRowClick?.(row)}
                                    className={`
                    hover:bg-gray-50 transition-colors
                    ${onRowClick ? 'cursor-pointer' : ''}
                    ${selectedRows.has(row.id) ? 'bg-pink-50' : ''}
                  `}
                                >
                                    {selectable && (
                                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.has(row.id)}
                                                onChange={() => toggleRow(row.id)}
                                                className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                            />
                                        </td>
                                    )}
                                    {columns.map((column, colIndex) => (
                                        <td key={colIndex} className="px-4 py-3 text-sm text-gray-700">
                                            {column.accessor(row)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Mostrando {startIndex + 1} a {Math.min(startIndex + pageSize, filteredData.length)} de {filteredData.length} resultados
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`
                    px-3 py-1 rounded-lg
                    ${currentPage === page
                                            ? 'bg-pink-600 text-white'
                                            : 'border border-gray-300 hover:bg-gray-50'
                                        }
                  `}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
