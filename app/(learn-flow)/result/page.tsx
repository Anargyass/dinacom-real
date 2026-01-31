'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface SessionData {
  id: number
  question_id: string
  question_text: string
  user_answer: string
  correct_answer: string
  is_correct: boolean
  difficulty: string
  target_letter_pair: string
  answered_at: string
}

interface ResultStats {
  easyCorrect: number
  easyTotal: number
  mediumCorrect: number
  mediumTotal: number
  hardCorrect: number
  hardTotal: number
  totalCorrect: number
  totalQuestions: number
  percentage: number
  level: string
}

interface ErrorPattern {
  letter_pair: string
  error_count: number
  total_count: number
  error_rate: string
}

interface ReportData {
  session_id: string
  total_questions: number
  correct_answers: number
  wrong_answers: number
  accuracy_rate: string
  overall_value: string
  error_patterns: ErrorPattern[]
  difficulty_stats: Record<string, number>
  ai_analysis: string
  recommendations: string
}

const API_BASE_URL = 'https://dinacom-be.evandra.works'

export default function ResultPage() {
  const [sessionData, setSessionData] = useState<SessionData[]>([])
  const [stats, setStats] = useState<ResultStats | null>(null)
  const [report, setReport] = useState<ReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string>('')
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    const storedUserId = localStorage.getItem('preder_user_id')
    const storedSessionId = localStorage.getItem('preder_current_session_id')
    
    if (storedUserId && storedSessionId) {
      setUserId(storedUserId)
      setSessionId(storedSessionId)
      fetchReportStats(storedSessionId)
    }
  }, [])

  const fetchReportStats = async (sId: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API_BASE_URL}/report/sessions/${sId}`)
      const result = await response.json()

      if (result.success && result.data) {
        setReport(result.data)
        
        // Parse accuracy_rate string to number (e.g., "50.0%" -> 50)
        const accuracyString = result.data.accuracy_rate.replace('%', '')
        const percentage = Math.round(parseFloat(accuracyString))
        
        // Determine level based on accuracy
        let level = 'Pemula'
        if (percentage >= 80) {
          level = 'Jenius'
        } else if (percentage >= 60) {
          level = 'Pintar'
        } else if (percentage >= 40) {
          level = 'Lumayan'
        }
        
        // Extract difficulty stats from report
        // difficulty_stats contains total attempts (number of questions answered)
        const diffStats = result.data.difficulty_stats || {}
        const easyTotal = diffStats.easy || 0
        const mediumTotal = diffStats.medium || 0
        const hardTotal = diffStats.hard || 0
        
        // User needs 3 correct answers to pass each difficulty level
        // So the correct count is always 3 for each level they completed
        // If they didn't complete a level, we calculate from total attempts
        const easyCorrect = easyTotal > 0 ? Math.min(3, easyTotal) : 0
        const mediumCorrect = mediumTotal > 0 ? Math.min(3, mediumTotal) : 0
        const hardCorrect = hardTotal > 0 ? Math.min(3, hardTotal) : 0
        
        setStats({
          easyCorrect,
          easyTotal,
          mediumCorrect,
          mediumTotal,
          hardCorrect,
          hardTotal,
          totalCorrect: result.data.correct_answers,
          totalQuestions: result.data.total_questions,
          percentage,
          level
        })
      }
    } catch (error) {
      console.error('Error fetching report stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5EFE7] flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-900">Memuat hasil...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#F5EFE7] flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-900">Tidak ada data hasil</div>
      </div>
    )
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Jeniús':
        return 'text-green-600'
      case 'Pintar':
        return 'text-blue-600'
      case 'Lumayan':
        return 'text-yellow-600'
      default:
        return 'text-gray-600'
    }
  }

  const getLevelLetter = (percentage: number) => {
    if (percentage >= 80) return 'A'
    if (percentage >= 60) return 'B'
    if (percentage >= 40) return 'C'
    return 'D'
  }

  const getGradeForDifficulty = (correct: number, total: number) => {
    if (total === 0) return 'N/A'
    const percentage = (correct / total) * 100
    if (percentage >= 80) return 'A'
    if (percentage >= 60) return 'B'
    if (percentage >= 40) return 'C'
    return 'D'
  }

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Header */}
      

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          {/* Title */}
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-gray-400 mx-auto mb-4"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Hasil Tes</h2>
            <div className="w-16 h-1 bg-gray-400 mx-auto"></div>
          </div>

          {/* Score Circle and Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Circular Progress */}
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeDasharray={`${(stats.percentage / 100) * 440} 440`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-gray-900">
                      {stats.percentage}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Level Info */}
            <div className="flex flex-col justify-center">
              <p className="text-gray-600 text-lg mb-4">Kemampuan anak anda digolongkan sebagai:</p>
              <h3 className={`text-5xl md:text-6xl font-bold ${getLevelColor(stats.level)}`}>
                {stats.level}
              </h3>
            
            </div>
          </div>

          {/* Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Easy Level */}
            <div className="bg-linear-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold">Easy level:</h4>
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{getGradeForDifficulty(stats.easyCorrect, stats.easyTotal)}</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full transition-all"
                    style={{ width: `${(stats.easyCorrect / stats.easyTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {stats.easyCorrect}/{stats.easyTotal}
                </p>
              </div>
            </div>

            {/* Medium Level */}
            <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold">Medium level:</h4>
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{getGradeForDifficulty(stats.mediumCorrect, stats.mediumTotal)}</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full transition-all"
                    style={{ width: `${(stats.mediumCorrect / stats.mediumTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {stats.mediumCorrect}/{stats.mediumTotal}
                </p>
              </div>
            </div>

            {/* Hard Level */}
            <div className="bg-linear-to-br from-slate-700 to-slate-800 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold">Hard level:</h4>
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{getGradeForDifficulty(stats.hardCorrect, stats.hardTotal)}</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-teal-500 h-full rounded-full transition-all"
                    style={{ width: `${(stats.hardCorrect / stats.hardTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {stats.hardCorrect}/{stats.hardTotal}
                </p>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-8 mb-12">
            {/* Top Row - AI Analysis and Error Patterns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Top Left - AI Analysis */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Analisis AI:</h4>
                <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none">
                  <ReactMarkdown>{report?.ai_analysis || 'Sedang menganalisis...'}</ReactMarkdown>
                </div>
              </div>

              {/* Top Right - Error Patterns */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Pola Kesalahan:</h4>
                {report?.error_patterns && report.error_patterns.length > 0 ? (
                  <ul className="space-y-3">
                    {report.error_patterns.map((pattern, index) => (
                      <li key={index} className="flex items-start">
                        <span className="font-bold text-gray-900 mr-3">•</span>
                        <span className="text-gray-700">
                          Huruf <span className="font-bold">{pattern.letter_pair}</span>: {pattern.error_count}/{pattern.total_count} salah ({pattern.error_rate})
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">Tidak ada pola kesalahan yang terdeteksi.</p>
                )}
              </div>
            </div>

            {/* Bottom Row - Recommendations (Full Width) */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4 text-lg">Rekomendasi:</h4>
              <div className="text-gray-700 leading-relaxed prose prose-sm max-w-none">
                <ReactMarkdown>{report?.recommendations || 'Sedang menyiapkan rekomendasi...'}</ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center">
            <Link
              href="/chatbot"
              className="px-16 py-4 bg-slate-800 text-white font-bold text-lg rounded-lg hover:bg-slate-900 transition-colors"
            >
              Selanjutnya
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
