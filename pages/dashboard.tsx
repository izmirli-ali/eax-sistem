import { supabase } from "@/lib/supabaseClient";

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("istatistikler")
    .select("aktif_isletme_sayisi")
    .eq("id", 1);

  if (error) {
    console.error("Veri çekilemedi:", error.message);
    return { props: { aktif_isletme_sayisi: 0 } };
  }

  return {
    props: {
      aktif_isletme_sayisi: data[0]?.aktif_isletme_sayisi || 0,
    },
  };
}

export default function Dashboard({ aktif_isletme_sayisi }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Aktif İşletmeler: {aktif_isletme_sayisi}</p>
    </div>
  );
}
