import { getConnection } from "@/lib/db";

export async function GET() {
  const conn = await getConnection();
  const [rows] = await conn.query("SELECT * FROM users_tbl")
  
  return Response.json(rows)
}
