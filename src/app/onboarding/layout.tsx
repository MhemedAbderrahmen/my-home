import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = auth();

  if (user.sessionClaims?.metadata.onboardingComplete) return redirect("/");
  return children;
}
