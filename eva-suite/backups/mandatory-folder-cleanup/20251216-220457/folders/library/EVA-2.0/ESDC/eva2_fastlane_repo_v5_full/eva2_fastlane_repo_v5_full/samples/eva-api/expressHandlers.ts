// samples/eva-api/expressHandlers.ts
// Minimal Express-based implementation sketch for EVA API fastlane demo.

import express, { Request, Response } from 'express';

interface ProjectConfig {
  projectId: string;
  name: string;
  description?: string;
  theme: {
    primaryColor: string;
    backgroundColor: string;
    headerTextColor: string;
  };
  i18n: Record<string, string>;
  api: {
    ragEndpoint: string;
    safetyProfile: string;
  };
}

interface LayoutSection {
  id: string;
  type: string;
  props?: Record<string, any>;
}

interface Layout {
  pageId: string;
  version?: string;
  sections: LayoutSection[];
}

interface ScreenTemplate {
  templateId: string;
  label: string;
  description?: string;
  layoutRef: string;
  allowedProjects: string[];
  editableProps: string[];
}

interface Asset {
  assetId: string;
  type: string;
  path: string;
  description?: string;
}

interface RagHistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RagRequest {
  question: string;
  projectId: string;
  history?: RagHistoryMessage[];
}

interface RagAnswer {
  text: string;
  citations?: Array<{
    sourceId: string;
    snippet?: string;
  }>;
}

interface SafetyResult {
  blocked: boolean;
  reason?: string;
  redactedText?: string;
}

interface RagResponse {
  answer: RagAnswer;
  safety?: SafetyResult;
}

// Demo in-memory data
const demoProjects: ProjectConfig[] = [
  {
    projectId: 'canadaLife',
    name: 'Canada Life Assistant',
    description: 'Benefits and policy Q&A assistant.',
    theme: {
      primaryColor: '#c8102e',
      backgroundColor: '#fff5f7',
      headerTextColor: '#ffffff',
    },
    i18n: {},
    api: {
      ragEndpoint: '/rag/answer',
      safetyProfile: 'standard',
    },
  },
];

const demoLayout: Layout = {
  pageId: 'eva_da_home',
  version: '1.0',
  sections: [
    {
      id: 'hero',
      type: 'HeroBanner',
      props: {
        headlineKeyEn: 'home.hero.headline_en',
        headlineKeyFr: 'home.hero.headline_fr',
        subtitleKeyEn: 'home.hero.subtitle_en',
        subtitleKeyFr: 'home.hero.subtitle_fr',
        graphicAssetId: 'hero_animated_eva',
        showClearChatButton: true,
      },
    },
  ],
};

const demoTemplates: ScreenTemplate[] = [
  {
    templateId: 'chat_landing_v1',
    label: 'Chat landing – hero + quick actions + chat',
    description: 'Standard EVA DA welcome screen.',
    layoutRef: 'layouts/eva_da_home',
    allowedProjects: ['*'],
    editableProps: [
      'hero.props.headlineKeyEn',
      'hero.props.headlineKeyFr',
      'hero.props.subtitleKeyEn',
      'hero.props.subtitleKeyFr',
    ],
  },
];

const demoAssets: Asset[] = [
  {
    assetId: 'hero_animated_eva',
    type: 'gif',
    path: '/assets/illustrations/eva-hero.gif',
    description: 'Animated EVA assistant illustration.',
  },
];

async function answerWithRag(req: RagRequest): Promise<RagAnswer> {
  return {
    text: `Demo answer for project '${req.projectId}': you asked "${req.question}". In a real implementation, this would call Azure OpenAI + search.`,
    citations: [],
  };
}

function runSafetyCheck(text: string): SafetyResult {
  const sinPattern = /\b\d{3}-\d{3}-\d{3}\b/;
  if (sinPattern.test(text)) {
    return {
      blocked: false,
      reason: 'sin-like-pattern-redacted',
      redactedText: text.replace(sinPattern, '[REDACTED_SIN]'),
    };
  }
  return { blocked: false };
}

function trackUsage(event: { projectId: string; endpoint: string; questionLength?: number }) {
  console.log('[EVA-METERING]', JSON.stringify(event));
}

export function createEvaApiApp() {
  const app = express();
  app.use(express.json());

  app.get('/projects', (req: Request, res: Response) => {
    res.json({ projects: demoProjects });
  });

  app.get('/layouts/:pageId', (req: Request, res: Response) => {
    const { pageId } = req.params;
    if (pageId !== 'eva_da_home') {
      return res.status(404).json({ error: 'Layout not found' });
    }
    res.json(demoLayout);
  });

  app.get('/assets', (req: Request, res: Response) => {
    res.json({ assets: demoAssets });
  });

  app.get('/templates', (req: Request, res: Response) => {
    res.json({ templates: demoTemplates });
  });

  app.post('/rag/answer', async (req: Request, res: Response) => {
    const body = req.body as RagRequest;

    if (!body || typeof body.question !== 'string' || typeof body.projectId !== 'string') {
      return res.status(400).json({ error: 'Invalid RagRequest' });
    }

    trackUsage({
      projectId: body.projectId,
      endpoint: '/rag/answer',
      questionLength: body.question.length,
    });

    try {
      const answer = await answerWithRag(body);
      const safety = runSafetyCheck(answer.text);
      const response: RagResponse = {
        answer: safety.redactedText ? { ...answer, text: safety.redactedText } : answer,
        safety,
      };
      res.json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to generate answer' });
    }
  });

  return app;
}

if (require.main === module) {
  const app = createEvaApiApp();
  const port = process.env.PORT || 7071;
  app.listen(port, () => {
    console.log(`EVA API demo listening on http://localhost:${port}`);
  });
}
