"use client";

import React from "react";
import Link from "next/link";
import { Tables } from "@/database.types";
import { usePathname } from "next/navigation";

export default function TopicItem({ topic }: { topic: Tables<"topics"> }) {
  const pathname = usePathname();
  const urlTopicId = pathname?.split("/t/")[1]?.split("/")[0];

  return (
    <Link
      href={`/t/${topic.id}`}
      className={`w-full block text-left py-2 px-3 rounded-lg ${urlTopicId === topic.id ? "bg-neutral-800" : ""} hover:bg-neutral-800 transition-colors truncate`}
    >
      {topic.topic_title}
    </Link>
  );
}
