import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [totalBusinesses, setTotalBusinesses] = useState<number | null>(null);

  useEffect(() => {
    const fetchBusinessCount = async () => {
      const { count, error } = await supabase
        .from("isletmeler")
        .select("*", { count: "exact", head: true });

      if (!error && count !== null) {
        setTotalBusinesses(count);
      }
    };

    fetchBusinessCount();
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
      </div>
    </div>
  );
}
