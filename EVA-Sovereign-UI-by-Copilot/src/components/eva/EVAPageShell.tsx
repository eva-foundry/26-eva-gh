import { type ReactNode } from 'react'

interface EVAPageShellProps {
    header?: ReactNode
    children: ReactNode
    footer?: ReactNode
}

export function EVAPageShell({ header, children, footer }: EVAPageShellProps) {
    return (
        <div className="flex flex-col min-h-screen">
            {header}
            
            <main id="main-content" className="flex-1 container mx-auto px-4 py-8" role="main">
                {children}
            </main>
            
            {footer && (
                <footer className="bg-muted border-t border-border py-6" role="contentinfo">
                    <div className="container mx-auto px-4">
                        {footer}
                    </div>
                </footer>
            )}
        </div>
    )
}
