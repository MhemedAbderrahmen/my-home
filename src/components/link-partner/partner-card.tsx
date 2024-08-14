import { api } from "~/trpc/react";
import { SkeletonLine } from "../skeleton-line";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

export default function Partnership({
  primaryUserId,
  secondaryUserId,
}: {
  primaryUserId: string;
  secondaryUserId: string;
}) {
  const { data: primaryUser, isPending: primaryPending } =
    api.user.get.useQuery({
      userId: primaryUserId,
    });
  const { data: secondaryUser, isPending: secondaryPending } =
    api.user.get.useQuery({
      userId: secondaryUserId,
    });

  return (
    <Card className="min-h-48">
      <CardHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Shared with partner
        </h4>
        <CardDescription>
          You already have a partner, you cant have more than one
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {primaryPending ? (
          <SkeletonLine />
        ) : (
          <div>
            <div className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={primaryUser?.imageUrl} alt="@shadcn" />
                <AvatarFallback>a</AvatarFallback>
              </Avatar>
              <div>
                <div>{primaryUser?.username}</div>
                <small className="text-muted-foreground">
                  {primaryUser?.email}
                </small>
              </div>
            </div>
          </div>
        )}
        {secondaryPending ? (
          <SkeletonLine />
        ) : (
          <div>
            <div className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={secondaryUser?.imageUrl} alt="@shadcn" />
                <AvatarFallback>a</AvatarFallback>
              </Avatar>
              <div>
                <div>{secondaryUser?.username}</div>
                <small className="text-muted-foreground">
                  {secondaryUser?.email}
                </small>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
