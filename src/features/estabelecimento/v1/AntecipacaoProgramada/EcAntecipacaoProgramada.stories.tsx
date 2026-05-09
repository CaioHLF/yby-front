import type { Meta, StoryObj } from '@storybook/react'
import EcAntecipacaoProgramada from './EcAntecipacaoProgramada'

const meta: Meta<typeof EcAntecipacaoProgramada> = {
  title: 'Domain/Estabelecimento V1/AntecipacaoProgramada',
  component: EcAntecipacaoProgramada,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'EC v1 — Antecipando programadamente (FigJam 141:466). Regras agendadas que disparam antecipação automática conforme triggers (calendário · valor agenda · fim de mês · dia da semana). Pixel/Rian: cap. 4 (custo afundado) — sempre simula antes de salvar.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcAntecipacaoProgramada>

export const Default: Story = { name: 'Lista com 3 regras (2 ativas, 1 inativa)' }
