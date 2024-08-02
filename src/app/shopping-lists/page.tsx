import AddShoppingList from "~/components/shopping-lists/add-shopping-list";
import ListShoppingLists from "~/components/shopping-lists/list-shopping-lists";
import ListShoppingPaid from "~/components/shopping-lists/list-shopping-paid";

export default function ShoppingLists() {
  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex w-full flex-row items-center justify-between">
        🛒 Shopping Lists
        <AddShoppingList />
      </div>
      <ListShoppingLists />
      <ListShoppingPaid />
    </main>
  );
}
