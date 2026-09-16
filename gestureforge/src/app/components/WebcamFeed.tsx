"use client";
// boiler modified from https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices

import { useState, useEffect, useRef } from "react";
import StartRecordingButton from "./StartRecordingButton";
import StopRecordingButton from "./StopRecordingButton";
import useHandLandMark from "../hooks/useHandLandmark";
import GestureManipulated from "./gestureManipulated";

type WebcamFeedProps = {
    onGestureChange: (gesture: string | null) => void;
};

//export default function WebcamFeed() {
export default function WebcamFeed({ onGestureChange }: WebcamFeedProps) {
    const videoRef = useRef<HTMLVideoElement>(null); //html video element to be rendered
    //const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null); // state of recorder
    const [isRecording, setIsRecording] = useState(false); //state of recording
    const {
        getSequence,
        startDetection,
        stopDetection,
        gesture,
    } = useHandLandMark(videoRef);

    useEffect(() => {
        if (gesture) {
            onGestureChange(gesture);
        }
    }, [gesture, onGestureChange]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            //const recorder = new MediaRecorder(stream);
            //setMediaRecorder(recorder);
            setIsRecording(true);

            // const chunks: Blob[] = [];
            // recorder.ondataavailable = (event) => {
            //     if (event.data.size > 0) chunks.push(event.data);
            // };

            //recorder.start();
            await startDetection();

        } catch (err) {
            console.error("Error accessing media devices.", err);
            alert("Camera access was denied or not available.");
        }
    };

    const stopRecording = () => {
        // if (mediaRecorder && isRecording) {
        //     mediaRecorder.stop();
        //     setIsRecording(false); 
        // }

        if (isRecording) {
            setIsRecording(false);
        }

        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
        }

        stopDetection();
        const res = getSequence();
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="rounded-xl shadow-lg w-full max-w-md"
            />
            <div className="flex gap-4">
                <StartRecordingButton onStart={startRecording} disabled={isRecording} />
                <StopRecordingButton onStop={stopRecording} disabled={!isRecording} />
            </div>
            <h2>Detected Gesture</h2>
            <p>{gesture ?? "Waiting for gesture..."}</p>
        </div>
    );
}