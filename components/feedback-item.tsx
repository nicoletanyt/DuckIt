import { CheckCircle, XCircle } from "lucide-react";

export default function FeedbackItem({
  correct,
  content,
}: {
  correct: boolean;
  content: string;
}) {
  return (
    <li className="flex gap-3">
      {correct ? <CheckCircle color="#00AC47" /> : <XCircle color="#FF383C" />}
      <p>{content}</p>
    </li>
  );
}
