import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare, MessageCircle } from 'lucide-react';
import { SelectedContext } from './ChatWidget';

interface ContactProps {
  id: string;
  onContextSelect?: (context: SelectedContext | null) => void;
}

export const Contact: React.FC<ContactProps> = ({ id, onContextSelect }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const messages = [
    {
      title: "No deje la continuidad de su proyecto al azar.",
      subtitle: "Contáctenos para una Auditoría de Compliance Regulatorio en el Norte Grande y obtenga la ruta más segura hacia su aprobación."
    },
    {
      title: "¿Necesita optimizar sus operaciones?",
      subtitle: "Ofrecemos estudios de flujo logístico y carga de ocupación para maximizar la eficiencia de su faena."
    },
    {
      title: "Infraestructura crítica que cumple.",
      subtitle: "Diseño especializado en bodegas de sustancias peligrosas y plantas de almacenamiento bajo normativa DS 43."
    },
    {
      title: "Geomática de precisión para grandes proyectos.",
      subtitle: "Levantamientos topográficos y modelos 3D de alta fidelidad para planificación industrial."
    },
    {
      title: "Más de 45.000 m² gestionados exitosamente.",
      subtitle: "Experiencia comprobada, en mineras o personas naturales proyectos de todo los tamaños, en el Norte Grande de Chile. Contáctanos."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);

      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        setIsFading(false);
      }, 500); // Fade out for 500ms, then switch

    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <section id={id} className="py-24 bg-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Hablemos de su Proyecto</h2>
            <div className="text-zinc-400 mb-8 text-lg min-h-[120px]">
              <p className={`transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                <strong>{messages[currentMessageIndex].title}</strong><br />
                {messages[currentMessageIndex].subtitle}
              </p>
            </div>

            <button
              onClick={() => onContextSelect && onContextSelect({ type: 'contact_form', id: 'general', title: 'Contacto' })}
              className="mb-12 bg-zinc-100 text-zinc-900 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2"
            >
              <MessageSquare size={18} />
              Iniciar Contacto Inteligente
            </button>
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
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">WhatsApp</h4>
                  <a href="https://wa.me/56990899725" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors text-xl">
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