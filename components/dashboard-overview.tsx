"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function DashboardOverview() {
  const [totalCount, setTotalCount] = useState(0)
  const [todayCount, setTodayCount] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      const today = new Date().toISOString().split("T")[0]

      const { count: total } = await supabase
        .from("isletmeler")
        .select("*", { count: "exact", head: true })

      const { count: todayTotal } = await supabase
        .from("isletmeler")
        .select("*", { count: "exact", head: true })
        .gte("created_at", `${today}T00:00:00`)
        .lte("created_at", `${today}T23:59:59`)

      setTotalCount(total || 0)
      setTodayCount(todayTotal || 0)
    }

    fetchStats()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border rounded p-6 shadow">
        <h2 className="text-lg font-semibold mb-2">Bugün Eklenen İşletmeler</h2>
        <p className="text-3xl font-bold">{todayCount}</p>
      </div>
      <div className="border rounded p-6 shadow">
        <h2 className="text-lg font-semibold mb-2">Toplam İşletme Sayısı</h2>
        <p className="text-3xl font-bold">{totalCount}</p>
      </div>
    </div>
  )
}
