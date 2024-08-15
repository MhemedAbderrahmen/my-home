"use client";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import Partnership from "~/components/link-partner/partner-card";
import { SkeletonCard } from "~/components/skeleton-card";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";

export const Partner = () => {
  const router = useRouter();
  const { data, isPending } = api.partnership.get.useQuery();
  if (isPending) return <SkeletonCard />;
  if (data)
    return (
      <Partnership
        user_1Id={data.user_1Id ?? ""}
        user_2Id={data.user_2Id ?? ""}
      />
    );
  return (
    <Card className="min-h-48">
      <CardHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Partner Up!
        </h4>
        <CardDescription>
          If you have a partner, you can invite them to join you on hestia.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            You can link with your partner and manage your home together!
          </p>
          <Button size={"sm"} onClick={() => router.push("/link-partner")}>
            <Link className="mr-2 size-4" />
            Link Partner Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
