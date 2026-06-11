import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

type Mode = 'login' | 'register'

export function AuthPage() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const switchMode = (m: Mode) => {
    setMode(m)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-notion-warm-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight">TraceCash</h1>
          <p className="mt-1 text-sm text-notion-gray-500">고정 지출 추적 서비스</p>
        </div>

        <div className="bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-card p-6">
          {/* Tab toggle */}
          <div className="flex bg-black/5 rounded-lg p-0.5 mb-5">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={[
                  'flex-1 py-1.5 text-sm font-semibold rounded-md transition-all',
                  mode === m
                    ? 'bg-white shadow-sm text-black/95'
                    : 'text-notion-gray-500 hover:text-black/70',
                ].join(' ')}
              >
                {m === 'login' ? '로그인' : '회원가입'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input
              id="email"
              type="email"
              label="이메일"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              id="password"
              type="password"
              label="비밀번호"
              placeholder={mode === 'register' ? '8자 이상 입력' : '비밀번호 입력'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={mode === 'register' ? 8 : undefined}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="mt-1 justify-center w-full"
            >
              {mode === 'login' ? '로그인' : '가입하기'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
