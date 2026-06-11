import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Check, SkipForward } from 'lucide-react'
import { api } from '../api/client'
import type { ExpenseInstance, InstanceStatus } from '../types'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'

function formatAmount(n: number) {
  return n.toLocaleString('ko-KR') + '원'
}

function formatDueDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}월 ${d.getDate()}일`
}

function StatusBadge({ status }: { status: InstanceStatus }) {
  if (status === 'PAID') return <Badge variant="paid">결제완료</Badge>
  if (status === 'SKIPPED') return <Badge variant="skipped">건너뜀</Badge>
  return <Badge variant="pending">예정</Badge>
}

export function DashboardPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [instances, setInstances] = useState<ExpenseInstance[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const from = `${year}-${String(month).padStart(2, '0')}-01`
  const lastDay = new Date(year, month, 0).getDate()
  const to = `${year}-${String(month).padStart(2, '0')}-${lastDay}`

  const fetchInstances = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.expenseInstances.list(from, to)
      setInstances(
        [...data].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()),
      )
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [from, to])

  useEffect(() => {
    fetchInstances()
  }, [fetchInstances])

  const prevMonth = () => {
    if (month === 1) {
      setYear((y) => y - 1)
      setMonth(12)
    } else {
      setMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (month === 12) {
      setYear((y) => y + 1)
      setMonth(1)
    } else {
      setMonth((m) => m + 1)
    }
  }

  const handlePay = async (id: string) => {
    setActionLoading(id)
    try {
      await api.expenseInstances.pay(id)
      setInstances((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'PAID' as const } : i)))
    } finally {
      setActionLoading(null)
    }
  }

  const handleSkip = async (id: string) => {
    setActionLoading(id)
    try {
      await api.expenseInstances.skip(id)
      setInstances((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'SKIPPED' as const } : i)))
    } finally {
      setActionLoading(null)
    }
  }

  const pending = instances.filter((i) => i.status === 'PENDING')
  const paid = instances.filter((i) => i.status === 'PAID')
  const skipped = instances.filter((i) => i.status === 'SKIPPED')
  const totalAmount = instances.reduce((s, i) => s + i.amount, 0)
  const pendingAmount = pending.reduce((s, i) => s + i.amount, 0)
  const paidAmount = paid.reduce((s, i) => s + i.amount, 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight">대시보드</h1>
          <p className="text-sm text-notion-gray-500 mt-0.5">이번 달 고정 지출 현황</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={prevMonth} aria-label="이전 달">
            <ChevronLeft size={14} />
          </Button>
          <span className="text-sm font-semibold w-20 text-center">
            {year}년 {month}월
          </span>
          <Button variant="secondary" size="sm" onClick={nextMonth} aria-label="다음 달">
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4">
        <Card className="text-center py-4">
          <p className="text-xs text-notion-gray-500 mb-1">이번 달 총액</p>
          <p className="text-base font-bold">{formatAmount(totalAmount)}</p>
          <p className="text-xs text-notion-gray-300 mt-0.5">{instances.length}건</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-xs text-notion-gray-500 mb-1">미결제</p>
          <p className="text-base font-bold text-amber-600">{formatAmount(pendingAmount)}</p>
          <p className="text-xs text-notion-gray-300 mt-0.5">{pending.length}건</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-xs text-notion-gray-500 mb-1">결제완료</p>
          <p className="text-base font-bold text-notion-green">{formatAmount(paidAmount)}</p>
          <p className="text-xs text-notion-gray-300 mt-0.5">{paid.length}건</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-xs text-notion-gray-500 mb-1">건너뜀</p>
          <p className="text-base font-bold text-notion-gray-500">{skipped.length}건</p>
        </Card>
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[68px] rounded-xl bg-white border border-[rgba(0,0,0,0.06)] animate-pulse" />
          ))}
        </div>
      ) : instances.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sm text-notion-gray-300">이번 달 지출 내역이 없습니다.</p>
          <p className="text-xs text-notion-gray-300 mt-1">반복 지출 규칙을 추가하면 자동으로 생성됩니다.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {instances.map((instance) => (
            <div
              key={instance.id}
              className={[
                'flex items-center gap-4 px-4 py-3.5 bg-white rounded-xl',
                'border border-[rgba(0,0,0,0.1)] transition-opacity',
                instance.status !== 'PENDING' ? 'opacity-55' : '',
              ].join(' ')}
            >
              {/* Date */}
              <div className="w-14 flex-shrink-0 text-center">
                <span className="text-xs font-semibold text-notion-gray-500">
                  {formatDueDate(instance.dueDate)}
                </span>
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-[rgba(0,0,0,0.08)] flex-shrink-0" />

              {/* Name + amount */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{instance.recurring.name}</p>
                <p className="text-xs text-notion-gray-500">{formatAmount(instance.amount)}</p>
              </div>

              {/* Status */}
              <div className="flex-shrink-0">
                <StatusBadge status={instance.status} />
              </div>

              {/* Actions (only for PENDING) */}
              {instance.status === 'PENDING' && (
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="primary"
                    loading={actionLoading === instance.id}
                    onClick={() => handlePay(instance.id)}
                  >
                    <Check size={12} />
                    결제
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    disabled={actionLoading === instance.id}
                    onClick={() => handleSkip(instance.id)}
                  >
                    <SkipForward size={12} />
                    건너뜀
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
