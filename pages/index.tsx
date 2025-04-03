import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        🚀 EAX Sistem'e Hoş Geldiniz!
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        İşletmenizi Google'da üst sıralara taşımak için hemen işletme profilinizi oluşturun.
      </p>
      <Link href="/ekle">
        <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          İşletmeni Ekle
        </button>
      </Link>
    </main>
  );
}
