export interface HeroImage {
    url: string;
    alt: string;
    title: string;
    location?: string;
}

export const heroImages: HeroImage[] = [
    {
        url: "/hero/antofagasta_coast.png",
        alt: "Vista aérea de Antofagasta y su costa",
        title: "Antofagasta: Puerto y Ciudad",
        location: "Antofagasta, Chile"
    },
    {
        url: "/hero/mining_truck.png",
        alt: "Infraestructura minera a gran escala",
        title: "Infraestructura Minera",
        location: "Región de Antofagasta"
    },
    {
        url: "/hero/lithium_salt_flat.png",
        alt: "Salar de Atacama y explotación de litio",
        title: "Salares y Minería No Metálica",
        location: "Salar de Atacama"
    },
    {
        url: "/hero/mining_truck.png",
        alt: "Maquinaria pesada en faena minera",
        title: "Operaciones en Faena",
        location: "Minera Escondida"
    },
    {
        url: "/hero/antofagasta_coast.png",
        alt: "Ingeniería y construcción industrial",
        title: "Ingeniería de Detalle",
        location: "Zona Industrial La Negra"
    },
    {
        url: "/hero/lithium_salt_flat.png",
        alt: "Desierto de Atacama y energía solar",
        title: "Energía y Sustentabilidad",
        location: "Desierto de Atacama"
    },
    {
        url: "/hero/mining_truck.png",
        alt: "Construcción en altura y estructuras metálicas",
        title: "Montaje Industrial",
        location: "Mejillones"
    },
    {
        url: "/hero/antofagasta_coast.png",
        alt: "Puerto industrial y logística",
        title: "Logística y Transporte",
        location: "Puerto de Antofagasta"
    },
    {
        url: "/hero/lithium_salt_flat.png",
        alt: "Paisaje desértico y minería",
        title: "Entorno Minero",
        location: "Calama"
    }
];
