export class CreateProjectDTO {
  title: string;
  icon: string;
  description: string;
  website?: string;
  github?: string;
  npmjs?: string;
  hero: string;
  displayOnHome: boolean;
  thumbnail: string;
  tools: string[];
}
