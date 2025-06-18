import { verifyToken } from "@/lib/auth";
import { getConnection } from "@/lib/db";
import { decodedToken } from "@/types/Token";
import { RowDataPacket } from "mysql2";

export async function POST(request: Request) {
  try {
    const storedToken = await request.json();
    const { token } = storedToken;
    const conn = await getConnection();

    const decoded = (await verifyToken(token)) as decodedToken;
    const [rows] = await conn.query<RowDataPacket[]>("SELECT * FROM users_tbl WHERE id = ?", decoded.id)

    const user = rows[0]

    return Response.json(user);
  } catch (err) {
    return Response.json({ message: err });
  }
}
