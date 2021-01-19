export interface IProject {
  _id?: string;
  title: string;
  icon: string;
  description: string;
  website?: string;
  github?: string;
  npmjs?: string;
  hero: string;
  thumbnail: string;
  tools: string[];
}
