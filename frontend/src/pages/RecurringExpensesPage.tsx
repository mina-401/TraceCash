import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { api } from '../api/client'
import type { RecurringExpense, Category, Frequency } from '../types'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'

interface FormData {
  name: string
  categoryId: string
  amount: string
  frequency: Frequency
  interval: string
  dayOfMonth: string
  startDate: string
  endDate: string
  isActive: boolean
}

const defaultForm: FormData = {
  name: '',
  categoryId: '',
  amount: '',
  frequency: 'MONTHLY',
  interval: '1',
  dayOfMonth: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  isActive: true,
}

function describeFrequency(r: RecurringExpense): string {
  const intervalLabel = r.interval > 1 ? `${r.interval}` : ''
  if (r.frequency === 'MONTHLY') {
    const day = r.dayOfMonth ? ` ${r.dayOfMonth}일` : ''
    return intervalLabel ? `${intervalLabel}개월마다${day}` : `매월${day}`
  }
  if (r.frequency === 'YEARLY') {
    return intervalLabel ? `${intervalLabel}년마다` : '매년'
  }
  if (r.frequency === 'WEEKLY') {
    return intervalLabel ? `${intervalLabel}주마다` : '매주'
  }
  return r.frequency
}

function formatAmount(n: number) {
  return n.toLocaleString('ko-KR') + '원'
}

export function RecurringExpensesPage() {
  const [expenses, setExpenses] = useState<RecurringExpense[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<RecurringExpense | null>(null)
  const [form, setForm] = useState<FormData>(defaultForm)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [exp, cats] = await Promise.all([
        api.recurringExpenses.list(),
        api.categories.list(),
      ])
      setExpenses(exp)
      setCategories(cats)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const openCreate = () => {
    setEditTarget(null)
    setForm(defaultForm)
    setFormError('')
    setModalOpen(true)
  }

  const openEdit = (r: RecurringExpense) => {
    setEditTarget(r)
    setForm({
      name: r.name,
      categoryId: r.categoryId ?? '',
      amount: String(r.amount),
      frequency: r.frequency,
      interval: String(r.interval),
      dayOfMonth: r.dayOfMonth != null ? String(r.dayOfMonth) : '',
      startDate: r.startDate.split('T')[0],
      endDate: r.endDate ? r.endDate.split('T')[0] : '',
      isActive: r.isActive,
    })
    setFormError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditTarget(null)
  }

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    const amount = parseInt(form.amount, 10)
    if (!form.name.trim()) return setFormError('이름을 입력해주세요.')
    if (isNaN(amount) || amount <= 0) return setFormError('올바른 금액을 입력해주세요.')
    if (!form.startDate) return setFormError('시작일을 선택해주세요.')

    const payload = {
      name: form.name.trim(),
      categoryId: form.categoryId || null,
      amount,
      frequency: form.frequency,
      interval: form.interval ? parseInt(form.interval, 10) : 1,
      dayOfMonth: form.dayOfMonth ? parseInt(form.dayOfMonth, 10) : null,
      startDate: form.startDate,
      endDate: form.endDate || null,
      ...(editTarget ? { isActive: form.isActive } : {}),
    }

    setSubmitting(true)
    try {
      if (editTarget) {
        const updated = await api.recurringExpenses.update(editTarget.id, payload)
        setExpenses((prev) => prev.map((r) => (r.id === editTarget.id ? updated : r)))
      } else {
        const created = await api.recurringExpenses.create(payload)
        setExpenses((prev) => [...prev, created])
      }
      closeModal()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleteId(id)
    try {
      await api.recurringExpenses.delete(id)
      setExpenses((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      console.error(err)
    } finally {
      setDeleteId(null)
    }
  }

  const getCategoryName = (id: string | null) =>
    id ? (categories.find((c) => c.id === id)?.name ?? null) : null

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight">반복 지출</h1>
          <p className="text-sm text-notion-gray-500 mt-0.5">정기적으로 발생하는 고정 지출 규칙</p>
        </div>
        <Button variant="primary" onClick={openCreate}>
          <Plus size={14} />
          새 규칙 추가
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-white border border-[rgba(0,0,0,0.06)] animate-pulse" />
          ))}
        </div>
      ) : expenses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-[rgba(0,0,0,0.1)]">
          <p className="text-sm text-notion-gray-300">등록된 반복 지출 규칙이 없습니다.</p>
          <button
            onClick={openCreate}
            className="mt-3 text-sm text-notion-blue hover:underline font-medium"
          >
            첫 번째 규칙 추가하기
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {expenses.map((expense) => {
            const catName = getCategoryName(expense.categoryId)
            return (
              <div
                key={expense.id}
                className="flex items-center gap-4 px-4 py-4 bg-white rounded-xl border border-[rgba(0,0,0,0.1)]"
              >
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold">{expense.name}</span>
                    {catName && <Badge variant="default">{catName}</Badge>}
                    {!expense.isActive && <Badge variant="inactive">비활성</Badge>}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm font-medium">{formatAmount(expense.amount)}</span>
                    <span className="text-xs text-notion-gray-300">·</span>
                    <span className="text-xs text-notion-gray-500">{describeFrequency(expense)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEdit(expense)}
                    aria-label="수정"
                  >
                    <Pencil size={13} />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    loading={deleteId === expense.id}
                    onClick={() => handleDelete(expense.id)}
                    aria-label="삭제"
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Create / Edit modal */}
      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editTarget ? '규칙 수정' : '새 반복 지출 추가'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="re-name"
            label="지출 이름"
            placeholder="넷플릭스"
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            required
          />

          <Select
            id="re-category"
            label="카테고리"
            value={form.categoryId}
            onChange={(e) => setField('categoryId', e.target.value)}
          >
            <option value="">선택 안함</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <Input
            id="re-amount"
            type="number"
            label="금액 (원)"
            placeholder="17000"
            value={form.amount}
            onChange={(e) => setField('amount', e.target.value)}
            min={1}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              id="re-frequency"
              label="주기"
              value={form.frequency}
              onChange={(e) => setField('frequency', e.target.value as Frequency)}
            >
              <option value="MONTHLY">매월</option>
              <option value="YEARLY">매년</option>
              <option value="WEEKLY">매주</option>
            </Select>

            <Input
              id="re-interval"
              type="number"
              label="간격"
              placeholder="1"
              value={form.interval}
              onChange={(e) => setField('interval', e.target.value)}
              min={1}
              hint="2 = 격월/격주"
            />
          </div>

          {form.frequency === 'MONTHLY' && (
            <Input
              id="re-dayofmonth"
              type="number"
              label="결제일 (1~31)"
              placeholder="25"
              value={form.dayOfMonth}
              onChange={(e) => setField('dayOfMonth', e.target.value)}
              min={1}
              max={31}
            />
          )}

          <div className="grid grid-cols-2 gap-3">
            <Input
              id="re-startdate"
              type="date"
              label="시작일"
              value={form.startDate}
              onChange={(e) => setField('startDate', e.target.value)}
              required
            />
            <Input
              id="re-enddate"
              type="date"
              label="종료일 (선택)"
              value={form.endDate}
              onChange={(e) => setField('endDate', e.target.value)}
              hint="비우면 무기한"
            />
          </div>

          {editTarget && (
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setField('isActive', e.target.checked)}
                className="w-4 h-4 rounded accent-notion-blue"
              />
              <span className="text-sm font-medium">활성 상태</span>
            </label>
          )}

          {formError && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{formError}</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="secondary" onClick={closeModal}>
              취소
            </Button>
            <Button type="submit" variant="primary" loading={submitting}>
              {editTarget ? '저장' : '추가'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
