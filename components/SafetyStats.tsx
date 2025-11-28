import React from 'react';

export const SafetyStats: React.FC = () => {
    const stats = [
        { value: "0", label: "Accidentes con Tiempo Perdido", sub: "Últimos 5 años" },
        { value: "+45k", label: "Metros Cuadrados Gestionados", sub: "Infraestructura Industrial" },
        { value: "100%", label: "Cumplimiento Normativo", sub: "Auditorías Sernageomin" },
    ];

    return (
        <section className="py-24 bg-zinc-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-300">
                    {stats.map((stat, index) => (
                        <div key={index} className="px-4 py-8 md:py-0">
                            <div className="text-5xl md:text-6xl font-bold text-zinc-900 mb-2 font-display">
                                {stat.value}
                            </div>
                            <div className="text-sm font-bold uppercase tracking-widest text-zinc-800 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">
                                {stat.sub}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
