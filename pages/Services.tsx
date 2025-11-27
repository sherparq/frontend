import React from 'react';
import { SERVICES } from '../constants';
import ServiceCard from '../components/ServiceCard';

const Services: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-12 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-24 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8">Nuestros Servicios</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed">
            Un enfoque holístico que integra la regularización normativa, el diseño arquitectónico de vanguardia y la ingeniería de precisión para el sector industrial.
          </p>
        </div>

        <div className="flex flex-col">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;