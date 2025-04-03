import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Business {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export default function Dashboard() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data, error } = await supabase
        .from("isletmeler")
        .select("id, name, email, phone, created_at")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBusinesses(data);
      }

      setLoading(false);
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📋 Kayıtlı İşletmeler</h1>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : businesses.length === 0 ? (
        <p>Henüz işletme kaydı yok.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">İsim</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Telefon</th>
              <th className="px-4 py-2">Tarih</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((b, i) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2 font-medium">{b.name}</td>
                <td className="px-4 py-2">{b.email}</td>
                <td className="px-4 py-2">{b.phone}</td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {new Date(b.created_at).toLocaleDateString("tr-TR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
