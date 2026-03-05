/**
 * @fileoverview Order-wise summary with expandable item breakdowns.
 */

import { useState } from 'react';
import { useInventory } from '@/context/inventory-context';
import { calcOrderSummary, calcVariance, formatCurrency } from '@/lib/calc';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

function OrderCard({ order }) {
    const [isOpen, setIsOpen] = useState(false);

    // Derived during render
    const summary = calcOrderSummary(order);
    const diffStatus = summary.totalDiff > 0 ? 'loss' : summary.totalDiff < 0 ? 'saving' : 'neutral';

    return (
        <Card className="border-border overflow-hidden">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="w-full text-left cursor-pointer">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-sm font-semibold">
                                    Order #{order.id}
                                </CardTitle>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {order.customer} · {order.date}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.status === 'Completed'
                                        ? 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]'
                                        : 'bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]'
                                    }`}>
                                    {order.status}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-xs text-muted-foreground">Planned</p>
                                <p className="text-sm font-semibold tabular-nums">{formatCurrency(summary.totalPlanned)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Actual</p>
                                <p className="text-sm font-semibold tabular-nums">{formatCurrency(summary.totalActual)}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Variance</p>
                                <p className={`text-sm font-semibold tabular-nums ${diffStatus === 'loss' ? 'text-[#B91C1C]' : diffStatus === 'saving' ? 'text-[#15803D]' : ''
                                    }`}>
                                    {summary.totalDiff > 0 ? '+' : ''}{formatCurrency(summary.totalDiff)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <div className="border-t border-border">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Item</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Planned</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Actual</TableHead>
                                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Diff</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.items.map((item) => {
                                    const v = calcVariance(item.plannedQty, item.plannedRate, item.actualQty, item.actualRate);
                                    return (
                                        <TableRow key={item.id} className="h-[40px]">
                                            <TableCell className="text-sm">{item.name}</TableCell>
                                            <TableCell className="text-right text-sm tabular-nums">{formatCurrency(v.plannedAmt)}</TableCell>
                                            <TableCell className="text-right text-sm tabular-nums">{formatCurrency(v.actualAmt)}</TableCell>
                                            <TableCell className={`text-right text-sm tabular-nums font-medium ${v.status === 'loss' ? 'text-[#B91C1C]' : v.status === 'saving' ? 'text-[#15803D]' : ''
                                                }`}>
                                                {v.diff > 0 ? '+' : ''}{formatCurrency(v.diff)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </Card>
    );
}

export function OrderSummary() {
    const { state } = useInventory();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    Grouped breakdown per order with expandable details
                </p>
            </div>

            <div className="space-y-4">
                {state.orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
}
