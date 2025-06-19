"use client";

import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Dashboard() {
  const Portal = useContext(AuthContext);
  const user = Portal?.data;
  return (
    <>
      <div>{user?.name}</div>
    </>
  );
}
