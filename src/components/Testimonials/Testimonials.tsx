// src/components/Testimonials/Testimonials.jsx
import { useState, useRef } from 'react';
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

    const testimonials = [
        {
            id: 1,
            name: "Ana García",
            role: "CEO, TechFlow Solutions",
            company: "Startup Tech",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            content: "Contaduría Pro se ha convertido en una pieza fundamental para nuestra operación en Colombia. Su gestión profesional nos permite enfocarnos plenamente en nuestra estrategia de expansión regional.",
            rating: 5,
            stats: { clients: "+50", growth: "40%" }
        },
        {
            id: 2,
            name: "Carlos Rodríguez",
            role: "Director Financiero",
            company: "Manufacturas Andinas",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            content: "La implementación de sus sistemas de nómina electrónica nos ahorró más de 30 horas mensuales. El equipo es excepcionalmente profesional y siempre disponible.",
            rating: 5,
            stats: { clients: "200+", growth: "25%" }
        },
        {
            id: 3,
            name: "María Fernández",
            role: "Fundadora",
            company: "EcoModa Sostenible",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
            content: "Como startup, necesitábamos flexibilidad y expertise. Contaduría Pro nos brindó ambas, ayudándonos a escalar de 5 a 30 empleados en solo 18 meses.",
            rating: 5,
            stats: { clients: "150+", growth: "300%" }
        }
    ];

    const stats = [
        { icon: <Users className="w-8 h-8" />, value: "500+", label: "Clientes Activos", color: "from-blue-500 to-cyan-500" },
        { icon: <TrendingUp className="w-8 h-8" />, value: "99.7%", label: "Satisfacción", color: "from-emerald-500 to-green-500" },
        { icon: <Calendar className="w-8 h-8" />, value: "10+", label: "Años de Experiencia", color: "from-purple-500 to-pink-500" },
        { icon: <Shield className="w-8 h-8" />, value: "24/7", label: "Soporte", color: "from-orange-500 to-red-500" }
    ];

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

    return (
        <section ref={ref} className="py-20 px-4 md:px-8 relative overflow-hidden">
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{
                            y: [0, 800],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 8 + 8,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            backgroundColor: 'rgba(59, 130, 246, 0.3)',
                        }}
                    />
                ))}
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={`dark-${i}`}
                        className="absolute w-1 h-1 rounded-full"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{
                            y: [0, 800],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 4,
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            backgroundColor: 'rgba(139, 92, 246, 0.3)',
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto max-w-7xl relative">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-6">
                        <Quote className="w-5 h-5 text-primary dark:text-accent-mint" />
                        <span className="text-sm font-bold text-primary dark:text-accent-mint tracking-wider">
                            TESTIMONIOS
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-display">
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Empresas líderes confían en nuestra experiencia contable y financiera.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="relative overflow-hidden rounded-2xl p-6 bg-white dark:bg-slate-800 shadow-lg group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`} />
                            <div className="relative">
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4`}>
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-600 dark:text-slate-300">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="relative">
                    <div className="relative">
                        <div className="bg-gradient-to-br from-primary to-blue-700 dark:from-blue-800 dark:to-blue-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-48 -translate-x-48 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <motion.img
                                                key={`img-${activeTestimonial}`}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                                src={testimonials[activeTestimonial].image}
                                                alt={testimonials[activeTestimonial].name}
                                                className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20"
                                            />
                                            <div className="absolute -bottom-3 -right-3 bg-accent-mint text-slate-900 p-2 rounded-full">
                                                <Quote className="w-6 h-6" />
                                            </div>
                                        </div>
                                        <motion.div
                                            key={`info-${activeTestimonial}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-6"
                                        >
                                            <h4 className="text-2xl font-bold">
                                                {testimonials[activeTestimonial].name}
                                            </h4>
                                            <p className="text-blue-200">
                                                {testimonials[activeTestimonial].role}
                                            </p>
                                            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-white/10 rounded-full">
                                                <span className="text-sm">{testimonials[activeTestimonial].company}</span>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex gap-1 mb-6">
                                            {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.1 }}
                                                >
                                                    <Star className="w-6 h-6 text-accent-mint fill-accent-mint" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.p
                                            key={`content-${activeTestimonial}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="text-xl md:text-2xl italic mb-8 leading-relaxed"
                                        >
                                            "{testimonials[activeTestimonial].content}"
                                        </motion.p>

                                        <div className="flex flex-wrap gap-6">
                                            <motion.div
                                                key={`stats1-${activeTestimonial}`}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 }}
                                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                                            >
                                                <div className="text-2xl font-bold">{testimonials[activeTestimonial].stats.clients}</div>
                                                <div className="text-sm text-blue-200">clientes atendidos</div>
                                            </motion.div>
                                            <motion.div
                                                key={`stats2-${activeTestimonial}`}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                                            >
                                                <div className="text-2xl font-bold">{testimonials[activeTestimonial].stats.growth}</div>
                                                <div className="text-sm text-blue-200">crecimiento anual</div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handlePrev}
                            disabled={isTransitioning}
                            className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
                        >
                            <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                        </motion.button>

                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => !isTransitioning && setActiveTestimonial(index)}
                                    disabled={isTransitioning}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeTestimonial
                                        ? 'w-8 bg-primary dark:bg-accent-mint'
                                        : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                                        } disabled:opacity-50`}
                                />
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNext}
                            disabled={isTransitioning}
                            className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
                        >
                            <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                        </motion.button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-20"
                >
                    <p className="text-center text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-10">
                        Aliado estratégico de empresas líderes
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-60">
                        {[
                            { name: "Tecnología", icon: "💻" },
                            { name: "Finanzas", icon: "💰" },
                            { name: "Retail", icon: "🛒" },
                            { name: "Manufactura", icon: "🏭" },
                            { name: "Salud", icon: "🏥" },
                            { name: "Educación", icon: "🎓" }
                        ].map((industry, index) => (
                            <motion.div
                                key={industry.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                whileHover={{ scale: 1.1, opacity: 1 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl flex items-center justify-center">
                                    <div className="text-3xl">
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