// src/hooks/useWhatsApp.ts
import { useMemo } from 'react';

export const useWhatsApp = () => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    const defaultMessage = import.meta.env.VITE_WHATSAPP_MESSAGE;
    const companyName = import.meta.env.VITE_COMPANY_NAME

    const whatsappLink = useMemo(() => {
        const formattedNumber = phoneNumber.replace(/\D/g, '');
        const encodedMessage = encodeURIComponent(defaultMessage);
        return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    }, [phoneNumber, defaultMessage]);

    const sendWhatsApp = (customMessage: string = '') => {
        const formattedNumber = phoneNumber.replace(/\D/g, '');
        const message = customMessage || defaultMessage;
        const encodedMessage = encodeURIComponent(message);
        const url = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const generateWhatsAppLink = (customMessage: string = '') => {
        const formattedNumber = phoneNumber.replace(/\D/g, '');
        const message = customMessage || defaultMessage;
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    };

    return {
        phoneNumber,
        whatsappLink,
        sendWhatsApp,
        generateWhatsAppLink,
        companyName,
    };
};