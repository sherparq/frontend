import React from 'react';
import {
  FileCheck2,
  Ruler,
  Box,
  Users2,
  MonitorPlay,
  ShieldAlert,
  Plus
} from 'lucide-react';

interface ServicesProps {
  id: string;
}

// Data based on the provided "Cluster de Nodos de Conocimiento"
const nodes = [
  {
    id: 1,
    icon: <FileCheck2 size={32} strokeWidth={1.5} />,
    title: "Gestión Regulatoria y Permisología Acelerada",
    subtitle: "DOM & SEREMI",
    desc: "Eliminamos la incertidumbre de la tramitación en Antofagasta. Hemos liderado la Recepción Definitiva de Obras y la regularización de instalaciones industriales, gestionando con éxito más de $45.000 m² en permisos ante la DOM de Antofagasta.",
    value: "Especialistas en Ordenanzas Municipales Seccionales (ej. Sector La Negra) y armonización urbanística/sanitaria/minera.",
    highlight: false
  },
  {
    id: 2,
    icon: <Ruler size={32} strokeWidth={1.5} />,
    title: "Diseño Civil Estructural de Alta Exigencia (HSE)",
    subtitle: "Seguridad Física",
    desc: "Desarrollamos infraestructura que soporta las condiciones extremas de la faena minera. Diseño de cabinas de seguridad (ej. Cabinas de Control Stockpile OGP1), optimización de edificios de servicio y urbanización de patios.",
    value: "Priorizamos la seguridad física de activos y personas en cada diseño.",
    highlight: true
  },
  {
    id: 3,
    icon: <Box size={32} strokeWidth={1.5} />,
    title: "Geomática y Modelado 3D de Faenas",
    subtitle: "Base Cartográfica",
    desc: "Proporcionamos la base cartográfica georreferenciada indispensable para la aprobación de Sernageomin. Levantamientos topográficos y ortofotografías con modelo 3D de alta fidelidad (hasta 400 hectáreas).",
    value: "Datos precisos para el cumplimiento normativo y la planificación estratégica.",
    highlight: false
  },
  {
    id: 4,
    icon: <Users2 size={32} strokeWidth={1.5} />,
    title: "Optimización de Flujos Operacionales y Logística",
    subtitle: "Eficiencia y Bienestar",
    desc: "Maximizamos la eficiencia y el bienestar del personal. Estudios de Carga de Ocupación y Flujos para redistribución estratégica. Diseño de soluciones para mitigar riesgos logísticos y climáticos (ej. Control Temperatura Rodoviarios).",
    value: "Optimización del recorrido desde el bus hasta el punto de trabajo.",
    highlight: false
  },
  {
    id: 5,
    icon: <MonitorPlay size={32} strokeWidth={1.5} />,
    title: "Ingeniería de Mantenimiento y Procedimientos Visuales (3D)",
    subtitle: "Capacitación Visual",
    desc: "Aseguramos la ejecución segura de procedimientos complejos. Videos de Animación 3D para ilustrar armado, desarme y desmontaje de componentes críticos (ej. Filtros PF-01, Bombas Verticales).",
    value: "Esencial para la capacitación y planificación de tareas de alto riesgo.",
    highlight: false
  },
  {
    id: 6,
    icon: <ShieldAlert size={32} strokeWidth={1.5} />,
    title: "Compliance de Sustancias Peligrosas (D.S. N° 43) y Residuos",
    subtitle: "Seguridad Normativa",
    desc: "Garantizamos cumplimiento MINSAL. Diseño y regularización de Bodegas SUSPEL, priorizando distanciamientos críticos. Diseños para gestión de residuos enajenables alineados con requisitos HSE.",
    value: "Cumplimiento estricto de normativas de seguridad y medio ambiente.",
    highlight: true
  }
];

export const Services: React.FC<ServicesProps> = ({ id }) => {
  return (
    <section id={id} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500 mb-2 block">Nuestra Oferta de Valor</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 leading-tight">
              Cluster de Nodos <br /> de Conocimiento
            </h2>
          </div>
          <p className="text-zinc-600 max-w-sm text-sm leading-relaxed text-right md:text-left">
            Estructuramos nuestros servicios en 6 áreas clave para abordar la complejidad industrial desde múltiples dimensiones.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`group relative overflow-hidden p-8 border transition-all duration-500 hover:shadow-2xl flex flex-col justify-between h-[400px]
                ${node.highlight ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900 hover:border-zinc-400'}
              `}
            >
              {/* Content Layer */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-lg ${node.highlight ? 'bg-zinc-800 text-zinc-300' : 'bg-white text-zinc-900 shadow-sm'}`}>
                    {node.icon}
                  </div>
                  <span className={`text-5xl font-bold opacity-10 ${node.highlight ? 'text-white' : 'text-zinc-900'}`}>
                    0{node.id}
                  </span>
                </div>

                <div className="mt-auto">
                  <span className={`text-xs font-bold uppercase tracking-widest mb-2 block ${node.highlight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {node.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold mb-4 leading-tight">{node.title}</h3>
                  <p className={`text-sm leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all ${node.highlight ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {node.desc}
                  </p>
                </div>

                {/* Reveal Layer (Value Add) */}
                <div className={`absolute inset-0 z-20 p-8 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out
                  ${node.highlight ? 'bg-zinc-800/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'}
                `}>
                  <div className="flex items-center gap-2 mb-3">
                    <Plus size={16} className="text-yellow-600" />
                    <span className="text-xs font-bold uppercase tracking-widest text-yellow-600">Valor Agregado</span>
                  </div>
                  <p className={`text-base font-medium leading-relaxed ${node.highlight ? 'text-white' : 'text-zinc-900'}`}>
                    {node.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};