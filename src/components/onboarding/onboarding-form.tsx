"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { completeOnboarding } from "./_actions";

const First = () => {
  return (
    <CardContent>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Welcome to MyHome! Manage your groceries, shopping lists, and home
        inventory with ease.
      </p>
    </CardContent>
  );
};
const Second = () => {
  return (
    <CardContent>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Easily create shopping lists and add groceries to stay organized.
      </p>
    </CardContent>
  );
};
const Third = () => {
  return (
    <CardContent>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Keep track of your home inventory, add or remove items, and never run
        out of essentials.
      </p>
    </CardContent>
  );
};

const Fourth = () => {
  return (
    <CardContent>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Automatically transfer items from your shopping list to your inventory
        once you check out.
      </p>
    </CardContent>
  );
};

const formSchema = z.object({
  username: z.string(),
});

const Fifth = ({
  setUsername,
}: {
  setUsername: Dispatch<SetStateAction<string>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("🚀 ~ onSubmit ~ values:", values);
    setUsername(values.username);
  }

  return (
    <CardContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Username"
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <p className="leading-7 [&:not(:first-child)]:mt-6">
            By Filling this you will be able to send partner links access more
            functionalities
          </p>
        </form>
      </Form>
    </CardContent>
  );
};

export default function OnboardingForm() {
  const { user } = useUser();
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [username, setUsername] = useState<string>("");

  const initExpenses = api.expenses.create.useMutation({
    onMutate() {
      toast.loading("Initialising expenses..", { id: "init-expenses" });
    },
    onSuccess() {
      toast.dismiss("init-expenses");
      toast.success("Expenses initialised");
    },
  });

  const initiHousehold = api.household.create.useMutation({
    onMutate() {
      toast.loading("Initialising household...", { id: "init-household" });
    },
    onSuccess() {
      toast.dismiss("init-household");
      toast.success("Household initialised");
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

  async function onSubmit() {
    if (!username) {
      toast.error("Fill in your username");
    } else {
      await createUser.mutateAsync({
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        username,
        imageUrl: user?.imageUrl ?? "",
      });

      const household = await initiHousehold.mutateAsync();
      await initExpenses.mutateAsync({ householdId: household.id });

      await completeOnboarding();
      await user?.reload();
      router.push("/");
    }
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Welcome to Hestia</h2>
      </CardHeader>

      {step === 1 && <First />}
      {step === 2 && <Second />}
      {step === 3 && <Third />}
      {step === 4 && <Fourth />}
      {step === 5 && <Fifth setUsername={setUsername} />}

      <CardFooter className="flex w-full justify-end gap-2">
        {step > 1 && (
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </Button>
        )}
        {step < 5 ? (
          <Button size={"sm"} onClick={() => setStep((prev) => prev + 1)}>
            Next
          </Button>
        ) : (
          <Button
            size={"sm"}
            type="submit"
            disabled={createUser.isPending}
            onClick={() => onSubmit()}
          >
            {createUser.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Get Started
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
