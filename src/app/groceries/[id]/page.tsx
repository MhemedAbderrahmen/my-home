import AddGrocery from "~/components/groceries/add-grocery";
import ListGroceries from "~/components/groceries/list-groceries";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { HydrateClient } from "~/trpc/server";

export default function Groceries({ params }: { params: { id: number } }) {
  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-between gap-4 p-4">
        <section className="flex w-full flex-col gap-4 md:max-w-screen-sm">
          <Card>
            <CardHeader>
              <CardTitle className="flex w-full flex-row items-center justify-between">
                🛒 Groceries Lists
                <AddGrocery id={params.id} />
              </CardTitle>
              <CardDescription>
                Add a new grocery item to your list
              </CardDescription>
            </CardHeader>
          </Card>
          <ListGroceries id={params.id} />
        </section>
      </main>
    </HydrateClient>
  );
}
