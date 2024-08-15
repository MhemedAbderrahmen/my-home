"use client";

import { ThemeToggle } from "~/components/theme-toggle";

export function Footer() {
  return (
    <footer className="flex w-full items-center justify-center p-4">
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Created by{" "}
          <a href="https://abderrahmen.tn" target="_blank">
            abderrahmen.tn
          </a>
        </div>

        <ThemeToggle />
      </div>
    </footer>
  );
}
