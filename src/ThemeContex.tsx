import React, { ReactNode, createContext, useState } from 'react';

interface IContextProps {
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

interface IThemeProviderProps {
    children: ReactNode
}

const initialContextValue: IContextProps = {
    darkMode: true,
    setDarkMode: () => { } // Placeholder function
};


export const ThemeContext = createContext<IContextProps>(initialContextValue);

const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(true);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;