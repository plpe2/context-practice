"use client";

import { verifyToken } from "@/lib/auth";
import { UserTypes } from "@/types/Users";
import { authVerify } from "@/utils/authVerify";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [userData, setUserData] = useState<UserTypes | null>(null)

  useEffect(() => {
    async function getData(){
      const response = await authVerify()
      const data = await response.json()
      setUserData(data)
    }
    getData()
  }, [])
  return (
    <>
      <div>
        {userData?.status}
      </div>
    </>
  )
}
