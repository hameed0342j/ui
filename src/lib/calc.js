/**
 * @fileoverview Utility functions for variance calculation, currency formatting,
 * and reorder alert logic.
 */

/**
 * Formats a number as Indian Rupee currency.
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
    if (amount === 0) return '₹0.00';
    const absAmount = Math.abs(amount);
    const formatted = absAmount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return amount < 0 ? `-₹${formatted}` : `₹${formatted}`;
}

/**
 * Formats a number with Indian thousand separators.
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
    return num.toLocaleString('en-IN');
}

/**
 * Calculates variance between planned and actual amounts.
 * @param {number} plannedQty
 * @param {number} plannedRate
 * @param {number} actualQty
 * @param {number} actualRate
 * @returns {{ plannedAmt: number, actualAmt: number, diff: number, pct: number, status: string }}
 */
export function calcVariance(plannedQty, plannedRate, actualQty, actualRate) {
    const plannedAmt = plannedQty * plannedRate;
    const actualAmt = actualQty * actualRate;
    const diff = actualAmt - plannedAmt;

    if (plannedAmt === 0) {
        return { plannedAmt, actualAmt, diff, pct: 0, status: 'neutral' };
    }

    const pct = (diff / plannedAmt) * 100;

    let status = 'neutral';
    if (diff > 0) {
        status = 'loss';
    } else if (diff < 0) {
        status = 'saving';
    }

    return { plannedAmt, actualAmt, diff, pct, status };
}

/**
 * Generates reorder alerts for items below minimum stock threshold.
 * Combines items across all orders by name, using a single loop.
 * @param {Array} orders
 * @returns {Array<{ name: string, unit: string, currentStock: number, minStock: number, reorderQty: number }>}
 */
export function getReorderAlerts(orders) {
    const seen = new Map();

    for (let i = 0; i < orders.length; i++) {
        const items = orders[i].items;
        for (let j = 0; j < items.length; j++) {
            const item = items[j];
            if (item.currentStock < item.minStock && !seen.has(item.name)) {
                seen.set(item.name, {
                    name: item.name,
                    unit: item.unit,
                    currentStock: item.currentStock,
                    minStock: item.minStock,
                    reorderQty: item.minStock * 2 - item.currentStock,
                });
            }
        }
    }

    return Array.from(seen.values());
}

/**
 * Calculates order-level summary totals.
 * Single loop through items — combines filter/map/reduce.
 * @param {object} order
 * @returns {{ totalPlanned: number, totalActual: number, totalDiff: number, itemCount: number }}
 */
export function calcOrderSummary(order) {
    let totalPlanned = 0;
    let totalActual = 0;

    for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        totalPlanned += item.plannedQty * item.plannedRate;
        totalActual += item.actualQty * item.actualRate;
    }

    return {
        totalPlanned,
        totalActual,
        totalDiff: totalActual - totalPlanned,
        itemCount: order.items.length,
    };
}

/**
 * Calculates aggregate stats across all orders.
 * @param {Array} orders
 * @returns {{ orderCount: number, itemCount: number, totalPlanned: number, totalActual: number, totalDiff: number, alertCount: number }}
 */
export function calcDashboardStats(orders) {
    let totalPlanned = 0;
    let totalActual = 0;
    let itemCount = 0;

    for (let i = 0; i < orders.length; i++) {
        const summary = calcOrderSummary(orders[i]);
        totalPlanned += summary.totalPlanned;
        totalActual += summary.totalActual;
        itemCount += summary.itemCount;
    }

    const alerts = getReorderAlerts(orders);

    return {
        orderCount: orders.length,
        itemCount,
        totalPlanned,
        totalActual,
        totalDiff: totalActual - totalPlanned,
        alertCount: alerts.length,
    };
}
