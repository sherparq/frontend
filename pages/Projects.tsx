import React from 'react';
import { FEATURED_PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-12 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16 border-b border-gray-200 dark:border-neutral-800 pb-8">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-6">Portafolio</h1>
          <div className="flex flex-wrap gap-4">
             <button className="text-sm font-medium uppercase tracking-widest border-b border-black dark:border-white pb-1">Todos</button>
             <button className="text-sm font-medium uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors pb-1">Industrial</button>
             <button className="text-sm font-medium uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors pb-1">Habitabilidad</button>
             <button className="text-sm font-medium uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors pb-1">Corporativo</button>
          </div>
        </div>

        {/* Masonry-ish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {FEATURED_PROJECTS.map((project, index) => (
            <div key={project.id} className={`group flex flex-col ${index % 2 !== 0 ? 'md:translate-y-16' : ''}`}>
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-gray-100 dark:bg-neutral-800">
                 <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 text-xs font-mono uppercase">
                    {project.metric}
                 </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-medium mb-2 group-hover:underline decoration-1 underline-offset-4">
                {project.title}
              </h3>
              <p className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-2">
                {project.category}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {project.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="h-32"></div> {/* Spacer for the offset grid */}
      </div>
    </div>
  );
};

export default Projects;