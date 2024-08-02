import InventoryList from "~/components/inventory/inventory-list";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export default function Inventory() {
  return (
    <main className="flex flex-col gap-4 p-4">
      <div className="flex w-full flex-row items-center justify-between">
        📦 House Inventory
      </div>
      <div className="flex flex-row gap-2">
        <Input placeholder="Search in your inventory" />
        <Button>Search</Button>
      </div>
      <Card className="grid grid-cols-3 p-2 text-center">
        <div>Name</div>
        <div>Quantity</div>
        <div>Actions</div>
      </Card>
      <InventoryList />
    </main>
  );
}
