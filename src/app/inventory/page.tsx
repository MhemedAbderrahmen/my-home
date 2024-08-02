import InventoryList from "~/components/inventory/inventory-list";

export default function Inventory() {
  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex w-full flex-row items-center justify-between">
        📦 House Inventory
      </div>
      <InventoryList />
    </main>
  );
}
