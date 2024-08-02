"use client";
import { CheckIcon, Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { SkeletonLine } from "../skeleton-line";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";

export default function ListGroceries({ id }: { id: number }) {
  const utils = api.useUtils();
  const [mode, setMode] = useState<"in-store" | "online">("online");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const { data, isPending } = api.groceries.getAll.useQuery({
    shoppingListId: id,
  });

  const markPurchasedGrocery = api.groceries.archive.useMutation({
    async onSuccess() {
      toast.dismiss("delete-grocery");
      toast.success("Grocery purchased successfully!", { duration: 3000 });
      await utils.groceries.getAll.invalidate();
    },
    onMutate() {
      toast.loading("Purchasing grocery..", { id: "delete-grocery" });
    },
  });

  const deleteGrocery = api.groceries.delete.useMutation({
    async onSuccess() {
      toast.dismiss("delete-grocery");
      toast.success("Grocery deleted successfully!", { duration: 3000 });
      await utils.groceries.getAll.invalidate();
    },
    onMutate() {
      toast.loading("Deleting grocery..", { id: "delete-grocery" });
    },
  });

  if (isPending) return <SkeletonLine />;
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-row items-center justify-between">
        Groceries Mode: {mode}
        <Switch
          id="airplane-mode"
          onCheckedChange={() =>
            mode === "in-store" ? setMode("online") : setMode("in-store")
          }
        />
      </div>
      <div>
        <small>
          {mode === "in-store"
            ? "With this mode you can mark groceries as purchased"
            : "With this mode you can delete groceries"}
        </small>
      </div>
      <ScrollArea className="flex h-[550px] w-full flex-col gap-2 rounded-md">
        <div className="flex flex-col gap-2">
          {data?.map((grocery, index) => (
            <Card
              key={index}
              className="flex w-full items-center justify-between p-2"
            >
              <small className={grocery.archived ? "line-through" : ""}>
                {grocery.itemName}
              </small>
              <small className={grocery.archived ? "line-through" : ""}>
                x{grocery.quantity} {grocery.unit}
              </small>
              <div className="flex flex-row gap-2">
                {mode === "in-store" ? (
                  <Button
                    size="icon"
                    className="size-6"
                    variant={"ghost"}
                    onClick={async () => {
                      setSelectedItem(grocery.id);
                      await markPurchasedGrocery.mutateAsync({
                        id: grocery.id,
                        archived: !grocery.archived,
                      });
                    }}
                    disabled={
                      markPurchasedGrocery.isPending &&
                      selectedItem === grocery.id
                    }
                  >
                    {markPurchasedGrocery.isPending &&
                    selectedItem === grocery.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <CheckIcon className="size-4" />
                    )}
                  </Button>
                ) : (
                  <Button
                    size="icon"
                    className="size-6"
                    variant={"ghost"}
                    onClick={async () => {
                      setSelectedItem(grocery.id);
                      await deleteGrocery.mutateAsync({ id: grocery.id });
                    }}
                    disabled={
                      deleteGrocery.isPending && selectedItem === grocery.id
                    }
                  >
                    {deleteGrocery.isPending && selectedItem === grocery.id ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash className="size-4" />
                    )}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
