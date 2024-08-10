"use client";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const NoPartner = () => {
  const router = useRouter();
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
