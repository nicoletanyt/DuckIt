"use client";
import { Session } from "@/lib/Session";
import { useState } from "react";
import { ViewType } from "@/lib/ViewType";

// import components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search-bar";

// Import icons
import { Import, LayoutGrid, LayoutList, Mic, Trash2 } from "lucide-react";
import SessionCard from "@/components/session-card";
import FileItem from "@/components/file-item";

const test_sessions: Session[] = [
  {
    id: "0",
    name: "Session 1",
    date: new Date(),
    files: ["notes.txt", "math.txt", "more notes.txt"],
    summary: "this is the summary for this \n more summary",
  },
  {
    id: "1",
    name: "Session 2",
    date: new Date(),
    files: ["math.txt", "more notes.txt"],
    summary: "this is the summary for this \n more summary",
  },
  {
    id: "2",
    name: "Session 3",
    date: new Date(),
    files: ["notes.txt", "math.txt", "notes++.txt"],
    summary: "this is the summary for this \n more summary",
  },
  {
    id: "3",
    name: "Session 3",
    date: new Date(),
    files: ["notes.txt", "math.txt", "notes++.txt"],
    summary: "this is the summary for this \n more summary",
  },
];

const test_files = ["notes.txt", "math.txt", "notes++.txt"];

export default function page({ params }: { params: { topicId: string } }) {
  const [viewType, setViewType] = useState(ViewType.List);
  // TODO: get the files from the database
  const [files, setFiles] = useState(test_files);

  const switchView = () => {
    setViewType(viewType == ViewType.Grid ? ViewType.List : ViewType.Grid);
  };

  return (
    <div className="px-20 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Topic Title</h1>
      <Tabs defaultValue="session">
        <TabsList>
          <TabsTrigger value="session">New Session</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="session">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-center">Start Recording</h1>
            {/* recording button */}
            <div className="bg-white rounded-full p-10 w-fit justify-center items-center mx-auto">
              <Mic color="#0F172A" size={50} strokeWidth={2} />
            </div>
            {/* list of files */}
            <h2 className="text-2xl font-semibold">Files</h2>
            <div>
              {files.map((ele, i) => (
                <div key={i} className="flex justify-between space-y-3">
                  <FileItem fileName={ele} />
                  <Button variant="secondary" size="sm">
                    <Trash2 color="#FF383C" />
                  </Button>
                </div>
              ))}
            </div>
            {/* import button */}
            <Button className="text-white" variant={"outline"} size={"lg"}>
              <Import />
              Import
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="summary">
          <div className="my-5">
            {/* top bar */}
            <div className="flex justify-between">
              <Button className="px-0 text-white" onClick={switchView}>
                {viewType == ViewType.Grid ? (
                  <>
                    <LayoutList />
                    <p>List View</p>
                  </>
                ) : (
                  <>
                    <LayoutGrid />
                    <p>Grid View</p>
                  </>
                )}
              </Button>
              <SearchBar />
            </div>
            {/* list of sessions */}
            <div
              className={`py-5 grid ${viewType == ViewType.Grid ? "grid-cols-3 gap-10" : "grid-cols-1 gap-8"}`}
            >
              {test_sessions.map((item, i) => (
                <SessionCard session={item} key={i} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
