// src/components/Hero/Hero.jsx
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { FaWhatsapp } from 'react-icons/fa';

const Hero = () => {
    const { sendWhatsApp } = useWhatsApp();
    const [isHovered, setIsHovered] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
    };

    const handleWhatsAppClick = () => {
        const message = `¡Hola! Vi su sitio web y me interesa conversar sobre servicios contables para mi empresa. ¿Podrían brindarme más información?`;
        sendWhatsApp(message);
    };

    return (
        <section className="relative min-h-screen overflow-hidden flex items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-blue-900">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000')] bg-cover bg-center opacity-10" />

                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white/30 rounded-full"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{
                                y: [0, 1000],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 w-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl"
                >
                    <motion.div variants={itemVariants} className="mb-6">
                        <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                            ★ 4.9/5 - Confiado por 20+ empresas
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-display"
                    >
                        Su Contabilidad en{' '}
                        <span className="text-accent-mint">Manos Expertas</span>,
                        <br />
                        Su Crecimiento en Sus Manos
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-blue-100 mb-10 max-w-2xl"
                    >
                        Servicios contables, tributarios y de nómina diseñados para startups
                        y freelancers en Colombia. Más que contadores, somos su aliado
                        estratégico.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 mb-12"
                    >
                        <motion.button
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            onClick={handleWhatsAppClick}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(true)}
                            className="group flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#1da851]"
                        >
                            <FaWhatsapp className="w-6 h-6" />
                            <span>Consultar por WhatsApp</span>
                            <motion.div
                                animate={{ x: isHovered ? 5 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </motion.div>
                        </motion.button>

                        <motion.button
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => {
                                const message = `Me gustaría agendar una asesoría contable personalizada. ¿Cuáles son sus horarios disponibles?`;
                                sendWhatsApp(message);
                            }}
                            className="group flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/40 bg-white/5 text-white font-bold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                        >
                            <Calendar className="w-5 h-5" />
                            <span>Agendar Asesoría</span>
                        </motion.button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    >
                        {[
                            { value: '99%', label: 'Clientes Satisfechos' },
                            { value: '24/7', label: 'Soporte' },
                            { value: '100%', label: 'Cumplimiento DIAN' },
                            { value: '20+', label: 'Empresas' },
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl font-bold text-white mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-blue-200">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <ChevronDown className="w-6 h-6 text-white/60" />
            </motion.div>
        </section>
    );
};

export default Hero;