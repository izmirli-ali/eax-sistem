import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"

export default function Dashboard() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      const { count, error } = await supabase
        .from("isletmeler")
        .select("*", { count: "exact", head: true })

      if (!error) setCount(count)
    }

    fetchCount()
  }, [])

  return (
    <div style={{ padding: "40px", fontSize: "18px" }}>
      <h1>📊 Dashboard</h1>
      <p>Toplam kayıtlı işletme sayısı: <strong>{count ?? "Yükleniyor..."}</strong></p>
    </div>
  )
}
