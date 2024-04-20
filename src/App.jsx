import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function App() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-[#1a1a1a] pt-40">
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
                    onClick={() => {
                        if (!name) {
                            toast.error("Please input your name.");
                            return;
                        }

                        navigate(`/game?name=${name}`);
                    }}
                    className="text-xl bg-green-600 text-white hover:bg-green-800 px-2 py-4"
                >
                    Start
                </button>
            </div>
        </div>
    );
}

export default App;
