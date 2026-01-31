/**
 * Learning Materials - Structured content for dyslexia-friendly letter learning
 * 
 * Each material includes:
 * - Letter (uppercase)
 * - Shape description & visual analogy
 * - Example objects/words starting with that letter
 * - Fun facts or memory tricks
 */

export interface LearningMaterial {
  id: string
  letter: string
  uppercase: string
  lowercase: string
  sound: string
  shapeDescription: string
  shapeVisual: string // Emoji or icon representing the shape
  examples: {
    word: string
    emoji: string
    description: string
  }[]
  memoryTrick: string
  difficulty: 'easy' | 'medium' | 'hard'
  color: string // For visual distinction
}

export const LEARNING_MATERIALS: LearningMaterial[] = [
  // ==================== HURUF VOKAL ====================
  {
    id: 'mat-a',
    letter: 'A',
    uppercase: 'A',
    lowercase: 'a',
    sound: 'a',
    shapeDescription: 'Bentuk huruf A seperti TENDA SEGITIGA dengan garis tengah',
    shapeVisual: '⛺',
    examples: [
      { word: 'APEL', emoji: '🍎', description: 'Buah yang manis dan segar' },
      { word: 'AYAM', emoji: '🐔', description: 'Hewan yang berkokok di pagi hari' },
      { word: 'API', emoji: '🔥', description: 'Panas dan berwarna merah' },
      { word: 'ANGIN', emoji: '💨', description: 'Hembusan udara yang sejuk' }
    ],
    memoryTrick: 'A seperti ATAP rumah segitiga - bayangkan kamu tinggal di tenda!',
    difficulty: 'easy',
    color: 'bg-red-100 border-red-300 text-red-800'
  },
  {
    id: 'mat-i',
    letter: 'I',
    uppercase: 'I',
    lowercase: 'i',
    sound: 'iii',
    shapeDescription: 'Bentuk huruf I seperti TIANG LURUS dengan titik di atas',
    shapeVisual: '🕯️',
    examples: [
      { word: 'IKAN', emoji: '🐟', description: 'Hewan yang hidup di air' },
      { word: 'IBU', emoji: '👩', description: 'Orang yang merawat kita' },
      { word: 'IKAN', emoji: '🐠', description: 'Berenang di laut atau sungai' },
      { word: 'IRIS', emoji: '👁️', description: 'Bagian berwarna di mata kita' }
    ],
    memoryTrick: 'I seperti LILIN yang berdiri tegak - lurus dan tinggi!',
    difficulty: 'easy',
    color: 'bg-blue-100 border-blue-300 text-blue-800'
  },
  {
    id: 'mat-u',
    letter: 'U',
    uppercase: 'U',
    lowercase: 'u',
    sound: 'uuu',
    shapeDescription: 'Bentuk huruf U seperti MANGKUK atau EMBER untuk menampung air',
    shapeVisual: '🥣',
    examples: [
      { word: 'ULAR', emoji: '🐍', description: 'Hewan melata yang panjang' },
      { word: 'UANG', emoji: '💰', description: 'Untuk membeli sesuatu' },
      { word: 'UDARA', emoji: '💨', description: 'Oksigen yang kita hirup' },
      { word: 'ULAR', emoji: '🪱', description: 'Tidak punya kaki' }
    ],
    memoryTrick: 'U seperti GELAS kosong - bisa diisi air atau susu!',
    difficulty: 'easy',
    color: 'bg-purple-100 border-purple-300 text-purple-800'
  },
  {
    id: 'mat-e',
    letter: 'E',
    uppercase: 'E',
    lowercase: 'e',
    sound: 'eee',
    shapeDescription: 'Bentuk huruf E seperti SISIR dengan 3 gigi',
    shapeVisual: '🧲',
    examples: [
      { word: 'ELANG', emoji: '🦅', description: 'Burung besar yang terbang tinggi' },
      { word: 'EKOR', emoji: '🦊', description: 'Bagian belakang hewan' },
      { word: 'EMBER', emoji: '🪣', description: 'Wadah untuk menampung air' },
      { word: 'ES', emoji: '🧊', description: 'Air yang beku dan dingin' }
    ],
    memoryTrick: 'E seperti TANGGA dengan 3 anak tangga - naik turun!',
    difficulty: 'easy',
    color: 'bg-green-100 border-green-300 text-green-800'
  },
  {
    id: 'mat-o',
    letter: 'O',
    uppercase: 'O',
    lowercase: 'o',
    sound: 'ooo',
    shapeDescription: 'Bentuk huruf O seperti BOLA BUNDAR atau DONAT',
    shapeVisual: '⚽',
    examples: [
      { word: 'OLA', emoji: '🌊', description: 'Gelombang air laut' },
      { word: 'ORANG', emoji: '🧑', description: 'Manusia seperti kita' },
      { word: 'OBAT', emoji: '💊', description: 'Untuk menyembuhkan sakit' },
      { word: 'OVEN', emoji: '🔥', description: 'Alat untuk memanggang' }
    ],
    memoryTrick: 'O seperti BOLA basket - bulat sempurna tanpa sudut!',
    difficulty: 'easy',
    color: 'bg-orange-100 border-orange-300 text-orange-800'
  },

  // ==================== HURUF KONSONAN UMUM ====================
  {
    id: 'mat-b',
    letter: 'B',
    uppercase: 'B',
    lowercase: 'b',
    sound: 'be',
    shapeDescription: 'Bentuk huruf B seperti PERUT yang BUNDAR 2 kali',
    shapeVisual: '🎈',
    examples: [
      { word: 'BOLA', emoji: '⚽', description: 'Mainan yang bulat' },
      { word: 'BUKU', emoji: '📖', description: 'Untuk belajar dan membaca' },
      { word: 'BUAH', emoji: '🍎', description: 'Makanan sehat dari pohon' },
      { word: 'BABI', emoji: '🐷', description: 'Hewan berkaki empat' }
    ],
    memoryTrick: 'B seperti DUA BALON yang ditempel - satu di atas, satu di bawah!',
    difficulty: 'easy',
    color: 'bg-pink-100 border-pink-300 text-pink-800'
  },
  {
    id: 'mat-d',
    letter: 'D',
    uppercase: 'D',
    lowercase: 'd',
    sound: 'de',
    shapeDescription: 'Bentuk huruf D seperti PERUT BESAR sebelah kanan',
    shapeVisual: '🌙',
    examples: [
      { word: 'DADU', emoji: '🎲', description: 'Mainan kotak dengan angka' },
      { word: 'DURI', emoji: '🌵', description: 'Bagian tajam di tumbuhan' },
      { word: 'DADA', emoji: '👕', description: 'Bagian tubuh di depan' },
      { word: 'DAUN', emoji: '🍃', description: 'Bagian hijau di pohon' }
    ],
    memoryTrick: 'D seperti BULAN SETENGAH - bundar di sebelah kanan!',
    difficulty: 'medium',
    color: 'bg-cyan-100 border-cyan-300 text-cyan-800'
  },
  {
    id: 'mat-m',
    letter: 'M',
    uppercase: 'M',
    lowercase: 'm',
    sound: 'em',
    shapeDescription: 'Bentuk huruf M seperti DUA BUKIT atau GUNUNG kembar',
    shapeVisual: '⛰️',
    examples: [
      { word: 'MAMA', emoji: '👩', description: 'Ibu yang merawat kita' },
      { word: 'MEJA', emoji: '🪑', description: 'Tempat untuk belajar' },
      { word: 'MATA', emoji: '👁️', description: 'Untuk melihat' },
      { word: 'MAKAN', emoji: '🍽️', description: 'Aktivitas mengisi perut' }
    ],
    memoryTrick: 'M seperti DUA GUNUNG yang berdampingan - naik turun naik!',
    difficulty: 'easy',
    color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
  },
  {
    id: 'mat-n',
    letter: 'N',
    uppercase: 'N',
    lowercase: 'n',
    sound: 'en',
    shapeDescription: 'Bentuk huruf N seperti SATU BUKIT atau TANJAKAN',
    shapeVisual: '🏔️',
    examples: [
      { word: 'NASI', emoji: '🍚', description: 'Makanan pokok kita' },
      { word: 'NAGA', emoji: '🐉', description: 'Hewan mitos yang besar' },
      { word: 'NANAS', emoji: '🍍', description: 'Buah berduri berwarna kuning' },
      { word: 'NAMA', emoji: '📛', description: 'Identitas seseorang' }
    ],
    memoryTrick: 'N seperti PEROSOTAN di taman bermain - naik lalu turun!',
    difficulty: 'easy',
    color: 'bg-teal-100 border-teal-300 text-teal-800'
  },
  {
    id: 'mat-p',
    letter: 'P',
    uppercase: 'P',
    lowercase: 'p',
    sound: 'pe',
    shapeDescription: 'Bentuk huruf P seperti BENDERA di tiang',
    shapeVisual: '🚩',
    examples: [
      { word: 'PAPA', emoji: '👨', description: 'Ayah yang melindungi kita' },
      { word: 'PAKU', emoji: '🔨', description: 'Untuk menempel kayu' },
      { word: 'PADI', emoji: '🌾', description: 'Tumbuhan penghasil nasi' },
      { word: 'PANAS', emoji: '🔥', description: 'Cuaca yang terik' }
    ],
    memoryTrick: 'P seperti BENDERA yang berkibar - tiang dengan bendera di atas!',
    difficulty: 'medium',
    color: 'bg-indigo-100 border-indigo-300 text-indigo-800'
  },
  {
    id: 'mat-q',
    letter: 'Q',
    uppercase: 'Q',
    lowercase: 'q',
    sound: 'ki',
    shapeDescription: 'Bentuk huruf Q seperti BOLA dengan EKOR pendek',
    shapeVisual: '🎾',
    examples: [
      { word: 'QORI', emoji: '📖', description: 'Pembaca Al-Quran' },
      { word: 'QUIZ', emoji: '❓', description: 'Pertanyaan atau kuis' }
    ],
    memoryTrick: 'Q seperti BALON dengan TALI yang menjuntai!',
    difficulty: 'hard',
    color: 'bg-violet-100 border-violet-300 text-violet-800'
  },
  {
    id: 'mat-w',
    letter: 'W',
    uppercase: 'W',
    lowercase: 'w',
    sound: 'we',
    shapeDescription: 'Bentuk huruf W seperti DUA LEMBAH atau GELOMBANG AIR',
    shapeVisual: '〰️',
    examples: [
      { word: 'WARNA', emoji: '🎨', description: 'Merah, biru, kuning' },
      { word: 'WAJAH', emoji: '😊', description: 'Bagian depan kepala' },
      { word: 'WAKTU', emoji: '⏰', description: 'Jam dan menit' },
      { word: 'WAYANG', emoji: '🎭', description: 'Seni boneka tradisional' }
    ],
    memoryTrick: 'W seperti OMBAK di laut - turun naik turun!',
    difficulty: 'medium',
    color: 'bg-sky-100 border-sky-300 text-sky-800'
  }
]

/**
 * Get materials by difficulty level
 */
export function getMaterialsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): LearningMaterial[] {
  return LEARNING_MATERIALS.filter(m => m.difficulty === difficulty)
}

/**
 * Get material by letter
 */
export function getMaterialByLetter(letter: string): LearningMaterial | undefined {
  return LEARNING_MATERIALS.find(m => m.letter.toUpperCase() === letter.toUpperCase())
}

/**
 * Get all available letters
 */
export function getAllLetters(): string[] {
  return LEARNING_MATERIALS.map(m => m.letter)
}

// ==================== COMPARISON MATERIALS ====================

export interface ComparisonMaterial {
  id: string
  letterLeft: {
    uppercase: string
    lowercase: string
    sound: string
    tips: string
    examples: Array<{
      word: string
      emoji: string
      description: string
    }>
  }
  letterRight: {
    uppercase: string
    lowercase: string
    sound: string
    tips: string
    examples: Array<{
      word: string
      emoji: string
      description: string
    }>
  }
  difference: string
  similarity: string
}

export const COMPARISON_MATERIALS: ComparisonMaterial[] = [
  {
    id: 'comp-bd',
    letterLeft: {
      uppercase: 'B',
      lowercase: 'b',
      sound: 'Be',
      tips: 'BOBOT berat di BAWAH',
      examples: [
        { word: 'BOLA', emoji: '⚽', description: 'Mainan yang bulat' },
        { word: 'BUKU', emoji: '📖', description: 'Untuk belajar dan membaca' }
      ]
    },
    letterRight: {
      uppercase: 'D',
      lowercase: 'd',
      sound: 'De',
      tips: 'DASNYA DI ATAS',
      examples: [
        { word: 'DADU', emoji: '🎲', description: 'Mainan kotak dengan angka' },
        { word: 'DAUN', emoji: '🍃', description: 'Bagian hijau di pohon' }
      ]
    },
    difference: 'B memiliki 2 tonjolan (atas dan bawah), D hanya 1 tonjolan (atas)',
    similarity: 'Keduanya memiliki garis lurus di sebelah kiri'
  },
  {
    id: 'comp-pq',
    letterLeft: {
      uppercase: 'P',
      lowercase: 'p',
      sound: 'Pe',
      tips: 'Perut DI ATAS',
      examples: [
        { word: 'PAPA', emoji: '👨', description: 'Ayah yang melindungi kita' },
        { word: 'PAKU', emoji: '🔨', description: 'Untuk menempel kayu' }
      ]
    },
    letterRight: {
      uppercase: 'Q',
      lowercase: 'q',
      sound: 'Ki',
      tips: 'Ekor BAWAH',
      examples: [
        { word: 'QORI', emoji: '📖', description: 'Pembaca Al-Quran' },
        { word: 'QUIZ', emoji: '❓', description: 'Pertanyaan atau kuis' }
      ]
    },
    difference: 'P punya tonjolan di atas, Q punya ekor di bawah',
    similarity: 'Keduanya mirip dengan huruf O'
  },
  {
    id: 'comp-wm',
    letterLeft: {
      uppercase: 'W',
      lowercase: 'w',
      sound: 'We',
      tips: 'GELOMBANG BANYAK (3-4 puncak)',
      examples: [
        { word: 'WARNA', emoji: '🎨', description: 'Merah, biru, kuning' },
        { word: 'WAJAH', emoji: '😊', description: 'Bagian depan kepala' }
      ]
    },
    letterRight: {
      uppercase: 'M',
      lowercase: 'm',
      sound: 'Em',
      tips: 'GUNUNG KEMBAR (2 puncak)',
      examples: [
        { word: 'MAMA', emoji: '👩', description: 'Ibu yang merawat kita' },
        { word: 'MEJA', emoji: '🪑', description: 'Tempat untuk belajar' }
      ]
    },
    difference: 'W memiliki 4 puncak, M hanya 2 puncak besar',
    similarity: 'Keduanya berbentuk seperti puncak/gunung'
  },
  {
    id: 'comp-nm',
    letterLeft: {
      uppercase: 'N',
      lowercase: 'n',
      sound: 'En',
      tips: 'Satu PEROSOTAN',
      examples: [
        { word: 'NASI', emoji: '🍚', description: 'Makanan pokok kita' },
        { word: 'NAGA', emoji: '🐉', description: 'Hewan mitos yang besar' }
      ]
    },
    letterRight: {
      uppercase: 'M',
      lowercase: 'm',
      sound: 'Em',
      tips: 'DUA PUNCAK',
      examples: [
        { word: 'MAMA', emoji: '👩', description: 'Ibu yang merawat kita' },
        { word: 'MATA', emoji: '👁️', description: 'Untuk melihat' }
      ]
    },
    difference: 'N memiliki 1 diagonal, M memiliki 2 puncak berhadapan',
    similarity: 'Keduanya punya garis vertikal'
  },
  {
    id: 'comp-nu',
    letterLeft: {
      uppercase: 'N',
      lowercase: 'n',
      sound: 'En',
      tips: 'Naik lalu turun seperti TANJAKAN',
      examples: [
        { word: 'NANAS', emoji: '🍍', description: 'Buah berduri berwarna kuning' },
        { word: 'NAMA', emoji: '📛', description: 'Identitas seseorang' }
      ]
    },
    letterRight: {
      uppercase: 'U',
      lowercase: 'u',
      sound: 'Uuu',
      tips: 'Cekungan seperti MANGKUK',
      examples: [
        { word: 'ULAR', emoji: '🐍', description: 'Hewan melata yang panjang' },
        { word: 'UANG', emoji: '💰', description: 'Untuk membeli sesuatu' }
      ]
    },
    difference: 'N memiliki garis diagonal naik, U berbentuk lengkungan ke bawah',
    similarity: 'Keduanya memiliki dua garis vertikal di samping kiri dan kanan'
  },
  {
    id: 'comp-qo',
    letterLeft: {
      uppercase: 'Q',
      lowercase: 'q',
      sound: 'Ki',
      tips: 'Lingkaran dengan EKOR',
      examples: [
        { word: 'QORI', emoji: '📖', description: 'Pembaca Al-Quran' },
        { word: 'QUIZ', emoji: '❓', description: 'Pertanyaan atau kuis' }
      ]
    },
    letterRight: {
      uppercase: 'O',
      lowercase: 'o',
      sound: 'Ooo',
      tips: 'Lingkaran SEMPURNA tanpa ekor',
      examples: [
        { word: 'ORANG', emoji: '🧑', description: 'Manusia seperti kita' },
        { word: 'OBAT', emoji: '💊', description: 'Untuk menyembuhkan sakit' }
      ]
    },
    difference: 'Q memiliki ekor kecil di bagian bawah kanan, O hanya lingkaran sempurna',
    similarity: 'Keduanya berbentuk lingkaran/bulat'
  }
]

/**
 * Get all comparison pairs
 */
export function getAllComparisons(): ComparisonMaterial[] {
  return COMPARISON_MATERIALS
}

/**
 * Get comparison by ID
 */
export function getComparisonById(id: string): ComparisonMaterial | undefined {
  return COMPARISON_MATERIALS.find(c => c.id === id)
}
