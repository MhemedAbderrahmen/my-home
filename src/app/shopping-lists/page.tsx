import AddShoppingList from "~/components/shopping-lists/add-shopping-list";
import ListShoppingLists from "~/components/shopping-lists/list-shopping-lists";
import ListShoppingPaid from "~/components/shopping-lists/list-shopping-paid";

export default function ShoppingLists() {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <section className="w-full md:max-w-screen-sm">
        <div className="flex w-full flex-row items-center justify-between">
          🛒 Shopping Lists
          <AddShoppingList />
        </div>
        <div className="flex flex-col gap-4">
          <ListShoppingLists />
          <ListShoppingPaid />
        </div>
      </section>
    </main>
  );
}
