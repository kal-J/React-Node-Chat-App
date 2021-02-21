import { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [state, setState] = useState({ user: { isAuthenticated: false } });

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
