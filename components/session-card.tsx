import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FileItem from "./file-item";
import Link from "next/link";
import { Session } from "@/lib/Session";

export default function SessionCard({ session }: { session: Session }) {
  return (
    <Card className="w-full grid grid-rows-[auto_1fr]">
      <CardHeader>
        <CardTitle>{session.name}</CardTitle>
        <CardDescription>Date: {session.date.toDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* list of files */}
        {session.files.map((item, i) => (
          <FileItem key={i} fileName={item} />
        ))}
      </CardContent>
      <CardFooter className="justify-center items-end">
        <Link
          className="underline font-bold text-sm"
          href={`/summary/{sessionId}`}
        >
          View Summary
        </Link>
      </CardFooter>
    </Card>
  );
}
