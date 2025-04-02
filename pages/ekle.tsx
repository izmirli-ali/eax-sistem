import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Supabase bağlantısı

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    address: "",
    website: "",
  });
  const [step, setStep] = useState(1); // Form adımlarını takip etmek için bir state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // İşletme verisini Supabase'e kaydediyoruz
      const { data, error } = await supabase.from("isletmeler").insert([formData]);
      if (error) throw error;
      setSuccess("İşletme başarıyla kaydedildi!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        address: "",
        website: "",
      });
    } catch (error: any) {
      setError(error.message || "Bir hata oluştu.");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">İşletme Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>}

        {/* Adım 1 */}
        {step === 1 && (
          <div>
            <input
              type="text"
              name="name"
              placeholder="İşletme Adı"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-posta"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <button type="button" onClick={() => setStep(2)} className="btn-primary">
              Sonraki Adım
            </button>
          </div>
        )}

        {/* Adım 2 */}
        {step === 2 && (
          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Telefon"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Kategori"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button type="button" onClick={() => setStep(3)} className="btn-primary">
              Sonraki Adım
            </button>
          </div>
        )}

        {/* Adım 3 */}
        {step === 3 && (
          <div>
            <input
              type="text"
              name="address"
              placeholder="Adres"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="url"
              name="website"
              placeholder="Web Sitesi"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button type="submit" className="btn-primary">
              Kaydet
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Form;
