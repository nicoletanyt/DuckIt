import { Summary } from "./Summary";

export interface Session {
  id: string;
  name: string;
  date: Date;
  files: Array<File>;
  summary: Summary;
}
