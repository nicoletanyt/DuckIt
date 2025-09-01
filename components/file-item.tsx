import { FileText } from "lucide-react";

export default function FileItem({ fileName }: { fileName: string }) {
  return (
    <div className="flex gap-2">
      <FileText />
      {fileName}
    </div>
  );
}
