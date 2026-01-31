'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Question {
  id: string
  difficulty: string
  questionText: string
  targetLetterPair: string
  targetLetter: string
  options: string[]
  hint: string
  answer: string
}

interface AnswerResponse {
  success: boolean
  message: string
  data: {
    is_correct: boolean
    user_answer: string
    correct_answer: string
    question_id: string
    session_id: string
  }
}

const API_BASE_URL = 'https://dinacom-be.evandra.works'

export default function TestPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [currentDifficulty, setCurrentDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [correctCount, setCorrectCount] = useState(0)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [totalWrong, setTotalWrong] = useState(0)
  const [userId, setUserId] = useState<string>('')
  const [sessionId, setSessionId] = useState<string>('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)
  
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Generate or get user ID from localStorage
  useEffect(() => {
    let storedUserId = localStorage.getItem('preder_user_id')
    if (!storedUserId) {
      storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('preder_user_id', storedUserId)
    }
    setUserId(storedUserId)

    // Clear old session and generate new session ID for this test
    localStorage.removeItem('preder_current_session_id')
    localStorage.removeItem('preder_chatbot_session_id')
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    setSessionId(newSessionId)
    localStorage.setItem('preder_current_session_id', newSessionId)
  }, [])

  // Fetch initial questions
  useEffect(() => {
    if (userId && sessionId) {
      fetchQuestions('easy', 3)
    }
  }, [userId, sessionId])

  const fetchQuestions = async (difficulty: string, count: number) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_BASE_URL}/questions/generate?count=${count}&difficulty=${difficulty}&includeAnswer=true&use_ai=true`)
      const result = await response.json()
      
      if (result.success) {
        setQuestions(result.data)
        setCurrentQuestionIndex(0)
        setSelectedAnswer(null)
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async (answer: string) => {
    if (isSubmitting) return
    
    try {
      setIsSubmitting(true)
      
      // Determine if answer is correct first (simple check)
      const currentQuestion = questions[currentQuestionIndex]
      const isCorrect = answer.toLowerCase() === currentQuestion.answer.toLowerCase()
      
      // Send answer with use_ai=false if wrong, no parameter if correct
      const url = isCorrect 
        ? `${API_BASE_URL}/questions/answer`
        : `${API_BASE_URL}/questions/answer?use_ai=false`
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          session_id: sessionId,
          question_id: questions[currentQuestionIndex].id,
          answer: answer
        })
      })
      
      const result: AnswerResponse = await response.json()
      
      if (result.success) {
        const isCorrect = result.data.is_correct
        setLastAnswerCorrect(isCorrect)
        setShowFeedback(true)
        
        if (isCorrect) {
          setTotalCorrect(prev => prev + 1)
          setCorrectCount(prev => prev + 1)
          
          // Check if user has 3 correct answers in current difficulty
          if (correctCount + 1 >= 3) {
            // Move to next difficulty
            if (currentDifficulty === 'easy') {
              setCurrentDifficulty('medium')
              setCorrectCount(0)
              setTimeout(() => {
                setShowFeedback(false)
                fetchQuestions('medium', 3)
              }, 2000)
              return
            } else if (currentDifficulty === 'medium') {
              setCurrentDifficulty('hard')
              setCorrectCount(0)
              setTimeout(() => {
                setShowFeedback(false)
                fetchQuestions('hard', 3)
              }, 2000)
              return
            } else {
              // Completed all difficulties
              setTimeout(() => {
                setShowFeedback(false)
                router.push('/result')
              }, 2000)
              return
            }
          }
        } else {
          setTotalWrong(prev => prev + 1)
        }
        
        // Move to next question or generate new one
        setTimeout(() => {
          setShowFeedback(false)
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1)
            setSelectedAnswer(null)
          } else {
            // Generate 1 new question with same difficulty
            fetchQuestions(currentDifficulty, 1)
          }
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
    if (questions[currentQuestionIndex]) {
      playAudio(questions[currentQuestionIndex].answer)
    }
  }

  const handleSelectAnswer = (answer: string) => {
    if (!isSubmitting && !showFeedback) {
      setSelectedAnswer(answer)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer && !isSubmitting) {
      submitAnswer(selectedAnswer)
    }
  }

  const currentQuestion = questions[currentQuestionIndex]
  // Random motivational quotes
  const loadingQuotes = [
    "Semangat belajar ya! Kamu pasti bisa! 💪",
    "Huruf-huruf ini mudah kok, pelan-pelan saja! 🌟",
    "Kamu hebat! Terus semangat! ⭐",
    "Belajar itu menyenangkan, yuk kita mulai! 🎉",
    "Setiap huruf punya cerita tersendiri! 📖",
    "Kamu sudah siap, ayo kita mulai! 🚀",
    "Percaya pada dirimu sendiri! 💫"
  ]
  
  const randomQuote = loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5EFE7] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 max-w-md px-4">
          <div className="animate-bounce">
            <Image
              src="/images/Maskot%20-%203%201.png"
              alt="Maskot Preder"
              width={150}
              height={150}
              priority
            />
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900 text-center">
            {randomQuote}
          </p>
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-[#F5EFE7]">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/Maskot%20-%203%201.png"
                alt="Maskot Preder"
                width={120}
                height={120}
                priority
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Selamat! Kamu Berhasil!
            </h2>
            <div className="grid grid-cols-2 gap-6 mb-8 max-w-md mx-auto">
              <div className="bg-green-100 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Benar</p>
                <p className="text-3xl font-bold text-green-600">{totalCorrect}</p>
              </div>
              <div className="bg-red-100 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Salah</p>
                <p className="text-3xl font-bold text-red-600">{totalWrong}</p>
              </div>
            </div>
            <p className="text-gray-600 text-lg mb-8">
              Kamu telah menyelesaikan semua level! Hebat sekali!
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

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
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
              <span className="text-green-600">DENGARKAN</span>
              <span className="text-blue-600"> DENGAN BAIK!</span>
            </h1>

            <div className="px-4 py-2 bg-purple-100 rounded-lg">
              <span className="font-bold text-purple-900 capitalize">{currentDifficulty}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-600">Level: {currentDifficulty}</span>
              <span className="text-sm font-bold text-gray-800">Benar: {correctCount}/3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(correctCount / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            {currentQuestion.questionText}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(option)}
                    disabled={isSubmitting || showFeedback}
                    className={`py-4 rounded-xl font-bold text-lg transition-all duration-200 border-2 ${
                      selectedAnswer === option
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-blue-600 border-blue-300 hover:border-blue-600'
                    } ${(isSubmitting || showFeedback) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                onClick={handlePlayQuestion}
                className="bg-linear-to-br from-blue-100 to-blue-200 rounded-full p-12 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <Image
                  src="/images/Group%2022.png"
                  alt="Audio"
                  width={80}
                  height={80}
                />
              </button>
            </div>
          </div>

          {showFeedback && (
            <div className={`mb-8 p-4 rounded-xl text-center ${
              lastAnswerCorrect ? 'bg-green-100 border-2 border-green-300' : 'bg-red-100 border-2 border-red-300'
            }`}>
              <p className={`text-lg font-bold ${lastAnswerCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {lastAnswerCorrect ? '✓ Benar! Hebat!' : '✗ Salah, coba lagi!'}
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center flex-wrap pt-6 border-t-2 border-gray-200">
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedAnswer || isSubmitting || showFeedback}
              className={`px-8 py-3 rounded-lg font-bold transition-all duration-200 ${
                !selectedAnswer || isSubmitting || showFeedback
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              {isSubmitting ? 'Mengirim...' : 'Pilih ✓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
