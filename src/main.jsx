// import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";
import { Game } from "./pages/game.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SocketProvider } from "./context/useSocket.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <SocketProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/game" element={<Game />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    </SocketProvider>

    // </React.StrictMode>
);
