// pages/api/tickets.ts

import { NextApiRequest, NextApiResponse } from 'next';
import {AppDataSource} from '../../../lib/typeorm';
import { Ticket } from '../../../lib/entities/Ticket';
import { NextRequest, NextResponse } from 'next/server';



interface GetTicketsQuery {
  page?: string;
  limit?: string;
  search?: string;
}

interface Pagination {
  page: number;
  totalPages: number;
  totalTickets: number;
  limit: number;
}

type GetTicketsResponse = {
  data: Ticket[];
  pagination: Pagination;
};

type ErrorResponse = {
  error: string;
};

// Initialize the database connection on each request
async function getConnection() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource.getRepository(Ticket);
}


// Create Ticket (POST)
export async function POST(req: NextRequest, res: NextApiResponse<Ticket | ErrorResponse>) {
  const { type, summary, detail, hours, timer, notes }: Ticket = await req.json();
  console.log('req', req.body)

  if (!type || !summary || !detail || !hours) {
    return NextResponse.json({ error: 'Missing required fields' });
  }

  try {
    const ticketRepository = await getConnection();
    const ticket = new Ticket();
    ticket.type = type;
    ticket.summary = summary;
    ticket.detail = detail;
    ticket.hours = hours;
    ticket.timer = timer ?? null;
    ticket.notes = notes ?? null;

    const savedTicket = await ticketRepository.save(ticket);
    return NextResponse.json(savedTicket); // Return the newly created ticket
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}

// Get Tickets (GET) with Pagination and Search
export async function GET(req: NextRequest, res: NextApiResponse<GetTicketsResponse | ErrorResponse>) {


  const params = req.nextUrl?.searchParams;

  const ticket_id = params.get('ticketId')

  if (!ticket_id || Array.isArray(ticket_id)) {
    return res.status(400).json({ error: 'Ticket ID is required and must be a single value.' });
  }

  try {
    const ticketRepository = await getConnection();

    const ticket = await ticketRepository.findOne({ where: { ticket_id: parseInt(ticket_id) } });

    if (!ticket) {
      return NextResponse.json({error: 'Ticket not found' });
    }

    return  NextResponse.json(ticket); // Return the ticket data
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}

// Update Ticket (PATCH)
export async function PATCH(req: NextRequest, res: NextApiResponse<Ticket | ErrorResponse>) {
  const { ticket_id, type, summary, detail, hours, timer, notes }: Partial<Ticket> = await req.json();

  if (!ticket_id) {
    return NextResponse.json({ error: 'Ticket ID is required' });
  }

  try {
    const ticketRepository = await getConnection();
    const ticket = await ticketRepository.findOne({ where: { ticket_id } });

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' });
    }

    if (type) ticket.type = type;
    if (summary) ticket.summary = summary;
    if (detail) ticket.detail = detail;
    if (hours) ticket.hours = hours;
    if (timer) ticket.timer = timer;
    if (notes) ticket.notes = notes;

    const updatedTicket = await ticketRepository.save(ticket);
    return NextResponse.json(updatedTicket);
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: 'Internal Server Error' });
  }
}

// Delete Ticket (DELETE)
export async function DELETE(req: NextRequest, res: NextApiResponse<ErrorResponse>) {
  const { ticket_id }: { ticket_id: number } = await req.json();

  console.log('ssijsijisjjisijs')

  if (!ticket_id) {
    return NextResponse.json({ error: 'Ticket ID is required' });
  }

  try {
    const ticketRepository = await getConnection();
    const ticket = await ticketRepository.findOne({ where: { ticket_id } });

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' });
    }

    await ticketRepository.remove(ticket);
    return NextResponse.json({ sucess: true }); // success
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
