"use client";
import dayjs from "dayjs";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DEFAULT_DATE_FORMAT } from "~/lib/constants";
import { api } from "~/trpc/react";
import { SkeletonCard } from "../skeleton-card";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

export default function RecentList() {
  const router = useRouter();
  const { data, isPending } = api.shoppingList.getLatest.useQuery();

  if (isPending) return <SkeletonCard />;
  return (
    <Card className="col-span-1">
      <CardHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Shopping Lists
        </h4>
        <CardDescription>Most Recent Shopping List: Groceries</CardDescription>
      </CardHeader>
      <CardContent>
        {data ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div>
                {data.name} ({data.groceries.length} Groceries)
              </div>
              <small>{data.description}</small>
              <small className="text-muted-foreground">
                {dayjs(data.createdAt).format(DEFAULT_DATE_FORMAT)}
              </small>
            </div>
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => router.push(`/groceries/${data.id}`)}
            >
              <EyeIcon className="mr-2 size-4" /> View List
            </Button>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between">
            <div>No recent shopping lists found</div>
            <Button size={"sm"} onClick={() => router.push("/shopping-lists")}>
              New List
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
