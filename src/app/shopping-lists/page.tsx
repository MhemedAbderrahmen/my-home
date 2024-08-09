import AddShoppingList from "~/components/shopping-lists/add-shopping-list";
import ListShoppingLists from "~/components/shopping-lists/list-shopping-lists";
import ListShoppingPaid from "~/components/shopping-lists/list-shopping-paid";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function ShoppingLists() {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <section className="flex w-full flex-col gap-4 md:max-w-screen-sm">
        <Card>
          <CardHeader>
            <CardTitle className="flex w-full flex-row items-center justify-between">
              🛒 Shopping Lists
              <AddShoppingList />
            </CardTitle>
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
