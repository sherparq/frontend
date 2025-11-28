import React from 'react';
import { ShieldCheck, FileText, HardHat, AlertTriangle } from 'lucide-react';

export const Compliance: React.FC = () => {
    const regulations = [
        {
            icon: <FileText size={32} />,
            code: "OGUC",
            title: "Ordenanza General de Urbanismo y Construcciones",
            description: "Cumplimiento normativo para diseño y construcción a nivel nacional, incluyendo últimas modificaciones 2024-2025."
        },
        {
            icon: <AlertTriangle size={32} />,
            code: "DS 43",
            title: "Almacenamiento de Sustancias Peligrosas",
            description: "Diseño de bodegas y patios de acopio bajo estricta normativa sanitaria y de seguridad (Reemplazo DS 78)."
        },
        {
            icon: <HardHat size={32} />,
            code: "DS 132",
            title: "Reglamento de Seguridad Minera",
            description: "Estándares Sernageomin para infraestructura en faena, polvorines, talleres y campamentos."
        },
        {
            icon: <ShieldCheck size={32} />,
            code: "DS 594",
            title: "Condiciones Sanitarias y Ambientales",
            description: "Regulación para casinos, baños, oficinas y habitabilidad básica en lugares de trabajo."
        }
    ];

    return (
        <section className="py-20 bg-zinc-900 text-zinc-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Expertos en Normativa Crítica</h2>
                    <p className="text-zinc-400 max-w-2xl text-lg">
                        Nuestra arquitectura no solo es funcional, es legalmente robusta. Garantizamos el cumplimiento de los decretos más exigentes de la industria minera.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {regulations.map((item, index) => (
                        <div key={index} className="bg-zinc-800/50 p-8 border border-zinc-700 hover:border-zinc-500 transition-colors group">
                            <div className="text-zinc-400 mb-6 group-hover:text-white transition-colors">
                                {item.icon}
                            </div>
                            <div className="inline-block px-3 py-1 bg-zinc-800 text-xs font-bold tracking-widest uppercase text-zinc-300 mb-4 border border-zinc-600">
                                {item.code}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
