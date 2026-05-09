import type { Meta, StoryObj } from '@storybook/react'
import SubAprovacoes from './SubAprovacoes'

const meta: Meta<typeof SubAprovacoes> = {
  title: 'Domain/Subadquirente V1/Aprovacoes',
  component: SubAprovacoes,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'SUB v1 — Aprovando manualmente (FigJam 140:402). Console com fila ordenada por SLA + dossiê do EC + 3 decisões (Aprovar · Parcial · Recusar). Pixel/Rian: cap. 7 (fadiga) ordenação por urgência · cap. 1 (ancoragem) dossiê completo · cap. 9 (não-impostor) flags de risco e motivo de encaminhamento explícitos.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SubAprovacoes>

export const Default: Story = { name: 'Fila com 4 solicitações pendentes' }
