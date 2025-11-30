import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

import { SelectedContext } from './ChatWidget';

interface PortfolioProps {
  id: string;
  onContextSelect?: (context: SelectedContext | null) => void;
}

type Category = 'ALL' | 'MINING' | 'INDUSTRIAL' | 'INFRASTRUCTURE' | 'ENGINEERING' | 'URBAN';

interface Project {
  title: string;
  category: Category;
  description: string;
  metrics?: string;
}

export const Portfolio: React.FC<PortfolioProps> = ({ id, onContextSelect }) => {
  const [filter, setFilter] = useState<Category>('ALL');

  const categories: { id: Category; label: string }[] = [
    { id: 'ALL', label: 'Todos' },
    { id: 'MINING', label: 'Gestión Minera' },
    { id: 'INDUSTRIAL', label: 'Arq. Industrial' },
    { id: 'INFRASTRUCTURE', label: 'Habitabilidad' },
    { id: 'ENGINEERING', label: 'Ingeniería' },
    { id: 'URBAN', label: 'Urbano' },
  ];

  const projects: Project[] = [
    // GESTIÓN
    {
      title: "Gestión de Recepción Definitiva Planta Química",
      category: "MINING",
      description: "Gestión integral y recepción de obras para expansiones de fases 1, 2 y 3 en complejo industrial.",
      metrics: "42.200 m² Permisos / 45.000 m² Carpetas Técnicas"
    },
    {
      title: "Regularización de Complejo Industrial",
      category: "MINING",
      description: "Levantamiento y regularización de plantas de procesos, talleres y bodegas para cumplimiento normativo.",
      metrics: "6.700 m² Regularizados"
    },
    {
      title: "Levantamiento Topográfico 400 Ha",
      category: "MINING",
      description: "Generación de modelos digitales y ortofotografías para área extensa de instalaciones industriales.",
    },
    // INDUSTRIAL
    {
      title: "Nueva Planta Almacenamiento Explosivos",
      category: "INDUSTRIAL",
      description: "Desarrollo de ingeniería para aumentar capacidad de stock y autonomía de 2 a 5 días.",
    },
    {
      title: "Bodega de Sustancias Peligrosas (Suspel)",
      category: "INDUSTRIAL",
      description: "Ingeniería de detalles para unificar y almacenar materiales críticos bajo estrictas normas de seguridad portuaria.",
    },
    {
      title: "Cabinas de Control Remoto Bulldozers",
      category: "INDUSTRIAL",
      description: "Diseño sobre estructuras existentes y renovación de revestimientos para mitigación ambiental.",
    },
    {
      title: "Estandarización Patios Equipos Semi-Móviles",
      category: "INDUSTRIAL",
      description: "Segregación, cierres perimetrales y ordenamiento de flujos para áreas de mantenimiento.",
    },
    // INFRASTRUCTURE
    {
      title: "Centro de Entrenamiento Brigadas Emergencia",
      category: "INFRASTRUCTURE",
      description: "Diseño de complejo con simuladores de fuego y rescate bajo estándares internacionales.",
    },
    {
      title: "Complejo Recreativo y Deportivo Industrial",
      category: "INFRASTRUCTURE",
      description: "Ingeniería conceptual para centro de esparcimiento (200 trabajadores), canchas y club house.",
    },
    {
      title: "Rodoviario Alta Montaña",
      category: "INFRASTRUCTURE",
      description: "Terminal de buses con solución de climatización pasiva/activa para protección de choques térmicos.",
    },
    // ENGINEERING
    {
      title: "Animación 3D para Mantenimiento",
      category: "ENGINEERING",
      description: "Videos técnicos instructivos para armado/desarme de filtros industriales.",
    },
    {
      title: "Estudios de Carga de Ocupación",
      category: "ENGINEERING",
      description: "Análisis de habitabilidad y flujos de movilidad en edificios corporativos en faena.",
    },
    // URBAN
    {
      title: "Infraestructura Deportiva Pública",
      category: "URBAN",
      description: "Diseño de cubiertas para piscinas olímpicas y complejos deportivos municipales.",
    },
    {
      title: "Remodelación Oficinas Corporativas",
      category: "URBAN",
      description: "Proyectos para empresas del sector sanitario y salud previsional.",
    }
  ];

  const filteredProjects = filter === 'ALL' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id={id} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 mb-4">Portafolio Seleccionado</h2>
            <p className="text-zinc-500 max-w-xl">
              Una muestra de nuestra experiencia técnica. Por acuerdos de confidencialidad, se omiten nombres específicos de clientes.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`text-xs uppercase tracking-wider px-4 py-2 border transition-all duration-300 ${filter === cat.id
                    ? 'bg-zinc-900 text-white border-zinc-900'
                    : 'bg-transparent text-zinc-500 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group flex flex-col animate-fade-in cursor-pointer"
              onClick={() => onContextSelect && onContextSelect({ type: 'project', id: project.title, title: project.title })}
            >
              {/* Visual placeholder for project */}
              <div className="w-full h-2 bg-zinc-100 mb-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-zinc-900 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>

              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-zinc-400 mb-2">
                {categories.find(c => c.id === project.category)?.label}
              </span>

              <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-zinc-600 transition-colors">
                {project.title}
              </h3>

              <p className="text-zinc-600 text-sm leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>

              {project.metrics && (
                <div className="mt-auto pt-4 border-t border-zinc-100">
                  <span className="text-xs font-semibold text-zinc-800">{project.metrics}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};