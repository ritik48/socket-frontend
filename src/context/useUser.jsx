/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("http://localhost:3000/user", {
                    credentials: "include",
                });

                const data = await res.json();
                if (res.ok) {
                    setLoading(false);
                    setUser(data.user);
                }
                setLoading(false);
            } catch (error) {
                toast.error("Server not responding");
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    async function logoutUser() {
        const res = await fetch("http://localhost:3000/user/logout", {
            method: "POST",
            credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
            console.log(data);
            throw new Error("Error logging out");
        }
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, logoutUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("Context was used outside of the User Provider");
    }
    return context;
};

export { UserProvider, useUser };
