import CodeGenerator from "~/components/link-partner/code-generator";

export default function LinkPartner() {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-4 p-4">
      <section className="flex w-full flex-col gap-4 md:max-w-screen-sm">
        <CodeGenerator />
      </section>
    </main>
  );
}
