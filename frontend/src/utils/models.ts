export class UpdateProjectDTO {
  _id = '';
  title?: string;
  icon?: string;
  description?: string;
  website?: string;
  github?: string;
  npmjs?: string;
  hero?: string;
  displayOnHome?: boolean;
  thumbnail?: string;
  tools?: string[];
}

export class CreateProjectDTO {
  title = '';
  icon = '';
  description = '';
  website?: string;
  github?: string;
  npmjs?: string;
  hero = '';
  displayOnHome = false;
  thumbnail = '';
  tools: string[] = [];
}
