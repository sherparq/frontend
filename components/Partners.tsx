import React from 'react';

export const Partners: React.FC = () => {
    const partners = [
        { name: "Minera Escondida | BHP", logo: "/logos/escondida.png" },
        { name: "Albemarle", logo: "/logos/albemarle.png" },
        { name: "Glencore", logo: "/logos/glencore.png" },
        { name: "Antofagasta Minerals", logo: "/logos/ams.png" }
    ];

    return (
        <section className="py-16 bg-white border-b border-zinc-200">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <p className="text-center text-sm font-bold tracking-[0.2em] uppercase text-zinc-400 mb-12">
                    Confían en Nuestra Experiencia
                </p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner, index) => (
                        <div key={index} className="w-32 md:w-40 flex flex-col items-center justify-center gap-4 group">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-800 transition-colors text-center">{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
