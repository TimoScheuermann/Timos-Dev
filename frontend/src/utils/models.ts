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
export class CreateWordDTO {
  acronym = '';
  meaning = '';
  description = '';
}
export class UpdateWordDTO {
  _id = '';
  acronym?: string;
  meaning?: string;
  description?: string;
}

export class CreateNewsDTO {
  title = '';
  project = '';
  type: 'update' | 'release' | 'feature' = 'update';
  timestamp = 0;
  content = '';
}

export class UpdateNewsDTO {
  _id = '';
  title?: string;
  project?: string;
  type?: 'update' | 'release' | 'feature';
  timestamp?: number;
  content?: string;
  thumbnail?: string;
  featured?: string;
}
