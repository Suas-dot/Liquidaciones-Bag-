import React, { useState } from 'react';
import {
    DollarSign,
    Users,
    FileText,
    RefreshCw,
    Search,
    Download,
    Eye,
    Calendar,
    TrendingUp,
    TrendingDown,
    AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';

const EstadosCuenta = () => {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isUpdating, setIsUpdating] = useState(false);

    // Mock data for account statements
    const [accounts, setAccounts] = useState([
        {
            id: 1,
            client: 'GPF',
            clientCode: 'CLI001',
            lastUpdate: '2024-12-23 14:30',
            pendingBalance: 15420.50,
            ncIssued: 8,
            ncTotal: 12500.00,
            status: 'al_dia',
            paymentTerms: 30,
            overdueAmount: 0,
            creditLimit: 50000,
            availableCredit: 34579.50,
            recentNCs: [
                { id: 'NC-2024-001', date: '2024-12-15', amount: 2500.00, status: 'aprobada' },
                { id: 'NC-2024-005', date: '2024-12-18', amount: 3200.00, status: 'procesada' }
            ],
            recentPayments: [
                { id: 'PAG-001', date: '2024-12-10', amount: 5000.00, reference: 'Transferencia' },
                { id: 'PAG-002', date: '2024-12-20', amount: 3500.00, reference: 'Cheque 12345' }
            ]
        },
        {
            id: 2,
            client: 'Difar',
            clientCode: 'CLI002',
            lastUpdate: '2024-12-23 10:15',
            pendingBalance: 8750.25,
            ncIssued: 5,
            ncTotal: 6200.00,
            status: 'pendiente',
            paymentTerms: 45,
            overdueAmount: 2500.00,
            creditLimit: 30000,
            availableCredit: 21249.75,
            recentNCs: [
                { id: 'NC-2024-003', date: '2024-12-12', amount: 1800.00, status: 'aprobada' }
            ],
            recentPayments: [
                { id: 'PAG-003', date: '2024-12-05', amount: 2000.00, reference: 'Transferencia' }
            ]
        },
        {
            id: 3,
            client: 'FarmaEnlace',
            clientCode: 'CLI003',
            lastUpdate: '2024-12-22 16:45',
            pendingBalance: 22340.80,
            ncIssued: 12,
            ncTotal: 18900.00,
            status: 'atrasado',
            paymentTerms: 30,
            overdueAmount: 8500.00,
            creditLimit: 60000,
            availableCredit: 37659.20,
            recentNCs: [
                { id: 'NC-2024-002', date: '2024-12-08', amount: 4500.00, status: 'procesada' },
                { id: 'NC-2024-007', date: '2024-12-19', amount: 3100.00, status: 'aprobada' }
            ],
            recentPayments: [
                { id: 'PAG-004', date: '2024-11-28', amount: 6000.00, reference: 'Transferencia' }
            ]
        },
        {
            id: 4,
            client: 'Cruz Azul',
            clientCode: 'CLI004',
            lastUpdate: '2024-12-23 09:00',
            pendingBalance: 5680.00,
            ncIssued: 3,
            ncTotal: 4200.00,
            status: 'al_dia',
            paymentTerms: 60,
            overdueAmount: 0,
            creditLimit: 25000,
            availableCredit: 19320.00,
            recentNCs: [
                { id: 'NC-2024-006', date: '2024-12-16', amount: 2100.00, status: 'procesada' }
            ],
            recentPayments: [
                { id: 'PAG-005', date: '2024-12-18', amount: 4000.00, reference: 'Transferencia' }
            ]
        },
        {
            id: 5,
            client: 'Verdezoto',
            clientCode: 'CLI005',
            lastUpdate: '2024-12-21 11:20',
            pendingBalance: 31250.60,
            ncIssued: 15,
            ncTotal: 25600.00,
            status: 'atrasado',
            paymentTerms: 30,
            overdueAmount: 12000.00,
            creditLimit: 75000,
            availableCredit: 43749.40,
            recentNCs: [
                { id: 'NC-2024-004', date: '2024-12-14', amount: 5200.00, status: 'aprobada' },
                { id: 'NC-2024-008', date: '2024-12-21', amount: 4800.00, status: 'pendiente' }
            ],
            recentPayments: [
                { id: 'PAG-006', date: '2024-11-30', amount: 8000.00, reference: 'Transferencia' }
            ]
        }
    ]);

    const handleViewDetail = (account) => {
        setSelectedAccount(account);
        setShowDetailModal(true);
    };

    const handleUpdateFromSAP = async (accountId = null) => {
        setIsUpdating(true);

        // Simulate SAP update
        setTimeout(() => {
            if (accountId) {
                // Update single account
                setAccounts(accounts.map(acc =>
                    acc.id === accountId
                        ? { ...acc, lastUpdate: new Date().toISOString().slice(0, 16).replace('T', ' ') }
                        : acc
                ));
            } else {
                // Update all accounts
                setAccounts(accounts.map(acc => ({
                    ...acc,
                    lastUpdate: new Date().toISOString().slice(0, 16).replace('T', ' ')
                })));
            }
            setIsUpdating(false);
        }, 2000);
    };

    const handleExportExcel = () => {
        // Simulate Excel export
        alert('Exportando estados de cuenta a Excel...');
    };

    const getStatusInfo = (status) => {
        const statusConfig = {
            al_dia: { label: 'Al Día', color: 'bg-green-100 text-green-800', icon: TrendingUp },
            pendiente: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
            atrasado: { label: 'Atrasado', color: 'bg-red-100 text-red-800', icon: TrendingDown }
        };
        return statusConfig[status] || statusConfig.pendiente;
    };

    const filteredAccounts = accounts.filter(account => {
        const matchesSearch =
            account.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.clientCode.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || account.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        totalClients: accounts.length,
        totalPending: accounts.reduce((sum, acc) => sum + acc.pendingBalance, 0),
        totalOverdue: accounts.reduce((sum, acc) => sum + acc.overdueAmount, 0),
        totalNCs: accounts.reduce((sum, acc) => sum + acc.ncIssued, 0)
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Estados de Cuenta</h1>
                    <p className="text-gray-600 mt-1">Monitor de cuentas por cliente</p>
                </div>
                <div className="flex space-x-3">
                    <Button
                        variant="outline"
                        onClick={handleExportExcel}
                        className="flex items-center space-x-2"
                    >
                        <Download size={20} />
                        <span>Exportar Excel</span>
                    </Button>
                    <Button
                        onClick={() => handleUpdateFromSAP()}
                        disabled={isUpdating}
                        className="flex items-center space-x-2"
                    >
                        <RefreshCw size={20} className={isUpdating ? 'animate-spin' : ''} />
                        <span>{isUpdating ? 'Actualizando...' : 'Actualizar desde SAP'}</span>
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Clientes</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalClients}</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Users className="text-gray-600" size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Saldo Pendiente</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    ${stats.totalPending.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Saldo Vencido</p>
                                <p className="text-2xl font-bold text-red-600">
                                    ${stats.totalOverdue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <AlertCircle className="text-red-600" size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">NCs Emitidas</p>
                                <p className="text-2xl font-bold text-primary-600">{stats.totalNCs}</p>
                            </div>
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                <FileText className="text-primary-600" size={24} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por cliente o código..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="al_dia">Al Día</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="atrasado">Atrasado</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Accounts Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Estados de Cuenta por Cliente</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Cliente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Última Actualización
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Saldo Pendiente
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Saldo Vencido
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NC Emitidas
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Crédito Disponible
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estado
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAccounts.map(account => {
                                    const statusInfo = getStatusInfo(account.status);
                                    const StatusIcon = statusInfo.icon;

                                    return (
                                        <tr key={account.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{account.client}</div>
                                                <div className="text-xs text-gray-500">{account.clientCode}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center space-x-1">
                                                    <Calendar size={14} />
                                                    <span>{account.lastUpdate}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                ${account.pendingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-red-600">
                                                {account.overdueAmount > 0
                                                    ? `$${account.overdueAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                                                    : '-'
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{account.ncIssued}</div>
                                                <div className="text-xs text-gray-500">
                                                    ${account.ncTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-green-600">
                                                    ${account.availableCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    de ${account.creditLimit.toLocaleString('en-US')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge className={statusInfo.color}>
                                                    <StatusIcon size={14} className="mr-1" />
                                                    {statusInfo.label}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <button
                                                    onClick={() => handleViewDetail(account)}
                                                    className="text-primary-600 hover:text-primary-900"
                                                    title="Ver detalle"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateFromSAP(account.id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="Actualizar desde SAP"
                                                    disabled={isUpdating}
                                                >
                                                    <RefreshCw size={18} className={isUpdating ? 'animate-spin' : ''} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Detail Modal */}
            <Modal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                title="Detalle de Estado de Cuenta"
                size="xl"
            >
                {selectedAccount && (
                    <div className="space-y-6">
                        {/* Account Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Cliente</p>
                                <p className="font-semibold text-gray-900">{selectedAccount.client}</p>
                                <p className="text-xs text-gray-500">{selectedAccount.clientCode}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Última Actualización</p>
                                <p className="font-semibold text-gray-900">{selectedAccount.lastUpdate}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Estado</p>
                                <Badge className={getStatusInfo(selectedAccount.status).color}>
                                    {getStatusInfo(selectedAccount.status).label}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Plazo de Pago</p>
                                <p className="font-semibold text-gray-900">{selectedAccount.paymentTerms} días</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Límite de Crédito</p>
                                <p className="font-semibold text-gray-900">
                                    ${selectedAccount.creditLimit.toLocaleString('en-US')}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Crédito Disponible</p>
                                <p className="font-semibold text-green-600">
                                    ${selectedAccount.availableCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>

                        {/* Financial Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="pt-4">
                                    <p className="text-sm text-gray-600">Saldo Pendiente</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        ${selectedAccount.pendingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-4">
                                    <p className="text-sm text-gray-600">Saldo Vencido</p>
                                    <p className="text-2xl font-bold text-red-600">
                                        ${selectedAccount.overdueAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="pt-4">
                                    <p className="text-sm text-gray-600">Total NCs</p>
                                    <p className="text-2xl font-bold text-primary-600">
                                        ${selectedAccount.ncTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-xs text-gray-500">{selectedAccount.ncIssued} emitidas</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent NCs */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Notas de Crédito Recientes</h3>
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NC</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {selectedAccount.recentNCs.map(nc => (
                                            <tr key={nc.id}>
                                                <td className="px-4 py-3 text-sm font-medium">{nc.id}</td>
                                                <td className="px-4 py-3 text-sm">{nc.date}</td>
                                                <td className="px-4 py-3 text-sm font-semibold">
                                                    ${nc.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <StatusBadge status={nc.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Payments */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Pagos Recientes</h3>
                            <div className="border border-gray-300 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Pago</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referencia</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {selectedAccount.recentPayments.map(payment => (
                                            <tr key={payment.id}>
                                                <td className="px-4 py-3 text-sm font-medium">{payment.id}</td>
                                                <td className="px-4 py-3 text-sm">{payment.date}</td>
                                                <td className="px-4 py-3 text-sm font-semibold text-green-600">
                                                    ${payment.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </td>
                                                <td className="px-4 py-3 text-sm">{payment.reference}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                                Cerrar
                            </Button>
                            <Button onClick={() => handleUpdateFromSAP(selectedAccount.id)}>
                                <RefreshCw size={16} className="mr-2" />
                                Actualizar desde SAP
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default EstadosCuenta;
