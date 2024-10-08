import { NotificationsList } from "~/components/notifications/notifications-list";
import { HydrateClient } from "~/trpc/server";

export default function Notifications() {
  return (
    <HydrateClient>
      <main
        className="flex flex-col items-center justify-between p-4"
        suppressHydrationWarning
      >
        <section className="w-full md:max-w-screen-sm">
          <div className="flex flex-col gap-4">
            <NotificationsList />
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
