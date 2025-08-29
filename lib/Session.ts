export interface Session {
  id: string;
  name: string;
  date: Date;
  files: Array<string>;
  summary: string;
}
