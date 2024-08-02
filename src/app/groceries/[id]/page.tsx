import AddGrocery from "~/components/groceries/add-grocery";
import ListGroceries from "~/components/groceries/list-groceries";
import { HydrateClient } from "~/trpc/server";

export default function Groceries({ params }: { params: { id: number } }) {
  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-between gap-4 p-4">
        <div>List of Groceries</div>
        <AddGrocery id={params.id} />
        <ListGroceries id={params.id} />
      </main>
    </HydrateClient>
  );
}
