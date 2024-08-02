/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { type Groceries } from "@prisma/client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { api } from "~/trpc/react";
import { SkeletonLine } from "../skeleton-line";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function InventoryList() {
  const { data, isPending } = api.inventory.getAll.useQuery();

  if (isPending) return <SkeletonLine />;
  return (
    <div className="flex flex-col gap-2">
      {data?.Groceries.map((grocery: Groceries, index: number) => (
        <Card className={"grid grid-cols-3 p-2 text-center"} key={index}>
          <div>{grocery.itemName}</div>
          <div>{grocery.threshold}</div>
          <div className="">
            <Button size={"icon"} variant={"ghost"}>
              <PlusIcon size={16} />
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <MinusIcon size={16} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
