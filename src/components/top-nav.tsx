"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BellIcon, BellRing } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function TopNav() {
  const { data } = api.notifications.get.useQuery();

  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div>
        <div className="flex w-full flex-row gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/">
                <Button size={"icon"} variant={"secondary"} className="text-lg">
                  🏠
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="leading-7 [&:not(:first-child)]:mt-6">Home</p>
            </TooltipContent>
          </Tooltip>
          <SignedIn>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/shopping-lists">
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    className="text-lg"
                  >
                    🛒
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Groceries
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/inventory">
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    className="text-lg"
                  >
                    📦
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Inventory
                </p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/profile">
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    className="text-lg"
                  >
                    🧑
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">Profile</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/notifications">
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    className="text-lg"
                  >
                    {data?.length ? (
                      <>
                        <BellRing className="size-4" />
                        <div className="h-1 w-1 rounded-full bg-red-700" />
                      </>
                    ) : (
                      <BellIcon className="size-4" />
                    )}
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Notifications
                </p>
              </TooltipContent>
            </Tooltip>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button size={"icon"} variant={"outline"} className="text-lg">
                🗝️
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
