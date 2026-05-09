import type { Meta, StoryObj } from '@storybook/react'
import EcCobrancas from './EcCobrancas'

const meta: Meta<typeof EcCobrancas> = {
  title: 'Domain/Estabelecimento V0/Cobrancas',
  component: EcCobrancas,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcCobrancas>

export const Default: Story = { name: 'Lista padrão (4 cobranças)' }
