import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, RefreshCw, Tag, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/', label: '대시보드', icon: LayoutDashboard },
  { to: '/recurring', label: '반복 지출', icon: RefreshCw },
  { to: '/categories', label: '카테고리', icon: Tag },
]

export function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-screen bg-notion-warm-white">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-white border-r border-[rgba(0,0,0,0.1)] flex flex-col">
        <div className="px-5 py-4 border-b border-[rgba(0,0,0,0.1)]">
          <span className="text-[15px] font-bold tracking-tight">TraceCash</span>
        </div>

        <nav className="flex-1 py-2 px-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-notion-blue/10 text-notion-blue font-semibold'
                    : 'text-notion-gray-500 hover:bg-black/5 hover:text-black/95 font-medium',
                ].join(' ')
              }
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-[rgba(0,0,0,0.1)]">
          <p className="text-xs text-notion-gray-300 truncate mb-2.5">{user?.email}</p>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-xs font-medium text-notion-gray-500 hover:text-black/95 transition-colors"
          >
            <LogOut size={13} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
