import React, { useState, useEffect } from 'react';
import { ArrowRight, Hexagon } from 'lucide-react';
import { heroImages } from '../data/heroImages';

interface HeroProps {
  id: string;
}

export const Hero: React.FC<HeroProps> = ({ id }) => {
  const [currentImage, setCurrentImage] = useState(heroImages[0]);

  useEffect(() => {
    // Select a random image on mount
    // Ensure we are using local images from heroImages.ts
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    setCurrentImage(heroImages[randomIndex]);
  }, []);

  return (
    <section id={id} className="relative min-h-screen flex items-start md:items-center justify-center overflow-hidden bg-zinc-100 pt-32 pb-24 md:pt-0 md:pb-0">
      {/* Background with darker overlay for better contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="w-full h-full object-cover opacity-40 grayscale contrast-125 transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/90 via-zinc-100/40 to-transparent" />

        {/* Image Location/Title Badge */}
        <div className="absolute bottom-8 left-8 hidden md:flex flex-col items-start z-20 opacity-60">

          <span className="text-xs font-bold tracking-widest uppercase text-zinc-900">{currentImage.title}</span>
          <span className="text-[10px] uppercase tracking-wider text-zinc-600">{currentImage.location}</span>
        </div>
      </div >

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-4xl animate-fade-in-up">

          <h1 className="text-4xl md:text-7xl font-display font-bold text-zinc-900 leading-[1.1] mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Hexagon size={46} className="text-zinc-900 fill-zinc-900" />
              SherpARQ: <br />
            </div>


            <span className="text-zinc-500 italic font-serif">Ingeniería y Arquitectura Industrial Especializada.</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-700 leading-relaxed mb-10 max-w-2xl border-l-2 border-zinc-900 pl-6">
            <strong>Soluciones para la Gran Minería en Chile.</strong><br />
            Conjunto de servicios de ingeniería y arquitectura altamente especializados en el sector industrial. Expertos en gestión regulatoria, diseño de infraestructura crítica y optimización operacional para clientes como <i>Albemarle</i>, <i>Minera Escondida</i> y <i>Altonorte</i>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#services"
              className="bg-zinc-900 text-white px-8 py-4 flex items-center justify-center gap-3 text-sm uppercase tracking-widest font-medium hover:bg-zinc-700 transition-all hover:gap-4"
            >
              Explorar Soluciones <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="border border-zinc-900 text-zinc-900 px-8 py-4 flex items-center justify-center gap-3 text-sm uppercase tracking-widest font-medium hover:bg-zinc-900 hover:text-white transition-colors"
            >
              Agendar Reunión Técnica
            </a>
          </div>
        </div>
      </div >

      {/* Tech decoration elements - centered to avoid chatbot overlap */}
      < div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-12 hidden lg:block opacity-50" >
        <div className="flex gap-8">
          <div className="text-center">
            <span className="block text-3xl font-bold text-zinc-900">15+</span>
            <span className="text-xs uppercase tracking-widest text-zinc-600">Años Exp.</span>
          </div>
          <div className="w-[1px] h-12 bg-zinc-400"></div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-zinc-900">45k</span>
            <span className="text-xs uppercase tracking-widest text-zinc-600">m² Gestionados</span>
          </div>
        </div>
      </div >

    </section >
  );
};