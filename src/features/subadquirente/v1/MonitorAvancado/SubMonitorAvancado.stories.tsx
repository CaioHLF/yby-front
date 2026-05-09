import type { Meta, StoryObj } from '@storybook/react'
import SubMonitorAvancado from './SubMonitorAvancado'

const meta: Meta<typeof SubMonitorAvancado> = {
  title: 'Domain/Subadquirente V1/MonitorAvancado',
  component: SubMonitorAvancado,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'SUB v1 — Monitorando operação avançada (FigJam 140:491). Dashboard real-time com KPIs por categoria (Bronze/Prata/Ouro) + alertas inteligentes ordenados por severidade + drill-down 3 níveis (Categoria → ECs → Transação) + ações de intervenção (pausar, retry, cancelar, ajustar limite).',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SubMonitorAvancado>

export const Default: Story = { name: '5 alertas ativos · 3 categorias' }
