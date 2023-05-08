import { Stack } from "expo-router";
import { UserContext } from "../src/context/UserContext";
import { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

export const _layout = ({ children }: LayoutProps ) => {
  return (
    <UserContext.Provider value={{id: 0, nome: 'Emanuel'}}>
      <Stack/>
      {children}
    </UserContext.Provider>
  );
}
