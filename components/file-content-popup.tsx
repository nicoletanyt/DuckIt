import { TextFile } from "@/lib/TextFile";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";

export default function FileContentPopup({
  file,
  setFileShown,
}: {
  file: TextFile;
  setFileShown: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
      <div className="fixed top-[8%] left-[15%] h-[75%] w-[70%] z-50 rounded-sm bg-input py-16 px-24 space-y-14 flex flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-4xl font-semibold">{file.name}</h3>
          </div>
          <Button onClick={() => setFileShown(-1)}>
            <X></X>
          </Button>
        </div>
        <div className="!overflow-y-scroll flex-1 whitespace-pre-line no-scrollbar">
          <p className="leading-loose">{file.content}</p>
        </div>
      </div>
    </>
  );
}
