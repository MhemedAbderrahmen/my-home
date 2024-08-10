"use client";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

export default function ApplyCode() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>I have a partner code</CardTitle>
        <CardDescription>
          You recieved a partner code? Paste it here and you will link up
          automatically
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>
          You can generate a partner code here and send it to your partner to
          link up!
        </p>
        <div className="flex flex-row items-center gap-2">
          <Input placeholder="Paste your code here" />
          <Button size={"sm"}>Validate</Button>
        </div>
      </CardContent>
    </Card>
  );
}
