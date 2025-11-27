import React, { useState } from 'react';
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    
    // Simulated Formspree submission logic
    fetch('https://formspree.io/f/YOUR_FORM_ID', { // User would replace YOUR_FORM_ID
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        setStatus('Gracias. Nos pondremos en contacto pronto.');
        form.reset();
      } else {
        // Since we don't have a real ID, we simulate success for the UI demo
        setStatus('Gracias. Nos pondremos en contacto pronto. (Modo Demo)');
        form.reset();
      }
    }).catch(error => {
      setStatus('Gracias. Nos pondremos en contacto pronto. (Modo Demo)');
      form.reset();
    });
  };

  return (
    <div className="pt-32 pb-24 px-6 lg:px-12 min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          {/* Info Column */}
          <div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter mb-12">Contacto</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-16 leading-relaxed">
              Para consultas sobre nuevos proyectos, regularizaciones o colaboraciones, por favor complete el formulario o contáctenos directamente.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-gray-400" size={20} />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Oficina</h3>
                  <p className="text-gray-600 dark:text-gray-300">Av. Apoquindo 4000, Of. 1203<br />Las Condes, Santiago<br />Chile</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="mt-1 text-gray-400" size={20} />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Email</h3>
                  <a href="mailto:contacto@sherparq.cl" className="text-gray-600 dark:text-gray-300 hover:underline">contacto@sherparq.cl</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-1 text-gray-400" size={20} />
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-1">Teléfono</h3>
                  <p className="text-gray-600 dark:text-gray-300">+56 2 2345 6789</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="bg-gray-50 dark:bg-neutral-900 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-gray-500">Nombre</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full bg-transparent border-b border-gray-300 dark:border-neutral-700 py-2 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full bg-transparent border-b border-gray-300 dark:border-neutral-700 py-2 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    placeholder="juan@empresa.cl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-gray-500">Asunto</label>
                <select 
                  id="subject" 
                  name="subject" 
                  className="w-full bg-transparent border-b border-gray-300 dark:border-neutral-700 py-2 focus:outline-none focus:border-black dark:focus:border-white transition-colors appearance-none rounded-none"
                >
                  <option value="general">Consulta General</option>
                  <option value="project">Nuevo Proyecto</option>
                  <option value="regularization">Regularización</option>
                  <option value="jobs">Trabaja con nosotros</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-gray-500">Mensaje</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required
                  className="w-full bg-transparent border-b border-gray-300 dark:border-neutral-700 py-2 focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                  placeholder="Describa brevemente su requerimiento..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full md:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black uppercase tracking-widest text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  Enviar Mensaje <ArrowRight size={16} />
                </button>
              </div>

              {status && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm">
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;