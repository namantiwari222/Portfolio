export interface ProjectPlanet {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  features: string[];
  category: string;
  planetColor: string;
  glowColor: string;
  hologramType: string;
  liveUrl?: string;
  githubUrl?: string;
}

export type Project = ProjectPlanet;

export interface MissionLog {
  role: string;
  organization: string;
  duration: string;
  responsibilities: string[];
  systemStatus: string;
}

export interface DsaTopic {
  name: string;
  complexity: string;
  description: string;
  keyPattern: string;
}
