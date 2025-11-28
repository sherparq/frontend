export interface HeroImage {
    url: string;
    alt: string;
    title: string;
    location?: string;
}

export const heroImages: HeroImage[] = [
    {
        url: "https://images.unsplash.com/photo-1599939571322-792a326991f2?q=80&w=1920&auto=format&fit=crop",
        alt: "Vista aérea de Antofagasta y su costa",
        title: "Antofagasta: Puerto y Ciudad",
        location: "Antofagasta, Chile"
    },
    {
        url: "https://images.unsplash.com/photo-1578321272176-b7bbc0079891?q=80&w=1920&auto=format&fit=crop",
        alt: "Infraestructura minera a gran escala",
        title: "Infraestructura Minera",
        location: "Región de Antofagasta"
    },
    {
        url: "https://images.unsplash.com/photo-1518182170546-0766ce6fec56?q=80&w=1920&auto=format&fit=crop",
        alt: "Salar de Atacama y explotación de litio",
        title: "Salares y Minería No Metálica",
        location: "Salar de Atacama"
    },
    {
        url: "https://images.unsplash.com/photo-1629814696209-4f4fac282287?q=80&w=1920&auto=format&fit=crop",
        alt: "Maquinaria pesada en faena minera",
        title: "Operaciones en Faena",
        location: "Minera Escondida"
    },
    {
        url: "https://images.unsplash.com/photo-1581094794329-cd282adaf55a?q=80&w=1920&auto=format&fit=crop",
        alt: "Ingeniería y construcción industrial",
        title: "Ingeniería de Detalle",
        location: "Zona Industrial La Negra"
    },
    {
        url: "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?q=80&w=1920&auto=format&fit=crop",
        alt: "Desierto de Atacama y energía solar",
        title: "Energía y Sustentabilidad",
        location: "Desierto de Atacama"
    },
    {
        url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1920&auto=format&fit=crop",
        alt: "Construcción en altura y estructuras metálicas",
        title: "Montaje Industrial",
        location: "Mejillones"
    },
    {
        url: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?q=80&w=1920&auto=format&fit=crop",
        alt: "Puerto industrial y logística",
        title: "Logística y Transporte",
        location: "Puerto de Antofagasta"
    },
    {
        url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1920&auto=format&fit=crop",
        alt: "Paisaje desértico y minería",
        title: "Entorno Minero",
        location: "Calama"
    }
];
