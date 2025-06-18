import { signToken } from "@/lib/auth";
import { getConnection } from "@/lib/db";
import { UserTypes } from "@/types/Users";
import { RowDataPacket } from "mysql2";

export async function POST(request: Request) {
  const conn = await getConnection();
  const { email, password } = await request.json();

  const [rows] = await conn.query<RowDataPacket[]>(
    "SELECT id, password FROM users_tbl WHERE email = ?",
    email
  );

  const user = rows[0] as UserTypes;

  if (user.password != password)
    return Response.json({ message: "Incorrect Credentials" });

  const token = await signToken({ id: user.id })
  return Response.json({token : token});
}
