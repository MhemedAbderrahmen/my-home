import TopNav from "@/components/top-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-4"
      suppressHydrationWarning
    >
      <div className="flex flex-row items-center gap-16 w-full justify-center">
        <div>housely</div>
        <TopNav />
      </div>
      <div className="flex flex-row gap-2 w-full">
        <Input placeholder="New grocery item" />
        <Button>Create</Button>
      </div>
    </main>
  );
}
