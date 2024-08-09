"use client";
import { SettingsIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const UncompleteProfile = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Welcome! 👋</CardTitle>
        <CardDescription>
          Welcome to homely, an app to help you manage your home.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p>Complete your profile for a better experience!</p>
          <Button size={"sm"} variant={"outline"}>
            <SettingsIcon className="mr-2 size-4" />
            Profile Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
