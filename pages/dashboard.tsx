import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const [recentBusinesses, setRecentBusinesses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCounts = async () => {
      const { count: totalCount } = await supabase
        .from("isletmeler")
        .select("*", { count: "exact", head: true });

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const { count: todayCount } = await supabase
        .from("isletmeler")
        .select("*", {
          count: "exact",
          head: true,
        })
        .gte("created_at", todayStart.toISOString());

      if (totalCount !== null) setTotal(totalCount);
      if (todayCount !== null) setToday(todayCount);
    };

    const fetchRecentBusinesses = async () => {
      const { data, error } = await supabase
        .from("isletmeler")
        .select("name, created_at")
        .order("created_at", { ascending: false })
        .limit(5);

      if (!error && data) {
        setRecentBusinesses(data);
      }
    };

    fetchCounts();
    fetchRecentBusinesses();
  }, []);

  const cards = [
    {
      title: "Toplam İşletme",
      icon: <DollarSign className="h-6 w-6 text-muted-foreground" />,
      value: total,
      description: "Hepsi bugüne kadar",
    },
    {
      title: "Bugün Eklenen",
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
      value: today,
      description: "Bugün oluşturulan kayıtlar",
    },
    {
      title: "Satışlar",
      icon: <CreditCard className="h-6 w-6 text-muted-foreground" />,
      value: "+12,234",
      description: "%19 geçen aydan",
    },
    {
      title: "Aktif Kullanıcılar",
      icon: <Activity className="h-6 w-6 text-muted-foreground" />,
      value: "+573",
      description: "+201 geçen aydan",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-xl p-6 border"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">{card.title}</span>
              {card.icon}
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border max-w-3xl">
        <h2 className="text-lg font-semibold mb-4">Son Eklenen İşletmeler</h2>
        <ul className="space-y-3">
          {recentBusinesses.length === 0 && (
            <li className="text-sm text-gray-400">Henüz kayıt yok</li>
          )}
          {recentBusinesses.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{item.name}</span>
              <span className="text-sm text-gray-500">
                {new Date(item.created_at).toLocaleString("tr-TR")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
