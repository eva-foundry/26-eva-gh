/**
 * Example theme map for EVA projects.
 * In real implementation, this could be derived from project config coming from eva-seed.
 */
export type ProjectId = 'canadaLife' | 'jurisprudence' | 'admin';

export interface ProjectTheme {
  primaryColor: string;
  backgroundColor: string;
  headerTextColor: string;
}

export const themeByProjectId: Record<ProjectId, ProjectTheme> = {
  canadaLife: {
    primaryColor: '#c8102e',
    backgroundColor: '#fff5f7',
    headerTextColor: '#ffffff',
  },
  jurisprudence: {
    primaryColor: '#004f9f',
    backgroundColor: '#f3f7ff',
    headerTextColor: '#ffffff',
  },
  admin: {
    primaryColor: '#111827',
    backgroundColor: '#f9fafb',
    headerTextColor: '#ffffff',
  },
};
