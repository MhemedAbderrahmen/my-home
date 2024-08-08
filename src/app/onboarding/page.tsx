import OnboardingForm from "~/components/onboarding/onboarding-form";
import { HydrateClient } from "~/trpc/server";

export default function Onboarding() {
  return (
    <HydrateClient>
      <main
        className="flex flex-col items-center justify-between p-4"
        suppressHydrationWarning
      >
        <section className="w-full md:max-w-screen-sm">
          <OnboardingForm />
        </section>
      </main>
    </HydrateClient>
  );
}
