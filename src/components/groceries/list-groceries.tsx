"use client";
import { api } from "~/trpc/react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export default function ListGroceries() {
  const { data, isPending } = api.groceries.getAll.useQuery();

  if (isPending) return <div>Loading..</div>;
  return (
    <ScrollArea className="flex h-[800px] w-full flex-col gap-2 rounded-md p-4">
      <div className="flex flex-col gap-2">
        {data?.map((grocery, index) => (
          <Card key={index} className="w-full p-2">
            {grocery.name}
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
