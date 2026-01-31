'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LEARNING_MATERIALS } from '@/app/lib/learningMaterials'

export default function LearnPage() {
  const router = useRouter()
  const [currentMaterial, setCurrentMaterial] = useState(0)
  const [completedMaterials, setCompletedMaterials] = useState<number[]>([])
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  const materials = LEARNING_MATERIALS
  const material = materials[currentMaterial]

  // Function to play audio using Web Speech API
  const playAudio = (text: string, lang: string = 'id-ID') => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.9 // Slightly slower for clarity
    utterance.pitch = 1.2 // Slightly higher pitch for child-friendly tone
    
    synthRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const handlePlayLetterSound = () => {
    playAudio(`${material.uppercase}... ${material.sound}`)
  }

  const handlePlayExampleWord = (word: string) => {
    playAudio(word)
  }

  const handleCompleteMaterial = () => {
    const alreadyComplete = completedMaterials.includes(currentMaterial)
    const nextCompleted = alreadyComplete
      ? completedMaterials
      : [...completedMaterials, currentMaterial]


    if (!alreadyComplete) {
      setCompletedMaterials(nextCompleted)
    }

    if (currentMaterial < materials.length - 1) {
      setCurrentMaterial(currentMaterial + 1)
    }
  }

  const handlePreviousMaterial = () => {
    if (currentMaterial > 0) {
      setCurrentMaterial(currentMaterial - 1)
    }
  }

  const handleNextMaterial = () => {
    if (currentMaterial < materials.length - 1) {
      setCurrentMaterial(currentMaterial + 1)
    } else if (currentMaterial === materials.length - 1) {
      // Jika sudah di materi terakhir, redirect ke halaman compare
      router.push('/compare')
    }
  }

  const handleSelectMaterial = (index: number) => {
    setCurrentMaterial(index)
  }

  const isMaterialCompleted = (index: number) => completedMaterials.includes(index)
  const isCurrentCompleted = isMaterialCompleted(currentMaterial)
  const isFirst = currentMaterial === 0
  const isLast = currentMaterial === materials.length - 1
  const allMaterialsCompleted = completedMaterials.length === materials.length

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Back Button */}
            <Link 
              href="/learn-flow/start"
              className="flex items-center justify-center w-10 h-10 border-2 border-red-500 rounded-lg hover:bg-red-50 transition-colors"
            >
              <span className="text-red-500 font-bold text-lg">×</span>
            </Link>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-center">
              <span className="text-red-500">MARI</span>
              <span className="text-blue-600"> BELAJAR!</span>
            </h1>

            {/* Daftar Materi Button */}
            <button 
              onClick={() => setShowMaterialDropdown(!showMaterialDropdown)}
              className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Daftar Materi
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">Progress Belajar</span>
              <span className="text-sm font-bold text-gray-800">{currentMaterial + 1}/{materials.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentMaterial + 1) / materials.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Mengenal Huruf {material.uppercase}
          </h2>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side - Example Cards */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Contoh Kata:</h3>
              <div className="grid grid-cols-2 gap-6">
                {material.examples.map((ex, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePlayExampleWord(ex.word)}
                    className="bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-orange-300 rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer min-h-48 flex flex-col items-center justify-center"
                  >
                    <div className="text-5xl mb-3">{ex.emoji}</div>
                    <div className="font-bold text-gray-800 text-base mb-2 text-center">{ex.word}</div>
                    <div className="mt-auto inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Letter Display */}
            <div className="flex items-center justify-center pt-9">
              <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-3xl p-8 w-full h-110 flex items-center justify-center border-4 border-teal-300 shadow-md cursor-pointer hover:shadow-lg transition-shadow" onClick={handlePlayLetterSound}>
                <div className="text-center">
                  <div className="text-9xl font-bold text-teal-600">
                    {material.uppercase}{material.lowercase}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlayLetterSound()
                    }}
                    className="mt-8 bg-blue-500 text-white rounded-full p-4 hover:bg-blue-600 transition-colors inline-flex items-center justify-center"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-center flex-wrap pt-6 border-t-2 border-gray-200 mt-8">
            <button
              onClick={handlePreviousMaterial}
              disabled={isFirst}
              className={`px-8 py-3 rounded-lg font-bold transition-all duration-200 ${
                isFirst
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-400 text-white hover:bg-gray-500'
              }`}
            >
              ← Sebelumnya
            </button>

            <button
              onClick={handleNextMaterial}
              className={`px-8 py-3 rounded-lg font-bold transition-all duration-200 ${
                isLast
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-400 text-white hover:bg-gray-500'
              }`}
            >
              {isLast ? 'Selesai ✓' : 'Selanjutnya →'}
            </button>
          </div>
        </div>

        {/* Material Dropdown Panel */}
        {showMaterialDropdown && (
          <div className="fixed inset-0 z-40" onClick={() => setShowMaterialDropdown(false)}>
            <div 
              className="fixed right-0 top-16 h-screen bg-white shadow-2xl p-6 w-80 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Pilih Huruf</h3>
              <div className="grid grid-cols-4 gap-3">
                {materials.map((mat, index) => (
                  <button
                    key={mat.id}
                    onClick={() => {
                      handleSelectMaterial(index)
                      setShowMaterialDropdown(false)
                    }}
                    className={`aspect-square rounded-xl font-bold text-2xl transition-all duration-200 ${
                      currentMaterial === index
                        ? 'bg-teal-600 text-white shadow-lg'
                        : isMaterialCompleted(index)
                        ? 'bg-emerald-200 text-emerald-800 hover:bg-emerald-300 shadow'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {mat.letter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
