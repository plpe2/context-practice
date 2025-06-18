"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/authContext";

type loginVal = {
  email: string;
  password: string;
};

const {setData} = useContext(AuthContext)!;

export default function Home() {
  const router = useRouter();
  const [loginVal, setLoginVal] = useState<loginVal>({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginVal.email,
        password: loginVal.password,
      }),
    });

    const data = await response.json();
    localStorage.setItem("token", data.token);
    setData(data.data)
    router.push("/dashboard"); // Change "/dashboard" to your desired route
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) =>
              setLoginVal({ ...loginVal, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) =>
              setLoginVal({ ...loginVal, password: e.target.value })
            }
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
