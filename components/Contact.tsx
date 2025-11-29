import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactProps {
  id: string;
}

export const Contact: React.FC<ContactProps> = ({ id }) => {
  return (
    <section id={id} className="py-24 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Hablemos de su Proyecto</h2>
            <p className="text-zinc-400 mb-12 text-lg">
              **No deje la continuidad de su proyecto al azar.**<br />
              Contáctenos para una **Auditoría de Compliance Regulatorio en Antofagasta** y obtenga la ruta más segura hacia su aprobación.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-zinc-800 text-zinc-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Ubicación</h4>
                  <p className="text-zinc-400">Barrio Grecia,<br />Antofagasta, Chile.</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-zinc-800 text-zinc-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Teléfono</h4>
                  <a href="tel:+56990899725" className="text-zinc-400 hover:text-white transition-colors text-xl">
                    +569 9089 9725
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-zinc-800 text-zinc-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Correo Electrónico</h4>
                  <a href="mailto:contacto@sherparq.cl" className="text-zinc-400 hover:text-white transition-colors text-xl break-all">
                    contacto@sherparq.cl
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative h-full min-h-[400px] bg-zinc-800 overflow-hidden border border-zinc-700 group">
            <img
              src={`${import.meta.env.BASE_URL}hero/antofagasta_coast.png`}
              alt="Mapa Antofagasta"
              className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500 grayscale"
            />
            <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/80 to-transparent w-full">
              <span className="uppercase tracking-widest text-xs font-bold text-zinc-300">Base de Operaciones</span>
              <h3 className="text-2xl font-display font-bold mt-1">Norte Grande, Chile</h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};