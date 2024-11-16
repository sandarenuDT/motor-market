"use server";

import prisma from "@/lib/prisma";

export async function createExpense(formData: FormData) {
  const amountString = formData.get("amount") as string;
  const amount = parseFloat(amountString);
  const description =formData.get("description") as string;
  const vehicleIdString = formData.get("vehicleName") as string;
  const categoryIdString = formData.get("categoryName") as string;

  const vehicleId = parseInt(vehicleIdString, 10); 
  const categoryId = parseInt(categoryIdString, 10); 
  await prisma.expense.create({
    data: { amount ,
        description,
        vehicle: {
          connect: { id: vehicleId }, // Connect to an existing vehicle
        },
        category: {
          connect: { id: categoryId }, // Connect to an existing category
        },

    },

  });
  
  
}
