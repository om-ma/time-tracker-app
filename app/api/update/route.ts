import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '../../../lib/db';

interface UpdateTicketRequestBody {
  ticket_id: number;
  log_time: string;
  notes?: string | null;
}

const updateLogTimeAndNotes = async (ticketId: number, logTime: string, notes: string | null): Promise<void> => {
    const query = `
    EXEC update_ticket_log_time_and_notes 
        @ticket_id = @p0, 
        @log_time = @p1, 
        @notes = @p2;
  `;
  
  
  try {
    // Log the query and parameters for debugging
    console.log('Executing query:', query);
    console.log('With parameters:', [ticketId, logTime, notes]);

    // Execute the query with parameters
    await executeQuery(query, [ticketId, logTime, notes]);
    console.log('Query executed successfully');
  } catch (error: any) {
    console.error('Error while executing stored procedure:', error.message);
    throw new Error(`Error while executing stored procedure: ${error.message}`);
  }
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: UpdateTicketRequestBody = await request.json();

    if (!body.ticket_id || !body.log_time) {
      return NextResponse.json(
        { error: 'Ticket ID and log time are required' },
        { status: 400 }
      );
    }

    await updateLogTimeAndNotes(body.ticket_id, body.log_time, body.notes || null);

    return NextResponse.json(
      { message: 'Log time and notes updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to update log time and notes', details: error.message },
      { status: 500 }
    );
  }
}
