// src/components/shared/ServiceModal/ServiceModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Calendar, Mail, FileText, Users, TrendingUp, Zap, Clock, ArrowRight } from 'lucide-react';
import { useWhatsApp } from '../../../hooks/useWhatsApp';
import { useEffect } from 'react';

const ServiceModal = ({ isOpen, onClose, service }) => {
    const { sendWhatsApp } = useWhatsApp();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '0px';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [isOpen]);

    const getServiceMessage = (serviceTitle: string) => {
        const messages = {
            "Declaración de Renta y Planeación Tributaria":
                "¡Hola! Vi su sitio web y necesito asesoría para la declaración de renta y optimización tributaria. ¿Podrían ayudarme?",

            "Gestión de Nómina Electrónica":
                "¡Hola! Estoy interesado en su servicio de nómina electrónica para mi empresa. ¿Podrían enviarme información?",

            "Outsourcing Contable y Financiero":
                "¡Hola! Busco externalizar servicios contables. ¿Podemos agendar una llamada?",

            "Implementación de Software Contable":
                "¡Hola! Necesito implementar software contable. ¿Podrían asesorarme?"
        };

        return messages[serviceTitle] || `¡Hola! Me interesa su servicio de: ${serviceTitle}. ¿Podrían contactarme?`;
    };

    const getServiceIcon = (serviceTitle: string) => {
        const icons = {
            "Declaración de Renta y Planeación Tributaria": <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
            "Gestión de Nómina Electrónica": <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
            "Outsourcing Contable y Financiero": <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
            "Implementación de Software Contable": <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
        };
        return icons[serviceTitle] || <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />;
    };

    const contactOptions = [
        {
            icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
            label: "WhatsApp",
            description: "Respuesta rápida",
            action: () => {
                const message = getServiceMessage(service?.title);
                sendWhatsApp(message);
                onClose();
            },
            variant: "primary",
            color: "bg-emerald-500 hover:bg-emerald-600",
            mobileColor: "bg-emerald-500"
        },
        {
            icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />,
            label: "Agendar llamada",
            description: "15 min sin costo",
            action: () => {
                const message = `Me gustaría agendar una llamada para hablar sobre "${service?.title}".`;
                sendWhatsApp(message);
                onClose();
            },
            variant: "secondary",
            color: "bg-blue-500 hover:bg-blue-600",
            mobileColor: "bg-blue-500"
        },
        {
            icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
            label: "Solicitar cotización",
            description: "Presupuesto en 24h",
            action: () => {
                const message = `Solicito cotización para "${service?.title}".`;
                sendWhatsApp(message);
                onClose();
            },
            variant: "outline",
            color: "bg-slate-800 hover:bg-slate-700",
            mobileColor: "bg-slate-700"
        }
    ];

    return (
        <AnimatePresence mode="wait">
            {isOpen && service && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300
                        }}
                        className="relative w-full max-h-[85vh] sm:max-h-[90vh] sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-gradient-to-r from-primary to-secondary p-4 sm:p-6 sticky top-0 z-10">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        {getServiceIcon(service.title)}
                                    </div>
                                    <div>
                                        <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                                            Contactar por
                                        </h3>
                                        <p className="text-xs sm:text-sm text-white/80 leading-tight">
                                            {service.title}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            <div className="sm:hidden flex justify-center mt-2">
                                <div className="w-12 h-1 bg-white/40 rounded-full"></div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                            <div className="text-center mb-2">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Elija cómo desea contactarnos
                                </p>
                            </div>

                            <div className="space-y-3">
                                {contactOptions.map((option, index) => (
                                    <motion.button
                                        key={option.label}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={option.action}
                                        className={`w-full flex items-center justify-between p-4 ${option.mobileColor} sm:${option.color} text-white rounded-xl sm:rounded-xl transition-all duration-200 shadow-md hover:shadow-lg text-left`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/20 rounded-lg">
                                                {option.icon}
                                            </div>
                                            <div className="text-left">
                                                <div className="font-semibold text-sm sm:text-base">
                                                    {option.label}
                                                </div>
                                                <div className="text-xs text-white/80">
                                                    {option.description}
                                                </div>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-70" />
                                    </motion.button>
                                ))}
                            </div>

                            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-lg">
                                <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                    <Clock className="w-3 h-3" />
                                    <span>Respuesta en menos de 24h hábiles</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky bottom-0">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Lunes a Viernes 8am - 6pm
                                </p>
                                <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mt-1">
                                    • No compartimos su información • Sin compromiso
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ServiceModal;