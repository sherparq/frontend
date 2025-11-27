import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-sherp-black text-white py-16 md:py-24 px-6 border-t border-neutral-800">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-3xl font-bold tracking-tight mb-4">SherpARQ</h3>
          <p className="text-gray-400 max-w-sm leading-relaxed">
            Arquitectura industrial e ingeniería de precisión. <br/>
            Transformamos desafíos complejos en soluciones operativas y espaciales de alto estándar.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-6">Contacto</h4>
          <ul className="space-y-2 text-gray-300">
            <li>contacto@sherparq.cl</li>
            <li>+56 2 2345 6789</li>
            <li>Av. Apoquindo 4000, Of. 1203</li>
            <li>Las Condes, Santiago, Chile</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-6">Social</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">ArchDaily</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-screen-2xl mx-auto mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
        <p>© {new Date().getFullYear()} SherpARQ. Todos los derechos reservados.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
           <Link to="/" className="hover:text-gray-400">Privacidad</Link>
           <Link to="/" className="hover:text-gray-400">Términos</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;