import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Isletme = {
  id: number;
  name: string;
  category: string;
  created_at: string;
};

export default function Dashboard() {
  const [isletmeler, setIsletmeler] = useState<Isletme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data, error } = await supabase
        .from("isletmeler")
        .select("id, name, category, created_at")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setIsletmeler(data);
      }

      setLoading(false);
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">📋 Kayıtlı İşletmeler</h1>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : isletmeler.length === 0 ? (
        <p>Henüz işletme kaydı yok.</p>
      ) : (
        <div className="space-y-4">
          {isletmeler.map((isletme) => (
            <div
              key={isletme.id}
              className="border rounded-md p-4 bg-white shadow-sm"
            >
              <h2 className="text-lg font-bold">{isletme.name}</h2>
              <p className="text-sm text-gray-600">Kategori: {isletme.category || "Belirtilmemiş"}</p>
              <p className="text-sm text-gray-500">Kayıt tarihi: {new Date(isletme.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
