"use client";

import { useEffect, useState, useRef, Suspense, use } from "react";
import { useSearchParams, redirect } from "next/navigation";
import Image from "next/image";

// import icons
import { StopCircle } from "lucide-react";

// import components
import { Button } from "@/components/ui/button";
import { AnimationTypes, ANIMATION_FRAMES } from "@/lib/Animation";
import { buttonVariants } from "@/components/ui/button";
import FeedbackItem from "@/components/feedback-item";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// for audio
import { Howl } from "howler";

export default function SessionPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = use(params);

  // for speech recog
  const {
    transcript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
    browserSupportsContinuousListening
  } = useSpeechRecognition();

  // for animation
  const [frame, setFrame] = useState(0);
  const ANIMATION_SPEED = 100;
  const currAnim = AnimationTypes.WalkNormal;

  // used for the talking border circle
  const [isTalking, setIsTalking] = useState(false);

  // get data
  const searchParams = useSearchParams();
  const topicTitle = searchParams.get("topic");

  // handle the time
  const [time, setTime] = useState(3);

  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/sound/quack.mp3"],
      preload: true, // important
    });
  }, []);

  // handle audio
  const handlePlay = () => {
    soundRef.current?.play();
  };

  // set to not talking if user stops talking after 1.5sec
  useEffect(() => {
    if (transcript && transcript.trim().length > 0) {
      setIsTalking(true);
      // const timeout = setTimeout(() => {setIsTalking(false)
      // , 1500);
      const timeout = setTimeout(() => {
        setIsTalking(false);
        handlePlay();
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [transcript]);

  // animation
  useEffect(() => {
    const interval = setInterval(() => {
      // stop animation if is hesitating
      if (isTalking) {
        setFrame((f) => (f + 1) % ANIMATION_FRAMES[currAnim].length);
      } else {
        // set it to the frame where the duck is in a non-moving looking position
        setFrame(3);
      }
    }, ANIMATION_SPEED);

    return () => clearInterval(interval);
  }, [isTalking, currAnim]);

  useEffect(() => {
    // start timer
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // for recording

  const stopRecording = async () => {
    console.log("recording ended");
    await SpeechRecognition.stopListening()
          // href={`/t/${topicId}?detail=true`}
    redirect(`/t/${topicId}?detail=true`) 
  }

  useEffect(() => {
    const startRecording = async () => {
      console.log("recording started");
      if (browserSupportsContinuousListening) {
        await SpeechRecognition.startListening({ continuous: true });
      } else {
        await SpeechRecognition.startListening();
      }
    };
    startRecording();
  }, [browserSupportsContinuousListening]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <span>browser does not support speech recognition</span>
    );
  }

  if (!isMicrophoneAvailable) {
    return (
      <span>microphone is not available</span>
    );
  }
  return (
    <Suspense>
      <div className="px-20 py-10 space-y-10">
        <h1 className="text-3xl font-bold">{topicTitle}</h1>
        <div className="flex gap-10 py-10">
          {/* duck animation */}
          <div
            className={`w-70 h-70 rounded-full bg-white border-4 ${isTalking ? "border-green-600" : "border-transparent"}`}
          >
            <Image
              src={ANIMATION_FRAMES[currAnim][frame]}
              width={240}
              height={240}
              className="w-60 h-60 [image-rendering:pixelated]"
              alt={"Duck Animation"}
            />
          </div>
          <div>
            <p className="text-xl font-bold">
              Elapsed: {Math.round(time / 60)}:{time % 60 < 10 ? 0 : ""}
              {time % 60}
            </p>
            <ul className="space-y-5 py-5">
              <FeedbackItem
                correct={true}
                content="Lorem ipsum dolor sit amet"
              />
              <FeedbackItem
                correct={true}
                content="Lorem ipsum dolor sit amet"
              />
              <FeedbackItem
                correct={false}
                content="Lorem ipsum dolor sit amet"
              />
            </ul>
          </div>
        </div>
        {/* TODO */}
        <p className="italic">
          {transcript}
        </p>
        {/* redirect to summary page */}
        {/* TODO: topicId */}
        <Button
          // href={`/t/${topicId}?detail=true`}
          onClick={stopRecording}
          className={`w-full py-6 [&>svg]:!w-5 [&>svg]:!h-5 text-lg ${buttonVariants({ variant: "destructive" })}`}
        >
          <StopCircle />
          Stop
        </Button>
      </div>
    </Suspense>
  );
}
