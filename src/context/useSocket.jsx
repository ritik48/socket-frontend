/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const SocketContext = createContext();

function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [connecting, setConnecting] = useState(false);

    let connectionError = false;

    async function connectToServer(username) {
        setConnecting(true);
        connectionError = false;
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const ws = new WebSocket("ws://localhost:8000?name=" + username);

        ws.onopen = () => {
            console.log("connected.");
            toast.success("You are connected to the server");

            setSocket(ws);
            setConnecting(false);
        };

        ws.onclose = (s) => {
            if (connectionError) {
                return;
            }
            toast.success("You got disconnected");
            console.log("disconnected. ", s);
            setSocket(null);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            toast.error("Error while connecting to the Server");
            setSocket(null);
            connectionError = true;
            setConnecting(false);
        };
    }

    return (
        <SocketContext.Provider value={{ connecting, socket, connectToServer }}>
            {children}
        </SocketContext.Provider>
    );
}

function useSocketContext() {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error(
            "Socket Context was used outside of the Socket Provider "
        );
    }
    return context;
}

export { useSocketContext, SocketProvider };
