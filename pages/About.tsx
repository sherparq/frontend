import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-12 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        
        <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter mb-16">
          SherpARQ
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          <div className="md:col-span-4">
            <h2 className="text-sm uppercase tracking-widest font-medium text-gray-500 mb-4 sticky top-32">El Estudio</h2>
          </div>
          <div className="md:col-span-8 space-y-8 text-xl md:text-2xl leading-relaxed font-light">
            <p>
              Somos un estudio de arquitectura chileno que redefine la infraestructura industrial. Creemos que la eficiencia técnica y la calidad espacial no son mutuamente excluyentes, sino complementarias.
            </p>
            <p>
              Nuestro nombre alude a los "Sherpas", guías expertos que facilitan el ascenso en terrenos difíciles. En SherpARQ, guiamos a nuestros clientes a través de la compleja topografía normativa y técnica de los proyectos de gran escala en Chile.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Desde la regularización de activos existentes hasta el diseño de nuevos complejos mineros, nuestra misión es aportar certeza jurídica, excelencia operacional y dignidad espacial.
            </p>
          </div>
        </div>

        <div className="w-full h-[50vh] md:h-[70vh] mb-24 overflow-hidden">
             <img 
                src="https://picsum.photos/1600/900?grayscale" 
                alt="Oficina SherpARQ" 
                className="w-full h-full object-cover"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-sm uppercase tracking-widest font-medium text-gray-500 mb-4 sticky top-32">Nuestros Valores</h2>
          </div>
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
             <div>
                <h3 className="text-xl font-semibold mb-4">Precisión</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">No dejamos espacio a la ambigüedad. Utilizamos tecnología de punta para asegurar que lo proyectado sea exactamente lo construido y legalizado.</p>
             </div>
             <div>
                <h3 className="text-xl font-semibold mb-4">Austeridad</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Buscamos el máximo impacto con los recursos justos. Una estética limpia que responde a la función sin adornos innecesarios.</p>
             </div>
             <div>
                <h3 className="text-xl font-semibold mb-4">Bienestar</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">La arquitectura industrial también es para las personas. Diseñamos pensando en la calidad de vida del operario y el usuario final.</p>
             </div>
             <div>
                <h3 className="text-xl font-semibold mb-4">Integridad</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Transparencia total en procesos de permisos y gestión. Somos socios estratégicos de confianza a largo plazo.</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;