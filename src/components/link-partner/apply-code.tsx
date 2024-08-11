"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  code: z.string(),
});

export default function ApplyCode() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const searchCode = api.partnerCode.get.useMutation({
    onMutate() {
      toast.loading("Applying Code", { id: "loading" });
    },
    onError() {
      toast.dismiss("loading");
      toast.error("Cannot apply this code");
    },
    onSuccess() {
      toast.dismiss("loading");
      toast.success("Successfully applied code");
    },
  });

  const declineCode = api.partnerCode.decline.useMutation({
    onMutate() {
      toast.loading("Declining Partner Link", { id: "loading" });
    },
    onSuccess() {
      searchCode.reset();
      toast.dismiss("loading");
      toast.success("Partner Link declined");
    },
  });

  const acceptCode = api.partnerCode.accept.useMutation({
    onMutate() {
      toast.loading("Accepting Partner Link", { id: "loading" });
    },
    onSuccess() {
      searchCode.reset();
      toast.dismiss("loading");
      toast.success("Partner Link accepted");
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await searchCode.mutateAsync(values);
  }

  return (
    <Card>
      <CardHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          I have a partner code
        </h4>
        <CardDescription>
          You recieved a partner code? Paste it here and you will link up
          automatically
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-row items-center gap-2">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder={"7a267893-25c2-448c-8e54-01f34a281017"}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button size={"sm"} type="submit">
                Validate
              </Button>
            </div>
          </form>
        </Form>
        {searchCode.isPending && (
          <Loader2 className="w-full animate-spin justify-center" />
        )}
        {searchCode.data ? (
          <div className="rounded-md border p-2">
            <div className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={searchCode?.data.creator.imageUrl}
                  alt="@shadcn"
                />
                <AvatarFallback>a</AvatarFallback>
              </Avatar>
              <div>
                <div>{searchCode.data?.creator.username}</div>
                <small className="text-muted-foreground">
                  {searchCode.data?.creator.email}
                </small>
              </div>
            </div>
            <div className="flex w-full justify-end gap-2">
              <Button
                size={"sm"}
                variant={"destructive"}
                onClick={() =>
                  declineCode.mutate({ code: form.getValues("code") })
                }
                disabled={declineCode.isPending}
              >
                {declineCode.isPending && (
                  <Loader2 className="mr-2 animate-spin" />
                )}
                Decline
              </Button>
              <Button
                size={"sm"}
                onClick={() =>
                  acceptCode.mutate({ code: form.getValues("code") })
                }
                disabled={acceptCode.isPending}
              >
                {acceptCode.isPending && (
                  <Loader2 className="mr-2 animate-spin" />
                )}
                Accept
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
