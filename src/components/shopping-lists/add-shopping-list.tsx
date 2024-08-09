"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusIcon, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(250),
});

export default function AddShoppingList() {
  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const createShoppingList = api.shoppingList.create.useMutation({
    async onSuccess() {
      toast.dismiss("create-shopping-list");
      toast.success("Shopping list created", { duration: 3000 });
      await utils.shoppingList.getAll.invalidate();

      setIsOpen(false);
    },
    onMutate() {
      toast.loading("Creating shopping list", { id: "create-shopping-list" });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createShoppingList.mutateAsync(values);
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DrawerTrigger asChild>
        <Button size={"sm"} onClick={() => setIsOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          New List
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a new shopping list?</DrawerTitle>
          <DrawerDescription>
            You will be able to add grocery items to this list later on.
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>List name</FormLabel>
                  <FormControl>
                    <Input placeholder="New grocery item" {...field} />
                  </FormControl>
                  <FormDescription>
                    Fill this with your new list name
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>List description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="New grocery description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Fill this with your new list description
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="sm"
              disabled={createShoppingList.isPending}
            >
              {createShoppingList.isPending ? (
                <Loader2 className="mr-2 animate-spin" />
              ) : (
                <ShoppingBasket className="mr-2" />
              )}
              Create Shopping List
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
