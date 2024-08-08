"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

function OnboardingStep1() {
  return (
    <CardContent>
      <p>
        We&apos;re excited to have you on board! We&apos;re here to help you
        manage your home and make your life easier.
      </p>
      <p>
        Let&apos;s get started by setting up your account. We&apos;ll need some
        basic information to get you started.
      </p>
    </CardContent>
  );
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function OnboardingStep2() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </CardContent>
  );
}

export default function Onboarding() {
  const [step, setStep] = useState(1);
  return (
    <main
      className="flex flex-col items-center justify-between p-4"
      suppressHydrationWarning
    >
      <section className="w-full md:max-w-screen-sm">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Welcome to Homely</h2>
          </CardHeader>
          {step === 1 && <OnboardingStep1 />}
          {step === 2 && <OnboardingStep2 />}
          <CardFooter className="flex w-full justify-end gap-2">
            {
              // Hide the back button on the first step
              step > 1 && (
                <Button
                  variant={"outline"}
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  Back
                </Button>
              )
            }
            <Button onClick={() => setStep((prev) => prev + 1)}>Next</Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
