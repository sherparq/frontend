import React from 'react';
import { Award, MapPin, Users, HardHat } from 'lucide-react';

import { SelectedContext } from './ChatWidget';

interface AboutProps {
  id: string;
  onContextSelect?: (context: SelectedContext | null) => void;
}

export const About: React.FC<AboutProps> = ({ id, onContextSelect }) => {
  return (
    <section id={id} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Executive Summary */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-zinc-900">Perfil Corporativo</h2>
            <div className="prose prose-zinc prose-lg text-zinc-600 mb-8">
              <p>
                <span className="font-bold text-zinc-900">SherpARQ</span> es una firma consultora consolidada con más de 15 años de trayectoria.
                Nos especializamos en el desarrollo integral de proyectos de Arquitectura Industrial,
                Ingeniería Civil-Estructural y Diseño Urbano.
              </p>
              <p>
                Nuestra experiencia se centra en brindar soluciones técnicas de alto nivel para la gran minería
                (metálica y no metálica) y el sector público. Hemos colaborado con líderes de la industria como
                <span className="font-semibold text-zinc-800"> Albemarle Ltda., Minera Escondida Ltda. y Altonorte</span>,
                gestionando desde el diseño conceptual hasta la regularización y recepción final de obras.
              </p>
              <p>
                Contamos con un equipo multidisciplinario experto en la normativa vigente, asegurando la
                continuidad operacional y el cumplimiento legal.
              </p>
            </div>


          </div>

          {/* Right Column: Features & Founder */}
          <div className="bg-zinc-50 p-8 md:p-12 border border-zinc-100">
            <div className="mb-12">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Pilares Estratégicos</h3>
              <ul className="space-y-6">
                <li
                  className="flex items-start gap-4 cursor-pointer group"
                  onClick={() => onContextSelect && onContextSelect({ type: 'value', id: 'Excelencia Técnica', title: 'Excelencia Técnica' })}
                >
                  <div className="mt-1 p-2 bg-white border border-zinc-200 text-zinc-700 shadow-sm group-hover:border-zinc-400 transition-colors">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">Excelencia Técnica</h4>
                    <p className="text-sm text-zinc-600">Cumplimiento estricto de normativa y estándares de la industria.</p>
                  </div>
                </li>
                <li
                  className="flex items-start gap-4 cursor-pointer group"
                  onClick={() => onContextSelect && onContextSelect({ type: 'value', id: 'Enfoque Regional', title: 'Enfoque Regional' })}
                >
                  <div className="mt-1 p-2 bg-white border border-zinc-200 text-zinc-700 shadow-sm group-hover:border-zinc-400 transition-colors">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">Enfoque Regional</h4>
                    <p className="text-sm text-zinc-600">Profundo conocimiento del territorio y clima del norte de Chile.</p>
                  </div>
                </li>
                <li
                  className="flex items-start gap-4 cursor-pointer group"
                  onClick={() => onContextSelect && onContextSelect({ type: 'value', id: 'Seguridad Operacional', title: 'Seguridad Operacional' })}
                >
                  <div className="mt-1 p-2 bg-white border border-zinc-200 text-zinc-700 shadow-sm group-hover:border-zinc-400 transition-colors">
                    <HardHat size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors">Seguridad Operacional</h4>
                    <p className="text-sm text-zinc-600">Diseño enfocado en la seguridad del trabajador y continuidad de procesos.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-8 border-t border-zinc-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-200 flex items-center justify-center text-zinc-400">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-900">Liderazgo Técnico</h4>
                  <p className="text-xs uppercase tracking-wider text-zinc-500">Arquitecto UCN • Esp. Patrimonio</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-600 italic">
                "Dominio avanzado de tecnología BIM y CAD para soluciones precisas."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};