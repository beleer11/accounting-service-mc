// src/components/shared/ServiceModal/ServiceModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Calendar, Mail, FileText, Users, TrendingUp, Zap } from 'lucide-react';
import { useWhatsApp } from '../../../hooks/useWhatsApp';

const ServiceModal = ({ isOpen, onClose, service }) => {
    const { sendWhatsApp } = useWhatsApp();

    const getServiceMessage = (serviceTitle: string) => {
        const messages = {
            "Declaración de Renta y Planeación Tributaria":
                "¡Hola! Vi su sitio web y necesito asesoría profesional para la declaración de renta y optimización tributaria de mi empresa. ¿Podrían ayudarme con:\n\n• Declaración anual de renta\n• Planeación tributaria estratégica\n• Asesoría en retenciones\n• Optimización fiscal\n\nMe gustaría conocer sus planes y tarifas.",

            "Gestión de Nómina Electrónica":
                "¡Hola! Estoy interesado en su servicio de gestión de nómina electrónica para mi empresa. Necesito:\n\n• Liquidación automática de nómina\n• Reportes a UGPP y DIAN\n• Certificados laborales digitales\n• Gestión de parafiscales\n\n¿Podrían enviarme información sobre costos y proceso de implementación?",

            "Outsourcing Contable y Financiero":
                "¡Hola! Busco externalizar los servicios contables de mi empresa. Me interesa su servicio de outsourcing para:\n\n• Estados financieros mensuales\n• Análisis de indicadores financieros\n• Proyecciones y presupuestos\n• Dashboard ejecutivo\n\n¿Podemos agendar una llamada para evaluar mis necesidades?",

            "Implementación de Software Contable":
                "¡Hola! Necesito implementar software contable en mi empresa y me interesa su servicio de digitalización. Requiero:\n\n• Implementación de SIRE\n• Facturación electrónica\n• Nómina electrónica\n• Integraciones con otros sistemas\n\n¿Podrían asesorarme sobre las mejores opciones para mi tipo de empresa?"
        };

        return messages[serviceTitle] || `¡Hola! Me interesa obtener más información sobre su servicio de: ${serviceTitle}. ¿Podrían contactarme para más detalles?`;
    };

    const getServiceIcon = (serviceTitle: string) => {
        const icons = {
            "Declaración de Renta y Planeación Tributaria": <FileText className="w-6 h-6" />,
            "Gestión de Nómina Electrónica": <Users className="w-6 h-6" />,
            "Outsourcing Contable y Financiero": <TrendingUp className="w-6 h-6" />,
            "Implementación de Software Contable": <Zap className="w-6 h-6" />
        };
        return icons[serviceTitle] || <MessageCircle className="w-6 h-6" />;
    };

    const contactOptions = [
        {
            icon: <MessageCircle className="w-6 h-6" />,
            label: "Chat inmediato por WhatsApp",
            description: "Respuesta en minutos",
            action: () => {
                const message = getServiceMessage(service?.title);
                sendWhatsApp(message);
                onClose();
            },
            variant: "primary",
            color: "bg-emerald-500 hover:bg-emerald-600"
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            label: "Agendar llamada exploratoria",
            description: "15 minutos sin costo",
            action: () => {
                const message = `Me gustaría agendar una llamada de 15 minutos sin costo para hablar sobre su servicio de "${service?.title}" y evaluar si es adecuado para mi empresa.`;
                sendWhatsApp(message);
                onClose();
            },
            variant: "secondary",
            color: "bg-blue-500 hover:bg-blue-600"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            label: "Solicitar cotización formal",
            description: "Presupuesto detallado en 24h",
            action: () => {
                const message = `Solicito una cotización formal para su servicio de "${service?.title}". Por favor envíenme:\n\n• Tarifas y planes disponibles\n• Proceso de implementación\n• Tiempos de entrega\n• Incluya cualquier costo adicional`;
                sendWhatsApp(message);
                onClose();
            },
            variant: "outline",
            color: "bg-slate-800 hover:bg-slate-700"
        }
    ];

    if (!isOpen || !service) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/70 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
                >
                    <div className="bg-gradient-to-r from-primary to-secondary p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold text-white">
                                    Contactar por este servicio
                                </h3>
                                <p className="text-sm text-white/80 mt-1">
                                    Elija la forma de contacto preferida
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                                {getServiceIcon(service.title)}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900 dark:text-white text-lg">
                                    {service.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 rounded">
                                        Servicio profesional
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            Seleccione cómo desea que nos contactemos con usted para brindarle información detallada.
                        </p>
                    </div>

                    <div className="p-6 space-y-4">
                        {contactOptions.map((option, index) => (
                            <motion.button
                                key={option.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={option.action}
                                className={`w-full p-4 flex items-center gap-4 ${option.color} text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-left group`}
                            >
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    {option.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-white text-lg">
                                        {option.label}
                                    </div>
                                    <div className="text-sm text-white/80">
                                        {option.description}
                                    </div>
                                </div>
                                <svg
                                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.button>
                        ))}
                    </div>

                    <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                        <div className="text-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                <span className="font-medium">Horarios de atención:</span> Lunes a Viernes 8am - 6pm
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-500">
                                Nuestro equipo se pondrá en contacto en menos de 24 horas hábiles
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ServiceModal;