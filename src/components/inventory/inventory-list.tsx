"use client";

import { api } from "~/trpc/react";

export default function InventoryList() {
  const { data } = api.inventory.getAll.useQuery();

  return <div>Inventory List Count {data?.length}</div>;
}
