"use client";
import dayjs from "dayjs";
import { ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { SkeletonLine } from "../skeleton-line";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export default function ListShoppingLists() {
  const router = useRouter();
  const utils = api.useUtils();

  const { data, isPending } = api.shoppingList.getAll.useQuery();

  const deleteShoppingList = api.shoppingList.delete.useMutation({
    async onSuccess() {
      toast.dismiss("delete-grocery");
      toast.success("Grocery deleted successfully!", { duration: 3000 });
      await utils.shoppingList.getAll.invalidate();
    },
    onMutate() {
      toast.loading("Deleting grocery..", { id: "delete-grocery" });
    },
  });

  if (isPending) return <SkeletonLine />;
  return (
    <div className="flex w-full flex-col gap-4 text-center">
      <div className="flex justify-center gap-2">
        <ShoppingBasket /> ({data?.length})
      </div>
      <ScrollArea className="flex h-[550px] w-full flex-col gap-2 rounded-md">
        <div className="flex flex-col gap-2">
          {data?.map((shoppingList, index) => (
            <div className="flex w-full gap-2" key={index}>
              <Card
                className="flex w-full cursor-pointer flex-row items-center justify-between p-2"
                onClick={() => router.push("/groceries/" + shoppingList.id)}
              >
                <div className="flex flex-col gap-2 text-start">
                  <div className="flex items-center gap-2">
                    {shoppingList.name}
                  </div>
                  <small>{shoppingList.description}</small>
                  <small className="text-muted-foreground">
                    Created on{" "}
                    {dayjs(shoppingList.createdAt).format("DD/MM/YYYY")}
                  </small>
                </div>
                <small className="text-muted-foreground">
                  Items ({shoppingList.groceries.length})
                </small>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
