/**
 * @fileoverview Industry Report — split-panel viewer.
 * Left: category navigation. Right: full image gallery for selected category.
 * Single click on any image opens fullscreen lightbox.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { REPORT_META, REPORT_SECTIONS, getPageImageUrl } from '@/lib/report-data';

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                          */
/* ------------------------------------------------------------------ */

function ClipboardIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>);
}
function GlobeIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>);
}
function LayersIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" /><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" /></svg>);
}
function FlagIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" x2="4" y1="22" y2="15" /></svg>);
}
function ThreadIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4.93 4.93a10 10 0 0 0 14.14 14.14" /><path d="M19.07 4.93a10 10 0 0 0-14.14 14.14" /><circle cx="12" cy="12" r="4" /><path d="M12 2v4" /><path d="M12 18v4" /></svg>);
}
function ShirtIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" /></svg>);
}
function ShipIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" /><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" /><path d="M12 10v4" /><path d="M12 2v3" /></svg>);
}
function LeafIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 1c1 2 2 4.5 2 8 0 5.5-4.78 11-10 11z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>);
}
function TrendingIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>);
}
function XIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>);
}
function ArrowLeftIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>);
}
function ArrowRightIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 5 7 7-7 7" /><path d="M5 12h14" /></svg>);
}
function ZoomInIcon(p) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="M11 8v6" /><path d="M8 11h6" /></svg>);
}

const ICON_MAP = {
    clipboard: ClipboardIcon, globe: GlobeIcon, layers: LayersIcon,
    flag: FlagIcon, thread: ThreadIcon, shirt: ShirtIcon,
    ship: ShipIcon, leaf: LeafIcon, trending: TrendingIcon,
};

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */

function Lightbox({ pageNum, caption, onClose, onPrev, onNext, hasPrev, hasNext }) {
    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && hasPrev) onPrev();
            if (e.key === 'ArrowRight' && hasNext) onNext();
        }
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [onClose, onPrev, onNext, hasPrev, hasNext]);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md" onClick={onClose}>
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-6 bg-gradient-to-b from-black/60 to-transparent z-10">
                <span className="text-white/90 text-sm font-medium">
                    Page {pageNum} — {caption}
                </span>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors" aria-label="Close">
                    <XIcon />
                </button>
            </div>

            {/* Nav arrows */}
            {hasPrev && (
                <button className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 z-10" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">
                    <ArrowLeftIcon />
                </button>
            )}
            {hasNext && (
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 z-10" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">
                    <ArrowRightIcon />
                </button>
            )}

            {/* Image */}
            <img
                src={getPageImageUrl(pageNum)}
                alt={caption}
                className="max-h-[92vh] max-w-[92vw] rounded-xl shadow-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Gallery image card                                                 */
/* ------------------------------------------------------------------ */

function GalleryImage({ page, onClick, sectionColor }) {
    return (
        <button
            onClick={onClick}
            className="group relative rounded-xl overflow-hidden bg-white border border-border/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring text-left"
        >
            <div className="relative overflow-hidden">
                <img
                    src={getPageImageUrl(page.page)}
                    alt={page.caption}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="flex items-center gap-1.5 text-white text-xs font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20">
                        <ZoomInIcon /> View Full Size
                    </span>
                </div>
            </div>
            {/* Caption bar */}
            <div className="px-4 py-3 border-t border-border/40 flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-foreground">{page.caption}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Page {page.page}</p>
                </div>
                <div className="w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: sectionColor }} />
            </div>
        </button>
    );
}

/* ------------------------------------------------------------------ */
/*  Left sidebar category nav                                          */
/* ------------------------------------------------------------------ */

function CategoryNav({ sections, activeId, onSelect }) {
    return (
        <div className="space-y-1">
            <div className="px-3 pb-3 mb-2 border-b border-border">
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    Categories
                </h3>
            </div>

            {sections.map((s) => {
                const Icon = ICON_MAP[s.icon] || ClipboardIcon;
                const isActive = activeId === s.id;
                return (
                    <button
                        key={s.id}
                        onClick={() => onSelect(s.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                            isActive
                                ? 'bg-white shadow-sm border border-border/60'
                                : 'hover:bg-muted/60 border border-transparent'
                        }`}
                    >
                        <div
                            className="flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-colors"
                            style={{
                                backgroundColor: isActive ? `${s.color}18` : 'transparent',
                                color: isActive ? s.color : 'var(--muted-foreground)',
                            }}
                        >
                            <Icon />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-[13px] font-medium truncate transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {s.title}
                            </p>
                            <p className="text-[10px] text-muted-foreground/70 mt-0.5">
                                {s.pages.length} pages
                            </p>
                        </div>
                        {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                        )}
                    </button>
                );
            })}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function IndustryReport() {
    const [activeSection, setActiveSection] = useState(REPORT_SECTIONS[0]?.id);
    const [lightbox, setLightbox] = useState(null);
    const galleryRef = useRef(null);

    const section = REPORT_SECTIONS.find((s) => s.id === activeSection) || REPORT_SECTIONS[0];

    const allPages = REPORT_SECTIONS.flatMap((s) =>
        s.pages.map((p) => ({ ...p, sectionTitle: s.title, color: s.color }))
    );

    const handleSelectSection = useCallback((id) => {
        setActiveSection(id);
        galleryRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    function openLightbox(page) {
        const idx = allPages.findIndex((p) => p.page === page.page);
        setLightbox(idx >= 0 ? idx : null);
    }

    const currentLb = lightbox != null ? allPages[lightbox] : null;

    return (
        <div className="report-viewer">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-bold text-foreground tracking-tight">
                        {REPORT_META.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {REPORT_META.publisher} · {REPORT_META.totalPages} pages
                    </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#6366F1]/10 text-[#6366F1]">
                    {REPORT_META.year} Report
                </span>
            </div>

            {/* Split layout */}
            <div className="flex gap-6 min-h-[calc(100vh-180px)]">
                {/* Left - Category nav */}
                <aside className="w-64 flex-shrink-0 sticky top-6 self-start">
                    <div className="bg-card rounded-xl border border-border p-3 shadow-sm">
                        <CategoryNav
                            sections={REPORT_SECTIONS}
                            activeId={activeSection}
                            onSelect={handleSelectSection}
                        />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="bg-card rounded-lg border border-border px-3 py-2.5 text-center">
                            <p className="text-lg font-bold tabular-nums text-foreground">{REPORT_SECTIONS.length}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Sections</p>
                        </div>
                        <div className="bg-card rounded-lg border border-border px-3 py-2.5 text-center">
                            <p className="text-lg font-bold tabular-nums text-foreground">{REPORT_META.totalPages}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Pages</p>
                        </div>
                    </div>
                </aside>

                {/* Right - Gallery */}
                <div className="flex-1 min-w-0" ref={galleryRef}>
                    {/* Section header */}
                    <div className="flex items-center gap-3 mb-5">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${section.color}15`, color: section.color }}
                        >
                            {(() => { const Icon = ICON_MAP[section.icon] || ClipboardIcon; return <Icon />; })()}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                            <p className="text-sm text-muted-foreground">{section.description}</p>
                        </div>
                    </div>

                    {/* Image grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {section.pages.map((page) => (
                            <GalleryImage
                                key={page.page}
                                page={page}
                                sectionColor={section.color}
                                onClick={() => openLightbox(page)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {currentLb && (
                <Lightbox
                    pageNum={currentLb.page}
                    caption={currentLb.caption}
                    onClose={() => setLightbox(null)}
                    onPrev={() => setLightbox((i) => Math.max(0, i - 1))}
                    onNext={() => setLightbox((i) => Math.min(allPages.length - 1, i + 1))}
                    hasPrev={lightbox > 0}
                    hasNext={lightbox < allPages.length - 1}
                />
            )}
        </div>
    );
}
