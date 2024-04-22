import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/useUser.jsx";
import { SocketProvider } from "./context/useSocket.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
        <SocketProvider>
            <App />
        </SocketProvider>
    </UserProvider>
);
