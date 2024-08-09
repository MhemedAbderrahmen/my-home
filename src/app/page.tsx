import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import {
  Card,
  CardDescription,
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
        <br />
        <div className="flex flex-col gap-4">
          <SignedIn>
            <Card>
              <CardHeader>
                <CardTitle>Shopping Lists</CardTitle>
                <CardDescription>
                  Most Recent Shopping List: Groceries
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
                <CardDescription>
                  Your monthly shopping list expenses
                </CardDescription>
              </CardHeader>
            </Card>
          </SignedIn>
          <SignedOut>Sign In to manage your home</SignedOut>
        </div>
      </section>
    </main>
  );
}
