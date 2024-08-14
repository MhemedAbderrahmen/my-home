"use client";
import { SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "~/components/skeleton-card";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "~/components/ui/card";
import { api } from "~/trpc/react";

export const WelcomeWithAuth = () => {
  const { data, isPending } = api.user.me.useQuery();
  const router = useRouter();
  if (isPending) return <SkeletonCard />;
  return (
    <Card>
      <CardHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Welcome, {data?.username}! 👋
        </h4>
        <CardDescription>
          Welcome to homely, an app to help you manage your home.
        </CardDescription>
      </CardHeader>
      {data?.firstTimeSignIn ? (
        <CardContent>
          <div className="flex w-full flex-col gap-4">
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Complete your profile for a better experience!
            </p>
            <Button size={"sm"} onClick={() => router.push("/profile")}>
              <SettingsIcon className="mr-2 size-4" />
              Profile Settings
            </Button>
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
};
