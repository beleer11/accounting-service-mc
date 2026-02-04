// src/components/shared/ThemeToggle/ThemeToggle.jsx
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
}

const ThemeToggle = ({ darkMode, setDarkMode }: ThemeToggleProps) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="fixed bottom-6 right-6 z-50 p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                <motion.div
                    initial={false}
                    animate={{ rotate: darkMode ? 0 : 180, opacity: darkMode ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Moon className="w-5 h-5 text-slate-800 dark:text-white" />
                </motion.div>
                <motion.div
                    initial={false}
                    animate={{ rotate: darkMode ? -180 : 0, opacity: darkMode ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Sun className="w-5 h-5 text-slate-800 dark:text-white" />
                </motion.div>
            </div>
        </motion.button>
    );
};

export default ThemeToggle;