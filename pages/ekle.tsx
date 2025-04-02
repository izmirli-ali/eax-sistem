// components/IsletmeEkle.tsx

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

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const slug = slugify(formData.name); // ✅ otomatik slug üretimi

    const { error } = await supabase.from("isletmeler").insert([
      { ...formData, slug }
    ]);

    if (!error) setSuccess(true);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>İşletme Ekle</h2>
      {success && <p style={{ color: "green" }}>✅ Başarıyla eklendi</p>}
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input name="name" placeholder="İşletme Adı" onChange={handleChange} required />
        <textarea name="description" placeholder="Açıklama" onChange={handleChange} required />
        <input name="keywords" placeholder="Anahtar Kelimeler" onChange={handleChange} />
        <input name="category" placeholder="Kategori" onChange={handleChange} />
        <input name="email" placeholder="E-posta" type="email" onChange={handleChange} />
        <input name="phone" placeholder="Telefon" onChange={handleChange} />
        <input name="website" placeholder="Web Sitesi" onChange={handleChange} />
        <input name="mapsUrl" placeholder="Google Maps URL" onChange={handleChange} />
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}
