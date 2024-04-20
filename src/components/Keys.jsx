/* eslint-disable react/prop-types */
const UP = "UP";
const DOWN = "DOWN";
const LEFT = "LEFT";
const RIGHT = "RIGHT";
const MOVE = "move";

export function Keys({ socket }) {
    function handleMove(direction) {
        socket.send(
            JSON.stringify({
                type: MOVE,
                payload: direction,
            })
        );
    }
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
