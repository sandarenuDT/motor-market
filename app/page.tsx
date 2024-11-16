// "use client";
import prisma from "@/lib/prisma";
import styles from "./page.module.css";
import Link from "next/link";
import { createExpense } from "./actions/actions";
export default async function Home() {
  const post = await prisma.category.findMany();
  const vehicles = await prisma.vehicle.findMany();
  const vehicleTypes = await prisma.vehicleType.findMany({
    select: {
      id: true,
      // modelName: true,
      brandName: true,
    },
  });
  const brandNames = vehicleTypes.map((vehicleType) => ({
    brandName: vehicleType.brandName,
  }));

  return (
    <div className={styles.page}>
      <main>
        <h1>Expense Tracker</h1>

        <ul>
          <h3>Expenses categories</h3>
          {post.map((category) => {
            return (
              <li key={category.id}>
                <Link href={`/posts/${category.id}`}>{category.name}</Link>
              </li>
            );
          })}
        </ul>
        <div>
          <form
            action={createExpense}
            className="flex flex-col gap-y-2 w-[300px]"
          >
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              className="border p-2"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="border p-2"
            />
            <select name="vehicleName" className="border p-2" required>
              <option value="">Select a vehicle type</option>
              {vehicles.map((vehicle) => {
                // Find the vehicleType based on vehicleTypeId
                const brandId = vehicleTypes.find(
                  (type) => type.id === vehicle.vehicleTypeId
                );

                return (
                  <option key={vehicle.id} value={vehicle.id}>
                    {brandId
                      ? `${brandId.brandName} - ${vehicle.modelName}`
                      : vehicle.modelName}
                  </option>
                );
              })}
            </select>
            <select name="categoryName" className="border p-2" required>
              <option value="">Select expense category</option>
              {post.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* <select name="vehicleName" className="border p-2" required>
              <option value="">Select a vehicle type</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.modelName}
                </option>   
              ))}
            </select> */}

            <button>create expense</button>
          </form>
        </div>
      </main>
    </div>
  );
}
