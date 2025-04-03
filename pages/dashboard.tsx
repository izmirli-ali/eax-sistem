import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [totalBusinesses, setTotalBusinesses] = useState<number | null>(null);
  const [todayBusinesses, setTodayBusinesses] = useState<number | null>(null);

  useEffect(() => {
    const fetchBusinessStats = async () => {
      const { count: totalCount } = await supabase
        .from("isletmeler")
        .select("*", { count: "exact", head: true });
      setTotalBusinesses(totalCount || 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isoToday = today.toISOString();

      const { count: todayCount } = await supabase
        .from("isletmeler")
        .select("*", {
          count: "exact",
          head: true,
        })
        .gte("created_at", isoToday);

      setTodayBusinesses(todayCount || 0);
    };

    fetchBusinessStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Toplam Kayıtlı İşletme</h2>
          <p className="text-4xl mt-2 font-bold text-blue-600">
            {totalBusinesses !== null ? totalBusinesses : "..."}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Bugün Eklenen İşletme</h2>
          <p className="text-4xl mt-2 font-bold text-green-600">
            {todayBusinesses !== null ? todayBusinesses : "..."}
          </p>
        </div>
      </div>
    </div>
  );
}
