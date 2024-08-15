"use client";
import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "~/lib/constants";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

export function NotificationsList() {
  const { data } = api.notifications.get.useQuery();
  return (
    <div className="flex w-full flex-col gap-4">
      <Card>
        <CardHeader>You have ( {data?.length} ) notifications</CardHeader>
        <CardContent>
          {data?.map((notification, index) => (
            <div key={index} className="flex flex-col gap-2">
              {notification.type === "INVITE" && (
                <div>
                  You have recieved an partner invite from{" "}
                  {notification.sender.username}{" "}
                </div>
              )}
              <small className="text-muted-foreground">
                {dayjs(notification.createdAt).format(DEFAULT_DATE_FORMAT)}
              </small>
              <div className="flex items-center justify-between gap-2">
                <Button className="w-full" variant={"destructive"}>
                  Decline
                </Button>
                <Button className="w-full">Accept</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
