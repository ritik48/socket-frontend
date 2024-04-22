import { Toaster } from "react-hot-toast";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";

import { Game } from "./pages/game";
import { Home } from "./pages/home";
import { useUser } from "./context/useUser";

function ProtectedRoute() {
    const { user, loading } = useUser();

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-black">
            {loading && (
                <div className="text-4xl font-bold text-white">Loading ...</div>
            )}
            {!loading && user && <Outlet />}
            {!loading && !user && <Navigate to={"/"} />}
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/game" element={<Game />} />
                </Route>
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
