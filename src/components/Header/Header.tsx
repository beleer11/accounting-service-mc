// src/components/Header/Header.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Building2 } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { label: 'Servicios', id: 'servicios' },
        { label: 'Testimonios', id: 'testimonios' },
        { label: 'Contacto', id: 'contacto' },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsMenuOpen(false);
    };

    const scrollToContact = () => {
        const footer = document.getElementById('contacto') || document.querySelector('footer');
        if (footer) {
            footer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsMenuOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
                ? 'bg-white/95 dark:bg-background-dark/95 backdrop-blur-md shadow-lg'
                : 'bg-white/90 dark:bg-background-dark/90 backdrop-blur-sm'
                }`}
        >
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <img
                            src="/public/servicioscontablesmcmovile.png"
                            alt="Logo Servicios Contables MC"
                            className="h-9 w-auto object-cover rounded-lg"
                        />
                        <div>
                            <h1 className="text-slate-900 dark:text-white text-xl font-bold font-display">
                                Servicios Contables MC
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Expertos en Colombia
                            </p>
                        </div>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <motion.button
                                key={item.label}
                                onClick={() => scrollToSection(item.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-accent-mint font-medium transition-colors"
                            >
                                {item.label}
                            </motion.button>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={scrollToContact}
                            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            Contactar
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-slate-700 dark:text-slate-300 p-2"
                        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="pt-4 pb-6 space-y-4">
                                {menuItems.map((item) => (
                                    <motion.button
                                        key={item.label}
                                        onClick={() => scrollToSection(item.id)}
                                        whileTap={{ scale: 0.95 }}
                                        className="block w-full text-left py-2 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-accent-mint font-medium transition-colors"
                                    >
                                        {item.label}
                                    </motion.button>
                                ))}
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={scrollToContact}
                                    className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors mt-4"
                                >
                                    Contactar
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};

export default Header;