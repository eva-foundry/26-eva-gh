import { useState } from "react";

export default function HCToggle() {
    const [enabled, setEnabled] = useState(false);
    return (
        <button
            type="button"
            aria-pressed={enabled}
            className="rounded border border-current px-3 py-1 text-sm"
            onClick={() => setEnabled((v) => !v)}
        >
            High Contrast: {enabled ? "On" : "Off"}
        </button>
    );
}
