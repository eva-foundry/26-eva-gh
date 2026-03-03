import type { ReactNode } from "react";

type CodeBlockProps = {
    children: ReactNode;
    label?: string;
};

export default function CodeBlock({ children, label }: CodeBlockProps) {
    return (
        <pre className="bg-neutral-900 border border-neutral-700 rounded p-3 text-xs overflow-x-auto" aria-label={label}>
            <code>{children}</code>
        </pre>
    );
}
