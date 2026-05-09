import type { Meta, StoryObj } from '@storybook/react'
import EcDashboard from './EcDashboard'

const meta: Meta<typeof EcDashboard> = {
  title: 'Domain/Estabelecimento V0/Dashboard',
  component: EcDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Dashboard do Estabelecimento Comercial — V0. KPIs operacionais (Cobranças criadas/autorizadas, Número, Ticket médio), gráfico TPV, cards de status, distribuição por forma de pagamento e bandeira, motivos de recusa, índices de conversão e quantidade de parcelas. Reusa KpiCard, Sparkline, PageHeader e EmptyState do design system.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcDashboard>

export const Default: Story = { name: 'Estado padrão' }
