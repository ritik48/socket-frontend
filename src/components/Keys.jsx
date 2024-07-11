import { useEffect } from "react";
import { useGame } from "../context/useGame";

/* eslint-disable react/prop-types */
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";
const MOVE = "move";

function useKeys(action) {
    useEffect(() => {
        document.addEventListener("keyup", action);
        return () => document.removeEventListener("keyup", action);
    }, [action]);
}

export function Keys({ socket }) {
    const { gameState } = useGame();

    function handleKeyPress(e) {
        if (e.key === "w" || e.key === "ArrowUp") {
            handleMove(UP);
        } else if (e.key === "s" || e.key === "ArrowDown") {
            handleMove(DOWN);
        } else if (e.key === "d" || e.key === "ArrowRight") {
            handleMove(RIGHT);
        } else if (e.key === "a" || e.key === "ArrowLeft") {
            handleMove(LEFT);
        }
    }

    function handleMove(direction) {
        if (gameState === "stopped") {
            console.log("game is stopped");
            return;
        }
        socket.send(
            JSON.stringify({
                type: MOVE,
                payload: direction,
            })
        );
    }

    useKeys(handleKeyPress);

    return (
        <div className="flex flex-col mt-auto justify-end items-center gap-5">
            <button
                onClick={() => handleMove(UP)}
                className="font-semibold button-test text-3xl border w-16 h-16 text-white flex justify-center items-center"
            >
                U
            </button>
            <div className="flex gap-5">
                <button
                    onClick={() => handleMove(LEFT)}
                    className="font-semibold button-test text-3xl border w-16 h-16 text-white flex justify-center items-center"
                >
                    L
                </button>
                <button
                    onClick={() => handleMove(DOWN)}
                    className="font-semibold button-test text-3xl border w-16 h-16 text-white flex justify-center items-center"
                >
                    D
                </button>
                <button
                    onClick={() => handleMove(RIGHT)}
                    className="font-semibold button-test text-3xl border w-16 h-16 text-white flex justify-center items-center"
                >
                    R
                </button>
            </div>
        </div>
    );
}
