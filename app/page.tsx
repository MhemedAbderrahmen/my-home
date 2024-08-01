import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className=" flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeToggle />
      <div className="flex flex-row gap-2 w-full">
        <Input placeholder="New grocery item" />
        <Button>Create</Button>
      </div>
    </main>
  );
}
