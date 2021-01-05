import React, { useState, useContext } from "react"
import Game from "./Game"

const GameContext = React.createContext()

export function GameProvider({ children }) {
    const [game]= useState(new Game())
    return <GameContext.Provider value={game} children={children} />
}

export function useGame() {
    const game = useContext(GameContext)
    return { game } 
}