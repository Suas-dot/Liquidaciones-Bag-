import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, onClear }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [filterValues, setFilterValues] = useState({});

    const handleChange = (filterKey, value) => {
        const newValues = { ...filterValues, [filterKey]: value };
        setFilterValues(newValues);
        onFilterChange(newValues);
    };

    const handleClear = () => {
        setFilterValues({});
        onFilterChange({});
        onClear?.();
    };

    const activeFiltersCount = Object.values(filterValues).filter(v => v && v !== '').length;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <h3 className="font-semibold text-gray-800">Filtros</h3>
                    {activeFiltersCount > 0 && (
                        <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs font-medium rounded-full">
                            {activeFiltersCount}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={handleClear}
                            className="text-sm text-gray-600 hover:text-gray-800 underline"
                        >
                            Limpiar
                        </button>
                    )}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Filtros */}
            {isOpen && (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filters.map((filter) => (
                        <div key={filter.key} className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">
                                {filter.label}
                            </label>

                            {filter.type === 'select' && (
                                <select
                                    value={filterValues[filter.key] || ''}
                                    onChange={(e) => handleChange(filter.key, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                                >
                                    <option value="">Todos</option>
                                    {filter.options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {filter.type === 'text' && (
                                <input
                                    type="text"
                                    value={filterValues[filter.key] || ''}
                                    onChange={(e) => handleChange(filter.key, e.target.value)}
                                    placeholder={filter.placeholder || `Buscar ${filter.label.toLowerCase()}...`}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                                />
                            )}

                            {filter.type === 'date' && (
                                <input
                                    type="date"
                                    value={filterValues[filter.key] || ''}
                                    onChange={(e) => handleChange(filter.key, e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                                />
                            )}

                            {filter.type === 'daterange' && (
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        value={filterValues[`${filter.key}_start`] || ''}
                                        onChange={(e) => handleChange(`${filter.key}_start`, e.target.value)}
                                        placeholder="Desde"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                                    />
                                    <input
                                        type="date"
                                        value={filterValues[`${filter.key}_end`] || ''}
                                        onChange={(e) => handleChange(`${filter.key}_end`, e.target.value)}
                                        placeholder="Hasta"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                                    />
                                </div>
                            )}

                            {filter.type === 'number' && (
                                <input
                                    type="number"
                                    value={filterValues[filter.key] || ''}
                                    onChange={(e) => handleChange(filter.key, e.target.value)}
                                    placeholder={filter.placeholder}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterPanel;
