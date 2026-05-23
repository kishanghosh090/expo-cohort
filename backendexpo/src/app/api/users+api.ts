import { db } from "@/lib/db";

export async function GET() {
  try {
    const res = await db.execute({
      sql: "SELECT * FROM users_data",
    });

    return Response.json(res.rows);
  } catch (error) {
    return Response.json({ err: "Failed to fetch users", status: 500 });
  }
}

export async function POST(request: Request) {
  const { name, email } = await request.json();

  if (!name || !email) {
    return Response.json({
      err: "Name and Email are required",
      status: 400,
    });
  }

  try {
    const res = await db.execute({
      sql: "INSERT INTO users_data (name, email) VALUES(?,?)",
      args: [name, email],
    });

    return (
      Response.json({ id: res.lastInsertRowid, name, email }),
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ err: "Failed to create user", status: 500 });
  }
}
