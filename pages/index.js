import MainLayout from "@/components/layouts/MainLayout";
import MainForm from "@/components/forms/MainForm";
export default function Index() {
  return (
    <MainLayout>
      <div className="w-full">
        <div className="mx-auto max-w-2xl py-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Soles & Dragons 🥵 🐉
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 px-2">
            Create your own fictional role characters using AI and collect them
            as unique NFTs sent directly to your Solana wallet.
          </p>{" "}
          <div className="formcontainer my-4 w-full flex flex-col justify-center items-center ">
            <div className="max-w-md w-full px-4">
              <MainForm />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
