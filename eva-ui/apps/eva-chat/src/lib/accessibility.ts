import { useEffect, useRef } from "react";

/**
 * Hook to focus an element when a flag is toggled true.
 */
export function useAutoFocus<T extends HTMLElement>(shouldFocus: boolean) {
    const ref = useRef<T | null>(null);
    useEffect(() => {
        if (shouldFocus && ref.current) {
            ref.current.focus();
        }
    }, [shouldFocus]);
    return ref;
}
