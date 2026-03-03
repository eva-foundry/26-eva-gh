export const DEMO_MODE = true;

export interface DemoThreadSeed {
    id: string;
    title: string;
    mode: "internal" | "external";
    locale: string;
    messages?: { role: "user" | "assistant"; content: string; createdAt: string }[];
}

export const demoThreads: DemoThreadSeed[] = [
    {
        id: "demo-1",
        title: "What EVA Suite Enables at the GoC",
        mode: "internal",
        locale: "en-CA",
        messages: [
            {
                role: "user",
                content: "What does EVA Suite enable across the Government of Canada?",
                createdAt: new Date().toISOString()
            },
            {
                role: "assistant",
                content: "EVA unifies AI services, RAG engines, accessibility tooling, and DevOps into a single governed platform for all departments.",
                createdAt: new Date().toISOString()
            }
        ]
    },
    {
        id: "demo-2",
        title: "Why imagination is more important than knowledge",
        mode: "external",
        locale: "en-CA"
    },
    {
        id: "demo-3",
        title: "Revue d'accessibilité",
        mode: "internal",
        locale: "fr-CA"
    }
];
