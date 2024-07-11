import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/useUser.jsx";
import { SocketProvider } from "./context/useSocket.jsx";
import { GameProvider } from "./context/useGame.jsx";

console.log(import.meta.env.VITE_SOCKET_BACKEND);

ReactDOM.createRoot(document.getElementById("root")).render(
    <GameProvider>
        <UserProvider>
            <SocketProvider>
                <App />
            </SocketProvider>
        </UserProvider>
    </GameProvider>
);
