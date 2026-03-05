/**
 * @fileoverview Sidebar navigation with CloudZoo branding.
 */

import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
    { id: 'bom', label: 'BOM Input', icon: ClipboardListIcon },
    { id: 'consumption', label: 'Consumption', icon: PackageOpenIcon },
    { id: 'variance', label: 'Variance Report', icon: BarChart3Icon },
    { id: 'orders', label: 'Order Summary', icon: FolderIcon },
    { id: 'report', label: 'Industry Report', icon: IndustryReportIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

function LayoutDashboardIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
    );
}

function ClipboardListIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 11h4" /><path d="M12 16h4" />
            <path d="M8 11h.01" /><path d="M8 16h.01" />
        </svg>
    );
}

function PackageOpenIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 22v-9" /><path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z" />
            <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" />
            <path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z" />
        </svg>
    );
}

function BarChart3Icon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
        </svg>
    );
}

function FolderIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
        </svg>
    );
}

function IndustryReportIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M2 15h10" />
            <path d="m9 18 3-3-3-3" />
        </svg>
    );
}

function SettingsIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

export function Sidebar({ activePage, onNavigate }) {
    return (
        <aside className="fixed left-0 top-0 h-screen w-60 bg-[#1A1A2E] flex flex-col z-50">
            {/* CloudZoo Branding */}
            <div className="px-5 py-5">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold tracking-tight text-white">
                        cloud<span className="text-[#6B7280]">zoo</span>
                    </span>
                    <span className="text-[#6B7280] text-xs font-light mt-0.5">⌐</span>
                </div>
                <p className="text-[10px] text-[#6B7280] tracking-widest uppercase mt-0.5">
                    Industrial Automation
                </p>
            </div>

            <Separator className="bg-[#2A2A3E]" />

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = activePage === item.id;
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer ${isActive
                                    ? 'bg-[#2A2A3E] text-white border-l-2 border-white'
                                    : 'text-[#9CA3AF] hover:text-white hover:bg-[#2A2A3E]/50'
                                }`}
                        >
                            <Icon className="shrink-0" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-[#2A2A3E]">
                <p className="text-[10px] text-[#6B7280]">CloudZoo India Softwares</p>
                <p className="text-[10px] text-[#4B5563]">Tiruppur, Tamil Nadu</p>
            </div>
        </aside>
    );
}
