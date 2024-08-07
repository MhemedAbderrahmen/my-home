import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main
      className="flex flex-col items-center justify-between p-4"
      suppressHydrationWarning
    >
      <div className="flex h-full w-full items-center justify-center">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </main>
  );
}
