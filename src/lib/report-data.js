/**
 * @fileoverview Wazir Advisors Annual T&A Industry Report 2023 — structured data.
 * Pages 4–37 organized into logical categories for the Industry Report viewer.
 * Image paths reference /public/report/page-XX.jpg served by Vite.
 */

export const REPORT_META = {
    title: 'Annual T&A Industry Report 2023',
    publisher: 'Wazir Advisors',
    year: 2023,
    totalPages: 34, // pages 4-37
};

/**
 * Each category groups a range of report pages under a thematic heading.
 * Adjust titles/descriptions as needed once the exact content is verified.
 */
export const REPORT_SECTIONS = [
    {
        id: 'executive-summary',
        title: 'Executive Summary',
        icon: 'clipboard',
        color: '#6366F1', // indigo
        description:
            'High-level overview of the global and Indian textile & apparel industry in 2023.',
        pages: [
            { page: 4, caption: 'Table of Contents' },
            { page: 5, caption: 'Executive Summary' },
        ],
    },
    {
        id: 'global-trade',
        title: 'Global T&A Trade',
        icon: 'globe',
        color: '#0EA5E9', // sky
        description:
            'World textile and apparel trade flows, major exporting and importing nations, and trade balance trends.',
        pages: [
            { page: 6, caption: 'Global T&A Trade Overview' },
            { page: 7, caption: 'Global Textile Trade' },
            { page: 8, caption: 'Global Apparel Trade' },
            { page: 9, caption: 'Major Exporters & Importers' },
            { page: 10, caption: 'Trade Flow Analysis' },
        ],
    },
    {
        id: 'global-fibre',
        title: 'Global Fibre & Yarn',
        icon: 'layers',
        color: '#8B5CF6', // violet
        description:
            'Global fibre production, consumption patterns, and yarn output across major producing countries.',
        pages: [
            { page: 11, caption: 'Global Fibre Production' },
            { page: 12, caption: 'Fibre Consumption Patterns' },
            { page: 13, caption: 'Global Yarn Production' },
            { page: 14, caption: 'Synthetic vs Natural Fibres' },
        ],
    },
    {
        id: 'india-overview',
        title: 'India T&A Industry',
        icon: 'flag',
        color: '#F59E0B', // amber
        description:
            'Overview of India\'s textile and apparel sector — market size, growth trajectory, and key indicators.',
        pages: [
            { page: 15, caption: 'India T&A Industry Overview' },
            { page: 16, caption: 'Market Size & Growth' },
            { page: 17, caption: 'Industry Structure' },
            { page: 18, caption: 'Key Performance Indicators' },
        ],
    },
    {
        id: 'india-fibre-yarn',
        title: 'India Fibre & Yarn',
        icon: 'thread',
        color: '#EC4899', // pink
        description:
            'India\'s fibre production & consumption, cotton and man-made fibre trends, and yarn output.',
        pages: [
            { page: 19, caption: 'India Fibre Production' },
            { page: 20, caption: 'Cotton Production & Consumption' },
            { page: 21, caption: 'Man-Made Fibre Trends' },
            { page: 22, caption: 'Yarn Production & Capacity' },
        ],
    },
    {
        id: 'india-fabric-apparel',
        title: 'India Fabric & Apparel',
        icon: 'shirt',
        color: '#14B8A6', // teal
        description:
            'Fabric production, weaving & knitting capacity, apparel manufacturing, and domestic consumption.',
        pages: [
            { page: 23, caption: 'Fabric Production Overview' },
            { page: 24, caption: 'Weaving & Knitting Capacity' },
            { page: 25, caption: 'Apparel Manufacturing' },
            { page: 26, caption: 'Domestic Market & Consumption' },
        ],
    },
    {
        id: 'india-trade',
        title: 'India T&A Trade',
        icon: 'ship',
        color: '#EF4444', // red
        description:
            'India\'s textile & apparel exports and imports, key trading partners, and trade balance.',
        pages: [
            { page: 27, caption: 'India T&A Exports Overview' },
            { page: 28, caption: 'Export Destinations' },
            { page: 29, caption: 'India T&A Imports' },
            { page: 30, caption: 'Trade Balance Analysis' },
        ],
    },
    {
        id: 'sustainability-tech',
        title: 'Sustainability & Technical Textiles',
        icon: 'leaf',
        color: '#22C55E', // green
        description:
            'Sustainable practices, circular economy initiatives, and growth in technical textiles segment.',
        pages: [
            { page: 31, caption: 'Sustainability Initiatives' },
            { page: 32, caption: 'Circular Economy in Textiles' },
            { page: 33, caption: 'Technical Textiles Overview' },
            { page: 34, caption: 'Technical Textiles Growth' },
        ],
    },
    {
        id: 'outlook',
        title: 'Outlook & Recommendations',
        icon: 'trending',
        color: '#F97316', // orange
        description:
            'Future outlook for the T&A industry, key recommendations, and strategic priorities.',
        pages: [
            { page: 35, caption: 'Industry Outlook 2024-25' },
            { page: 36, caption: 'Strategic Recommendations' },
            { page: 37, caption: 'Key Takeaways' },
        ],
    },
];

/**
 * Returns the public URL for a report page image.
 * @param {number} pageNum — page number (4-37)
 * @returns {string}
 */
export function getPageImageUrl(pageNum) {
    const padded = String(pageNum).padStart(2, '0');
    return `/report/page-${padded}.jpg`;
}
