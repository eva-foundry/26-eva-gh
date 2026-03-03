import { ReactNode } from "react";
import { AppHeader } from "../components/layout/AppHeader";
import { AppFooter } from "../components/layout/AppFooter";
import { SkipLinks } from "../components/layout/SkipLinks";

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <div className="min-h-screen bg-eva-bg text-eva-text">
            <SkipLinks />
            <header id="app-header" className="border-b border-white/10 bg-eva-panel/40 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                    <AppHeader />
                </div>
            </header>
            <main id="main-content" tabIndex={-1} className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
                {children}
            </main>
            <footer id="app-footer" className="border-t border-white/10 bg-eva-panel/60">
                <div className="mx-auto max-w-6xl px-4 py-4">
                    <AppFooter />
                </div>
            </footer>
        </div>
    );
}
