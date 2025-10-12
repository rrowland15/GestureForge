"use client";

interface StopRecordingButtonProps {
    onStop: () => void;
    disabled?: boolean;
}

export default function StopRecordingButton({ onStop, disabled }: StopRecordingButtonProps) {
    return (
        <button
            onClick={onStop}
            disabled={disabled}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 disabled:bg-gray-400 transition"
        >
            Stop Recording
        </button>
    );
}