import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { ErrorResponse } from "./type";

export const ErrorHandler  = async(error:any,) => {

   return NextResponse.json({ error: error.message, code:error.code });

}