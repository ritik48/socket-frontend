export function Login() {
    return (
        <div>
            <button
                onClick={() =>
                    window.open("http://127.0.0.1:3000/auth/google", "_self")
                }
                className="text-4xl border-2 border-red-500"
            >
                Google Login
            </button>
        </div>
    );
}
