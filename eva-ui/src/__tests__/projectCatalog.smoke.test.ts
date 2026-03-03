import { describe, expect, it } from "vitest";

import { getDemoProjects, getDemoTemplates } from "../lib/projectCatalog.js";

describe("eva-core contracts in eva-ui", () => {
    it("exposes typed demo data", () => {
        const projects = getDemoProjects();
        expect(projects[0].projectId).toBe("eva-da");
        expect(getDemoTemplates()[0].allowedProjects).toContain("eva-da");
    });
});
