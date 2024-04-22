import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Keys } from "../components/Keys";
import { useSocketContext } from "../context/useSocket";
import { useUser } from "../context/useUser";

const INIT = "init";
const MOVE = "move";
const ERROR = "error";
const ACTIVE = "active";
const GAME_OVER = "game_over";
const BOARD_SIZE = "board_size";
const CLIENT_READY = "client_ready";

export function Game() {
    const {
        user: { name },
    } = useUser();

    const { socket, connectToServer } = useSocketContext();

    const [message, setMessage] = useState("");
    const [opponent, setOpponent] = useState("");
    const [waiting, setWaiting] = useState(false);
    const [started, setStarted] = useState(false);

    const [board, setBoard] = useState(null);
    const [squareSize, setSquareSize] = useState(null);

    useEffect(() => {
        connectToServer(name);
    }, [connectToServer, name]);

    useEffect(() => {
        if (!socket) {
            console.log("yesss return");
            return;
        }

        console.log("here");
        socket.send(
            JSON.stringify({
                type: CLIENT_READY,
            })
        );
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            switch (message.type) {
                case BOARD_SIZE:
                    console.log(message);
                    setBoard(message.payload.board);
                    setSquareSize(message.payload.square_size);
                    break;
                case INIT:
                    setStarted(true);
                    setWaiting(true);
                    break;
                case ACTIVE:
                    setStarted(true);
                    setWaiting(false);
                    setBoard(message.payload.board);
                    // setSquareSize(message.payload.square_size);
                    setOpponent(message.payload.opponent);
                    toast.success(
                        `You are playing with ${message.payload.opponent}`
                    );
                    setMessage(message.payload.message);
                    break;
                case MOVE:
                    setBoard(message.payload.board);
                    setMessage(message.payload.message);
                    break;
                case GAME_OVER:
                    toast.success(message.payload.message);
                    setBoard(message.payload.board);
                    setOpponent("");
                    setWaiting(true);
                    break;
                case ERROR:
                    toast.error(message.payload.message);
                    break;
            }
        };

        return () => {
            console.log("cleanup");
            socket.close();
        };
    }, [socket]);

    return (
        <div className="h-screen w-screen gap-2 justify-center items-center bg-[#1f1f1f] flex">
            <div className="m-4 p-4 shadow-md flex rounded-xl flex-wrap w-[20000px] h-[670px] bg-[#323248] ">
                {socket &&
                    board &&
                    board.map((row, i) => {
                        return row.map((item, j) => {
                            return (
                                <div
                                    key={i + j}
                                    style={{
                                        width: `${squareSize}px`,
                                        height: `${squareSize}px`,
                                    }}
                                    className={`flex m-1 justify-center items-center rounded-lg bg-[#141626]`}
                                >
                                    {item !== "0" && (
                                        <div
                                            className={`w-2/3 h-2/3 rounded-lg ${
                                                item === opponent
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            }`}
                                        ></div>
                                    )}
                                </div>
                            );
                        });
                    })}
            </div>
            <div className="mt-4 flex flex-col p-2 h-[670px]">
                <div className="flex flex-col items-start gap-4">
                    <h1 className="text-xl font-kanit text-white">
                        🕹️ Hey, {name}
                    </h1>
                    {!socket && (
                        <p className="text-lg text-[#f5a64b] font-kanit font-semibold">
                            {" "}
                            You are not connected to the server. Refresh to
                            reconnect
                        </p>
                    )}
                    {!started && socket && (
                        <button
                            onClick={() => {
                                socket.send(
                                    JSON.stringify({
                                        type: INIT,
                                    })
                                );
                            }}
                            className="text-xl bg-green-600 text-white hover:bg-green-800 px-6 py-1 font-kanit rounded-md"
                        >
                            Play
                        </button>
                    )}

                    <div className="flex flex-col mt-2 gap-2">
                        {started && !waiting && (
                            <p className="text-lg text-white font-semibold">
                                <span className="text-[#b0aeae] font-kanit mr-4">
                                    Playing with:
                                </span>{" "}
                                {opponent}
                            </p>
                        )}

                        {started && socket && waiting && (
                            <p className="text-xl text-[#f5a64b] font-kanit font-semibold">
                                Waiting for the other user to connect ...
                            </p>
                        )}
                        <p className="text-lg text-white font-semibold">
                            {message}
                        </p>
                    </div>
                </div>

                <Keys socket={socket} />
            </div>
        </div>
    );
}
