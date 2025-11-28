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
    title: "Gestión Regulatoria y Permisología Industrial",
    subtitle: "DOM & SEREMI",
    desc: "Ofrecemos una gestión de permisos integral y especializada en el complejo marco normativo de Antofagasta. Tramitación de más de 45.000 m² ante la DOM para minería no metálica. Especialistas en Recepción Definitiva, regularización de instalaciones y cumplimiento de OGUC y normativas seccionales (ej. La Negra).",
    value: "Mitigación del riesgo de permisología al abordar la doble vía de aprobación (DOM/SEREMI/Sernageomin).",
    highlight: false
  },
  {
    id: 2,
    icon: <Ruler size={32} strokeWidth={1.5} />,
    title: "Ingeniería Arquitectónica y Diseño Civil Estructural",
    subtitle: "Infraestructura Minera",
    desc: "Desarrollamos proyectos de diseño arquitectónico industrial y civil-estructural para faenas mineras. Desde cabinas de seguridad (Stockpile) hasta edificios de servicio (comedores, salas de cambio), optimizando flujos y logística. Soluciones que garantizan estabilidad, durabilidad y funcionalidad.",
    value: "Diseño alineado con los estándares de seguridad operacional más rigurosos del mercado (ej. Minera Escondida).",
    highlight: true
  },
  {
    id: 3,
    icon: <Box size={32} strokeWidth={1.5} />,
    title: "Geomática de Alta Precisión y Levantamientos 3D",
    subtitle: "Captura Espacial",
    desc: "Captura de datos espaciales y modelado para grandes proyectos industriales. Levantamientos topográficos georreferenciados y ortofotografías con modelos 3D de alta fidelidad (aprox. 400 hectáreas en La Negra). Fundamental para planificación de infraestructura y documentación Sernageomin (KMZ, UTM).",
    value: "Proporcionamos la base cartográfica confiable y actualizada necesaria para la ingeniería de detalle y gestión de activos.",
    highlight: false
  },
  {
    id: 4,
    icon: <Users2 size={32} strokeWidth={1.5} />,
    title: "Optimización Logística y Flujos Operacionales",
    subtitle: "Estudios de Ocupación",
    desc: "Consultoría para mejorar eficiencia y seguridad mediante optimización de movimientos. Estudios de Carga de Ocupación, análisis de desplazamientos y Planos de Flujo e Interacciones. Optimizamos logística en terreno, reduciendo tiempos muertos y minimizando riesgos por exposición climática.",
    value: "Reducción de tiempos muertos y minimización de riesgos laborales derivados de la exposición climática.",
    highlight: false
  },
  {
    id: 5,
    icon: <MonitorPlay size={32} strokeWidth={1.5} />,
    title: "Ingeniería de Mantenimiento y Visualización Técnica 3D",
    subtitle: "Procedimientos Visuales",
    desc: "Transformamos ingeniería conceptual en procedimientos visualmente explícitos. Videos de animación 3D para ilustrar armado y desarme de componentes críticos (ej. Filtros y Bombas Verticales). Asegura ejecución precisa y segura de tareas complejas de mantenimiento.",
    value: "Herramienta esencial para la capacitación y planificación de tareas de alto riesgo (procedimientos de trabajo).",
    highlight: false
  },
  {
    id: 6,
    icon: <ShieldAlert size={32} strokeWidth={1.5} />,
    title: "Diseño de Infraestructura Crítica y Gestión HSE",
    subtitle: "Seguridad y Ambiente",
    desc: "Diseño de sistemas operativos que garantizan cumplimiento de estándares de seguridad y ambiente (DOM, Sernageomin, SEREMI). Soluciones para reemplazo de componentes críticos, urbanización de patios y gestión de residuos. Seguridad física (Layout de Seguridad) según valor y criticidad.",
    value: "Diseño orientado al Principio de Mayor Exigencia, garantizando estabilidad estructural y seguridad operacional.",
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