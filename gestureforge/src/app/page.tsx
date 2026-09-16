"use client";
import React from "react";
import WebcamFeed from "./components/WebcamFeed"
import GestureManipulated from "./components/gestureManipulated";
import { useState } from "react";

export default function HomePage() {
  const [gesture, setGesture] = useState<string | null>(null);

  return (
    <main className="flex items-center justify-center h-screen">
      <GestureManipulated gesture={gesture}></GestureManipulated>
      <h1 className="text-4xl font-bold !text-green-400">
        Hello GestureForge!
      </h1>

      <WebcamFeed onGestureChange={setGesture} />
    </main>
  );
}