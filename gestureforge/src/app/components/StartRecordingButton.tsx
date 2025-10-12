"use client";

interface StartRecordingButtonProps {
    onStart: () => void;
    disabled?: boolean;
}

export default function StartRecordingButton({ onStart, disabled }: StartRecordingButtonProps) {
    return (
        <button
            onClick={onStart}
            disabled={disabled}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 disabled:bg-gray-400 transition"
        >
            Start Recording
        </button>
    );
}