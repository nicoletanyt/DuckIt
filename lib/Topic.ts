import { Session } from "./Session";
import { TextFile } from "./TextFile";

export interface Topic {
  id: string;
  name: string;
  sessions: Array<Session>;
  files: Array<TextFile>;
  customContent: string;
}
