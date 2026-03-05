/**
 * @fileoverview App shell with sidebar layout and page routing via state.
 */

import { useState } from 'react';
import { InventoryProvider } from '@/context/inventory-context';
import { Sidebar } from '@/components/layout/sidebar';
import { Dashboard } from '@/components/dashboard/dashboard';
import { BomTable } from '@/components/tables/bom-table';
import { ConsumptionTable } from '@/components/tables/consumption-table';
import { VarianceReport } from '@/components/tables/variance-report';
import { OrderSummary } from '@/components/orders/order-summary';
import { Settings } from '@/components/settings/settings';

const PAGES = {
    dashboard: Dashboard,
    bom: BomTable,
    consumption: ConsumptionTable,
    variance: VarianceReport,
    orders: OrderSummary,
    settings: Settings,
};

export function App() {
    const [activePage, setActivePage] = useState('dashboard');

    const PageComponent = PAGES[activePage] || Dashboard;

    return (
        <InventoryProvider>
            <div className="min-h-screen bg-background">
                <Sidebar activePage={activePage} onNavigate={setActivePage} />

                {/* Main Content */}
                <main className="ml-60 min-h-screen">
                    <div className="max-w-5xl mx-auto px-6 py-6">
                        {/* Page Header Breadcrumb */}
                        <div className="mb-6 pb-4 border-b border-border">
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">
                                CloudZoo · Inventory Reorder Prediction
                            </p>
                        </div>

                        <PageComponent />
                    </div>
                </main>
            </div>
        </InventoryProvider>
    );
}
