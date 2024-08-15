"use client";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "~/lib/constants";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

function InviteNotification({
  username,
  createdAt,
}: {
  username: string;
  createdAt: Date;
}) {
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
        <Button className="w-full" variant={"destructive"}>
          Decline
        </Button>
        <Button className="w-full">Accept</Button>
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
