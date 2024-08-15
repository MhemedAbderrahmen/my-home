"use client";

import ApplyCode from "~/components/link-partner/apply-code";
import CodeGenerator from "~/components/link-partner/code-generator";
import Partnership from "~/components/link-partner/partner-card";
import { SkeletonCard } from "~/components/skeleton-card";
import { Card, CardDescription, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/react";
import { PartnerSearch } from "./partner-search";

export default function PartnerCheck() {
  const { data, isPending } = api.partnership.get.useQuery();
  if (isPending) return <SkeletonCard />;
  if (data)
    return <Partnership user_1Id={data.user_1Id} user_2Id={data.user_2Id} />;
  return (
    <section className="flex w-full flex-col gap-4 md:max-w-screen-sm">
      <Card>
        <CardHeader>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            WIP: This section is still work in progress
          </h4>
          <CardDescription>
            You can generate a link or accept a partner invite by filling the
            &quot; I&apos;have a partner&quot; Section
          </CardDescription>
        </CardHeader>
      </Card>
      <CodeGenerator />
      <ApplyCode />
      <PartnerSearch />
    </section>
  );
}
