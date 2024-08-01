"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShoppingBasket } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export default function AddGrocery({ id }: { id: number }) {
  const utils = api.useUtils();
  const addGroceries = api.groceries.create.useMutation({
    async onSuccess() {
      toast.dismiss("add-grocery");
      toast.success("Grocery added successfully!", { duration: 3000 });
      await utils.groceries.invalidate();
    },
    onMutate() {
      toast.loading("Adding grocery..", { id: "add-grocery" });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await addGroceries.mutateAsync({ ...values, shoppingListId: id });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-row gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="New grocery item" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" size="icon" disabled={addGroceries.isPending}>
            {addGroceries.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ShoppingBasket />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
