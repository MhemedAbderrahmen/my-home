import { auth } from "@clerk/nextjs/server";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = auth();

  // if (user.sessionClaims?.metadata.onboardingComplete) return redirect("/");
  return children;
}
