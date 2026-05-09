import type { Meta, StoryObj } from '@storybook/react'
import EcOnboarding from './EcOnboarding'

const meta: Meta<typeof EcOnboarding> = {
  title: 'Domain/Estabelecimento V0/Onboarding',
  component: EcOnboarding,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Step central do onboarding EC V0: aceite de Antecipação automática + Liquidação automática. Pixel/Rian (Enviesados cap. 9): default ON com taxa exibida explicitamente e alternativa "manual" referenciada — não é dark pattern porque a info é honesta e há escolha real.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcOnboarding>
export const Default: Story = { name: 'Defaults ligados (recomendado)' }
