import Navbar from '@/components/Navbar'

export default function FAQPage() {
  const faqs = [
    {
      category: "Tentang Disleksia",
      questions: [
        {
          q: "Apa itu disleksia?",
          a: "Disleksia adalah gangguan belajar spesifik yang mempengaruhi kemampuan membaca, menulis, dan mengeja. Ini bukan indikasi tingkat kecerdasan anak - banyak individu dengan disleksia yang memiliki kecerdasan rata-rata hingga di atas rata-rata. Disleksia disebabkan oleh perbedaan cara otak memproses informasi tertulis dan bahasa."
        },
        {
          q: "Apa tanda-tanda anak saya mengalami disleksia?",
          a: "Tanda-tanda umum meliputi: kesulitan mengenali huruf dan angka, sering menukar huruf seperti 'b' dan 'd', kesulitan membaca kata-kata sederhana, lambat dalam membaca, kesulitan mengingat urutan (hari, bulan, alfabet), dan kesulitan mengikuti instruksi multi-langkah. Jika Anda melihat beberapa tanda ini, konsultasikan dengan profesional untuk evaluasi lebih lanjut."
        },
        {
          q: "Apakah disleksia bisa disembuhkan?",
          a: "Disleksia adalah kondisi neurologis seumur hidup yang tidak bisa 'disembuhkan'. Namun, dengan intervensi yang tepat, strategi pembelajaran yang sesuai, dan dukungan berkelanjutan, anak dengan disleksia dapat belajar membaca dan menulis dengan efektif. Semakin dini intervensi dimulai, semakin baik hasilnya."
        }
      ]
    },
    {
      category: "Kekhawatiran Orang Tua",
      questions: [
        {
          q: "Apakah anak saya akan tertinggal di sekolah?",
          a: "Dengan dukungan yang tepat dan intervensi dini, anak dengan disleksia dapat berhasil di sekolah. Mereka mungkin memerlukan waktu lebih lama untuk tugas tertentu atau membutuhkan metode pembelajaran alternatif, tetapi banyak yang unggul dalam bidang lain seperti pemecahan masalah, kreativitas, dan pemikiran visual-spasial. Komunikasi dengan guru dan penggunaan akomodasi pembelajaran yang sesuai sangat penting."
        },
        {
          q: "Apakah disleksia mempengaruhi masa depan anak saya?",
          a: "Tidak sama sekali! Banyak individu sukses dengan disleksia dalam berbagai bidang - mulai dari pengusaha, seniman, ilmuwan, hingga pemimpin dunia. Yang penting adalah membangun kepercayaan diri anak, mengidentifikasi kekuatan mereka, dan memberikan dukungan yang diperlukan. Disleksia bukan penghalang untuk mencapai kesuksesan."
        },
        {
          q: "Apakah saya salah sebagai orang tua?",
          a: "Sama sekali tidak. Disleksia bukan disebabkan oleh kesalahan orang tua atau kekurangan dalam pengasuhan. Ini adalah kondisi neurologis yang sering diturunkan dalam keluarga. Yang terpenting sekarang adalah memberikan dukungan, pemahaman, dan sumber daya yang tepat untuk membantu anak Anda berkembang."
        },
        {
          q: "Bagaimana cara saya mendukung anak tanpa membuatnya merasa berbeda?",
          a: "Fokus pada kekuatan dan minat anak, bukan hanya kesulitannya. Jelaskan bahwa setiap orang belajar dengan cara berbeda dan bahwa disleksia hanya satu aspek dari diri mereka. Rayakan pencapaian mereka, berikan dukungan positif, dan ciptakan lingkungan di mana mereka merasa aman untuk mencoba dan membuat kesalahan."
        }
      ]
    },
    {
      category: "Tentang Aplikasi Preder",
      questions: [
        {
          q: "Apa itu aplikasi Preder?",
          a: "Preder adalah aplikasi pembelajaran berbasis AI yang dirancang khusus untuk membantu anak-anak dengan disleksia belajar mengenali dan membedakan huruf, terutama huruf-huruf yang sering tertukar seperti 'b' dan 'd', 'p' dan 'q'. Aplikasi ini menggunakan kecerdasan buatan untuk memberikan pembelajaran yang personal dan adaptif sesuai dengan kemampuan masing-masing anak."
        },
        {
          q: "Bagaimana cara kerja aplikasi ini?",
          a: "Preder menggunakan pendekatan pembelajaran bertingkat dengan tiga level kesulitan (Mudah, Sedang, Sulit). Anak akan mengerjakan soal-soal interaktif untuk mengenali huruf. AI akan menganalisis jawaban anak dan memberikan laporan detail tentang pola kesalahan, area yang perlu diperbaiki, dan rekomendasi pembelajaran. Fitur chatbot AI juga tersedia untuk menjawab pertanyaan dan memberikan bimbingan tambahan."
        },
        {
          q: "Apakah aplikasi ini bisa menggantikan terapi atau guru?",
          a: "Tidak. Preder adalah alat bantu pembelajaran yang dirancang untuk <strong>melengkapi</strong>, bukan menggantikan, intervensi profesional. Aplikasi ini paling efektif ketika digunakan sebagai bagian dari program pembelajaran yang komprehensif yang mencakup dukungan dari guru, terapis, dan terutama orang tua."
        },
        {
          q: "Apakah aplikasi ini berbayar?",
          a: "Saat ini, aplikasi Preder tersedia secara gratis sebagai bagian dari misi kami untuk memberikan akses pembelajaran yang lebih baik bagi semua anak dengan disleksia."
        },
        {
          q: "Berapa lama anak harus menggunakan aplikasi ini setiap hari?",
          a: "Kami merekomendasikan sesi 15-20 menit per hari untuk memulai. Yang terpenting adalah konsistensi, bukan durasi. Pastikan anak tidak merasa terlalu lelah atau frustrasi. Sesuaikan waktu berdasarkan respons dan kesiapan anak Anda."
        }
      ]
    },
    {
      category: "Tujuan Aplikasi",
      questions: [
        {
          q: "Apa tujuan utama aplikasi Preder?",
          a: "Tujuan utama Preder adalah memberikan harapan dan kesempatan yang lebih besar bagi anak-anak dengan disleksia untuk mengembangkan kemampuan membaca mereka. Kami percaya bahwa setiap anak berhak mendapatkan pendidikan yang berkualitas dan disesuaikan dengan kebutuhan mereka. Melalui teknologi AI dan pendekatan pembelajaran yang personal, kami ingin membantu mengurangi kesenjangan pembelajaran dan membangun kepercayaan diri anak."
        },
        {
          q: "Apa yang membuat Preder berbeda dari aplikasi lain?",
          a: "Preder dirancang khusus untuk anak Indonesia dengan disleksia, dengan fokus pada huruf-huruf Latin yang sering membingungkan. Kami menggunakan AI untuk memberikan analisis mendalam tentang pola kesalahan anak dan rekomendasi yang dipersonalisasi. Selain itu, kami menekankan pentingnya peran orang tua dalam proses pembelajaran - aplikasi ini dirancang untuk digunakan bersama-sama, bukan sendirian."
        },
        {
          q: "Bagaimana Preder berkontribusi pada pendidikan anak disleksia di Indonesia?",
          a: "Di Indonesia, akses terhadap sumber daya dan intervensi untuk disleksia masih terbatas, terutama di daerah-daerah. Preder hadir sebagai solusi yang dapat diakses oleh siapa saja dengan smartphone atau komputer, memberikan alat pembelajaran yang berkualitas dan berbasis riset tanpa memandang lokasi geografis atau kemampuan ekonomi. Kami berharap dapat menjangkau lebih banyak anak dan keluarga yang membutuhkan."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-gray-400 mx-auto mb-4"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 text-lg">Pertanyaan yang sering diajukan seputar disleksia dan aplikasi Preder</p>
            <div className="w-16 h-1 bg-gray-400 mx-auto mt-4"></div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-emerald-500">
                  {category.category}
                </h2>
                <div className="space-y-8">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-emerald-700 mb-3 flex items-start">
                        <span className="text-emerald-500 mr-3">Q:</span>
                        <span>{faq.q}</span>
                      </h3>
                      <div className="ml-8 text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-600">A: </span>
                        <span dangerouslySetInnerHTML={{ __html: faq.a }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Masih punya pertanyaan?</h3>
            <p className="text-gray-700 mb-4">
              Jika Anda memiliki pertanyaan lain yang belum terjawab di sini, jangan ragu untuk menghubungi kami atau berkonsultasi dengan profesional kesehatan anak Anda.
            </p>
            <p className="text-emerald-700 font-semibold">
              Kami di sini untuk membantu! 💚
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
