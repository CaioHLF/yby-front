'use client'
// Dashboard do Estabelecimento Comercial — V0.
// Cards com header (título + descrição) e divider antes do body, padrão SUB.

import KpiCard from '@/components/ui/KpiCard'
import PageHeader from '@/components/shared/PageHeader'
import Sparkline from '@/components/shared/Sparkline'
import EmptyState from '@/components/shared/EmptyState'
import BrandLogo from '@/components/shared/BrandLogo'
import { Progress } from 'antd'
import {
  ecDashboardKpis,
  ecDashboardTpv,
  ecDashboardStatus,
  ecDashboardPaymentMethods,
  ecDashboardBrands,
  ecDashboardConversion,
  ecDashboardInstallments,
  type StatusBreakdown,
} from '@/mocks/ec/dashboard'

const cardWrapper: React.CSSProperties = {
  background: '#fff',
  border: '1px solid rgba(0,0,0,0.06)',
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
}

const cardHeader: React.CSSProperties = {
  padding: '16px 20px',
  borderBottom: '1px solid #f0f0f0',
}

const cardBody: React.CSSProperties = {
  padding: '16px 20px',
}

const cardTitle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: 'rgba(0,0,0,0.85)',
}

const cardSubtitle: React.CSSProperties = {
  fontSize: 12,
  color: 'rgba(0,0,0,0.45)',
  marginTop: 2,
}

const statusVariantMap: Record<StatusBreakdown['status'], 'success' | 'warning' | 'neutral' | 'error' | 'info'> = {
  'Pago':           'success',
  'Pendente':       'warning',
  'Cancelado':      'neutral',
  'Não autorizado': 'error',
  'Outros':         'info',
}

const fmtBRL = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })

interface SectionCardProps {
  title: string
  description?: string
  children: React.ReactNode
  flex?: number
}

function SectionCard({ title, description, children, flex }: SectionCardProps) {
  return (
    <div style={{ ...cardWrapper, flex }}>
      <div style={cardHeader}>
        <div style={cardTitle}>{title}</div>
        {description && <div style={cardSubtitle}>{description}</div>}
      </div>
      <div style={cardBody}>{children}</div>
    </div>
  )
}

export default function EcDashboard() {
  const tpvValues = ecDashboardTpv.map((p) => p.value)

  return (
    <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <PageHeader title="Dashboard" breadcrumb="Estabelecimento Comercial / Dashboard" onBack={null} />

      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* KPIs principais */}
        <div style={{ display: 'flex', gap: 24 }}>
          {ecDashboardKpis.map((k) => (
            <div key={k.label} style={{ flex: 1, minWidth: 0 }}>
              <KpiCard label={k.label} value={k.value} subLabel={k.subLabel} variant="info" />
            </div>
          ))}
        </div>

        {/* Gráfico TPV */}
        <SectionCard title="Gráfico de cobranças" description="Volume total transacionado (TPV)">
          <Sparkline data={tpvValues} color="#1890FF" width={1024} height={140} filled />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'rgba(0,0,0,0.45)' }}>
            <span>{ecDashboardTpv[0]?.date}</span>
            <span>{ecDashboardTpv[Math.floor(ecDashboardTpv.length / 2)]?.date}</span>
            <span>{ecDashboardTpv[ecDashboardTpv.length - 1]?.date}</span>
          </div>
        </SectionCard>

        {/* Cards de status */}
        <div style={{ display: 'flex', gap: 24 }}>
          {ecDashboardStatus.map((s) => (
            <div key={s.status} style={{ flex: 1, minWidth: 0 }}>
              <KpiCard
                label={s.status}
                value={fmtBRL(s.value)}
                subLabel={`${s.count} cobranças (${s.percent}%)`}
                variant={statusVariantMap[s.status]}
              />
            </div>
          ))}
        </div>

        {/* Formas de pagamento + Bandeiras */}
        <div style={{ display: 'flex', gap: 24 }}>
          <SectionCard title="Formas de pagamento mais utilizadas" flex={1}>
            {ecDashboardPaymentMethods.map((m) => (
              <div key={m.method} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span>{m.method}</span>
                  <span style={{ color: 'rgba(0,0,0,0.65)' }}>{m.percent.toFixed(2).replace('.', ',')}%</span>
                </div>
                <Progress percent={m.percent} showInfo={false} size="small" />
              </div>
            ))}
          </SectionCard>
          <SectionCard title="Bandeiras mais utilizadas" flex={1}>
            {ecDashboardBrands.map((b) => (
              <div key={b.brand} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <BrandLogo brand={b.brand} size={20} />
                    <span>{b.brand}</span>
                  </span>
                  <span style={{ color: 'rgba(0,0,0,0.65)' }}>{b.percent.toFixed(2).replace('.', ',')}%</span>
                </div>
                <Progress percent={b.percent} showInfo={false} size="small" strokeColor={b.brand === 'Visa' ? '#1A1F71' : '#EB001B'} />
              </div>
            ))}
          </SectionCard>
        </div>

        {/* Recusas + Conversão + Parcelas */}
        <div style={{ display: 'flex', gap: 24 }}>
          <SectionCard title="Motivos de recusa por adquirente" flex={2}>
            <EmptyState title="Sem dados" description="Não encontramos dados para o período selecionado." paddingY={32} />
          </SectionCard>
          <SectionCard title="Índices de conversão" flex={1}>
            {ecDashboardConversion.map((c) => (
              <div key={c.channel} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span>{c.channel}</span>
                  <span style={{ color: 'rgba(0,0,0,0.65)' }}>{c.percent}%</span>
                </div>
                <Progress percent={c.percent} showInfo={false} size="small" />
              </div>
            ))}
          </SectionCard>
          <SectionCard title="Parcelas em cobranças de cartão" flex={1}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100, marginTop: 8 }}>
              {ecDashboardInstallments.map((i) => {
                const max = Math.max(...ecDashboardInstallments.map((x) => x.count), 1)
                const h = (i.count / max) * 80
                return (
                  <div key={i.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: '100%', height: Math.max(h, 2), background: '#1890FF', borderRadius: 2 }} />
                    <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.45)' }}>{i.label}</span>
                  </div>
                )
              })}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
