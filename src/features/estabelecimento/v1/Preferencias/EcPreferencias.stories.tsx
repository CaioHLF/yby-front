import type { Meta, StoryObj } from '@storybook/react'
import EcPreferencias from './EcPreferencias'

const meta: Meta<typeof EcPreferencias> = {
  title: 'Domain/Estabelecimento V1/Preferencias',
  component: EcPreferencias,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'EC v1 — Configurando preferências (FigJam 141:279). 3 áreas configuráveis: opt-in/out automática, % agenda customizado (com limite por categoria Bronze/Prata/Ouro), canais de notificação. Pixel/Rian (Enviesados cap. 9 — não-impostor): limite SEMPRE visível, alerta explícito quando estoura.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcPreferencias>

export const Default: Story = { name: 'Categoria Prata · slider 50% (dentro limite)' }
