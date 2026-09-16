"use client";

import { useState, useEffect } from "react";

interface GestureManipulatedProps {
    gesture: string | null
}

export default function GestureManipulated({ gesture }: GestureManipulatedProps) {
    const [color, setColor] = useState("yellow");
    useEffect(() => {
        if (gesture === "thumbs_up2") {
            setColor("green");
        }

        if (gesture === "right_hand_stop2") {
            setColor("red");
        }
    }, [gesture]);

    return (
        <span>
            <svg height="100" width="100">
                <circle
                    cx="50"
                    cy="50"
                    r={gesture === "closed_fist2" ? 10 : 40}
                    fill={color} />
                <text x="50" y="50" textAnchor="middle">{gesture === "right_hand_stop2" ? "stop!" : ""}</text>
            </svg>


        </span>
    );
}