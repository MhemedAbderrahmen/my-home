import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-between p-4"
      suppressHydrationWarning
    >
      <Card>
        <CardHeader>
          <CardTitle>Welcome! 👋</CardTitle>
          <CardDescription>
            Welcome to homely, an app to help you manage your home.
          </CardDescription>
        </CardHeader>
      </Card>
      <br />
      Overview
    </main>
  );
}
