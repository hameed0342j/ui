/**
 * @fileoverview Variance Report — read-only table showing planned vs actual with color-coded badges.
 */

import { useInventory } from '@/context/inventory-context';
import { calcVariance, formatCurrency } from '@/lib/calc';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

function VarianceBadge({ diff, pct, status }) {
    if (status === 'neutral') {
        return (
            <Badge variant="secondary" className="tabular-nums text-xs">
                ₹0.00 (0%)
            </Badge>
        );
    }

    const sign = diff > 0 ? '+' : '';
    const label = `${sign}${formatCurrency(diff)} (${sign}${pct.toFixed(1)}%)`;

    return status === 'loss' ? (
        <span className="badge-loss inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tabular-nums">
            ▲ {label}
        </span>
    ) : (
        <span className="badge-saving inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tabular-nums">
            ▼ {label}
        </span>
    );
}

export function VarianceReport() {
    const { state } = useInventory();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-foreground">Variance Report</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Auto-calculated difference between planned and actual amounts
                </p>
            </div>

            {state.orders.map((order) => {
                let orderPlanned = 0;
                let orderActual = 0;

                return (
                    <div key={order.id} className="bg-card rounded-lg border border-border overflow-hidden">
                        <div className="px-4 py-3 border-b border-border bg-muted/30">
                            <h3 className="text-sm font-semibold text-foreground">
                                Order #{order.id}
                                <span className="font-normal text-muted-foreground ml-2">· {order.customer}</span>
                            </h3>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[200px] text-xs font-semibold uppercase tracking-wider">Item</TableHead>
                                    <TableHead className="w-[120px] text-xs font-semibold uppercase tracking-wider text-right">Planned Amt</TableHead>
                                    <TableHead className="w-[120px] text-xs font-semibold uppercase tracking-wider text-right">Actual Amt</TableHead>
                                    <TableHead className="w-[200px] text-xs font-semibold uppercase tracking-wider text-right">Difference</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.items.map((item) => {
                                    const v = calcVariance(item.plannedQty, item.plannedRate, item.actualQty, item.actualRate);
                                    orderPlanned += v.plannedAmt;
                                    orderActual += v.actualAmt;

                                    return (
                                        <TableRow key={item.id} className="h-[44px] transition-colors duration-100">
                                            <TableCell className="font-medium text-sm">{item.name}</TableCell>
                                            <TableCell className="text-right text-sm tabular-nums">{formatCurrency(v.plannedAmt)}</TableCell>
                                            <TableCell className="text-right text-sm tabular-nums">{formatCurrency(v.actualAmt)}</TableCell>
                                            <TableCell className="text-right">
                                                <VarianceBadge diff={v.diff} pct={v.pct} status={v.status} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>

                        <div className="px-4 py-2.5 border-t border-border bg-muted/20 flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Order Total</span>
                            <div className="flex items-center gap-4">
                                <span className="text-sm tabular-nums">
                                    Planned: <strong>{formatCurrency(orderPlanned)}</strong>
                                </span>
                                <span className="text-sm tabular-nums">
                                    Actual: <strong>{formatCurrency(orderActual)}</strong>
                                </span>
                                <VarianceBadge
                                    diff={orderActual - orderPlanned}
                                    pct={orderPlanned > 0 ? ((orderActual - orderPlanned) / orderPlanned) * 100 : 0}
                                    status={orderActual > orderPlanned ? 'loss' : orderActual < orderPlanned ? 'saving' : 'neutral'}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
