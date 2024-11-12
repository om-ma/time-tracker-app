// pages/api/tickets.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { TicketsModel } from '../../../lib/entities/tickets_model';
import { NextRequest, NextResponse } from 'next/server';
import { SqlDb } from '@/data/sql';
import { ErrorEnum, ErrorMap } from '@/app/utils/commons';
import { ErrorHandler } from '@/app/utils/errorhandler';

interface Pagination {
  page: number;
  totalPages: number;
  totalTickets: number;
  limit: number;
}

type GetTicketsResponse = {
  data: TicketsModel[];
  pagination: Pagination;
};

type ErrorResponse = {
  error: string;
};

// Get Tickets (GET) with Pagination and Search
export async function GET(req: NextRequest, res: NextApiResponse<GetTicketsResponse | ErrorResponse>) {
  try {
    // Extract pagination parameters from the query (if present)
    const params = req.nextUrl?.searchParams;
    const pageNumber = params.get('page') ? Number(params.get('page')) : null;
    const pageLimit = params.get('limit') ? Number(params.get('limit')) : null;

    // If pagination parameters are provided and are valid
    if (pageNumber && pageLimit) {
      // Ensure the page number and limit are positive integers
      if (pageNumber <= 0 || pageLimit <= 0) {
        return ErrorHandler(ErrorMap(ErrorEnum.CUSTOM_ERROR));
      }

      // Get the repository and count total tickets for paginated query
      const ticketsRepo = await SqlDb.getRepository(TicketsModel);

      // Fetch the paginated tickets along with the total count of records
      const [tickets, totalItems] = await ticketsRepo.findAndCount({
        take: pageLimit,
        skip: (pageNumber - 1) * pageLimit,
      });

      // Calculate pagination metadata
      const totalPages = Math.ceil(totalItems / pageLimit);

      // Return paginated data
      return NextResponse.json({
        tickets,
        pagination: {
          totalItems,
          totalPages,
          currentPage: pageNumber,
          limit: pageLimit,
        },
      });
    } else {
      // No pagination params - fetch all tickets
      const ticketsRepo = await SqlDb.getRepository(TicketsModel);
      const tickets = await ticketsRepo.find(); // Fetch all records without pagination

      return NextResponse.json({
        ticket: tickets, // No pagination metadata needed
      });
    }
  } catch (error: any) {
    console.error(error);
    return ErrorHandler(ErrorMap(error.code));
  }
}

export async function getSingleTicket(req: NextRequest, res: NextApiResponse<TicketsModel | ErrorResponse>) {
  try {
    const params = req.nextUrl?.searchParams;
    const ticketId = params.get('id');

    if (!ticketId) {
      return ErrorHandler(ErrorMap(ErrorEnum.CUSTOM_ERROR));
    }

    const ticketRepository = await SqlDb.getRepository(TicketsModel);
    const ticket = await ticketRepository.findOne({ where: { ticket_id: Number(ticketId) } });

    if (!ticket) {
      return ErrorHandler(ErrorMap(ErrorEnum.CUSTOM_ERROR));
    }

    return NextResponse.json(ticket);
  } catch (error: any) {
    console.error(error);
    return ErrorHandler(ErrorMap(error.code));
  }
}

// Create Ticket (POST)
export async function POST(req: NextRequest, res: NextApiResponse<TicketsModel | ErrorResponse>) {
  const { type, summary, detail, hours, timer, notes }: TicketsModel = await req.json();

  if (!type || !summary || !detail) {
    return ErrorHandler(ErrorMap(ErrorEnum.CUSTOM_ERROR));
    ;
  }

  try {
    const ticketRepository = await SqlDb.getRepository(TicketsModel);;
    const ticket = new TicketsModel();
    ticket.type = type;
    ticket.summary = summary;
    ticket.detail = detail;
    ticket.hours = hours;
    ticket.timer = timer ?? "0";
    ticket.notes = notes ?? "";

    const savedTicket = await ticketRepository.save(ticket);
    return NextResponse.json(savedTicket); // Return the newly created ticket
  } catch (error) {
    console.error(error);
    return ErrorHandler(ErrorMap(ErrorEnum.INTERNAL_ERROR));
  }
}

// Update Ticket (PATCH)
export async function PATCH(req: NextRequest, res: NextApiResponse<TicketsModel | ErrorResponse>) {

  const { ticket_id, type, summary, detail, hours, timer, notes }: Partial<TicketsModel> = await req.json();

  const ticketRepository = await SqlDb.getRepository(TicketsModel);

  if (!ticket_id) {
    throw ErrorMap(ErrorEnum.CUSTOM_ERROR);
  }

  try {
    const ticket = await ticketRepository.findOne({ where: { ticket_id } });

    if (!ticket) {
      throw ErrorMap(ErrorEnum.CUSTOM_ERROR);
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
    throw ErrorMap(ErrorEnum.INTERNAL_ERROR);
  }
}

// Delete Ticket (DELETE)
export async function DELETE(req: NextRequest, res: NextApiResponse<ErrorResponse>) {
  const { ticket_id }: { ticket_id: number } = await req.json();

  if (!ticket_id) {
    return ErrorHandler(ErrorMap(ErrorEnum.CUSTOM_ERROR));
  }

  try {
    const ticketRepository = await SqlDb.getRepository(TicketsModel);
    const ticket = await ticketRepository.findOne({ where: { ticket_id } });

    if (!ticket) {
      return ErrorHandler(ErrorMap(ErrorEnum.CUSTOM_ERROR));
    }

    await ticketRepository.remove(ticket);
    return NextResponse.json({ sucess: true }); // success
  } catch (error) {
    console.error(error);
    return ErrorHandler(ErrorMap(ErrorEnum.INTERNAL_ERROR));
  }
}
