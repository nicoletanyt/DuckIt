"use client";

import { use, useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FileItem from "@/components/file-item";
import FeedbackItem from "@/components/feedback-item";
import {
  Import,
  Mic,
  MonitorSmartphone,
  Trash2,
  StopCircle,
} from "lucide-react";
import { FaGoogleDrive } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Howl } from "howler";
import { AnimationTypes, ANIMATION_FRAMES } from "@/lib/Animation";

const TEST_FILES = ["notes.txt", "math.txt", "notes++.txt"];
const ANIMATION_SPEED = 100;
const TALKING_TIMEOUT = 1500;

interface RecordingState {
  isRecording: boolean;
  time: number;
  isTalking: boolean;
  frame: number;
}

export default function TopicDetailedPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = use(params);
  const router = useRouter();
  const files = TEST_FILES;

  // Speech recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Recording state
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    time: 0,
    isTalking: true,
    frame: 3, // Default non-moving frame
  });

  // Refs
  const soundRef = useRef<Howl | null>(null);
  const talkingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialise audio
  useEffect(() => {
    soundRef.current = new Howl({
      src: ["/sound/quack.mp3"],
      preload: true,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  // Handle talking detection
  useEffect(() => {
    if (!recordingState.isRecording) return;
    console.log("Transcript:", transcript, "Listening:", listening);

    if (transcript && transcript.trim().length > 0) {
      setRecordingState((prev) => ({ ...prev, isTalking: true }));

      // Clear existing timeout
      if (talkingTimeoutRef.current) {
        clearTimeout(talkingTimeoutRef.current);
      }

      // Set new timeout
      talkingTimeoutRef.current = setTimeout(() => {
        setRecordingState((prev) => ({ ...prev, isTalking: false }));
        soundRef.current?.play();
      }, TALKING_TIMEOUT);
    }

    return () => {
      if (talkingTimeoutRef.current) {
        clearTimeout(talkingTimeoutRef.current);
      }
    };
  }, [transcript, recordingState.isRecording]);

  // Handle animation
  useEffect(() => {
    if (!recordingState.isRecording) return;

    animationIntervalRef.current = setInterval(() => {
      setRecordingState((prev) => ({
        ...prev,
        frame: prev.isTalking
          ? (prev.frame + 1) %
            ANIMATION_FRAMES[AnimationTypes.WalkNormal].length
          : 3, // Non-moving frame
      }));
    }, ANIMATION_SPEED);

    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, [recordingState.isRecording, recordingState.isTalking]);

  // Handle timer
  useEffect(() => {
    if (!recordingState.isRecording) return;

    timerIntervalRef.current = setInterval(() => {
      setRecordingState((prev) => ({ ...prev, time: prev.time + 1 }));
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [recordingState.isRecording]);

  // Start recording - simplified approach
  const startRecording = useCallback(() => {
    console.log("Starting recording...");

    if (!browserSupportsSpeechRecognition) {
      alert("Browser doesn't support speech recognition.");
      return;
    }

    // Reset transcript and start fresh
    resetTranscript();

    setRecordingState((prev) => ({
      ...prev,
      isRecording: true,
      time: 0,
      frame: 3,
      isTalking: false,
    }));

    // Start listening with continuous mode
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });

    console.log("Speech recognition started");
  }, [browserSupportsSpeechRecognition, resetTranscript]);

  // Stop recording
  const stopRecording = useCallback(() => {
    console.log("Stopping recording...");

    SpeechRecognition.stopListening();
    setRecordingState((prev) => ({ ...prev, isRecording: false }));

    // Clean up timeouts
    if (talkingTimeoutRef.current) {
      clearTimeout(talkingTimeoutRef.current);
    }

    console.log("Final transcript:", transcript);

    // Redirect to sessions page
    router.push(`/t/${topicId}/sessions`);
  }, [router, topicId, transcript]);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }, []);

  // Show error if browser doesn't support speech recognition
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-center text-red-600">
        <h2>Browser Not Supported</h2>
        <p>
          Browser doesn&apos;t support speech recognition. Please use Chrome,
          Edge, or Safari.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {recordingState.isRecording ? (
        // Recording View
        <>
          <div className="flex gap-10 py-10">
            {/* Duck Animation */}
            <div
              className={`w-70 h-70 rounded-full bg-white border-4 transition-colors duration-200 ${
                recordingState.isTalking
                  ? "border-green-600"
                  : listening
                    ? "border-blue-500"
                    : "border-red-500"
              }`}
            >
              <Image
                src={
                  ANIMATION_FRAMES[AnimationTypes.WalkNormal][
                    recordingState.frame
                  ]
                }
                width={240}
                height={240}
                className="w-60 h-60 [image-rendering:pixelated]"
                alt="Duck Animation"
                priority
              />
            </div>

            {/* Recording Info */}
            <div className="flex-1">
              <p className="text-xl font-bold mb-4">
                Elapsed: {formatTime(recordingState.time)}
              </p>
              <p className="text-sm mb-4 text-gray-600">
                Microphone: {listening ? "🎤 ON" : "❌ OFF"}
              </p>
              <ul className="space-y-5">
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
          {/* Colours */}
          {/* Transcript */}
          <div className="bg-gray-50 p-4 rounded-lg min-h-[120px]">
            <h3 className="font-medium mb-2">Transcript:</h3>
            <p className="italic text-gray-700">
              {transcript || "Start speaking to see your transcript here..."}
            </p>
          </div>

          {/* Debug Info */}
          <div className="text-sm text-gray-500">
            <p>Listening: {listening ? "Yes" : "No"}</p>
            <p>Transcript length: {transcript.length} characters</p>
          </div>

          {/* Stop Button */}
          <Button
            onClick={stopRecording}
            className="w-full py-6 text-lg"
            variant="destructive"
          >
            <StopCircle className="w-5 h-5 mr-2" />
            Stop Recording
          </Button>
        </>
      ) : (
        // Default View
        <>
          <h1 className="text-center my-8">Start Recording</h1>

          {/* Recording Button */}
          <div className="flex justify-center">
            <button
              onClick={startRecording}
              className="bg-white rounded-full p-10 hover:bg-gray-50 transition-colors shadow-lg"
              aria-label="Start Recording"
            >
              <Mic color="#0F172A" size={50} strokeWidth={2} />
            </button>
          </div>

          {/* Files Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Files</h2>
            <div className="space-y-3">
              {files.map((fileName, index) => (
                <div key={index} className="flex justify-between items-center">
                  <FileItem fileName={fileName} />
                  <Button variant="secondary" size="sm">
                    <Trash2 className="w-4 h-4" color="#FF383C" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Import Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Import className="w-4 h-4 mr-2" />
                Import
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <FaGoogleDrive className="w-4 h-4 mr-2" />
                Google Drive
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MonitorSmartphone className="w-4 h-4 mr-2" />
                My Device
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}
