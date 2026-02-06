// src/components/Testimonials/Testimonials.jsx
import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Star,
    Quote,
    ChevronLeft,
    ChevronRight,
    Users,
    TrendingUp,
    Shield,
    Calendar
} from 'lucide-react';

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const testimonialsContainerRef = useRef(null);

    const testimonials = [
        {
            id: 1,
            name: "Ana García",
            role: "CEO, TechFlow Solutions",
            company: "Startup Tech",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            content: "Contaduría Pro se ha convertido en una pieza fundamental para nuestra operación en Colombia.",
            rating: 5,
            stats: { clients: "+50", growth: "40%" }
        },
        {
            id: 2,
            name: "Carlos Rodríguez",
            role: "Director Financiero",
            company: "Manufacturas Andinas",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            content: "La implementación de sus sistemas de nómina electrónica nos ahorró más de 30 horas mensuales.",
            rating: 5,
            stats: { clients: "200+", growth: "25%" }
        },
        {
            id: 3,
            name: "María Fernández",
            role: "Fundadora",
            company: "EcoModa Sostenible",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
            content: "Como startup, necesitábamos flexibilidad y expertise. Contaduría Pro nos brindó ambas.",
            rating: 5,
            stats: { clients: "150+", growth: "300%" }
        }
    ];

    const stats = [
        { icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />, value: "500+", label: "Clientes Activos", color: "from-blue-500 to-cyan-500" },
        { icon: <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />, value: "99.7%", label: "Satisfacción", color: "from-emerald-500 to-green-500" },
        { icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />, value: "10+", label: "Años de Experiencia", color: "from-purple-500 to-pink-500" },
        { icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />, value: "24/7", label: "Soporte", color: "from-orange-500 to-red-500" }
    ];

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrev();
        }
    };

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (!isMobile) return;

        let intervalId: any;

        const startAutoRotation = () => {
            if (intervalId) {
                clearInterval(intervalId);
            }

            intervalId = setInterval(() => {
                handleNext();
            }, 5000);
        };

        startAutoRotation();

        const resetTimer = () => {
            startAutoRotation();
        };

        const container = testimonialsContainerRef.current;

        const handleUserInteraction = () => {
            resetTimer();
        };

        if (container) {
            container.addEventListener('touchstart', handleUserInteraction);
            container.addEventListener('mousedown', handleUserInteraction);

            const prevButton = document.querySelector('[aria-label="Testimonio anterior"]');
            const nextButton = document.querySelector('[aria-label="Siguiente testimonio"]');

            if (prevButton) prevButton.addEventListener('click', handleUserInteraction);
            if (nextButton) nextButton.addEventListener('click', handleUserInteraction);

            const dots = document.querySelectorAll('[aria-label^="Ir al testimonio"]');
            dots.forEach(dot => {
                dot.addEventListener('click', handleUserInteraction);
            });
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }

            if (container) {
                container.removeEventListener('touchstart', handleUserInteraction);
                container.removeEventListener('mousedown', handleUserInteraction);
            }

            const prevButton = document.querySelector('[aria-label="Testimonio anterior"]');
            const nextButton = document.querySelector('[aria-label="Siguiente testimonio"]');

            if (prevButton) prevButton.removeEventListener('click', handleUserInteraction);
            if (nextButton) nextButton.removeEventListener('click', handleUserInteraction);
        };
    }, []);

    return (
        <section ref={ref} className="py-12 sm:py-16 md:py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        animate={{
                            y: [0, 600],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 6 + 6,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto max-w-6xl relative">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-10 sm:mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-6 sm:py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-4 sm:mb-6">
                        <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-accent-mint" />
                        <span className="text-xs sm:text-sm font-bold text-primary dark:text-accent-mint tracking-wider">
                            TESTIMONIOS
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 font-display">
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto px-2">
                        Empresas líderes confían en nuestra experiencia contable.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16 md:mb-20"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ y: -3 }}
                            className="relative overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 bg-white dark:bg-slate-800 shadow-md sm:shadow-lg"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 dark:opacity-10 transition-opacity duration-500`} />
                            <div className="relative">
                                <div className={`inline-flex p-2 sm:p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-2 sm:mb-4`}>
                                    {stat.icon}
                                </div>
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-tight">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="relative">
                    <div
                        ref={testimonialsContainerRef}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        className="select-none cursor-grab active:cursor-grabbing"
                    >
                        <motion.div
                            key={`testimonial-${activeTestimonial}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-br from-primary to-blue-700 dark:from-blue-800 dark:to-blue-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 text-white shadow-lg sm:shadow-xl overflow-hidden"
                        >
                            <div className="sm:hidden flex justify-center mb-3">
                                <div className="text-xs text-white/60 flex items-center gap-1">
                                    <span>← Desliza →</span>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 md:gap-8">
                                <div className="flex-shrink-0 w-full sm:w-auto">
                                    <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center gap-4">
                                        <div className="relative">
                                            <motion.img
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                                src={testimonials[activeTestimonial].image}
                                                alt={testimonials[activeTestimonial].name}
                                                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl sm:rounded-2xl object-cover border-2 sm:border-4 border-white/20"
                                            />
                                            <div className="absolute -bottom-2 -right-2 bg-accent-mint text-slate-900 p-1.5 sm:p-2 rounded-full">
                                                <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                        </div>

                                        <div className="text-center sm:text-left lg:text-center">
                                            <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                                                {testimonials[activeTestimonial].name}
                                            </h4>
                                            <p className="text-blue-200 text-sm sm:text-base mb-2">
                                                {testimonials[activeTestimonial].role}
                                            </p>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                                                <span className="text-xs sm:text-sm">{testimonials[activeTestimonial].company}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-center sm:justify-start lg:justify-center gap-1 mb-4">
                                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-accent-mint fill-accent-mint" />
                                        ))}
                                    </div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="text-sm sm:text-base md:text-lg lg:text-xl italic mb-6 leading-relaxed text-center sm:text-left lg:text-center"
                                    >
                                        "{testimonials[activeTestimonial].content}"
                                    </motion.p>

                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 flex-1"
                                        >
                                            <div className="text-lg sm:text-xl md:text-2xl font-bold">
                                                {testimonials[activeTestimonial].stats.clients}
                                            </div>
                                            <div className="text-xs sm:text-sm text-blue-200">
                                                clientes atendidos
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 flex-1"
                                        >
                                            <div className="text-lg sm:text-xl md:text-2xl font-bold">
                                                {testimonials[activeTestimonial].stats.growth}
                                            </div>
                                            <div className="text-xs sm:text-sm text-blue-200">
                                                crecimiento anual
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePrev}
                            disabled={isTransitioning}
                            className="p-2 sm:p-3 bg-white dark:bg-slate-800 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-30 active:scale-95"
                            aria-label="Testimonio anterior"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-300" />
                        </motion.button>

                        <div className="flex items-center gap-2 sm:gap-3 mx-2 sm:mx-4">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => !isTransitioning && setActiveTestimonial(index)}
                                    disabled={isTransitioning}
                                    className={`transition-all duration-300 ${index === activeTestimonial
                                        ? 'bg-primary dark:bg-accent-mint'
                                        : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                                        } disabled:opacity-50 rounded-full`}
                                    style={{
                                        width: index === activeTestimonial ? '24px' : '8px',
                                        height: '8px'
                                    }}
                                    aria-label={`Ir al testimonio ${index + 1}`}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNext}
                            disabled={isTransitioning}
                            className="p-2 sm:p-3 bg-white dark:bg-slate-800 rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-30 active:scale-95"
                            aria-label="Siguiente testimonio"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700 dark:text-slate-300" />
                        </motion.button>
                    </div>

                    <div className="sm:hidden mt-4 text-center">
                        <div className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span>Cambia automáticamente</span>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-12 sm:mt-16 md:mt-20"
                >
                    <p className="text-center text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6 sm:mb-8">
                        Aliado estratégico
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 opacity-70">
                        {[
                            { name: "Tecnología", icon: "💻" },
                            { name: "Finanzas", icon: "💰" },
                            { name: "Retail", icon: "🛒" },
                            { name: "Salud", icon: "🏥" },
                            { name: "Educación", icon: "🎓" }
                        ].map((industry, index) => (
                            <motion.div
                                key={industry.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="flex flex-col items-center gap-1 sm:gap-2"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
                                    <div className="text-xl sm:text-2xl md:text-3xl">
                                        {industry.icon}
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                    {industry.name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;