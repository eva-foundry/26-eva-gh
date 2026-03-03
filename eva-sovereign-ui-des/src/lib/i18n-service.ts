export type Locale = 'en-CA' | 'fr-CA'

export type TranslationKey = 
    | 'app.name'
    | 'hero.title'
    | 'hero.description'
    | 'header.skipToMain'
    | 'header.nav'
    | 'header.navigation'
    | 'language.english'
    | 'language.french'
    | 'language.switcher'
    | 'demo.controls'
    | 'demo.profile'
    | 'demo.language'
    | 'quick.actions.title'
    | 'quick.actions.myAccount'
    | 'quick.actions.myAccount.description'
    | 'quick.actions.applications'
    | 'quick.actions.applications.description'
    | 'quick.actions.payments'
    | 'quick.actions.payments.description'
    | 'quick.actions.documents'
    | 'quick.actions.documents.description'
    | 'chat.title'
    | 'chat.subtitle'
    | 'chat.welcome'
    | 'chat.placeholder'
    | 'chat.send'
    | 'chat.voice'
    | 'chat.sending'
    | 'chat.messageList'
    | 'footer.copyright'
    | 'footer.privacy'
    | 'footer.terms'
    | 'footer.accessibility'

const translations: Record<Locale, Record<TranslationKey, string>> = {
    'en-CA': {
        'app.name': 'Government Portal',
        'hero.title': 'Welcome to the Government Portal',
        'hero.description': 'Access your government services and information in one place',
        'header.skipToMain': 'Skip to main content',
        'header.nav': 'Main navigation',
        'header.navigation': 'Main navigation',
        'language.english': 'English',
        'language.french': 'Français',
        'language.switcher': 'Language toggle',
        'demo.controls': 'Demo Controls',
        'demo.profile': 'Profile',
        'demo.language': 'Language',
        'quick.actions.title': 'Quick Actions',
        'quick.actions.myAccount': 'My Account',
        'quick.actions.myAccount.description': 'View and manage your profile',
        'quick.actions.applications': 'Applications',
        'quick.actions.applications.description': 'Track your application status',
        'quick.actions.payments': 'Payments',
        'quick.actions.payments.description': 'View payment history',
        'quick.actions.documents': 'Documents',
        'quick.actions.documents.description': 'Access your documents',
        'chat.title': 'Ask EVA',
        'chat.subtitle': 'AI Assistant',
        'chat.welcome': 'Hello! How can I help you today?',
        'chat.placeholder': 'Type your message...',
        'chat.send': 'Send',
        'chat.voice': 'Voice input',
        'chat.sending': 'Sending...',
        'chat.messageList': 'Message list',
        'footer.copyright': '© 2024 Government Portal',
        'footer.privacy': 'Privacy',
        'footer.terms': 'Terms of Use',
        'footer.accessibility': 'Accessibility'
    },
    'fr-CA': {
        'app.name': 'Portail gouvernemental',
        'hero.title': 'Bienvenue au portail gouvernemental',
        'hero.description': 'Accédez à vos services et informations gouvernementaux en un seul endroit',
        'header.skipToMain': 'Passer au contenu principal',
        'header.nav': 'Navigation principale',
        'header.navigation': 'Navigation principale',
        'language.english': 'English',
        'language.french': 'Français',
        'language.switcher': 'Sélecteur de langue',
        'demo.controls': 'Contrôles de démo',
        'demo.profile': 'Profil',
        'demo.language': 'Langue',
        'quick.actions.title': 'Actions rapides',
        'quick.actions.myAccount': 'Mon compte',
        'quick.actions.myAccount.description': 'Voir et gérer votre profil',
        'quick.actions.applications': 'Applications',
        'quick.actions.applications.description': 'Suivre l\'état de vos demandes',
        'quick.actions.payments': 'Paiements',
        'quick.actions.payments.description': 'Voir l\'historique des paiements',
        'quick.actions.documents': 'Documents',
        'quick.actions.documents.description': 'Accéder à vos documents',
        'chat.title': 'Demandez à EVA',
        'chat.subtitle': 'Assistant IA',
        'chat.welcome': 'Bonjour! Comment puis-je vous aider aujourd\'hui?',
        'chat.placeholder': 'Tapez votre message...',
        'chat.send': 'Envoyer',
        'chat.voice': 'Saisie vocale',
        'chat.sending': 'Envoi en cours...',
        'chat.messageList': 'Liste des messages',
        'footer.copyright': '© 2024 Portail gouvernemental',
        'footer.privacy': 'Confidentialité',
        'footer.terms': 'Conditions d\'utilisation',
        'footer.accessibility': 'Accessibilité'
    }
}

class I18nService {
    private currentLocale: Locale = 'en-CA'

    setLocale(locale: Locale) {
        this.currentLocale = locale
    }

    getLocale(): Locale {
        return this.currentLocale
    }

    t(key: TranslationKey): string {
        return translations[this.currentLocale][key] || key
    }
}

export const i18nService = new I18nService()
