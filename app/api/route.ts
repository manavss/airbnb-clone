import { NextResponse } from "next/server";
import prisma from "../lib/db";

export async function GET() {
  const data = await prisma.home.findMany();
  console.log(data);
  return NextResponse.json("Checked!!");
}
