"use client";

import ApplyCode from "~/components/link-partner/apply-code";
import CodeGenerator from "~/components/link-partner/code-generator";
import Partnership from "~/components/link-partner/partner-card";
import { SkeletonCard } from "~/components/skeleton-card";
import { api } from "~/trpc/react";

export default function PartnerCheck() {
  const { data, isPending } = api.partners.get.useQuery();
  if (isPending) return <SkeletonCard />;
  if (data) return <Partnership userId={data.secondaryPartner} />;
  return (
    <section className="flex w-full flex-col gap-4 md:max-w-screen-sm">
      <CodeGenerator />
      <ApplyCode />
    </section>
  );
}
