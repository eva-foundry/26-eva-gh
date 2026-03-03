import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'en' | 'fr';

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

const translations: Translations = {
  // App Core
  appTitle: {
    en: 'EVA Suite',
    fr: 'Suite EVA',
  },
  navProducts: {
    en: 'Products',
    fr: 'Produits',
  },
  navDevTools: {
    en: 'DevTools',
    fr: 'Outils Dev',
  },
  navAbout: {
    en: 'About',
    fr: 'À Propos',
  },
  navLanguage: {
    en: 'Language',
    fr: 'Langue',
  },
  heroTagline: {
    en: 'Personal lab – Dec 24, 2025 demo',
    fr: 'Labo personnel – Démo 24 déc 2025',
  },

  // App Navigation (legacy keys for compatibility)
  'nav.products': {
    en: 'Products',
    fr: 'Produits',
  },
  'nav.switchLang': {
    en: 'Switch to French',
    fr: 'Passer en anglais',
  },

  // Home Page
  'home.vision.title': {
    en: 'The EVA Suite: A Visionary\'s Personal Project',
    fr: 'La Suite EVA : Un Projet Personnel Visionnaire',
  },
  'home.dashboard.title': {
    en: 'EVA Suite Dashboard',
    fr: 'Tableau de Bord EVA Suite',
  },
  'home.dashboard.subtitle': {
    en: 'Enterprise AI Platform - Development Status & Progress Tracking',
    fr: 'Plateforme IA d\'Entreprise - État de Développement et Suivi des Progrès',
  },
  'home.products.title': {
    en: 'EVA Suite Product Lineup',
    fr: 'Gamme de Produits EVA Suite',
  },
  'home.products.intro': {
    en: 'Every EVA product works 3 ways: Traditional UI clicks, Chat with keyboard, or Voice commands.',
    fr: 'Chaque produit EVA fonctionne de 3 façons : Clics UI traditionnels, Chat au clavier, ou Commandes vocales.',
  },
  'home.demo.badge': {
    en: 'Demo',
    fr: 'Démo',
  },

  // Home DevTools Section
  'home.devtools.hero.title': {
    en: 'EVA Suite DevTools',
    fr: 'Outils de Développement EVA Suite',
  },
  'home.devtools.hero.subtitle': {
    en: 'AI-native DevOps with built-in transparency for IT shops & research labs',
    fr: 'DevOps natif IA avec transparence intégrée pour équipes IT et laboratoires de recherche',
  },
  'home.devtools.highlights.audit.title': {
    en: 'Audit Everything',
    fr: 'Auditer Tout',
  },
  'home.devtools.highlights.audit.description': {
    en: 'JSONL logs, 21-day maps, and query tools track every file change.',
    fr: 'Journaux JSONL, cartes 21 jours, outils de requête suivent chaque modification.',
  },
  'home.devtools.highlights.automate.title': {
    en: 'Automate Responsibly',
    fr: 'Automatiser Responsablement',
  },
  'home.devtools.highlights.automate.description': {
    en: 'Nightly GitHub Actions with explainable updates and retry logic.',
    fr: 'Actions GitHub nocturnes avec mises à jour explicables et logique de réessai.',
  },
  'home.devtools.highlights.measure.title': {
    en: 'Measure AI Value',
    fr: 'Mesurer la Valeur IA',
  },
  'home.devtools.highlights.measure.description': {
    en: 'Cost per file/feature change via P02 CSV and FinOps correlators.',
    fr: 'Coût par changement fichier/fonctionnalité via P02 CSV et corrélateurs FinOps.',
  },

  // Product Card
  'product.description': {
    en: 'Description',
    fr: 'Description',
  },
  'product.useCase': {
    en: 'Use Case',
    fr: 'Cas d\'Usage',
  },
  'product.example': {
    en: 'Example:',
    fr: 'Exemple :',
  },
  'product.theArt': {
    en: 'The Art:',
    fr: 'L\'Art :',
  },

  // Product Page
  'productPage.back': {
    en: 'Back to all products',
    fr: 'Retour aux produits',
  },
  'productPage.overview': {
    en: 'Overview',
    fr: 'Aperçu',
  },
  'productPage.sampleUseCase': {
    en: 'Sample use case',
    fr: 'Exemple de cas d\'usage',
  },
  'productPage.moonshot': {
    en: 'Moonshot vision',
    fr: 'Vision ambitieuse',
  },

  // Footer
  'footer.builtWith': {
    en: 'Built with ChatGPT + Copilot',
    fr: 'Créé avec ChatGPT + Copilot',
  },

  // DevTools Product Page
  'devtools.hero.title': {
    en: 'EVA Suite DevTools – Autonomous, Explainable DevOps',
    fr: 'Outils EVA Suite – DevOps Autonome et Explicable',
  },
  'devtools.hero.subtitle': {
    en: 'For IT shops & research labs building AI-native platforms',
    fr: 'Pour équipes IT et laboratoires construisant des plateformes IA natives',
  },
  'devtools.hero.description': {
    en: 'EVA Suite DevTools helps IT shops & research labs see how code, documents, and AI-assisted work evolve over time, with audit trails, GitHub Actions automation, and FinOps-aware analytics.',
    fr: 'Les Outils EVA Suite aident les équipes IT et laboratoires à voir comment le code, les documents et le travail assisté par IA évoluent dans le temps, avec pistes d\'audit, automatisation GitHub Actions et analytique FinOps.',
  },

  'devtools.highlights.audit.title': {
    en: 'Audit Trails',
    fr: 'Pistes d\'Audit',
  },
  'devtools.highlights.audit.description': {
    en: 'Complete file change history with JSONL logs, JSON state snapshots, and 21-day human-readable maps.',
    fr: 'Historique complet des changements avec journaux JSONL, snapshots d\'état JSON et cartes lisibles sur 21 jours.',
  },
  'devtools.highlights.automate.title': {
    en: 'Autonomous Workflows',
    fr: 'Workflows Autonomes',
  },
  'devtools.highlights.automate.description': {
    en: 'Nightly GitHub Actions with automatic commits, retry logic, and error artifact uploads.',
    fr: 'Actions GitHub nocturnes avec commits automatiques, logique de réessai et téléversement d\'artéfacts d\'erreurs.',
  },
  'devtools.highlights.measure.title': {
    en: 'FinOps Analytics',
    fr: 'Analytique FinOps',
  },
  'devtools.highlights.measure.description': {
    en: 'Track AI costs per file change, feature, and sprint with Power BI dashboards.',
    fr: 'Suivre les coûts IA par changement de fichier, fonctionnalité et sprint avec tableaux de bord Power BI.',
  },
  'devtools.highlights.liveops.title': {
    en: 'LiveOps Dashboards',
    fr: 'Tableaux de Bord LiveOps',
  },
  'devtools.highlights.liveops.description': {
    en: 'Real-time repository activity monitoring with change velocity and hotspot analysis.',
    fr: 'Surveillance d\'activité de dépôt en temps réel avec vélocité de changement et analyse de points chauds.',
  },
  'devtools.highlights.multirepo.title': {
    en: 'Multi-Repo Pattern',
    fr: 'Modèle Multi-Dépôts',
  },
  'devtools.highlights.multirepo.description': {
    en: 'Bootstrap script for extending audit trails across entire platform portfolios.',
    fr: 'Script d\'amorçage pour étendre les pistes d\'audit à travers les portefeuilles de plateforme.',
  },
  'devtools.highlights.experiments.title': {
    en: 'AI Experiments',
    fr: 'Expériences IA',
  },
  'devtools.highlights.experiments.description': {
    en: 'Requirements engine (P02) tracks OpenAI usage, tokens, and costs per feature.',
    fr: 'Moteur d\'exigences (P02) suit l\'utilisation OpenAI, jetons et coûts par fonctionnalité.',
  },

  'devtools.auditTrail.title': {
    en: 'EVA Audit Trail',
    fr: 'Piste d\'Audit EVA',
  },
  'devtools.auditTrail.description': {
    en: 'Per-repo file change tracking system maintaining both machine-readable (JSONL) and human-readable (Markdown) logs of all modifications. Enables sprint activity reconstruction and answers "what changed when?" queries.',
    fr: 'Système de suivi des changements de fichiers par dépôt maintenant des journaux lisibles par machine (JSONL) et par humain (Markdown). Permet la reconstruction d\'activité de sprint et répond aux questions "qu\'est-ce qui a changé quand?".',
  },
  'devtools.auditTrail.features.title': {
    en: 'Key Features',
    fr: 'Fonctionnalités Clés',
  },
  'devtools.auditTrail.features.jsonl': {
    en: 'Append-only JSONL log',
    fr: 'Journal JSONL append-only',
  },
  'devtools.auditTrail.features.jsonlDesc': {
    en: 'Machine-readable audit events with timestamps, file paths, and change types',
    fr: 'Événements d\'audit lisibles par machine avec horodatages, chemins de fichiers et types de changement',
  },
  'devtools.auditTrail.features.map': {
    en: '21-day Markdown map',
    fr: 'Carte Markdown 21 jours',
  },
  'devtools.auditTrail.features.mapDesc': {
    en: 'Human-readable rolling summary of recent changes',
    fr: 'Résumé lisible des changements récents',
  },
  'devtools.auditTrail.features.queries': {
    en: 'PowerShell query tools',
    fr: 'Outils de requête PowerShell',
  },
  'devtools.auditTrail.features.queriesDesc': {
    en: 'Filter by date range, file pattern, or change type',
    fr: 'Filtrer par plage de dates, motif de fichier ou type de changement',
  },
  'devtools.auditTrail.features.sessions': {
    en: 'Work session recovery',
    fr: 'Récupération de session de travail',
  },
  'devtools.auditTrail.features.sessionsDesc': {
    en: 'Reconstruct missing session records from file timestamps',
    fr: 'Reconstruire les enregistrements de session manquants depuis les horodatages de fichiers',
  },
  'devtools.auditTrail.liveDashboard': {
    en: 'Live Repository Activity Dashboard',
    fr: 'Tableau de Bord d\'Activité de Dépôt en Direct',
  },

  'devtools.p02.title': {
    en: 'P02 Requirements Engine & Power BI Analytics',
    fr: 'Moteur d\'Exigences P02 & Analytique Power BI',
  },
  'devtools.p02.description': {
    en: 'The P02 pattern tracks OpenAI API usage during requirements analysis, logging tokens, costs, and model choices. This enables FinOps correlation between AI assistance and development outcomes.',
    fr: 'Le modèle P02 suit l\'utilisation de l\'API OpenAI pendant l\'analyse des exigences, enregistrant les jetons, coûts et choix de modèles. Cela permet la corrélation FinOps entre l\'assistance IA et les résultats de développement.',
  },
  'devtools.p02.powerbi.title': {
    en: 'Power BI Integration',
    fr: 'Intégration Power BI',
  },
  'devtools.p02.powerbi.description': {
    en: 'Export P02 usage analytics to Power BI-optimized CSV format for DevTools team dashboards:',
    fr: 'Exporter les analytiques d\'utilisation P02 au format CSV optimisé Power BI pour les tableaux de bord de l\'équipe DevTools:',
  },
  'devtools.p02.powerbi.output': {
    en: 'Output:',
    fr: 'Sortie:',
  },
  'devtools.p02.powerbi.columns': {
    en: 'CSV Columns:',
    fr: 'Colonnes CSV:',
  },
  'devtools.p02.powerbi.columnsDesc': {
    en: '17 columns including time dimensions (Date, Time, Year, Month, DayOfWeek, Hour), metrics (InputTokens, OutputTokens, CostEstimate), and dimensions (FeatureKey, Model, Caller)',
    fr: '17 colonnes incluant dimensions temporelles (Date, Heure, Année, Mois, JourDeLaSemaine, Heure), métriques (JetonsEntrée, JetonsSortie, EstimationCoût) et dimensions (CléFonctionnalité, Modèle, Appelant)',
  },
  'devtools.p02.powerbi.separation.title': {
    en: 'Analytics Pipeline Separation:',
    fr: 'Séparation des Pipelines d\'Analytique:',
  },
  'devtools.p02.powerbi.separation.devtools': {
    en: 'P02 → CSV → Power BI: DevTools usage analytics (requirements engine, pattern adoption)',
    fr: 'P02 → CSV → Power BI: Analytique d\'utilisation DevTools (moteur d\'exigences, adoption de modèles)',
  },
  'devtools.p02.powerbi.separation.liveops': {
    en: 'EVA Suite LiveOps/FinOps → APIM → Power BI: Platform endpoint monitoring (future)',
    fr: 'EVA Suite LiveOps/FinOps → APIM → Power BI: Surveillance des points de terminaison de plateforme (futur)',
  },
  'devtools.p02.capabilities.title': {
    en: 'Analytics Capabilities',
    fr: 'Capacités d\'Analytique',
  },
  'devtools.p02.capabilities.usage': {
    en: 'Track total OpenAI usage (tokens, costs) per project',
    fr: 'Suivre l\'utilisation totale OpenAI (jetons, coûts) par projet',
  },
  'devtools.p02.capabilities.breakdown': {
    en: 'Breakdown by feature_key (e.g., P02-AUDIT-001) and model (gpt-4.1, gpt-4.1-mini)',
    fr: 'Répartition par feature_key (ex: P02-AUDIT-001) et modèle (gpt-4.1, gpt-4.1-mini)',
  },
  'devtools.p02.capabilities.filters': {
    en: 'Optional filters: date range, specific feature, specific model',
    fr: 'Filtres optionnels: plage de dates, fonctionnalité spécifique, modèle spécifique',
  },
  'devtools.p02.capabilities.export': {
    en: 'Export to console (human-readable), formatted tables, or CSV for Power BI',
    fr: 'Exporter vers console (lisible), tableaux formatés ou CSV pour Power BI',
  },

  'devtools.finops.title': {
    en: 'FinOps Integration',
    fr: 'Intégration FinOps',
  },
  'devtools.finops.description': {
    en: 'Correlate AI usage costs with development activities. Track how much each file change, feature implementation, or sprint costs in OpenAI API usage.',
    fr: 'Corréler les coûts d\'utilisation IA avec les activités de développement. Suivre combien chaque changement de fichier, implémentation de fonctionnalité ou sprint coûte en utilisation API OpenAI.',
  },
  'devtools.finops.metrics.perFile': {
    en: 'Cost per File Change',
    fr: 'Coût par Changement de Fichier',
  },
  'devtools.finops.metrics.perFileDesc': {
    en: 'Link audit trail changes to P02 run_id for file-level cost attribution',
    fr: 'Lier les changements de piste d\'audit au run_id P02 pour attribution de coût au niveau fichier',
  },
  'devtools.finops.metrics.perFeature': {
    en: 'Cost per Feature',
    fr: 'Coût par Fonctionnalité',
  },
  'devtools.finops.metrics.perFeatureDesc': {
    en: 'Aggregate P02 costs by feature_key to understand feature development expenses',
    fr: 'Agréger les coûts P02 par feature_key pour comprendre les dépenses de développement de fonctionnalité',
  },
  'devtools.finops.metrics.perSprint': {
    en: 'Cost per Sprint',
    fr: 'Coût par Sprint',
  },
  'devtools.finops.metrics.perSprintDesc': {
    en: 'Roll up P02 costs by sprint dates for budget tracking and velocity correlation',
    fr: 'Rouler les coûts P02 par dates de sprint pour suivi de budget et corrélation de vélocité',
  },

  'devtools.liveops.title': {
    en: 'LiveOps Dashboards',
    fr: 'Tableaux de Bord LiveOps',
  },
  'devtools.liveops.description': {
    en: 'Real-time visibility into repository activity patterns. See which files change most frequently, track work session durations, and identify development hotspots.',
    fr: 'Visibilité en temps réel des modèles d\'activité de dépôt. Voir quels fichiers changent le plus fréquemment, suivre les durées de session de travail et identifier les points chauds de développement.',
  },
  'devtools.liveops.dashboards.title': {
    en: 'Dashboard Views',
    fr: 'Vues de Tableau de Bord',
  },
  'devtools.liveops.dashboards.activity': {
    en: 'Recent Activity',
    fr: 'Activité Récente',
  },
  'devtools.liveops.dashboards.activityDesc': {
    en: 'Last 7 days of file changes grouped by day',
    fr: 'Derniers 7 jours de changements de fichiers groupés par jour',
  },
  'devtools.liveops.dashboards.hotspots': {
    en: 'File Hotspots',
    fr: 'Points Chauds de Fichiers',
  },
  'devtools.liveops.dashboards.hotspotsDesc': {
    en: 'Most frequently modified files and directories',
    fr: 'Fichiers et répertoires modifiés le plus fréquemment',
  },
  'devtools.liveops.dashboards.velocity': {
    en: 'Change Velocity',
    fr: 'Vélocité de Changement',
  },
  'devtools.liveops.dashboards.velocityDesc': {
    en: 'Files created/modified per day trend analysis',
    fr: 'Analyse de tendance des fichiers créés/modifiés par jour',
  },
  'devtools.liveops.dashboards.sessions': {
    en: 'Work Sessions',
    fr: 'Sessions de Travail',
  },
  'devtools.liveops.dashboards.sessionsDesc': {
    en: 'Detected work sessions with duration and file counts',
    fr: 'Sessions de travail détectées avec durée et comptes de fichiers',
  },

  // Info Assistant Demo
  'infoAssistant.hero.heading': {
    en: 'Info Assistant – Impossible Now Possible',
    fr: 'Assistant d’information – L’impossible devient possible',
  },
  'infoAssistant.hero.subheading': {
    en: 'Bilingual, accessible storytelling surface powered by seeded data and EVA i18n contracts.',
    fr: 'Surface narrative bilingue et accessible alimentée par des données démonstratives et les contrats i18n d’EVA.',
  },
  'infoAssistant.hero.badge': {
    en: 'Priority 1 Demo',
    fr: 'Démo priorité 1',
  },
  'infoAssistant.cards.label': {
    en: 'Story cards',
    fr: 'Cartes narratives',
  },
  'infoAssistant.cards.detailsLabel': {
    en: 'Card details',
    fr: 'Détails de la carte',
  },
  'infoAssistant.cards.copilot.details': {
    en: 'Explains how Copilot Pro+ offloads routine work so humans stay focused on architecture, testing, and accessibility. The Info Assistant page uses this copy as live proof that strings can be swapped in seconds.',
    fr: 'Explique comment Copilot Pro+ décharge les tâches routinières afin que les humains se concentrent sur l’architecture, les tests et l’accessibilité. La page de l’assistant d’information utilise ce texte comme preuve vivante que les chaînes peuvent être modifiées en quelques secondes.',
  },
  'infoAssistant.cards.imagination.details': {
    en: 'Highlights why imagination-led demos matter: seeded data plus explainability beats static slideware. Reviewers can toggle cards, voice, and i18n editor without waiting for backend integration.',
    fr: 'Souligne pourquoi les démonstrations guidées par l’imagination sont essentielles : données semées et explicabilité surpassent les présentations statiques. Les réviseurs peuvent basculer entre les cartes, la voix et l’éditeur i18n sans attendre l’intégration backend.',
  },
  'infoAssistant.cards.evaAtGoC.details': {
    en: 'Connects the Info Assistant experience to Government of Canada priorities: bilingual delivery, WCAG readiness, and governance hooks that APIM + FinOps will provide next.',
    fr: 'Relie l’expérience Assistant d’information aux priorités du GC : livraison bilingue, préparation WCAG et points d’ancrage de gouvernance qu’APIM + FinOps fourniront ensuite.',
  },
  'infoAssistant.voice.localeSwitcher': {
    en: 'Voice sample locale',
    fr: 'Langue de l’exemple vocal',
  },
  'infoAssistant.voice.promptLabel': {
    en: 'User prompt',
    fr: 'Invite utilisateur',
  },
  'infoAssistant.voice.responseLabel': {
    en: 'Assistant response',
    fr: 'Réponse de l’assistant',
  },
  'infoAssistant.voice.sample.en.prompt': {
    en: '“EVA, what changed in the audit trail today? Highlight anything that affects accessibility.”',
    fr: '“EVA, what changed in the audit trail today? Highlight anything that affects accessibility.”',
  },
  'infoAssistant.voice.sample.en.response': {
    en: '“Two pull requests touched the WCAG scanner: focus ring refactor merged and localization copy updated. No regressions detected. I logged a reminder to run Axe after the next deploy.”',
    fr: '“Deux demandes de tirage ont modifié l’analyseur WCAG : refonte de l’anneau de focus et mise à jour des textes de localisation. Aucune régression détectée. J’ai consigné un rappel pour exécuter Axe après le prochain déploiement.”',
  },
  'infoAssistant.voice.sample.fr.prompt': {
    en: '« EVA, quelles mises à jour dois-je partager avec le CIO aujourd’hui? »',
    fr: '« EVA, quelles mises à jour dois-je partager avec le CIO aujourd’hui? »',
  },
  'infoAssistant.voice.sample.fr.response': {
    en: '“Résumé en français : LiveOps demeure stable, la démo Info Assistant est prête côté UI et l’intégration APIM commence demain. Aucune alerte critique.”',
    fr: '« Résumé : LiveOps demeure stable, la démo Assistant d’information côté interface est prête et l’intégration APIM commence demain. Aucune alerte critique. »',
  },
  'infoAssistant.editor.title': {
    en: 'i18n editor preview',
    fr: 'Aperçu de l’éditeur i18n',
  },
  'infoAssistant.editor.description': {
    en: 'Strings shown here are sourced from the EVA i18n contract so APIM can serve them later.',
    fr: 'Les chaînes présentées proviennent du contrat i18n d’EVA afin qu’APIM puisse les diffuser plus tard.',
  },
  'infoAssistant.editor.rows.hero.label': {
    en: 'home.hero.heading',
    fr: 'home.hero.heading',
  },
  'infoAssistant.editor.rows.hero.value': {
    en: 'EVA Suite – One AI Platform, Many Experiences',
    fr: 'EVA Suite – Une plateforme d’IA, plusieurs expériences',
  },
  'infoAssistant.editor.rows.copilot.label': {
    en: 'home.cards.copilotLove.summary',
    fr: 'home.cards.copilotLove.summary',
  },
  'infoAssistant.editor.rows.voice.label': {
    en: 'home.voice.helper',
    fr: 'home.voice.helper',
  },
  'infoAssistant.disclaimer': {
    en: 'Lab data only. Strings are hydrated from mock contracts today and will flow through APIM + FinOps telemetry in the next increment.',
    fr: 'Données de laboratoire seulement. Les chaînes proviennent de contrats simulés aujourd’hui et passeront par APIM + télémétrie FinOps lors du prochain incrément.',
  },

  'devtools.multirepo.title': {
    en: 'Multi-Repo Pattern',
    fr: 'Modèle Multi-Dépôts',
  },
  'devtools.multirepo.description': {
    en: 'Start with one repository, then roll out EVA Audit Trail to your entire platform. The bootstrap script automates setup for IT shops & research labs managing multiple codebases.',
    fr: 'Commencer avec un dépôt, puis déployer la Piste d\'Audit EVA à toute votre plateforme. Le script d\'amorçage automatise la configuration pour équipes IT et laboratoires gérant plusieurs bases de code.',
  },
  'devtools.multirepo.bootstrap.title': {
    en: 'Bootstrap Steps',
    fr: 'Étapes d\'Amorçage',
  },
  'devtools.multirepo.bootstrap.step1': {
    en: 'Validate repository structure and Git status',
    fr: 'Valider la structure du dépôt et l\'état Git',
  },
  'devtools.multirepo.bootstrap.step2': {
    en: 'Copy eva-audit-update.ps1 to scripts/ directory',
    fr: 'Copier eva-audit-update.ps1 vers le répertoire scripts/',
  },
  'devtools.multirepo.bootstrap.step3': {
    en: 'Create docs/_audit/ and docs/_vault/ directories',
    fr: 'Créer les répertoires docs/_audit/ et docs/_vault/',
  },
  'devtools.multirepo.bootstrap.step4': {
    en: 'Generate repo-specific README with usage guide',
    fr: 'Générer README spécifique au dépôt avec guide d\'utilisation',
  },
  'devtools.multirepo.bootstrap.step5': {
    en: 'Copy GitHub Actions workflow for automated runs',
    fr: 'Copier le workflow GitHub Actions pour exécutions automatisées',
  },

  'devtools.automation.title': {
    en: 'GitHub Actions Automation',
    fr: 'Automatisation GitHub Actions',
  },
  'devtools.automation.description': {
    en: 'EVA Audit Trail runs automatically via GitHub Actions, with nightly updates, push triggers, and manual testing capabilities.',
    fr: 'La Piste d\'Audit EVA s\'exécute automatiquement via GitHub Actions, avec mises à jour nocturnes, déclencheurs push et capacités de test manuel.',
  },
  'devtools.automation.triggers.nightly': {
    en: 'Nightly (2 AM UTC)',
    fr: 'Nocturne (2h UTC)',
  },
  'devtools.automation.triggers.nightlyDesc': {
    en: 'Scheduled cron job for daily audit updates',
    fr: 'Tâche cron programmée pour mises à jour d\'audit quotidiennes',
  },
  'devtools.automation.triggers.push': {
    en: 'On Push',
    fr: 'Sur Push',
  },
  'devtools.automation.triggers.pushDesc': {
    en: 'Automatic run when changes are pushed to repository',
    fr: 'Exécution automatique quand changements sont poussés au dépôt',
  },
  'devtools.automation.triggers.manual': {
    en: 'Manual Trigger',
    fr: 'Déclencheur Manuel',
  },
  'devtools.automation.triggers.manualDesc': {
    en: 'On-demand execution for testing and validation',
    fr: 'Exécution à la demande pour test et validation',
  },

  'devtools.cta.title': {
    en: 'Ready to Get Started?',
    fr: 'Prêt à Commencer?',
  },
  'devtools.cta.subtitle': {
    en: 'Start with one repo, then roll out to many',
    fr: 'Commencer avec un dépôt, puis déployer à plusieurs',
  },
  'devtools.cta.description': {
    en: 'EVA Suite DevTools is designed for IT shops & research labs who want autonomous, explainable DevOps. Begin with EVA Audit Trail in your main repository, then use the bootstrap script to extend across your platform portfolio.',
    fr: 'Les Outils EVA Suite sont conçus pour les équipes IT et laboratoires qui veulent un DevOps autonome et explicable. Commencer avec la Piste d\'Audit EVA dans votre dépôt principal, puis utiliser le script d\'amorçage pour étendre à travers votre portefeuille de plateforme.',
  },
};

interface I18nContextType {
  language: Language;
  lang: Language;  // Alias for language
  setLanguage: (lang: Language) => void;
  setLang: (lang: Language) => void;  // Alias for setLanguage
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Missing translation for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <I18nContext.Provider value={{
      language,
      lang: language,
      setLanguage,
      setLang: setLanguage,
      toggleLanguage,
      t
    }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
