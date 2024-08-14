import GeneralForm from "~/components/profile/general-form";
import { ProfileDisplay } from "~/components/profile/profile-display";
import { api, HydrateClient } from "~/trpc/server";

export default function Profile() {
  void api.user.me.prefetch();
  return (
    <HydrateClient>
      <main
        className="flex flex-col items-center justify-between p-4"
        suppressHydrationWarning
      >
        <section className="w-full md:max-w-screen-sm">
          <div className="flex flex-col gap-4">
            <ProfileDisplay />
            <GeneralForm />
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
