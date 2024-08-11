import GeneralForm from "~/components/profile/general-form";
import { HydrateClient } from "~/trpc/server";

export default function Profile() {
  return (
    <HydrateClient>
      <main
        className="flex flex-col items-center justify-between p-4"
        suppressHydrationWarning
      >
        <section className="w-full md:max-w-screen-sm">
          <div className="flex flex-col gap-4">
            <GeneralForm />
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
