"use client";
import { ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export default function ListShoppingLists() {
  const router = useRouter();
  const { data, isPending } = api.shoppingList.getAll.useQuery();

  // const deleteGrocery = api.shoppingList.delete.useMutation({
  //   async onSuccess() {
  //     toast.dismiss("delete-grocery");
  //     toast.success("Grocery deleted successfully!", { duration: 3000 });
  //     await utils.shoppingList.getAll.invalidate();
  //   },
  //   onMutate() {
  //     toast.loading("Deleting grocery..", { id: "delete-grocery" });
  //   },
  // });

  if (isPending) return <div>Loading..</div>;
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
                <div className="text-start">
                  <div className="flex items-center gap-2">
                    {shoppingList.name}
                  </div>
                  <small className="text-muted-foreground">
                    {shoppingList.description}
                  </small>
                </div>
                <small className="text-muted-foreground">
                  {shoppingList.createdAt.toDateString()}
                </small>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
