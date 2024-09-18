import { Function } from "fxnjs"
import { NextRequest, NextResponse } from "next/server"

const fxn = new Function();

export async function POST (request: NextRequest) {
  const body = await request.json();
  const prediction = await fxn.predictions.create(body);
  return NextResponse.json(prediction);
}