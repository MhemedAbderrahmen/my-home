import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import MonthlyExpenses from "~/components/expenses/monthly-expenses";
import RecentList from "~/components/shopping-lists/recent-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";
import { Partner } from "./_components/no-partner";
import { WelcomeWithAuth } from "./_components/welcome-with-auth";

export default function Home() {
  return (
    <HydrateClient>
      <main
        className="flex flex-col items-center justify-between p-4"
        suppressHydrationWarning
      >
        <section className="w-full md:max-w-screen-sm">
          <div className="flex flex-col gap-4">
            <SignedIn>
              <WelcomeWithAuth />
              <MonthlyExpenses />
              <RecentList />
              <Partner />
            </SignedIn>
            <SignedOut>
              <Card>
                <CardHeader>
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Welcome 👋
                  </h4>
                  <CardDescription>
                    Welcome to hestia, an app to help you manage your home.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Please sign in to start managing your home
                  </p>
                </CardContent>
                <CardFooter className="justify-center">
                  <Link
                    href={"/sign-in"}
                    legacyBehavior
                    className="hover:text-primary"
                  >
                    Join Now!
                  </Link>
                </CardFooter>
              </Card>
            </SignedOut>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
