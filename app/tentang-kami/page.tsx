import Navbar from '@/components/Navbar'
import Image from 'next/image'

export default function TentangKamiPage() {
  const teamMembers = [
    { name: "Anggota 1", role: "Developer" },
    { name: "Anggota 2", role: "Designer" },
    { name: "Anggota 3", role: "AI Engineer" },
    { name: "Anggota 4", role: "Researcher" },
    { name: "Anggota 5", role: "Project Manager" }
  ]

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-gray-400 mx-auto mb-4"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tentang Kami</h1>
            <div className="w-16 h-1 bg-gray-400 mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="space-y-10">
            {/* Introduction */}
            <section className="text-center">
              <h2 className="text-3xl font-bold text-emerald-600 mb-4">Kelompok Pecinta Sawit Owow</h2>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Kami adalah tim yang terdiri dari <strong>5 mahasiswa</strong> dari <strong>Institut Teknologi Sepuluh Nopember (ITS)</strong>, Jurusan <strong>Teknologi Informasi</strong>.
              </p>
            </section>

            {/* Mission Statement */}
            <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-10">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-emerald-500 rounded-full p-4">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
                Misi Kami
              </h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
                Kami memiliki <strong className="text-emerald-700">tujuan besar</strong> untuk <strong className="text-emerald-700">memberikan harapan setinggi mungkin untuk anak-anak dengan disleksia</strong>.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mt-4">
                Kami percaya bahwa setiap anak berhak mendapatkan kesempatan yang sama untuk belajar dan berkembang, tanpa terbatas oleh tantangan yang mereka hadapi.
              </p>
            </div>

            {/* Vision Section */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Visi Kami</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h4 className="text-xl font-bold text-blue-900 mb-2">Aksesibilitas</h4>
                  <p className="text-gray-700">
                    Membuat pembelajaran yang berkualitas dapat diakses oleh semua anak disleksia di Indonesia
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">💡</div>
                  <h4 className="text-xl font-bold text-purple-900 mb-2">Inovasi</h4>
                  <p className="text-gray-700">
                    Menggunakan teknologi AI untuk memberikan pembelajaran yang personal dan adaptif
                  </p>
                </div>
                <div className="bg-pink-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <h4 className="text-xl font-bold text-pink-900 mb-2">Kolaborasi</h4>
                  <p className="text-gray-700">
                    Membangun jembatan antara teknologi, orang tua, dan anak untuk pembelajaran yang efektif
                  </p>
                </div>
              </div>
            </section>

            {/* Why We Care */}
            <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
              <h3 className="text-2xl font-bold text-yellow-900 mb-4">Mengapa Kami Peduli?</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Di Indonesia, banyak anak dengan disleksia yang tidak mendapatkan dukungan yang mereka butuhkan karena keterbatasan sumber daya, pemahaman, dan akses terhadap intervensi yang tepat.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                Kami melihat ini sebagai masalah yang perlu diselesaikan. Dengan latar belakang kami di bidang teknologi informasi, kami percaya bahwa teknologi dapat menjadi solusi untuk menjangkau lebih banyak anak dan keluarga.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Preder</strong> adalah langkah pertama kami dalam perjalanan ini - sebuah aplikasi yang kami harap dapat membuat perbedaan nyata dalam kehidupan anak-anak dengan disleksia dan keluarga mereka.
              </p>
            </section>

            {/* Team Section */}
            <section>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tim Kami</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 mx-auto mb-3 bg-linear-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-6 italic">
                Mahasiswa Teknologi Informasi, Institut Teknologi Sepuluh Nopember
              </p>
            </section>

            {/* Closing Statement */}
            <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 md:p-10 text-white text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Bersama, Kita Bisa Membuat Perbedaan
              </h3>
              <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                Terima kasih telah mempercayai Preder sebagai bagian dari perjalanan pembelajaran anak Anda. Kami berkomitmen untuk terus berinovasi dan meningkatkan aplikasi ini demi masa depan yang lebih cerah bagi semua anak dengan disleksia.
              </p>
              <p className="text-xl font-bold">
                Mari kita wujudkan harapan bersama! 🌟
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
