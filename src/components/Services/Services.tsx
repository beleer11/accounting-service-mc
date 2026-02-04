// src/components/Services/Services.jsx
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    FileText,
    Users,
    TrendingUp,
    Zap
} from 'lucide-react';
import ServiceModal from '../shared/ServiceModal/ServiceModal';

const Services = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const services = [
        {
            icon: <FileText className="w-8 h-8" />,
            title: "Declaración de Renta y Planeación Tributaria",
            description: "Cumplimiento total con la DIAN y optimización de impuestos bajo el marco legal vigente.",
            features: [
                "Declaraciones mensuales y anuales",
                "Planeación tributaria estratégica",
                "Asesoría en retenciones",
                "Optimización fiscal"
            ],
            color: "from-blue-500/10 to-blue-600/10",
            delay: 0.1,
            category: "tributario"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Gestión de Nómina Electrónica",
            description: "Automatización de pagos, liquidaciones y reportes conforme a la normativa de la UGPP y DIAN.",
            features: [
                "Liquidación automática",
                "Reportes UGPP",
                "Certificados laborales",
                "Parafiscales"
            ],
            color: "from-emerald-500/10 to-emerald-600/10",
            delay: 0.2,
            category: "nomina"
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Outsourcing Contable y Financiero",
            description: "Información financiera precisa y oportuna para la toma de decisiones estratégicas de su negocio.",
            features: [
                "Estados financieros",
                "Análisis de indicadores",
                "Proyecciones",
                "Dashboard ejecutivo"
            ],
            color: "from-purple-500/10 to-purple-600/10",
            delay: 0.3,
            category: "contabilidad"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Implementación de Software Contable",
            description: "Digitalizamos sus procesos con las mejores herramientas del mercado.",
            features: [
                "SIRE",
                "Facturación electrónica",
                "Nómina electrónica",
                "Integraciones API"
            ],
            color: "from-amber-500/10 to-amber-600/10",
            delay: 0.4,
            category: "tecnologia"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: {
            y: 50,
            opacity: 0,
            scale: 0.95
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 12
            }
        }
    };

    const handleServiceConsult = (service: any) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    return (
        <section ref={ref} id="servicios" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-slate-50 dark:from-background-dark dark:to-slate-900">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary dark:text-secondary rounded-full text-sm font-bold tracking-wider mb-4">
                        EXCELENCIA CORPORATIVA
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-display">
                        Servicios Profesionales
                        <span className="block text-3xl md:text-4xl text-primary dark:text-secondary mt-2">
                            que impulsan su negocio
                        </span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                        Soluciones contables integrales diseñadas para el éxito de startups,
                        pymes y grandes empresas en el mercado colombiano.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                            }}
                            onClick={() => { handleServiceConsult(service) }}
                            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="absolute top-6 right-6">
                                <div className="relative">
                                    <div className="text-6xl font-bold text-slate-100 dark:text-slate-700 group-hover:text-primary/20 dark:group-hover:text-secondary/20 transition-colors duration-300">
                                        0{index + 1}
                                    </div>
                                    <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                </div>
                            </div>

                            <div className="inline-flex p-4 bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl mb-6 text-primary dark:text-secondary shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-300 leading-tight">
                                {service.title}
                            </h3>

                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                                {service.description}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature, idx) => (
                                    <motion.li
                                        key={feature}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: service.delay + (idx * 0.1) }}
                                        className="flex items-center text-base text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-300"
                                    >
                                        <div className="flex-shrink-0 w-2 h-2 bg-secondary rounded-full mr-3 group-hover:scale-125 transition-transform duration-300" />
                                        <span>{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.button
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 text-primary dark:text-secondary font-semibold text-base group/btn"
                            >
                                <span className="group-hover/btn:underline">Consultar este servicio</span>
                                <svg
                                    className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                service={selectedService}
            />
        </section>
    );
};

export default Services;