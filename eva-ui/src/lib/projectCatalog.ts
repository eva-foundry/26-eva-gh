import type { ProjectConfig, ScreenTemplate } from "eva-core";
import { projectConfigSchema, screenTemplateSchema } from "eva-core";

const demoProjects: ProjectConfig[] = [
    projectConfigSchema.parse({
        projectId: "eva-da",
        name: "EVA Domain Assistant",
        description: "CPP-D jurisprudence assistant",
        theme: {
            primaryColor: "#0050b3",
            backgroundColor: "#f4f6fb",
            headerTextColor: "#0f172a"
        },
        i18n: {
            headlineKeyEn: "eva.da.headline",
            headlineKeyFr: "eva.da.headline.fr",
            subtitleKeyEn: "eva.da.subtitle",
            subtitleKeyFr: "eva.da.subtitle.fr"
        },
        api: {
            ragEndpoint: "https://api.eva-da.local/rag/answer",
            safetyProfile: "standard"
        }
    })
];

const demoTemplates: ScreenTemplate[] = [
    screenTemplateSchema.parse({
        templateId: "eva-da.chat",
        label: "EVA DA Chat",
        layoutRef: "eva-da.dashboard",
        allowedProjects: ["eva-da"],
        editableProps: ["headlineKey", "primaryColor"]
    })
];

export function getDemoProjects(): ProjectConfig[] {
    return demoProjects;
}

export function getDemoTemplates(): ScreenTemplate[] {
    return demoTemplates;
}
