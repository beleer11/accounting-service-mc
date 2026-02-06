// src/components/Footer/Footer.jsx
import { useState, useRef, type ChangeEvent } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
    Send,
    Phone,
    Mail,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    CheckCircle
} from 'lucide-react';

const Footer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: '',
        service: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const services = [
        'Declaración de Renta',
        'Nómina Electrónica',
        'Outsourcing Contable',
        'Software Contable'
    ];

    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Teléfono",
            value: "+57 312 4420185",
            sub: "Lunes a Viernes 8am - 6pm"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            value: "i_munce@hotmail.co",
            sub: "Respuesta en menos de 24h"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Oficina Principal",
            value: "Calle 100 # 8-60, Campoalegre/Huila",
            sub: "Barrio Panamá"
        }
    ];

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, label: "Facebook", href: "#" },
        { icon: <Twitter className="w-5 h-5" />, label: "Twitter", href: "#" },
        { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "#" },
        { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "#" }
    ];

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                message: '',
                service: ''
            });
        }, 3000);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <footer ref={ref} className="bg-slate-900 text-white">
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10" />

                <div className="container mx-auto px-4 md:px-8 py-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="max-w-6xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold p-4 mb-6 font-display">
                                ¿Listo para escalar su negocio?
                            </h2>
                            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                                Únase a más de 20 empresas y profesionales independientes que confían su gestión contable en nosotros.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Formulario */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.2 }}
                                className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700"
                            >
                                <h3 className="text-2xl font-bold mb-8">
                                    Solicitar Consultoría Técnica
                                </h3>

                                <AnimatePresence>
                                    {isSubmitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="text-center py-12"
                                        >
                                            <CheckCircle className="w-20 h-20 text-secondary mx-auto mb-6" />
                                            <h4 className="text-2xl font-bold mb-4">
                                                ¡Mensaje enviado con éxito!
                                            </h4>
                                            <p className="text-slate-300">
                                                Nuestro equipo se contactará con usted en menos de 24 horas.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                                        Nom completo / Empresa
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full h-14 bg-slate-900 border border-slate-700 rounded-xl px-5 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                                        placeholder="Ej: Carlos Gómez o Tech Solutions"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                                        Correo corporativo
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full h-14 bg-slate-900 border border-slate-700 rounded-xl px-5 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                                        placeholder="correo@corporativo.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                                        Teléfono
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full h-14 bg-slate-900 border border-slate-700 rounded-xl px-5 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                                        placeholder="+57 300 123 4567"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                                        Servicio de interés
                                                    </label>
                                                    <select
                                                        name="service"
                                                        value={formData.service}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full h-14 bg-slate-900 border border-slate-700 rounded-xl px-5 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                                                    >
                                                        <option value="">Seleccione un servicio</option>
                                                        {services.map(service => (
                                                            <option key={service} value={service}>{service}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                                    Mensaje adicional
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    rows={4}
                                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-4 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                                                    placeholder="Cuéntenos sobre su negocio y necesidades específicas..."
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`w-full h-14 ${isSubmitting
                                                    ? 'bg-slate-700 cursor-not-allowed'
                                                    : 'bg-secondary hover:bg-green-600'
                                                    } text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3`}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        Enviando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-5 h-5" />
                                                        Solicitar Consultoría Técnica
                                                    </>
                                                )}
                                            </motion.button>
                                        </form>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Información de contacto */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-6">
                                        Información de contacto
                                    </h3>
                                    <div className="space-y-6">
                                        {contactInfo.map((info, index) => (
                                            <motion.div
                                                key={info.title}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                                whileHover={{ x: 5 }}
                                                className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition-colors cursor-pointer"
                                            >
                                                <div className="p-3 bg-primary/20 rounded-lg">
                                                    {info.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg mb-1">{info.title}</h4>
                                                    <p className="text-slate-300">{info.value}</p>
                                                    <p className="text-sm text-slate-400 mt-1">{info.sub}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Horarios de atención */}
                                <div className="bg-gradient-to-br from-primary/20 to-secondary/10 rounded-2xl p-6">
                                    <h4 className="font-bold text-xl mb-4">Horarios de atención</h4>
                                    <div className="space-y-3">
                                        {[
                                            { day: 'Lunes - Viernes', time: '8:00 AM - 6:00 PM' },
                                            { day: 'Sábados', time: '9:00 AM - 1:00 PM' },
                                            { day: 'Emergencias', time: '24/7 vía WhatsApp' }
                                        ].map((schedule) => (
                                            <div key={schedule.day} className="flex justify-between items-center">
                                                <span className="text-slate-300">{schedule.day}</span>
                                                <span className="font-medium">{schedule.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Sección inferior del Footer con redes sociales */}
            <div className="border-t border-slate-800 py-12">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                        {/* Logo y copyright */}
                        <div className="flex items-center gap-3">
                            <img
                                src={`${import.meta.env.BASE_URL}assets/servicioscontablesmcmovile.png`}
                                alt="Logo Servicios Contables MC"
                                className="h-9 w-auto object-cover rounded-lg"
                            />
                            <div>
                                <h4 className="font-bold text-lg">Servicios Contables MC</h4>
                                <p className="text-sm text-slate-400">
                                    Expertos contables en Colombia desde 2010
                                </p>
                            </div>
                        </div>

                        {/* Redes sociales */}
                        <div className="text-center lg:text-left">
                            <h4 className="font-bold text-lg mb-4">Síganos</h4>
                            <div className="flex gap-4 justify-center lg:justify-start">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Enlaces legales */}
                        <div className="flex flex-col items-center lg:items-end gap-3">
                            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                                <a href="#" className="hover:text-white transition-colors">
                                    Términos Legales
                                </a>
                                <a href="#" className="hover:text-white transition-colors">
                                    Política de Privacidad
                                </a>
                                <a href="#" className="hover:text-white transition-colors">
                                    Cookies
                                </a>
                                <a href="#" className="hover:text-white transition-colors">
                                    Contacto
                                </a>
                            </div>
                            <p className="text-sm text-slate-500 text-center lg:text-right">
                                © 2026 Servicios Contables MC. Todos los derechos reservados.
                                <br />
                                NIT: 901.234.567-8 | Cámara de Comercio del Huila
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;