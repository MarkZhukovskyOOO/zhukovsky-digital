import { createContext, useContext } from "react";
import useTheme from "./hooks/useTheme.js";

const ThemeContext = createContext({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }) {
  const value = useTheme();
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeCtx() {
  return useContext(ThemeContext);
}
