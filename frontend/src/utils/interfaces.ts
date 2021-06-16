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
  description: string;
  icon: string;

  hero: string;
  thumbnail: string;

  displayOnHome: boolean;

  website?: string;
  github?: string;
  npmjs?: string;

  designTools: string[];
  frameworks: string[];
  development: string[];

  sections?: IProjectSection[];
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

export interface IAWSFile {
  _id: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  ACL: string;
  ETag: string;
  Location: string;
  Key: string;
  Bucket: string;
  width: number;
  height: number;
  premultiplied: boolean;
  size: number | string;
  ContentType: string;
}

export interface IProjectSection {
  title: string;
  subtitle: string;
  items: IProjectSectionItem[];
}

export interface IProjectSectionItem {
  background: string;
  asset: string;
  title: string;
  description: string;
  size: 'large' | 'normal';
}

export interface VMComponent {
  id: string;
  name: string;
  image?: string;
  children: string[];
  isChild?: boolean;
  props: VMProp[];
}

export interface VMProp {
  name: string;
  value: string;
  description: string;
  type: string;
}
