import type { Meta, StoryObj } from '@storybook/react'
import EcLinksPagamento from './EcLinksPagamento'

const meta: Meta<typeof EcLinksPagamento> = {
  title: 'Domain/Estabelecimento V0/LinksPagamento',
  component: EcLinksPagamento,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof EcLinksPagamento>

export const Default: Story = { name: 'Lista padrão (5 links)' }
