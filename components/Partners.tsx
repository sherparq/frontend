import React from 'react';

import { SelectedContext } from './ChatWidget';

interface PartnersProps {
    onContextSelect?: (context: SelectedContext | null) => void;
}

export const Partners: React.FC<PartnersProps> = ({ onContextSelect }) => {
    const BASE_URL = import.meta.env.BASE_URL;
    const partners = [
        { name: "Minera Escondida | BHP", logo: `${BASE_URL}logos/bhp.svg` },
        { name: "Albemarle", logo: `${BASE_URL}logos/albemarle.svg` },
        { name: "Glencore", logo: `${BASE_URL}logos/glencore.svg` },
        { name: "Antofagasta Minerals", logo: `${BASE_URL}logos/antofagasta-minerals.svg` }
    ];

    return (
        <section className="py-16 bg-white border-b border-zinc-200">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <p className="text-center text-sm font-bold tracking-[0.2em] uppercase text-zinc-400 mb-12">
                    Confían en Nuestra Experiencia
                </p>

                <div className="relative flex overflow-hidden group">
                    {/* First copy of the content */}
                    <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center justify-around gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 hover:[animation-play-state:paused] pr-12 md:pr-24">
                        {partners.map((partner, index) => (
                            <div
                                key={index}
                                className="w-32 md:w-40 flex-shrink-0 flex flex-col items-center justify-center gap-4 cursor-pointer"
                                onClick={() => onContextSelect && onContextSelect({ type: 'partner', id: partner.name, title: partner.name })}
                            >
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="h-16 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-800 transition-colors text-center">{partner.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* Second copy of the content for seamless loop */}
                    <div className="flex animate-marquee whitespace-nowrap min-w-full shrink-0 items-center justify-around gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 hover:[animation-play-state:paused] pr-12 md:pr-24">
                        {partners.map((partner, index) => (
                            <div
                                key={`clone-${index}`}
                                className="w-32 md:w-40 flex-shrink-0 flex flex-col items-center justify-center gap-4 cursor-pointer"
                                onClick={() => onContextSelect && onContextSelect({ type: 'partner', id: partner.name, title: partner.name })}
                            >
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
            </div>
        </section>
    );
};
