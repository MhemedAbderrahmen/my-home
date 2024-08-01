"use client";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export default function ListGroceries() {
  const utils = api.useUtils();
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const { data, isPending } = api.groceries.getAll.useQuery();
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

  if (isPending) return <div>Loading..</div>;
  return (
    <div className="flex w-full flex-col gap-4 text-center">
      <div>List of Groceries ({data?.length})</div>
      <ScrollArea className="flex h-[550px] w-full flex-col gap-2 rounded-md">
        <div className="flex flex-col gap-2">
          {data?.map((grocery, index) => (
            <Card
              key={index}
              className="flex w-full items-center justify-between p-2"
            >
              <small>{grocery.name}</small>
              <div>
                <Button
                  size="icon"
                  className="size-6"
                  variant={"destructive"}
                  onClick={() => {
                    setSelectedItem(grocery.id);
                    deleteGrocery.mutate({ id: grocery.id });
                  }}
                  disabled={deleteGrocery.isPending}
                >
                  {deleteGrocery.isPending && selectedItem === grocery.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash className="size-4" />
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
