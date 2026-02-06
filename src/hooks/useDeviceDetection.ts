// src/hooks/useIsMobile.js
import { useState, useEffect } from 'react';

export const useDeviceDetection = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        const checkReducedMotion = () => {
            setIsReducedMotion(
                window.matchMedia('(prefers-reduced-motion: reduce)').matches
            );
        };

        checkDevice();
        checkReducedMotion();

        window.addEventListener('resize', checkDevice);
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionQuery.addEventListener('change', checkReducedMotion);

        return () => {
            window.removeEventListener('resize', checkDevice);
            motionQuery.removeEventListener('change', checkReducedMotion);
        };
    }, [breakpoint]);

    return { isMobile, isReducedMotion };
};