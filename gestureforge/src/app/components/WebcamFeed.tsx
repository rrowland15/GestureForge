"use client";
// boiler modified from https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices

import { useState, useEffect, useRef } from "react";
import StartRecordingButton from "./StartRecordingButton";
import StopRecordingButton from "./StopRecordingButton";

export default function WebcamFeed() {
    const videoRef = useRef<HTMLVideoElement>(null); //html video element to be rendered
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null); // state of recorder
    const [isRecording, setIsRecording] = useState(false); //state of recording


    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            setIsRecording(true);


            const chunks: Blob[] = [];
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) chunks.push(event.data);
            };

            // Start recording
            recorder.start();
            console.log("Recording started");
        } catch (err) {
            console.error("Error accessing media devices.", err);
            alert("Camera access was denied or not available.");
        }


    };

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            setIsRecording(false); // stop recording
        }

        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop()); // stop all tracks (video + audio)
            videoRef.current.srcObject = null; // clear the feed from the video element
        }
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
        </div>
    );
}