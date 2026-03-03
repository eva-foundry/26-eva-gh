export function AppFooter() {
    const year = new Date().getFullYear();
    return (
        <p className="text-sm text-white/70">
            © {year} EVA Suite · Unified Chat Frame preview
        </p>
    );
}
