import { db } from "@/lib/db";

type Ctx = { params: { id: string } };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = params;
  try {
    const res = await db.execute({
      sql: "SELECT * FROM users_data WHERE id = ?",
      args: [id],
    });

    if (res.rows.length === 0) {
      return Response.json({ err: "User not found", status: 404 });
    }

    return Response.json(res.rows[0]);
  } catch (error) {
    return Response.json({ err: "Failed to fetch user", status: 500 });
  }
}

export async function PATCH(_req: Request, { params }: Ctx) {
  const { id } = params;
  try {
    const { name, email } = await _req.json();

    if (!name && !email) {
      return Response.json({
        err: "At least one of Name or Email is required",
        status: 400,
      });
    }

    const res = await db.execute({
      sql: "UPDATE users_data SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?",
      args: [name, email, id],
    });

    if (res.rows.length === 0) {
      return Response.json({ err: "User not found", status: 404 });
    }

    return Response.json({ id, name, email });
  } catch (error) {
    return Response.json({ err: "Failed to update user", status: 500 });
  }
}

export async function PUT(_req: Request, { params }: Ctx) {
  const { id } = params;
  try {
    const { name, email } = await _req.json();

    if (!name || !email) {
      return Response.json({
        err: "Name and Email are required",
        status: 400,
      });
    }

    const res = await db.execute({
      sql: "UPDATE users_data SET name = ?, email = ? WHERE id = ?",
      args: [name, email, id],
    });

    if (res.rows.length === 0) {
      return Response.json({ err: "User not found", status: 404 });
    }

    return Response.json({ id, name, email });
  } catch (error) {
    return Response.json({ err: "Failed to update user", status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = params;
  try {
    const res = await db.execute({
      sql: "DELETE FROM users_data WHERE id = ?",
      args: [id],
    });

    if (res.rows.length === 0) {
      return Response.json({ err: "User not found", status: 404 });
    }

    return Response.json({ message: "User deleted successfully" });
  } catch (error) {
    return Response.json({ err: "Failed to delete user", status: 500 });
  }
}
