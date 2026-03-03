export type SovereignProfileId = 'canada_gc_intranet' | 'uk_gov_internal' | 'us_gov_internal' | 'australia_gov_internal' | 'new_zealand_gov_internal'

export interface SovereignProfile {
    id: SovereignProfileId
    name: string
    description: string
    colors: {
        primary: string
        secondary: string
        accent: string
        background: string
        foreground: string
    }
}

export const sovereignProfiles: Record<SovereignProfileId, SovereignProfile> = {
    canada_gc_intranet: {
        id: 'canada_gc_intranet',
        name: 'Canada GC',
        description: 'Government of Canada intranet design system',
        colors: {
            primary: 'oklch(0.45 0.12 250)',
            secondary: 'oklch(0.50 0.20 25)',
            accent: 'oklch(0.55 0.15 150)',
            background: 'oklch(0.98 0 0)',
            foreground: 'oklch(0.20 0 0)',
        },
    },
    uk_gov_internal: {
        id: 'uk_gov_internal',
        name: 'UK Government',
        description: 'UK Government design system adaptation',
        colors: {
            primary: 'oklch(0.30 0.08 260)',
            secondary: 'oklch(0.45 0.12 340)',
            accent: 'oklch(0.50 0.15 120)',
            background: 'oklch(0.96 0 0)',
            foreground: 'oklch(0.18 0 0)',
        },
    },
    us_gov_internal: {
        id: 'us_gov_internal',
        name: 'US Government',
        description: 'US Government design system adaptation',
        colors: {
            primary: 'oklch(0.40 0.15 230)',
            secondary: 'oklch(0.48 0.18 15)',
            accent: 'oklch(0.52 0.12 140)',
            background: 'oklch(0.97 0 0)',
            foreground: 'oklch(0.22 0 0)',
        },
    },
    australia_gov_internal: {
        id: 'australia_gov_internal',
        name: 'Australian Government',
        description: 'Australian Government design system adaptation',
        colors: {
            primary: 'oklch(0.35 0.10 245)',
            secondary: 'oklch(0.58 0.16 35)',
            accent: 'oklch(0.48 0.14 165)',
            background: 'oklch(0.99 0 0)',
            foreground: 'oklch(0.19 0 0)',
        },
    },
    new_zealand_gov_internal: {
        id: 'new_zealand_gov_internal',
        name: 'New Zealand Government',
        description: 'New Zealand Government design system adaptation',
        colors: {
            primary: 'oklch(0.28 0.09 255)',
            secondary: 'oklch(0.52 0.14 20)',
            accent: 'oklch(0.45 0.13 155)',
            background: 'oklch(0.98 0 0)',
            foreground: 'oklch(0.17 0 0)',
        },
    },
}
