import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const vehicles = await prisma.vehicle.findMany();
  
  const categories = await prisma.category.findMany();
const categoryIds=categories.map(category=>category.id);
const categoryNames=categories.map(category=>category.name);

  return NextResponse.json({ vehicles, categoryIds, categoryNames });
}

export async function POST(request) {
  const res = await request.json();

  const { amount, description, categoryId, vehicleId } = res;

  const result = await prisma.expense.create({
    data: {
      amount,
      description,
      vehicle: { connect: { id: vehicleId } },
      category: { connect: { id: categoryId } },
    },
  });

  return NextResponse.json({ result });
}
