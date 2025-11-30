export interface HeroImage {
    url: string;
    alt: string;
    title: string;
    location?: string;
}

export const heroImages: HeroImage[] = [
    {

        url: `${import.meta.env.BASE_URL}hero/mina.jpeg`,
        alt: "Vista aérea de mina a rajo abier",
        title: "Mina de cobre",
        location: "Antofagasta, Chile"
    },
    {

        url: `${import.meta.env.BASE_URL}hero/planta.png`,
        alt: "Infraestructura minera a gran escala",
        title: "Infraestructura Minera",
        location: "Región de Antofagasta"
    },
    {

        url: `${import.meta.env.BASE_URL}hero/lithium_salt_flat.png`,
        alt: "Salar de Atacama y explotación de litio",
        title: "Salares y Minería No Metálica",
        location: "Salar de Atacama"
    },
    {

        url: `${import.meta.env.BASE_URL}hero/mining_truck.png`,
        alt: "Maquinaria pesada en faena minera",
        title: "Operaciones en Faena",
        location: "Minera Escondida"
    },
    {

        url: `${import.meta.env.BASE_URL}hero/estructura.jpeg`,
        alt: "Ingeniería y construcción industrial",
        title: "Ingeniería de Detalle",
        location: "Zona Industrial La Negra"
    },
    {

        url: `${import.meta.env.BASE_URL}hero/puerto.jpeg`,
        alt: "Puerto industrial y logística",
        title: "Logística y Transporte",
        location: "Puerto de Antofagasta"
    },
    {

        url: `${import.meta.env.BASE_URL}hero/correa.png`,
        alt: "Paisaje desértico y minería",
        title: "Entorno Minero",
        location: "Calama"
    }
];
