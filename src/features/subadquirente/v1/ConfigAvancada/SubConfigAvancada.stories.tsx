import type { Meta, StoryObj } from '@storybook/react'
import SubConfigAvancada from './SubConfigAvancada'

const meta: Meta<typeof SubConfigAvancada> = {
  title: 'Domain/Subadquirente V1/ConfigAvancada',
  component: SubConfigAvancada,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'SUB v1 — Configurando produto avançado (FigJam 140:279). 5 áreas em AccordionCard: Taxas (matriz multi-eixo) · Risco (score, MCC, chargeback) · Limites (% agenda, cooldown, colchão) · Operacional (corte, SLA, retry) · Notificações. Versionamento com auditoria. Categorias Bronze/Prata/Ouro atravessam as áreas.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SubConfigAvancada>

export const Default: Story = { name: '5 áreas · primeira expandida' }
