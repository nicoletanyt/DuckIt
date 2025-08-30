import { CheckCircle, StopCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <div className="px-20 py-10 space-y-10">
      <h1 className="text-3xl font-bold">Topic Title</h1>
      <div className="flex gap-10">
        {/* duck avatar */}
        <div className="w-60 h-60 rounded-full bg-white"></div>
        <div>
          <p className="text-xl font-bold">Elapsed: 1:03</p>
          <ul className="space-y-5 py-5">
            <li className="flex gap-3">
              <CheckCircle color="#00AC47" />
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex gap-3">
              <CheckCircle color="#00AC47" />
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li className="flex gap-3">
              <XCircle color="#FF383C" />
              <p>Lorem ipsum dolor sit amet</p>
            </li>
          </ul>
        </div>
      </div>
      <p className="italic">
        “(Live captions) Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.”
      </p>
      <Button
        className="w-full py-6 [&>svg]:!w-5 [&>svg]:!h-5 text-lg"
        variant={"destructive"}
      >
        <StopCircle />
        Stop
      </Button>
    </div>
  );
}
