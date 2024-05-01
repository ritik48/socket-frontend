/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useUser } from "../context/useUser";

const BACKEND = import.meta.env.VITE_BACKEND || "http://localhost:3000";

function Header({ name }) {
    const { logoutUser, loading } = useUser();
    return (
        <div className="flex items-center py-4 gap-10 pr-24">
            <div className="text-[#d0cece] text-xl ml-auto">{name}</div>
            {loading && <p className="text-[#e9e7e7] text-md">Loading...</p>}
            {!loading && (
                <button
                    onClick={logoutUser}
                    className="rounded-md border border-green-700 text-white text-md px-3 py-2"
                >
                    Logout
                </button>
            )}
        </div>
    );
}

export function Home() {
    const { user, loading } = useUser();
    return (
        <div className="h-screen bg-[#1a1a1a]">
            {user && <Header name={user?.name} />}
            <div className="w-fit mx-auto flex flex-col gap-8 pt-40">
                <div className="text-5xl font-bold text-[#cecece]">
                    Socket game ⚡
                </div>
                {user && (
                    <Link
                        to={"/game"}
                        className="text-xl self-stretch text-center bg-green-600 text-white hover:bg-green-800 px-2 py-4"
                    >
                        {"Start game"}
                    </Link>
                )}
                {!user && (
                    <button
                        disabled={loading}
                        onClick={() =>
                            window.open(`${BACKEND}/auth/google`, "_self")
                        }
                        className="text-xl bg-green-600 text-white hover:bg-green-800 px-2 py-4"
                    >
                        {loading ? "Loading..." : "Login to Start the Game"}
                    </button>
                )}
            </div>
        </div>
    );
}
