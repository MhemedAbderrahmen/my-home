"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/trpc/react";
import { SkeletonCard } from "../skeleton-card";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  bio: z.string(),
});

export default function GeneralForm() {
  const { data, isPending } = api.user.me.useQuery();
  const updateProfile = api.user.update.useMutation({
    onMutate() {
      toast.loading("Updating profile...", { id: "update-profile" });
    },
    onSuccess() {
      toast.dismiss("update-profile");
      toast.success("Profile updated");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateProfile.mutateAsync(values);
  }

  useEffect(() => {
    if (data) {
      form.setValue("email", data.email);
      form.setValue("username", data.username);
    }
  }, [data]);

  if (isPending) return <SkeletonCard />;
  return (
    <Card>
      <CardHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Profile 🧑
        </h4>
        <CardDescription>Your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-2"
          >
            <div className="flex w-full flex-col items-center justify-center">
              <div>
                <Avatar>
                  <AvatarImage src={data?.imageUrl} className="size-12" />
                  <AvatarFallback>{data?.username}</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your display username
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>Your primary e-mail address</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Bio / Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type in your bio or description that will be displayed on your profile!"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This describe you and your interests
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={"sm"}
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending && (
                <Loader2 className="mr-2 animate-spin" />
              )}
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
