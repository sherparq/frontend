import React from 'react';

export const Partners: React.FC = () => {
    const partners = [
        { name: "Minera Escondida | BHP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/BHP_2017_logo.svg/2560px-BHP_2017_logo.svg.png" },
        { name: "Albemarle", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Albemarle_Logo.svg/1200px-Albemarle_Logo.svg.png" },
        { name: "Glencore", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Glencore_logo.svg/2560px-Glencore_logo.svg.png" },
        { name: "Antofagasta Minerals", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antofagasta_plc_logo.svg/2560px-Antofagasta_plc_logo.svg.png" }
    ];

    return (
        <section className="py-16 bg-white border-b border-zinc-200">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <p className="text-center text-sm font-bold tracking-[0.2em] uppercase text-zinc-400 mb-12">
                    Confían en Nuestra Experiencia
                </p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {partners.map((partner, index) => (
                        <div key={index} className="w-32 md:w-40 flex items-center justify-center">
                            {/* Using text fallback if images fail or for simplicity in this mock */}
                            <div className="text-center">
                                <span className="text-xl font-bold text-zinc-800 font-display">{partner.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
