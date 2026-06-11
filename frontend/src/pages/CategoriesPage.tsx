import { useState, useEffect, useCallback } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { api } from '../api/client'
import type { Category } from '../types'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'

interface FormData {
  name: string
  domain: string
  isEssential: boolean
}

const defaultForm: FormData = { name: '', domain: '', isEssential: false }

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<FormData>(defaultForm)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.categories.list()
      setCategories(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const publicCategories = categories.filter((c) => c.userId === null)
  const customCategories = categories.filter((c) => c.userId !== null)

  const openModal = () => {
    setForm(defaultForm)
    setFormError('')
    setModalOpen(true)
  }

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (!form.name.trim()) return setFormError('카테고리 이름을 입력해주세요.')
    if (!form.domain.trim()) return setFormError('도메인 코드를 입력해주세요.')

    setSubmitting(true)
    try {
      const created = await api.categories.create({
        name: form.name.trim(),
        domain: form.domain.trim().toLowerCase(),
        isEssential: form.isEssential,
      })
      setCategories((prev) => [...prev, created])
      setModalOpen(false)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleteId(id)
    try {
      await api.categories.delete(id)
      setCategories((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      console.error(err)
    } finally {
      setDeleteId(null)
    }
  }

  const CategoryRow = ({
    category,
    deletable,
  }: {
    category: Category
    deletable: boolean
  }) => (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-[rgba(0,0,0,0.1)]">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{category.name}</span>
          {category.isEssential && <Badge variant="essential">필수</Badge>}
        </div>
        <p className="text-xs text-notion-gray-300 mt-0.5">{category.domain}</p>
      </div>
      {deletable && (
        <Button
          variant="danger"
          size="sm"
          loading={deleteId === category.id}
          onClick={() => handleDelete(category.id)}
          aria-label="삭제"
        >
          <Trash2 size={13} />
        </Button>
      )}
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight">카테고리</h1>
          <p className="text-sm text-notion-gray-500 mt-0.5">지출 분류 카테고리 관리</p>
        </div>
        <Button variant="primary" onClick={openModal}>
          <Plus size={14} />
          카테고리 추가
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-white border border-[rgba(0,0,0,0.06)] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Custom categories */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-notion-gray-500 uppercase tracking-wide">
                내 카테고리
              </h2>
              <span className="text-xs text-notion-gray-300">{customCategories.length}개</span>
            </div>
            {customCategories.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-xl border border-[rgba(0,0,0,0.1)]">
                <p className="text-sm text-notion-gray-300">아직 커스텀 카테고리가 없습니다.</p>
                <button
                  onClick={openModal}
                  className="mt-2 text-sm text-notion-blue hover:underline font-medium"
                >
                  추가하기
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {customCategories.map((c) => (
                  <CategoryRow key={c.id} category={c} deletable />
                ))}
              </div>
            )}
          </section>

          {/* Public categories */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-notion-gray-500 uppercase tracking-wide">
                공통 카테고리
              </h2>
              <span className="text-xs text-notion-gray-300">{publicCategories.length}개</span>
            </div>
            <div className="space-y-2">
              {publicCategories.map((c) => (
                <CategoryRow key={c.id} category={c} deletable={false} />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Add modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="카테고리 추가">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="cat-name"
            label="카테고리 이름"
            placeholder="반려동물"
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            required
          />
          <Input
            id="cat-domain"
            label="도메인 코드"
            placeholder="pet"
            value={form.domain}
            onChange={(e) => setField('domain', e.target.value)}
            hint="소문자 영문, 예: pet · hobby · car"
            required
          />
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isEssential}
              onChange={(e) => setField('isEssential', e.target.checked)}
              className="w-4 h-4 rounded accent-notion-blue"
            />
            <span className="text-sm font-medium">필수 지출로 표시</span>
          </label>

          {formError && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{formError}</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              취소
            </Button>
            <Button type="submit" variant="primary" loading={submitting}>
              추가
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
