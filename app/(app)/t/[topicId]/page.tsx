"use client";

import { Suspense, use, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import FileItem from "@/components/file-item";
import Link from "next/link";
import { Import, Mic, MonitorSmartphone, Trash2 } from "lucide-react";
import { FaGoogleDrive } from "react-icons/fa";

const TEST_FILES = ["notes.txt", "math.txt", "notes++.txt"];

export default function TopicDetailedPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = use(params);
  const files = TEST_FILES;

  // TODO: create new session ID
  const createNewSession = () => {
    return 0;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-center my-8">Start Recording</h1>
      {/* recording button */}
      <Link
        href={{
          pathname: `/t/${topicId}/session`,
          query: {
            sessionId: createNewSession(),
            topic: "Data Science", // TODO: get from props or context
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
            <FileItem fileName={ele} />
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
  );
}
