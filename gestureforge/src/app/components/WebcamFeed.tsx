"use client";


import { useEffect, useRef } from "react";

export default function WebcamFeed() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const constraints = {
            audio: false,
            video: true,
        };

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                const videoTracks = stream.getVideoTracks();
                console.log("Got stream with constraints:", constraints);
                console.log(`Using video device: ${videoTracks[0].label}`);
                stream.onremovetrack = () => {
                    console.log("Stream ended");
                };
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((error) => {
                if (error.name === "OverconstrainedError") {
                    console.error(
                        `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`,
                    );
                } else if (error.name === "NotAllowedError") {
                    console.error(
                        "You need to grant this page permission to access your camera and microphone.",
                    );
                } else {
                    console.error(`getUserMedia error: ${error.name}`, error);
                }
            });


        // cleanup 
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div className="flex justify-center items-center">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="rounded-xl shadow-lg w-full max-w-md"
            />
        </div>
    );
}
