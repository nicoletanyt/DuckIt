import { Session } from "./Session";

export interface Topic {
  id: string;
  name: string;
  sessions: Array<Session>;
  files: Array<File>;
  customContent: string;
}
