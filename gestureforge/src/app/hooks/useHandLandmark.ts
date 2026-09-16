"use client";
import {
    FilesetResolver,
    HandLandmarker,
} from "@mediapipe/tasks-vision";
import { Deque } from '@datastructures-js/deque';
import { useRef, useState } from "react";
import type { RefObject } from "react";

export default function useHandLandMark(videoRef: RefObject<HTMLVideoElement | null>) {
    const dequeRef = useRef(new Deque<number[][]>());
    const handLandmarkerRef = useRef<HandLandmarker | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const [gesture, setGesture] = useState<string | null>(null);

    const startDetection = async () => {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
        );

        handLandmarkerRef.current =
            await HandLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: "/models/hand_landmarker.task",
                    delegate: "GPU",
                },
                runningMode: "VIDEO",
                numHands: 2,
            });

        console.log("MediaPipe initialized");

        let lastVideoTime = -1;

        const detectHands = () => {
            const video = videoRef.current;
            const handLandmarker = handLandmarkerRef.current;

            if (!video || !handLandmarker) {
                return;
            }

            if (
                video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA &&
                video.currentTime !== lastVideoTime
            ) {
                lastVideoTime = video.currentTime;

                const result = handLandmarker.detectForVideo(
                    video,
                    performance.now()
                );

                if (result.landmarks.length > 0) {
                    const landmarks = result.landmarks[0];

                    const frame = landmarks.map((landmark) => [
                        landmark.x,
                        landmark.y,
                        landmark.z,
                    ]);

                    while (dequeRef.current.size() >= 25) {
                        dequeRef.current.popFront();
                    }

                    dequeRef.current.pushBack(frame);

                    gestureAPICall(frame.flat()).then((gesture) => {
                        console.log("my gesture:", gesture);
                        setGesture(gesture);
                    });

                }
            }
            animationFrameRef.current = requestAnimationFrame(detectHands);
        };
        animationFrameRef.current = requestAnimationFrame(detectHands);
    }

    const stopDetection = () => {
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current); // clear the animationFrame
            animationFrameRef.current = null;
        }
    }

    const getSequence = async () => {
        return dequeRef.current.toArray().map(block => block.flat());
    };

    const gestureAPICall = async (landmarks: number[]) => {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                landmarks: landmarks,
            }),
        });

        const result = await response.json();

        return result.gesture
    }

    return { startDetection, stopDetection, getSequence, gesture }
}