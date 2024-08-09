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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const formSchema = z.object({
  itemName: z.string().min(2).max(50),
  quantity: z.coerce.number().positive(),
  threshhold: z.coerce.number().positive(),
  unit: z.string().min(2).max(50),
});

export default function AddGrocery({ id }: { id: number }) {
  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState(false);

  const addGrocery = api.groceries.create.useMutation({
    async onSuccess() {
      toast.dismiss("create-shopping-list");
      toast.success("Shopping list created", { duration: 3000 });
      await utils.groceries.getAll.invalidate();
      setIsOpen(false);
    },
    onMutate() {
      toast.loading("Creating shopping list", { id: "create-shopping-list" });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      quantity: 0,
      threshhold: 0,
      unit: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await addGrocery.mutateAsync({
      ...values,
      shoppingListId: id,
    });
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DrawerTrigger asChild>
        <Button size={"sm"} onClick={() => setIsOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Grocery
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[600px]">
        <DrawerHeader>
          <DrawerTitle>Add a new grocery to the list</DrawerTitle>
          <DrawerDescription>
            You can add an existing item from the database or create a custom
            one
          </DrawerDescription>
        </DrawerHeader>
        <Tabs defaultValue="custom">
          <TabsList className="w-full">
            <TabsTrigger value="db" className="w-full">
              From DB
            </TabsTrigger>
            <TabsTrigger value="custom" className="w-full">
              Custom
            </TabsTrigger>
          </TabsList>
          <TabsContent value="db">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="custom">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 p-2"
              >
                <FormField
                  control={form.control}
                  name="itemName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="New grocery item" {...field} />
                      </FormControl>
                      <FormDescription>
                        Fill this with your grocery name
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <div className="flex flex-row items-center gap-2">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="10" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="threshhold"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Threshhold</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="30" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input placeholder="Liters" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" size="sm" disabled={addGrocery.isPending}>
                  {addGrocery.isPending ? (
                    <Loader2 className="mr-2 animate-spin" />
                  ) : (
                    <ShoppingBasket className="mr-2" />
                  )}
                  Create Shopping List
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
}
