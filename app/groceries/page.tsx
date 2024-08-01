import AddGrocery from "@/components/groceries/add-grocery";

export default function Groceries() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div>List of Groceries</div>
      <AddGrocery />
    </main>
  );
}
