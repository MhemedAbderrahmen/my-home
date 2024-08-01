import AddShoppingList from "~/components/shopping-lists/add-shopping-list";
import ListShoppingLists from "~/components/shopping-lists/list-shopping-lists";

export default function ShoppingLists() {
  return (
    <main className="flex flex-col items-center justify-between gap-4 p-4">
      <div className="flex w-full flex-row items-center justify-between">
        Shopping Lists
        <AddShoppingList />
      </div>
      <ListShoppingLists />
    </main>
  );
}
