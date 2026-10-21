import { DSA_CONCEPTS, PERSONAL_INFO, PROJECTS } from './portfolioData';

export interface ResumeProject {
  id: string;
  title: string;
  technologies: string[];
  bullets: string[];
  academic: boolean;
}

export interface ResumeRole {
  label: string;
  filename: string;
  projectOrder: string[];
  bulletLimits: Record<string, number>;
  projectBulletOrder: Record<string, number[]>;
  skillOrder: Record<string, string[]>;
  boldKeywords: string[];
  credentialOrder: string[];
}

const portfolioProjects: ResumeProject[] = PROJECTS.map((project) => ({
  id: `portfolio-${project.id}`,
  title: project.title,
  technologies: project.technologies,
  bullets: [project.description, ...project.features],
  academic: false,
}));

export const resumeData = {
  name: 'Naman Tiwari',
  contact: {
    phone: PERSONAL_INFO.phone,
    email: PERSONAL_INFO.email,
    linkedin: {
      handle: PERSONAL_INFO.linkedinUsername,
      url: PERSONAL_INFO.linkedin,
    },
    github: {
      handle: PERSONAL_INFO.githubUsername,
      url: PERSONAL_INFO.github,
    },
  },
  education: [
    {
      institution: 'Chhatrapati Shahu Ji Maharaj University',
      dates: 'July 2022 - Aug 2025',
      degree: 'Bachelor of Science - Physical Science (Physics, Chemistry, Maths)',
      location: 'Kanpur, Uttar Pradesh',
    },
    {
      institution: 'GL Bajaj Group of Institutions',
      dates: 'Sep 2025 - 2028',
      degree: 'Bachelor of Technology - CSE (Artificial Intelligence and Machine Learning)',
      affiliation: 'Affiliated to Dr. A. P. J. Abdul Kalam Technical University, Lucknow',
      location: 'Mathura, Uttar Pradesh',
    },
  ],
  projects: [
    ...portfolioProjects,
    {
      id: 'schooly',
      title: 'Schooly',
      technologies: ['Kotlin', 'Firebase', 'FCM Notifications'],
      bullets: [
        'Learning & Engagement Platform: Educational games, story books, videos, alphabet learning, and achievement-based certificate unlocking.',
        'Government Scheme Integration: Personalized scheme recommendations, direct benefit access, and real-time updates from government services.',
      ],
      academic: false,
    },
    {
      id: 'smartnotes',
      title: 'SmartNotes',
      technologies: ['Python', 'Groq API', 'Speech Recognition'],
      bullets: [
        'Developed an intelligent voice-to-notes assistant that captured spoken content, automatically generated structured summaries, identified key tasks, and preserved information for future retrieval through natural language queries.',
        'Enabled users to organize, search, and gain insights from past conversations, lectures, ideas, and recordings, reducing manual effort and improving knowledge retention through automated note management.',
      ],
      academic: false,
    },
    {
      id: 'scancard',
      title: 'ScanCard',
      technologies: ['Python (Flask)', 'HTML', 'CSS', 'JavaScript', 'QR Code library'],
      bullets: [
        'QR code scanning system that automates entry/exit tracking, replacing manual registers and biometric machines.',
        'Admins can generate and download attendance reports in PDF with one click.',
        'Cost-effective, secure, and can be enhanced with GPS verification.',
      ],
      academic: true,
    },
    {
      id: 'line-follower',
      title: 'Line Follower Robot',
      technologies: ['Arduino Uno', 'IR Sensor', 'L298N Motor Driver', 'BO Motors and Wheels'],
      bullets: [
        'Automated bot that tracks and follows a specific path (black line on a white floor).',
        'Uses IR sensors to detect contrast between the line and the surface.',
        'Fundamental project for learning automation, sensor calibration, and motor control logic.',
      ],
      academic: true,
    },
  ] satisfies ResumeProject[],
  skills: [
    { label: 'Languages', items: ['Core Java', 'Python'] },
    { label: 'Database', items: ['MySQL', 'SQL', 'MongoDB'] },
    { label: 'Developer Tools', items: ['GitHub', 'Git', 'Arduino IDE', 'VS Code', 'Android Studio'] },
  ],
  certifications: [
    'Innovation, Design and Entrepreneurship (IDE) BootCamp',
    'Advanced Diploma in Computer Application (ADCA)',
    'HackBaroda',
  ],
  achievements: DSA_CONCEPTS.map(({ name }) =>
    name === 'Smart India Hackathons 2026' ? 'Smart India Hackathon 2026' : name
  ),
  extracurricular: ['Writing', 'Video Editing'],
};

export const resumeRoles: ResumeRole[] = [
  {
    label: 'Software Developer',
    filename: 'Software_Developer',
    projectOrder: ['portfolio-transitops', 'portfolio-filenote'],
    bulletLimits: { 'portfolio-transitops': 3, 'portfolio-filenote': 3 },
    projectBulletOrder: { 'portfolio-transitops': [0, 1, 2], 'portfolio-filenote': [0, 1, 2] },
    skillOrder: {
      Languages: ['Core Java', 'Python'],
      Technologies: ['React', 'Node.js', 'Express', 'Flask', 'SpringBoot', 'Android', 'PDF Processing'],
      Database: ['MongoDB', 'MySQL', 'SQL'],
      'Developer Tools': ['Git', 'GitHub', 'VS Code', 'Android Studio', 'Arduino IDE'],
    },
    boldKeywords: ['Kotlin', 'Android', 'React', 'TypeScript', 'Node.js', 'Express', 'Python', 'Data Structures and Algorithms'],
    credentialOrder: ['Smart India Hackathon 2026', 'HackBaroda', 'Innovation, Design and Entrepreneurship (IDE) BootCamp', 'Advanced Diploma in Computer Application (ADCA)'],
  },
  {
    label: 'AI / ML Engineer',
    filename: 'AI_ML_Engineer',
    projectOrder: ['portfolio-swasthyasetu', 'smartnotes'],
    bulletLimits: { 'portfolio-swasthyasetu': 4, smartnotes: 2 },
    projectBulletOrder: { 'portfolio-swasthyasetu': [0, 1, 2, 3] },
    skillOrder: {
      Languages: ['Python', 'Core Java'],
      Technologies: ['AI', 'APIs', 'Maps', 'Flask', 'SpringBoot'],
      'Developer Tools': ['VS Code', 'Git', 'GitHub', 'Android Studio'],
    },
    boldKeywords: ['AI', 'Python', 'Groq API', 'Speech Recognition', 'machine learning', 'symptom evaluation', 'voice-assisted', 'natural language queries', 'structured summaries'],
    credentialOrder: ['Smart India Hackathon 2026', 'Bharatiya Antariksh Hackathon 2026', 'HackBaroda', 'Innovation, Design and Entrepreneurship (IDE) BootCamp'],
  },
  {
    label: 'Android Developer',
    filename: 'Android_Developer',
    projectOrder: ['portfolio-filenote', 'schooly'],
    bulletLimits: { 'portfolio-filenote': 4, schooly: 2 },
    projectBulletOrder: { 'portfolio-filenote': [0, 1, 2, 3], 'portfolio-swasthyasetu': [0, 1, 3] },
    skillOrder: {
      Languages: ['Core Java', 'Python'],
      Technologies: ['Android', 'Firebase', 'FCM Notifications', 'PDF Processing', 'APIs', 'Maps'],
      'Developer Tools': ['Android Studio', 'Git', 'GitHub', 'VS Code'],
    },
    boldKeywords: ['Kotlin', 'Android', 'Firebase', 'FCM Notifications', 'PDF', 'offline processing', 'voice-assisted', 'alphabet learning', 'certificate unlocking'],
    credentialOrder: ['Smart India Hackathon 2026', 'HackBaroda', 'Innovation, Design and Entrepreneurship (IDE) BootCamp', 'Robotics and Workshop'],
  },
  {
    label: 'Backend / Web Developer (Flask, Spring Boot)',
    filename: 'Backend_Web_Developer',
    projectOrder: ['portfolio-transitops', 'scancard'],
    bulletLimits: { 'portfolio-transitops': 4, scancard: 3 },
    projectBulletOrder: { 'portfolio-transitops': [0, 1, 2, 3] },
    skillOrder: {
      Languages: ['Python', 'Core Java'],
      Technologies: ['Node.js', 'Express', 'React', 'Flask', 'SpringBoot'],
      Database: ['MongoDB', 'MySQL', 'SQL'],
      'Developer Tools': ['Git', 'GitHub', 'VS Code'],
    },
    boldKeywords: ['React', 'TypeScript', 'Node.js', 'Express', 'Flask', 'QR code scanning', 'PDF', 'GPS verification', 'MongoDB', 'MySQL', 'REST backend', 'fleet route scheduling'],
    credentialOrder: ['Smart India Hackathon 2026', 'HackBaroda', 'Innovation, Design and Entrepreneurship (IDE) BootCamp', 'Cyber Security'],
  },
  {
    label: 'Robotics / Embedded',
    filename: 'Robotics_Embedded',
    projectOrder: ['line-follower', 'scancard'],
    bulletLimits: { 'line-follower': 3, scancard: 1 },
    projectBulletOrder: {},
    skillOrder: {
      Languages: ['Core Java', 'Python'],
      Technologies: ['Arduino Uno', 'IR Sensor', 'L298N Motor Driver'],
      'Developer Tools': ['Arduino IDE', 'VS Code', 'Git', 'GitHub'],
    },
    boldKeywords: ['Arduino Uno', 'IR sensors', 'IR Sensor', 'sensor calibration', 'motor control', 'L298N Motor Driver', 'BO Motors and Wheels', 'automation'],
    credentialOrder: ['Smart India Hackathon 2026', 'Robotics and Workshop', 'HackBaroda', 'Innovation, Design and Entrepreneurship (IDE) BootCamp'],
  },
];
