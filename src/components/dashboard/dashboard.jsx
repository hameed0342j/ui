/**
 * @fileoverview Dashboard stats cards and reorder alerts.
 */

import { useInventory } from '@/context/inventory-context';
import { calcDashboardStats, getReorderAlerts, formatCurrency, formatNumber } from '@/lib/calc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function StatCard({ title, value, subtitle, accent }) {
    return (
        <Card className="border-border">
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className={`text-2xl font-semibold tabular-nums ${accent ? accent : 'text-foreground'}`}>
                    {value}
                </p>
                {subtitle ? (
                    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                ) : null}
            </CardContent>
        </Card>
    );
}

function ReorderAlertCard({ alert }) {
    return (
        <div className="badge-warning flex items-center justify-between px-4 py-3 rounded-lg">
            <div>
                <p className="text-sm font-medium">{alert.name}</p>
                <p className="text-xs mt-0.5 opacity-80">
                    Stock: {formatNumber(alert.currentStock)} {alert.unit} · Min: {formatNumber(alert.minStock)} {alert.unit}
                </p>
            </div>
            <div className="text-right">
                <p className="text-sm font-semibold">
                    Reorder: {formatNumber(alert.reorderQty)} {alert.unit}
                </p>
            </div>
        </div>
    );
}

export function Dashboard() {
    const { state } = useInventory();

    // Derived during render — not in useEffect
    const stats = calcDashboardStats(state.orders);
    const alerts = getReorderAlerts(state.orders);

    const netStatus = stats.totalDiff > 0 ? 'text-[#B91C1C]' : stats.totalDiff < 0 ? 'text-[#15803D]' : '';

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-foreground">Dashboard</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Overview of all orders and inventory status
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Orders"
                    value={stats.orderCount}
                    subtitle="Active & completed"
                />
                <StatCard
                    title="Total Items"
                    value={stats.itemCount}
                    subtitle="Across all orders"
                />
                <StatCard
                    title="Net Variance"
                    value={formatCurrency(stats.totalDiff)}
                    subtitle={stats.totalDiff > 0 ? 'Over budget' : stats.totalDiff < 0 ? 'Under budget' : 'On budget'}
                    accent={netStatus}
                />
                <StatCard
                    title="Reorder Alerts"
                    value={stats.alertCount}
                    subtitle="Items below threshold"
                    accent={stats.alertCount > 0 ? 'text-[#B45309]' : ''}
                />
            </div>

            {/* Reorder Alerts */}
            {alerts.length > 0 ? (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#B45309] animate-pulse" />
                        Reorder Alerts
                    </h3>
                    <div className="space-y-2">
                        {alerts.map((alert) => (
                            <ReorderAlertCard key={alert.name} alert={alert} />
                        ))}
                    </div>
                </div>
            ) : null}

            {/* Quick Summary Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="px-4 py-3 border-b border-border bg-muted/30">
                    <h3 className="text-sm font-semibold text-foreground">Budget Overview</h3>
                </div>
                <div className="grid grid-cols-3 divide-x divide-border">
                    <div className="px-4 py-4 text-center">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Total Planned</p>
                        <p className="text-lg font-semibold tabular-nums">{formatCurrency(stats.totalPlanned)}</p>
                    </div>
                    <div className="px-4 py-4 text-center">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Total Actual</p>
                        <p className="text-lg font-semibold tabular-nums">{formatCurrency(stats.totalActual)}</p>
                    </div>
                    <div className="px-4 py-4 text-center">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Net Difference</p>
                        <p className={`text-lg font-semibold tabular-nums ${netStatus}`}>
                            {stats.totalDiff > 0 ? '+' : ''}{formatCurrency(stats.totalDiff)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
