import AddShoppingList from "~/components/shopping-lists/add-shopping-list";
import ListShoppingLists from "~/components/shopping-lists/list-shopping-lists";
import ListShoppingPaid from "~/components/shopping-lists/list-shopping-paid";
import { Card, CardDescription, CardHeader } from "~/components/ui/card";

export default function ShoppingLists() {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <section className="flex w-full flex-col gap-4 md:max-w-screen-sm">
        <Card>
          <CardHeader>
            <div className="flex w-full flex-row items-center justify-between">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                🛒 Shopping Lists
              </h4>
              <AddShoppingList />
            </div>
            <CardDescription>Add a new shopping list</CardDescription>
          </CardHeader>
        </Card>
        <div className="flex flex-col gap-4">
          <ListShoppingLists />
          <ListShoppingPaid />
        </div>
      </section>
    </main>
  );
}
