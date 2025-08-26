'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AuthFormProps {
  type: 'login' | 'signup'
}

export default function AuthForm({ type }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaQuestion, setCaptchaQuestion] = useState('')
  const [captchaSolution, setCaptchaSolution] = useState('')
  const router = useRouter()

  // Generate a new captcha question
  const generateCaptcha = () => {
    const captchaOptions = [
      { question: 'Type the word "human"', answer: 'human' },
      { question: 'Type "yes" to confirm you are human', answer: 'yes' },
      { question: 'What color is the sky? (one word)', answer: 'blue' },
      { question: 'Type "real" to prove you are not a bot', answer: 'real' },
      { question: 'What do you call a baby cat?', answer: 'kitten' },
      { question: 'Type "person" to continue', answer: 'person' },
      { question: 'What is 2+2? (spell it out)', answer: 'four' },
      { question: 'Type "alive" to verify you are human', answer: 'alive' },
      { question: 'What do you call a baby dog?', answer: 'puppy' },
      { question: 'Type "thinking" to show you can think', answer: 'thinking' },
      { question: 'What is the opposite of "no"?', answer: 'yes' },
      { question: 'Type "conscious" to proceed', answer: 'conscious' },
      { question: 'What do you call a baby bird?', answer: 'chick' },
      { question: 'Type "aware" to confirm awareness', answer: 'aware' },
      { question: 'What is the first letter of the alphabet?', answer: 'a' }
    ]
    
    const randomCaptcha = captchaOptions[Math.floor(Math.random() * captchaOptions.length)]
    
    setCaptchaQuestion(randomCaptcha.question)
    setCaptchaSolution(randomCaptcha.answer.toLowerCase())
    setCaptchaAnswer('')
  }

  // Generate captcha on component mount and when type changes
  useEffect(() => {
    if (type === 'signup') {
      generateCaptcha()
    }
  }, [type])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (type === 'signup') {
        // Validate captcha for signup
        if (captchaAnswer.toLowerCase().trim() !== captchaSolution) {
          setError('Please answer the captcha correctly')
          generateCaptcha() // Generate new captcha on wrong answer
          setLoading(false)
          return
        }

        // Sign up
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.error || 'Failed to create account')
          generateCaptcha() // Generate new captcha on error
          return
        }

        // After successful signup, sign in the user
        const signInResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        })

        if (signInResult?.error) {
          setError('Account created but failed to sign in. Please try logging in.')
        } else {
          router.push('/')
          router.refresh()
        }
      } else {
        // Sign in
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false
        })

        if (result?.error) {
          setError('Invalid email or password')
        } else {
          router.push('/')
          router.refresh()
        }
      }
    } catch (error) {
      setError('An unexpected error occurred')
      if (type === 'signup') {
        generateCaptcha() // Generate new captcha on error
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {type === 'login' ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {type === 'login' ? (
              <>
                Don't have an account?{' '}
                <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {type === 'signup' && (
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${
                  type === 'signup' ? '' : 'rounded-t-md'
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={type === 'login' ? 'current-password' : 'new-password'}
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${
                  type === 'signup' ? '' : 'rounded-b-md'
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {type === 'signup' && (
              <div>
                <label htmlFor="captcha" className="sr-only">
                  Captcha
                </label>
                <div className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-b-md bg-gray-50">
                  <span className="text-sm text-gray-700">{captchaQuestion}</span>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="text-blue-600 hover:text-blue-500 text-sm font-medium ml-2"
                    title="Get a different question"
                  >
                    ↻
                  </button>
                </div>
                <input
                  id="captcha"
                  name="captcha"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Type your answer here"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value)}
                />
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {type === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                type === 'login' ? 'Sign in' : 'Sign up'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
