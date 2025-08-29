"use client";

import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from "@/components/ui/button";

export default function Record() {

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), [])

  const { transcript, listening, browserSupportsSpeechRecognition, isMicrophoneAvailable, browserSupportsContinuousListening } = useSpeechRecognition();

  if (!mounted) {
    return null;
  }

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

  const startRecording = async () => {
    console.log("recording started");
    if (browserSupportsSpeechRecognition) {
      await SpeechRecognition.startListening({ continuous: true })
    } else {
      await SpeechRecognition.startListening()
    }
  }

  const stopRecording = async () => {
    console.log("recording ended");
    await SpeechRecognition.stopListening()
  }

  return (
    <>
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Button onClick={listening ? stopRecording : startRecording}>{listening ? "stop" : "start"}</Button>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {transcript}
      </div>
    </>
  );
}
