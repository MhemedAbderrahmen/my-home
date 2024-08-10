import { api } from "~/trpc/react";
import { SkeletonLine } from "../skeleton-line";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function PartnerCard({ userId }: { userId: string }) {
  const { data, isPending } = api.user.get.useQuery({ userId });
  if (isPending) return <SkeletonLine />;
  return (
    <Card className="min-h-48">
      <CardHeader>
        <CardTitle>You have a partner!</CardTitle>
        <CardDescription>
          You already have a partner, you cant have more than one
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>You can unlink at any time</p>
        <div className="rounded-md border p-2">
          <div className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={data?.imageUrl} alt="@shadcn" />
              <AvatarFallback>a</AvatarFallback>
            </Avatar>
            <div>
              <div>{data?.username}</div>
              <small className="text-muted-foreground">{data?.email}</small>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
