import type { Meta, StoryObj } from '@storybook/react'
import EcExtrato from './EcExtrato'

const meta: Meta<typeof EcExtrato> = {
  title: 'Domain/Estabelecimento V0/Extrato',
  component: EcExtrato,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcExtrato>
export const Default: Story = { name: 'Estado padrão' }
