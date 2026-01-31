'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface ChatHistory {
  role: 'user' | 'assistant'
  message: string
  created_at: string
}

const API_BASE_URL = 'https://dinacom-be.evandra.works'

export default function ChatbotPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionId, setSessionId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Fetch chat history on mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        setIsLoading(true)
        
        // Get session ID from current test (same session used for report)
        let sId = localStorage.getItem('preder_current_session_id')
        
        // Fallback to chatbot session if available
        if (!sId) {
          sId = localStorage.getItem('preder_chatbot_session_id')
        }
        
        // If still no session, use default test session ID
        if (!sId) {
          sId = 'session_1769847497058_81didtoc1'
        }
        
        localStorage.setItem('preder_chatbot_session_id', sId)
        setSessionId(sId)
        
        // Fetch chat history
        const response = await fetch(`${API_BASE_URL}/chatbot/sessions/${sId}/history`)
        const result = await response.json()
        
        if (result.success && result.data) {
          // Convert chat history to Message format
          const historyMessages: Message[] = result.data.map((item: ChatHistory, index: number) => ({
            id: index.toString(),
            type: item.role === 'user' ? 'user' : 'ai',
            content: item.message,
            timestamp: new Date(item.created_at)
          }))
          
          setMessages(historyMessages)
        }
      } catch (error) {
        console.error('Error fetching chat history:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchChatHistory()
  }, [])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !sessionId) return

    // Add user message to UI
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Send message to chatbot API
      const response = await fetch(`${API_BASE_URL}/chatbot/sessions/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content
        })
      })

      const result = await response.json()

      if (result.success && result.data?.response) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: result.data.response,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-[#F5EFE7] flex flex-col">
      {/* Header with Navigation - Fixed Position */}
      <div className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/result"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Kembali</span>
            </Link>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              AI Assistant
            </h1>

            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for Fixed Header */}
      <div className="h-[72px]"></div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Memuat percakapan...</div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Belum ada percakapan</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}
                >
                  {message.type === 'ai' && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                        <Image
                          src="/images/Maskot%20-%203%201.png"
                          alt="AI Avatar"
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-xl rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-teal-600 text-white'
                        : 'bg-white shadow-md text-gray-900'
                    }`}
                  >
                    {message.type === 'ai' ? (
                      <div className="prose prose-sm max-w-none text-gray-900">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
                    )}
                    
                    {message.type === 'ai' && message.id === '1' && (
                      <div className="mt-4">
                        <button className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors">
                          Lihat Detail
                        </button>
                      </div>
                    )}
                  </div>

                  {message.type === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex justify-start items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/images/Maskot%20-%203%201.png"
                      alt="AI Avatar"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tanyakan sesuatu..."
                className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-black"
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-gray-600"
                onClick={() => {
                  // Voice input functionality
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
          </div>
        </div>
    )   
}

