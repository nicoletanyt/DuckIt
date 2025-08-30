import React from "react";
import Link from "next/link";
import { Tables } from "@/database.types";
import { headers } from "next/headers";

export default async function TopicItem({
  topic,
}: {
  topic: Tables<"topics">;
}) {
  return (
    <Link
      href={`/t/${topic.id}`}
      className={`w-full block text-left py-2 px-3 rounded-lg hover:bg-neutral-900 transition-colors truncate`}
    >
      {topic.topic_title}
    </Link>
  );
}
