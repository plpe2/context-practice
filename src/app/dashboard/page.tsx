"use client";

import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import Link from "next/link";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const data = authContext?.data;
  const setData = authContext?.setData;
  return (
    <>
      <div>{data?.email}</div>
      <Link href="/about">About</Link>
    </>
  );
}
