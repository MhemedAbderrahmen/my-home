"use client";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_DATE_FORMAT } from "~/lib/constants";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

function InviteNotification({
  id,
  userId,
  username,
  createdAt,
}: {
  id: number;
  userId: string;
  username: string;
  createdAt: Date;
}) {
  const utils = api.useUtils();
  const deleteNotification = api.notifications.delete.useMutation();
  const deleteInvitation = api.invitations.delete.useMutation();
  const acceptInvite = api.partnership.create.useMutation({
    onMutate() {
      toast.loading("Accepting Invite", { id: "loading" });
    },
    async onSuccess() {
      await clearNotificationAndInvite();
      toast.dismiss("loading");
      toast.success("Partner accepted");
    },
  });

  async function clearNotificationAndInvite() {
    await deleteNotification.mutateAsync({ id });
    await deleteInvitation.mutateAsync();
    await utils.notifications.invalidate();
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        You have recieved an partner invite from:{" "}
        <b className="text-primary underline">{username}</b>
      </div>
      <small className="text-muted-foreground">
        {dayjs(createdAt).format(DEFAULT_DATE_FORMAT)}
      </small>
      <div className="flex items-center justify-between gap-2">
        <Button
          className="w-full"
          variant={"destructive"}
          size={"sm"}
          onClick={() => clearNotificationAndInvite()}
          disabled={deleteInvitation.isPending}
        >
          {deleteInvitation.isPending && (
            <Loader2 className="mr-2 animate-spin" size={16} />
          )}
          Decline
        </Button>
        <Button
          className="w-full"
          size={"sm"}
          onClick={() => acceptInvite.mutate({ userId })}
          disabled={acceptInvite.isPending}
        >
          {acceptInvite.isPending && (
            <Loader2 className="mr-2 animate-spin" size={16} />
          )}
          Accept
        </Button>
      </div>
    </div>
  );
}

export function NotificationsList() {
  const { data } = api.notifications.get.useQuery();
  return (
    <div className="flex w-full flex-col gap-4">
      <Card>
        <CardHeader>You have ( {data?.length} ) notifications</CardHeader>
        <CardContent>
          {data?.map((notification, index) => (
            <div key={index}>
              {notification.type === "INVITE" && (
                <InviteNotification
                  id={notification.id}
                  userId={notification.sender.clerkId}
                  username={notification.sender.username}
                  createdAt={notification.createdAt}
                />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
