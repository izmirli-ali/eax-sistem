import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export default function Dashboard() {
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [todayCount, setTodayCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      const { count: total, error: totalError } = await supabase
        .from("isletmeler")
        .select("*", { count: "exact", head: true });

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { count: todayTotal, error: todayError } = await supabase
        .from("isletmeler")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString());

      if (!totalError) setTotalCount(total);
      if (!todayError) setTodayCount(todayTotal);
    };

    fetchCounts();
  }, []);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="border p-4 rounded-lg bg-white shadow">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Toplam İşletme</p>
            <DollarSign className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">{totalCount ?? "..."}</p>
          <p className="text-xs text-muted-foreground">Hepsi bugüne kadar</p>
        </div>

        <div className="border p-4 rounded-lg bg-white shadow">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Bugün Eklenen</p>
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">{todayCount ?? "..."}</p>
          <p className="text-xs text-muted-foreground">Bugün oluşturulan kayıtlar</p>
        </div>

        <div className="border p-4 rounded-lg bg-white shadow">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Satışlar</p>
            <CreditCard className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">+12,234</p>
          <p className="text-xs text-muted-foreground">%19 geçen aydan</p>
        </div>

        <div className="border p-4 rounded-lg bg-white shadow">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Aktif Kullanıcılar</p>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold mt-2">+573</p>
          <p className="text-xs text-muted-foreground">%201 geçen aydan</p>
        </div>
      </div>
    </div>
  );
}
