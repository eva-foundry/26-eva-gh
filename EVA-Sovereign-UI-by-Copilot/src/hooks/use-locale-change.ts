import { useEffect, useState } from 'react'
import { type Locale } from '@/lib/i18n-service'

export function useLocaleChange() {
    const [, setTrigger] = useState(0)

    useEffect(() => {
        const handleLocaleChange = () => {
            setTrigger((prev) => prev + 1)
        }

        window.addEventListener('eva-locale-changed', handleLocaleChange)
        return () => {
            window.removeEventListener('eva-locale-changed', handleLocaleChange)
        }
    }, [])
}
