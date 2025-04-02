import { GetServerSideProps } from "next";
import Head from "next/head";
import { supabase } from "../../lib/supabaseClient";

export default function IsletmeSayfasi({ isletme }: any) {
  if (!isletme) return <p>İşletme bulunamadı.</p>;

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <Head>
        <title>{isletme.name} | EAX</title>
        <meta name="description" content={isletme.description} />
        <meta name="keywords" content={isletme.keywords} />
      </Head>

      <h1 style={{ fontSize: "2rem", marginBottom: 10 }}>{isletme.name}</h1>
      <p>{isletme.description}</p>

      <div style={{ marginTop: 20 }}>
        <p><strong>Kategori:</strong> {isletme.category}</p>
        <p><strong>Telefon:</strong> {isletme.phone}</p>
        <p><strong>E-posta:</strong> {isletme.email}</p>
        <p><strong>Web Sitesi:</strong> <a href={isletme.website} target="_blank">{isletme.website}</a></p>
      </div>

      {isletme.mapsUrl && (
        <div style={{ marginTop: 30 }}>
          <iframe
            src={isletme.mapsUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;

  const { data, error } = await supabase
    .from("isletmeler")
    .select("*")
    .ilike("name", `%${slug}%`)
    .limit(1)
    .single();

  return {
    props: {
      isletme: data || null
    }
  };
};
