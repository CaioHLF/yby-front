'use client'
// Sidebar do Adquirente — V0 (stub mínimo).
// Visual idêntico ao Sidebar legacy do Sub-adquirente.

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Icon from '@/components/shared/Icon'
import { useNavStore } from '@/store/nav.store'
import { useAuthStore } from '@/store/auth.store'
import { logout as apiLogout } from '@/services/authService'

const NAV = [{ key: 'dashboard', icon: 'dashboard', label: 'Dashboard', route: '/adquirente/dashboard' }]

export default function AqSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const sidebarOpen = useNavStore((s) => s.sidebarOpen)
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [hoveredLogout, setHoveredLogout] = useState(false)

  const handleLogout = async () => {
    try { await apiLogout() } catch { /* ignore */ }
    clearAuth()
    router.replace('/login')
  }

  return (
    <div
      style={{
        width: sidebarOpen ? 207 : 48,
        minHeight: '100%',
        background: '#fff',
        boxShadow: '2px 0 8px rgba(0,0,0,0.08)',
        transition: 'width 0.2s cubic-bezier(0.645,0.045,0.355,1)',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingTop: 8 }}>
        {NAV.map((item) => {
          const isActive = pathname === item.route
          const isHovered = hoveredKey === item.key
          const accent = isActive || isHovered
          return (
            <div
              key={item.key}
              onClick={() => router.push(item.route)}
              onMouseEnter={() => setHoveredKey(item.key)}
              onMouseLeave={() => setHoveredKey(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: sidebarOpen ? '0 16px' : '0 14px',
                height: 40,
                cursor: 'pointer',
                background: accent ? 'rgba(24,144,255,0.08)' : 'transparent',
                borderRight: accent ? '3px solid #1890FF' : '3px solid transparent',
                color: accent ? '#1890FF' : 'rgba(0,0,0,0.65)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', color: accent ? '#1890FF' : 'rgba(0,0,0,0.45)' }}>
                <Icon name={item.icon} size={16} />
              </div>
              {sidebarOpen && (
                <span style={{ flex: 1, fontSize: 13, fontWeight: accent ? 500 : 400 }}>{item.label}</span>
              )}
            </div>
          )
        })}
        {sidebarOpen && (
          <div style={{ padding: '24px 16px', fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
            Adquirente · v0 stub<br />
            Mais módulos virão em fases futuras.
          </div>
        )}
      </div>

      <div style={{ padding: '12px 0', borderTop: '1px solid #f0f0f0' }}>
        <div
          onClick={handleLogout}
          onMouseEnter={() => setHoveredLogout(true)}
          onMouseLeave={() => setHoveredLogout(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: sidebarOpen ? '0 16px' : '0 14px',
            height: 40,
            cursor: 'pointer',
            color: hoveredLogout ? '#1890FF' : 'rgba(0,0,0,0.45)',
            background: hoveredLogout ? 'rgba(24,144,255,0.08)' : 'transparent',
            borderRight: hoveredLogout ? '3px solid #1890FF' : '3px solid transparent',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon name="logOut" size={16} />
          </div>
          {sidebarOpen && <span style={{ fontSize: 13 }}>Sair</span>}
        </div>
      </div>
    </div>
  )
}
