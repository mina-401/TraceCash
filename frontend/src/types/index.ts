export interface User {
  userId: string
  email: string
}

export interface Category {
  id: string
  userId: string | null
  name: string
  domain: string
  isEssential: boolean
}

export type Frequency = 'MONTHLY' | 'YEARLY' | 'WEEKLY'
export type InstanceStatus = 'PENDING' | 'PAID' | 'SKIPPED'

export interface RecurringExpense {
  id: string
  userId: string
  categoryId: string | null
  name: string
  amount: number
  frequency: Frequency
  interval: number
  dayOfMonth: number | null
  startDate: string
  endDate: string | null
  isActive: boolean
  createdAt: string
}

export interface ExpenseInstance {
  id: string
  recurringId: string
  amount: number
  dueDate: string
  status: InstanceStatus
  createdAt: string
  recurring: {
    id: string
    name: string
    amount: number
    categoryId: string | null
    frequency: string
    dayOfMonth: number | null
  }
}
