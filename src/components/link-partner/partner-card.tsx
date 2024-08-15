import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { SkeletonLine } from "../skeleton-line";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

export default function Partnership({
  user_1Id,
  user_2Id,
}: {
  user_1Id: string;
  user_2Id: string;
}) {
  const router = useRouter();
  const { data: primaryUser, isPending: primaryPending } =
    api.user.get.useQuery({
      userId: user_1Id,
    });
  const { data: secondaryUser, isPending: secondaryPending } =
    api.user.get.useQuery({
      userId: user_2Id,
    });

  const unlink = api.partnership.delete.useMutation({
    onMutate() {
      toast.loading("Unlinking partner..", { id: "loading" });
    },
    async onSuccess() {
      toast.dismiss("loading");
      toast.success("Unlinked partner", { duration: 10000 });
      router.refresh();
    },
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
        <div className="flex flex-row items-center justify-between gap-2">
          <p>
            You can always unlink your partner and link with another user if you
            want to.
          </p>
          <Button onClick={() => unlink.mutate()} disabled={unlink.isPending}>
            {unlink.isPending && (
              <Loader2 className="mr-2 animate-spin" size={16} />
            )}
            Unlink
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
