'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { COMPARISON_MATERIALS } from '@/app/lib/learningMaterials'

export default function ComparePage() {
  const [currentComparison, setCurrentComparison] = useState(0)
  const [completedComparisons, setCompletedComparisons] = useState<number[]>([])
  const [showCongrats, setShowCongrats] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  const materials = COMPARISON_MATERIALS
  const material = materials[currentComparison]

  // Function to play audio using Web Speech API
  const playAudio = (text: string, lang: string = 'id-ID') => {
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 0.9
    utterance.pitch = 1.2
    
    synthRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const handlePlayLetterSound = (isLeft: boolean) => {
    if (isLeft) {
      playAudio(material.letterLeft.sound)
    } else {
      playAudio(material.letterRight.sound)
    }
  }

  const handlePreviousComparison = () => {
    if (currentComparison > 0) {
      setCurrentComparison(currentComparison - 1)
    }
  }

  const handleNextComparison = () => {
    if (currentComparison < materials.length - 1) {
      setCurrentComparison(currentComparison + 1)
    } else if (currentComparison === materials.length - 1) {
      setShowCongrats(true)
    }
  }

  const handleSelectComparison = (index: number) => {
    setCurrentComparison(index)
    setShowDropdown(false)
  }

  const isFirst = currentComparison === 0
  const isLast = currentComparison === materials.length - 1
  const progressPercentage = ((currentComparison + 1) / materials.length) * 100

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
              <span className="text-red-500">BANDINGKAN</span>
              <span className="text-blue-600"> HURUF!</span>
            </h1>

            {/* Pilih Perbandingan Button */}
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Pilih Huruf
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">Progress Membandingkan</span>
              <span className="text-sm font-bold text-gray-800">{currentComparison + 1}/{materials.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Perbedaan Huruf {material.letterLeft.uppercase} dan {material.letterRight.uppercase}
          </h2>

          {/* Comparison Grid */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Left Side - Letter Left */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handlePlayLetterSound(true)}
                className="bg-linear-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 w-full h-80 flex items-center justify-center border-4 border-blue-300 shadow-md cursor-pointer hover:shadow-lg transition-shadow mb-6"
              >
                <div className="text-center">
                  <div className="text-9xl font-bold text-blue-600 mb-6">
                    {material.letterLeft.uppercase}{material.letterLeft.lowercase}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlayLetterSound(true)
                    }}
                    className="bg-blue-500 text-white rounded-full p-4 hover:bg-blue-600 transition-colors inline-flex items-center justify-center"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                </div>
              </button>

              {/* Example Cards */}
              <div className="flex gap-3 w-full">
                {material.letterLeft.examples.map((example, idx) => (
                  <button 
                    key={idx}
                    onClick={() => playAudio(example.word)}
                    className="flex-1 bg-white border-2 border-blue-200 rounded-xl p-3 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{example.emoji}</div>
                      <div className="font-bold text-blue-900 text-sm">{example.word.toLowerCase()}</div>
                      <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-full mt-2">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Letter Right */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handlePlayLetterSound(false)}
                className="bg-linear-to-br from-pink-100 to-rose-100 rounded-3xl p-8 w-full h-80 flex items-center justify-center border-4 border-pink-300 shadow-md cursor-pointer hover:shadow-lg transition-shadow mb-6"
              >
                <div className="text-center">
                  <div className="text-9xl font-bold text-pink-600 mb-6">
                    {material.letterRight.uppercase}{material.letterRight.lowercase}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlayLetterSound(false)
                    }}
                    className="bg-pink-500 text-white rounded-full p-4 hover:bg-pink-600 transition-colors inline-flex items-center justify-center"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                </div>
              </button>

              {/* Example Cards */}
              <div className="flex gap-3 w-full">
                {material.letterRight.examples.map((example, idx) => (
                  <button 
                    key={idx}
                    onClick={() => playAudio(example.word)}
                    className="flex-1 bg-white border-2 border-pink-200 rounded-xl p-3 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{example.emoji}</div>
                      <div className="font-bold text-pink-900 text-sm">{example.word.toLowerCase()}</div>
                      <span className="inline-flex items-center justify-center w-7 h-7 bg-pink-500 text-white rounded-full mt-2">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-center flex-wrap pt-6 border-t-2 border-gray-200">
            <button
              onClick={handlePreviousComparison}
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
              onClick={handleNextComparison}
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
      </div>

      {/* Dropdown Panel */}
      {showDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}>
          <div 
            className="fixed right-0 top-16 h-screen bg-white shadow-2xl p-6 w-80 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Pilih Perbandingan</h3>
            <div className="flex flex-col gap-3">
              {materials.map((mat, index) => (
                <button
                  key={mat.id}
                  onClick={() => handleSelectComparison(index)}
                  className={`p-4 rounded-xl font-bold text-center transition-all duration-200 ${
                    currentComparison === index
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {mat.letterLeft.uppercase} ↔ {mat.letterRight.uppercase}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Congratulations Modal */}
      {showCongrats && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/Maskot%20-%203%201.png"
                alt="Maskot Preder"
                width={120}
                height={120}
                priority
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Yeay! Kamu sudah membandingkan semua huruf!
            </h3>
            <p className="text-gray-600 mb-6 text-base md:text-lg">
              Hebat sekali! Sekarang kamu sudah tahu perbedaan huruf-huruf yang mirip. Siap untuk tes?
            </p>
            <div className="flex flex-col md:flex-row gap-3">
              <Link
                href="/tes"
                className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg inline-block"
              >
                Mulai Tes Sekarang →
              </Link>
              <button
                onClick={() => setShowCongrats(false)}
                className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-all duration-200"
              >
                Nanti Dulu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
