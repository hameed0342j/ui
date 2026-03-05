/**
 * @fileoverview Editable Actual Consumption table.
 */

import { useInventory, ACTION } from '@/context/inventory-context';
import { formatCurrency } from '@/lib/calc';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export function ConsumptionTable() {
    const { state, dispatch } = useInventory();

    function handleChange(orderId, itemId, field, value) {
        dispatch({
            type: ACTION.UPDATE_CONSUMPTION,
            payload: { orderId, itemId, field, value },
        });
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-foreground">Actual Consumption</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Enter actual quantities consumed and rates paid
                </p>
            </div>

            {state.orders.map((order) => (
                <div key={order.id} className="bg-card rounded-lg border border-border overflow-hidden">
                    <div className="px-4 py-3 border-b border-border bg-muted/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">
                                    Order #{order.id}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {order.customer} · {order.date}
                                </p>
                            </div>
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="w-[240px] text-xs font-semibold uppercase tracking-wider">Item</TableHead>
                                <TableHead className="w-[80px] text-xs font-semibold uppercase tracking-wider text-center">Unit</TableHead>
                                <TableHead className="w-[120px] text-xs font-semibold uppercase tracking-wider text-right">Actual Qty</TableHead>
                                <TableHead className="w-[120px] text-xs font-semibold uppercase tracking-wider text-right">Rate (₹)</TableHead>
                                <TableHead className="w-[140px] text-xs font-semibold uppercase tracking-wider text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.items.map((item) => {
                                const amount = item.actualQty * item.actualRate;
                                return (
                                    <TableRow key={item.id} className="h-[44px] transition-colors duration-100">
                                        <TableCell className="font-medium text-sm">{item.name}</TableCell>
                                        <TableCell className="text-center text-sm text-muted-foreground">{item.unit}</TableCell>
                                        <TableCell className="text-right p-1">
                                            <Input
                                                type="number"
                                                value={item.actualQty}
                                                onChange={(e) => handleChange(order.id, item.id, 'actualQty', e.target.value)}
                                                className="w-full text-right text-sm h-8 focus:ring-2 focus:ring-primary/30"
                                            />
                                        </TableCell>
                                        <TableCell className="text-right p-1">
                                            <Input
                                                type="number"
                                                value={item.actualRate}
                                                onChange={(e) => handleChange(order.id, item.id, 'actualRate', e.target.value)}
                                                className="w-full text-right text-sm h-8 focus:ring-2 focus:ring-primary/30"
                                            />
                                        </TableCell>
                                        <TableCell className="text-right text-sm font-medium tabular-nums">
                                            {formatCurrency(amount)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    <div className="px-4 py-2.5 border-t border-border bg-muted/20 flex justify-end">
                        <span className="text-sm font-semibold tabular-nums">
                            Total: {formatCurrency(
                                order.items.reduce((sum, item) => sum + item.actualQty * item.actualRate, 0)
                            )}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
