"use client";

import { CheckIcon, CopyIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

export default function CodeGenerator() {
  const [isCopied, setIsCopied] = useState(false);

  const generateCode = api.partnerCode.create.useMutation({
    onMutate() {
      toast.loading("Generating Code...", { id: "loading" });
    },
    onSuccess() {
      toast.dismiss("loading");
      toast.success("Code Generated!");
    },
  });

  const copy = async () => {
    if (generateCode.data?.code) {
      await navigator.clipboard.writeText(generateCode.data?.code);
      setIsCopied(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Link Your Home Partner 🔗
        </h4>
        <CardDescription>Link Your Home Partner</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          You can generate a partner code here and send it to your partner to
          link up!
        </p>

        <div className="flex flex-row items-center justify-between text-center">
          <div>
            {generateCode.data?.code
              ? generateCode.data?.code
              : "Generate your code"}
          </div>
          <Button size={"icon"} variant={"outline"} onClick={() => copy()}>
            {isCopied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          </Button>
        </div>
        <div className="flex w-full">
          <Button
            onClick={() => generateCode.mutate()}
            className="w-full"
            size={"sm"}
            disabled={generateCode.isPending}
          >
            {generateCode.isPending && (
              <Loader2 className="mr-2 animate-spin" />
            )}
            Generate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
