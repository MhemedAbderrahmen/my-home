import AddGrocery from "~/components/groceries/add-grocery";
import ListGroceries from "~/components/groceries/list-groceries";
import { api, HydrateClient } from "~/trpc/server";

export default function Groceries() {
  void api.groceries.getLatest();
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-between p-4">
        <div>List of Groceries</div>
        <ListGroceries />
        <AddGrocery />
      </main>
    </HydrateClient>
  );
}
