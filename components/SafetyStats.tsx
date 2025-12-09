import React from 'react';

export const SafetyStats: React.FC = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isFading, setIsFading] = React.useState(false);

    const stats = [
        { value: "15+", label: "Años de Experiencia", sub: "Trayectoria Consolidada" },
        { value: "0", label: "Accidentes con Tiempo Perdido", sub: "Últimos 5 años" },
        { value: "+45k", label: "Metros Cuadrados Gestionados", sub: "Infraestructura Industrial" },
        { value: "100%", label: "Cumplimiento Normativo", sub: "Auditorías Sernageomin" },
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % stats.length);
                setIsFading(false);
            }, 500);
        }, 4000);

        return () => clearInterval(interval);
    }, [stats.length]);

    return (
        <section className="py-24 bg-zinc-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-4 gap-8 text-center divide-x divide-zinc-300">
                    {stats.map((stat, index) => (
                        <div key={index} className="px-4">
                            <div className="text-6xl font-bold text-zinc-900 mb-2 font-display">
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

                {/* Mobile View (Animated) */}
                <div className="md:hidden flex flex-col items-center justify-center text-center min-h-[200px]">
                    <div className={`transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="text-6xl font-bold text-zinc-900 mb-4 font-display">
                            {stats[currentIndex].value}
                        </div>
                        <div className="text-sm font-bold uppercase tracking-widest text-zinc-800 mb-2 max-w-[250px] mx-auto">
                            {stats[currentIndex].label}
                        </div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">
                            {stats[currentIndex].sub}
                        </div>
                    </div>

                    {/* Indicators */}
                    <div className="flex gap-2 mt-8">
                        {stats.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-zinc-800 w-4' : 'bg-zinc-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
