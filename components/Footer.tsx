import React from 'react';
import { Linkedin, Instagram, Twitter, Send, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  // Social media strictly limited as requested
  const socials = [
    { name: 'LinkedIn', icon: <Linkedin size={18} strokeWidth={1.5} />, href: 'https://www.linkedin.com' },
    { name: 'Instagram', icon: <Instagram size={18} strokeWidth={1.5} />, href: 'https://www.instagram.com' },
    { name: 'X', icon: <Twitter size={18} strokeWidth={1.5} />, href: 'https://twitter.com' },
    { name: 'WhatsApp', icon: <MessageCircle size={18} strokeWidth={1.5} />, href: 'https://wa.me/56990899725' },
  ];

  return (
    <footer className="bg-zinc-950 py-16 text-zinc-500 text-sm border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          <div className="col-span-1 md:col-span-2">
            <a href="#home" className="inline-block mb-6 text-white">
              <span className="font-bold text-2xl tracking-tight">Sherp<span className="font-light">ARQ</span></span>
            </a>
            <p className="max-w-sm text-zinc-500 leading-relaxed mb-6">
              Soluciones técnicas integrales para la gran minería y el sector urbano.
              Arquitectura, Ingeniería y Gestión de Proyectos en el norte de Chile.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Navegación</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Nodos de Experticia</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portafolio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Conectar</h4>
            <div className="flex gap-4 flex-wrap">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">© {year} SherpARQ. Todos los derechos reservados.</p>
          <div className="flex gap-6 text-xs text-zinc-600">
            <a href="#" className="hover:text-zinc-400">Privacidad</a>
            <a href="#" className="hover:text-zinc-400">Términos</a>
          </div>
        </div>

      </div>
    </footer>
  );
};