import { api, HydrateClient } from "~/trpc/server";
import PartnerCheck from "../_components/partner-check";

export default function LinkPartner() {
  void api.partnership.get.prefetch();
  return (
    <HydrateClient>
      <main className="flex w-full flex-col items-center justify-center gap-4 p-4">
        <PartnerCheck />
      </main>
    </HydrateClient>
  );
}
