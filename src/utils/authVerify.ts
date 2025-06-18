import { verifyToken } from "@/lib/auth";

export async function authVerify() {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("api/verify-auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });
    const data = await response.json();
    return Response.json(data);
  } catch (err) {
    return Response.json(err);
  }
}
