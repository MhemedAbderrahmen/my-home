"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBasket, ShoppingCart } from "lucide-react";
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

const formSchema = z.object({
  payment: z.coerce.number().positive(),
});

export default function CheckoutList({ id }: { id: number }) {
  const utils = api.useUtils();
  const checkout = api.shoppingList.checkout.useMutation({
    async onSuccess() {
      toast.dismiss("create-shopping-list");
      toast.success("Shopping list created", { duration: 3000 });
      await utils.shoppingList.getAll.invalidate();
      await utils.shoppingList.getPaidLists.invalidate();
    },
    onMutate() {
      toast.loading("Creating shopping list", { id: "create-shopping-list" });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payment: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await checkout.mutateAsync({ ...values, id });
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <ShoppingCart size={16} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Checkout</DrawerTitle>
          <DrawerDescription>
            You can checkout your shopping list here to save the final details
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-2"
          >
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Payment</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="30 DT" {...field} />
                  </FormControl>
                  <FormDescription>
                    Fill this with the payment you made
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" size="sm">
              <ShoppingBasket className="mr-2" /> Save
            </Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
