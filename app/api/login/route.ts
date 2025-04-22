import { executeQuery } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      );
    }

    const query = "EXEC GetUserByEmail @p0";
    const result = await executeQuery(query, [email]);

    if (result[0].length === 0) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 401 }
      );
    }

    const user = result[0][0];

    const passwordMatch = password === user.password;
    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        { status: 401 }
      );
    }

    const userResponse = {
      userid: user.userid,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      designation: user.designation,
      department: user.department,
      team_id: user.team_id,
      company_id: user.company_id,
    };

    return new Response(
      JSON.stringify({ success: true, message: "Login successful", user: userResponse }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error.message);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
