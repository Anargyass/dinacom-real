import Navbar from '@/components/Navbar'
import Image from 'next/image'

export default function PanduanOrangTuaPage() {
  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-gray-400 mx-auto mb-4"></div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Panduan Orang Tua</h1>
            <div className="w-16 h-1 bg-gray-400 mx-auto"></div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <h2 className="text-2xl font-bold text-yellow-800 mb-3">⚠️ Perhatian Penting</h2>
              <p className="text-yellow-900 text-lg leading-relaxed">
                Aplikasi ini <strong>tanpa pengawasan orang tua tidak akan memberikan pengaruh yang signifikan</strong> terhadap perkembangan anak. Peran aktif orang tua adalah kunci utama kesuksesan pembelajaran.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">1</span>
                Peran Orang Tua dalam Pembelajaran
              </h2>
              <div className="space-y-4 ml-14 text-gray-700 leading-relaxed">
                <p>
                  Anak dengan disleksia memerlukan <strong>pendampingan, dukungan, dan bimbingan intensif</strong> dari orang tua. Aplikasi Preder dirancang sebagai alat bantu, bukan pengganti peran orang tua dalam proses belajar anak.
                </p>
                <p>
                  Tanpa kehadiran dan keterlibatan aktif orang tua, anak mungkin akan kesulitan memahami materi, merasa frustrasi, atau bahkan kehilangan motivasi untuk belajar.
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">2</span>
                Cara Mendampingi Anak
              </h2>
              <div className="space-y-6 ml-14">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">📚 Dampingi Saat Belajar</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Duduk bersama anak saat menggunakan aplikasi. Bantu mereka memahami instruksi, bacakan soal jika diperlukan, dan berikan penjelasan dengan sabar.
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-3">💬 Komunikasi Positif</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Berikan pujian atas usaha anak, bukan hanya hasil. Gunakan kata-kata yang membangun kepercayaan diri mereka, seperti "Kamu sudah berusaha dengan baik!" atau "Ayo kita coba lagi bersama-sama!"
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">⏰ Konsistensi Waktu</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Tetapkan jadwal belajar rutin setiap hari. Konsistensi membantu anak membangun kebiasaan belajar yang baik dan mengurangi tekanan mental.
                  </p>
                </div>

                <div className="bg-pink-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-pink-900 mb-3">🎯 Pantau Perkembangan</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Gunakan fitur hasil tes dan laporan AI untuk memahami kemajuan anak. Diskusikan kesulitan yang mereka hadapi dan sesuaikan metode pembelajaran.
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-900 mb-3">❤️ Berikan Dukungan Emosional</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Anak dengan disleksia sering merasa frustasi atau kurang percaya diri. Tunjukkan bahwa Anda memahami kesulitan mereka dan selalu ada untuk mendukung mereka.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="bg-emerald-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">3</span>
                Tips Praktis
              </h2>
              <div className="ml-14">
                <ul className="space-y-3 text-gray-700 leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-emerald-500 font-bold mr-3">✓</span>
                    <span>Buat lingkungan belajar yang tenang dan bebas dari gangguan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 font-bold mr-3">✓</span>
                    <span>Gunakan metode multisensori (visual, audio, kinestetik) untuk memperkuat pembelajaran</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 font-bold mr-3">✓</span>
                    <span>Jangan memaksakan jika anak terlihat lelah atau frustrasi, istirahat sejenak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 font-bold mr-3">✓</span>
                    <span>Rayakan setiap pencapaian kecil untuk memotivasi anak</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 font-bold mr-3">✓</span>
                    <span>Konsultasikan dengan terapis atau guru jika anak menghadapi kesulitan berat</span>
                  </li>
                </ul>
              </div>
            </section>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mt-10">
              <h3 className="text-2xl font-bold text-emerald-800 mb-3">💡 Ingat!</h3>
              <p className="text-emerald-900 text-lg leading-relaxed">
                Setiap anak berkembang dengan kecepatan yang berbeda. Yang terpenting adalah <strong>kesabaran, konsistensi, dan kasih sayang</strong> Anda sebagai orang tua. Bersama-sama, kita bisa memberikan masa depan yang lebih cerah untuk anak kita.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
