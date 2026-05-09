import type { Meta, StoryObj } from '@storybook/react'
import EcAntecipacoes from './EcAntecipacoes'

const meta: Meta<typeof EcAntecipacoes> = {
  title: 'Domain/Estabelecimento V0/Antecipacoes',
  component: EcAntecipacoes,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcAntecipacoes>
export const Default: Story = { name: 'Estado padrão' }
