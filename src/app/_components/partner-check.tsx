"use client";

import ApplyCode from "~/components/link-partner/apply-code";
import CodeGenerator from "~/components/link-partner/code-generator";
import PartnerCard from "~/components/link-partner/partner-card";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export default function PartnerCheck() {
  const { data, isPending } = api.partners.get.useQuery();
  if (isPending) return <Skeleton />;
  if (data) return <PartnerCard userId={data.secondaryPartner} />;
  return (
    <section className="flex w-full flex-col gap-4 md:max-w-screen-sm">
      <CodeGenerator />
      <ApplyCode />
    </section>
  );
}
