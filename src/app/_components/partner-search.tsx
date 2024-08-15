"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

const formSchema = z.object({
  username: z.string(),
});

function UserInviteCard({
  data,
}: {
  data:
    | {
        id: number;
        clerkId: string;
        username: string;
        email: string;
        imageUrl: string;
        firstTimeSignIn: boolean;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        partnersId: number | null;
      }
    | undefined;
}) {
  const sendNotification = api.notifications.create.useMutation();
  const sendInvite = api.invitations.create.useMutation({
    onMutate() {
      toast.loading("Sending Invite..", { id: "loading" });
    },
    async onSuccess({ userId }) {
      await sendNotification.mutateAsync({ to: userId, type: "INVITE" });

      toast.dismiss("loading");
      toast.success("Invite Sent!", { duration: 10000 });
    },
  });

  async function handleSubmit() {
    if (data)
      await sendInvite.mutateAsync({
        to: data.clerkId,
      });
  }

  if (!data) <div>Error</div>;
  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-4">
        <Avatar>
          <AvatarImage src={data?.imageUrl} alt="@shadcn" />
          <AvatarFallback>a</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <small className="text-sm font-medium leading-none">
            {data?.username}
          </small>
          <small className="text-sm font-medium leading-none">
            {data?.email}
          </small>
          <CardDescription>{data?.description}</CardDescription>
        </div>
        <div>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => handleSubmit()}
            disabled={sendInvite.isPending}
          >
            {sendInvite.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <UserPlus size={16} />
            )}
          </Button>
        </div>
      </div>
      {sendInvite.isError ?? <div>Error sending out an invite</div>}
    </div>
  );
}
export function PartnerSearch() {
  const search = api.user.findWithUsername.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await search.mutateAsync(values);
  }

  return (
    <Card>
      <CardHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Search for a partner :search_emojie
        </h4>
        <CardDescription>
          Enter the username of your partner you are looking for!
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
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder={"Jeff"} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button size={"sm"} type="submit">
                Search
              </Button>
            </div>
          </form>
        </Form>
        {search.isError && <div>Not Found</div>}
        {search.isPending && (
          <Loader2 className="flex w-full animate-spin items-center" />
        )}
        {search.data && <UserInviteCard data={search.data} />}
      </CardContent>
    </Card>
  );
}
