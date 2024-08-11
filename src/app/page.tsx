import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import RecentList from "~/components/shopping-lists/recent-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";
import { Partner } from "./_components/no-partner";
import { UncompleteProfile } from "./_components/uncomplete-profile";

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
              <UncompleteProfile />
              <Partner />
              <RecentList />
              <Card>
                <CardHeader>
                  <CardTitle>Expenses</CardTitle>
                  <CardDescription>
                    Your monthly shopping list expenses
                  </CardDescription>
                </CardHeader>
              </Card>
            </SignedIn>
            <SignedOut>
              <Card>
                <CardHeader>
                  <CardTitle>Welcome 👋</CardTitle>
                  <CardDescription>
                    Welcome to homely, an app to help you manage your home.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Please sign in to start managing your home</p>
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
