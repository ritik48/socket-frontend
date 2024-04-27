const BACKEND = import.meta.env.VITE_BACKEND || "http://localhost:3000";

export function Login() {
    return (
        <div>
            <button
                onClick={() => window.open(`${BACKEND}/auth/google`, "_self")}
                className="text-4xl border-2 border-red-500"
            >
                Google Login
            </button>
        </div>
    );
}
