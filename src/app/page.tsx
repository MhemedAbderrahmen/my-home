import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
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

export default function Home() {
  const { sessionClaims } = auth();
  return (
    <main
      className="flex flex-col items-center justify-between p-4"
      suppressHydrationWarning
    >
      <section className="w-full md:max-w-screen-sm">
        <br />
        <div className="flex flex-col gap-4">
          <SignedIn>
            <Card>
              <CardHeader>
                <CardTitle>
                  Welcome, {sessionClaims?.username as string}! 👋
                </CardTitle>
                <CardDescription>
                  Welcome to homely, an app to help you manage your home.
                </CardDescription>
              </CardHeader>
            </Card>
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
  );
}
