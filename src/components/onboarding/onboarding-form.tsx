"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { completeOnboarding } from "./_actions";
const formSchema = z.object({
  partner: z.string().optional(),
});

export default function OnboardingForm() {
  const { user } = useUser();
  const router = useRouter();

  const initiHousehold = api.household.create.useMutation({
    onMutate() {
      toast.loading("Creating household...", { id: "create-household" });
    },
    onSuccess() {
      toast.dismiss("create-household");
      toast.success("Household created successfully");
    },
  });

  const createUser = api.user.create.useMutation({
    onMutate() {
      toast.loading("Creating user...", { id: "create-user" });
    },
    onSuccess() {
      toast.dismiss("create-user");
      toast.success("User created successfully");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partner: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createUser.mutateAsync(values);
    await initiHousehold.mutateAsync();

    await completeOnboarding();
    await user?.reload();

    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Welcome to Homely</h2>
          </CardHeader>
          <CardContent>
            <p>If you dont have a partner you can skip this step</p>
            <FormField
              control={form.control}
              name="partner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partner username</FormLabel>
                  <FormControl>
                    <Input placeholder="Wifey" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is optional, but if for a better experience, you can
                    link your partner to your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex w-full justify-end gap-2">
            <CardFooter>
              <Button type="submit" disabled={createUser.isPending}>
                {createUser.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </CardFooter>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
