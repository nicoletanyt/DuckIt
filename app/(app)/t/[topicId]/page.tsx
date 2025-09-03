"use client";

import { Suspense, use, useEffect, useRef, useState } from "react";
import { useSearchParams, redirect } from "next/navigation";
import "@/app/globals.css";

// import interfaces
import { Session } from "@/lib/Session";
import { ViewType } from "@/lib/ViewType";
import { Summary } from "@/lib/Summary";
import { Topic } from "@/lib/Topic";

// import components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import SessionCard from "@/components/session-card";
import FileItem from "@/components/file-item";
import SummaryDetails from "@/components/summary-detail";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Import icons
import {
  ArrowLeft,
  Import,
  LayoutGrid,
  LayoutList,
  Mic,
  MonitorSmartphone,
  Trash2,
} from "lucide-react";
import { FaGoogleDrive } from "react-icons/fa";
import { TextFile } from "@/lib/TextFile";

const TEST_SUMMARY: Summary = {
  id: "0",
  feedback:
    "(+) Lorem ipsum dolor sit amet, consectetur adipiscing elit\n(-)Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  hesitations: 6,
  fillerWords: 12,
  transcript:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ",
};

const TEST_FILES: TextFile[] = [
  {
    name: "notes.txt",
    content: "this is another file",
  },
  {
    name: "more_notes.txt",
    content: "more notes notes",
  },
];

const TEST_SESSIONS: Session[] = [
  {
    id: "0",
    name: "Session 1",
    date: new Date(),
    files: TEST_FILES,
    summary: TEST_SUMMARY,
  },
  {
    id: "1",
    name: "Session 2",
    date: new Date(),
    files: TEST_FILES,
    summary: TEST_SUMMARY,
  },
  {
    id: "2",
    name: "Session 3",
    date: new Date(),
    files: TEST_FILES,
    summary: TEST_SUMMARY,
  },
  {
    id: "3",
    name: "Session 3",
    date: new Date(),
    files: TEST_FILES,
    summary: TEST_SUMMARY,
  },
];

const TEST_TOPIC: Topic = {
  id: "0",
  name: "Topic 1",
  sessions: TEST_SESSIONS,
  files: TEST_FILES,
  customContent: "",
};

export default function TopicDetailedPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = use(params);
  // TODO: get the topic based on topicId
  const topic = TEST_TOPIC;

  const [viewType, setViewType] = useState(ViewType.Grid);

  // search feature
  const [sessionShown, setSessionShown] = useState(topic.sessions);
  const [search, setSearch] = useState("");

  const searchParams = useSearchParams();
  // see if isdetail is passed in as a query
  const details = searchParams.get("details");
  // TODO: get title
  // const topicTitle = searchParams.get("title");
  const topicTitle = "Data Science";

  // to set if the summary tab is showing the detail or list
  const [isDetail, setIsDetail] = useState(details ? Boolean(details) : false);
  const [cardClicked, setCardClicked] = useState(0);

  // pasted content
  const [customContent, setCustomContent] = useState(
    topic.customContent ? topic.customContent : "",
  );

  useEffect(() => {
    if (search) {
      setSessionShown(
        topic.sessions.filter((sess) =>
          sess.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setSessionShown(topic.sessions);
    }
  }, [search, topic.sessions]);

  useEffect(() => {
    // load the content of the custom content box if it exists
    if (topic.customContent != "") {
      setCustomContent(topic.customContent);
    }
  }, []);

  const switchView = () => {
    setViewType(viewType == ViewType.Grid ? ViewType.List : ViewType.Grid);
  };

  // TODO: create new session ID
  const createNewSession = () => {
    return 0;
  };

  const handleNavigation = async () => {
    const sessionId = createNewSession();

    // save the files
    const newFile: TextFile = {
      name: "custom_input.txt",
      content: customContent,
    };
    const files = topic.files.concat(newFile);
    let parsed: string[] = [];

    files.forEach((element) => {
      parsed.push(element.name + "\n" + element.content);
    });

    // save files to local storage so they can be retrieved in session recording
    localStorage.setItem("DuckIt_Session_Files", JSON.stringify(parsed));

    // TODO: CHANGE THE ROUTE

    // navigate
    redirect(
      `/t/${topicId}/session?sessionId=${sessionId}&topic=${encodeURIComponent(
        topicTitle,
      )}`,
    );
  };

  return (
    <Suspense>
      <div className="px-20 py-10 space-y-8">
        <h1>{topicTitle}</h1>
        <Tabs defaultValue={details ? "summary" : "session"}>
          <TabsList>
            <TabsTrigger
              value="session"
              className="dark:data-[state=active]:text-white"
            >
              New Session
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="dark:data-[state=active]:text-white"
            >
              Summary
            </TabsTrigger>
          </TabsList>
          <TabsContent value="session">
            <div className="space-y-8">
              <h1 className="text-center my-8">Start Recording</h1>
              {/* recording button */}
              <div className="flex">
                <div
                  className="bg-white rounded-full p-10 w-fit justify-center items-center mx-auto inline-block"
                  onClick={handleNavigation}
                >
                  <Mic color="#0F172A" size={50} strokeWidth={2} />
                </div>
              </div>
              {/* list of files */}
              <h2>Files</h2>
              <div>
                {topic.files.map((ele, i) => (
                  <div key={i} className="flex justify-between space-y-3">
                    <FileItem fileName={ele.name} />
                    <Button variant="secondary" size="sm">
                      <Trash2 color="#FF383C" />
                    </Button>
                  </div>
                ))}
              </div>
              {/* text input */}
              <div className="grid w-full gap-6">
                <Label htmlFor="content">Custom Content</Label>
                <Textarea
                  className=""
                  placeholder="Paste your content here."
                  rows={10}
                  id="content"
                  value={customContent}
                  onChange={(e) => setCustomContent(e.target.value)}
                />
              </div>
              {/* import button */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className={buttonVariants({ variant: "default" })}>
                    <Import />
                    Import
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <FaGoogleDrive />
                    Google Drive
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MonitorSmartphone />
                    My Device
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TabsContent>
          <TabsContent value="summary">
            <div className="my-5">
              {/* top bar */}
              {isDetail ? (
                // return button
                <Button onClick={() => setIsDetail(false)}>
                  <ArrowLeft />
                  Back
                </Button>
              ) : (
                <div className="flex justify-between">
                  <Button
                    className="px-0"
                    variant={"ghost"}
                    onClick={switchView}
                  >
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
                  <SearchBar search={search} setSearch={setSearch} />
                </div>
              )}
              {isDetail ? (
                <SummaryDetails session={sessionShown[cardClicked]} />
              ) : (
                // display sessions list
                <div
                  className={`py-5 grid ${viewType == ViewType.Grid ? "grid-cols-3 gap-10" : "grid-cols-1 gap-8"}`}
                >
                  {sessionShown.map((item, i) => (
                    <span key={i} onClick={() => setCardClicked(i)}>
                      <SessionCard session={item} setIsDetail={setIsDetail} />
                    </span>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Suspense>
  );
}
