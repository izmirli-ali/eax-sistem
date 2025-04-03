import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const { error } = await supabase.from("isletmeler").insert([formData]);
    if (error) {
      setError("❌ Bir hata oluştu. Lütfen tekrar deneyin.");
    } else {
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", address: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">İşletme Ekle</h2>

        {error && <div className="text-red-600 bg-red-100 p-2 rounded">{error}</div>}
        {success && <div className="text-green-600 bg-green-100 p-2 rounded">✅ İşletme başarıyla eklendi.</div>}

        <input
          type="text"
          name="name"
          placeholder="İşletme Adı"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefon"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Adres"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
}
