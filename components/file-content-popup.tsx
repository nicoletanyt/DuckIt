import { TextFile } from "@/lib/TextFile";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Button } from "./ui/button";

export default function FileContentPopup({
  file,
  setFileShown,
}: {
  file: TextFile;
  setFileShown: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="fixed top-[10%] left-[15%] h-[70%] w-[70%] z-50 border-white border-2 bg-black rounded p-10 space-y-10 flex flex-col">
      <div className="flex justify-between">
        <h3 className="text-3xl">{file.name}</h3>
        <Button onClick={() => setFileShown(-1)}>
          <X></X>
        </Button>
      </div>
      <div className="!overflow-y-scroll flex-1 whitespace-pre-line">
        <p className="">{file.content}</p>
      </div>
    </div>
  );
}
