"use client";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { SkeletonLine } from "../skeleton-line";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import CheckoutList from "./checkout-list";

export default function ListShoppingLists() {
  const router = useRouter();
  const { data, isPending } = api.shoppingList.getAll.useQuery();

  if (isPending) return <SkeletonLine />;
  return (
    <div className="flex w-full flex-col gap-4 text-center">
      <div className="flex justify-center gap-2">
        New Lists ({data?.length})
      </div>
      <ScrollArea className="flex w-full flex-col gap-2 rounded-md">
        <div className="flex flex-col gap-2">
          {data?.map((shoppingList, index) => (
            <div className="flex w-full gap-2" key={index}>
              <Card className="flex w-full cursor-pointer flex-row items-center justify-between p-2">
                <div
                  className="flex flex-col gap-2 text-start"
                  onClick={() => router.push("/groceries/" + shoppingList.id)}
                >
                  <div className="flex items-center gap-2">
                    {shoppingList.name}{" "}
                    <small className="text-muted-foreground">
                      ({shoppingList.groceries.length})
                    </small>
                  </div>

                  <small>{shoppingList.description}</small>
                  <small className="text-muted-foreground">
                    Created on{" "}
                    {dayjs(shoppingList.createdAt).format("DD/MM/YYYY")}
                  </small>
                </div>
                <CheckoutList id={shoppingList.id} />
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
