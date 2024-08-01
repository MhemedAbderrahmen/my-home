"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShoppingBasket } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export default function AddGrocery() {
  const utils = api.useUtils();
  const addGroceries = api.groceries.create.useMutation({
    async onSuccess() {
      await utils.groceries.invalidate();
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await addGroceries.mutateAsync(values);
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
                <FormDescription>
                  Fill this with your new grocery product
                </FormDescription>
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
