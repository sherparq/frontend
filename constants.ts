import { NavItem, Project, Service } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Proyectos', path: '/projects' },
  { label: 'Servicios', path: '/services' },
  { label: 'Estudio', path: '/about' },
  { label: 'Contacto', path: '/contact' },
];

export const SERVICES: Service[] = [
  {
    id: 'permisos',
    title: 'Gestión de Permisos y Regularización',
    shortDescription: 'Navegamos la complejidad normativa para asegurar la operatividad legal de sus activos. Transformamos pasivos documentales en activos regularizados mediante estrategias de cumplimiento precisas ante DOM, Seremi de Salud y organismos sectoriales.',
    bullets: ['Diagnóstico normativo integral', 'Regularización de edificaciones industriales', 'Cambios de destino y fusiones', 'Gestión de expedientes municipales'],
    image: 'https://picsum.photos/800/600?grayscale&random=1'
  },
  {
    id: 'arquitectura-industrial',
    title: 'Arquitectura Industrial y Diseño Operacional',
    shortDescription: 'Diseño que prioriza la eficiencia del flujo productivo sin sacrificar la calidad espacial. Concebimos naves, plantas y centros de distribución donde la arquitectura sirve a la operación, optimizando procesos y seguridad.',
    bullets: ['Masterplan industrial', 'Diseño de naves logísticas', 'Layouts operacionales eficientes', 'Eficiencia energética pasiva'],
    image: 'https://picsum.photos/800/600?grayscale&random=2'
  },
  {
    id: 'habitabilidad',
    title: 'Habitabilidad y Bienestar en Faena',
    shortDescription: 'Elevamos el estándar de vida en entornos remotos. Proyectamos campamentos y casinos que mejoran la retención de talento y el bienestar psicológico del trabajador, cumpliendo con las normativas más exigentes de la minería.',
    bullets: ['Campamentos mineros modulares', 'Casinos y áreas recreativas', 'Diseño bioclimático de altura', 'Estándar hotelero industrial'],
    image: 'https://picsum.photos/800/600?grayscale&random=3'
  },
  {
    id: 'ingenieria-visual',
    title: 'Ingeniería Visual, Topografía y Tecnología 3D',
    shortDescription: 'Digitalización precisa de la realidad física. Utilizamos escáner láser y drones para levantamientos topográficos y modelado BIM, proporcionando una base de datos espacial exacta para la toma de decisiones.',
    bullets: ['Levantamiento Nube de Puntos (LiDAR)', 'Modelado BIM As-Built', 'Fotogrametría con drones', 'Gemelos digitales'],
    image: 'https://picsum.photos/800/600?grayscale&random=4'
  },
  {
    id: 'gestion-documental',
    title: 'Gestión Documental Técnica',
    shortDescription: 'Ordenamos el caos de la información técnica. Auditoría, digitalización y estructuración de archivos planos y documentos de ingeniería para un acceso ágil y seguro durante todo el ciclo de vida del activo.',
    bullets: ['Auditoría de activos fijos', 'Digitalización de planos históricos', 'Bibliotecas técnicas centralizadas', 'Control de versiones'],
    image: 'https://picsum.photos/800/600?grayscale&random=5'
  },
  {
    id: 'urbana-corporativa',
    title: 'Arquitectura Urbana y Corporativa',
    shortDescription: 'Proyectamos la imagen institucional en la ciudad. Edificios corporativos y habilitaciones de oficinas que reflejan la identidad de la marca y fomentan la colaboración en espacios de trabajo contemporáneos.',
    bullets: ['Edificios corporativos', 'Habilitación de oficinas (Fit-out)', 'Arquitectura comercial', 'Recuperación patrimonial'],
    image: 'https://picsum.photos/800/600?grayscale&random=6'
  }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Centro Logístico Norte',
    category: 'Industrial',
    metric: '42.200 m² Regularizados',
    image: 'https://picsum.photos/600/800?grayscale&random=7',
    description: 'Regularización integral y optimización de layout para centro de distribución de clase mundial.'
  },
  {
    id: 'p2',
    title: 'Campamento Minero Andes',
    category: 'Habitabilidad',
    metric: 'Centro para 200 personas',
    image: 'https://picsum.photos/600/800?grayscale&random=8',
    description: 'Diseño modular de alta montaña enfocado en eficiencia térmica y confort acústico.'
  },
  {
    id: 'p3',
    title: 'Levantamiento Puerto Seco',
    category: 'Topografía',
    metric: '400 ha Levantadas',
    image: 'https://picsum.photos/600/800?grayscale&random=9',
    description: 'Fotogrametría y topografía de precisión para expansión de infraestructura portuaria.'
  },
  {
    id: 'p4',
    title: 'Oficinas Corporativas Grupo A',
    category: 'Corporativo',
    metric: '1.500 m² Habilitados',
    image: 'https://picsum.photos/600/800?grayscale&random=10',
    description: 'Interiorismo corporativo y gestión de cambio para headquarters en Santiago.'
  },
  {
    id: 'p5',
    title: 'Planta Productiva Sur',
    category: 'Industrial',
    metric: 'Diseño Operacional',
    image: 'https://picsum.photos/600/800?grayscale&random=11',
    description: 'Arquitectura para procesos de manufactura automatizada.'
  },
  {
    id: 'p6',
    title: 'Complejo Deportivo Faena',
    category: 'Bienestar',
    metric: 'Certificación LEED',
    image: 'https://picsum.photos/600/800?grayscale&random=12',
    description: 'Infraestructura recreativa sostenible para personal en turno.'
  }
];