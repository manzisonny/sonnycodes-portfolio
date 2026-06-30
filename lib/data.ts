export const personalInfo = {
  name: "Munyurangabo Manzi Sonny",
  nickname: "Sonny Codes",
  title: "Full Stack Software Engineer",
  subtitle: "Builder of Ideas · Rwanda 🇷🇼",
  email: "manzisonny81@gmail.com",
  phone: "+250 788 000 000",
  location: "Kigali, Rwanda",
  university: "Adventist University of Central Africa",
  company: "Full Stack Software Ltd",
  bio: "I design and deliver secure, scalable, high-performance applications. Specialized in clean architecture, database design, modern web technologies, and continuous growth. Based in Kigali, I build systems that solve real problems — from attendance tracking to e-commerce platforms.",
  social: {
    github: "https://github.com/manzisonny",
    linkedin: "https://www.linkedin.com/in/manzi-sonny-034566408/",
    twitter: "https://twitter.com/sonny_manzi73001",
    whatsapp: "https://wa.me/250791385768",
    email: "mailto:manzisonny81@gmail.com",
  },
  stats: {
    yearsExperience: "3+",
    projectsBuilt: "15+",
    techStack: "10+",
    githubRepos: "16",
  },
  verse: {
    text: "Commit to the Lord whatever you do, and he will establish your plans.",
    reference: "Proverbs 16:3",
  },
};

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  github: string;
  live?: string;
  image?: string;
  featured: boolean;
  category: "personal" | "company" | "client";
  language: string;
}

export const projects: Project[] = [
  {
    id: "attend-tracker",
    title: "Attend-Tracker",
    description:
      "Full-stack attendance tracking SaaS with real-time GPS, WiFi-based auto clock-in/out, mobile companion app, and comprehensive admin dashboard.",
    longDescription:
      "A real-time employee attendance and monitoring system that automatically tracks workers based on their connection to office WiFi networks. Uses MAC address tracking to determine when employees start and stop working — no manual login/logout required.",
    tech: ["Laravel", "Flutter", "PostgreSQL", "REST API", "GPS", "WiFi Tracking"],
    github: "https://github.com/manzisonny/Internet-Tracker-Saas-app",
    featured: true,
    category: "company",
    language: "PHP / Dart",
  },
  {
    id: "alain-eshopping",
    title: "Alain E-Shopping",
    description:
      "Full-featured e-commerce platform with Alain's Collection Store — live in production worldwide with product management, cart, and secure checkout.",
    tech: ["PHP", "Laravel", "MySQL", "Blade", "CSS"],
    github: "https://github.com/manzisonny/Alain-E.shopping",
    live: "https://alain-eshopping.vercel.app",
    featured: true,
    category: "client",
    language: "PHP",
  },
  {
    id: "luxine",
    title: "Luxine World",
    description:
      "Modern TypeScript web application built with cutting-edge technologies for a premium digital experience.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Vercel"],
    github: "https://github.com/manzisonny/luxine",
    live: "https://luxine-tau.vercel.app",
    featured: true,
    category: "personal",
    language: "TypeScript",
  },
  {
    id: "patient-management",
    title: "Patient Management System",
    description:
      "Hospital management system designed to streamline patient registration, manage appointments, and reduce human errors in healthcare administration.",
    tech: ["React", "Node.js", "MySQL", "Express", "REST API"],
    github: "https://github.com/manzisonny/Mysql-Node-React-Patient-Management-System",
    featured: true,
    category: "personal",
    language: "JavaScript",
  },
  {
    id: "car-park-management",
    title: "Car Park Management System",
    description:
      "Parking area management solution for automobile services — handles employee management, salary tracking, stock, and time-based parking payments.",
    tech: ["JavaScript", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/manzisonny/Car-Park-Management-System",
    featured: true,
    category: "personal",
    language: "JavaScript",
  },
  {
    id: "tectona-furniture",
    title: "Tectona Furniture",
    description:
      "Laravel-based furniture business platform with product catalog, inventory management, and order tracking for a furniture company.",
    tech: ["Laravel", "Blade", "MySQL", "PHP", "Tailwind"],
    github: "https://github.com/manzisonny/tectona-furniture",
    featured: true,
    category: "client",
    language: "PHP",
  },
  {
    id: "job-application",
    title: "Job Application Portal",
    description:
      "TypeScript-powered job application management platform for streamlined hiring workflows.",
    tech: ["TypeScript", "React", "Node.js"],
    github: "https://github.com/manzisonny/Job-application",
    featured: false,
    category: "personal",
    language: "TypeScript",
  },
  {
    id: "school-website",
    title: "School Management Website",
    description:
      "Comprehensive school website with CRUD operations for student management, registration, and administrative tasks.",
    tech: ["JavaScript", "Node.js", "Express"],
    github: "https://github.com/manzisonny/School-Website",
    featured: false,
    category: "personal",
    language: "JavaScript",
  },
];

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 78 },
      { name: "HTML / CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Laravel / PHP", level: 92 },
      { name: "Node.js / Express", level: 85 },
      { name: "REST API Design", level: 90 },
      { name: "Python", level: 70 },
    ],
  },
  {
    title: "Database",
    icon: "🗄️",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MySQL", level: 90 },
      { name: "Supabase", level: 82 },
      { name: "MongoDB", level: 75 },
    ],
  },
  {
    title: "Mobile & DevOps",
    icon: "📱",
    skills: [
      { name: "Flutter / Dart", level: 80 },
      { name: "Git / GitHub", level: 92 },
      { name: "Vercel / Deploy", level: 88 },
      { name: "Linux / Server", level: 78 },
    ],
  },
];

export const currentlyLearning = [
  "AI / Machine Learning",
  "Docker & Kubernetes",
  "AWS Cloud Services",
  "System Design",
];
