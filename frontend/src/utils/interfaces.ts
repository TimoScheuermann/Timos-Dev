export interface IUser {
  _id: string;
  thirdPartyId: string;
  group: string;
  provider: string;
  username: string;
  avatar: string;
  firstLogin: number;
  lastLogin: number;
}

export interface IProject {
  _id: string;
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
export interface IWord {
  _id: string;
  acronym: string;
  meaning: string;
  description: string;
}

export interface INewsExtended {
  _id: string;
  title: string;
  project: IProject;
  type: 'update' | 'release' | 'feature';
  timestamp: number;
  content: string;
  thumbnail: string;
  featured?: string;
}

export interface IDriveItem {
  _id: string;
  filename: string;
  originalname: string;
  created: number;
}
