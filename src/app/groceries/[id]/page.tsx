import AddGrocery from "~/components/groceries/add-grocery";
import ListGroceries from "~/components/groceries/list-groceries";
import { HydrateClient } from "~/trpc/server";

export default function Groceries({ params }: { params: { id: number } }) {
  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-between gap-4 p-4">
        <section className="w-full md:max-w-screen-sm">
          <div className="flex w-full flex-row items-center justify-between">
            🛒 Groceries Lists
            <AddGrocery id={params.id} />
          </div>
          <ListGroceries id={params.id} />
        </section>
      </main>
    </HydrateClient>
  );
}
