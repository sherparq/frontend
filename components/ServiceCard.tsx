import React from 'react';
import { Service } from '../types';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="py-24 border-b border-gray-200 dark:border-neutral-800 last:border-0">
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
        
        {/* Content */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-4 mb-2">
             <span className="text-xs font-mono px-2 py-1 border border-gray-300 dark:border-neutral-700 rounded-full uppercase">
                0{index + 1}
             </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-sherp-black dark:text-sherp-white leading-tight">
            {service.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
            {service.shortDescription}
          </p>
          <ul className="space-y-3 pt-4 border-t border-gray-100 dark:border-neutral-800">
            {service.bullets.map((bullet, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                <div className="h-1 w-1 bg-sherp-black dark:bg-sherp-white rounded-full"></div>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className="flex-1 w-full">
          <div className="relative overflow-hidden group aspect-[4/3]">
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale hover:grayscale-0"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceCard;