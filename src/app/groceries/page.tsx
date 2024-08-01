import AddGrocery from "~/components/groceries/add-grocery";
import ListGroceries from "~/components/groceries/list-groceries";
import { HydrateClient } from "~/trpc/server";

export default function Groceries() {
  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-between gap-4 p-4">
        <ListGroceries />
        <AddGrocery />
      </main>
    </HydrateClient>
  );
}
