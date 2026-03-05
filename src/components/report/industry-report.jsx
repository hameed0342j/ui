/**
 * @fileoverview Industry Report page — Wazir Advisors Annual T&A Report 2023.
 * Displays report pages organized by category with an interactive viewer.
 */

import { useState, useRef, useEffect } from 'react';
import { REPORT_META, REPORT_SECTIONS, getPageImageUrl } from '@/lib/report-data';
import { Card, CardContent } from '@/components/ui/card';

/* ------------------------------------------------------------------ */
/*  Icon components for each section                                   */
/* ------------------------------------------------------------------ */

function ClipboardIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        </svg>
    );
}

function GlobeIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
        </svg>
    );
}

function LayersIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
            <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
            <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
        </svg>
    );
}

function FlagIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" x2="4" y1="22" y2="15" />
        </svg>
    );
}

function ThreadIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4.93 4.93a10 10 0 0 0 14.14 14.14" />
            <path d="M19.07 4.93a10 10 0 0 0-14.14 14.14" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v4" /><path d="M12 18v4" />
        </svg>
    );
}

function ShirtIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </svg>
    );
}

function ShipIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
            <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
            <path d="M12 10v4" /><path d="M12 2v3" />
        </svg>
    );
}

function LeafIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 1c1 2 2 4.5 2 8 0 5.5-4.78 11-10 11z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
    );
}

function TrendingIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    );
}

function ChevronDownIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

function XIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
        </svg>
    );
}

function ArrowLeftIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
        </svg>
    );
}

function ArrowRightIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m12 5 7 7-7 7" /><path d="M5 12h14" />
        </svg>
    );
}

function ZoomInIcon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
            <path d="M11 8v6" /><path d="M8 11h6" />
        </svg>
    );
}

const ICON_MAP = {
    clipboard: ClipboardIcon,
    globe: GlobeIcon,
    layers: LayersIcon,
    flag: FlagIcon,
    thread: ThreadIcon,
    shirt: ShirtIcon,
    ship: ShipIcon,
    leaf: LeafIcon,
    trending: TrendingIcon,
};

/* ------------------------------------------------------------------ */
/*  Lightbox — full-screen image viewer                                */
/* ------------------------------------------------------------------ */

function Lightbox({ pageNum, caption, onClose, onPrev, onNext, hasPrev, hasNext }) {
    const imgRef = useRef(null);

    // Close on Escape, navigate with arrow keys
    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && hasPrev) onPrev();
            if (e.key === 'ArrowRight' && hasNext) onNext();
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, onPrev, onNext, hasPrev, hasNext]);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={onClose}
                aria-label="Close"
            >
                <XIcon />
            </button>

            {/* Caption */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white text-sm font-medium">
                Page {pageNum} — {caption}
            </div>

            {/* Previous */}
            {hasPrev && (
                <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    aria-label="Previous"
                >
                    <ArrowLeftIcon />
                </button>
            )}

            {/* Image */}
            <img
                ref={imgRef}
                src={getPageImageUrl(pageNum)}
                alt={caption}
                className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl object-contain"
                onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            {hasNext && (
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    aria-label="Next"
                >
                    <ArrowRightIcon />
                </button>
            )}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Page thumbnail card                                                */
/* ------------------------------------------------------------------ */

function PageCard({ page, onClick }) {
    return (
        <button
            onClick={onClick}
            className="group relative w-full rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                    src={getPageImageUrl(page.page)}
                    alt={page.caption}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="flex items-center gap-1.5 text-white text-xs font-medium px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                        <ZoomInIcon />
                        View Full Page
                    </span>
                </div>
            </div>
            {/* Caption */}
            <div className="px-3 py-2.5">
                <p className="text-xs font-medium text-foreground truncate">{page.caption}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Page {page.page}</p>
            </div>
        </button>
    );
}

/* ------------------------------------------------------------------ */
/*  Section component — collapsible category                           */
/* ------------------------------------------------------------------ */

function ReportSection({ section, isExpanded, onToggle, onPageClick }) {
    const Icon = ICON_MAP[section.icon] || ClipboardIcon;

    return (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-shadow hover:shadow-md">
            {/* Section header */}
            <button
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/50 transition-colors"
                onClick={onToggle}
            >
                {/* Icon badge */}
                <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${section.color}15`, color: section.color }}
                >
                    <Icon />
                </div>

                {/* Title + description */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{section.description}</p>
                </div>

                {/* Page count badge */}
                <span
                    className="flex-shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${section.color}15`, color: section.color }}
                >
                    {section.pages.length} pages
                </span>

                {/* Chevron */}
                <ChevronDownIcon
                    className={`flex-shrink-0 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Expandable grid */}
            <div
                className={`transition-all duration-400 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-5 pb-5 pt-2 border-t border-border">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {section.pages.map((page) => (
                            <PageCard
                                key={page.page}
                                page={page}
                                onClick={() => onPageClick(page)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Category quick-filter pill bar                                     */
/* ------------------------------------------------------------------ */

function CategoryPills({ sections, expandedIds, onToggle, onExpandAll, onCollapseAll }) {
    const allExpanded = expandedIds.length === sections.length;

    return (
        <div className="flex flex-wrap items-center gap-2">
            <button
                onClick={allExpanded ? onCollapseAll : onExpandAll}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-border bg-card text-muted-foreground hover:bg-muted transition-colors"
            >
                {allExpanded ? 'Collapse All' : 'Expand All'}
            </button>
            {sections.map((s) => {
                const active = expandedIds.includes(s.id);
                return (
                    <button
                        key={s.id}
                        onClick={() => onToggle(s.id)}
                        className="text-[11px] font-medium px-3 py-1.5 rounded-full border transition-colors"
                        style={
                            active
                                ? { backgroundColor: `${s.color}15`, borderColor: s.color, color: s.color }
                                : { borderColor: 'var(--border)', color: 'var(--muted-foreground)' }
                        }
                    >
                        {s.title}
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
    const [expandedIds, setExpandedIds] = useState([REPORT_SECTIONS[0]?.id]);
    const [lightbox, setLightbox] = useState(null); // { sectionIdx, pageIdx }

    // Build a flat list of all pages for lightbox navigation
    const allPages = REPORT_SECTIONS.flatMap((s) =>
        s.pages.map((p) => ({ ...p, sectionTitle: s.title }))
    );

    function toggleSection(id) {
        setExpandedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    }

    function expandAll() {
        setExpandedIds(REPORT_SECTIONS.map((s) => s.id));
    }

    function collapseAll() {
        setExpandedIds([]);
    }

    function openLightbox(page) {
        const flatIdx = allPages.findIndex((p) => p.page === page.page);
        setLightbox(flatIdx >= 0 ? flatIdx : null);
    }

    function closeLightbox() {
        setLightbox(null);
    }

    function prevPage() {
        setLightbox((i) => (i != null && i > 0 ? i - 1 : i));
    }

    function nextPage() {
        setLightbox((i) => (i != null && i < allPages.length - 1 ? i + 1 : i));
    }

    const currentLightboxPage = lightbox != null ? allPages[lightbox] : null;

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-foreground">
                        {REPORT_META.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Published by {REPORT_META.publisher} · {REPORT_META.totalPages} pages of data & analysis
                    </p>
                </div>
                <span className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#6366F1]/10 text-[#6366F1]">
                    {REPORT_META.year}
                </span>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 gap-4">
                <Card className="border-border">
                    <CardContent className="py-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Sections
                        </p>
                        <p className="text-2xl font-semibold tabular-nums text-foreground mt-1">
                            {REPORT_SECTIONS.length}
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-border">
                    <CardContent className="py-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Total Pages
                        </p>
                        <p className="text-2xl font-semibold tabular-nums text-foreground mt-1">
                            {REPORT_META.totalPages}
                        </p>
                    </CardContent>
                </Card>
                <Card className="border-border">
                    <CardContent className="py-4">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Report Year
                        </p>
                        <p className="text-2xl font-semibold tabular-nums text-foreground mt-1">
                            {REPORT_META.year}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Category pills */}
            <CategoryPills
                sections={REPORT_SECTIONS}
                expandedIds={expandedIds}
                onToggle={toggleSection}
                onExpandAll={expandAll}
                onCollapseAll={collapseAll}
            />

            {/* Sections */}
            <div className="space-y-4">
                {REPORT_SECTIONS.map((section) => (
                    <ReportSection
                        key={section.id}
                        section={section}
                        isExpanded={expandedIds.includes(section.id)}
                        onToggle={() => toggleSection(section.id)}
                        onPageClick={openLightbox}
                    />
                ))}
            </div>

            {/* Lightbox */}
            {currentLightboxPage && (
                <Lightbox
                    pageNum={currentLightboxPage.page}
                    caption={currentLightboxPage.caption}
                    onClose={closeLightbox}
                    onPrev={prevPage}
                    onNext={nextPage}
                    hasPrev={lightbox > 0}
                    hasNext={lightbox < allPages.length - 1}
                />
            )}
        </div>
    );
}
