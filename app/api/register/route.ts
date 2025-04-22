import { NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, department, designation, teamId, companyId } = body;

    if (!firstName || !lastName || !email || !password || !department || !designation || !teamId || !companyId) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    try {
      const query = `EXEC AddUserProfile 
        @FirstName = @p0,
        @LastName = @p1,
        @Email = @p2,
        @Designation = @p3,
        @Department = @p4,
        @TeamId = @p5,
        @CompanyId = @p6,
        @Password = @p7`;

      await executeQuery(query, [
        firstName,
        lastName,
        email,
        designation,
        department,
        teamId,
        companyId,
        password,
      ]);

      return NextResponse.json({ message: "User registered successfully." });
    } catch (error: any) {
      if (error.message.includes("Invalid email domain")) {
        return NextResponse.json({ message: "Invalid email domain. Please use a work email address." }, { status: 400 });
      }
      if (error.message.includes("Email already in use")) {
        return NextResponse.json({ message: "Email is already in use." }, { status: 400 });
      }
      throw error; // Generic error
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
