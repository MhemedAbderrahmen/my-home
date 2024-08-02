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
      <InventoryList />
      <div className="flex flex-row gap-2">
        <Input placeholder="Search in your inventory" />
        <Button>Search</Button>
      </div>
      <Card className="grid grid-cols-4 p-2 text-center">
        <div>Name</div>
        <div>Quantity</div>
        <div>Threshold</div>
        <div>Unit</div>
      </Card>
      <Card className="grid grid-cols-4 p-2 text-center">
        <div>🥛 Milk</div>
        <div>3</div>
        <div>3</div>
        <div>liters</div>
      </Card>
      <Card className="grid grid-cols-4 p-2 text-center">
        <div>💧 Water</div>
        <div>3</div>
        <div>3</div>
        <div>packs</div>
      </Card>
    </main>
  );
}
