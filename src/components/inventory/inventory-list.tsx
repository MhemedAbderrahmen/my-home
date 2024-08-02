/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Groceries } from "@prisma/client";
import { Loader2, MinusIcon, PlusIcon, SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/trpc/react";
import { SkeletonLine } from "../skeleton-line";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  itemName: z.string().optional(),
});

export default function InventoryList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const utils = api.useUtils();
  const [selectedGrocery, setSelectedGrocery] = useState<number | null>(null);

  const decrease = api.groceries.decrease.useMutation({
    async onSuccess({ quantity }) {
      await utils.inventory.getAll.invalidate();
      toast.success(`Decreased quantity by ${quantity}`);
    },
  });
  const increase = api.groceries.increase.useMutation({
    async onSuccess({ quantity }) {
      await utils.inventory.getAll.invalidate();
      toast.success(`Increased quantity by ${quantity}`);
    },
  });

  const { data, isPending } = api.inventory.getAll.useQuery({
    itemName: searchParams.get("itemName") ?? undefined,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(searchParams);

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-row gap-2">
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Search in your inventory" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 animate-spin" size={16} />
              ) : (
                <SearchIcon size={16} className="mr-2" />
              )}
              Search
            </Button>
          </div>
        </form>
      </Form>
      <Card className="grid grid-cols-3 p-2 text-center">
        <div>Name</div>
        <div>Quantity</div>
        <div>Actions</div>
      </Card>
      {isPending ? (
        <SkeletonLine />
      ) : (
        data?.Groceries.map((grocery: Groceries, index: number) => (
          <Card
            className={"grid grid-cols-3 items-center p-2 text-center"}
            key={index}
          >
            <div>{grocery.itemName}</div>
            <div>{grocery.quantity}</div>
            <div className="">
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() => {
                  increase.mutate({
                    id: grocery.id,
                  });
                  setSelectedGrocery(grocery.id);
                }}
                disabled={increase.isPending && selectedGrocery === grocery.id}
              >
                {selectedGrocery === grocery.id && increase.isPending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <PlusIcon size={16} />
                )}
              </Button>
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() => {
                  setSelectedGrocery(grocery.id);
                  decrease.mutate({
                    id: grocery.id,
                  });
                }}
                disabled={decrease.isPending && selectedGrocery === grocery.id}
              >
                {selectedGrocery === grocery.id && decrease.isPending ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <MinusIcon size={16} />
                )}
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
