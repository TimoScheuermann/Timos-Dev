export class CreateNewsDTO {
  title: string;
  project: string;
  type: 'update' | 'release' | 'feature';
  timestamp: number;
  content: string;
}
