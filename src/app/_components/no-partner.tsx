"use client";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import PartnerCard from "~/components/link-partner/partner-card";
import { SkeletonLine } from "~/components/skeleton-line";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";

export const NoPartner = () => {
  const router = useRouter();
  const { data, isPending } = api.partners.get.useQuery();
  if (isPending) return <SkeletonLine />;
  if (data) return <PartnerCard userId={data.secondaryPartner} />;
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Partner Up!</CardTitle>
        <CardDescription>
          If you have a partner, you can invite them to join you on homely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => router.push("/link-partner")}
          >
            <Link className="mr-2 size-4" />
            Link Partner Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
