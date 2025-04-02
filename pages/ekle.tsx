import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Veri doğrulama
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    // Formu Supabase'a gönderme
    const { data, error } = await supabase
      .from("isletmeler")
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
      }]);

    if (error) {
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    } else {
      setSuccess(true);
      // Başarıyla eklendikten sonra yönlendirme yapalım
      setTimeout(() => {
        router.push("/success"); // "success" sayfasına yönlendirme
      }, 2000); // 2 saniye sonra yönlendirme yapılacak
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">İşletme Bilgilerinizi Girin</h2>
      
      {error && <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-600 p-3 rounded-md mb-4">İşletme başarıyla eklendi!</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          type="text" 
          name="name" 
          placeholder="İşletme Adı" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
          type="email" 
          name="email" 
          placeholder="E-posta" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
          type="text" 
          name="phone" 
          placeholder="Telefon" 
          value={formData.phone} 
          onChange={handleChange} 
          required 
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        
        <input 
          type="text" 
          name="address" 
          placeholder="Adres (isteğe bağlı)" 
          value={formData.address} 
          onChange={handleChange} 
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
        >
          Gönder
        </button>
      </form>
    </div>
  );
}

export default Form;
