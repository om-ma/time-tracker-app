// pages/api/tickets.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { TicketsModel } from '../../../../lib/entities/tickets_model';
import { NextRequest, NextResponse } from 'next/server';
import { SqlDb } from '@/data/sql';
import { ErrorEnum, ErrorMap } from '@/app/utils/commons';
import { ErrorHandler } from '@/app/utils/errorhandler';

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
    data: TicketsModel[];
    pagination: Pagination;
};

type ErrorResponse = {
    error: string;
};


export async function GET(req: NextRequest, res: NextApiResponse<TicketsModel | ErrorResponse>) {
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