import { Suspense } from "react";
import InventoryList from "~/components/inventory/inventory-list";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";

export default function Inventory() {
  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-between gap-4 p-4">
        <section className="flex w-full flex-col gap-4 md:max-w-screen-sm">
          <Card>
            <CardHeader>
              <CardTitle className="flex w-full flex-row items-center justify-between">
                📦 House Inventory
              </CardTitle>
              <CardDescription>Manage your house inventory</CardDescription>
            </CardHeader>
          </Card>
          <Suspense>
            <InventoryList />
          </Suspense>
        </section>
      </main>
    </HydrateClient>
  );
}
