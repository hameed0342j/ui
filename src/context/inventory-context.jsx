/**
 * @fileoverview Inventory state management via useReducer + Context.
 * Provides { state, dispatch } to the entire app.
 */

import { createContext, useReducer, useContext } from 'react';
import { INITIAL_ORDERS } from '@/lib/data';

const InventoryContext = createContext(null);

const ACTION = {
    UPDATE_BOM: 'UPDATE_BOM',
    UPDATE_CONSUMPTION: 'UPDATE_CONSUMPTION',
    UPDATE_STOCK: 'UPDATE_STOCK',
};

function inventoryReducer(state, action) {
    switch (action.type) {
        case ACTION.UPDATE_BOM: {
            const { orderId, itemId, field, value } = action.payload;
            return {
                ...state,
                orders: state.orders.map((order) => {
                    if (order.id !== orderId) return order;
                    return {
                        ...order,
                        items: order.items.map((item) => {
                            if (item.id !== itemId) return item;
                            return { ...item, [field]: Number(value) || 0 };
                        }),
                    };
                }),
            };
        }
        case ACTION.UPDATE_CONSUMPTION: {
            const { orderId, itemId, field, value } = action.payload;
            return {
                ...state,
                orders: state.orders.map((order) => {
                    if (order.id !== orderId) return order;
                    return {
                        ...order,
                        items: order.items.map((item) => {
                            if (item.id !== itemId) return item;
                            return { ...item, [field]: Number(value) || 0 };
                        }),
                    };
                }),
            };
        }
        default:
            return state;
    }
}

export function InventoryProvider({ children }) {
    const [state, dispatch] = useReducer(
        inventoryReducer,
        null,
        () => ({ orders: INITIAL_ORDERS })
    );

    return (
        <InventoryContext.Provider value={{ state, dispatch }}>
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventory() {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error('useInventory must be used within an InventoryProvider');
    }
    return context;
}

export { ACTION };
