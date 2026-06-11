import type { User, Category, RecurringExpense, ExpenseInstance } from '../types'

const API_BASE = 'http://localhost:3000'

class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })

  if (res.status === 401) {
    localStorage.removeItem('accessToken')
    window.location.href = '/login'
    throw new ApiError(401, 'Unauthorized')
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const msg = (body as { message?: string }).message ?? `요청 실패 (${res.status})`
    throw new ApiError(res.status, msg)
  }

  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export const api = {
  auth: {
    register: (email: string, password: string) =>
      request<User>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    login: (email: string, password: string) =>
      request<{ accessToken: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: () => request<User>('/auth/me'),
  },

  categories: {
    list: () => request<Category[]>('/categories'),
    create: (data: { name: string; domain: string; isEssential?: boolean }) =>
      request<Category>('/categories', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Partial<Pick<Category, 'name' | 'domain' | 'isEssential'>>) =>
      request<Category>(`/categories/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: string) => request<void>(`/categories/${id}`, { method: 'DELETE' }),
  },

  recurringExpenses: {
    list: () => request<RecurringExpense[]>('/recurring-expenses'),
    create: (data: {
      name: string
      categoryId?: string | null
      amount: number
      frequency: string
      interval?: number
      dayOfMonth?: number | null
      startDate: string
      endDate?: string | null
    }) =>
      request<RecurringExpense>('/recurring-expenses', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (
      id: string,
      data: Partial<
        Pick<
          RecurringExpense,
          'name' | 'categoryId' | 'amount' | 'frequency' | 'interval' | 'dayOfMonth' | 'startDate' | 'endDate' | 'isActive'
        >
      >,
    ) =>
      request<RecurringExpense>(`/recurring-expenses/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    delete: (id: string) => request<void>(`/recurring-expenses/${id}`, { method: 'DELETE' }),
  },

  expenseInstances: {
    list: (from: string, to: string) =>
      request<ExpenseInstance[]>(`/expense-instances?from=${from}&to=${to}`),
    pay: (id: string) =>
      request<ExpenseInstance>(`/expense-instances/${id}/pay`, { method: 'PATCH' }),
    skip: (id: string) =>
      request<ExpenseInstance>(`/expense-instances/${id}/skip`, { method: 'PATCH' }),
  },
}
