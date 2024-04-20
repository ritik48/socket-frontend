import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useSocket(username) {
    
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000?name=" + username);

        ws.onopen = () => {
            console.log("connected.");
            toast.success("You are connected to the server");
            setSocket(ws);
        };

        ws.onclose = () => {
            toast.success("You got disconnected");
            console.log("disconnected.");
            
            setSocket(null);
        };

        return () => ws.close();
    }, [username]);

    return { socket, setSocket };
}
