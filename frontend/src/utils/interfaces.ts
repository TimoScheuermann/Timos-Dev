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
