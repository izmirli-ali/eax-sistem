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
  const [totalCount, setTotalCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const { data, error } = await supabase
        .from("isletmeler")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setBusinesses(data);
        setTotalCount(data.length);

        const today = new Date().toISOString().split("T")[0];
        const todays = data.filter(b => b.created_at.startsWith(today));
        setTodayCount(todays.length);
      }

      setLoading(false);
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">📊 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded shadow">
          <h2 className="text-lg font-medium text-blue-800">Toplam İşletme</h2>
          <p className="text-3xl font-bold text-blue-900">{totalCount}</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-6 rounded shadow">
          <h2 className="text-lg font-medium text-green-800">Bugün Eklenen</h2>
          <p className="text-3xl font-bold text-green-900">{todayCount}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6 mb-4">📋 Kayıtlı İşletmeler</h2>
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
    </div>
  );
}
