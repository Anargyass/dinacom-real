'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LEARNING_MATERIALS } from '@/app/lib/learningMaterials'

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(LEARNING_MATERIALS.length).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  const materials = LEARNING_MATERIALS
  const material = materials[currentQuestion]

  // Generate test options (correct answer + 3 random wrong answers)
  const generateOptions = () => {
    const correctExample = material.examples[0]
    const allWords = materials.flatMap(m => m.examples.map(ex => ex.word))
    const wrongOptions = allWords
      .filter(word => word !== correctExample.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    const options = [correctExample.word, ...wrongOptions]
    return options.sort(() => Math.random() - 0.5)
  }

  const testOptions = generateOptions()

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

  const handlePlayQuestion = () => {
    playAudio(material.examples[0].word)
  }

  const handleSelectAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answer
    setSelectedAnswers(newAnswers)
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < materials.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleSelectMaterial = (index: number) => {
    setCurrentQuestion(index)
    setShowMaterialDropdown(false)
  }

  const isFirst = currentQuestion === 0
  const isLast = currentQuestion === materials.length - 1
  const correctAnswer = material.examples[0].word
  const isAnswerCorrect = selectedAnswers[currentQuestion] === correctAnswer
  const progressPercentage = ((currentQuestion + 1) / materials.length) * 100

  // Calculate score
  const correctCount = selectedAnswers.filter((answer, idx) => {
    return answer === LEARNING_MATERIALS[idx].examples[0].word
  }).length

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#F5EFE7]">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link 
                href="/learn-flow/start"
                className="flex items-center justify-center w-10 h-10 border-2 border-red-500 rounded-lg hover:bg-red-50 transition-colors"
              >
                <span className="text-red-500 font-bold text-lg">×</span>
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold text-center">
                <span className="text-blue-600">HASIL TES!</span>
              </h1>

              <div className="w-10"></div>
            </div>
          </div>
        </div>

        {/* Results Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sempurna!
            </h2>
            <p className="text-2xl font-bold text-blue-600 mb-8">
              Skor: {correctCount}/{materials.length}
            </p>
            <p className="text-gray-600 text-lg mb-8">
              {correctCount === materials.length 
                ? 'Kamu berhasil menjawab semua dengan benar! Hebat sekali!' 
                : `Bagus! Kamu benar ${correctCount} dari ${materials.length} soal.`}
            </p>
            <Link
              href="/learn-flow/start"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali ke Awal
            </Link>
          </div>
        </div>
      </div>
    )
  }

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
              <span className="text-green-600">DENGARKAN</span>
              <span className="text-blue-600"> DENGAN BAIK!</span>
            </h1>

            {/* Pilih Material Button */}
            <button 
              onClick={() => setShowMaterialDropdown(!showMaterialDropdown)}
              className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Daftar Soal
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
              <span className="text-sm font-semibold text-gray-600">Progress Tes</span>
              <span className="text-sm font-bold text-gray-800">{currentQuestion + 1}/{materials.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Question Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Kata apa yang disebutkan pada Audio tersebut?
          </h2>

          {/* Test Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left Side - Answer Options */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                {testOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(option)}
                    className={`py-4 rounded-xl font-bold text-lg transition-all duration-200 border-2 ${
                      selectedAnswers[currentQuestion] === option
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-blue-600 border-blue-300 hover:border-blue-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Audio Player */}
            <div className="flex items-center justify-center">
              <button
                onClick={handlePlayQuestion}
                className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full p-12 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <Image
                  src="/images/Group 22.png"
                  alt="Audio"
                  width={80}
                  height={80}
                />
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-center flex-wrap pt-6 border-t-2 border-gray-200">
            <button
              onClick={handlePreviousQuestion}
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
              onClick={handleNextQuestion}
              disabled={!selectedAnswers[currentQuestion]}
              className={`px-8 py-3 rounded-lg font-bold transition-all duration-200 ${
                !selectedAnswers[currentQuestion]
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : isLast
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-gray-400 text-white hover:bg-gray-500'
              }`}
            >
              {isLast ? 'Selesai ✓' : 'Selanjutnya →'}
            </button>
          </div>
        </div>
      </div>

      {/* Material Dropdown Panel */}
      {showMaterialDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowMaterialDropdown(false)}>
          <div 
            className="fixed right-0 top-16 h-screen bg-white shadow-2xl p-6 w-80 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Pilih Soal</h3>
            <div className="grid grid-cols-4 gap-3">
              {materials.map((mat, index) => (
                <button
                  key={mat.id}
                  onClick={() => handleSelectMaterial(index)}
                  className={`aspect-square rounded-xl font-bold text-2xl transition-all duration-200 ${
                    currentQuestion === index
                      ? 'bg-blue-600 text-white shadow-lg'
                      : selectedAnswers[index]
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
  )
}
