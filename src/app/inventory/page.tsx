import { Suspense } from "react";
import InventoryList from "~/components/inventory/inventory-list";
import { HydrateClient } from "~/trpc/server";

export default function Inventory() {
  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-between gap-4 p-4">
        <section className="flex w-full flex-col gap-4 md:max-w-screen-sm">
          <div className="flex w-full flex-row items-center justify-between">
            📦 House Inventory
          </div>
          <Suspense>
            <InventoryList />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  );
}
