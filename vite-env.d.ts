/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_WHATSAPP_NUMBER: string
    readonly VITE_WHATSAPP_MESSAGE: string
    readonly VITE_COMPANY_NAME: string
    readonly VITE_SITE_URL: string
    readonly VITE_COMPANY_EMAIL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}