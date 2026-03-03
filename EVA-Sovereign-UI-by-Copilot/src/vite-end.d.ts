/// <reference types="vite/client" />
declare const GITHUB_RUNTIME_PERMANENT_NAME: string
declare const BASE_KV_SERVICE_URL: string

interface I18n {
  locale: string
  t: (key: string) => string
}

declare global {
  interface Window {
    i18n: I18n
  }
  const i18n: I18n
}