/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState } from "react";

const GameContext = createContext();

function GameProvider({ children }) {
    const [gameState, setGameState] = useState("inactive");
    const [gameMessage, setGameMessage] = useState("");

    const changeGameState = useCallback((state) => {
        setGameState(state);
    }, []);

    const changeGameMessage = useCallback((message) => {
        setGameMessage(message);
    }, []);

    return (
        <GameContext.Provider
            value={{
                gameState,
                changeGameState,
                changeGameMessage,
                gameMessage,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

const useGame = () => {
    const context = useContext(GameContext);

    if (context === undefined) {
        throw new Error("GameProvider was used outside of its context");
    }

    return context;
};

export { useGame, GameProvider };
