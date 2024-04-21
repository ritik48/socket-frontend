import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

import { useSocketContext } from "./context/useSocket";

function App() {
    const [name, setName] = useState("");
    // const navigate = useNavigate();
    const { socket, connecting, connectToServer } = useSocketContext();
    console.log("socket  === ", socket);
    console.log("connection = ", connecting);

    // useEffect(() => {
    //     if (!socket) {
    //         return;
    //     }

    //     return () => {
    //         console.log("cleanup");
    //         socket.close();
    //     };
    // }, [socket]);

    function handleConnect() {
        if (name) {
            connectToServer(name);
        } else {
            toast.error("Please input your name.");
        }
    }

    if (socket) {
        console.log("app = = ");
        return <Navigate to={`/game?name=${name}`} />;
    }

    return (
        <div className="h-screen bg-[#1a1a1a] pt-40">
            {connecting && (
                <div className="absolute inset-0 bg-[#000000ce] flex justify-center items-center">
                    <h1 className="text-3xl text-white font-bold">
                        Connecting to server ...
                    </h1>
                </div>
            )}
            <div className="w-fit mx-auto flex flex-col gap-4">
                <div className="text-5xl font-bold text-[#cecece]">
                    Socket game ⚡
                </div>
                <input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name ?"
                    className="outline-none text-2xl py-4 px-4 rounded-sm mt-10 bg-[#efefef]"
                />
                <button
                    onClick={handleConnect}
                    className="text-xl bg-green-600 text-white hover:bg-green-800 px-2 py-4"
                >
                    Start
                </button>
            </div>
        </div>
    );
}

export default App;
