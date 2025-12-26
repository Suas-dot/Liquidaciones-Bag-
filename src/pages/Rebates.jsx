import React, { useState } from 'react';
import {
    Target,
    TrendingUp,
    DollarSign,
    Calendar,
    Search,
    Download,
    ChevronRight,
    AlertTriangle,
    CheckCircle2,
    Settings,
    Edit2
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const Rebates = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [quarter, setQuarter] = useState("Q4 2024");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Modal State
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const [selectedAgreement, setSelectedAgreement] = useState(null);
    const [overrideValues, setOverrideValues] = useState({}); // { id: { percent: 2.5, excludedValue: 12000 } }

    const quarters = ["Q4 2024", "Q3 2024", "Q2 2024", "Q1 2024"];

    // Stats configuration per quarter
    const statsData = {
        "Q4 2024": [
            { title: "Rebates Proyectados", value: "$45,200", subtitle: "Q4 2024", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
            { title: "Clientes en Meta", value: "12/24", subtitle: "50% cumplimiento", icon: Target, color: "text-blue-600", bg: "bg-blue-100" },
            { title: "Riesgo de Incumplimiento", value: "5", subtitle: "Clientes críticos", icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-100" },
        ],
        "Q3 2024": [
            { title: "Rebates Pagados", value: "$38,150", subtitle: "Q3 2024 (Cerrado)", icon: DollarSign, color: "text-gray-600", bg: "bg-gray-100" },
            { title: "Clientes en Meta", value: "18/24", subtitle: "75% cumplimiento", icon: Target, color: "text-blue-600", bg: "bg-blue-100" },
            { title: "No Alcanzaron", value: "6", subtitle: "Sin bonificación", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
        ],
        "Q2 2024": [
            { title: "Rebates Pagados", value: "$41,200", subtitle: "Q2 2024 (Cerrado)", icon: DollarSign, color: "text-gray-600", bg: "bg-gray-100" },
            { title: "Clientes en Meta", value: "20/24", subtitle: "83% cumplimiento", icon: Target, color: "text-blue-600", bg: "bg-blue-100" },
            { title: "No Alcanzaron", value: "4", subtitle: "Sin bonificación", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
        ],
        "Q1 2024": [
            { title: "Rebates Pagados", value: "$35,500", subtitle: "Q1 2024 (Cerrado)", icon: DollarSign, color: "text-gray-600", bg: "bg-gray-100" },
            { title: "Clientes en Meta", value: "15/24", subtitle: "62% cumplimiento", icon: Target, color: "text-blue-600", bg: "bg-blue-100" },
            { title: "No Alcanzaron", value: "9", subtitle: "Sin bonificación", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
        ]
    };

    // Mock Data per quarter
    const agreementsData = {
        "Q4 2024": [
            { id: 1, client: "Farmacias Cruz Azul", contract: "CON-2024-001", target: 500000, current: 425000, tier: 3, tierName: "Gold (3%)", projectedRebate: 15000, status: "on_track", endDate: "2024-12-31" },
            { id: 2, client: "Fybeca", contract: "CON-2024-005", target: 1200000, current: 1150000, tier: 5, tierName: "Platinum (5%)", projectedRebate: 60000, status: "achieved", endDate: "2024-12-31" },
            { id: 3, client: "Distribuidora Farmacéutica", contract: "CON-2024-003", target: 300000, current: 180000, tier: 2, tierName: "Silver (2%)", projectedRebate: 0, status: "at_risk", endDate: "2024-12-31" },
            { id: 4, client: "Farmacias Económicas", contract: "CON-2024-012", target: 450000, current: 410000, tier: 3, tierName: "Gold (3%)", projectedRebate: 13500, status: "on_track", endDate: "2024-12-31" },
        ],
        // ... (Leaving other quarters as they were for brevity in mock, assuming logic propagates if structure is consistent)
        "Q3 2024": [
            { id: 1, client: "Farmacias Cruz Azul", contract: "CON-2024-001", target: 500000, current: 510000, tier: 3, tierName: "Gold (3%)", projectedRebate: 15300, status: "achieved", endDate: "2024-09-30" },
            { id: 2, client: "Fybeca", contract: "CON-2024-005", target: 1200000, current: 1050000, tier: 5, tierName: "Platinum (5%)", projectedRebate: 0, status: "at_risk", endDate: "2024-09-30" },
        ]
    };

    const stats = statsData[quarter] || statsData["Q4 2024"]; // Fallback
    const rebateAgreements = agreementsData[quarter] || [];

    const getStatusInfo = (status) => {
        switch (status) {
            case 'achieved':
                return { color: 'bg-green-500', text: 'text-green-700', bg: 'bg-green-50', label: 'Meta Alcanzada' };
            case 'on_track':
                return { color: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50', label: 'En Camino' };
            case 'at_risk':
                return { color: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50', label: 'En Riesgo' };
            default:
                return { color: 'bg-gray-500', text: 'text-gray-700', bg: 'bg-gray-50', label: 'Desconocido' };
        }
    };

    // Handlers for Modal
    const handleOpenManageModal = (agreement) => {
        setSelectedAgreement(agreement);
        // Load existing overrides or default
        const existing = overrideValues[agreement.id] || {
            percent: agreement.tier,
            excludedValue: 0,
            excludedProducts: []
        };
        setOverrideValues(prev => ({
            ...prev,
            [agreement.id]: existing
        }));
        setIsManageModalOpen(true);
    };

    const handleSaveOverride = (id, newValues) => {
        setOverrideValues(prev => ({
            ...prev,
            [id]: newValues
        }));
        setIsManageModalOpen(false);
    };

    // Calculate final rebate considering overrides for display
    const calculateRebate = (agreement) => {
        const override = overrideValues[agreement.id];
        const percent = override ? override.percent : agreement.tier;
        const exclusions = override ? override.excludedValue : 0;

        // Logic: (Current Sales - Exclusions) * Percent
        const baseAmount = Math.max(0, agreement.current - exclusions);
        const rebate = baseAmount * (percent / 100);
        return rebate;
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Módulo de Rebates</h1>
                <div className="flex gap-2 relative">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <Calendar size={18} />
                        {quarter}
                    </Button>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                            {quarters.map((q) => (
                                <button
                                    key={q}
                                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${quarter === q ? 'font-bold text-primary-600 bg-primary-50' : 'text-gray-600'}`}
                                    onClick={() => {
                                        setQuarter(q);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => alert(`Exportando reporte de Rebates para ${quarter}...`)}
                    >
                        <Download size={18} />
                        Exportar
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardContent className="p-6 flex items-center space-x-4">
                            <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                                <p className="text-xs text-gray-400">{stat.subtitle}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar cliente o contrato..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Agreements List */}
            <div className="space-y-4">
                {rebateAgreements.map((item) => {
                    const statusInfo = getStatusInfo(item.status);
                    const progress = Math.min((item.current / item.target) * 100, 100);
                    const finalRebate = calculateRebate(item);
                    const hasOverride = overrideValues[item.id] && (overrideValues[item.id].percent !== item.tier || overrideValues[item.id].excludedValue > 0);

                    return (
                        <Card key={item.id} className={`hover:shadow-md transition-shadow cursor-pointer ${hasOverride ? 'border-l-4 border-l-yellow-400' : ''}`}>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-lg ${statusInfo.bg}`}>
                                            <TrendingUp className={statusInfo.text} size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">{item.client}</h3>
                                            <p className="text-sm text-gray-500 font-mono">{item.contract}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Rebate Final (Est.)</p>
                                            <p className={`text-xl font-bold ${hasOverride ? 'text-yellow-600' : 'text-primary-600'}`}>
                                                ${finalRebate.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                            </p>
                                            {hasOverride && <p className="text-[10px] text-gray-400">Ajustado Manualmente</p>}
                                        </div>
                                        <div className="h-10 w-px bg-gray-200 hidden md:block"></div>
                                        <div className="text-right hidden md:block">
                                            <p className="text-xs text-gray-500 uppercase font-semibold">Tier / %</p>
                                            <Badge variant="outline">
                                                {overrideValues[item.id]?.percent ? `${overrideValues[item.id].percent}%` : item.tierName}
                                            </Badge>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => handleOpenManageModal(item)}>
                                            <Settings size={18} className="text-gray-400" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Progress Section */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            Ventas: <span className="font-semibold text-gray-900">${item.current.toLocaleString()}</span>
                                            {overrideValues[item.id]?.excludedValue > 0 &&
                                                <span className="text-red-500 text-xs ml-2">(-${overrideValues[item.id].excludedValue.toLocaleString()} Excluidos)</span>
                                            }
                                        </span>
                                        <span className="text-gray-600">
                                            Meta: <span className="font-semibold text-gray-900">${item.target.toLocaleString()}</span>
                                        </span>
                                    </div>
                                    <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`absolute left-0 top-0 h-full ${statusInfo.color} transition-all duration-500`}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs items-center">
                                        <span className={`font-medium ${statusInfo.text}`}>
                                            {statusInfo.label} ({progress.toFixed(1)}%)
                                        </span>
                                        <span className="text-gray-400">Vence: {item.endDate}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Manage Rebate Modal */}
            {selectedAgreement && (
                <AgreementManagementModal
                    isOpen={isManageModalOpen}
                    onClose={() => setIsManageModalOpen(false)}
                    agreement={selectedAgreement}
                    initialValues={overrideValues[selectedAgreement.id]}
                    onSave={(values) => handleSaveOverride(selectedAgreement.id, values)}
                />
            )}
        </div>
    );
};

const AgreementManagementModal = ({ isOpen, onClose, agreement, initialValues, onSave }) => {
    const [percent, setPercent] = useState(initialValues?.percent || 0);
    // Mock Products for Exclusion
    const [products, setProducts] = useState([
        { id: 'P01', name: 'NUEVO: Crema Anti-Edad 50ml', value: 1200, isExcluded: false },
        { id: 'P02', name: 'Pack Promocional Verano', value: 5400, isExcluded: false },
        { id: 'P03', name: 'Discontinuado: Jarabe Tos 100ml', value: 800, isExcluded: false },
        { id: 'P04', name: 'Línea Regular: Analgésicos', value: 45000, isExcluded: false },
    ]);

    // Restore exclusions if previously saved (Mock logic: matches by ID if we had real persistence)
    // For prototype, we just init state. In real app, initialValues would have the list of excluded IDs.

    const toggleExclusion = (id) => {
        setProducts(products.map(p =>
            p.id === id ? { ...p, isExcluded: !p.isExcluded } : p
        ));
    };

    const totalExcluded = products.filter(p => p.isExcluded).reduce((acc, curr) => acc + curr.value, 0);
    const adjustedBase = Math.max(0, agreement.current - totalExcluded);
    const estimatedRebate = adjustedBase * (percent / 100);

    const handleSave = () => {
        onSave({
            percent: parseFloat(percent),
            excludedValue: totalExcluded,
            excludedProducts: products.filter(p => p.isExcluded).map(p => p.id)
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`Gestión de Rebate: ${agreement.client}`}
            footer={
                <>
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar Cambios</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Override PercentageSection */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Porcentaje Final Negociado (%)</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="number"
                            step="0.1"
                            className="w-24 border border-gray-300 rounded px-3 py-2 text-lg font-bold text-gray-800 focus:ring-2 focus:ring-primary-500"
                            value={percent}
                            onChange={(e) => setPercent(e.target.value)}
                        />
                        <span className="text-sm text-gray-500">
                            (Tier Calculado: <strong>{agreement.tier}%</strong>)
                        </span>
                        {percent !== agreement.tier &&
                            <Badge variant="warning">Manual</Badge>
                        }
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        Use este campo para ajustar manualmente el porcentaje en casos de "Zona Gris" o negociación especial.
                    </p>
                </div>

                {/* Exclusions Section */}
                <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center justify-between">
                        <span>Exclusión de Productos</span>
                        <span className="text-xs font-normal text-red-600">Total Excluido: ${totalExcluded.toLocaleString()}</span>
                    </h4>
                    <div className="border rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="px-4 py-2 text-left">Producto</th>
                                    <th className="px-4 py-2 text-right">Venta ($)</th>
                                    <th className="px-4 py-2 text-center">Excluir</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {products.map(p => (
                                    <tr key={p.id} className={p.isExcluded ? 'bg-red-50' : ''}>
                                        <td className="px-4 py-2">{p.name}</td>
                                        <td className="px-4 py-2 text-right">${p.value.toLocaleString()}</td>
                                        <td className="px-4 py-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={p.isExcluded}
                                                onChange={() => toggleExclusion(p.id)}
                                                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Calculation Preview */}
                <div className="border-t pt-4">
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Base de Cálculo Original:</span>
                        <span>${agreement.current.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1 text-red-600">
                        <span>(-) Exclusiones:</span>
                        <span>-${totalExcluded.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-gray-800 border-t border-dashed pt-1 mt-1">
                        <span>Base Ajustada:</span>
                        <span>${adjustedBase.toLocaleString()}</span>
                    </div>
                    <div className="mt-3 bg-blue-50 p-3 rounded flex justify-between items-center">
                        <span className="text-blue-800 font-medium">Rebate Final a Pagar:</span>
                        <span className="text-xl font-bold text-blue-700">${estimatedRebate.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Rebates;
