import { ProjectPlanet, MissionLog, DsaTopic } from '../types';

export const PERSONAL_INFO = {
  email: "naman701758@gmail.com",
  phone: "+91 7017581225",
  github: "https://github.com/namantiwari222",
  githubUsername: "namantiwari222",
  linkedin: "https://www.linkedin.com/in/namantiwari222/",
  linkedinUsername: "namantiwari222",
  modelImage: "/assets/naman_portfolio_hero.jpg",
  portfolioHeroImage: "/assets/naman_portfolio_hero.jpg",
  realFaceImage: "https://i.postimg.cc/4dZqWy8g/naman1.jpg",
  backSilhouetteImage: "/assets/naman_silhouette_cutout.png",
};

export const PROJECTS: ProjectPlanet[] = [
  {
    id: "filenote",
    title: "FILE NOTE",
    tagline: "Advanced Document Viewer, Editor & Conversion Application",
    description: "A comprehensive mobile document utility designed to inspect, edit, transform, and convert multi-format documents with high fidelity and offline processing.",
    technologies: ["Kotlin", "Android", "PDF Processing"],
    features: [
      "Native Android rendering with efficient memory utilization",
      "Robust PDF generation, text extraction, and page manipulation",
      "Multi-document conversion pipeline with local storage safety",
      "Intuitive touch-optimized document reader interface"
    ],
    category: "Mobile Application",
    planetColor: "from-sky-500 via-indigo-600 to-slate-950",
    glowColor: "rgba(56, 189, 248, 0.4)",
    hologramType: "Document Processing Node"
  },
  {
    id: "swasthyasetu",
    title: "SWASTHYASETU AI",
    tagline: "Healthcare Accessibility Platform for Rural & Underserved Communities",
    description: "An AI-powered telemedicine and triage companion engineered to bridge the healthcare divide in remote geographies through intelligent symptom mapping and clinical resource routing.",
    technologies: ["AI", "Android", "APIs", "Maps"],
    features: [
      "Smart symptom evaluation powered by machine learning heuristics",
      "Geographic facility discovery and regional health center mapping",
      "Low-bandwidth optimized API communications for rural connectivity",
      "Accessible multilingual visual cues and voice-assisted workflow"
    ],
    category: "AI & Healthcare",
    planetColor: "from-teal-400 via-cyan-600 to-slate-950",
    glowColor: "rgba(45, 212, 191, 0.45)",
    hologramType: "Telehealth Geo-Intelligence Grid"
  },
  {
    id: "transitops",
    title: "TRANSITOPS",
    tagline: "Transportation & Operations Management Dashboard",
    description: "A centralized operational hub providing real-time telemetry, fleet tracking, maintenance scheduling, and resource analytics for transit operators.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    features: [
      "Interactive operations overview with responsive status metrics",
      "Fleet route scheduling and dispatch management modules",
      "Modular REST backend servicing high-concurrency event telemetry",
      "Dark-mode control room visual hierarchy with instant filtering"
    ],
    category: "Full-Stack Dashboard",
    planetColor: "from-amber-400 via-orange-600 to-slate-950",
    glowColor: "rgba(245, 197, 66, 0.4)",
    hologramType: "Transit Operations Telemetry Core"
  }
];

export const MISSION_EXPERIENCE: MissionLog = {
  role: "Teacher & Computer Operator",
  organization: "D.N.D. Educational Academy",
  duration: "July 2024 – August 2025",
  responsibilities: [
    "Computer Science and Mathematics teaching",
    "Student records management and verification",
    "Institutional data entry and database maintenance",
    "Computer-related operations, software setup, and technical assistance"
  ],
  systemStatus: "Mission Completed with Distinction"
};

export const DSA_CONCEPTS: DsaTopic[] = [
  {
    name: "Smart India Hackathons 2026",
    complexity: "National Innovation Challenge",
    description: "A flagship innovation platform that pushed me to build impactful, scalable problem-solving ideas under real-world constraints.",
    keyPattern: "Prototype Design, Team Collaboration, Rapid Iteration"
  },
  {
    name: "Bharatiya Antariksh Hackathon 2026",
    complexity: "Space Innovation Challenge",
    description: "A technology-driven space innovation challenge focused on building creative, efficient, and practical solutions for future-ready missions.",
    keyPattern: "Research Thinking, Innovation, Space-Tech Problem Solving"
  },
  {
    name: "HackBaroda",
    complexity: "Innovation Showcase",
    description: "A platform that encouraged creative product thinking, collaborative problem solving, and practical implementation under competitive conditions.",
    keyPattern: "Ideation, Execution, Team Collaboration"
  },
  {
    name: "Robotics and Workshop",
    complexity: "Line Follower Robot",
    description: "Hands-on learning in intelligent systems, movement control, and real-world automation through practical experimentation.",
    keyPattern: "Sensors, Motion Control, System Integration"
  },
  {
    name: "IDE Bootcamp",
    complexity: "Innovation, Design and Entrepreneurship",
    description: "A bootcamp focused on developing entrepreneurial ideas through user-centered design, innovation, and practical execution.",
    keyPattern: "Ideation, Design Thinking, Entrepreneurship"
  },
  {
    name: "ADCA",
    complexity: "Advanced Diploma in Computer Application",
    description: "Advanced training in computer applications, software tools, and practical digital skills.",
    keyPattern: "Computer Applications, Productivity Tools, Digital Skills"
  },
  {
    name: "Cyber Security",
    complexity: "Security Awareness",
    description: "Learning core cybersecurity principles and practices for safer use of digital systems.",
    keyPattern: "Threat Awareness, Safe Computing, Data Protection"
  },
  {
    name: "Volunteering",
    complexity: "Community Engagement",
    description: "Contributing time and effort to support community initiatives and collaborative events.",
    keyPattern: "Service, Teamwork, Community Support"
  }
];
