import React, { createContext, useState } from "react"
import type { ReactNode } from 'react'

type AppContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  liveMessage: string;
  setLiveMessage: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined)

type AppProviderProps = {
  children: ReactNode;
}

export const AppProvider = ({children}: AppProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [liveMessage, setLiveMessage] = useState<string>('');

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        liveMessage,
        setLiveMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext }
