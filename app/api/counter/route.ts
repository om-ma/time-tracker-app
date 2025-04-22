import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db"; // Adjust the import if necessary

// Helper function to map ticket type name to type_id
const mapTicketTypeToId = async (typeName: string) => {
  // Query to get type_id based on type_name
  const query = `SELECT type_id FROM Ticket_Types WHERE type_name = @type_name`;
  const result = await executeQuery(query, [typeName]);
  return result[0]?.type_id || null; // Return the type_id if found or null
};

export async function GET() {
  try {
    // Fetch top 5 results with an ORDER BY clause to determine ranking
    const query = `
      SELECT TOP 5 
        t.ticket_id, 
        t.summary, 
        t.details, 
        tt.type_name, 
        l.log_time, 
        l.notes
      FROM Ticket_Details t
      LEFT JOIN Ticket_Types tt ON t.type_id = tt.type_id
      LEFT JOIN Log_Time l ON t.ticket_id = l.ticket_id
      ORDER BY t.ticket_id DESC;
    `;

    const rawData = await executeQuery(query);

    // Flatten nested array structure if present
    const flatData = Array.isArray(rawData[0]) ? rawData[0] : rawData;

    // Format the response data
    const formattedData = flatData.map((ticket) => ({
      ticket_id: ticket.ticket_id || null, 
      summary: ticket.summary || null,
      details: ticket.details || null,
      ticket_type: ticket.type_name || null,
      log_time: ticket.log_time || "No time logged",
      notes: ticket.notes || null,
    }));

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      { error: "Failed to fetch tickets and log times" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { ticket_id, ticket_type, summary, details, log_time, notes } = body;

    // Check if required fields are provided
    if (!ticket_id || !ticket_type || !summary || !details) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Prepare parameters
    const logTimeValue = log_time || 'No time logged.';  // Default value if log_time is missing
    const notesValue = notes || null;  // Use null if no notes are provided

    // SQL Procedure Call Query
    const procedureCallQuery = `
      EXEC insert_ticket
        @ticket_id = @p0,
        @summary = @p1,
        @details = @p2,
        @type_name = @p3,
        @log_time = @p4,
        @notes = @p5;
    `;

    // Execute query with parameters
    await executeQuery(procedureCallQuery, [
      ticket_id,      // ticket_id
      summary,        // summary
      details,        // details
      ticket_type,    // ticket_type
      logTimeValue,   // log_time
      notesValue      // notes
    ]);

    return NextResponse.json({ message: "Ticket inserted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Detailed error inserting data:", error);
    return NextResponse.json({ error: "Failed to insert ticket", details: error.message }, { status: 500 });
  }
}
