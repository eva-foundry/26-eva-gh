/**** Tailwind config for EVA Chat ****/
/** Keep tokens in styles/tokens.css; Tailwind consumes CSS variables via @layer base. */

module.exports = {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "eva-bg": "var(--eva-color-bg)",
                "eva-panel": "var(--eva-color-panel)",
                "eva-text": "var(--eva-color-text)",
                "eva-accent": "var(--eva-color-accent)"
            },
            fontFamily: {
                sans: ["'Segoe UI'", "system-ui", "-apple-system", "sans-serif"]
            },
            borderRadius: {
                xl: "var(--eva-radius-xl)",
                lg: "var(--eva-radius-lg)",
                md: "var(--eva-radius-md)"
            }
        }
    },
    plugins: []
};
