"use client";
import { DollarSignIcon } from "lucide-react";
import { api } from "~/trpc/react";
import { SkeletonCard } from "../skeleton-card";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

export default function MonthlyExpenses() {
  const { data, isPending } = api.expenses.getMonthly.useQuery();

  if (isPending) return <SkeletonCard />;
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Monthly Revenues
          </h4>
          <DollarSignIcon />
        </div>

        <CardDescription>Your monthly shopping list expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          DT {data}
        </h3>
      </CardContent>
    </Card>
  );
}
