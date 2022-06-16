import { createContext, useContext } from 'react';
export type GlobalContent = {
  enabled: string;
  setEnabled: (c: any) => void;
};
export const Context = createContext<GlobalContent>({
  enabled: 'Hello World', // set a default value
  setEnabled: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
