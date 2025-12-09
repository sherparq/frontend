import React from 'react';
import { ShieldCheck, FileText, HardHat, AlertTriangle } from 'lucide-react';

import { SelectedContext } from './ChatWidget';
import { ScrollHint } from './ScrollHint';

interface ComplianceProps {
    onContextSelect?: (context: SelectedContext | null) => void;
}
export const Compliance: React.FC<ComplianceProps> = ({ onContextSelect }) => {
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
        <section id="compliance" className="py-24 bg-zinc-900 text-white relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-800/20 skew-x-12 transform translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2 block">Marco Regulatorio</span>
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Expertos en Normativa Crítica</h2>
                        <p className="text-zinc-400 max-w-xl">
                            Navegamos la complejidad burocrática para garantizar la viabilidad legal y técnica de su inversión.
                        </p>
                    </div>
                </div>



                <div className="relative w-full">
                    <ScrollHint />
                    <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar">
                        {regulations.map((item, index) => (
                            <div
                                key={index}
                                className="bg-zinc-800/50 border border-zinc-700 p-8 hover:bg-zinc-800 transition-all duration-300 group cursor-pointer min-w-[300px] md:min-w-0 snap-center"
                                onClick={() => onContextSelect && onContextSelect({ type: 'regulation', id: item.code, title: item.code })}
                            >
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
            </div>
        </section>
    );
};
