"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  grocery: z.string().min(2).max(50),
});

export default function AddGrocery() {
  const [groceries, setGroceries] = useState<string[]>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grocery: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setGroceries((prev) => prev?.concat(values.grocery));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-row gap-2">
          <FormField
            control={form.control}
            name="grocery"
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
          <Button type="submit" size="icon">
            <ShoppingBasket />
          </Button>
        </div>
      </form>
    </Form>
  );
}
