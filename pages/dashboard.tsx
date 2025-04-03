import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [totalBusinesses, setTotalBusinesses] = useState<number | null>(null);
  const [todayBusinesses, setTodayBusinesses] = useState<number | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      // Tüm kayıt sayısını al
      const { count: totalCount, error: totalError } = await supabase
        .from("isletmeler")
        .select("*", { count: "exact", head: true });

      // Bugünün tarihi (örneğin: 2025-04-03)
      const today = new Date().toISOString().split("T")[0];

      // Bugün eklenenleri filtreleyerek al
      const { count: todayCount, error: todayError } = await supabase
        .from("isletmeler")
        .select("*", {
          count: "exact",
          head: true,
        })
        .gte("created_at", `${today}T00:00:00`);

      // State güncellemeleri
      if (!totalError && totalCount !== null) {
        setTotalBusinesses(totalCount);
      }

      if (!todayError && todayCount !== null) {
        setTodayBusinesses(todayCount);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📊 Dashboard</h1>

      <div
        style={{
          marginTop: "2rem",
          padding: "2rem",
          border: "1px solid #eee",
          borderRadius: "10px",
          maxWidth: "400px",
          background: "#f9f9f9",
        }}
      >
        <h2>Toplam Kayıtlı İşletme:</h2>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
          {totalBusinesses !== null ? totalBusinesses : "Yükleniyor..."}
        </p>

        <hr style={{ margin: "1rem 0" }} />

        <h2>Bugün Eklenenler:</h2>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {todayBusinesses !== null ? todayBusinesses : "Yükleniyor..."}
        </p>
      </div>
    </div>
  );
}
