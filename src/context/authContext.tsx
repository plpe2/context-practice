"use client";
import { UserTypes } from "@/types/Users";
import { authVerify } from "@/utils/authVerify";
import { useRouter } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type ContextType = {
  data: UserTypes | null;
  setData: Dispatch<SetStateAction<UserTypes | null>>;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [data, setData] = useState<UserTypes | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    async function getData() {
      if (!storedToken) {
        router.push("/");
        return;
      }

      const result = await authVerify(storedToken);

      if (result.success) {
        setData(result.data);
      } else {
        console.error("Auth failed:", result.error);
        localStorage.removeItem("token"); 
        router.push("/");
      }
    }
    getData();
  }, []);

  return (
    <AuthContext.Provider value={{ data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};
