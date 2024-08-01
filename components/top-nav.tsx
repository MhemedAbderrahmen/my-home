"use client";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function TopNav() {
  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div>
        <div className="w-full flex flex-row gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"outline"} className="text-lg">
                🏠
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant={"outline"} className="text-lg">
                🛒
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Groceries</p>
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
          <Button size={"icon"} variant={"outline"} className="text-lg">
            👪
          </Button>
          <Button size={"icon"} variant={"outline"} className="text-lg">
            💵
          </Button>
          <Button size={"icon"} variant={"outline"} className="text-lg">
            👌
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
