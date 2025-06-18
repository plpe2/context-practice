"use client"
import { UserTypes } from "@/types/Users";
import { authVerify } from "@/utils/authVerify";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type ContextType = {
    data: UserTypes | null,
    setData: Dispatch<SetStateAction<UserTypes | null>>
}

type Props = {
    children : ReactNode
}

export const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [data, setData] = useState<UserTypes | null>(null);

  useEffect(() => {
    async function getData() {
      const response = await authVerify();
      const userData = await response.json();
      setData(userData);
    }
    getData();
  }, []);

  return (
    <AuthContext.Provider value={{ data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};
