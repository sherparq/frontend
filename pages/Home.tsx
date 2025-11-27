import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FEATURED_PROJECTS } from '../constants';
import ChatInterface from '../components/ChatInterface';

const Home: React.FC = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="h-screen flex flex-col justify-center px-6 lg:px-12 pt-20 border-b border-gray-200 dark:border-neutral-800 relative overflow-hidden">
                <div className="max-w-screen-2xl mx-auto w-full z-10">
                    <p className="text-sm md:text-base uppercase tracking-widest mb-6 text-gray-500 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Arquitectura Industrial & Ingeniería
                    </p>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[0.9] text-sherp-black dark:text-sherp-white mb-12 max-w-5xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        Diseñamos la eficiencia <br />
                        <span className="text-gray-400 dark:text-neutral-600">del mañana, hoy.</span>
                    </h1>
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <Link to="/projects" className="group flex items-center gap-4 px-8 py-4 bg-sherp-black dark:bg-white text-white dark:text-black rounded-none hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                            <span className="text-sm font-medium uppercase tracking-widest">Ver Proyectos</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <p className="max-w-md text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Especialistas en regularización, diseño operacional y habitabilidad para la gran industria y minería en Chile.
                        </p>
                    </div>
                </div>

                {/* Abstract Background Element */}
                <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gray-50 dark:bg-neutral-900 -z-10 blur-3xl opacity-50"></div>
            </section>

            {/* Value Proposition (Short) */}
            <section className="py-24 md:py-32 px-6 lg:px-12 bg-sherp-light dark:bg-neutral-900">
                <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-8">
                            Transformamos complejidad técnica en soluciones arquitectónicas de alto valor.
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">+15 Años</h3>
                            <p className="text-sm text-gray-500">Experiencia en sector industrial y minero.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Gestión Integral</h3>
                            <p className="text-sm text-gray-500">Desde el permiso municipal hasta la entrega final.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Tecnología 3D</h3>
                            <p className="text-sm text-gray-500">BIM, LiDAR y Fotogrametría aplicada.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Cobertura Nacional</h3>
                            <p className="text-sm text-gray-500">Proyectos de Arica a Punta Arenas.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects Preview */}
            <section className="py-24 px-6 lg:px-12">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-2xl font-medium uppercase tracking-widest">Proyectos Recientes</h2>
                        <Link to="/projects" className="hidden md:flex items-center gap-2 text-sm border-b border-black dark:border-white pb-1 hover:text-gray-500 transition-colors">
                            Ver Todo <ArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {FEATURED_PROJECTS.slice(0, 3).map((project) => (
                            <Link to="/projects" key={project.id} className="group block">
                                <div className="aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-neutral-800 mb-4">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                    />
                                </div>
                                <h3 className="text-lg font-medium mb-1 group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">{project.category}</p>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-12 md:hidden">
                        <Link to="/projects" className="flex items-center gap-2 text-sm font-medium">
                            Ver Todo el Portafolio <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Chat Interface Section */}
            <section className="py-24 px-6 lg:px-12 bg-gray-50 dark:bg-neutral-900" id="consultor">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-medium mb-4">Consultor Digital SherpARQ</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Resuelva sus dudas sobre normativa, seguridad minera y factibilidad técnica al instante con nuestra IA especializada.
                        </p>
                    </div>
                    <ChatInterface />
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 px-6 lg:px-12 bg-sherp-black text-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-semibold mb-8 tracking-tight">¿Listo para elevar el estándar?</h2>
                    <p className="text-gray-400 mb-12 text-lg">Hablemos sobre cómo podemos optimizar sus activos inmobiliarios.</p>
                    <Link to="/contact" className="inline-block px-12 py-5 border border-white text-white hover:bg-white hover:text-black transition-colors uppercase tracking-widest text-sm font-medium">
                        Iniciar Conversación
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;