"use client";

import { Suspense, use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "@/app/globals.css";

// import interfaces
import { Session } from "@/lib/Session";
import { ViewType } from "@/lib/ViewType";
import { Summary } from "@/lib/Summary";

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
import Link from "next/link";

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
import FileContentPopup from "@/components/file-content-popup";

const test_summary: Summary = {
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
    name: "math.txt",
    content: ` Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
    Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
`,
  },
  {
    name: "more math.txt",
    content: "live laugh love math",
  },
];

const TEST_SESSIONS: Session[] = [
  {
    id: "0",
    name: "Session 1",
    date: new Date(),
    files: TEST_FILES,
    summary: test_summary,
  },
  {
    id: "1",
    name: "Session 2",
    date: new Date(),
    files: TEST_FILES,
    summary: test_summary,
  },
  {
    id: "2",
    name: "Session 3",
    date: new Date(),
    files: TEST_FILES,
    summary: test_summary,
  },
  {
    id: "3",
    name: "Session 3",
    date: new Date(),
    files: TEST_FILES,
    summary: test_summary,
  },
];

export default function TopicDetailedPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = use(params);
  const [viewType, setViewType] = useState(ViewType.Grid);

  // TODO: upload files
  // const [files, setFiles] = useState(TEST_FILES);
  const files = TEST_FILES;

  // search feature
  const defaultSessions = TEST_SESSIONS;
  const [sessionShown, setSessionShown] = useState(defaultSessions);
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

  // show file popup
  const [fileShown, setFileShown] = useState(-1);

  useEffect(() => {
    if (fileShown > -1) {
      document.body.classList.add("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [fileShown]);

  useEffect(() => {
    if (search) {
      setSessionShown(
        defaultSessions.filter((sess) =>
          sess.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    } else {
      setSessionShown(defaultSessions);
    }
  }, [search, defaultSessions]);

  const switchView = () => {
    setViewType(viewType == ViewType.Grid ? ViewType.List : ViewType.Grid);
  };

  // TODO: create new session ID
  const createNewSession = () => {
    return 0;
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
              <Link
                href={{
                  pathname: `/t/${topicId}/session`,
                  query: {
                    sessionId: createNewSession(),
                    topic: topicTitle,
                  },
                }}
                className="flex"
              >
                <div className="bg-white rounded-full p-10 w-fit justify-center items-center mx-auto inline-block">
                  <Mic color="#0F172A" size={50} strokeWidth={2} />
                </div>
              </Link>
              {/* list of files */}
              <h2>Files</h2>
              <div>
                {files.map((ele, i) => (
                  <div key={i} className="flex justify-between space-y-3">
                    <div onClick={() => setFileShown(i)}>
                      <FileItem fileName={ele.name} />
                    </div>
                    <Button variant="secondary" size="sm">
                      <Trash2 color="#FF383C" />
                    </Button>
                  </div>
                ))}
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
            <div className="my-5 relative">
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

        {/* show file popup */}
        {fileShown >= 0 && (
          <FileContentPopup
            file={files[fileShown]}
            setFileShown={setFileShown}
          />
        )}
      </div>
    </Suspense>
  );
}
