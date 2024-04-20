import { useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Keys } from "../components/Keys";

const INIT = "init";
const MOVE = "move";
const ERROR = "error";
const ACTIVE = "active";
const GAME_OVER = "game_over";
const BOARD_SIZE = "board_size";

export function Game() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const name = query.get("name");

    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [opponent, setOpponent] = useState("");
    const [waiting, setWaiting] = useState(false);

    const [board, setBoard] = useState(null);
    const [squareSize, setSquareSize] = useState(null);

    const { socket } = useSocket(name);
    console.log(socket);

    const [started, setStarted] = useState(false);

    console.log("opponent = ", opponent);
    console.log("board = ", board);

    useEffect(() => {
        if (!socket) {
            console.log("yesss return");
            return;
        }
        console.log("not return");
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("message here = ", message);

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
                    navigate("/");
                    break;
                case ERROR:
                    toast.error(message.payload.message);
                    break;
            }
        };
    }, [socket, navigate]);

    console.log("board = ", board);
    console.log("size = ", squareSize);

    return (
        <div className="h-screen mx-auto gap-4 justify-center bg-[#1f1f1f] flex">
            <div className="m-4 p-4 shadow-md flex rounded-xl flex-wrap w-[1000px] h-[700px] bg-[#323248] ">
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
            <div className="mt-4 flex flex-col p-10 w-1/4 h-[700px]">
                <div className="flex flex-col items-start gap-4">
                    <h1 className="text-3xl font-semibold text-white">
                        Welcome 👋, {name}
                    </h1>
                    {!socket && (
                        <p className="text-lg text-[#f5a64b] font-semibold">
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
                            className="text-xl bg-green-600 text-white hover:bg-green-800 px-8 py-2 rounded-md"
                        >
                            Play
                        </button>
                    )}

                    <div className="flex flex-col mt-2 gap-2">
                        {started && !waiting && (
                            <p className="text-lg text-white font-semibold">
                                <span className="text-[#b0aeae] mr-4">
                                    Playing with:
                                </span>{" "}
                                {opponent}
                            </p>
                        )}

                        {started && waiting && (
                            <p className="text-xl text-[#f5a64b] font-semibold">
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
