"use client";
import { api } from "~/trpc/react";
import { SkeletonCard } from "../skeleton-card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardHeader } from "../ui/card";

export function ProfileDisplay() {
  const { data, isPending } = api.user.me.useQuery();
  if (isPending) return <SkeletonCard />;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
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
      </CardHeader>
    </Card>
  );
}
