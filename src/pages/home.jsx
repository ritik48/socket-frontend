import { Link } from "react-router-dom";
import { useUser } from "../context/useUser";

const BACKEND = import.meta.env.VITE_BACKEND || "http://localhost:3000";

export function Home() {
    const { user, loading } = useUser();
    return (
        <div className="h-screen bg-[#1a1a1a] pt-40">
            <div className="w-fit mx-auto flex flex-col gap-4">
                <div className="text-5xl font-bold text-[#cecece]">
                    Socket game ⚡
                </div>
                {user && (
                    <Link
                        to={"/game"}
                        className="text-xl bg-green-600 text-white hover:bg-green-800 px-2 py-4"
                    >
                        Welcome, {user.name}
                        {"\nClick to start game"}
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
