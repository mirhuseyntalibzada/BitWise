import { createContext, useState } from 'react';

export const HamMenuContext = createContext();

export const HamMenuProvider = ({ children }) => {
  const [hamMenu, setHamMenu] = useState(false);
  return (
    <HamMenuContext.Provider value={[ hamMenu, setHamMenu ]}>
      {children}
    </HamMenuContext.Provider>
  );
};
