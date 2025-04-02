import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

// basit slugify fonksiyonu
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function IsletmeEkle() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    keywords: "",
    category: "",
    email: "",
    phone: "",
    website: "",
    mapsUrl: ""
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const slug = slugify(formData.name); // ✅ otomatik slug üretimi

    const { data, error } = await supabase.from("isletmeler").insert([
      { ...formData, slug }
    ]);

    if (error) {
      setError(true);
    } else {
      setSuccess(true);
      setFormData({
        name: "",
        description: "",
        keywords: "",
        category: "",
        email: "",
        phone: "",
        website: "",
        mapsUrl: ""
      });
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>İşletme Ekle</h2>
      {success && <p style={{ color: "green" }}>✅ Başarıyla eklendi</p>}
      {error && <p style={{ color: "red" }}>❌ Bir hata oluştu. Lütfen tekrar deneyin.</p>}
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          name="name"
          placeholder="İşletme Adı"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Açıklama"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="keywords"
          placeholder="Anahtar Kelimeler"
          value={formData.keywords}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Kategori"
          value={formData.category}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="E-posta"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Telefon"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="website"
          placeholder="Web Sitesi"
          value={formData.website}
          onChange={handleChange}
        />
        <input
          name="mapsUrl"
          placeholder="Google Maps URL"
          value={formData.mapsUrl}
          onChange={handleChange}
        />
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}
