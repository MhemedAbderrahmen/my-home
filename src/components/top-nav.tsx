"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function TopNav() {
  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div>
        <div className="flex w-full flex-row gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/">
                <Button size={"icon"} variant={"outline"} className="text-lg">
                  🏠
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/shopping-lists">
                <Button size={"icon"} variant={"outline"} className="text-lg">
                  🛒
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Groceries</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/inventory">
                <Button size={"icon"} variant={"outline"} className="text-lg">
                  📦
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Inventory</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"outline"} className="text-lg">
                🔧
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Maintenance</p>
            </TooltipContent>
          </Tooltip>
          {/* <Button size={"icon"} variant={"outline"} className="text-lg">
            👪
          </Button>
          <Button size={"icon"} variant={"outline"} className="text-lg">
            💵
          </Button>
          <Button size={"icon"} variant={"outline"} className="text-lg">
            👌
          </Button> */}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
