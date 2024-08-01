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

      {/* <small>Shopping Lists will be here soon!</small>
      <div className="flex w-full gap-2">
        <Card className="flex w-full flex-row items-center justify-between p-2">
          <div className="flex items-center gap-2">🍔 Weekly List</div>
          <small className="text-muted-foreground">18/05/2024</small>
        </Card>
      </div> */}
    </main>
  );
}
